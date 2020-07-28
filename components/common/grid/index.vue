<template>
  <div>
    <div class="grid-actions-container">
      <div>
        <slot name="filter">
          <FieldsFilter
            v-model="filterRules"
            :is-filter-applied="isFilterApplied"
            :fields="filterableFields"
          />
        </slot>
      </div>
      <div class="grid-search-section">
        <slot name="search">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="grid-search-input"
          ></v-text-field>
        </slot>
      </div>
    </div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tableData.items"
      :single-select="singleSelect"
      :loading="loading === 1"
      :options.sync="options"
      :server-items-length="tableData.total"
      item-key="id"
      show-select
      class="elevation-1"
      @update:pagination="updatePagination"
    >
      <!--<template v-slot:header.name="{ header }">
                    {{ header.text.toUpperCase() }}
      </template>-->
      <!-- <template slot="header" slot-scope="props">
                    <tr>
                        <th>
                        <v-checkbox
                            :input-value="props.all"
                            :indeterminate="props.indeterminate"
                            primary
                            hide-details
                            @click.native="toggleAll"
                        ></v-checkbox>
                        </th>
                        <th
                        v-for="header in props.headers"
                        :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)"
                        >
                        <v-icon small>arrow_upward</v-icon>
                        test
                        </th>
                    </tr>
      </template>-->
      <!-- <template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import startOfTomorrow from 'date-fns/startOfTomorrow'
import endOfTomorrow from 'date-fns/endOfTomorrow'
import startOfYesterday from 'date-fns/startOfYesterday'
import endOfYesterday from 'date-fns/endOfYesterday'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
// import { axiosWrapper } from '../api/axios.js'
import FieldsFilter from './FieldsFilter.vue'
// import RegistrationFind from '~/config/apps/event/gql/registrationList.gql'

function getTableHeader(content, viewName) {
  const fields = getGridFields(content, viewName)

  const headers = []
  for (const fieldName in fields) {
    const { caption, sortEnable, displayOrder, columnWidth } = fields[fieldName]
    headers.push({
      text: caption,
      value: fieldName,
      sortable: sortEnable,
      width: columnWidth,
      displayOrder,
    })
  }
  headers.sort((col1, col2) => col1.displayOrder - col2.displayOrder)
  return headers
}

function getGridFields(content, viewName) {
  const view = content.views[viewName]
  return view.fields
}

function getViewDataSource(content, viewName) {
  const view = content.views[viewName]
  return view.dataSource
}

function getViewQuery(content, viewName) {
  return getViewDataSource(content, viewName).query
}

function formatResult(content, viewName, data, modelName) {
  let { edges } = data[modelName][`${modelName}Find`]
  const fields = getGridFields(content, viewName)
  edges = edges.map(({ node }) => {
    const formattedRecord = {}
    for (const field in node) {
      const { type } = fields[field] || {}
      const fieldValue = node[field]
      if (type === 'date')
        formattedRecord[field] = fieldValue
          ? format(new Date(fieldValue), 'PPp')
          : ''
      else formattedRecord[field] = node[field]
    }
    // const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
    return formattedRecord
    // return format(new Date(2014, 1, 11), 'PPp')
  })
  // formatData(content, viewName, edges)
  return edges
}

function formatCountData(data, modelName) {
  const count = data[modelName][`${modelName}Count`]
  return count
}

function getOrderQuery(content, viewName, sortBy, sortDesc) {
  // let {sortBy,sortDesc} = option;
  if (!(sortBy && sortBy.length)) {
    const view = content.views[viewName]
    const defaultSort = view.DefaultSort
    return defaultSort || ''
  }
  return `${sortBy && sortBy[0]} ${sortDesc && sortDesc[0] ? 'DESC' : 'ASC'}`
}

function buildSearchQueryVariables(content, viewName, search) {
  const fields = getGridFields(content, viewName)

  let where = {}
  const or = []
  for (const field in fields) {
    const { type, searchEnable } = fields[field]
    if (type === 'string' && searchEnable) {
      or.push({ [field]: { like: search, options: 'i' } })
    }
  }
  where = {
    or,
  }
  return where
}

function getDateBeforeQuerybyDays(field, days) {
  const and = [
    { [field]: { gte: startOfDay(addDays(new Date(), -days)) } },
    { [field]: { lte: endOfToday() } },
  ]
  return { and }
}

function getDateAfterQuerybyDays(field, days) {
  const and = [
    { [field]: { gte: startOfToday() } },
    { [field]: { lte: endOfDay(addDays(new Date(), days)) } },
  ]
  return { and }
}

function getOperatorQuery(field, operator, value) {
  let ruleFilter = {}
  switch (operator) {
    case 'is':
      ruleFilter = { [field]: value }
      break
    case 'isNot':
      ruleFilter = { [field]: { neq: value } }
      break
    case 'contains':
      ruleFilter = { [field]: { like: value, options: 'i' } }
      break
    case 'notContains':
      ruleFilter = { [field]: { nlike: value, options: 'i' } }
      break
    case 'startsWith':
      ruleFilter = { [field]: { regexp: `^${value}` } }
      break
    case 'endsWith':
      ruleFilter = { [field]: { regexp: `${value}$` } }
      break
    case 'gt':
    case 'lt':
    case 'gte':
    case 'lte':
      ruleFilter = { [field]: { [operator]: value } }
      break
    case 'today': {
      const and = [
        { [field]: { gte: startOfToday() } },
        { [field]: { lt: endOfToday() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'tomorrow': {
      const and = [
        { [field]: { gte: startOfTomorrow() } },
        { [field]: { lt: endOfTomorrow() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'yesterday': {
      const and = [
        { [field]: { gte: startOfYesterday() } },
        { [field]: { lt: endOfYesterday() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'pastWeek': {
      ruleFilter = getDateBeforeQuerybyDays(field, 7)
      break
    }
    case 'pastMonth':
      ruleFilter = getDateBeforeQuerybyDays(field, 30)
      break
    case 'pastYear':
      ruleFilter = getDateBeforeQuerybyDays(field, 365)
      break
    case 'nextWeek':
      ruleFilter = getDateAfterQuerybyDays(field, 7)
      break
    case 'nextMonth':
      ruleFilter = getDateAfterQuerybyDays(field, 30)
      break
    case 'nextYear':
      ruleFilter = getDateAfterQuerybyDays(field, 365)
      break
    case 'exactDate': {
      const and = [
        { [field]: { gte: new Date(value) } },
        { [field]: { lt: startOfDay(addDays(new Date(), 1)) } },
      ]
      ruleFilter = { and }
      break
    }
    case 'isEmpty':
      ruleFilter = { [field]: null }
      break
    case 'isNotEmpty':
      ruleFilter = { [field]: { neq: null } }
      break
  }
  return ruleFilter
}

function buildQueryVariables({ content, viewName, search, filterRules }) {
  // const filterColumns = filterRules
  const and = []
  // const fields = getGridFields(content, viewName)
  const or = []
  for (const rule of filterRules) {
    const { field, value, operator } = rule
    const ruleFilter = getOperatorQuery(field, operator, value)
    or.push(ruleFilter)
  }
  if (or.length > 0) {
    and.push({ or })
  }
  if (search) {
    const serachQuery = buildSearchQueryVariables(content, viewName, search)
    and.push(serachQuery)
  }
  debugger
  const viewDataSource = getViewDataSource(content, viewName)
  const contentFilter = viewDataSource.filter
  if (contentFilter) {
    and.push(contentFilter.where)
  }
  return { and }
}

export default {
  components: {
    FieldsFilter,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  data() {
    const headers = getTableHeader(this.content, this.viewName)
    return {
      singleSelect: false,
      selected: [],
      headers,
      tableData: {
        items: [],
        total: 0,
      },
      loading: 0,
      totalCount: 0,
      options: {},
      isFilterApplied: false,
      filterFields: {},
      filterRules: [],
    }
  },
  computed: {
    filterableFields() {
      const fields = getGridFields(this.content, this.viewName)
      return fields
    },
  },
  methods: {
    updatePagination(pagination) {},
    onFilterClick(e) {
      this.isFilterApplied = true
    },
  },
  apollo: {
    tableData: {
      query() {
        return gql`
          ${getViewQuery(this.content, this.viewName)}
        `
      },
      variables() {
        // Use vue reactive properties here

        const { content, viewName, search, filterRules } = this
        const sortBy = this.options.sortBy
        const sortDesc = this.options.sortDesc
        const order = getOrderQuery(content, viewName, sortBy, sortDesc)
        const where = buildQueryVariables({
          content,
          viewName,
          search,
          filterRules,
        })
        const skip = (this.options.page - 1) * this.options.itemsPerPage
        const limit = this.options.itemsPerPage
        return {
          filters: { limit, skip, order, where },
          where,
        }
      },
      update(data) {
        const { content, viewName } = this
        const modelName = content.general.name
        const tableData = {
          items: formatResult(content, viewName, data, modelName),
          total: formatCountData(data, modelName),
        }
        return tableData
      },
      // Optional result hook
      result({ data, loading, networkStatus }) {
        console.log('We got some result!')
      },
      error(error) {
        console.error("We've got an error!", error)
      },
      prefetch: false,
      loadingKey: 'loading',
      // pollInterval:0
    },
  },
  // created(){
  //
  //     axiosWrapper('/Events')
  //     .then(({data})=>{
  //         this.items = data;
  //     })
  // }
  // async mounted() {
  //     let result = await this.$apollo.query({
  //         query: gql`${EventFind}`,
  //         variables:{
  //             filters: {where:{}}, where:{}
  //         }
  //     });
  //     console.log(result)
  //     this.items = formatResult(result.data,"Event")
  // }
}
</script>

<style>
.grid-search-section {
  display: flex;
  justify-content: flex-end;
}
.grid-search-input {
  display: flex;
  max-width: 150px;
  padding: 0 10px;
}
.grid-actions-container {
  display: flex;
  justify-content: flex-end;
}
</style>

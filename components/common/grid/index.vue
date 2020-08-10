<template>
  <div>
    <div>
      <component
        :is="actionTemplates['grid'] || null"
        :content="content"
        :view-name="viewName"
        :on-new-item-save="onNewItemSave"
      />
      <template v-if="selectedItems.length > 0">
        <component
          :is="actionTemplates['row-select'] || null"
          :content="content"
          :view-name="viewName"
          :items="selectedItems"
          :on-update-item="onUpdateItem"
          :on-delete-item="onDeleteItem"
        />
      </template>
    </div>
    <div class="grid-actions-container">
      <div v-if="!hideFilter">
        <slot name="filter">
          <FieldsFilter
            v-model="filterRules"
            :is-filter-applied="isFilterApplied"
            :fields="filterableFields"
          />
        </slot>
      </div>
      <div v-if="!hideSearch" class="grid-search-section">
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
      :hide-default-header="hideDefaultHeader"
      :hide-default-footer="hideDefaultFooter"
      :show-expand="showExpand"
      :single-expand="singleExpand"
      item-key="id"
      :show-select="showSelect"
      class="elevation-1"
      @update:pagination="updatePagination"
      @click:row="onRowClick"
      @input="onItemSelected"
    >
      <template v-if="!!slotTemplates.item" v-slot:item="props">
        <component
          :is="slotTemplates.item || null"
          :item="props.item"
          :headers="props.headers"
          :is-selected="props.isSelected"
          :context="context"
          :items="tableData.items"
          :content="content"
        />
      </template>
      <template
        v-for="(column, index) in headers"
        v-slot:[`item.${column.value}`]="props"
      >
        <component
          :is="component[index] || null"
          :key="column.value"
          :item="props.item"
          :value="props.value"
          :context="context"
          :items="tableData.items"
          :content="content"
        />
      </template>
      <template
        v-if="!!slotTemplates['expanded-item']"
        v-slot:expanded-item="props"
      >
        <component
          :is="slotTemplates['expanded-item'] || null"
          :item="props.item"
          :headers="props.headers"
        />
      </template>
      <template v-if="!!slotTemplates.body" v-slot:body="props">
        <component
          :is="slotTemplates.body || null"
          :pagination="props.pagination"
          :items="props.items"
          :options="props.options"
          :expand="props.expand"
          :select="props.select"
        />
      </template>
      <template v-if="!!slotTemplates.header" v-slot:header="props">
        <component
          :is="slotTemplates.header || null"
          :props="props.props"
          :on="props.on"
        />
      </template>
      <template v-if="!!slotTemplates.footer" v-slot:footer="props">
        <component
          :is="slotTemplates.footer || null"
          :props="props.props"
          :on="props.on"
          :headers="props.headers"
        />
      </template>
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
import contentFactory from '~/config/apps/event/content'
import { templateLoaderMixin } from '~/utility'

const DEFAULT_GRID_PROPS = {
  hideDefaultHeader: false,
  hideDefaultFooter: false,
  showExpand: false,
  singleExpand: false,
  showSelect: false,
  hideFilter: false,
  hideSearch: false,
}
const ACTION_TYPES = ['grid', 'row', 'row-select']
const TEMPLATE_SLOTS = ['item', 'body', 'header', 'footer', 'expanded-item']

function getTableHeader(content, viewName) {
  const fields = getGridFields(content, viewName)

  const headers = []
  for (const fieldName in fields) {
    const {
      caption,
      sortEnable,
      displayOrder,
      columnWidth,
      template,
      hidden = false,
    } = fields[fieldName]
    if (!hidden) {
      headers.push({
        text: caption,
        value: fieldName,
        sortable: sortEnable,
        width: columnWidth,
        displayOrder,
        template,
      })
    }
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

function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

function formatResult(content, viewName, data, modelName) {
  if (!data[modelName]) return []
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
    formattedRecord.id = getIdFromAtob(node.id)
    return formattedRecord
  })
  return edges
}

function formatCountData(data, modelName) {
  const count = data[modelName][`${modelName}Count`]
  return count
}

function getContentByName(ctx, contentName) {
  const contents = contentFactory(ctx)
  return contents[contentName]
}

function getOrderQuery(content, viewName, sortBy, sortDesc) {
  // let {sortBy,sortDesc} = option;
  if (!(sortBy && sortBy.length)) {
    const defaultSort = getViewDataSource(content, viewName).defaultSort
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

function buildQueryVariables({
  viewName,
  search,
  filterRules,
  filter,
  contentName,
  ctx,
}) {
  // const filterColumns = filterRules
  const content = getContentByName(ctx, contentName)
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
  const viewDataSource = getViewDataSource(content, viewName)
  const contentFilter = filter || viewDataSource.filter
  if (contentFilter) {
    and.push(contentFilter.where)
  }
  return and.length > 0 ? { and } : {}
}

function getGridsProps(content, viewName) {
  const view = content.views[viewName]
  return { ...DEFAULT_GRID_PROPS, ...view.ui }
}

function getIdFromAtob(encodedId) {
  return encodedId ? atob(encodedId).split(':')[1] : ''
}

function buildMutationCreateQuery(modelName) {
  return `mutation($Inputs : ${modelName}CreateInput!){ ${modelName} { ${modelName}Create(input:$Inputs){ clientMutationId obj{ id } } } }`
}

function getModelName(content, viewName) {
  const view = content.views[viewName]
  const dataSource = view.dataSource
  return dataSource.model
}

function buildMutationDeleteQuery(modelName) {
  return `mutation($Inputs: ${modelName}DestroyAllInput!){ ${modelName} { ${modelName}DestroyAll(input:$Inputs){ clientMutationId } } }`
}

function buildMutationUpsertQuery(modelName) {
  return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
}

export default {
  components: {
    FieldsFilter,
  },
  mixins: [templateLoaderMixin], //, apolloMixin, axiosMixin],
  props: {
    viewName: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
    filter: {
      type: Object,
      default: () => null,
    },
    contentName: {
      type: String,
      required: true,
    },
  },
  data() {
    const content = getContentByName(this, this.contentName)
    const headers = getTableHeader(content, this.viewName)
    const gridProps = getGridsProps(content, this.viewName)
    return {
      content,
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
      component: [],
      slotTemplates: {},
      hideDefaultHeader: gridProps.hideDefaultHeader,
      hideDefaultFooter: gridProps.hideDefaultFooter,
      showExpand: gridProps.showExpand,
      singleExpand: gridProps.singleExpand,
      showSelect: gridProps.showSelect,
      hideFilter: gridProps.hideFilter,
      hideSearch: gridProps.hideSearch,
      selectedItems: [],
      actionTemplates: [],
      triggerChange: 0,
    }
  },
  computed: {
    filterableFields() {
      const fields = getGridFields(this.content, this.viewName)
      return fields
    },
    context() {
      return getGridTemplateInfo(this.content, this.viewName).context || {}
    },
    _components() {
      return {
        newItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/grid/new-item.vue`,
            `common/templates/grid/actions/grid/new-item.vue`,
          ],
        },
      }
    },

    // _components() {},
  },
  created() {
    console.log('in created')
  },
  // async mounted() {
  //     let result = await this.$apollo.query({
  //         query: gql`${EventFind}`,
  //         variables:{
  //             filters: {where:{}}, where:{}
  //         }
  //     });
  //
  //     console.log(result)
  //     this.items = formatResult(result.data,"Event")
  // }
  mounted() {
    this.headers.forEach(async (column, index) => {
      this.component[index] = await this.loadTemplate([
        `templates/grids/${this.templateFolderName}/column-${column.value}.vue`,
        `templates/grids/${this.templateFolderName}/column-${index}.vue`,
        `common/templates/grid/column.vue`,
      ])
    })
    TEMPLATE_SLOTS.forEach(async (slot) => {
      this.slotTemplates[slot] = await this.loadTemplate(
        [`templates/grids/${this.templateFolderName}/${slot}.vue`],
        false
      )
    })
    const templateName = this.templateFolderName
    ACTION_TYPES.forEach(async (actionType) => {
      this.actionTemplates[actionType] = await this.loadTemplate([
        `templates/grids/${templateName}/actions/${actionType}/index.vue`,
        `common/templates/grid/actions/${actionType}/index.vue`,
      ])
    })
  },
  methods: {
    updatePagination(pagination) {},
    onFilterClick(e) {
      this.isFilterApplied = true
    },
    onRowClick(item, props) {
      console.log(`props=${props} item=${item}  `)
      if (!this.showSelect) {
        this.selectedItems = [item]
      }
    },
    onItemSelected(items) {
      console.log(`onItemSelected = ${items}`)
      this.selectedItems = items
    },
    async onNewItemSave(data) {
      debugger
      const modelName = getModelName(this.content, this.viewName)
      const newItemMutation = buildMutationCreateQuery(modelName)
      const userCreated = await this.$apollo.mutate({
        mutation: gql(newItemMutation),
        variables: {
          Inputs: {
            data,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      this.$apollo.queries.tableData.refresh()
      console.log(userCreated)
    },
    async onUpdateItem(data) {
      debugger
      const modelName = getModelName(this.content, this.viewName)
      const where = {
        id: data.id,
      }
      const editItemMutation = buildMutationUpsertQuery(modelName)
      const userCreated = await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
            data,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      this.$apollo.queries.tableData.refresh()
      console.log(userCreated)
    },
    async onDeleteItem(ids) {
      console.log(ids)
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      const userDeleted = await this.$apollo.mutate({
        mutation: gql(deleteItemMutation),
        variables: {
          Inputs: {
            where: {
              id: {
                inq: ids,
              },
            },
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      this.$apollo.queries.tableData.refresh()
      console.log(userDeleted)
    },
  },
  apollo: {
    tableData: {
      query() {
        return gql`
          ${getViewQuery(this.content, this.viewName)}
        `
        // return null
      },
      variables() {
        // Use vue reactive properties here
        const { content, viewName, search, filterRules, contentName } = this
        const sortBy = this.options.sortBy
        const sortDesc = this.options.sortDesc
        const order = getOrderQuery(content, viewName, sortBy, sortDesc)
        const where = buildQueryVariables({
          viewName,
          search,
          filterRules,
          filter: this.filter,
          contentName,
          ctx: this,
        })
        const skip = (this.options.page - 1) * this.options.itemsPerPage
        const limit =
          this.options.itemsPerPage === -1 ? 0 : this.options.itemsPerPage
        return {
          filters: { limit, skip, order, where },
          where,
        }
      },
      update(data) {
        const { content, viewName } = this
        const modelName = content.general.name
        const tableData =
          Object.keys(data).length > 0
            ? {
                items: formatResult(content, viewName, data, modelName),
                total: formatCountData(data, modelName),
              }
            : {}
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
      skip: false,
      pollInterval: 0,
    },
  },
  // axios: {
  //   tableData: {
  //     query(){

  //     },
  //     update(){

  //     }
  //   }
  // },
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

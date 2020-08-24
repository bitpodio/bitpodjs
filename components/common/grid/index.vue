<template>
  <div>
    <template v-if="!!error">
      <div>
        <component :is="errorTemplate || null" :error="error" />
      </div>
    </template>
    <div v-if="!error" :key="error">
      <div class="grid-actions-container">
        <div class="d-flex">
          <template v-if="selectedItems.length > 0">
            <component
              :is="actionTemplates['row-select'] || null"
              :content="content"
              :view-name="viewName"
              :on-update-item="onUpdateItem"
              :on-delete-item="onDeleteItem"
              :items="selectedItems"
              class="d-flex"
            />
          </template>
          <component
            :is="actionTemplates['grid'] || null"
            :content="content"
            :view-name="viewName"
            :on-new-item-save="onNewItemSave"
          />
        </div>
        <div v-if="hideFilter">
          <slot name="filter">
            <FieldsFilter
              v-model="filters"
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
              hide-details
              class="grid-search-input ml-2"
              outlined
              dense
            ></v-text-field>
          </slot>
        </div>
      </div>
      <v-data-table
        v-model="selectedItems"
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
        class="elevation-0"
        :show-select="showSelect"
        @update:options="updatePagination"
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
            :column="column"
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
import FieldsFilter from './FieldsFilter.vue'
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
      type,
    } = fields[fieldName]
    if (!hidden) {
      headers.push({
        text: caption,
        type,
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

function getOrderQuery(content, viewName, sortBy, sortDesc) {
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
        { [field]: { gte: startOfDay(new Date(value)) } },
        { [field]: { lte: endOfDay(new Date(value)) } },
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

function computeViewFilter(filter, ctx) {
  return filter && (filter instanceof Function ? filter.call(ctx, ctx) : filter)
}

function buildQueryVariables({
  viewName,
  search,
  filters,
  filter,
  content,
  ctx,
}) {
  const { rules: filterRules, ruleCondition } = filters
  const and = []
  const condition = []
  for (const rule of filterRules) {
    const { field, value, operator } = rule
    const ruleFilter = getOperatorQuery(field, operator, value)
    condition.push(ruleFilter)
  }
  if (condition.length > 0) {
    and.push({ [ruleCondition]: condition })
  }
  if (search) {
    const serachQuery = buildSearchQueryVariables(content, viewName, search)
    and.push(serachQuery)
  }
  const viewDataSource = getViewDataSource(content, viewName)
  const contentFilter = filter || computeViewFilter(viewDataSource.filter, ctx)

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
  mixins: [templateLoaderMixin],
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
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    const headers = getTableHeader(this.content, this.viewName)
    const gridProps = getGridsProps(this.content, this.viewName)
    return {
      singleSelect: false,
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
      filters: { rules: [], ruleCondition: 'and' },
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
      error: '',
      errorTemplate: null,
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
        errorTemplate: {
          locations: [
            `templates/grids/${this.templateFolderName}/error.vue`,
            `common/templates/grid/error.vue`,
          ],
        },
      }
    },
  },
  watch: {
    filters() {
      // call rest
      this.loadRestData()
    },
    search() {
      // call rest
      this.loadRestData()
    },
  },
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
  created() {
    const dataSource = getViewDataSource(this.content, this.viewName)
    const dataSourceType = dataSource.type || 'graphql'
    if (dataSourceType === 'graphql') {
      this.$apollo.queries.tableData.skip = false
    }
    this.loadRestData()
  },

  methods: {
    updatePagination(pagination) {
      // call rest
      this.loadRestData()
    },
    onFilterClick(e) {
      this.isFilterApplied = true
    },
    onRowClick(item, props) {
      if (!this.showSelect) {
        this.selectedItems = [item]
      }
    },
    onItemSelected(items) {
      this.selectedItems = items
    },
    async onNewItemSave(data) {
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
      return userCreated
    },
    async onUpdateItem(data) {
      const modelName = getModelName(this.content, this.viewName)
      const where = {
        id: data.id,
      }
      const editItemMutation = buildMutationUpsertQuery(modelName)
      const itemUpdated = await this.$apollo.mutate({
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
      return itemUpdated
    },
    async onDeleteItem(ids) {
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      const itemDeleted = await this.$apollo.mutate({
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
      return itemDeleted
    },
    refresh() {
      const dataSource = getViewDataSource(this.content, this.viewName)
      const dataSourceType = dataSource.type || 'graphql'
      if (dataSourceType === 'graphql') {
        this.$apollo.queries.tableData.refresh()
      }
      if (dataSourceType === 'rest') {
        this.loadRestData()
      }
      this.selectedItems = []
    },
    async loadRestData() {
      const dataSource = getViewDataSource(this.content, this.viewName)
      const dataSourceType = dataSource.type || 'graphql'
      if (dataSourceType === 'rest') {
        const { search, filters } = this
        const options = {
          ...this.options,
          search,
          filters,
        }
        const getDataFunc = dataSource.getData.call(this, this)
        this.tableData = await getDataFunc.call(this, options)
      }
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
        const { content, viewName, search, filters } = this
        const sortBy = this.options.sortBy
        const sortDesc = this.options.sortDesc
        const order = getOrderQuery(content, viewName, sortBy, sortDesc)
        const where = buildQueryVariables({
          viewName,
          search,
          filters,
          filter: this.filter,
          content,
          ctx: this,
        })
        const page = this.options.page || 1
        const itemsPerPage = this.options.itemsPerPage || 10
        const skip = (page - 1) * (itemsPerPage || 10)
        const limit = itemsPerPage === -1 ? 0 : itemsPerPage
        return {
          filters: { limit, skip, order, where },
          where,
        }
      },
      update(data) {
        const { content, viewName } = this
        const modelName =
          getModelName(content, viewName) || content.general.name
        const tableData =
          Object.keys(data).length > 0
            ? {
                items: formatResult(content, viewName, data, modelName),
                total: formatCountData(data, modelName),
              }
            : {}
        if (Object.keys(data).length > 0) this.error = ''
        return tableData
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: true,
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
  align-items: center;
}
</style>

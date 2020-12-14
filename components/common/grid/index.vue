<template>
  <div>
    <template v-if="!!error">
      <div>
        <component :is="errorTemplate || null" :error="error" />
      </div>
    </template>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <div v-if="!error" :key="error">
      <div
        v-if="!noAction"
        class="grid-actions-container mt-lg-n11 mt-md-n11 mt-sm-n11 mt-xs-0 sticky"
        :class="
          onlySticky
            ? $device.isIos
              ? 'sticky_block'
              : 'sticky_inline_flex'
            : ''
        "
      >
        <div
          class="d-flex align-center"
          :class="{
            'elevation-1 boxview rounded': onlySticky && winWidth < 600,
          }"
        >
          <div
            v-if="
            (hasGridOption ||
            hasRowOption ||
            (viewName &&
            content.view &&
            content.view[viewName] &&
            content.view[viewName].template &&
            content.view[viewName].template.actions &&
            Object.values(content.view[viewName].template.actions).reduce((acc,i)=>{return acc || !i.hidden},false)) )"
            class="grid-actions-menu"
          >
            <v-menu right :offset-y="offset" transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <component
                  :is="actionTemplates['grid'] || null"
                  :content="content"
                  :view-name="viewName"
                  :on-new-item-save="onNewItemSave"
                  :refresh="refresh"
                  :context="context"
                  @hasGridOption="getGridOption"
                />
                <component
                  :is="actionTemplates['row-select'] || null"
                  v-if="selectedItems.length > 0"
                  :content="content"
                  :view-name="viewName"
                  :on-update-item="onUpdateItem"
                  :on-delete-item="onDeleteItem"
                  :items="selectedItems"
                  :refresh="refresh"
                  :context="context"
                  :get-action-items="getActionItems"
                  @hasRowOption="getRowOption"
                />
              </v-list>
            </v-menu>
          </div>
          <div class="grid-actions-spread">
            <div class="d-flex">
              <component
                :is="actionTemplates['row-select'] || null"
                v-if="selectedItems.length > 0"
                :content="content"
                :view-name="viewName"
                :on-update-item="onUpdateItem"
                :on-delete-item="onDeleteItem"
                :items="selectedItems"
                :refresh="refresh"
                :context="context"
                :get-action-items="getActionItems"
                class="d-inline-flex"
                @hasRowOption="getRowOption"
              />
              <component
                :is="actionTemplates['grid'] || null"
                :content="content"
                :view-name="viewName"
                :on-new-item-save="onNewItemSave"
                :refresh="refresh"
                :context="context"
                class="d-inline-flex"
                @hasGridOption="getGridOption"
              />
            </div>
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
          <div
            v-if="!hideSearch"
            class="grid-search-section"
            :class="onlySticky ? 'mr-2' : ''"
          >
            <slot name="search">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('Common.Search')"
                hide-details
                class="grid-search-input ml-2"
                outlined
                dense
              ></v-text-field>
            </slot>
          </div>
        </div>
      </div>
      <v-skeleton-loader
        :loading="loading"
        :type="
          viewName === 'live and draft event' ||
          viewName === 'template' ||
          viewName === 'seatmaps' ||
          viewName === 'integration'
            ? ''
            : 'table'
        "
      >
        <v-data-table
          v-model="selectedItems"
          dense
          :headers="translate(headers)"
          :items="tableData.items"
          :single-select="singleSelect"
          :loading="loading"
          :options.sync="options"
          :server-items-length="tableData.total"
          :hide-default-header="hideDefaultHeader"
          :hide-default-footer="isHideDefaultFooter"
          :show-expand="showExpand"
          :single-expand="singleExpand"
          item-key="id"
          class="elevation-0 v-grid"
          :class="hideDefaultHeader ? 'px-0 pt-0 istemplate' : 'px-2 pt-1'"
          :show-select="$device.isMobile || showSelect"
          @update:options="updatePagination"
          @update:page="updatePageChange"
          @click:row="onRowClick"
          @input="onItemSelected"
        >
          <template
            v-if="
              hasMobileCustomView
                ? !!slotTemplates.item && $device.isMobile
                : !!slotTemplates.item
            "
            v-slot:item="props"
          >
            <component
              :is="slotTemplates.item || null"
              :item="props.item"
              :headers="props.headers"
              :is-selected="props.isSelected"
              :context="contentContext"
              :items="tableData.items"
              :content="content"
              :refresh="refresh"
              :select="props.select"
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
              :context="contentContext"
              :items="tableData.items"
              :column="column"
              :content="content"
              :refresh="refresh"
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
              :refresh="refresh"
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
          <template
            v-for="h in headers"
            v-slot:[`header.${h.value}`]="{ header }"
          >
            <v-tooltip :key="h.value" bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ header.text }}</span>
              </template>
              <span>{{ header.text }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-skeleton-loader>
      <div
        v-if="viewName === 'live and draft event'"
        class="d-flex flex-sm-wrap flex-column flex-sm-row"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="!!loading"
          type="card"
          width="264"
          class="pa-4 pl-0 pt-0 eventtiles ma-4 ml-0 mt-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'template'"
        class="d-flex flex-sm-wrap flex-column flex-sm-row mt-12"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="!!loading"
          type="card"
          width="236"
          class="pa-4 pl-0 pt-0 eventtiles ma-4 ml-0 mt-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'seatmaps'"
        class="d-flex flex-sm-wrap flex-column flex-sm-row seat-skeleton-inner mt-10 pl-3"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="loading"
          type="card"
          width="155"
          height="125"
          class="pl-0 pt-0 eventtiles ma-10 ml-0 mt-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'integration'"
        class="d-flex flex-sm-wrap flex-column flex-sm-row seat-skeleton-inner mt-16 pl-5"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="loading"
          type="card"
          width="155"
          height="125"
          class="pl-0 pt-0 eventtiles ma-10 ml-0 mt-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import FieldsFilter from './FieldsFilter.vue'
import {
  templateLoaderMixin,
  getOrderQuery,
  buildQueryVariables,
} from '~/utility'

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
  const [modelApi] = Object.getOwnPropertyNames(data[modelName])
  let { edges } = data[modelName][`${modelApi}`]
  const fields = getGridFields(content, viewName)
  edges = edges.map(({ node }) => {
    const formattedRecord = {}
    for (const field in node) {
      const { type } = fields[field] || {}
      const fieldValue = node[field]
      if (type === 'date' || type === 'datetime')
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

function getGridsProps(content, viewName) {
  const view = content.views[viewName]
  return { ...DEFAULT_GRID_PROPS, ...view.ui }
}

function getIdFromAtob(encodedId) {
  if (!encodedId) {
    return ''
  }
  const decodedStr = atob(encodedId)
  if (decodedStr.split(':')[1]) {
    return decodedStr.split(':')[1]
  }
  return encodedId
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
    context: {
      type: Object,
      required: false,
      default: () => {},
    },
    value: {
      type: Array,
      default: () => [],
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    noAction: {
      type: Boolean,
      default: false,
    },
    serveritemslength: {
      type: null,
      default: null,
    },
    onlySticky: {
      type: Boolean,
      default: false,
    },
    hasMobileCustomView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const headers = getTableHeader(this.content, this.viewName, this)
    const gridProps = getGridsProps(this.content, this.viewName)
    return {
      headers,
      tableData: {
        items: [],
        total: 0,
      },
      loading: true,
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
      snackbar: false,
      timeout: 1000,
      snackbarText: '',
      hasGridOption: false,
      hasRowOption: false,
      headerObserver: null,
      footerObserver: null,
      winWidth: window.innerWidth,
      itemPerPage: 0,
    }
  },
  computed: {
    filterableFields() {
      const fields = getGridFields(this.content, this.viewName)
      const filterEnableFields = {}
      for (const field in fields) {
        const { filterEnable = true } = fields[field]
        if (filterEnable) {
          filterEnableFields[field] = fields[field]
        }
      }
      return filterEnableFields
    },
    contentContext() {
      const contentContext =
        getGridTemplateInfo(this.content, this.viewName).context || {}
      return {
        ...contentContext,
        ...this.context,
      }
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
    isHideDefaultFooter() {
      const isLessItems = this.tableData.total > this.options.itemsPerPage
      return !isLessItems || this.hideDefaultFooter
    },
  },
  watch: {
    filters() {
      // call rest
      this.loadRestData()
    },
    search(newval) {
      // call rest
      this.loadRestData()
      this.$eventBus.$emit('searched-key', newval)
    },
    value() {
      this.selectedItems = this.value
    },
  },
  mounted() {
    setTimeout(() => {
      this.selectedItems = []
    }, 2000)
    this.$eventBus.$on('unselectAll-record', this.unselectAllRecord)
    if (this.loadRestData) {
      this.$eventBus.$on('user-created', this.loadRestData)
    }
    if (this.refresh) {
      this.$eventBus.$on('grid-refresh', this.refresh)
    }
    this.selectedItems = this.value
    this.headers.forEach(async (column, index) => {
      const columnFileName = column && column.value.toLowerCase()
      this.component[index] = await this.loadTemplate([
        `templates/grids/${this.templateFolderName}/column-${columnFileName}.vue`,
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

    const addSentinels = (container, className) => {
      return Array.from(container.querySelectorAll('.sticky')).map((el) => {
        const sentinel = document.createElement('div')
        sentinel.classList.add('sticky_sentinel', className)
        return el.parentElement.appendChild(sentinel)
      })
    }

    const fireEvent = (stuck, target) => {
      const e = new CustomEvent('sticky-change', { detail: { stuck, target } })
      document.dispatchEvent(e)
    }

    const observeHeaders = (container) => {
      this.headerObserver = new IntersectionObserver(
        (records, observer) => {
          for (const record of records) {
            const targetInfo = record.boundingClientRect
            const stickyTarget = record.target.parentElement.querySelector(
              '.sticky'
            )
            const rootBoundsInfo = record.rootBounds

            // Started sticking.
            if (targetInfo.bottom < rootBoundsInfo.top) {
              fireEvent(true, stickyTarget)
            }

            // Stopped sticking.
            if (
              targetInfo.bottom >= rootBoundsInfo.top &&
              targetInfo.bottom < rootBoundsInfo.bottom
            ) {
              fireEvent(false, stickyTarget)
            }
          }
        },
        { threshold: [0], root: container }
      )

      // Add the top sentinels to each section and attach an observer.
      const sentinels = addSentinels(container, 'sticky_sentinel--top')
      sentinels.forEach((el) => this.headerObserver.observe(el))
    }

    const observeFooters = (container) => {
      this.footerObserver = new IntersectionObserver(
        (records, observer) => {
          for (const record of records) {
            const targetInfo = record.boundingClientRect
            const stickyTarget = record.target.parentElement.querySelector(
              '.sticky'
            )
            const rootBoundsInfo = record.rootBounds
            const ratio = record.intersectionRatio

            // Started sticking.
            if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
              fireEvent(true, stickyTarget)
            }

            // Stopped sticking.
            if (
              targetInfo.top < rootBoundsInfo.top &&
              targetInfo.bottom < rootBoundsInfo.bottom
            ) {
              fireEvent(false, stickyTarget)
            }
          }
        },
        { threshold: [1], root: container }
      )

      // Add the bottom sentinels to each section and attach an observer.
      const sentinels = addSentinels(container, 'sticky_sentinel--bottom')
      sentinels.forEach((el) => this.footerObserver.observe(el))
    }

    const observeStickyHeaderChanges = (container) => {
      observeHeaders(container)
      observeFooters(container)
    }

    observeStickyHeaderChanges(document.querySelector('#inspire'))

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
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
  beforeDestroy() {
    this.$eventBus.$off('user-created')
    this.$eventBus.$off('grid-refresh')
    this.$eventBus.$off('unselectAll-record')
    this.headerObserver.disconnect()
    this.footerObserver.disconnect()
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    getRowOption() {
      this.hasRowOption = true
    },
    getGridOption() {
      this.hasGridOption = true
    },
    updatePagination(pagination) {
      // call rest
      if (pagination.itemsPerPage !== this.itemPerPage) {
        this.loading = true
        this.itemPerPage = pagination.itemsPerPage
        this.$apollo.queries.tableData.refresh()
      }
      this.loadRestData()
    },
    updatePageChange(data) {
      this.loading = true
    },
    onFilterClick(e) {
      this.isFilterApplied = true
    },
    onRowClick(item, props) {
      if (!this.showSelect && !this.$device.isMobile) {
        this.selectedItems = [item]
      }
    },
    onItemSelected(items) {
      this.selectedItems = items
      this.$emit('onSelectedListChange', this.selectedItems)
      this.$eventBus.$emit('itemSelected', {
        viewName: this.viewName,
        items: this.selectedItems,
      })
    },
    async onNewItemSave(data) {
      const dataSource = getViewDataSource(this.content, this.viewName)
      const dataSourceType = dataSource.type || 'graphql'
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
      if (dataSourceType === 'rest') {
        this.loadRestData()
      }
      this.$apollo.queries.tableData.refresh()
      this.snackbarText = `${modelName} Created Successfully`
      this.snackbar = true
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
      this.refresh()
      this.snackbarText = `${modelName} Updated Successfully`
      this.snackbar = true
      return itemUpdated
    },
    async onDeleteItem(ids) {
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      try {
        const itemDeleted = await this.$apollo.mutate({
          mutation: gql(deleteItemMutation),
          variables: {
            Inputs: {
              where: {
                id: {
                  inq: ids,
                },
              },
              clientMutationId: this.$t('Messages.Success.ListUpdatedSucess', {
                modelName,
              }),
            },
          },
        })
        if (itemDeleted) {
          this.refresh()
          this.snackbarText = this.$t('Messages.Success.DeleteSuccess', {
            modelName,
          })
          this.snackbar = true
          return itemDeleted
        }
      } catch (e) {
        const error = e
        if (error.message.split(':')[1] === ' Access denied') {
          this.snackbarText = this.$t('Messages.Error.PermissionDenied')
          this.snackbar = true
        }
        console.error(
          `Errors in components/common/grid/index.vue on onDeleteItem method context:-${ids} `,
          error
        )
      }
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
    unselectAllRecord(viewName) {
      if (viewName === this.viewName) {
        this.selectedItems = []
      }
    },
    async loadRestData() {
      const dataSource = getViewDataSource(this.content, this.viewName)
      const dataSourceType = dataSource.type || 'graphql'
      console.debug('Data Source Type is: ', dataSourceType)
      console.debug('this.content is: ', this.content)
      console.debug('this.viewname is: ', this.viewname)
      if (dataSourceType === 'rest') {
        const { search, filters } = this
        const options = {
          ...this.options,
          search,
          filters,
        }

        const getDataFunc = dataSource.getData.call(this, this)
        try {
          console.debug('In try block')
          this.tableData = await getDataFunc.call(this, options)
          this.loading = false
        } catch (e) {
          console.debug('In catch block')
          console.error(
            `Errors in components/common/grid/index.vue while calling method loadRestData`,
            e
          )
          this.loading = false
        }
        console.debug('Done with try-catch block.')
      }
    },
    translate(headers) {
      const headerObj = []
      headers.map((e) => {
        e.text = this.$t(e.text)
        headerObj.push(e)
      })
      return headerObj
    },
    onResize() {
      this.winWidth = window.innerWidth
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
      result({ data, loading, networkStatus }) {
        this.loading = false
      },
      error(error) {
        this.error = error
        this.loading = false
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
.v-tooltip__content {
  font-size: 11px !important;
  margin-top: -19px;
  padding: 0 8px !important;
}
@media (min-width: 601px) {
  .grid-actions-menu {
    display: none !important;
  }
}
@media (max-width: 600px) {
  .grid-actions-spread {
    display: none !important;
  }
  div[role='menu'].v-menu__content {
    overflow-y: hidden;
  }
  :root {
    --header-height: 80px;
  }
  .sticky {
    position: sticky;
    top: 40px;
    z-index: 1;
    height: var(--header-height);
  }
  .sticky.grid-actions-container {
    margin-top: -77px;
  }
  .sticky_sentinel {
    position: absolute;
    left: 0;
    right: 0;
    visibility: hidden;
  }
  .sticky_sentinel--top {
    height: 20px;
    top: -44px;
  }
  .sticky_sentinel--bottom {
    height: var(--header-height);
    bottom: 0;
  }
  .sticky_inline_flex {
    display: inline-flex;
    left: 100%;
    top: 40px;
    margin-bottom: 0;
    z-index: 5;
  }
  .sticky_block {
    display: block;
    top: 55px;
    margin-bottom: 0;
    z-index: 5;
    width: 50%;
    float: right;
  }
}
</style>

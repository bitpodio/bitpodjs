<template>
  <div :id="viewName">
    <ExportLoader
      :is-loading="exportInProgress"
      :title="$t('Drawer.ExportToCSV')"
      :message="$t('Common.ExportInProgress')"
      :stop-loading="
        () => {
          this.$store.commit('setExportInProgress', {
            value: false,
            key: '',
          })
        }
      "
    />
    <confirm ref="confirm"></confirm>
    <template v-if="!!error">
      <div>
        <component :is="errorTemplate || null" :error="error" />
      </div>
    </template>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" width="2px">
      <div class="fs-16 text-center">{{ snackbarText }}</div>
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
          <div v-if="showTripleDot && winWidth < 600" class="grid-actions-menu">
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
                  :on-csv-export="onCsvExport"
                  :can-export="!!tableData.items.length"
                  :refresh="refresh"
                  :context="context"
                  @has-custom-grid-action="getGridOption"
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
                  @has-custom-row-action="getRowOption"
                />
              </v-list>
            </v-menu>
          </div>
          <div v-else-if="winWidth > 600" class="grid-actions-spread">
            <div class="d-flex align-center">
              <component
                :is="actionTemplates['grid'] || null"
                :content="content"
                :view-name="viewName"
                :on-new-item-save="onNewItemSave"
                :on-csv-export="onCsvExport"
                :can-export="!!tableData.items.length"
                :refresh="refresh"
                :context="context"
                class="d-inline-flex"
                @has-custom-grid-action="getGridOption"
              />
              <component
                :is="actionTemplates['row-select'] || null"
                v-if="
                  selectedItems.length > 0 && actionsCount <= baseActionCount
                "
                :content="content"
                :view-name="viewName"
                :on-update-item="onUpdateItem"
                :on-delete-item="onDeleteItem"
                :items="selectedItems"
                :refresh="refresh"
                :context="context"
                :get-action-items="getActionItems"
                class="d-inline-flex"
                @has-custom-row-action="getRowOption"
              />
            </div>
          </div>
          <div v-if="hideFilter" class="grid-filter">
            <slot name="filter">
              <FieldsFilter v-model="filters" :fields="filterableFields" />
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
          <v-menu
            v-if="
              selectedItems.length > 0 &&
              actionsCount > baseActionCount &&
              !hasHiddenRowAction
            "
            right
            :offset-y="offset"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <component
                :is="actionTemplates['row-select'] || null"
                :content="content"
                :view-name="viewName"
                :on-update-item="onUpdateItem"
                :on-delete-item="onDeleteItem"
                :items="selectedItems"
                :refresh="refresh"
                :context="context"
                :get-action-items="getActionItems"
                @has-custom-row-action="getRowOption"
              />
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-skeleton-loader
        :loading="loading"
        :type="
          viewName === 'live-and-draft-event' ||
          viewName === 'template' ||
          viewName === 'seatmaps' ||
          viewName === 'badge' ||
          viewName === 'integration'
            ? ''
            : 'table'
        "
        :class="{
          'mt-16 mt-sm-14': this.hasCustomNoDataText && noAction,
        }"
      >
        <v-data-table
          :key="componentRerenderKey"
          v-model="selectedItems"
          dense
          :no-data-text="noDataText"
          :headers="translate(headers)"
          :items="tableData.items"
          :single-select="singleSelect"
          :loading="loading"
          :options.sync="options"
          :server-items-length="tableData.total"
          :hide-default-header="hideDefaultHeader"
          :hide-default-footer="showPagination()"
          :show-expand="showExpand"
          :single-expand="singleExpand"
          item-key="id"
          class="elevation-0 v-grid"
          :class="hideDefaultHeader ? 'px-0 pt-0 istemplate' : 'px-2 pt-1'"
          :footer-props="{ 'items-per-page-options': perPageOption }"
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
        v-if="viewName === 'live-and-draft-event' && loading === true"
        class="d-flex flex-sm-wrap flex-column flex-sm-row"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="!!loading"
          type="card"
          width="264"
          class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'template' && loading === true"
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
        v-if="viewName === 'badge' && loading === true"
        class="d-flex flex-sm-wrap flex-column flex-sm-row"
      >
        <div class="public-page-main d-flex flex-wrap flex-row">
          <div
            v-for="i in 10"
            :key="i"
            class="pa-0 eventtiles badge-tile boxview ma-3 ml-0 mt-0 v-card elevation-0"
          >
            <v-skeleton-loader
              :loading="loading"
              :tile="true"
              type="avatar"
              class="ml-3 mt-2"
              width="150"
              height="30"
            >
              <div class="ml-3 mt-2"></div>
            </v-skeleton-loader>
            <v-skeleton-loader
              :loading="loading"
              :tile="true"
              type="avatar"
              class="mx-auto mt-18"
              width="180"
              height="30"
            >
              <div class="mx-auto mt-18"></div>
            </v-skeleton-loader>
            <v-skeleton-loader
              :loading="loading"
              :tile="true"
              type="avatar"
              class="ml-4"
              width="200"
              height="20"
            >
              <div class="ml-4"></div>
            </v-skeleton-loader>
          </div>
        </div>
      </div>
      <div
        v-if="viewName === 'seatmaps' && loading === true"
        class="d-flex flex-wrap flex-row seat-skeleton-inner mt-10 pl-2"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="loading"
          type="card"
          width="155"
          height="125"
          class="pl-0 pt-0 eventtiles ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'integration' && loading === true"
        class="d-flex flex-wrap flex-row seat-skeleton-inner mt-16 pl-2"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="loading"
          type="card"
          width="150"
          height="125"
          class="pl-0 pt-0 eventtiles ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div
        v-if="viewName === 'Member' && loading === true"
        class="d-flex flex-sm-wrap flex-column flex-sm-row"
      >
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="loading"
          type="card"
          width="230"
          height="230"
          class="text-center mx-auto ma-sm-8 ml-sm-0 mt-sm-0 member-tile elevation-0"
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
import { formatGQLResult } from '~/utility/gql.js'
import ExportLoader from '~/components/Loader.vue'

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
      customExport = false,
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
        customExport,
        class: type === 'number' ? 'text-right' : '',
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

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 150)
  }
  a.addEventListener('click', clickHandler, { once: true })
  a.click()
}

function prepareCSV(finalResult, modelName, headerList) {
  const replacer = (key, value) => {
    if (value === null) return ''
    else {
      let formattedVal = value
      if (typeof value === 'object') {
        formattedVal = JSON.stringify(value, (k, v) => (v === null ? '' : v))
        formattedVal = formattedVal.replace(/"/g, "'")
        return formattedVal
      } else if (typeof value === 'string') {
        formattedVal = formattedVal.replace(/"/g, "'")
        return formattedVal
      }
      return value
    }
  }
  if (finalResult[0]) {
    const header = headerList.map(({ text }) => text)
    const csvContent = [
      header.join(','),
      ...finalResult.map((row) =>
        headerList
          .map(({ value: fieldName, customExport }) => {
            if (customExport) {
              return JSON.stringify(customExport(row[fieldName]), replacer)
            } else if (fieldName.includes('.')) {
              return JSON.stringify(
                fieldName.split('.').reduce((o, i) => o?.[i], row),
                replacer
              )
            } else {
              return JSON.stringify(row[fieldName], replacer)
            }
          })
          .join(',')
      ),
    ].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    downloadBlob(blob, `${modelName} - ${new Date().toLocaleDateString()}.csv`)
  }
}

export default {
  components: {
    FieldsFilter,
    ExportLoader,
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
    hasCustomNoDataText: {
      type: String,
      default: '',
    },
  },
  data() {
    const headers = getTableHeader(this.content, this.viewName, this)
    const gridProps = getGridsProps(this.content, this.viewName)
    return {
      perPageOption: [5, 10, 20, 50],
      headers,
      tableData: {
        items: [],
        total: 0,
      },
      loading: true,
      totalCount: 0,
      options: {},
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
      timeout: 3000,
      snackbarText: '',
      hasGridOption: false,
      hasRowOption: false,
      headerObserver: null,
      footerObserver: null,
      winWidth: window.innerWidth,
      itemPerPage: 0,
      componentRerenderKey: `${this.viewName}-init`,
      noDataText: this.$t('Common.NoDataAvailable'),
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
      return this.hideDefaultFooter
    },
    showTripleDot() {
      const templateActions = this.content.views?.[this.viewName]?.template
        ?.actions
      if (this.hasGridOption) {
        return true
      } else if (
        this.hasRowOption &&
        templateActions?.new?.hidden &&
        templateActions?.exportCsv?.hidden
      ) {
        return this.selectedItems.length > 0
      } else if (templateActions) {
        const hasNew = !templateActions.new?.hidden
        const hasExport = !templateActions.exportCsv?.hidden
        const hasEdit = !templateActions.edit?.hidden
        const hasDelete = !templateActions.delete?.hidden
        if (hasNew || hasExport) {
          return true
        } else if (hasEdit || hasDelete) {
          return this.selectedItems.length > 0 && (hasEdit || hasDelete)
        } else {
          return false
        }
      } else {
        return true
      }
    },
    exportInProgress() {
      return (
        this.$store.state.exportInProgress.value &&
        this.viewName === this.$store.state.exportInProgress.key
      )
    },
    actionsCount() {
      if (this.winWidth > 600) {
        const actionSpreadParents = document
          .getElementById(this.viewName)
          .getElementsByClassName('grid-actions-spread')?.[0]
          ?.getElementsByClassName('d-flex')?.[0]
          ?.getElementsByClassName('d-inline-flex')
        const actionsSpreadCount =
          [...actionSpreadParents].reduce(
            (acc, elem) => acc + elem.childElementCount,
            0
          ) +
          (document
            .getElementById(this.viewName)
            .getElementsByClassName('grid-filter')?.[0]
            ? 1
            : 0) +
          (document
            .getElementById(this.viewName)
            .getElementsByClassName('grid-search-section')?.[0]
            ? 1
            : 0)
        return actionsSpreadCount
      }
      return 0
    },
    baseActionCount() {
      if (this.winWidth <= 1600 && this.winWidth >= 600) {
        return 2
      } else if (this.winWidth >= 1600) {
        return 3
      }
      return 0
    },
    hasHiddenRowAction() {
      const templateActions = this.content.views?.[this.viewName]?.template
        ?.actions
      if (templateActions) {
        const hasHiddenEdit = templateActions.edit?.hidden
        const hasHiddenDelete = templateActions.delete?.hidden
        return hasHiddenEdit || hasHiddenDelete
      }
      return false
    },
    eveId() {
      return this.$route.params.app === 'event'
        ? this.$route.params.id || ''
        : ''
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
    hasCustomNoDataText() {
      this.noDataText = this.hasCustomNoDataText
        ? this.hasCustomNoDataText
        : this.$t('Common.NoDataAvailable')
      this.componentRerenderKey = `${this.viewName}-${this.eveId}-nodatatextupdated-${this.hasCustomNoDataText}`
    },
  },
  mounted() {
    debugger
    setTimeout(() => {
      this.selectedItems = []
    }, 2000)
    this.$eventBus.$on('unselectAll-record', this.unselectAllRecord)
    this.$eventBus.$on('eventInvites-grid-refresh', this.refreshGrid)
    this.$eventBus.$on('toggle-snackbar', this.toggleSnackbar)
    this.$eventBus.$on('toggle-confirm', this.toggleConfirm)
    this.noDataText = this.hasCustomNoDataText
      ? this.hasCustomNoDataText
      : this.$t('Common.NoDataAvailable')
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
    this.componentRerenderKey = `${this.viewName}-${this.eveId}-slotsfetched`
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
    if (this.winWidth < 600)
      observeStickyHeaderChanges(document.querySelector(`#${this.viewName}`))
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
    this.$eventBus.$off('toggle-snackbar')
    this.$eventBus.$off('toggle-confirm')
    this.headerObserver?.disconnect()
    this.footerObserver?.disconnect()
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    showPagination() {
      return this.tableData.total >= this.perPageOption[0]
        ? this.isHideDefaultFooter
        : true
    },
    toggleSnackbar(toggleViewName, message, timeout = 3000) {
      if (this.viewName === toggleViewName) {
        this.snackbarText = message
        this.timeout = timeout
        this.snackbar = true
        this.refresh()
      }
    },
    async toggleConfirm(
      toggleViewName,
      callbackEvent,
      { title, message, options }
    ) {
      if (this.viewName === toggleViewName) {
        const confirmResend = await this.$refs.confirm.open(
          title,
          message,
          options
        )
        if (confirmResend) {
          this.$eventBus.$emit(`${callbackEvent}`)
        }
      }
    },
    refreshGrid(viewName) {
      if (viewName === this.viewName) {
        this.refresh()
      }
    },
    getRowOption(bool) {
      this.hasRowOption = bool
    },
    getGridOption(bool) {
      this.hasGridOption = bool
    },
    updatePagination(pagination) {
      // call rest
      if (pagination.itemsPerPage !== this.itemPerPage) {
        this.loading = true
        this.itemPerPage = pagination.itemsPerPage
        this.$apollo.queries.tableData.refresh()
        this.loadRestData()
      }
    },
    updatePageChange(data) {
      this.loading = true
      this.loadRestData()
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
      if (userCreated) {
        this.$apollo.queries.tableData.refresh()
        this.snackbarText = this.$t('Messages.Success.CreatedSuccessfully', {
          modelName: this.$t(dataSource.singularEntity) || modelName,
        })
        this.snackbar = true
        return userCreated
      }
    },
    async onCsvExport(data) {
      const dataSource = getViewDataSource(this.content, this.viewName)
      const dataSourceType = dataSource.type || 'graphql'
      const modelName =
        getModelName(this.content, this.viewName) || this.content.general.name
      const headerList = this.translate(this.headers)
      if (dataSourceType === 'rest') {
        const { search, filters } = this
        const options = {
          ...this.options,
          search,
          filters,
        }
        const getDataFunc = dataSource.getData.call(this, this, true)
        try {
          this.$store.commit('setExportInProgress', {
            value: true,
            key: this.viewName,
          })
          const finalResult = await getDataFunc.call(this, options)
          if (this.exportInProgress) {
            prepareCSV(finalResult, this.viewName, headerList)
          }
          this.$store.commit('setExportInProgress', {
            value: false,
            key: '',
          })
        } catch (e) {
          console.error(`Error while exporting to CSV via rest`, e)
        }
      } else {
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
        const itemsPerPage = this.options.itemsPerPage === -1 ? -1 : 50
        let skip = 0
        const limit = itemsPerPage === -1 ? 0 : itemsPerPage
        let finalResult = []
        let shouldDownload = false
        if (itemsPerPage !== -1) {
          this.$store.commit('setExportInProgress', {
            value: true,
            key: this.viewName,
          })
          while (this.exportInProgress) {
            try {
              const result = await this.$apollo.query({
                query: gql`
                  ${getViewQuery(this.content, this.viewName)}
                `,
                variables: {
                  filters: { limit, skip, order, where },
                  where: {},
                },
                fetchPolicy: 'no-cache',
              })
              if (result) {
                const formattedResult = formatGQLResult(result.data, modelName)
                if (formattedResult.length) {
                  finalResult = finalResult.concat(formattedResult)
                  skip += 50
                } else {
                  shouldDownload = true
                  this.$store.commit('setExportInProgress', {
                    value: false,
                    key: '',
                  })
                }
              } else {
                this.$store.commit('setExportInProgress', {
                  value: false,
                  key: '',
                })
              }
            } catch (e) {
              console.error(`Error while exporting to CSV via graphql`, e)
              this.$store.commit('setExportInProgress', {
                value: false,
                key: '',
              })
            }
          }
          if (shouldDownload) {
            prepareCSV(finalResult, this.viewName, headerList)
          }
          this.$store.commit('setExportInProgress', {
            value: false,
            key: '',
          })
        }
      }
    },
    async onUpdateItem(data) {
      const modelName = getModelName(this.content, this.viewName)
      const dataSource = getViewDataSource(this.content, this.viewName)
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
      if (itemUpdated) {
        this.refresh()
        this.snackbarText = this.$t('Messages.Success.UpdatedSuccessfully', {
          modelName: this.$t(dataSource.singularEntity) || modelName,
        })
        this.snackbar = true
        return itemUpdated
      }
    },
    async onDeleteItem(ids) {
      const modelName = getModelName(this.content, this.viewName)
      const dataSource = getViewDataSource(this.content, this.viewName)
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
          this.snackbarText =
            ids.length > 1
              ? this.$t('Messages.Success.DeleteSuccess', {
                  modelName: this.$t(dataSource.pluralEntity) || modelName,
                })
              : this.$t('Messages.Success.DeleteSuccess', {
                  modelName: this.$t(dataSource.singularEntity) || modelName,
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
      if (viewName === 'inviteeEventTasks') {
        this.refreshGrid(viewName)
      }
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
        try {
          this.tableData = await getDataFunc.call(this, options)
          this.noDataText = this.hasCustomNoDataText
            ? this.hasCustomNoDataText
            : this.$t('Common.NoDataAvailable')
          this.componentRerenderKey = `${this.viewName}-${this.eveId}-restfetched`
          this.loading = false
        } catch (e) {
          console.error(
            `Errors in components/common/grid/index.vue while calling method loadRestData`,
            e
          )
          this.noDataText = this.hasCustomNoDataText
            ? this.hasCustomNoDataText
            : this.$t('Common.ServiceUnavailable')
          this.loading = false
        }
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
        const skip = search ? 0 : (page - 1) * (itemsPerPage || 10)
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
        this.componentRerenderKey = `${this.viewName}-${this.eveId}-dataloaded`
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
.badge-tile {
  width: 229px;
  height: 300px;
  border-radius: 4px;
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

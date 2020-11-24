<template>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :loading="isLoading"
      :label="fieldCaption"
      :multiple="field.multiple"
      :rules="rules"
      :readonly="readonly"
      :search-input.sync="search"
      outlined
      dense
      clearable
      :no-data-text="userMsg"
      @change="onLookupChange"
      @input="onSearchInput"
      @focus="onInputFocus"
    ></v-autocomplete>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { getIdFromAtob } from '~/utility'
import { formFieldMixin } from '~/utility/form-control'
import { debounce } from '~/utility/object'

function formatResult(data) {
  const [modelName] = Object.getOwnPropertyNames(data)
  const [modelApi] = Object.getOwnPropertyNames(data[modelName])
  const { edges } = data[modelName][`${modelApi}`]
  return edges.map(({ node: { id, ...rest } }) => {
    return { id: getIdFromAtob(id), ...rest }
  })
}

function getSearchWhereFilter(filterDetails) {
  const { displayFields, value } = filterDetails
  const fieldsFilter = displayFields.map((field) => {
    return {
      [field]: {
        like: value,
        options: 'i',
      },
    }
  })
  return { or: fieldsFilter }
}

export default {
  mixins: [formFieldMixin],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    filter: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      items: this.field.dataSource.items || [],
      isLoading: false,
      itemText: this.field.dataSource.itemText || 'text',
      itemValue: this.field.dataSource.itemValue || 'value',
      search: '',
      initialDataFetch: false,
    }
  },
  computed: {
    userMsg() {
      if (this.initialDataFetch) {
        return 'Please enter 3 or more characters'
      } else if (this.isLoading) {
        return 'Searching'
      }
      return 'No Data available'
    },
  },
  watch: {
    filter(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.debouncedLoadItems()
      }
    },
    search(value) {
      if (!value || value.length < 2) {
        this.isLoading = false
        return
      } else if (this.value) {
        this.isLoading = false
        return
      }
      this.debouncedLoadItems(value, this)
    },
  },
  created() {
    this.debouncedLoadItems = debounce(this.loadItems, 500)
  },
  async mounted() {
    const filters = { where: { id: this.value } }
    const result = await this.$apollo.query({
      query: gql`
        ${this.field.dataSource.query}
      `,
      variables: {
        filters,
      },
    })
    this.items = formatResult(result.data)
  },
  methods: {
    onLookupChange() {
      this.$emit('change', this.value)
      this.onChange && this.onChange(this.value, this)
    },
    async loadItems(value) {
      this.isLoading = true
      const dataSourceType = this.field.dataSource.type || 'graphql'
      if (dataSourceType === 'rest') {
        const getDataFunc = self.field.dataSource.getData.call(this, this)
        this.items = await getDataFunc.call(this)
      } else {
        const where =
          this.filter || this.field.dataSource.filter.call(this) || {}
        const value = this.search || ''
        const displayFields = [this.itemText]
        const filterDetails = {
          displayFields,
          value,
        }
        const serarchFilter = getSearchWhereFilter(filterDetails)
        const filters = { where: { and: [where, serarchFilter] } }
        const result = await this.$apollo.query({
          query: gql`
            ${this.field.dataSource.query}
          `,
          variables: {
            filters,
          },
        })
        const items = formatResult(result.data)
        this.items = items.map((item) => {
          const computedItemFunction = this.field.dataSource.computed
          const computedItem = computedItemFunction
            ? computedItemFunction.call(this, item)
            : {}
          return { ...item, ...computedItem }
        })
      }
      this.isLoading = false
      this.initialDataFetch = false
    },
    onInputFocus() {
      this.initialDataFetch = true
    },
  },
}
</script>

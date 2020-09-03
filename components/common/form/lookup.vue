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
      outlined
      @change="onChange"
    ></v-autocomplete>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { getIdFromAtob } from '~/utility'
import { formFieldMixin } from '~/utility/form-control'

function formatResult(data) {
  const [modelName] = Object.getOwnPropertyNames(data)
  const { edges } = data[modelName][`${modelName}Find`]
  return edges.map(({ node: { id, ...rest } }) => {
    return { id: getIdFromAtob(id), ...rest }
  })
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
  },
  data() {
    return {
      items: this.field.dataSource.items || [],
      isLoading: false,
      itemText: this.field.dataSource.itemText || 'text',
      itemValue: this.field.dataSource.itemValue || 'value',
    }
  },
  watch: {
    filter(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadItems()
      }
    },
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    },
    async loadItems() {
      if (!this.field.items) {
        const dataSourceType = this.field.dataSource.type || 'graphql'
        if (dataSourceType === 'rest') {
          const getDataFunc = this.field.dataSource.getData.call(this, this)
          this.items = await getDataFunc.call(this)
        } else {
          const where =
            this.filter || this.field.dataSource.filter.call(this) || {}
          const result = await this.$apollo.query({
            query: gql`
              ${this.field.dataSource.query}
            `,
            variables: {
              filters: { where },
            },
          })
          this.items = formatResult(result.data)
        }
      }
    },
  },
}
</script>

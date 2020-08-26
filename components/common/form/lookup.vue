<template>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :loading="isLoading"
      :label="field.caption"
      outlined
      @change="onChange"
    ></v-autocomplete>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { getIdFromAtob } from '~/utility'

function formatResult(data) {
  const [modelName] = Object.getOwnPropertyNames(data)
  const { edges } = data[modelName][`${modelName}Find`]
  debugger
  return edges.map(({ node: { id, ...rest } }) => {
    return { id: getIdFromAtob(id), ...rest }
  })
}

export default {
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
    },
  },
}
</script>

<template>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :loading="isLoading"
      single-line
      @change="onChange"
    ></v-autocomplete>
  </div>
</template>

<script>
import gql from 'graphql-tag'

function formatResult(data) {
  debugger
  const [modelName] = Object.getOwnPropertyNames(data)
  const { edges } = data[modelName][`${modelName}Find`]
  return edges.map(({ node }) => node)
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
  },
  data() {
    return {
      items: this.field.dataSource.items || [],
      isLoading: false,
      itemText: this.field.dataSource.itemText || 'text',
      itemValue: this.field.dataSource.itemValue || 'value',
    }
  },
  async mounted() {
    if (!this.field.items) {
      const where = this.field.dataSource.filter || {}
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
  methods: {
    onChange() {
      this.$emit('change', this.value)
    },
  },
}
</script>

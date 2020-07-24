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

function formatResult(data, modelName) {
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
  },
  data() {
    return {
      items: this.field.items || [],
      isLoading: false,
      itemText: this.field.itemText || 'text',
      itemValue: this.field.itemValue || 'value',
    }
  },
  async mounted() {
    if (!this.field.items) {
      const where = this.field.filter || {}
      const result = await this.$apollo.query({
        query: gql`
          ${this.field.query}
        `,
        variables: {
          filters: { where },
        },
      })
      this.items = formatResult(result.data, this.field.modelName)
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    },
  },
}
</script>

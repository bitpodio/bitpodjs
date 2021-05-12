<template>
  <div>
    <v-select
      v-model="value"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :loading="isLoading"
      :label="fieldCaption"
      :multiple="field.multiple"
      :rules="rules"
      :readonly="readonly"
      outlined
      dense
      @change="onLookupChange"
    >
      <template v-if="hasErrorTooltip" v-slot:message="{ message, key }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" :key="key">{{ message }}</span>
          </template>
          <span :key="key">{{ message }}</span>
        </v-tooltip>
      </template>
    </v-select>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { getIdFromAtob } from '~/utility'
import { formFieldMixin } from '~/utility/form-control'

function formatResult(data) {
  const [modelName] = Object.getOwnPropertyNames(data)
  const [modelApi] = Object.getOwnPropertyNames(data[modelName])
  const { edges } = data[modelName][`${modelApi}`]
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
    readonly: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
      required: false,
      default: () => null,
    },
    hasErrorTooltip: {
      type: Boolean,
      default: false,
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
    onLookupChange() {
      this.$emit('change', this.value)
      this.onChange && this.onChange(this.value, this)
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
            fetchPolicy: 'no-cache',
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
      }
    },
  },
}
</script>

<template>
  <div>
    <v-autocomplete
      v-model="timezone"
      :items="items"
      item-text="label"
      item-value="tzCode"
      :label="field.caption"
      :rules="rules"
      outlined
      @change="onChange"
    ></v-autocomplete>
  </div>
</template>

<script>
import { timezoneList } from './timezone-list'
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
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      items: timezoneList || [],
      timezone: this.value || Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  },
  mounted() {
    this.onChange()
  },
  methods: {
    onChange() {
      this.$emit('change', this.timezone)
    },
  },
}
</script>

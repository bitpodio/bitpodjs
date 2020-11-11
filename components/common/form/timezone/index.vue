<template>
  <v-autocomplete
    v-model="timezone"
    :items="items"
    item-text="label"
    item-value="tzCode"
    :loading="isLoading"
    :label="$t(field.caption)"
    :rules="rules"
    dense
    outlined
    @change="onChange"
  ></v-autocomplete>
</template>

<script>
import { timezoneList } from './timezone-list'
import { formFieldMixin } from '~/utility/form-control'
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
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.timezone = newVal
      }
    },
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

<template>
  <v-autocomplete
    v-model="timezone"
    :items="items"
    item-text="label"
    item-value="tzCode"
    :loading="isLoading"
    :label="$t(field.caption)"
    :rules="rules"
    :attach="attach"
    dense
    outlined
    @change="onChange"
  >
    <template v-if="hasWrap" v-slot:item="data">
      <v-list-item-content
        class="wrap-slot"
        v-text="data.item.label"
      ></v-list-item-content>
    </template>
  </v-autocomplete>
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
    attach: {
      type: [String, Boolean],
      default: false,
    },
    hasWrap: {
      type: Boolean,
      default: false,
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
<style scoped>
.wrap-slot {
  width: 100%;
  overflow-wrap: break-word;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>

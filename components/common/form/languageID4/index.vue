<template>
  <v-autocomplete
    v-model="language"
    :items="items"
    item-text="label"
    item-value="transCode"
    :loading="isLoading"
    :label="$t(field.caption)"
    :rules="rules"
    :attach="attach"
    dense
    outlined
    @change="onChange"
  >
    <template v-slot:item="data" v-if="hasWrap">
      <v-list-item-content
        v-text="data.item.label"
        class="wrap-slot"
      ></v-list-item-content>
    </template>
  </v-autocomplete>
</template>
<script>
import { languagelist } from './language-list.js'
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
      items: languagelist || [],
      language: this.value || '',
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.language = newVal
      }
    },
  },
  mounted() {
    this.onChange()
  },
  methods: {
    onChange() {
      this.$emit('change', this.language)
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

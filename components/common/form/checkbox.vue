<template>
  <v-checkbox
    v-model="checkboxValue"
    :label="fieldCaption"
    :rules="rules"
    @change="onCheckboxClick"
  ></v-checkbox>
</template>
<script>
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: {
    value: { type: null, default: null },
    field: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
  },
  data() {
    return {
      checkboxValue: this.value,
    }
  },
  methods: {
    onCheckboxClick() {
      this.$emit('input', this.checkboxValue)
    },
  },
}
</script>

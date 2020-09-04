<template>
  <v-checkbox
    v-model="checkboxValue"
    :label="fieldCaption"
    :rules="rules"
    @click="onCheckboxClick"
  ></v-checkbox>
</template>
<script>
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: ['value', 'field', 'rules'],
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

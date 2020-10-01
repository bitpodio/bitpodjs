<template>
  <v-text-field
    v-model="textInput"
    :label="fieldCaption"
    :type="fieldControlType"
    outlined
    dense
    :rules="rules"
    :min="field.minimumValue"
    :readonly="readonly"
    @keyup="onKeyup"
  ></v-text-field>
</template>

<script>
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: {
    value: {
      type: null,
      default: null,
    },
    fieldCaption: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textInput: this.value,
    }
  },
  computed: {
    fieldControlType() {
      switch (this.field.type) {
        case 'string':
          return 'text'
      }
      return this.field.type
    },
  },
  methods: {
    onKeyup() {
      const value =
        this.field.type === 'number'
          ? parseFloat(this.textInput)
          : this.textInput
      this.$emit('input', value)
    },
  },
}
</script>

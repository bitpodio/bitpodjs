<template>
  <v-text-field
    v-model="textInput"
    :label="fieldCaption"
    :type="fieldControlType"
    outlined
    :rules="rules"
    :readonly="readonly"
    @keyup="onKeyup"
  ></v-text-field>
</template>

<script>
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: ['value', 'field', 'rules', 'readonly'],
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

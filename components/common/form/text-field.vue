<template>
  <v-text-field
    v-model="textInput"
    :label="field.caption"
    :type="fieldControlType"
    :rules="rules"
    :readonly="readonly"
    @keyup="onKeyup"
  ></v-text-field>
</template>

<script>
export default {
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

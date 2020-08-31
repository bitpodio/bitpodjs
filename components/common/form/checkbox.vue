<template>
  <v-checkbox
    v-model="checkboxValue"
    :label="field.caption"
    :rules="rules"
    @click="onCheckboxClick"
  ></v-checkbox>
</template>
<script>
export default {
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

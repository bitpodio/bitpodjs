<template>
  <v-text-field
    v-model="value"
    label="Enter a value"
    type="text"
    @keyup="onKeyup"
  ></v-text-field>
</template>

<script>
// import {  } from "module";
export default {
  props: ['value'],
  data() {
    return {
      value1: '',
    }
  },
  methods: {
    onKeyup() {},
  },
}
</script>

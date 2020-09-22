<template>
  <v-text-field
    v-model="filterRule.value"
    label="Enter a value"
    type="number"
    outlined
    dense
    @keyup.enter="onFilterInput"
  ></v-text-field>
</template>

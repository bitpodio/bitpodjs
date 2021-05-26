<template>
  <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
    <v-icon left>mdi-plus</v-icon> <i18n path="Common.NewContact" />
  </v-btn>
</template>

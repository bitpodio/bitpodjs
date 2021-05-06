<template>
  <v-list dense class="py-0 mx-4">
    <v-list-item>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Dark Mode"
        persistent-hint
      ></v-switch>
    </v-list-item>
  </v-list>
</template>

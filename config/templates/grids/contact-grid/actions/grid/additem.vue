<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="blue darken-2"
          dark
          class="ma-3 block wd-full"
          v-on="on"
        >
          Forms
        </v-btn>
      </template>
    </v-menu>
  </div>
</template>

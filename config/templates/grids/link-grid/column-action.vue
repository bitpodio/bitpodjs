<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title><i18n path="Drawer.Edit" /></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><i18n path="Drawer.Delete" /></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

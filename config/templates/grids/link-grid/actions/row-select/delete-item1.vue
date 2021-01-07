<template>
  <div>
    <v-btn color="primary" dark @click="onDelete">
      <i18n path="Drawer.Delete" />
    </v-btn>
    <v-snackbar v-model="snackbar" timeout="2000" top="true">
      <i18n path="Common.ItemDeletedSuccessfully" />

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          <i18n path="Drawer.Close" />
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      updateCount: 0,
      snackbar: false,
    }
  },
  methods: {
    onDelete() {
      this.dialog = false
    },
  },
}
</script>

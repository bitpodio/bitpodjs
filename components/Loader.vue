<template>
  <v-dialog v-model="enableLoader" persistent max-width="450" z-index="200">
    <v-card>
      <v-toolbar dark :color="barColor" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="d-flex justify-center align-center pa-4">
        <slot name="loader">
          <v-progress-circular
            :size="70"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pt-0">
        <v-btn color="primary" text @click.stop="stopLoading">
          <i18n path="Drawer.Cancel" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    barColor: {
      type: String,
      default: 'primary',
    },
    title: {
      type: String,
      default: 'Loading...',
    },
    stopLoading: {
      type: Function,
      default: () => {},
    },
    loaderKey: {
      type: String,
      default: undefined,
    },
    viewName: {
      type: String,
      required: true,
    },
  },
  computed: {
    enableLoader() {
      console.debug(this.loaderKey)
      console.debug(this.viewName)
      if (this.loaderKey) {
        return this.loaderKey === this.viewName && this.isLoading
      } else {
        return this.isLoading
      }
    },
  },
}
</script>

<template>
  <v-dialog v-model="isLoading" persistent max-width="450" z-index="200">
    <v-card>
      <v-toolbar dark :color="barColor" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text
        class="d-flex flex-column flex-lg-row align-center px-4 py-6"
      >
        <slot name="loader">
          <v-progress-circular
            :width="3"
            :size="40"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </slot>
        <p class="flex-grow-1 pl-0 pl-lg-4 pt-6 pt-lg-0 mb-0 text-body-1">
          {{ message }}
        </p>
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
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    stopLoading: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

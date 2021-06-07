<template>
  <v-list dense class="py-0 mx-4">
    <v-list-item>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Dark Mode"
        persistent-hint
        @change="setTheme"
      ></v-switch>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const userTheme = localStorage.getItem(
      this.$store.state.gaId + '-darkTheme'
    )
    if (userTheme) {
      if (userTheme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
  methods: {
    setTheme() {
      const userTheme = this.$store.state.gaId + '-darkTheme'
      localStorage.setItem(userTheme, this.$vuetify.theme.dark.toString())
    },
  },
}
</script>

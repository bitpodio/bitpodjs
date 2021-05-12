<template>
  <v-menu offset-y transition="slide-y-transition" bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title class="d-flex flex-wrap app-container">
          {{ currentLocale.label }} ({{ currentLocale.iso }})
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-for="locale in availableLocales" :key="locale.code">
        <v-list-item-title class="d-flex flex-wrap app-container">
          <nuxt-link
            class="text-decoration-none"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.label }} ({{ locale.iso }})
          </nuxt-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale)
    },
  },
  created() {
    const { rtl = false } = this.$i18n.locales.find(
      (i) => i.code === this.$i18n.locale
    )
    this.$vuetify.rtl = rtl
    this.$vuetify.lang.current = this.$i18n.locale
  },
}
</script>

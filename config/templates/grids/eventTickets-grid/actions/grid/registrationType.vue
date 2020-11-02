<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="routeToHistory">
      <v-icon left>mdi-file-outline</v-icon>
      <i18n path="Common.RegistrationType" />
    </v-btn>
  </v-col>
</template>
<script>
export default {
  methods: {
    routeToHistory(ctx) {
      this.$router.push(
        this.localePath(
          `/apps/event/list/RegistrationType/eventRegistrationType?event=${this.$route.params.id}`
        )
      )
    },
  },
}
</script>

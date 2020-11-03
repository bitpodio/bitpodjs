<template>
  <v-col class="px-0 min-xw180 vs-hidden">
    <v-switch
      v-model="switch2"
      :label="$t('Common.SeatmapTickets')"
      class="mt-0 max-h24"
      height="20"
    ></v-switch>
  </v-col>
</template>
<script>
export default {
  methods: {
    routeToHistory(ctx) {
      this.$router.push(
        this.localePath(
          `/apps/event/list/Event/eventRegistrationType?event=${this.$route.params.id}`
        )
      )
    },
  },
}
</script>
<style scoped>
.min-xw180 {
  min-width: 180px;
}
.max-h24 {
  max-height: 24px;
}
</style>

<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="routeToHistory">
      <v-icon left>mdi-history</v-icon> Invitation History
    </v-btn>
  </v-col>
</template>
<script>
export default {
  methods: {
    routeToHistory(ctx) {
      this.$router.push(
        `/apps/event/list/Event/eventInvitaionHistory?event=${this.$route.params.id}`
      )
    },
  },
}
</script>

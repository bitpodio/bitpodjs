<template>
  <v-btn
    outlined
    rounded
    x-small
    color="primary"
    class="ml-2"
    @click="onUpgrade"
  >
    <i18n path="Common.Upgrade" />
  </v-btn>
</template>

<script>
export default {
  methods: {
    onUpgrade() {
      const url = `https://${this.$config.axios.crmUrl}/p/upgrade?family=Event&u=${this.$auth.user.data.email}&org=${this.$store.state.currentOrg.name}`
      window.open(`${url}`, '_blank')
    },
  },
}
</script>
<style scoped>
.down {
  margin-top: -2px;
}
</style>

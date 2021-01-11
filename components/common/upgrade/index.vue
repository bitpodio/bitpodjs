<template>
  <div class="d-inline-flex mxcol-200 mt-1 align-center">
    <v-list-item-subtitle class="text-body-2">{{
      userPlan
    }}</v-list-item-subtitle>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPlan: '',
    }
  },
  async mounted() {
    try {
      const url = this.$bitpod.getApiUrl()
      const res = await this.$axios.$get(
        `${url}OrganizationInfos/getSubscription`
      )
      if (res) {
        const obj = res.filter((a) => {
          return a.isActive === true ? a : ''
        })
        this.userPlan = obj[0].SubProduct.DisplayName
      }
    } catch (e) {
      console.log(`Error `, e)
    }
  },
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

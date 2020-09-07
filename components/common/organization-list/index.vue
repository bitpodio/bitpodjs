<template>
  <v-col cols="auto">
    <v-select
      v-model="currentOrg"
      :items="orgList"
      item-text="name"
      item-value="name"
      label="Organizations"
      class="ma-2"
      solo
      hide-details
      @change="onOrgChange"
    ></v-select>
  </v-col>
</template>

<script>
import nuxtconfig from '~/nuxt.config'

export default {
  data() {
    return {
      currentOrg: null,
    }
  },
  computed: {
    orgList() {
      const userOrgList = this.$auth.user.data.orgList
      return userOrgList || []
    },
  },
  created() {
    this.checkOrgDetails()
  },
  methods: {
    onOrgChange(orgName) {
      this.changeCurrentUrl(orgName)
    },
    changeCurrentUrl(orgName) {
      let defaultPublicDomain = nuxtconfig.setting.domains.defaultPublicDomain
      defaultPublicDomain = defaultPublicDomain.split(',')[0]
      const basePath = nuxtconfig.router.base
      const orgURL = `${window.location.protocol}//${orgName}-${defaultPublicDomain}${basePath}`
      window.location.assign(orgURL)
    },
    checkOrgDetails() {
      if (this.$auth.user.data) {
        if (this.$auth.user.data.currentOrg) {
          this.currentOrg = this.$auth.user.data.currentOrg.name
        } else {
          const orgList = this.$auth.user.data.orgList
          const userOrg = orgList && orgList[0].name
          this.changeCurrentUrl(userOrg)
        }
      }
    },
  },
}
</script>

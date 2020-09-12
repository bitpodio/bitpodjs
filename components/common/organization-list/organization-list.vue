<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="27rem">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small color="primary" dark v-bind="attrs" v-on="on">
          Open another organization
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="title">Open another organization</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="currentOrg"
            :items="orgList"
            item-text="name"
            item-value="name"
            label="Organizations"
            class=""
            solo
            hide-details
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onOpenClick">Open</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'

export default {
  data() {
    return {
      currentOrg: null,
      dialog: false,
    }
  },
  computed: {
    orgList() {
      const userOrgList = this.$auth.user.data.orgList
      return userOrgList || []
    },
  },
  created() {
    // this.checkOrgDetails()
  },
  methods: {
    onOrgChange(orgName) {
      this.changeCurrentUrl(orgName)
    },
    changeCurrentUrl(orgName) {
      let defaultPublicDomain = nuxtconfig.setting.domains.defaultPublicDomain
      defaultPublicDomain = defaultPublicDomain.split(',')[0]
      const basePath = this.$router.options.base // nuxtconfig.router.base
      debugger
      const orgURL = `${window.location.protocol}//${orgName}-${defaultPublicDomain}${basePath}`
      console.log(orgURL)
      window.open(orgURL, '_blank')
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
    onOpenClick() {
      this.currentOrg && this.changeCurrentUrl(this.currentOrg)
      this.dialog = false
    },
  },
}
</script>

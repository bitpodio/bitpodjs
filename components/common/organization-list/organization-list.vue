<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="27rem">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small color="primary" dark v-bind="attrs" v-on="on">
          <i18n path="Common.OpenAnotherOrganization" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2 class="black--text pt-2 pb-2 text-h5">
            <i18n path="Common.OpenAnotherOrganization" />
          </h2>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="currentOrg"
            :items="orgList"
            item-text="name"
            item-value="name"
            :label="$t('Common.Organizations')"
            outlined
            dense
            hide-details
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onOpenClick"
            ><i18n path="Common.Open"
          /></v-btn>
          <v-btn color="grey darken-1" text @click="dialog = false"
            ><i18n path="Drawer.Cancel"
          /></v-btn>
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
  methods: {
    onOrgChange(orgName) {
      this.changeCurrentUrl(orgName)
    },
    changeCurrentUrl(orgName) {
      let defaultPublicDomain = nuxtconfig.setting.domains.defaultPublicDomain
      defaultPublicDomain = defaultPublicDomain.split(',')[0]
      const basePath = this.$router.options.base
      const orgURL = `${window.location.protocol}//${orgName}-${defaultPublicDomain}${basePath}`
      window.open(orgURL, '_blank')
    },
    onOpenClick() {
      this.currentOrg && this.changeCurrentUrl(this.currentOrg)
      this.dialog = false
    },
  },
}
</script>

<template>
  <v-layout>
    <v-dialog
      v-model="editSocialMedia"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.EditOrganizationSocialSetting" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.Facebook"
                  :label="$t('Common.Facebook')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.Twitter"
                  :label="$t('Common.Twitter')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.LinkedIn"
                  :label="$t('Common.LinkedIn')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="editSocialMedia"
              color="primary"
              depressed
              :action="onSave"
              :has-submit-action="true"
              form-name="edit-socialMedia-form"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import SaveButton from '~/components/common/saveButton'
import { postGaData } from '~/utility/index.js'

export default {
  components: {
    SaveButton,
  },
  props: {
    editSocialMedia: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      valid: false,
      formData: {},
      venueAddress: {},
      data: {
        organization: {},
      },
    }
  },
  watch: {
    valid(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.EditOrganizationSocialSetting'))
      }
    },
  },
  methods: {
    onReset() {
      this.formData.Facebook = ''
      this.formData.Twitter = ''
      this.formData.LinkedIn = ''
    },
    onClose() {
      this.$emit('update:editSocialMedia', false)
      this.onReset()
      postGaData('Close', this.$t('Common.EditOrganizationSocialSetting'))
    },
    async onSave() {
      postGaData(
        this.$t('Drawer.Save'),
        this.$t('Common.EditOrganizationSocialSetting')
      )
      const url = this.$bitpod.getApiUrl()
      this.formData.Currency = this.currency
      try {
        const res = await this.$axios.$patch(
          `${url}OrganizationInfos/${this.$route.params.id}`,
          this.formData
        )
        if (res) {
          this.onClose()
          this.$emit('update:snackbar', true)
          this.$store.commit('setCurrentOrgInfo', this.formData)
          this.$eventBus.$emit('org-details-updated')
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/organization/_id/editSocialMedia while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
          e
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-socialMedia-form')
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${organization}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const organization = formatGQLResult(data, 'OrganizationInfo')
        this.formData = { ...organization[0] }
        this.formData.id = this.$route.params.id
        this.formData._PaymentGatewaySetting.id = this.formData
          ._PaymentGatewaySetting.id
          ? atob(this.formData._PaymentGatewaySetting.id).split(':')[1]
          : ''
        this.formData._CurrentAddress.id = this.formData._CurrentAddress.id
          ? atob(this.formData._CurrentAddress.id).split(':')[1]
          : ''
        this.currency = this.formData.Currency
        this.venueAddress = { ...organization[0]._CurrentAddress }
        return {
          organization: organization.length > 0 ? organization[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.log(
          'Error while fetching data from organization model while making GQL call from apollo data query section',
          error
        )
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>

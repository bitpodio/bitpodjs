<template>
  <v-layout>
    <v-dialog
      v-model="editOrgInfo"
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
              <i18n path="Common.EditOrganizationInformation" />
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
                  v-model="formData.Name"
                  :label="$t('Common.NameRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-textarea
                  v-model="formData.About"
                  :label="$t('Common.About')"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Email"
                  :label="$t('Common.Email')"
                  :rules="[rules.required, rules.email]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Mobile"
                  :label="$t('Common.PhoneRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <i18n path="Common.Address" class="ml-3" />
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="PostalCode"
                  :label="$t('Common.Zip')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="Country"
                  :label="$t('Common.Country')"
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
              v-if="editOrgInfo"
              color="primary"
              :disabled="!valid"
              depressed
              :action="onSave"
              :has-submit-action="true"
              form-name="edit-orgInfo-form"
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
import { rules } from '~/utility/rules.js'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import SaveButton from '~/components/common/saveButton'
import { postGaData } from '~/utility/index.js'

export default {
  components: {
    SaveButton,
  },
  props: {
    editOrgInfo: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valid: false,
      rules: rules(this.$i18n),
      formData: {},
      venueAddress: {},
      AddressLine: '',
      City: '',
      State: '',
      PostalCode: '',
      Country: '',
      data: {
        organization: {},
      },
    }
  },
  watch: {
    valid(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.EditOrganizationInformation'))
      }
    },
  },
  methods: {
    onReset() {
      this.formData.Name = ''
      this.formData.About = ''
      this.formData.Email = ''
      this.formData.Mobile = ''
      this.AddressLine = ''
      this.City = ''
      this.State = ''
      this.PostalCode = ''
      this.Country = ''
    },
    onClose() {
      this.$emit('update:editOrgInfo', false)
      this.onReset()
      postGaData('Close', this.$t('Common.EditOrganizationInformation'))
    },
    async onSave() {
      postGaData(
        this.$t('Drawer.Save'),
        this.$t('Common.EditOrganizationInformation')
      )
      const url = this.$bitpod.getApiUrl()
      const Obj = {
        Name: this.formData.Name || '',
        About: this.formData.About || '',
        Email: this.formData.Email || '',
        Mobile: this.formData.Mobile || '',
      }
      try {
        const res = await this.$axios.$patch(
          `${url}OrganizationInfos/${this.$route.params.id}`,
          Obj
        )
        if (res) {
          const addressObj = {
            AddressLine: this.AddressLine || '',
            City: this.City || '',
            State: this.State || '',
            PostalCode: this.PostalCode || '',
            Country: this.Country || '',
          }
          const AddressRes = await this.$axios.$put(
            `${url}OrganizationInfos/${this.$route.params.id}/CurrentAddress`,
            addressObj
          )
          if (AddressRes) {
            this.onClose()
            this.$emit('update:snackbar', true)
            this.$store.commit('setCurrentOrgInfo', this.formData)
            this.$eventBus.$emit('org-details-updated')
          }
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/organization/_id/editOrgInfoForm while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
          e
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-orgInfo-form')
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
          fetchPolicy: 'no-cache',
        }
      },
      update(data) {
        const organization = formatGQLResult(data, 'OrganizationInfo')
        this.formData = { ...organization[0] }
        this.formData.id = this.$route.params.id
        if (this.formData._CurrentAddress) {
          this.AddressLine = this.formData._CurrentAddress.AddressLine || ''
          this.City = this.formData._CurrentAddress.City || ''
          this.State = this.formData._CurrentAddress.State || ''
          this.PostalCode = this.formData._CurrentAddress.PostalCode || ''
          this.Country = this.formData._CurrentAddress.Country || ''
        }

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

<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editOrgSetting"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.EditOrganizationSetting" />
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
                  v-model="formData.PrivacyPolicy"
                  :label="$t('Common.PrivacyPolicy')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.EventRegistrationURL"
                  :label="$t('Common.EventRegistrationURL')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.successTemplateCaption"
                  :label="$t('Common.SuccessTemplateCaption')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  v-model="currency"
                  :items="currencyDropdown"
                  :label="$t('Common.CurrencyReq')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn color="primary" depressed @click.native="onSave"
              ><i18n path="Drawer.Save"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
export default {
  props: {
    editOrgSetting: {
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
      currencyDropdown: [],
      currency: [],
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('Currency')
      if (res) {
        this.currencyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editOrgSetting while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
  },
  methods: {
    onReset() {
      this.formData.PrivacyPolicy = ''
      this.formData.EventRegistrationURL = ''
      this.formData.successTemplateCaption = ''
      this.currency = []
    },
    onClose() {
      this.$emit('update:editOrgSetting', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.Currency = this.currency
      try {
        const res = await this.$axios.$patch(
          `${url}OrganizationInfos/${this.$route.params.id}`,
          this.formData
        )
        if (res) {
          this.onClose()
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/organization/_id/editOrgSetting while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
          e
        )
      }
    },
    async getDropDownData(filterType) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: filterType,
              },
            },
          },
        })
        if (result) {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/event/_id/editOrgSetting while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
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

<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editOrgInfo"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              Edit Organization Information
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
                  label="Name *"
                  :rules="requiredRule"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-textarea
                  v-model="formData.About"
                  label="About"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Email"
                  label="Email *"
                  :rules="emailRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Mobile"
                  label="Phone *"
                  :rules="requiredRule"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <span class="ml-3">Address</span>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.AddressLine"
                  label="Address"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.City"
                  label="City"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.State"
                  label="State"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.PostalCode"
                  label="Zip"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.Country"
                  label="Country"
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
            <v-btn
              color="primary"
              :disabled="!valid"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import { email, required } from '~/utility/rules.js'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import { getApiUrl } from '~/utility'
export default {
  props: {
    editOrgInfo: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valid: false,
      requiredRule: [required],
      emailRules: [required, email],
      formData: {},
      venueAddress: {},
      data: {
        organization: {},
      },
    }
  },
  methods: {
    onReset() {
      this.formData.Name = ''
      this.formData.About = ''
      this.formData.Email = ''
      this.formData.Mobile = ''
      this.venueAddress.AddressLine = ''
      this.venueAddress.City = ''
      this.venueAddress.State = ''
      this.venueAddress.PostalCode = ''
      this.venueAddress.Country = ''
    },
    onClose() {
      this.$emit('update:editOrgInfo', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    setAddress() {
      this.formData._CurrentAddress.AddressLine = this.venueAddress.AddressLine
      this.formData._CurrentAddress.City = this.venueAddress.City
      this.formData._CurrentAddress.State = this.venueAddress.State
      this.formData._CurrentAddress.PostalCode = this.venueAddress.PostalCode
      this.formData._CurrentAddress.Country = this.venueAddress.Country
    },
    async onSave() {
      const url = getApiUrl()
      this.setAddress()
      delete this.formData._CurrentAddress.LatLng
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
          `Error in pages/apps/organization/_id/editOrgInfoForm while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
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

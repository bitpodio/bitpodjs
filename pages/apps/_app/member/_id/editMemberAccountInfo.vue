<template>
  <v-layout>
    <v-dialog
      v-model="editMemberInfoForm"
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
              <i18n path="Common.EditMemberInformation" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="customerData.CustomerName"
                  :label="$t('Common.MemberName')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  :key="parentMemberIds.id"
                  v-model="customerData.ParentCustomerId"
                  :items="parentMemberIds"
                  :value="customerData.ParentCustomerName"
                  item-text="name"
                  item-value="id"
                  :label="$t('Common.ParentMember')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  v-model="customerData.Type"
                  :items="customerTypeItems"
                  :label="$t('Common.MemberType')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="customerData.ContactNumber"
                  :label="$t('Common.PhoneRequired')"
                  type="number"
                  :rules="[rules.required, rules.phoneRules]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="customerData.BusinessNumber"
                  :label="$t('Common.HomePhone')"
                  type="number"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="customerData.Email"
                  :label="$t('Common.Email')"
                  :rules="[rules.required, rules.email]"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  v-model="customerData.Rating"
                  :items="ratingItems"
                  :label="$t('Common.Status')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" class="pb-0 pt-0">
                <span><i18n path="Common.PhysicalAddress" /></span>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="billingAddress.AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="billingAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="billingAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="billingAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="billingAddress.PostalCode"
                  :label="$t('Common.PostalCode')"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pt-2">
                <v-checkbox
                  v-model="isSamePhysicalAddress"
                  :label="$t('Common.SamePhysicalAddress')"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pt-2">
                <span><i18n path="Common.ShippingAddress" /></span>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.PostalCode"
                  :label="$t('Common.PostalCode')"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-text-field
                  v-model="customerData.Description"
                  :label="$t('Common.Description')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0 pt-0">
                <span><i18n path="Common.Organization" /></span>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-select
                  v-model="customerData.Industry"
                  :items="industryItems"
                  :label="$t('Common.Industry')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="customerData.Website"
                  :label="$t('Common.Website')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="customerData.AnnualRevenue"
                  :label="$t('Common.AnnualRevenue')"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-select
                  v-model="customerData.Ownership"
                  :items="ownershipItems"
                  :label="$t('Common.Ownership')"
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
            <SaveButton
              v-if="editMemberInfoForm"
              color="primary"
              :action="onSave"
              :disabled="!valid"
              depressed
              :has-submit-action="true"
              form-name="edit-member-info-form"
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
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    SaveButton,
  },
  props: {
    editMemberInfoForm: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      valid: true,
      parentAccount: [],
      customerData: {},
      billingAddress: {},
      shippingAddress: {},
      companySizeItems: [],
      industryItems: [],
      ownershipItems: [],
      ratingItems: [],
      customerTypeItems: [],
      parentMember: [],
      parentMemberIds: [],
      isSamePhysicalAddress: false,
      parentMemberData: '',
    }
  },
  watch: {
    isSamePhysicalAddress(newVal, oldVal) {
      if (newVal) {
        this.shippingAddress = this.billingAddress
      } else {
        this.shippingAddress = {}
      }
    },
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('CompanySize')
      if (res) {
        this.companySizeItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('Industry')
      if (res) {
        this.industryItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('CustomerOwnership')
      if (res) {
        this.ownershipItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('CustomerRating')
      if (res) {
        this.ratingItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('CustomerType')
      if (res) {
        this.customerTypeItems = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    this.getCustomerData()
    this.getAllCustomers()
  },
  methods: {
    onReset() {
      this.$refs.form.reset()
    },
    makeSameShippingAddress() {
      if (this.isSamePhysicalAddress) {
        this.shippingAddress = this.billingAddress
      } else {
        this.shippingAddress = {}
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-member-info-form')
    },
    close() {
      this.$emit('update:editMemberInfoForm', false)
      this.onReset()
    },
    async getCustomerData() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(
          `${url}Customers/${this.$route.params.id}`
        )
        if (res) {
          this.customerData = res
          this.customerData._BillingAddress.id = atob(
            this.customerData._BillingAddress.id
          ).split(':')[1]
          this.billingAddress =
            this.customerData._BillingAddress &&
            this.customerData._BillingAddress != null
              ? { ...this.customerData._BillingAddress }
              : {}
          this.shippingAddress =
            this.customerData._ShippingAddress &&
            this.customerData._ShippingAddress != null
              ? { ...this.customerData._ShippingAddress }
              : {}
          this.parentMemberIds.map((ele) => {
            if (ele.name === this.customerData.ParentCustomerName) {
              this.customerData.ParentCustomerName = ele.id
            }
          })
        }
      } catch (err) {
        console.error(
          `Error in members/_id/editMemberAccountInfo.vue while making a GET call to Customers model from method getCustomerData context:-URL:${url}`,
          err
        )
      }
    },
    async getAllCustomers() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}Customers`)
        if (res) {
          this.parentMemberIds = res
            .filter((i) => i.id !== this.$route.params.id)
            .map((k) => ({
              name: k.CustomerName,
              id: k.id,
            }))
        }
      } catch (err) {
        console.error(
          `Error in members/_id/editMemberAccountInfo.vue while making a GET call to Customers model from method getAllCustomers context:-URL:${url}`,
          err
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
        console.error(
          `Error in members/_id/editMemberAccountInfo.vue while making a GQL call to General Configuration model from method getDropDownData context:-filterType:${filterType}`,
          e
        )
      }
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.customerData._BillingAddress = { ...this.billingAddress }
      this.customerData._ShippingAddress = { ...this.shippingAddress }
      this.parentMemberIds.forEach((ele) => {
        if (ele.id === this.customerData.ParentCustomerId) {
          this.customerData.ParentCustomerName = ele.name
        }
      })

      try {
        const res = await this.$axios.patch(
          `${url}Customers/${this.$route.params.id}`,
          {
            ...this.customerData,
          }
        )
        if (res) {
          this.close()
          this.refresh()
          return (this.customerData = res)
        }
      } catch (err) {
        console.error(
          `Error in members/_id/editMemberAccountInfo.vue while making a PATCH call to Customers model from method onSave context:-URL:${url}`,
          err
        )
      }
    },
  },
}
</script>

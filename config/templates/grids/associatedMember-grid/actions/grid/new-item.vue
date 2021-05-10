<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.AssociatedMember" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewContact" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            :id="formName"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="customerData.CustomerName"
                  :label="$t('Common.MemberNameRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-select
                  v-model="customerData.Type"
                  :items="customerTypeItems"
                  :label="$t('Common.MemberType')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="customerData.ContactNumber"
                  :label="$t('Common.PhoneRequired')"
                  type="number"
                  :rules="[rules.required, rules.phoneRules]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pb-0 pt-0">
                <span>Organization</span>
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
                <v-select
                  v-model="customerData.NumberOfEmployees"
                  :items="companySizeItems"
                  :label="$t('Common.NumberOfEmployees')"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="billingAddress.AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="billingAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="billingAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="billingAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
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
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="shippingAddress.PostalCode"
                  :label="$t('Common.PostalCode')"
                  number
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  v-model="customerData.Description"
                  :label="$t('Common.Description')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveButton
            v-if="dialog"
            color="primary"
            :action="onSave"
            :disabled="!valid"
            depressed
            :has-submit-action="true"
            :has-external-submit="true"
            :form-name="formName"
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
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
      formData: {},
      valid: true,
      dialog: false,
      parentAccount: [],
      customerData: {
        CustomerName: '',
        Type: '',
        ContactNumber: '',
        Industry: '',
        Website: '',
        NumberOfEmployees: '',
        ParentCustomer:'',
      },
      billingAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
      },
      shippingAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
      },
      companySizeItems: [],
      industryItems: [],
      ownershipItems: [],
      ratingItems: [],
      customerTypeItems: [],
      parentMember: [],
      parentMemberIds: [],
      isSamePhysicalAddress: false,
      formName: 'add-associated-member-form',
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
  },
  methods: {
    onClose() {
      this.$refs.form.reset()
      this.dialog = false
    },
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
      this.$eventBus.$emit('form-submitted', this.formName)
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
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.customerData.ParentCustomer = this.$route.params.id
      this.customerData._BillingAddress = { ...this.billingAddress }
      this.customerData._ShippingAddress = { ...this.shippingAddress }
      try {
        const res = await this.$axios.post(`${url}Customers`, {
          ...this.customerData,
        })
        if (res) {
          this.onClose()
          this.refresh()
          return (this.customerData = res)
        }
      } catch (err) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          err
        )
      }
    },
  },
}
</script>

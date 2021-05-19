<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="getSubscriptions">
          <v-icon left>fa-pencil</v-icon>
          <i18n path="Common.EditSubscription" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.EditSubscription" />
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
            :id="formName"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pb-0">
                <v-select
                  v-model="subscriptionPlan"
                  :items="subscriptionPlanDropDown"
                  :label="$t('Common.SubscriptionPlanRequired')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  v-model="dataObj.Cost"
                  :label="$t('Common.Amount')"
                  type="number"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  v-model="currency"
                  :items="currencyDropdown"
                  :label="$t('Common.Currency')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-form
                ref="dateform"
                v-model="datevalid"
                :lazy-validation="lazy"
                class="px-3 v-data-table__wrapper"
              >
                <v-row>
                  <v-col class="col-12 col-md-6">
                    <v-datetime-picker
                      ref="dateTimeComponent"
                      v-model="startDate"
                      time-format="hh:mm a"
                      date-format="MMMM dd, yyyy"
                      :label="getDateLabel($t('Common.StartDate'))"
                      :text-field-props="eventStartDateProps"
                      :on-change="changeStartDate()"
                    >
                      <template slot="dateIcon">
                        <v-icon>fas fa-calendar</v-icon>
                      </template>
                      <template slot="timeIcon">
                        <v-icon>fas fa-clock</v-icon>
                      </template>
                    </v-datetime-picker>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <v-datetime-picker
                      ref="dateTimeComponent1"
                      v-model="endDate"
                      time-format="hh:mm a"
                      date-format="MMMM dd, yyyy"
                      :label="getDateLabel($t('Common.EndDate'))"
                      :text-field-props="eventEndDateProps"
                      :on-change="changeEndDate()"
                    >
                      <template slot="dateIcon">
                        <v-icon>fas fa-calendar</v-icon>
                      </template>
                      <template slot="timeIcon">
                        <v-icon>fas fa-clock</v-icon>
                      </template>
                    </v-datetime-picker>
                  </v-col>
                </v-row>
              </v-form>
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
            :disabled="!valid || !datevalid"
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
import { formatGQLResult } from '~/utility/gql.js'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import products from '~/config/apps/member/gql/product.gql'
import SaveButton from '~/components/common/saveButton'
export default {
  components: {
    SaveButton,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      dialog: false,
      valid: false,
      snackbar: false,
      datevalid: true,
      snackbarText: '',
      timeout: 3000,
      formName: 'new-subscription-form',
      startDate: '',
      endDate: '',
      currencyDropdown: [],
      subscriptionPlan: '',
      subscriptionPlanDropDown: [],
      productObj: [],
      dataObj: {},
      currency: '',
      formData: {
        Currency: '',
        Cost: '',
        StartDate: '',
        EndDate: '',
        CustomerId: '',
        ProductId: '',
        Organization: '',
      },
      productId: '',
    }
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('Currency')
      if (res) {
        this.currencyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.error(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getProductsList()
      if (res) {
        this.subscriptionPlanDropDown = res.map((i) => i.DisplayName)
      }
    } catch (e) {
      console.log(
        `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to Ticket model from method getRegistrationType`,
        e
      )
    }
  },
  computed: {
    eventStartDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const EndDate = new Date(this.endDate)
            let startDateMessage = ''
            if (!StartDate)
              startDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (StartDate > EndDate)
              startDateMessage = this.$t('Messages.Error.StartEndDate')
            else startDateMessage = ''
            return startDateMessage || true
          },
        ],
      }
    },
    eventEndDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            const StartDate = new Date(this.startDate)
            let endDateMessage = ''
            if (!EndDate)
              endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (EndDate < StartDate)
              endDateMessage = this.$t('Messages.Error.EndStartDate')
            else endDateMessage = ''
            return endDateMessage || true
          },
        ],
      }
    },
  },
  methods: {
    onReset() {
      this.$refs.form.reset()
      this.$refs.dateform.reset()
    },
    getSubscriptions() {
      this.dialog = true
      this.dataObj = this.items && { ...this.items[0] }
      this.subscriptionPlan = this.dataObj.Product.DisplayName
      this.startDate = new Date(this.dataObj.StartDate)
      this.endDate = new Date(this.dataObj.EndDate)
      this.currency = this.dataObj.Currency
    },
    outsideClicked() {
      this.$refs.dateTimeComponent.okHandler()
      this.$refs.dateTimeComponent1.okHandler()
    },
    onClose() {
      this.onReset()
      this.dialog = false
    },
    getProductId(productName) {
      this.productObj.map((ele) => {
        if (ele.DisplayName === productName) {
          this.productId = ele.id
        }
      })
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.Cost = parseInt(this.dataObj.Cost) || null
      this.formData.StartDate = this.startDate
      this.formData.EndDate = this.endDate
      this.getProductId(this.subscriptionPlan)
      this.formData.ProductId = this.productId
      this.formData.CustomerId = this.$route.params.id
      this.formData.Organization = this.$auth.user.data.orgList[0].name
      this.formData.Currency = this.currency
      try {
        const res = await this.$axios.$patch(
          `${url}ProductSubscriptions/${this.dataObj.id}`,
          {
            ...this.formData,
          }
        )
        if (res) {
          this.onClose()
          this.refresh()
        }
      } catch (err) {
        console.error(
          `Error in templates/grids/memberSubscription-grid/actions/row-select/edit-item.vue while making a PATCH call to Product Subscription model from method onSave context:-URL:-${url}`,
          err
        )
      }
    },
    getDateLabel(dateLabel) {
      const label = `${dateLabel}*`
      return label
    },
    changeStartDate() {
      if (this.startDate !== '') {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent) {
          this.$refs.dateTimeComponent.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    changeEndDate() {
      if (this.endDate !== '') {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent1) {
          this.$refs.dateTimeComponent1.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    async getProductsList() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}Products`)
        this.productObj = res
        return res
      } catch (e) {
        console.error(
          `Error in templates/grids/memberSubscription-grid/actions/row-select/edit-item.vue while making a GET call to Product model from method getProductsList context:-URL:${url}`,
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
          `Error in templates/grids/memberSubscription-grid/actions/row-select/edit-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
    },
  },
}
</script>

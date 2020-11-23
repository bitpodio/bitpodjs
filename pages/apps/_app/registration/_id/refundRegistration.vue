<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-dialog
        v-model="isRefund"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n path="Common.RefundRequest" />
            </h2>

            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>

          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-alert
              v-if="isWarningMsg"
              outlined
              dense
              color="warning"
              class="body-2"
            >
              <v-icon class="amber--text" size="18">fa-bulb</v-icon>
              <i18n path="Common.SubmittingRefundRequest" />
            </v-alert>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <Lookup
                  v-model="refund.RefundMethod"
                  :field="refundMethodProps"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col>
                <v-radio-group
                  v-model="refund.RefundRequest"
                  row
                  :mandatory="false"
                  class="mt-0"
                  :rules="[rules.required]"
                  @change="changeRefundRequest($event)"
                >
                  <v-radio
                    :label="$t('Common.FullRefund')"
                    value="FullRefund"
                  ></v-radio>
                  <v-radio
                    :label="$t('Common.PartialRefund')"
                    value="PartialRefund"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="refund.Amount"
                  :label="$t('Common.AmountReq')"
                  dense
                  outlined
                  min="1"
                  type="Number"
                  :rules="amountRule"
                  :disabled="isAmountDisabled"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="refund.Comments"
                  :label="$t('Common.Comments')"
                  dense
                  outlined
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <Lookup v-model="refund.Reason" :field="reasonProps" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn :disabled="!valid" color="primary" depressed @click="onSave"
              ><i18n path="Drawer.Submit"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import addHours from 'date-fns/addHours'
import { rules } from '~/utility/rules.js'
import eventRegistrationTicketSlot from '~/config/apps/event/gql/eventRegistrationTicketSlot.gql'
import { formatGQLResult } from '~/utility/gql.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'

export default {
  props: {
    isRefund: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      snackbar: false,
      timeout: 2000,
      regData: {},
      refund: {
        RefundMethod: 'Payment Gateway',
      },
      refundData: {},
      isAmountDisabled: false,
      valid: false,
      Amount: '',
      isWarningMsg: false,
      data: {
        event: {},
      },
      refundMethodProps: {
        type: 'lookup',
        caption: 'Refund Method*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'RefundMethod',
            }
          },
        },
      },
      reasonProps: {
        type: 'lookup',
        caption: 'Reason',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'Reason',
            }
          },
        },
      },
    }
  },
  computed: {
    snackbarText() {
      return this.$t('Messages.Success.RefundRegistrationSuccess')
    },
    amountRule() {
      return [
        (v) => {
          if (parseInt(v) > parseInt(this.refundData.TotalAmount)) {
            return this.$t('Messages.Error.RefundPaidAmount')
          } else if (v === '') {
            return this.$t('Messages.Error.ThisFieldRequired')
          } else if (parseInt(v) < 1) {
            return this.$t('Messages.Error.RefundAmountMsg')
          }
        },
      ]
    },
  },
  mounted() {
    this.isFullRefund()
  },
  methods: {
    isFullRefund() {
      return this.refund.RefundRequest === 'FullRefund'
    },
    changeRefundRequest(value) {
      if (value === 'FullRefund') {
        this.refund.Amount = this.refundData.TotalAmount
        this.isAmountDisabled = true
      } else if (value === 'PartialRefund') {
        this.refund.Amount = 1
        this.isAmountDisabled = false
      }
    },
    close() {
      this.$emit('update:isRefund', false)
      if (this.regData._Refund !== null) {
        this.refund = { ...this.regData._Refund }
      } else {
        this.refund = {}
        const resetData = {}
        resetData.RefundMethod = 'Payment Gateway'
        resetData.Amount = this.refundData.TotalAmount
        resetData.RefundRequest = 'FullRefund'
        this.refund = { ...resetData }
      }
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      const baseUrl = this.$bitpod.getApiUrl()
      this.refundData._Refund = this.refund
      const regId = this.$route.params.id
      let res = null
      try {
        res = await this.$axios.$post(
          `${baseUrl}Registrations/update?where={"id":"${regId}"}`,
          {
            ...this.refundData,
          }
        )
      } catch (e) {
        console.error(
          `Error in Save function of refund registration form, context: refund registration , baseUrl: ${baseUrl} registrationId: ${regId} refundData: ${this.refundData} error: ${e}`
        )
      }
      if (res) {
        this.$emit('update:isRefund', false)
        this.refresh()
        this.snackbar = true
        return res
      }
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${eventRegistrationTicketSlot}
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
        const registration = formatGQLResult(data, 'Registration')
        this.regData = registration.length > 0 ? { ...registration[0] } : {}
        this.refundData.TotalAmount = this.regData.TotalAmount
        if (new Date() < addHours(new Date(this.regData.createdDate), 24)) {
          this.isWarningMsg = true
        } else {
          this.isWarningMsg = false
        }
        if (this.regData._Refund) {
          this.refund = { ...this.regData._Refund }
          this.refundData.TransactionReferenceId = this.regData.TransactionReferenceId
          this.refundData.RefundAttempt = this.regData.RefundAttempt
        } else {
          this.refund.Amount = this.refundData.TotalAmount
          this.refund.RefundRequest = 'FullRefund'
        }
        this.isAmountDisabled = this.refund.RefundRequest === 'FullRefund'
        return {
          event: {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>

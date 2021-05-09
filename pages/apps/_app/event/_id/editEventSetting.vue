<template>
  <v-dialog
    v-model="eventSetting"
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
            <i18n path="Common.EditEventSettings" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click.native="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row class="mt-3">
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-select
                v-model="privacy"
                :items="eventPrivacyDropdown"
                :label="$t('Common.PrivacyRequired')"
                required
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-select
                ref="currencyField"
                v-model="currency"
                :items="currencyDropdown"
                :label="$t('Common.CurrencyReq')"
                :hint="
                  isJpy === true
                    ? $t('Common.SelectingJPYCurrency', {
                        currency: currency,
                      })
                    : ''
                "
                required
                outlined
                dense
                @change="changeCurrency($event)"
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-text-field
                v-model="formData.ProjectCode"
                :label="$t('Common.GLAccountCode')"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-text-field
                v-model="formData.CostCenter"
                :label="$t('Common.CostCenter')"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="8"
              class="pb-0 d-flex flex-column flex-md-row"
            >
              <div class="pt-2 mr-2">{{ eventLinkLabel() }}</div>
              <v-text-field
                v-model="formData.UniqLink"
                :label="$t('Common.EventL')"
                :rules="[rules.required, rules.link]"
                outlined
                dense
                required
                :error-messages="uniqueLinkMessage"
                @input="checkUniqueLink"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-6 mt-0">
              <span><i18n path="Common.CancellationPolicy" /> </span>
              <RichText v-model="formData.CancellationPolicy" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveButton
            v-if="eventSetting"
            color="primary"
            :disabled="!valid || isInvalidEventLink"
            depressed
            :action="onSave"
            :has-submit-action="true"
            form-name="edit-eventSetting-form"
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveButton>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import currencyFormatter from 'currency-formatter'
import { rules } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
import { postGaData } from '~/utility/index.js'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    SaveButton,
  },
  mixins: [configLoaderMixin],
  props: {
    eventSetting: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
  },
  data() {
    return {
      valid: true,
      privacy: [],
      eventPrivacyDropdown: [],
      currencyDropdown: [],
      currency: [],
      uniqueMsg: 'event link',
      data: {
        event: {},
      },
      isInvalidEventLink: false,
      formData: {},
      uniqueLinkMessage: '',
      rules: rules(this.$i18n),
      isJpy: false,
      ticketDetails: [],
    }
  },
  computed: {
    getUniqLink() {
      return `https://${this.$config.axios.eventUrl}/e/${this.formData.UniqLink}`
    },
  },
  watch: {
    valid(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.EditEventSettings'))
      }
    },
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('EventPrivacy')
      if (res) {
        this.eventPrivacyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('Currency')
      if (res) {
        this.currencyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    this.getTicketDetails()
  },
  methods: {
    changeCurrency(currency) {
      const currencies = {
        XAF: 'ewo-CM',
        JPY: 'ja-JP',
      }
      if (currency in currencies) {
        this.isJpy = true
        this.$refs.currencyField.focus()
      } else {
        this.isJpy = false
      }
      this.ticketDetails.forEach((x) => {
        if (x.Type === 'Paid' || x.Type === 'Donation') {
          x.Amount = this.getPriceWithCurrency(x.Amount, currency)
        }
      })
    },
    async postTicketData(id, ticketObj) {
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$patch(`${url}Tickets/${id}`, ticketObj)
        if (res) {
          this.ticketDetails = res
        }
      } catch (err) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a PATCH call to Ticket model from method postTicketData context:-TicketId:-${id}\nTicketObj:-${ticketObj}`,
          err
        )
      }
    },
    getPriceWithCurrency(price, currency) {
      const currencyPrice = currencyFormatter.format(price, { code: currency })
      const totalPrice = currencyFormatter.unformat(currencyPrice, {
        code: currency,
      })
      return totalPrice
    },
    async getTicketDetails() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(
          `${url}Events/${this.$route.params.id}/getTickets`
        )
        if (res) {
          this.ticketDetails = res
        }
      } catch (err) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a GET call to Event model from method getTicketDetails context:-EventId:-${this.$route.params.id}}`,
          err
        )
      }
    },
    eventLinkLabel() {
      return `${this.$bitpod.getApiUrl().replace('svc/api', 'e')}`
    },
    onReset() {
      this.valid = true
      this.privacy = []
      this.formData.ProjectCode = ''
      this.formData.CostCenter = ''
      this.formData.UniqLink = ''
      this.currency = []
      this.isInvalidEventLink = false
      this.formData.CancellationPolicy = ''
      this.formData.isRefundable = ''
      this.formData.ShowAttendeeForm = false
      this.formData.SessionTimingConflict = false
      this.formData.ShowRemainingTickets = false
      this.formData.NotifyOrganizer = false
      this.formData.showTimezone = false
      this.formData.SendCalendar = false
    },
    close() {
      this.$emit('update:eventSetting', false)
      this.onReset()
      postGaData('Close', this.$t('Common.EditEventSettings'))
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.EditEventSettings'))
      this.formData.Currency = this.currency
      this.formData.Privacy = this.privacy
      const url = this.$bitpod.getApiUrl()
      delete this.formData._VenueAddress
      try {
        const res = await this.$axios.$patch(
          `${url}Events/${this.$route.params.id}`,
          {
            ...this.formData,
          }
        )
        this.ticketDetails.forEach((ele) => {
          this.postTicketData(ele.id, ele)
        })

        if (res) {
          this.$eventBus.$emit('event-tickets-currency-updated')
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.EventDetailsUpdateSuccess')
          )
          this.$emit('update:snackbar', true)
          this.$eventBus.$emit('update-event-details')
          this.data.event = res
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a PATCH call to Event model from method onSave context:-FormData:-${this.formData}`,
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
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
      }
    },
    async checkUniqueLink() {
      if (
        this.formData.UniqLink !== '' &&
        this.formData.UniqLink !== this.data.event.UniqLink
      ) {
        const value = this.formData.UniqLink.toLowerCase().replace(/\s/g, '')
        this.formData.UniqLink = value.trim()
        const where = { UniqLink: this.formData.UniqLink }
        const result = await this.$apollo.query({
          query: gql`
            ${eventCount}
          `,
          variables: {
            where,
          },
        })
        if (result.data.Event.EventCount > 0) {
          this.isInvalidEventLink = true
          this.uniqueLinkMessage = this.$t('Messages.Error.UniqueLinkDuplicate')
        } else {
          this.isInvalidEventLink = false
          this.uniqueLinkMessage = ''
        }
      } else {
        this.isInvalidEventLink = false
        this.uniqueLinkMessage = ''
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-eventSetting-form')
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${event}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.currency = this.formData.Currency
        this.privacy = this.formData.Privacy
        return {
          event: event.length > 0 ? event[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to Event model from method apollo data query section`,
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

<template>
  <v-form ref="form" v-model="valid">
    <v-dialog
      v-model="eventSetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-2 text-h5">Edit Event Settings</h2>
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
                label="Privacy*"
                required
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-select
                v-model="currency"
                :items="currencyDropdown"
                label="Currency*"
                required
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-text-field
                v-model="formData.ProjectCode"
                label="GL Account Code"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-text-field
                v-model="formData.CostCenter"
                label="Cost Center"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="8" sm="6" md="6">
              <v-text-field
                v-model="formData.UniqLink"
                label="Event Link*"
                :rules="linkRules"
                persistent-hint
                hint="https://bitpod-event.test.bitpod.io/e/"
                outlined
                required
                dense
                @input="checkUniqueLink"
              ></v-text-field>
              <span
                v-if="isInvalidEventLink && !!formData.UniqLink"
                class="red--text pa-3 pt-0 body-1"
                >{{ uniqueLinkMessage }}</span
              >
            </v-col>
            <v-col cols="12" class="mb-6">
              <span>Cancellation Policy</span>
              <RichText
                v-model="formData.CancellationPolicy"
                label="Cancellation Policy"
                placeholder="Description"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="formData.isRefundable"
                label=" Allow Cancelation"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="formData.ShowAttendeeForm"
                label=" Show attendee form for each ticket"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="formData.SessionTimingConflict"
                label=" Session Timing Conflict"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="formData.ShowRemainingTickets"
                label=" Show Remaining Tickets"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="formData.NotifyOrganizer"
                label=" Notify event organizer when someone registers"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col
              v-if="formData.BusinessType === 'Recurring'"
              cols="12"
              sm="6"
              md="6"
              class="py-0"
            >
              <v-checkbox
                v-model="formData.showTimezone"
                label="Allow user to select a timezone for recurring event"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col
              v-if="formData.BusinessType !== 'Recurring'"
              cols="12"
              sm="6"
              md="6"
              class="py-0"
            >
              <v-checkbox
                v-model="formData.SendCalendar"
                label=" Send calendar invite when registered"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            :disabled="!valid || isInvalidEventLink"
            color="primary"
            depressed
            @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import gql from 'graphql-tag'
import nuxtConfig from '../../../../../nuxt.config'
import { required, link } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
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
      data: {
        event: {},
      },
      isInvalidEventLink: false,
      formData: {},
      uniqueLinkMessage: '',
      linkRules: [required, link],
    }
  },
  mounted() {
    this.getDropDownData('EventPrivacy')
      .then((res) => {
        this.eventPrivacyDropdown = res.map((i) => i.value)
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
    this.getDropDownData('Currency')
      .then((res) => {
        this.currencyDropdown = res.map((i) => i.value)
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
  },
  methods: {
    close() {
      this.$emit('update:eventSetting', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      this.formData.Currency = this.currency
      this.formData.Privacy = this.privacy
      delete this.formData._VenueAddress
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtConfig.axios.eventUrl}${nuxtConfig.axios.apiEndpoint}Events/${this.$route.params.id}`,
          {
            ...this.formData,
          }
        )
        if (res) {
          this.close()
          this.refresh()
          this.data.event = res
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    getDropDownData(filterType) {
      return this.$apollo
        .query({
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
        .then((result) => {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
    async checkUniqueLink() {
      if (this.formData.UniqLink !== '') {
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
          this.uniqueLinkMessage = 'This link is already taken'
        } else {
          this.isInvalidEventLink = false
          this.uniqueLinkMessage = ''
        }
      }
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
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>

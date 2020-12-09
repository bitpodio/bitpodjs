<template>
  <v-form ref="form" v-model="valid">
    <v-dialog
      v-model="eventSetting"
      persistent
      scrollable
      content-class="slide-form-default"
    >
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
                v-model="currency"
                :items="currencyDropdown"
                :label="$t('Common.CurrencyReq')"
                required
                outlined
                dense
              ></v-select>
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
              sm="6"
              md="6"
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
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import gql from 'graphql-tag'
import { rules } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    SaveButton,
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
      uniqueMsg: 'event link',
      data: {
        event: {},
      },
      isInvalidEventLink: false,
      formData: {},
      uniqueLinkMessage: '',
      rules: rules(this.$i18n),
    }
  },
  computed: {
    getUniqLink() {
      return `https://${this.$config.axios.eventUrl}/e/${this.formData.UniqLink}`
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
  },

  methods: {
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
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    async onSave() {
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
        if (res) {
          this.close()
          this.$emit(
            'update:snackbarText',
            this.$t('Messages.Success.EventDetailsUpdateSuccess')
          )
          this.$emit('update:snackbar', true)
          this.refresh()
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

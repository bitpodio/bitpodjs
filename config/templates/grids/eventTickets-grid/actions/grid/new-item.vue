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
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.NewTicket" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            <i18n path="Common.NewTicket" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.Code"
                  :label="$t('Common.Title')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
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
                      v-model="eventData.StartDate"
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
                      v-model="eventData.EndDate"
                      time-format="hh:mm a"
                      date-format="MMMM dd, yyyy"
                      :label="getDateLabel($t('Common.StartDate'))"
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
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="formData.Type"
                  :items="typeDropDown"
                  :rules="[rules.required]"
                  :label="$t('Common.Type')"
                  outlined
                  dense
                  @change="getType"
                ></v-select>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.Amount"
                  :label="getCurrencyLabel()"
                  type="number"
                  :disabled="formData.Type === 'Free'"
                  min="formData.Type === 'Free'? 0 : 1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.TicketCount"
                  :label="$t('Common.TicketCountRequired')"
                  type="number"
                  :rules="ticketCountRules()"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.Group"
                  :label="$t('Common.GroupName')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="Attendees"
                  :items="registrationTypeDropdown"
                  :label="$t('Common.RegistrationType')"
                  multiple
                  chips
                  outlined
                  small-chips
                  dense
                  persistent-hint
                ></v-select>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.DisplayOrder"
                  :label="$t('Common.DisplayOrd')"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-checkbox
                  v-model="formData.ValidateQty"
                  :label="$t('Common.ValidateQuantity')"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-checkbox
                  v-model="formData.CheckGroupDiscount"
                  :label="$t('Common.CheckGroupDiscount')"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :disabled="
              !valid ||
              !datevalid ||
              (formData.Type !== 'Free' && formData.Amount < 1) ||
              formData.Code === ''
            "
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import { utcToZonedTime } from 'date-fns-tz'
import SaveBtn from '~/components/common/saveButton'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import registrationtype from '~/config/apps/event/gql/registrationType.gql'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { rules } from '~/utility/rules.js'
export default {
  components: {
    SaveBtn,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
    dateRules: {
      type: null,
      default: null,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: false,
      valid: false,
      dialog: false,
      datevalid: true,
      snackbar: false,
      timeout: 2000,
      snackbarText: '',
      typeDropDown: [],
      type: [],
      registrationTypeDropdown: [],
      registrationType: [],
      rules: rules(this.$i18n),
      ticketIds: [],
      Amount: 0,
      Attendees: [],
      formData: {
        Attendee: [],
        Amount: 0,
        CheckGroupDiscount: false,
        Code: 'General admission',
        DisplayOrder: null,
        StartDate: '',
        EndDate: '',
        Events: '',
        Group: '',
        TicketCount: 100,
        Type: 'Free',
        ValidateQty: false,
        Status: '',
      },
      eventData: {},
      setAttendeeType: {},
      Symbol: '',
      StartDate: '',
      EndDate: '',
      CheckEndDate: '',
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
            const { EndDate } = this.eventData
            let startDateMessage = ''
            if (this.eventData.BusinessType !== 'Recurring') {
              if (!StartDate)
                startDateMessage = this.$t('Messages.Error.ThisFieldRequired')
              else if (StartDate && EndDate && StartDate > EndDate)
                startDateMessage = this.$t('Messages.Error.StartEndDate')
              else startDateMessage = ''
              return startDateMessage || true
            } else {
              if (StartDate && EndDate && StartDate > EndDate)
                startDateMessage = this.$t('Messages.Error.StartEndDate')
              else startDateMessage = ''
              return startDateMessage || true
            }
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
            const { StartDate } = this.eventData
            let endDateMessage = ''
            if (this.eventData.BusinessType !== 'Recurring') {
              if (!EndDate)
                endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
              else if (StartDate && EndDate && StartDate > EndDate)
                endDateMessage = this.$t('Messages.Error.EndStartDate')
              else if (EndDate > new Date(this.CheckEndDate))
                endDateMessage = this.$t('Messages.Error.TicketEndDate')
              else if (EndDate < new Date())
                endDateMessage = this.$t('Messages.Error.TicketEndCurrentDate')
              else endDateMessage = ''
              return endDateMessage || true
            } else {
              if (StartDate && EndDate && EndDate < StartDate)
                endDateMessage = this.$t('Messages.Error.EndStartDate')
              else endDateMessage = ''
              return endDateMessage || true
            }
          },
        ],
      }
    },
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('TicketType')
      if (res) {
        this.typeDropDown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to Ticket model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getRegistrationType()
      if (res) {
        this.registrationTypeDropdown = res.map((i) => i.Name)
      }
    } catch (e) {
      console.log(
        `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to Ticket model from method getRegistrationType`,
        e
      )
    }
    this.getAttendeeType()
  },
  methods: {
    ticketCountRules() {
      return [
        (v) => {
          if (v !== '') {
            return true
          }
          return this.$t('Messages.Error.FieldRequired')
        },
      ]
    },
    outsideClicked() {
      this.$refs.dateTimeComponent.okHandler()
      this.$refs.dateTimeComponent1.okHandler()
    },
    changeStartDate() {
      if (
        this.eventData.BusinessType !== 'Recurring' ||
        this.eventData.StartDate !== ''
      ) {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent) {
          this.$refs.dateTimeComponent.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    changeEndDate() {
      if (
        this.eventData.BusinessType !== 'Recurring' ||
        this.eventData.EndDate !== ''
      ) {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent1) {
          this.$refs.dateTimeComponent1.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    getDateLabel(dateLabel) {
      if (this.eventData.BusinessType === 'Recurring') {
        const label = `${dateLabel}`
        return label
      } else {
        const label = `${dateLabel}*`
        return label
      }
    },
    getCurrencyLabel() {
      const str = `Price*(${this.Symbol})`
      return str
    },
    async getAttendeeType() {
      const url = this.$bitpod.getApiUrl()
      const res = await this.$axios.$get(
        `${url}Events/${this.$route.params.id}/AttendeeType`
      )
      this.setAttendeeType = res
    },
    onReset() {
      this.formData.Attendee = []
      this.Attendees = []
      this.formData.Amount = 0
      this.formData.CheckGroupDiscount = false
      this.formData.Code = 'General admission'
      this.formData.DisplayOrder = null
      this.formData.Group = ''
      this.formData.Type = 'Free'
      this.formData.TicketCount = 100
      this.formData.ValidateQty = false
      this.formData.Status = ''
      this.valid = true
      this.setDefaultDate()
    },
    getAttendeesId() {
      this.formData.Attendee = this.setAttendeeType
        .filter((i) => this.Attendees.some((j) => j === i.Name))
        .map((k) => k.id)
    },
    onClose() {
      this.valid = true
      this.dialog = false
      this.onReset()
    },
    getCurrencySymbol(Currency) {
      this.Symbol = Number()
        .toLocaleString(Currency, { style: 'currency', currency: Currency })
        .slice(0, 1)
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.getAttendeesId()
      this.formData.Amount = parseInt(this.formData.Amount)
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      this.formData.TicketCount = parseInt(this.formData.TicketCount)
      this.formData.AvailableCount = parseInt(this.formData.TicketCount)
      this.formData.Events = this.$route.params.id
      this.formData.Status = this.eventData.Status
      this.formData.StartDate = this.eventData.StartDate
      this.formData.EndDate = this.eventData.EndDate
      try {
        const res = await this.$axios.$post(`${url}Tickets`, this.formData)
        if (res) {
          this.dialog = false
          this.onReset()
          this.formData.Code = 'General admission'
          this.snackbarText = this.$t('Messages.Success.TicketRecordCreatedSuccess')
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a POST call to Ticket model from method onSave context:-URL:-${url}\n formData:-${this.formData}\n `,
          e
        )
      }
    },
    getType() {
      if (this.formData.Type === 'Free') {
        this.formData.Amount = 0
      } else {
        this.formData.Amount = 1
      }
    },
    setDefaultDate() {
      if (this.eventData.BusinessType !== 'Recurring') {
        this.eventData.StartDate = new Date()
        this.eventData.EndDate = this.CheckEndDate
        this.eventData.EndDate = utcToZonedTime(
          this.eventData.EndDate,
          this.eventData.Timezone
        )
      } else {
        this.eventData.StartDate = null
        this.eventData.EndDate = null
      }
    },
    getTicketDate() {
      if (
        this.eventData.BusinessType === 'Recurring' ||
        this.eventData.StartDate === null ||
        this.eventData.EndDate === null
      ) {
        this.eventData.StartDate = null
        this.eventData.EndDate = null
      } else {
        this.eventData.StartDate = new Date()
        this.eventData.EndDate = utcToZonedTime(
          this.eventData.EndDate,
          this.eventData.Timezone
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
          `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData Inputs:-filterType:-${filterType} `,
          e
        )
      }
    },
    async getRegistrationType() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${registrationtype}
          `,
          variables: {
            filters: {
              where: {
                EventId: this.$route.params.id,
              },
            },
          },
        })
        if (result) {
          const generalConfig = formatGQLResult(result.data, 'RegistrationType')
          return generalConfig
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to RegistrationType model from method getRegistrationType context:-\n EventId:-${this.$route.params.id}\n `,
          e
        )
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
        this.eventData = event.length > 0 ? { ...event[0] } : {}
        this.CheckEndDate = this.eventData.EndDate
        this.getCurrencySymbol(this.eventData.Currency)
        this.getTicketDate()
        return {
          event: event.length > 0 ? event[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/new-item.vue while making a GQL call to Event model from apollo data query section context:-EventId:-${this.$route.params.id}\n `,
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

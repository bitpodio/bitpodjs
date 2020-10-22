<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> New Ticket
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">New Ticket</h2>
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
                  label="Title*"
                  :rules="required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <CustomDate
                  v-model="StartDate"
                  :label="getDateLabel('Start Date')"
                  :field="startDateField"
                  :rules="startDateRule"
                  :on-change="changeStartDate"
                  type="datetime"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <CustomDate
                  v-model="EndDate"
                  :label="getDateLabel('End Date')"
                  :field="endDateField"
                  :rules="endDateRule"
                  :on-change="changeEndDate"
                  type="datetime"
                />
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="formData.Type"
                  :items="typeDropDown"
                  :rules="required"
                  label="Type*"
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
                  label="Ticket Count"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.Group"
                  label="Group Name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="Attendees"
                  :items="registrationTypeDropdown"
                  label="Registration Type"
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
                  label="Display Order"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-checkbox
                  v-model="formData.ValidateQty"
                  label="Validate Quantity"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-checkbox
                  v-model="formData.CheckGroupDiscount"
                  label=" Check Group Discount"
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
          <v-btn
            color="primary"
            :disabled="
              !valid ||
              (formData.Type !== 'Free' && formData.Amount < 1) ||
              formData.Code === ''
            "
            depressed
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import addMonths from 'date-fns/addMonths'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import registrationtype from '~/config/apps/event/gql/registrationType.gql'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { required } from '~/utility/rules.js'
import { getApiUrl } from '~/utility'
import CustomDate from '~/components/common/form/date.vue'
import strings from '~/strings.js'
export default {
  components: {
    CustomDate,
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
      typeDropDown: [],
      type: [],
      registrationTypeDropdown: [],
      registrationType: [],
      required: [required],
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
        TicketCount: null,
        Type: 'Free',
        ValidateQty: false,
        Status: '',
      },
      eventData: {},
      setAttendeeType: {},
      Symbol: '',
      StartDate: null,
      EndDate: null,
    }
  },
  computed: {
    startDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date',
        type: 'datetime',
      }
    },
    endDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date',
        type: 'datetime',
      }
    },
    startDateRule() {
      return [
        (v) => {
          const startDate = new Date(v) || new Date(this.StartDate)
          return startDate > new Date(this.EndDate)
            ? strings.START_END_DATE
            : true
        },
      ]
    },
    endDateRule() {
      return [
        (v) => {
          const endDate = new Date(v)
          if (new Date(this.StartDate) > endDate) {
            return strings.END_START_DATE
          } else if (endDate > new Date(this.data.event.EndDate)) {
            return 'End date should be less than event end date'
          } else {
            return true
          }
        },
      ]
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
    this.getTicketDate()
    this.getAttendeeType()
  },
  methods: {
    changeStartDate(value) {
      this.$refs.form.validate()
    },
    changeEndDate(value) {
      this.$refs.form.validate()
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
      const url = getApiUrl()
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
      this.formData.TicketCount = null
      this.formData.ValidateQty = false
      this.formData.Status = ''
      this.valid = true
      this.StartDate = null
      this.EndDate = null
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
      const url = getApiUrl()
      this.getAttendeesId()
      this.formData.Amount = parseInt(this.formData.Amount)
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      this.formData.TicketCount = parseInt(this.formData.TicketCount)
      this.formData.AvailableCount = parseInt(this.formData.TicketCount)
      this.formData.Events = this.$route.params.id
      this.formData.Status = this.eventData.Status
      this.formData.StartDate = this.StartDate
      this.formData.EndDate = this.EndDate
      try {
        const res = await this.$axios.$post(`${url}Tickets`, this.formData)
        if (res) {
          this.dialog = false
          this.onReset()
          this.formData.Code = 'General admission'
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
    getTicketDate() {
      if (
        this.eventData.BusinessType === 'Recurring' &&
        this.eventData.StartDate === null &&
        this.eventData.EndDate === null
      ) {
        this.StartDate = null
        this.EndDate = null
      } else {
        this.StartDate = new Date()
        this.EndDate = addMonths(new Date(), 1)
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
        this.eventData = event.length > 0 ? event[0] : {}
        this.getCurrencySymbol(this.eventData.Currency)
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

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
          <h2 class="black--text pt-10 pb-9">New Ticket</h2>
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
                <v-datetime-picker
                  v-model="formData.StartDate"
                  label="Start Date*"
                  :rules="dateRules"
                  :text-field-props="startDateTextFieldProps()"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-datetime-picker
                  v-model="formData.EndDate"
                  :rules="dateRules"
                  label="End Date*"
                  :text-field-props="endDateTextFieldProps()"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6" md="6">
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
              <v-col cols="12" sm="6" md="6">
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
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="formData.TicketCount"
                  label="Ticket Count"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="formData.Group"
                  label="Group Name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="Attendees"
                  :items="registrationTypeDropdown"
                  label="Registration Type"
                  multiple
                  chips
                  persistent-hint
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="formData.DisplayOrder"
                  label="Display Order"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-checkbox
                  v-model="formData.ValidateQty"
                  label="Validate Quantity"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="6">
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
export default {
  props: {
    refresh: {
      type: Function,
      default: () => false,
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
        Amount: '',
        CheckGroupDiscount: false,
        Code: 'General admission',
        DisplayOrder: null,
        StartDate: '',
        EndDate: '',
        Events: '',
        Group: '',
        TicketCount: null,
        Type: '',
        ValidateQty: false,
        Status: '',
      },
      eventData: {},
      setAttendeeType: {},
      Symbol: '',
    }
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
      this.formData.Amount = ''
      this.formData.CheckGroupDiscount = false
      this.formData.Code = 'General admission'
      this.formData.DisplayOrder = null
      this.formData.Group = ''
      this.formData.Type = ''
      this.formData.TicketCount = null
      this.formData.ValidateQty = false
      this.formData.Status = ''
      this.valid = false
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
    startDateTextFieldProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const scheduledDate = v && new Date(v)
            if (scheduledDate && scheduledDate > this.formData.EndDate) {
              this.valid = false
              return 'Ticket start date should be less than Ticket end date'
            } else {
              this.valid = true
              return true
            }
          },
        ],
      }
    },
    endDateTextFieldProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const scheduledDate = v && new Date(v)
            if (scheduledDate && scheduledDate < this.formData.StartDate) {
              this.valid = false
              return 'Ticket end Date should be greater than Ticket startdate'
            } else if (
              scheduledDate &&
              scheduledDate > new Date(this.data.event.EndDate)
            ) {
              this.valid = false
              return 'Ticket end Date should be less than event end date'
            } else {
              this.valid = true
              return true
            }
          },
        ],
      }
    },
    dateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const scheduledDate = v && new Date(v)
            if (scheduledDate && scheduledDate < this.formData.StartDate) {
              this.valid = false
              return 'Ticket end Date should be greater than Ticket startdate'
            } else if (
              scheduledDate &&
              scheduledDate > new Date(this.data.event.EndDate)
            ) {
              this.valid = false
              return 'Ticket end Date should be less than event end date'
            } else {
              this.valid = true
              return true
            }
          },
        ],
      }
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
      this.formData.Events = this.$route.params.id
      this.formData.Status = this.eventData.Status
      try {
        const res = await this.$axios.$post(`${url}Tickets`, this.formData)
        if (res) {
          this.dialog = false
          this.onReset()
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
      this.formData.StartDate = new Date()
      this.formData.EndDate = addMonths(new Date(), 1)
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

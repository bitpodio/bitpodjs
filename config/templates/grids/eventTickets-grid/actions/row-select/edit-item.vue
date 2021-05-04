<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="getTickets">
          <v-icon left class="fs-16">fa-pencil</v-icon
          ><i18n path="Common.EditItem" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            <i18n path="Common.EditTicket" />
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
                      v-model="formData.StartDate"
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
                      v-model="formData.EndDate"
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
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="formData.Type"
                  :items="typeDropDown"
                  :label="$t('Common.Type')"
                  :rules="[rules.required]"
                  outlined
                  dense
                  @change="getType"
                ></v-select>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="Amount"
                  :label="getCurrencyLabel()"
                  type="number"
                  :disabled="formData.Type === 'Free'"
                  min="formData.Type === 'Free' ? 0 : 1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field
                  v-model="formData.AvailableCount"
                  :label="$t('Common.TicketCountRequired')"
                  :rules="ticketCountRules()"
                  type="number"
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
                  v-model="registrationType"
                  :items="registrationTypeDropdown"
                  :label="$t('Common.RegistrationType')"
                  multiple
                  outlined
                  chips
                  dense
                  small-chips
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
              <v-col class="col-12 col-md-6">
                <v-select
                  v-model="eventStatus"
                  :items="eventStatusDropDown"
                  :label="$t('Common.Status')"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
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
              (formData.Type !== 'Free' && Amount <= 0) ||
              formData.Code === ''
            "
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
            :has-submit-action="true"
            :has-external-submit="true"
            :form-name="formName"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import registrationtype from '~/config/apps/event/gql/registrationType.gql'
import SaveBtn from '~/components/common/saveButton'
import { formatGQLResult } from '~/utility/gql.js'
import { postGaData } from '~/utility/index.js'
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
    items: {
      type: Object,
      required: true,
    },
    context: {
      type: Object,
      default: null,
      required: false,
    },
    viewName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      typeDropDown: [],
      type: [],
      registrationTypeDropdown: [],
      registrationType: [],
      eventStatusDropDown: [],
      eventStatus: [],
      rules: rules(this.$i18n),
      Amount: 0,
      dialog: false,
      datevalid: true,
      id: '',
      formData: {},
      eventData: {},
      setAttendee: [],
      valid: false,
      data: {
        event: {},
      },
      Symbol: '',
      CheckEndDate: '',
      formName: 'edit-eventTickets-form',
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
            const { EndDate } = this.formData
            let startDateMessage = ''
            if (this.context.event.BusinessType !== 'Recurring') {
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
            const { StartDate } = this.formData
            let endDateMessage = ''
            if (this.context.event.BusinessType !== 'Recurring') {
              if (!EndDate)
                endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
              else if (StartDate && EndDate && StartDate > EndDate)
                endDateMessage = this.$t('Messages.Error.EndStartDate')
              else if (EndDate < new Date())
                endDateMessage = this.$t('Messages.Error.TicketEndCurrentDate')
              else if (EndDate > new Date(this.CheckEndDate))
                endDateMessage = this.$t('Messages.Error.TicketEndDate')
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
  watch: {
    async dialog(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.EditTicket'))
        try {
          const res = await this.getRegistrationType()
          if (res) {
            this.registrationTypeDropdown = res.map((i) => i.Name)
          }
        } catch (e) {
          console.log(
            `Error in templates/grids/eventTickets/actions/row-select/edit-item.vue while making a GQL call to Ticket model from method getRegistrationType`,
            e
          )
        }
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
        `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a GQL call to Ticket model from method getDropDownData`,
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
        `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a GQL call to RegistrationType model from method getRegistrationType`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('TicketStatus')
      if (res) {
        this.eventStatusDropDown = res.map((i) => i.value)
        this.eventStatus = this.eventStatusDropDown[0]
      }
    } catch (e) {
      console.log(
        `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a GQL call to Ticket model from method getDropDownData`,
        e
      )
    }
    this.getAttendeeType()
    this.getCurrencySymbol(this.context.event.Currency)
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
        this.context.event.BusinessType !== 'Recurring' ||
        this.formData.StartDate !== ''
      ) {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent) {
          this.$refs.dateTimeComponent.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    changeEndDate() {
      if (
        this.context.event.BusinessType !== 'Recurring' ||
        this.formData.EndDate !== ''
      ) {
        this.$refs.dateform && this.$refs.dateform.validate()
        if (this.$refs.dateTimeComponent1) {
          this.$refs.dateTimeComponent1.$children[0].onClickOutside = this.outsideClicked
        }
      }
    },
    onClose() {
      this.onReset()
      this.dialog = false
      postGaData('Close', this.$t('Common.EditTicket'))
    },
    getDateLabel(dateLabel) {
      if (this.context.event.BusinessType === 'Recurring') {
        return `${dateLabel}`
      } else {
        return `${dateLabel}*`
      }
    },
    onReset() {
      this.formData.Attendee = []
      this.Attendees = []
      this.formData.Amount = ''
      this.formData.CheckGroupDiscount = false
      this.formData.Code = ''
      this.formData.DisplayOrder = null
      this.formData.Group = ''
      this.formData.Type = ''
      this.formData.TicketCount = null
      this.formData.ValidateQty = false
      this.formData.Status = ''
      this.formData.StartDate = ''
      this.formData.EndDate = ''
      this.valid = false
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.EditTicket'))
      const url = this.$bitpod.getApiUrl()
      this.getAttendeesId()
      this.formData.Amount = parseFloat(this.Amount)
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      this.formData.TicketCount = parseInt(this.formData.TicketCount)
      this.formData.AvailableCount = parseInt(this.formData.AvailableCount)
      this.formData.Events = this.$route.params.id
      this.formData.Status = this.eventStatus
      try {
        const res = await this.$axios.$patch(
          `${url}Tickets/${this.items[0].id}`,
          this.formData
        )
        if (res) {
          this.onReset()
          this.dialog = false
          this.$eventBus.$emit(
            'toggle-snackbar',
            this.viewName,
            this.$t('Messages.Success.TicketRecordUpdatedSuccess'),
            3000
          )
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a PATCH call to Ticket model from method onSave context:-URL:-${url}\n TicketId:-${this.items[0].id}\n formData:-${this.formData}\n `
        )
      }
    },
    getCurrencyLabel() {
      const str = `Price*(${this.Symbol})`
      return str
    },
    getCurrencySymbol(Currency) {
      this.Symbol = Number()
        .toLocaleString(Currency, { style: 'currency', currency: Currency })
        .slice(0, 1)
    },
    getType() {
      if (this.formData.Type === 'Free') {
        this.Amount = 0
      } else {
        this.Amount = 1
      }
    },

    getAttendeesId() {
      this.formData.Attendee = this.setAttendee
        .filter((i) => this.registrationType.some((j) => j === i.Name))
        .map((k) => k.id)
    },
    getTickets() {
      this.items.map((ele) => {
        this.CheckEndDate = this.context.event.EndDate
        this.formData = { ...ele }
        if (
          this.context.event.BusinessType !== 'Recurring' ||
          (ele.StartDate !== '' && ele.EndDate !== '')
        ) {
          this.formData.StartDate = new Date(ele.StartDate)
          this.formData.EndDate = new Date(ele.EndDate)
        } else {
          this.formData.StartDate = null
          this.formData.EndDate = null
        }
        this.Amount = ele.Amount
        this.registrationType = []
        this.setAttendee.forEach((x) => {
          ele.Attendee.map((y) => {
            if (x.id === y) {
              this.registrationType.push(x.Name)
            }
          })
        })
        this.id = ele.id
      })
    },
    async getAttendeeType() {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(
          `${url}Events/${this.$route.params.id}/AttendeeType`
        )
        if (res) {
          res.forEach((element) => {
            this.setAttendee.push(element)
          })
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a GET call to Event model from method getAttendeeType context:-URL:-${url}\n EventId:-${this.$route.params.id} `
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
          `Error in templates/grids/eventTickets/actions/grid/wor-select/edit-item.vue while making a GQL call to GeneralConfiguration model from method getDropDownData Inputs:-filterType:-${filterType} `,
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
          fetchPolicy: 'no-cache',
        })
        if (result) {
          const generalConfig = formatGQLResult(result.data, 'RegistrationType')
          this.getTickets()
          return generalConfig
        }
      } catch (e) {
        console.log(
          `Error in templates/grids/eventTickets/actions/grid/row-select/edit-item.vue while making a GQL call to RegistrationType model from method getRegistrationType context:- EventId:-${this.$route.params.id}\n `,
          e
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
  },
}
</script>

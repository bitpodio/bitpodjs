<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-dialog
        v-model="isEditReg"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">Edit Registration</h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.FirstName"
                  :rules="requiredRules"
                  label="First Name*"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.LastName"
                  :rules="requiredRules"
                  label="Last Name*"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.Phone"
                  :rules="requiredRules"
                  label="Phone*"
                  dense
                  type="Number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.Email"
                  :rules="requiredRules"
                  label="Email*"
                  dense
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.CompanyName"
                  label="Organization"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Lookup
                  v-model="regData.Status"
                  :field="statusProps"
                  class="v-tickettype"
                />
              </v-col>
              <div class="col-md-12 pl-3">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1">Physical Address</h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="venueAddress.AddressLine"
                  label="Address"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="venueAddress.City"
                  label="City"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="venueAddress.State"
                  label="State"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="venueAddress.PostalCode"
                  label="Zip"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="venueAddress.Country"
                  label="Country"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <Lookup
                  v-model="regData.EventId"
                  :field="eventsProps"
                  :on-change="eventChange"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  v-model="regData.TicketId"
                  :items="tickets"
                  item-text="codeAmount"
                  item-value="id"
                  label="Tickets"
                  multiple
                  outlined
                  dense
                  @change="ticketChange"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="regData.TicketQuantity"
                  label="Ticket Quantity"
                  dense
                  outlined
                  min="1"
                  type="Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  v-model="regData.SessionId"
                  :items="sessions"
                  item-text="Name"
                  item-value="id"
                  label="Sessions"
                  :loading="isSessionLoading"
                  multiple
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn :disabled="!valid" color="primary" depressed @click="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required } from '~/utility/rules.js'
import eventRegistrationTicketSlot from '~/config/apps/event/gql/eventRegistrationTicketSlot.gql'
import ticket from '~/config/apps/event/gql/ticket.gql'
import eventSession from '~/config/apps/event/gql/eventSession.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getApiUrl } from '~/utility/index.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { getIdFromAtob } from '~/utility'

export default {
  props: {
    isEditReg: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
  },
  data() {
    return {
      requiredRules: [required],
      regData: {},
      regDetails: {},
      events: [],
      tickets: [],
      sessions: [],
      isSessionLoading: false,
      valid: false,
      lazy: false,
      data: {
        event: {},
      },
      eventData: {},
      venueAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
      },
      statusProps: {
        type: 'lookup',
        caption: 'Status',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'RegistrationStatus',
            }
          },
        },
      },
    }
  },
  computed: {
    eventsProps() {
      const items = this.events
      return {
        type: 'lookup',
        caption: 'Events',
        items,
        dataSource: {
          items,
          itemText: 'Title',
          itemValue: 'id',
        },
      }
    },
    ticketsProps() {
      const items = this.tickets
      const ticket = {
        type: 'lookup',
        items,
        dataSource: {
          items,
          itemText: 'codeAmount',
          itemValue: 'id',
        },
      }

      return {
        ...ticket,
      }
    },
  },
  methods: {
    async eventChange(eventId, isReg) {
      const where = { Events: eventId }
      const result = await this.$apollo.query({
        query: gql`
          ${ticket}
        `,
        variables: {
          filters: { where },
        },
      })
      let tickets = formatGQLResult(result.data, 'Ticket')
      tickets = tickets.length > 0 ? tickets : []
      this.tickets = tickets.map(({ id, ...rest }) => ({
        id: getIdFromAtob(id),
        codeAmount: `${rest.Code} ${rest.Amount}`,
        ...rest,
      }))
      if (isReg) {
        this.regData.TicketId && this.ticketChange(this.regData.TicketId)
      } else {
        this.regData.TicketId = []
      }
    },
    async ticketChange(ticketId) {
      this.isSessionLoading = true
      const where = { SessionTicket: { inq: ticketId } }
      const result = await this.$apollo.query({
        query: gql`
          ${eventSession}
        `,
        variables: {
          filters: { where },
          where: {},
        },
      })
      let sessions = formatGQLResult(result.data, 'Session')
      sessions = sessions.length > 0 ? sessions : []
      this.sessions = sessions.map(({ id, ...rest }) => ({
        id: getIdFromAtob(id),
        ...rest,
      }))
      this.isSessionLoading = false
    },
    close() {
      this.regData = { ...this.regDetails }
      if (this.regDetails._CurrentAddress) {
        this.venueAddress = {}
        this.venueAddress = { ...this.regDetails._CurrentAddress }
      }
      this.$emit('update:isEditReg', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      delete this.regData.__typename
      if (this.regData._Refund === null) {
        delete this.regData._Refund
      }

      const cloneTickets = JSON.parse(JSON.stringify(this.tickets))
      let totalAmount = 0
      this.regData.TicketId.forEach(function (tid) {
        cloneTickets.forEach(function (ticket) {
          if (tid === ticket.id && ticket.Amount > 0) {
            totalAmount += ticket.Amount
          }
        })
      })
      this.regData.TotalAmount = totalAmount

      this.regData._CurrentAddress = this.venueAddress
      if (this.regData._CurrentAddress) {
        delete this.regData._CurrentAddress.__typename
      }
      if (this.regData.PaymentMethod === null) {
        this.regData.PaymentMethod = 'Discount'
      }
      if (this.regData.TotalAmount === null) {
        this.regData.TotalAmount = 0
      }
      if (this.regData.CompanyName === null) {
        this.regData.CompanyName = 'pg'
      }
      this.regData.TicketQuantity = parseInt(this.regData.TicketQuantity)
      this.regData.id = atob(this.regData.id).split(':')[1]
      const baseUrl = getApiUrl()
      let res = null
      try {
        res = await this.$axios.$patch(
          `${baseUrl}Registrations/${this.regData.id}`,
          {
            ...this.regData,
          }
        )
      } catch (e) {
        console.error('Error', e)
      }
      if (res) {
        this.close()
        this.refresh()
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
          eventFilters: {
            skip: '0',
            order: 'createdDate DESC',
            where: {
              and: [
                {
                  or: [{ EndDate: null }, { EndDate: { gte: new Date() } }],
                },
                { Status: 'Open for registration' },
              ],
            },
          },
        }
      },
      update(data) {
        const registration = formatGQLResult(data, 'Registration')
        this.regData = registration.length > 0 ? { ...registration[0] } : {}
        this.regDetails = registration.length > 0 ? { ...registration[0] } : {}
        let events = formatGQLResult(data, 'Event')
        events = events.length > 0 ? events : []
        this.events = events.map(({ id, ...rest }) => ({
          id: getIdFromAtob(id),
          ...rest,
        }))
        if (this.regData._CurrentAddress) {
          this.venueAddress = this.regData._CurrentAddress
        }
        this.regData.EventId && this.eventChange(this.regData.EventId, true)
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

<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <div>
      <v-toolbar dark app color="accent">
        <v-toolbar-title>New Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="stepNumber">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="stepNumber > 1" step="1"
            >Basic Info</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="stepNumber > 2" step="2"
            >Tickets</v-stepper-step
          >
          <v-divider></v-divider>

          <v-stepper-step step="3">Recurring Session</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="stepper-box">
          <v-stepper-content step="1">
            <v-card flat>
              <p>
                Enter event name and details to help your audience learn about
                your event, add details that highlights why someone should
                attend it.
              </p>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="eventData.Title"
                    :rules="requiredRules"
                    label="Event Title*"
                    required
                    outlined
                    @change="changeEventName($event)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <RichText
                    v-model="eventData.Description"
                    class="mb-3"
                    label="Description"
                  ></RichText> </v-col
                ><br />
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="eventData.UniqLink"
                    label="Event Link*"
                    hint="https://bitpod-event.test.bitpod.io/e/"
                    persistent-hint
                    outlined
                    required
                    :error-messages="uniqueLinkValidationMsg"
                    @keyup="changeUniqueLink($event)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <v-btn color="primary" @click="next(2)">Next</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card v-if="isTicket" flat>
              <p>
                Setup event tickets and price, you can also set tickets validity
                so early birds can be offered better pricing.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addTicketRow"
                >Add Tickets</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title*</th>
                      <th class="text-left">Type*</th>
                      <th class="text-left">Price</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, k) in tickets" :key="k">
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.Code"
                          :rules="requiredRules"
                          label="Title"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="ticket.Type"
                          :field="ticketTypeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.Amount"
                          label="price"
                          outlined
                          value
                          :disabled="isPriceDisabled(k)"
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.TicketCount"
                          label="quantity"
                          outlined
                          value
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-btn text small @click="deleteTicket(k)">
                          <v-icon left>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>

            <v-btn color="primary" @click="stepNumber = 1">Prev</v-btn>
            <v-btn color="primary" @click="next(3)">Next</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card v-if="isTicket" flat>
              <p>
                Setup event recurrence, sessions availability to help your
                attendees book a time slot.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addSession"
                >Add Recurring Session</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Date Range*</th>
                      <th class="text-left">Start Time*</th>
                      <th class="text-left">End Time*</th>
                      <th class="text-left">Slot Size*</th>
                      <th class="text-left">Timezone</th>
                      <th class="text-left">Location*</th>
                      <th class="text-left">Type*</th>
                      <th class="text-left">Tickets</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(session, k) in sessions" :key="k">
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="session.DateRange"
                          :rules="requiredRules"
                          label="DateRange"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.StartTime"
                          :field="startTimeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.EndTime"
                          :field="endTimeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.SlotSize"
                          :field="slotSizeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Timezone
                          v-model="eventData.Timezone"
                          :rules="requiredRules"
                          :field="timezonefield"
                        ></Timezone>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.Location"
                          :field="locationTypeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="session.Type"
                          label="Type*"
                          outlined
                          value
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="session.Tickets"
                          label="Tickets"
                          outlined
                          value
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-btn text small @click="deleteSession(k)">
                          <v-icon left>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-btn color="primary" @click="stepNumber = 2">Prev</v-btn>
              <v-btn
                color="primary"
                :disabled="isSaveButtonDisabled"
                @click="saveRecord"
                >Save</v-btn
              >
            </v-card>
            <v-card
              v-else
              outlined
              class="text-center elevation-2 vs-notification pa-5"
            >
              <div v-if="isEventCreate" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle body-1 primary white--text"
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="pb-2 text-uppercase">
                  <span class="text-uppercase Body 1" style="font-size: 20px;"
                    >EVENT HAS BEEN CREATED.</span
                  >
                </div>
                <div class="pb-3 text--primary">
                  Event goers can only register after you publish it. We
                  recommend you click view button to verify your event page and
                  if everything looks as expected then PUBLISH it.
                  <br />
                  You can also use events link from left panel to edit or
                  publish this event any time you like.
                </div>
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon>View</v-btn
                  >
                  <v-btn
                    outlined
                    color="primary"
                    class="ma-1"
                    @click="eventPublish"
                  >
                    <v-icon left>mdi-rotate-315 mdi-send</v-icon> Publish</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
              <div v-if="isEventPublish" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle body-1 primary white--text"
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="pb-2">
                  <span class="text-uppercase Body 1" style="font-size: 20px;">
                    YOUR EVENT HAS BEEN PUBLISHED.</span
                  >
                </div>
                <div class="pb-2 text--primary">
                  Now it is open for registrations, you can click on view to
                  fetch the event landing page URL, which you can share with
                  others, so they can register.
                </div>
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon>View</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-form>
</template>
<script>
import gql from 'graphql-tag'
import strings from '../strings.js'
// import { formatTimezoneDateFieldsData } from '~/utility/form.js'
// import { getApiUrl } from '~/utility/index.js'
import Lookup from '~/components/common/form/lookup.vue'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import Timezone from '~/components/common/form/timezone'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import { formatGQLResult } from '~/utility/gql.js'
import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Lookup,
    Timezone,
  },
  props: {
    onFormClose: Function,
  },
  data: () => {
    // const currentDatetime = new Date(new Date().setSeconds(0))
    return {
      valid: true,
      lazy: false,
      isSaveButtonDisabled: false,
      addresslineMessage: '',
      isTicket: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [(v) => !!v || 'This field is required'],
      isMap: false,
      ticketTypeProps: {
        caption: 'Type*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'TicketType',
            }
          },
        },
      },
      startTimeProps: {
        caption: 'Start Time*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      endTimeProps: {
        caption: 'End Time*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      slotSizeProps: {
        caption: 'Slot Size*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'EventDuration',
            }
          },
        },
      },
      locationTypeProps: {
        caption: 'Location*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'LocationType',
            }
          },
        },
      },
      // dateTime: new Date(),
      //   fields: [
      //     {
      //       type: 'timezone',
      //       fieldName: 'Timezone',
      //     },
      //     {
      //       type: 'datetime',
      //       fieldName: 'StartDate',
      //     },
      //     {
      //       type: 'datetime',
      //       fieldName: 'EndDate',
      //     },
      //   ],
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'eventData.Timezone',
      },
      text: null,
      eventData: {
        Title: '',
        // Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Description: '',
        UniqLink: '',
        // JoiningInstruction: '',
        BusinessType: 'Single',
        Privacy: 'Public',
        Currency: '',
        Status: 'Not ready',
        // LocationType: 'Venue',
        VenueName: '',
        _VenueAddress: {},
      },
      venueAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
        LatLng: {},
      },
      LatLng: {
        lat: 0.0,
        lng: 0.0,
      },
      stepNumber: 1,
      // datetime: new Date().toISOString().substr(0, 10),
      // date: new Date().toISOString().substr(0, 10),
      // menu: false,
      // modal: false,
      // menu2: false,
      // drawer: true,
      // isVenue: true,
      // isOnlineEvent: false,

      isInalidEventLink: false,
      uniqueLinkMessage: '',
      // currentDatetime,
      tickets: [
        {
          TicketId: 0,
          Code: 'General admission',
          Type: 'Free',
          Amount: 0,
          TicketCount: 100,
        },
      ],
      sessions: [
        {
          SessionId: 0,
          DateRange: 'over 30 rolling days',
          StartTime: '10:00',
          EndTime: '19:00',
          SlotSize: '30 min',
          Timezone: '',
          Location: 100,
          Type: 'Personal',
          Tickets: '0 ticket',
        },
      ],
    }
  },
  computed: {
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
  },
  methods: {
    close() {
      this.onFormClose()
      this.stepNumber = 1
    },
    closeForm() {
      this.onFormClose()
      this.stepNumber = 1
      this.$router.push('/apps/event/event/' + this.eventId)
    },

    buildMutationUpsertQuery(modelName) {
      return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
    },
    viewRegistration() {
      //   const baseUrl = getApiUrl()
      const baseUrl = 'event.test.bitpod.io/svc/api'
      const regUrl = baseUrl.replace('svc/api', 'e')
      window.open(`${regUrl}${this.eventData.UniqLink}`, '_blank')
    },
    async eventPublish() {
      const eventStatus = { Status: 'Open for registration' }
      this.isEventPublish = true
      this.isEventCreate = false
      const modelName = 'Event'
      const where = {
        id: this.eventId,
      }
      const editItemMutation = this.buildMutationUpsertQuery(modelName)
      await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
            data: eventStatus,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
    },
    isPriceDisabled(index) {
      if (this.tickets[index].Type === 'Free') {
        this.tickets[index].Amount = 0
        return true
      } else return false
    },
    deleteTicket(index) {
      if (this.tickets.length > 1) {
        this.tickets.splice(index, 1)
      }
    },
    deleteSession(index) {
      if (this.sessions.length > 1) {
        this.sessions.splice(index, 1)
      }
    },
    next(value) {
      const { Title, UniqLink } = this.eventData
      this.$refs.form.validate()
      if (
        value === 2 &&
        Title !== '' &&
        UniqLink !== '' &&
        this.isInalidEventLink === false
      ) {
        this.stepNumber = value
      } else if (value === 3) {
        this.stepNumber = value
      }
    },

    saveRecord() {
      this.isSaveButtonDisabled = true
      const { Code, Type, StartDate, EndDate } = this.tickets
      this.$refs.form.validate()
      if (
        Code !== '' &&
        Type !== '' &&
        StartDate !== null &&
        EndDate !== null
      ) {
        if (this.venueAddress.AddressLine !== '')
          this.eventData._VenueAddress = this.venueAddress

        // const convertedEventRecord = formatTimezoneDateFieldsData(
        //   this.eventData,
        //   this.fields
        // )
        // this.eventData.StartDate = convertedEventRecord.StartDate
        // this.eventData.EndDate = convertedEventRecord.EndDate
        this.eventData.EventManager = this.$auth.$state.user.data.email
        this.eventData.Organizer = this.$auth.$state.user.data.name

        // const baseUrl = getApiUrl()
        const baseUrl = 'event.test.bitpod.io/svc/api'
        this.$axios
          .$post(`${baseUrl}Events`, {
            ...this.eventData,
          })
          .then((res) => {
            this.eventId = res.id

            const ticketList = []

            this.tickets.forEach(function (ticket) {
              ticket.Events = res.id
              ticket.Amount = parseInt(ticket.Amount)
              ticket.TicketCount = parseInt(ticket.TicketCount)
              ticketList.push(ticket)
            })

            return this.$axios
              .$post(`${baseUrl}Tickets`, ticketList)
              .then((ticketres) => {
                this.isTicket = false
                this.isEventCreate = true
                return ticketres
              })
              .catch((e) => {
                console.log('error', e)
              })
          })
          .catch((e) => {
            console.log('error', e)
          })
      }
    },
    changeAddressData(value) {
      this.addresslineMessage = value === '' ? strings.FIELD_REQUIRED : ''
    },
    changeAddress() {
      const { City, State, Country, PostalCode } = this.venueAddress
      const VenueName = this.eventData.VenueName
      const AddressLine = this.$refs['venueAddress.AddressLine'].$data
        .autocompleteText
      if (
        AddressLine !== '' &&
        (VenueName !== '' || City !== '' || State !== '' || Country !== '')
      ) {
        const addressObj = `${AddressLine},${VenueName},${City},${State},${Country},${PostalCode}`
        const key = nuxtconfig.generalConfig.googleMapKey
        const customAxiosInstance = this.$axios.create({
          headers: {},
        })
        customAxiosInstance.setToken(false)
        customAxiosInstance
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${addressObj}&key=${key}`
          )
          .then((res) => {
            this.venueAddress.AddressLine = AddressLine || ''
            this.eventData.VenueName = VenueName || ''
            this.venueAddress.Country = Country || ''
            this.venueAddress.City = City || ''
            this.venueAddress.State = State || ''
            const latlng = {}
            latlng.lat = res.data.results[0].geometry.location.lat
            latlng.lng = res.data.results[0].geometry.location.lng
            this.venueAddress.LatLng.lat = latlng.lat || ''
            this.venueAddress.LatLng.lng = latlng.lng || ''

            const newLocations = []
            newLocations[0] = latlng

            this.locations = newLocations
            this.isMap = true
            this.returnToCenter()
            return res
          })
          .catch((e) => {
            console.log('error', e)
          })
      }
    },

    changeEventName(value) {
      this.verifyUniqueLink(value)
    },
    changeUniqueLink(event) {
      this.verifyUniqueLink(event.currentTarget.value)
    },
    verifyUniqueLink(value) {
      value = value.toLowerCase().replace(/\s/g, '')
      value = value.trim()
      this.eventData.UniqLink = value
      const regex = RegExp(/^[0-9a-zA-Z]+$/)
      if (regex.test(value)) {
        if (isNaN(value)) {
          this.eventData.UniqLink = value
          this.checkUniqueLink(this.eventData.UniqLink)
        }
      } else {
        this.isInalidEventLink = true
        this.uniqueLinkMessage = strings.UNIQUE_LINK_FORMAT
      }
    },
    async checkUniqueLink(value) {
      const where = { UniqLink: value }
      const result = await this.$apollo.query({
        query: gql`
          ${eventCount}
        `,
        variables: {
          where,
        },
      })
      if (result.data.Event.EventCount > 0) {
        this.isInalidEventLink = true
        this.uniqueLinkMessage = strings.UNIQUE_LINK_DUPLICATE
      } else this.isInalidEventLink = false
    },
    // changeLocation(value) {
    //   this.eventData.LocationType = value
    //   if (value === 'Venue') {
    //     this.isVenue = true
    //     this.isOnlineEvent = false
    //   }
    //   if (value === 'Online Event') {
    //     this.isVenue = false
    //     this.isOnlineEvent = true
    //     this.isMap = false
    //   }
    // },
    addTicketRow() {
      this.tickets.push({
        TicketId: this.tickets.length + 1,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        TicketCount: 100,
      })
    },
    addSession() {
      this.sessions.push({
        SessionId: this.sessions.length + 1,
        DateRange: 'over 30 rolling days',
        StartTime: '10:00',
        EndTime: '19:00',
        SlotSize: '30 min',
        Timezone: '',
        Location: 100,
        Type: 'Personal',
        Tickets: '0 ticket',
      })
    },
  },

  apollo: {
    data: {
      query() {
        return gql`
          ${organizationInfo}
        `
      },
      variables() {
        return {
          filters: {
            where: {},
          },
        }
      },
      update(data) {
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
        this.eventData.Currency = OrganizationInfo[0].Currency
      },
      error(error) {
        this.error = error
      },
    },
  },
}
</script>
<style scoped>
.form-control {
  border: 1px solid #ccc;
  width: 100%;
}
.vs-notification {
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.25) !important;
}
</style>

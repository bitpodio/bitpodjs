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
      <v-stepper v-model="e1">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="e1 > 1" step="1"
            >Basic Info</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Location</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="3">Tickets</v-stepper-step>
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
                <v-col cols="12" sm="6" md="4">
                  <v-datetime-picker
                    v-model="eventData.StartDate"
                    label="Start Date*"
                    :text-field-props="eventStartdateProps"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-datetime-picker
                    v-model="eventData.EndDate"
                    :rules="requiredRules"
                    label="End Date*"
                    :text-field-props="eventEnddateProps"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <Timezone
                    v-model="eventData.Timezone"
                    :rules="requiredRules"
                    :field="timezonefield"
                  ></Timezone>
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
            <v-card flat>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-col>
                    <v-select
                      value="Venue"
                      :items="['Online Event', 'Venue']"
                      label="Location Type"
                      required
                      outlined
                      @change="changeLocation($event)"
                    ></v-select>
                    <!-- <Lookup
                      v-model="eventData.LocationType"
                      :field="TypeProps"
                      @change="changeLocation($event)"
                    /> -->
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12">
                    <v-text-field
                      v-model="eventData.WebinarLink"
                      :rules="requiredRules"
                      label="Online Event Link*"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12">
                    <v-textarea
                      v-model="eventData.JoiningInstruction"
                      label="Additional online event joining instructions, URL, phone etc."
                      outlined
                      required
                    ></v-textarea>
                  </v-col>

                  <v-col v-if="isVenue" cols="12">
                    <no-ssr>
                      <vue-google-autocomplete
                        id="map"
                        ref="venueAddress.AddressLine"
                        v-model="venueAddress.AddressLine"
                        class="form-control"
                        placeholder="Address*"
                        :required="true"
                        @placechanged="getAddressData"
                        @change="changeAddressData($event)"
                      ></vue-google-autocomplete>
                    </no-ssr>
                    <div
                      v-show="addresslineMessage !== ''"
                      class="error-message"
                    >
                      {{ addresslineMessage }}
                    </div>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="eventData.VenueName"
                      label="Venue Name"
                      outlined
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.City"
                      label="City"
                      outlined
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.State"
                      label="State"
                      outlined
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.Country"
                      label="Country"
                      outlined
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.PostalCode"
                      label="Zip Code"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-col v-if="isMap">
                    <div class="flex"></div>
                    <div :key="`${locations[0].lat}-${locations[0].lng}`">
                      <GMap
                        ref="gMap"
                        language="en"
                        :cluster="{ options: { styles: clusterStyle } }"
                        :center="gMapCenter"
                        :options="{
                          fullscreenControl: false,
                          styles: mapStyle,
                        }"
                        :zoom="15"
                        @bounds_changed="checkForMarkers"
                      >
                        <GMapMarker
                          v-for="location in locations"
                          :key="`${location.lat}-${location.lng}`"
                          :position="{ lat: location.lat, lng: location.lng }"
                          :options="{
                            icon: pins.selected,
                          }"
                          @click="currentLocation = location"
                        >
                          <GMapInfoWindow :options="{ maxWidth: 200 }">
                            <code
                              >lat: {{ location.lat }}, lng:
                              {{ location.lng }}</code
                            >
                          </GMapInfoWindow>
                        </GMapMarker>
                        <GMapCircle :options="circleOptions" />
                      </GMap>
                    </div>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>

            <v-btn color="primary" @click="e1 = 1">Prev</v-btn>
            <v-btn color="primary" @click="next(3)">Next</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
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
                      <th class="text-left">Start Date*</th>
                      <th class="text-left">End Date*</th>
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
                        <v-datetime-picker
                          v-model="ticket.StartDate"
                          label="Start Date*"
                          :text-field-props="ticketStartdateProps(k, ticket)"
                        >
                          <template slot="dateIcon">
                            <v-icon>fas fa-calendar</v-icon>
                          </template>
                          <template slot="timeIcon">
                            <v-icon>fas fa-clock</v-icon>
                          </template>
                        </v-datetime-picker>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-datetime-picker
                          v-model="ticket.EndDate"
                          label="End Date*"
                          :text-field-props="ticketEnddateProps(k)"
                        >
                          <template slot="dateIcon">
                            <v-icon>fas fa-calendar</v-icon>
                          </template>
                          <template slot="timeIcon">
                            <v-icon>fas fa-clock</v-icon>
                          </template>
                        </v-datetime-picker>
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
              <v-btn color="primary" @click="e1 = 2">Prev</v-btn>
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
              class="text-center elevation-2 vs-notification"
            >
              <div v-if="isEventCreate" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar fs-icon primary white--text"
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
                    class="fa fa-calendar fs-icon primary white--text"
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
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import gql from 'graphql-tag'
import strings from '../strings.js'
import { formatTimezoneDateFieldsData } from '~/utility/form.js'
import { getApiUrl } from '~/utility/index.js'
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
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: Function,
  },
  data: () => {
    const currentDatetime = new Date(new Date().setSeconds(0))
    return {
      valid: true,
      lazy: false,
      isSaveButtonDisabled: false,
      addresslineMessage: '',
      isTicket: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [(v) => !!v || 'This field is required'],
      // uniquelinkRules: [(v) => !!v || 'Lower case alphanumeric letters only'],
      isMap: false,
      currentLocation: {},
      locationsVisibleOnMap: '',
      circleOptions: {},
      locations: [],
      pins: {
        selected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=',
        notSelected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII=',
      },
      mapStyle: [],
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
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
      dateTime: new Date(),
      fields: [
        {
          type: 'timezone',
          fieldName: 'Timezone',
        },
        {
          type: 'datetime',
          fieldName: 'StartDate',
        },
        {
          type: 'datetime',
          fieldName: 'EndDate',
        },
      ],
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'eventData.Timezone',
      },
      text: null,
      eventData: {
        Title: '',
        StartDate: addMonths(new Date(), 1),
        EndDate: addDays(addMonths(new Date(), 1), 4),
        Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Description: '',
        UniqLink: '',
        JoiningInstruction: '',
        WebinarLink: '',
        BusinessType: 'Single',
        Privacy: 'Public',
        Currency: '',
        Status: 'Not ready',
        LocationType: 'Venue',
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
      e13: 2,
      e1: 1,
      datetime: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      drawer: true,
      isVenue: true,
      isOnlineEvent: false,

      isInalidEventLink: false,
      uniqueLinkMessage: '',
      currenttimezone: '(GMT+05:30) India Standard Time',
      currentDatetime,
      tickets: [
        {
          TicketId: 0,
          Code: 'General admission',
          Type: 'Free',
          Amount: 0,
          StartDate: currentDatetime,
          EndDate: addDays(addMonths(new Date(), 1), 3),
          TicketCount: 100,
        },
      ],
    }
  },
  computed: {
    gMapCenter() {
      return { lat: this.locations[0].lat, lng: this.locations[0].lng }
    },
    eventStartdateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const { EndDate } = this.eventData
            let startdateMessage = ''
            if (!StartDate) startdateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              startdateMessage = strings.EVENT_START_END_DATE
            else if (StartDate < new Date())
              startdateMessage = strings.EVENT_START_DATE
            else startdateMessage = ''
            return startdateMessage || true
          },
        ],
      }
    },
    eventEnddateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            const { StartDate } = this.eventData
            let enddateMessage = ''
            if (!EndDate) enddateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              enddateMessage = strings.EVENT_START_END_DATE
            else if (EndDate < new Date())
              enddateMessage = strings.EVENT_END_DATE
            else enddateMessage = ''
            return enddateMessage || true
          },
        ],
      }
    },
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
  },
  methods: {
    close() {
      this.onFormClose()
      this.e1 = 1
    },
    closeForm() {
      this.onFormClose()
      this.e1 = 1
      this.$router.push('/apps/event/event/' + this.eventId)
    },

    buildMutationUpsertQuery(modelName) {
      return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
    },
    viewRegistration() {
      const baseUrl = getApiUrl()
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
      if (this.tickets.length > 1) this.tickets.splice(index, 1)
    },
    ticketStartdateProps(index, ticket) {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const { EndDate } = this.tickets[index]
            let startdateMessage = ''
            if (!StartDate && this.tickets[index].StartDate === null)
              startdateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              startdateMessage = strings.TICKET_START_DT_MSG
            else if (
              StartDate &&
              new Date(StartDate.setSeconds(1)) < this.currentDatetime
            ) {
              startdateMessage = strings.TICKET_START_DT_CURRENT_DT
            } else startdateMessage = ''
            return startdateMessage || true
          },
        ],
      }
    },
    ticketEnddateProps(index) {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            const { StartDate } = this.tickets[index]
            let enddateMessage = ''

            if (!EndDate) enddateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              enddateMessage = strings.TICKET_START_DT_MSG
            else if (new Date(EndDate) < this.currentDatetime) {
              enddateMessage = strings.TICKET_END_DT_CURRENT_DT
            } else if (new Date(EndDate) > this.eventData.EndDate) {
              enddateMessage = strings.TICKET_END_DT_MSG
            } else enddateMessage = ''
            return enddateMessage || true
          },
        ],
      }
    },
    returnToCenter() {
      this.$refs.gMap && this.$refs.gMap.map.setCenter(this.locations[0])
    },
    next(value) {
      const {
        Title,
        StartDate,
        EndDate,
        Timezone,
        UniqLink,
        LocationType,
        WebinarLink,
      } = this.eventData
      this.$refs.form.validate()
      if (
        value === 2 &&
        Title !== '' &&
        StartDate !== null &&
        EndDate !== null &&
        Timezone !== '' &&
        UniqLink !== '' &&
        StartDate < EndDate &&
        StartDate >= new Date() &&
        EndDate >= new Date() &&
        this.isInalidEventLink === false
      ) {
        this.e1 = value
      } else if (value === 3) {
        if (
          (LocationType === 'Venue' &&
            this.$refs['venueAddress.AddressLine'].$data.autocompleteText !==
              '') ||
          (LocationType === 'Online Event' && WebinarLink !== '')
        ) {
          this.e1 = value
          this.addresslineMessage = ''
        } else if (
          this.$refs['venueAddress.AddressLine'].$data.autocompleteText === ''
        ) {
          this.addresslineMessage = strings.FIELD_REQUIRED
        }
      }
    },
    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition())
      })
      this.locationsVisibleOnMap = this.locations
        .filter((l) => l.visible)
        .map((l) => l.name)
        .join(', ')
    },

    saveRecord() {
      this.isSaveButtonDisabled = true
      console.log('==saveRecord==')
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

        const convertedEventRecord = formatTimezoneDateFieldsData(
          this.eventData,
          this.fields
        )
        this.eventData.StartDate = convertedEventRecord.StartDate
        this.eventData.EndDate = convertedEventRecord.EndDate
        this.eventData.EventManager = this.$auth.$state.user.data.email
        this.eventData.Organizer = this.$auth.$state.user.data.name

        console.log('===getApiUrl=', getApiUrl())
        const baseUrl = getApiUrl()
        this.$axios
          .$post(`${baseUrl}Events`, {
            ...this.eventData,
          })
          .then((res) => {
            console.log('=res===', res)
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
      if (value === '') this.addresslineMessage = 'This field is required'
      else this.addresslineMessage = ''
    },
    changeAddress() {
      const { City, State, Country, PostalCode } = this.venueAddress
      const VenueName = this.eventData.VenueName
      const AddressLine = this.$refs['venueAddress.AddressLine'].$data
        .autocompleteText
      if (
        AddressLine !== '' &&
        VenueName !== '' &&
        (City !== '' || State !== '' || Country !== '')
      ) {
        console.log('=address request===')
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
            console.log('=address res===', res)
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
    getAddressData(addressData, placeResultData, id) {
      console.log('==addressData==', addressData)
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      this.eventData.VenueName = addressData.route || ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      this.venueAddress.LatLng.lat = addressData.latitude || ''
      this.venueAddress.LatLng.lng = addressData.longitude || ''
      const latlng = {}
      latlng.lat = addressData.latitude
      latlng.lng = addressData.longitude
      latlng.name =
        addressData.route +
        ' ' +
        addressData.locality +
        ' ' +
        addressData.country
      const newLocations = []
      newLocations[0] = latlng

      this.locations = newLocations
      this.isMap = true
      this.returnToCenter()
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
    changeLocation(value) {
      this.eventData.LocationType = value
      if (value === 'Venue') {
        this.isVenue = true
        this.isOnlineEvent = false
      }
      if (value === 'Online Event') {
        this.isVenue = false
        this.isOnlineEvent = true
        this.isMap = false
      }
    },
    addTicketRow() {
      this.tickets.push({
        TicketId: this.tickets.length + 1,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: new Date(),
        EndDate: addDays(addMonths(new Date(), 1), -1),
        TicketCount: 100,
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
  padding: 10px;
  width: 100%;
  border-radius: 5px;
}
.v-picker {
  border-radius: 0;
}
.fs-icon {
  font-size: 20px;
  padding: 15px;
  display: inline-flex;
  border-radius: 50%;
}
.vs-notification {
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.25) !important;
  padding: 20px;
}
.error-message {
  color: red;
  padding: 10px;
  padding-top: 0;
  font-size: 12px;
}
</style>

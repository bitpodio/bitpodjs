<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-card class="elevation-0 v-eventform">
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-4 pb-0 text-h5">Create Event</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-tabs v-model="tabs" height="36" class="mb-6 mt-2 v-event-icon">
          <v-tab href="#tab-1" class="px-0 mr-4" @click="selectTab(1)">
            <v-icon left>fa-info-circle</v-icon><span>Basic Info</span>
          </v-tab>
          <v-tab
            href="#tab-2"
            class="px-0 mr-4"
            :disabled="!validTab1()"
            @click="selectTab(2)"
          >
            <v-icon left>fa-map-marker</v-icon><span>Location</span>
          </v-tab>
          <v-tab
            href="#tab-3"
            class="px-0 mr-4"
            :disabled="!validTab1() || !validTab2()"
            @click="selectTab(3)"
          >
            <v-icon left>fa-ticket</v-icon><span>Tickets</span>
          </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 event-inner">
        <v-tabs-items v-model="tabs">
          <v-tab-item :value="'tab-1'">
            <v-card flat>
              <p>
                Enter event name and details to help your audience learn about
                your event, add details that highlights why someone should
                attend it.
              </p>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="eventData.Title"
                    :rules="requiredRules"
                    label="Event Title*"
                    required
                    dense
                    outlined
                    @change="changeEventName($event)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-datetime-picker
                    v-model="eventData.StartDate"
                    label="Start Date*"
                    :text-field-props="eventStartDateProps"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-datetime-picker
                    v-model="eventData.EndDate"
                    :rules="requiredRules"
                    label="End Date*"
                    :text-field-props="eventEndDateProps"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Timezone
                    v-model="eventData.Timezone"
                    :rules="requiredRules"
                    :field="timezonefield"
                    dense
                    class="v-timezone"
                  ></Timezone>
                </v-col>
                <v-col cols="12" class="pb-4 pt-2">
                  <RichText
                    v-model="eventData.Description"
                    class="mb-3"
                    label="Description"
                  ></RichText>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="eventData.UniqLink"
                    label="Event Link*"
                    :hint="eventLinkHint"
                    persistent-hint
                    outlined
                    dense
                    required
                    :error-messages="uniqueLinkValidationMsg"
                    @keyup="changeUniqueLink($event)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>

          <v-tab-item :value="'tab-2'">
            <v-card flat>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="pl-0 pt-0 pb-0">
                  <v-col class="pb-0">
                    <v-select
                      value="Venue"
                      :items="['Online Event', 'Venue']"
                      label="Location Type"
                      required
                      dense=""
                      outlined
                      @change="changeLocation($event)"
                    ></v-select>
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12" class="pb-0">
                    <v-text-field
                      v-model="eventData.WebinarLink"
                      :rules="requiredRules"
                      label="Online Event Link*"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12" class="pb-0">
                    <v-textarea
                      v-model="eventData.JoiningInstruction"
                      label="Additional online event joining instructions, URL, phone etc."
                      outlined
                      required
                      dense
                    ></v-textarea>
                  </v-col>

                  <v-col v-if="isVenue" cols="12" class="pb-6 positionRelative">
                    <no-ssr>
                      <vue-google-autocomplete
                        id="map"
                        ref="venueAddress.AddressLine"
                        v-model="venueAddress.AddressLine"
                        class="form-control pa-3 d-block rounded"
                        placeholder="Address*"
                        :required="true"
                        @placechanged="getAddressData"
                        @change="changeAddressData($event)"
                      ></vue-google-autocomplete>
                    </no-ssr>
                    <div
                      v-show="addresslineMessage !== ''"
                      class="red--text pa-3 pt-0 pb-0 body-2 positionAbsolute"
                    >
                      {{ addresslineMessage }}
                    </div>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="eventData.VenueName"
                      label="Venue Name"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.City"
                      label="City"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.State"
                      label="State"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.Country"
                      label="Country"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.PostalCode"
                      label="Zip Code"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pb-0">
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
          </v-tab-item>

          <v-tab-item :value="'tab-3'">
            <v-card v-if="isTicket" flat>
              <p>
                Setup event tickets and price, you can also set tickets validity
                so early birds can be offered better pricing.
              </p>
              <v-btn
                class="ma-2 ml-0 mb-3"
                outlined
                color="indigo"
                @click="addTicketRow"
                >Add Tickets</v-btn
              >
              <v-simple-table class="event-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left pl-0">Title*</th>
                      <th class="text-left pl-2">Type*</th>
                      <th class="text-left pl-2">Price</th>
                      <th class="text-left pl-2">Start Date*</th>
                      <th class="text-left pl-2">End Date*</th>
                      <th class="text-left pl-2">Quantity</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, k) in tickets" :key="k">
                      <td class="pa-2 pb-0 pl-0">
                        <v-text-field
                          v-model="ticket.Code"
                          :rules="requiredRules"
                          outlined
                          dense
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="ticket.Type"
                          :field="ticketTypeProps"
                          class="v-tickettype"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.Amount"
                          outlined
                          dense
                          value
                          type="Number"
                          min="0"
                          :disabled="isPriceDisabled(k)"
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-datetime-picker
                          v-model="ticket.StartDate"
                          :text-field-props="ticketStartDateProps(k)"
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
                          :text-field-props="ticketEndDateProps(k)"
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
                          outlined
                          dense
                          type="Number"
                          min="0"
                          value
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pt-0">
                        <v-btn icon class="mt-1" @click="deleteTicket(k)">
                          <v-icon>mdi-24px mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
            <v-card
              v-else
              outlined
              class="text-center elevation-2 vs-notification pa-5"
            >
              <div v-if="isEventCreate" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle fs-18 primary white--text"
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
                    <v-icon left>mdi-rotate-315 mdi-send</v-icon>
                    Publish</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
              <div v-if="isEventPublish" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle fs-18 primary white--text"
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
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
      >
        <v-btn
          v-if="currentTab > 1"
          depressed
          color="grey lighten-2"
          @click="prev()"
          >Prev</v-btn
        >
        <v-btn
          v-if="currentTab < 3"
          depressed
          color="primary"
          :disabled="isNextDisabled()"
          @click="next()"
          >Next</v-btn
        >
        <v-btn
          v-if="currentTab > 2"
          depressed
          color="primary"
          :disabled="isSaveButtonDisabled"
          @click="saveRecord"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
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
import { required } from '~/utility/rules.js'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Lookup,
    Timezone,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: {
      type: Function,
      default: () => null,
    },
  },
  data: () => {
    const currentDatetime = new Date(new Date().setSeconds(0))
    return {
      valid: true,
      lazy: false,
      tabs: null,
      isUniqLinkValid: false,
      currentTab: 1,
      isSaveButtonDisabled: false,
      addresslineMessage: '',
      isTicket: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [required],
      isMap: false,
      currentLocation: {},
      locationsVisibleOnMap: '',
      circleOptions: {},
      locations: [],
      pins: {
        selected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=',
      },
      mapStyle: [],
      clusterStyle: [],
      ticketTypeProps: {
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
    eventLinkHint() {
      return `${strings.EVENT_LINK_HINT}${this.eventData.UniqLink}`
    },
    gMapCenter() {
      return { lat: this.locations[0].lat, lng: this.locations[0].lng }
    },
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
            if (!StartDate) startDateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              startDateMessage = strings.EVENT_START_END_DATE
            else if (StartDate < new Date())
              startDateMessage = strings.EVENT_START_DATE
            else startDateMessage = ''
            return startDateMessage || true
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
            if (!EndDate) endDateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              endDateMessage = strings.EVENT_START_END_DATE
            else if (EndDate < new Date())
              endDateMessage = strings.EVENT_END_DATE
            else endDateMessage = ''
            return endDateMessage || true
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
    isNextDisabled() {
      return this.isUniqLinkValid === false
    },
    selectTab(tabNumber) {
      this.currentTab = tabNumber
    },
    close() {
      this.onFormClose()
      this.tabs = 'tab-1'
    },
    closeForm() {
      this.onFormClose()
      this.tabs = 'tab-1'
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
      if (this.tickets.length > 1) {
        this.tickets.splice(index, 1)
      }
    },
    ticketStartDateProps(index) {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const { EndDate } = this.tickets[index]
            let startDateMessage = ''
            if (!StartDate && this.tickets[index].StartDate === null)
              startDateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              startDateMessage = strings.TICKET_START_DT_MSG
            else if (
              StartDate &&
              new Date(StartDate.setSeconds(1)) < this.currentDatetime
            ) {
              startDateMessage = strings.TICKET_START_DT_CURRENT_DT
            } else startDateMessage = ''
            return startDateMessage || true
          },
        ],
      }
    },
    ticketEndDateProps(index) {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            const { StartDate } = this.tickets[index]
            let endDateMessage = ''

            if (!EndDate && this.tickets[index].EndDate === null)
              endDateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              endDateMessage = strings.TICKET_START_DT_MSG
            else if (new Date(EndDate) < this.currentDatetime) {
              endDateMessage = strings.TICKET_END_DT_CURRENT_DT
            } else if (new Date(EndDate) > this.eventData.EndDate) {
              endDateMessage = strings.TICKET_END_DT_MSG
            } else endDateMessage = ''
            return endDateMessage || true
          },
        ],
      }
    },
    returnToCenter() {
      this.$refs.gMap && this.$refs.gMap.map.setCenter(this.locations[0])
    },
    validTab1() {
      const { Title, StartDate, EndDate, Timezone, UniqLink } = this.eventData
      return (
        Title !== '' &&
        StartDate !== null &&
        EndDate !== null &&
        Timezone !== '' &&
        UniqLink !== '' &&
        StartDate < EndDate &&
        StartDate >= new Date() &&
        EndDate >= new Date() &&
        this.isInalidEventLink === false
      )
    },
    validTab2() {
      const { LocationType, WebinarLink } = this.eventData
      if (
        (LocationType === 'Venue' &&
          this.$refs['venueAddress.AddressLine'] &&
          this.$refs['venueAddress.AddressLine'].$data.autocompleteText !==
            '') ||
        (LocationType === 'Online Event' && WebinarLink !== '')
      ) {
        return true
      } else if (
        this.$refs['venueAddress.AddressLine'] &&
        this.$refs['venueAddress.AddressLine'].$data.autocompleteText === ''
      ) {
        return false
      }
    },
    prev(value) {
      this.currentTab = parseInt(this.tabs.split('-')[1])
      this.currentTab -= 1
      const tabValue = `tab-${this.currentTab}`
      this.tabs = tabValue
    },
    setNextTab() {
      this.currentTab = parseInt(this.tabs.split('-')[1])
      this.currentTab += 1
      const tabValue = `tab-${this.currentTab}`
      this.tabs = tabValue
    },
    next() {
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
        this.currentTab === 1 &&
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
        this.setNextTab()
      } else if (this.currentTab === 2) {
        if (
          (LocationType === 'Venue' &&
            this.$refs['venueAddress.AddressLine'].$data.autocompleteText !==
              '') ||
          (LocationType === 'Online Event' && WebinarLink !== '')
        ) {
          this.addresslineMessage = ''
          this.setNextTab()
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
      const isValidTicket = this.tickets.map((ticket, index) => {
        return (
          ticket.Code !== '' &&
          ticket.Type !== '' &&
          ticket.StartDate !== null &&
          ticket.EndDate !== null
        )
      })
      this.$refs.form.validate()
      if (!isValidTicket.includes(false)) {
        this.isSaveButtonDisabled = true
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

        const baseUrl = getApiUrl()
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

            // eslint-disable-next-line promise/no-nesting
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
            `${nuxtconfig.generalConfig.googleMapGeocodeApi}?address=${addressObj}&key=${key}`
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
    getAddressData(addressData, placeResultData, id) {
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
      } else {
        this.isInalidEventLink = false
        this.isUniqLinkValid = true
      }
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
  border: 1px solid #9a9a9a;
  width: 100%;
  max-height: 40px;
}
.vs-notification {
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.25) !important;
}
.steper-fixed {
  position: fixed;
  top: 55px;
}
.event-inner {
  min-height: 457px;
}
</style>

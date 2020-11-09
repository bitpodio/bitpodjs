<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-card class="elevation-0 v-eventform">
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-4 pb-0 text-h5">
          <i18n path="Drawer.CreateEventAction" />
        </h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-tabs v-model="tabs" height="36" class="mb-6 mt-2 v-event-icon">
          <v-tab href="#1" class="px-0 mr-4" @click="selectTab(1)">
            <v-icon left>fa-info-circle</v-icon
            ><span><i18n path="Common.BasicInfo" /></span>
          </v-tab>
          <v-tab
            href="#2"
            class="px-0 mr-4"
            :disabled="!validTab1()"
            @click="selectTab(2)"
          >
            <v-icon left>fa-map-marker</v-icon
            ><span><i18n path="Common.Location" /></span>
          </v-tab>
          <v-tab
            href="#3"
            class="px-0 mr-4"
            :disabled="!validTab1() || !validTab2()"
            @click="selectTab(3)"
          >
            <v-icon left>fa-ticket</v-icon
            ><span><i18n path="Common.Tickets" /></span>
          </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 event-inner">
        <v-tabs-items v-model="tabs">
          <v-tab-item :value="'1'">
            <v-card flat>
              <p>
                <i18n path="Common.EnterEventName" />
              </p>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="eventData.Title"
                    :rules="requiredRules"
                    :label="$t('Common.EventTitle')"
                    required
                    dense
                    outlined
                    @keyup="changeEventName($event)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-form
                ref="dateform"
                v-model="datevalid"
                :lazy-validation="lazy"
              >
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="pb-0">
                    <CustomDate
                      v-model="eventData.StartDate"
                      :label="$t('Common.StartD')"
                      :field="startDateField"
                      :rules="startDateRule"
                      :on-change="changeStartDate"
                      type="datetime"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="pb-0">
                    <CustomDate
                      v-model="eventData.EndDate"
                      :label="$t('Common.EndD')"
                      :field="endDateField"
                      :rules="endDateRule"
                      :on-change="changeEndDate"
                      type="datetime"
                    />
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
                </v-row>
              </v-form>
              <v-row>
                <v-col cols="12" class="pb-4 pt-2">
                  <RichText
                    v-model="eventData.Description"
                    class="mb-3"
                    :label="$t('Common.Description')"
                  ></RichText>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="eventData.UniqLink"
                    :label="$t('Common.EventL')"
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

          <v-tab-item :value="'2'">
            <v-card flat>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="pl-0 pt-0 pb-0">
                  <v-col class="pb-0">
                    <v-select
                      v-model="eventData.LocationType"
                      :items="locationTypeLookupOptions"
                      label="Location Type*"
                      required
                      outlined
                      dense
                      class="v-tickettype"
                      @change="changeLocation($event)"
                    ></v-select>
                  </v-col>
                  <v-form
                    ref="webinarLinkForm"
                    v-model="datevalid"
                    :lazy-validation="lazy"
                  >
                    <v-col v-if="isOnlineEvent" cols="12" class="pb-0">
                      <v-text-field
                        v-model="eventData.WebinarLink"
                        :rules="
                          eventData.LocationType === 'Online event' &&
                          onlineEventLink
                        "
                        :label="$t('Common.OnlineEventLink')"
                        outlined
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                  </v-form>
                  <v-col v-if="isOnlineEvent" cols="12" class="pb-0">
                    <v-textarea
                      v-model="eventData.JoiningInstruction"
                      :label="$t('Common.AdditionalOnlineEvent')"
                      outlined
                      required
                      dense
                    ></v-textarea>
                  </v-col>
                  <v-col v-if="isBitpodVirtual" cols="12" class="pb-0">
                    <v-text-field
                      :label="$t('Common.BitpodVirtualLink')"
                      outlined
                      dense
                      disabled
                      :value="getBitpodVirtualLink()"
                    ></v-text-field>
                  </v-col>

                  <v-col v-if="isVenue" cols="12" class="pb-6 positionRelative">
                    <no-ssr>
                      <vue-google-autocomplete
                        id="map"
                        ref="venueAddress.AddressLine"
                        v-model="venueAddress.AddressLine"
                        class="form-control pa-3 d-block rounded"
                        :placeholder="$t('Common.Address')"
                        :required="true"
                        @placechanged="getAddressData"
                        @focus="removeSearchAddress"
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
                      :label="$t('Common.VenueName')"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.City"
                      :label="$t('Common.City')"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.State"
                      :label="$t('Common.State')"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.Country"
                      :label="$t('Common.Country')"
                      outlined
                      dense
                      @change="changeAddress()"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.PostalCode"
                      :label="$t('Common.ZipCode')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pb-0">
                  <v-col
                    v-if="isMap && locations[0] && locations[0].lat"
                    class="pa-0"
                  >
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
                  <v-col v-else class="pa-0">
                    <v-flex class="grey lighten-2 map-contain"></v-flex>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>

          <v-tab-item :value="'3'">
            <v-card v-if="isTicket" flat>
              <p>
                <i18n path="Common.SetupEventTickets" />
              </p>
              <v-btn
                class="ma-2 ml-0 mb-3"
                outlined
                color="indigo"
                @click="addTicketRow"
                ><i18n path="Common.AddTickets"
              /></v-btn>
              <v-simple-table class="event-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left pl-0">
                        <i18n path="Common.Title" />
                      </th>
                      <th class="text-left pl-2">
                        <i18n path="Common.Type" />
                      </th>
                      <th class="text-left pl-2">
                        {{
                          $t('Common.Price', { currency: eventData.Currency })
                        }}
                      </th>
                      <th class="text-left pl-2">
                        <i18n path="Common.StartD" />
                      </th>
                      <th class="text-left pl-2">
                        <i18n path="Common.EndD" />
                      </th>
                      <th class="text-left pl-2">
                        <i18n path="Common.Quantity" />
                      </th>
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
                          :on-change="changeTicketType(k)"
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
                        <CustomDate
                          v-model="ticket.StartDate"
                          :label="$t('Common.StartD')"
                          :field="ticketStartDateField"
                          :rules="ticketStartDateRule(k)"
                          :on-change="changeTicketStartDate"
                          type="datetime"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <CustomDate
                          v-model="ticket.EndDate"
                          :label="$t('Common.EndD')"
                          :field="ticketEndDateField"
                          :rules="ticketEndDateRule(k)"
                          :on-change="changeTicketEndDate"
                          type="datetime"
                        />
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
                          <v-icon>fa-trash</v-icon>
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
                    ><i18n path="Common.EventHasBeenCreated"
                  /></span>
                </div>
                <div class="pb-3 text--primary">
                  <i18n path="Common.EventGoers" />
                  <br />
                  <i18n path="Common.EventsLink" />
                </div>
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon
                    ><i18n path="Drawer.View"
                  /></v-btn>
                  <v-btn
                    outlined
                    color="primary"
                    class="ma-1"
                    @click="eventPublish"
                  >
                    <v-icon left>mdi-rotate-315 mdi-send</v-icon>
                    <i18n path="Drawer.Publish"
                  /></v-btn>
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    ><i18n path="Drawer.Close"
                  /></v-btn>
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
                    <i18n path="Common.EventHasBeenPublished"
                  /></span>
                </div>
                <i18n
                  path="Common.NowOpenForRegistrations"
                  class="pb-2 text--primary"
                />
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon
                    ><i18n path="Drawer.View"
                  /></v-btn>
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    ><i18n path="Drawer.Close"
                  /></v-btn>
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
          v-if="currentTab > 1 && !isEventCreate && !isEventPublish"
          depressed
          color="grey lighten-2"
          @click="prev()"
          ><i18n path="Drawer.Prev"
        /></v-btn>
        <v-btn
          v-if="currentTab < 3"
          depressed
          color="primary"
          :disabled="isNextDisabled()"
          @click="next()"
          ><i18n path="Drawer.Next"
        /></v-btn>
        <v-btn
          v-if="currentTab > 2 && !isEventCreate && !isEventPublish"
          depressed
          color="primary"
          :disabled="isSaveButtonDisabled || !valid || !datevalid"
          @click="saveRecord"
          ><i18n path="Drawer.Save"
        /></v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import { zonedTimeToUtc } from 'date-fns-tz'
import gql from 'graphql-tag'
import CustomDate from '~/components/common/form/date.vue'
import Lookup from '~/components/common/form/lookup.vue'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import Timezone from '~/components/common/form/timezone'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import orgInfoLocationType from '~/config/apps/event/gql/orgInfoLocationType.gql'
import { formatGQLResult } from '~/utility/gql.js'
import nuxtconfig from '~/nuxt.config'
import { required, onlineEventLink } from '~/utility/rules.js'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Lookup,
    Timezone,
    CustomDate,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: {
      type: Function,
      default: () => null,
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    const currentDatetime = new Date(new Date().setSeconds(0))
    return {
      valid: true,
      onlineEventLink: [onlineEventLink],
      datevalid: true,
      lazy: false,
      tabs: null,
      loading: false,
      isUniqLinkValid: false,
      currentTab: 1,
      isSaveButtonDisabled: false,
      addresslineMessage: '',
      isTicket: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [required],
      isMap: false,
      locationTypeOptions: [],
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
        LatLng: {
          lat: 0.0,
          lng: 0.0,
        },
      },
      datetime: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      drawer: true,
      isVenue: true,
      isOnlineEvent: false,
      isBitpodVirtual: false,

      isInvalidEventLink: false,
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
          EndDate: addDays(addMonths(new Date(), 1), 4),
          TicketCount: 100,
        },
      ],
    }
  },
  computed: {
    locationTypeLookupOptions() {
      const items = []
      this.locationTypeOptions.forEach(function (option) {
        items.push(option.key)
      })
      return items
    },
    startDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date*',
        type: 'datetime',
      }
    },
    endDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date*',
        type: 'datetime',
      }
    },
    ticketStartDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date*',
        type: 'datetime',
      }
    },
    ticketEndDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date*',
        type: 'datetime',
      }
    },
    startDateRule() {
      return [
        (v) => {
          const StartDate = v && new Date(v)
          const { EndDate } = this.eventData
          let startDateMessage = ''
          if (!StartDate)
            startDateMessage = this.$t('Messages.Error.ThisFieldRequired')
          else if (StartDate && EndDate && StartDate > EndDate)
            startDateMessage = this.$t('Messages.Error.EventStartEndDate')
          else if (StartDate < new Date())
            startDateMessage = this.$t('Messages.Error.EventStartDate')
          else startDateMessage = ''
          return startDateMessage || true
        },
      ]
    },
    endDateRule() {
      return [
        (v) => {
          const EndDate = v && new Date(v)
          const { StartDate } = this.eventData
          let endDateMessage = ''
          if (!EndDate)
            endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
          else if (StartDate && EndDate && StartDate > EndDate)
            endDateMessage = this.$t('Messages.Error.EventStartEndDate')
          else if (EndDate < new Date())
            endDateMessage = this.$t('Messages.Error.EventEndDate')
          else endDateMessage = ''
          return endDateMessage || true
        },
      ]
    },

    eventLinkHint() {
      return `${nuxtconfig.integrationLinks.EVENT_LINK_HINT}${this.eventData.UniqLink}`
    },
    gMapCenter() {
      return {
        lat: (this.locations[0] && this.locations[0].lat) || 0.0,
        lng: (this.locations[0] && this.locations[0].lng) || 0.0,
      }
    },
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInvalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
  },

  watch: {
    resetData() {
      if (this.$refs && this.$refs['venueAddress.AddressLine'].$data) {
        this.$refs['venueAddress.AddressLine'].$data.autocompleteText = ''
      }
      const event = this.eventDefaultData()
      this.eventData = event
      this.tickets = []
      const ticket = this.ticketDefaultData()
      this.tickets = [ticket]
    },
  },

  methods: {
    getBitpodVirtualLink() {
      return `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}/${
        this.eventLinkHint.split('/')[4]
      }`
    },
    calculateTicketEndDate() {
      const endDate = this.eventData.EndDate
      if (endDate) {
        this.tickets.forEach(function (ticket) {
          ticket.EndDate = endDate
        })
      }
    },
    changeStartDate() {
      this.$refs.dateform && this.$refs.dateform.validate()
    },
    changeEndDate(value) {
      this.$refs.dateform && this.$refs.dateform.validate()
      this.calculateTicketEndDate()
    },
    changeTicketStartDate() {
      this.$refs.form && this.$refs.form.validate()
    },
    changeTicketEndDate() {
      this.$refs.form && this.$refs.form.validate()
    },
    isNextDisabled() {
      return this.isUniqLinkValid === false
    },
    selectTab(tabNumber) {
      this.currentTab = tabNumber
      this.scrollToTop()
      if (tabNumber === 1) {
        this.resetLocation()
      }
    },
    close() {
      this.onFormClose()
      this.tabs = '1'
      this.resetForm()
    },
    closeForm() {
      this.onFormClose()
      this.tabs = '1'
      this.$router.push(this.localePath('/apps/event/event/' + this.eventId))
      this.$refs.form.reset()
      this.resetForm()
    },

    buildMutationUpsertQuery(modelName) {
      return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
    },
    viewRegistration() {
      const baseUrl = this.$bitpod.getApiUrl()
      const regUrl = baseUrl.replace('svc/api', 'e')
      window.open(`${regUrl}${this.eventData.UniqLink}`, '_blank')
    },
    resetForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.isEventCreate = false
        this.isEventPublish = false
        this.isSaveButtonDisabled = false
        this.isTicket = true
        this.isMap = false
        this.valid = false
        this.currentTab = 1
      }, 3000)
    },
    eventDefaultData() {
      return {
        StartDate: addMonths(new Date(), 1),
        EndDate: addDays(addMonths(new Date(), 1), 4),
        Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        LocationType: 'Venue',
        BusinessType: 'Single',
        Privacy: 'Public',
        Status: 'Not ready',
      }
    },
    ticketDefaultData() {
      return {
        TicketId: 0,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: new Date(),
        EndDate: addDays(addMonths(new Date(), 1), 3),
        TicketCount: 100,
      }
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
    changeTicketType(index) {
      if (this.tickets[index].Type === 'Free') {
        this.tickets[index].Amount = 0
      }
    },
    isPriceDisabled(index) {
      return this.tickets[index].Type === 'Free'
    },
    deleteTicket(index) {
      if (this.tickets.length > 1) {
        this.tickets.splice(index, 1)
      } else {
        const ticket = this.resetTicket()
        this.tickets = [ticket]
      }
    },
    resetTicket() {
      return {
        TicketId: 0,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: new Date(),
        EndDate: this.eventData.EndDate,
        TicketCount: 100,
      }
    },
    ticketStartDateRule(index) {
      return [
        (v) => {
          if (this.tickets[index]) {
            const StartDate = v && new Date(v)
            const { EndDate } = this.tickets[index]
            let startDateMessage = ''
            if (!StartDate && this.tickets[index].StartDate === null)
              startDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (StartDate && EndDate && StartDate > EndDate)
              startDateMessage = this.$t('Messages.Error.TicketStartDate')
            else if (
              StartDate &&
              new Date(StartDate.setSeconds(1)) < this.currentDatetime
            ) {
              startDateMessage = this.$t(
                'Messages.Error.TicketStartCurrentDate'
              )
            } else startDateMessage = ''
            return startDateMessage || true
          } else {
            return true
          }
        },
      ]
    },
    ticketEndDateRule(index) {
      return [
        (v) => {
          if (this.tickets[index]) {
            const EndDate = v && new Date(v)
            const { StartDate } = this.tickets[index]
            let endDateMessage = ''

            if (!EndDate && this.tickets[index].EndDate === null)
              endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (StartDate && EndDate && StartDate > EndDate)
              endDateMessage = this.$t('Messages.Error.TicketStartDate')
            else if (new Date(EndDate) < this.currentDatetime) {
              endDateMessage = this.$t('Messages.Error.TicketEndCurrentDate')
            } else if (new Date(EndDate) > this.eventData.EndDate) {
              endDateMessage = this.$t('Messages.Error.TicketEndDate')
            } else endDateMessage = ''
            return endDateMessage || true
          } else {
            return true
          }
        },
      ]
    },
    returnToCenter() {
      if (this.locations && this.locations[0]) {
        this.$refs.gMap && this.$refs.gMap.map.setCenter(this.locations[0])
      }
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
        this.isInvalidEventLink === false
      )
    },
    validTab2() {
      const { LocationType, WebinarLink } = this.eventData
      if (
        (LocationType === 'Venue' &&
          this.venueAddress &&
          this.venueAddress.AddressLine !== '') ||
        (LocationType === 'Online event' &&
          WebinarLink &&
          WebinarLink !== '' &&
          WebinarLink.startsWith('https://') &&
          WebinarLink !== undefined) ||
        LocationType === 'Bitpod Virtual'
      ) {
        return true
      } else {
        return false
      }
    },
    resetLocation() {
      if (
        this.eventData.WebinarLink === '' ||
        this.eventData.WebinarLink === undefined
      ) {
        this.$refs.webinarLinkForm.reset()
      }
    },
    prev(value) {
      this.currentTab = parseInt(this.tabs) - 1
      this.tabs = `${this.currentTab}`
      this.scrollToTop()
      this.resetLocation()
    },
    setNextTab() {
      this.currentTab = parseInt(this.tabs) + 1
      this.tabs = `${this.currentTab}`
      this.scrollToTop()
    },
    scrollToTop() {
      document.getElementsByClassName('event-inner')[0].scrollTop = 0
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
        this.isInvalidEventLink === false
      ) {
        this.setNextTab()
      } else if (this.currentTab === 2) {
        this.$refs.webinarLinkForm.validate()
        if (
          (LocationType === 'Venue' && this.venueAddress.AddressLine !== '') ||
          (LocationType === 'Online event' &&
            WebinarLink &&
            WebinarLink !== '' &&
            WebinarLink.startsWith('https://')) ||
          LocationType === 'Bitpod Virtual'
        ) {
          this.addresslineMessage = ''
          this.setNextTab()
        } else if (this.venueAddress.AddressLine === '') {
          this.addresslineMessage = this.$t('Messages.Error.ThisFieldRequired')
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
    setLoationType() {
      if (
        this.venueAddress.AddressLine !== '' &&
        this.eventData.LocationType === 'Venue'
      ) {
        this.eventData._VenueAddress = this.venueAddress
      }
      if (this.eventData.LocationType !== 'Online event') {
        this.eventData.JoiningInstruction = ''
        this.eventData.WebinarLink = ''
      }
    },
    getUtcToZonedDateTime(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = zonedTimeToUtc(formattedDate, timezone)
        return zonedDate
      }
    },
    async saveRecord() {
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
        this.setLoationType()
        const eventInfo = JSON.parse(JSON.stringify(this.eventData))
        eventInfo.StartDate = this.getUtcToZonedDateTime(
          eventInfo.StartDate,
          eventInfo.Timezone
        )
        eventInfo.EndDate = this.getUtcToZonedDateTime(
          eventInfo.EndDate,
          eventInfo.Timezone
        )
        eventInfo.EventManager = this.$auth.$state.user.data.email
        eventInfo.Organizer = this.$auth.$state.user.data.name

        const baseUrl = this.$bitpod.getApiUrl()
        let res = null
        let ticketRes = null
        res = await this.$axios
          .$post(`${baseUrl}Events`, {
            ...eventInfo,
          })
          .catch((e) => {
            console.error(
              `Error in Save function of new single event form, context: create event , baseUrl: ${baseUrl} eventData: ${this.eventData}  error: ${e}`
            )
          })
        if (res) {
          this.eventId = res.id
          const ticketList = []

          this.tickets.forEach(function (ticket) {
            ticket.Events = res.id
            ticket.Amount = parseInt(ticket.Amount)
            ticket.TicketCount = parseInt(ticket.TicketCount)
            ticket.AvailableCount = parseInt(ticket.TicketCount)
            ticketList.push(ticket)
          })

          ticketRes = await this.$axios
            .$post(`${baseUrl}Tickets`, ticketList)
            .catch((e) => {
              console.error(
                `Error in Save function of new single event form, context: create ticket , eventId: ${this.eventId},  baseUrl: ${baseUrl} ticketList: ${this.ticketList} error: ${e}`
              )
            })
          if (ticketRes) {
            this.isTicket = false
            this.isEventCreate = true
            return ticketRes
          }
        }
      }
    },
    removeSearchAddress() {
      setTimeout(() => {
        Object.values(
          document.getElementsByClassName('pac-container pac-logo')
        ).map((i) => {
          i.style.display = 'none'
        })
      }, 1000)
    },
    isEmptyAddress() {
      const { City, State, Country, PostalCode } = this.venueAddress
      const VenueName = this.eventData.VenueName
      const AddressLine = this.$refs['venueAddress.AddressLine'].$data
        .autocompleteText
      if (
        (AddressLine === '' || AddressLine !== '') &&
        VenueName === '' &&
        City === '' &&
        State === '' &&
        Country === '' &&
        PostalCode === ''
      ) {
        this.venueAddress.LatLng.lat = 0
        this.venueAddress.LatLng.lng = 0
        return false
      } else {
        return true
      }
    },
    changeAddressData(value) {
      this.removeSearchAddress()
      this.addresslineMessage =
        value === '' ? this.$t('Messages.Error.ThisFieldRequired') : ''
      this.venueAddress.AddressLine = value
      this.isMap = this.isEmptyAddress()
    },
    changeAddress() {
      this.removeSearchAddress()
      const { City, State, Country, PostalCode } = this.venueAddress
      const VenueName = this.eventData.VenueName
      const AddressLine = this.$refs['venueAddress.AddressLine'].$data
        .autocompleteText
      this.isMap = this.isEmptyAddress()
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
            const latlng = { lat: 0.0, lng: 0.0 }
            latlng.lat =
              res.data.results.length > 0
                ? res.data.results[0].geometry.location.lat
                : 0.0
            latlng.lng =
              res.data.results.length > 0
                ? res.data.results[0].geometry.location.lng
                : 0.0
            this.venueAddress.LatLng.lat = latlng.lat || 0.0
            this.venueAddress.LatLng.lng = latlng.lng || 0.0

            this.locations = [latlng]
            this.isMap = true
            this.returnToCenter()
            return res
          })
          .catch((e) => {
            console.error(
              `Error in changeAddress function of new single event form when place search address and updating location on map, context: place search address, addressObj: ${addressObj} key: ${key} baseUrl: ${nuxtconfig.generalConfig.googleMapGeocodeApi}?address=${addressObj}&key=${key}, error: ${e}`
            )
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

      this.locations = [latlng]
      this.isMap = true
      this.returnToCenter()
    },
    changeEventName(event) {
      this.verifyUniqueLink(event.currentTarget.value)
    },
    changeUniqueLink(event) {
      this.verifyUniqueLink(event.currentTarget.value)
    },
    verifyUniqueLink(value) {
      this.isUniqLinkValid = false
      value = value.toLowerCase().replace(/\s/g, '')
      value = value.trim()
      const regex = RegExp(/^[0-9a-zA-Z]+$/)
      if (regex.test(value)) {
        if (isNaN(value)) {
          this.eventData.UniqLink = value
          this.checkUniqueLink(this.eventData.UniqLink)
        }
      } else {
        this.isInvalidEventLink = true
        this.uniqueLinkMessage = this.$t('Messages.Warn.UniqueLinkFormat')
      }
      this.eventData.UniqLink = value
    },
    async checkUniqueLink(value) {
      this.isUniqLinkValid = true
      const where = { UniqLink: value }
      const result = await this.$apollo.query({
        query: gql`
          ${eventCount}
        `,
        variables: {
          where,
        },
        fetchPolicy: 'no-cache',
      })
      if (result.data.Event.EventCount > 0) {
        this.isUniqLinkValid = false
        this.isInvalidEventLink = true
        this.uniqueLinkMessage = this.$t('Messages.Error.UniqueLinkDuplicate')
      } else {
        this.isInvalidEventLink = false
        this.isUniqLinkValid = true
      }
    },
    changeLocation(value) {
      debugger
      this.addresslineMessage = ''
      if (value === 'Venue') {
        this.isVenue = true
        this.isOnlineEvent = false
        this.isBitpodVirtual = false
        this.isMap = false
        this.isBitpodVirtual = false
        this.venueAddress.AddressLine = ''
        this.eventData.VenueName = ''
        this.venueAddress.City = ''
        this.venueAddress.State = ''
        this.venueAddress.Country = ''
        this.venueAddress.PostalCode = ''
      }
      if (value === 'Online event') {
        this.isVenue = false
        this.isOnlineEvent = true
        this.isMap = false
        this.isBitpodVirtual = false
        this.eventData.WebinarLink = ''
        this.eventData.JoiningInstruction = ''
      }
      if (value === 'Bitpod Virtual') {
        this.isVenue = false
        this.isOnlineEvent = false
        this.isMap = false
        this.isBitpodVirtual = true
      }
    },
    addTicketRow() {
      this.tickets.push({
        TicketId: this.tickets.length + 1,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: new Date(),
        EndDate: this.eventData.EndDate,
        TicketCount: 100,
      })
    },
  },

  apollo: {
    data: {
      query() {
        return gql`
          ${orgInfoLocationType}
        `
      },
      variables() {
        return {
          filters: {
            where: {},
          },
          locationTypeFilters: {
            where: {
              type: 'EventLocationType',
            },
          },
        }
      },
      update(data) {
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
        this.locationTypeOptions = formatGQLResult(data, 'GeneralConfiguration')
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
  min-height: 410px;
}
.map-contain {
  height: 400px;
  max-height: 400px;
}
</style>

<template>
  <div>
    <v-toolbar dark app color="accent">
      <v-toolbar-title>New Event</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="onFormClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-stepper v-model="e1">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="e1 > 1" step="1">Basic Info</v-stepper-step>

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
              your event, add details that highlights why someone should attend
              it.
            </p>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="eventData.Title"
                  label="Event Name*"
                  required
                  outlined
                  @change="changeEventName($event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-datetime-picker
                  v-model="eventData.StartDate"
                  label="Start Date"
                  :text-field-props="textFieldProps"
                >
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-datetime-picker
                  v-model="eventData.EndDate"
                  label="End Date"
                  :text-field-props="textFieldProps"
                >
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="eventData.Timezone"
                  :items="timezonelist"
                  label="Timezone*"
                  item-text="label"
                  item-value="tzCode"
                  value="Asia/Calcutta"
                  required
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="eventData.Description"
                  clearable
                  outlined
                  clear-icon="fa fa-close"
                  label="Description"
                  value=""
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="eventData.UniqLink"
                  label="Event Link*"
                  hint="https://bitpod-event.test.bitpod.io/e/"
                  persistent-hint
                  outlined
                  required
                  :error-messages="uniqueLinkValidationMsg"
                  @change="changeUniqueLink($event)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card flat>
            <v-col cols="12" sm="6" md="6">
              <v-select
                value="Venue"
                :items="['Online Event', 'Venue']"
                label="Location Type"
                required
                outlined
                @change="changeLocation($event)"
              ></v-select>
            </v-col>
            <v-col v-if="isOnlineEvent" cols="12" sm="6" md="6">
              <v-text-field
                v-model="webinarLink"
                label="Online Event Link"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col v-if="isOnlineEvent" cols="12" sm="6" md="6">
              <v-text-field
                v-model="joiningInstruction"
                label="Additional online event joining instructions, URL, phone etc."
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <!-- <v-text-field label="Address" outlined required></v-text-field> -->
              <no-ssr>
                <vue-google-autocomplete
                  id="map"
                  ref="venueAddress.AddressLine"
                  classname="form-control"
                  placeholder="Address"
                  @placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </no-ssr>
            </v-col>
            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <v-text-field
                v-model="eventData.VenueName"
                label="Venue Name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <v-text-field
                v-model="venueAddress.City"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <v-text-field
                v-model="venueAddress.State"
                label="State"
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <v-text-field
                v-model="venueAddress.Country"
                label="Country"
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="isVenue" cols="12" sm="6" md="6">
              <v-text-field
                v-model="venueAddress.PostalCode"
                label="Zip Code"
                outlined
              ></v-text-field>
            </v-col>
          </v-card>

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card flat>
            <p>
              Setup event tickets and price, you can also set tickets validity
              so early birds can be offered better pricing.
            </p>
            <v-btn class="ma-2" outlined color="indigo" @click="addNewRow1"
              >Add Tickets</v-btn
            >
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Start Date</th>
                    <th class="text-left">End Date</th>
                    <th class="text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ticket, k) in tickets" :key="k">
                    <td class="pa-2 pb-0">
                      <v-text-field
                        v-model="ticket.Code"
                        label="Title"
                        outlined
                      ></v-text-field>
                    </td>
                    <td class="pa-2 pb-0">
                      <v-select
                        v-model="ticket.Type"
                        :items="['Free', 'Paid', 'Donation']"
                        label="Type"
                        outlined
                      ></v-select>
                    </td>
                    <td class="pa-2 pb-0">
                      <v-text-field
                        v-model="ticket.Amount"
                        label="price"
                        outlined
                        value=""
                      ></v-text-field>
                    </td>
                    <td class="pa-2 pb-0">
                      <v-datetime-picker
                        v-model="ticket.StartDate"
                        label="Start Date"
                        :text-field-props="textFieldProps"
                      >
                      </v-datetime-picker>
                    </td>
                    <td class="pa-2 pb-0">
                      <v-datetime-picker
                        v-model="ticket.EndDate"
                        label="End Date"
                        :text-field-props="textFieldProps"
                      >
                      </v-datetime-picker>
                    </td>
                    <td class="pa-2 pb-0">
                      <v-text-field
                        v-model="ticket.TicketCount"
                        label="quantity"
                        outlined
                        value=""
                      ></v-text-field>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <v-btn color="primary" @click="e1 = 1">Back</v-btn>
          <v-btn color="primary" @click="saveRecord">Save</v-btn>
          <!-- <v-btn color="primary" @click="dialog1 = false">Save</v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
// import addMonths from 'date-fns/addMonths'
// import addDays from 'date-fns/addDays'
import gql from 'graphql-tag'
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
// import Vue from 'vue'
// import DatetimePicker from 'vuetify-datetime-picker/dist'
// import CustomDate from '~/components/common/form/date.vue'
// import 'vuetify-datetime-picker/src/stylus/main.styl'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
// Vue.use(DatetimePicker)
export default {
  components: {
    //   CustomDate,
    //   // DatetimePicker,
    // VueGoogleAutocomplete,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: Function,
  },
  data: () => ({
    textFieldProps: {
      appendIcon: 'fa-calendar',
      outlined: true,
    },
    eventData: {
      Title: '',
      StartDate: '',
      EndDate: '',
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      Description: '',
      UniqLink: '',
      onlineEventLink: '',
      joiningInstruction: '',
      webinarLink: '',
      BusinessType: 'Single',
      EventManager: 'kapil@bitpod.io',
      Organizer: 'Kapil Chothe',
      Privacy: 'Public',
      Currency: 'INR',
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
    // startDate: addMonths(new Date(), 1).toISOString(),
    // endDate: addDays(addMonths(new Date(), 1), 4).toISOString().substr(0, 10),
    // ticketStartDate: new Date().toISOString().substr(0, 10),
    // ticketEndDate: addDays(addMonths(new Date(), 1), -1)
    //   .toISOString()
    //   .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    drawer: true,
    isVenue: true,
    isOnlineEvent: false,

    isInalidEventLink: false,
    // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currenttimezone: '(GMT+05:30) India Standard Time',
    // uniqueLinkValidationMsg: 'This link has already been taken',
    tickets: [
      {
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: 0,
        EndDate: 0,
        TicketCount: 100,
      },
    ],
  }),
  computed: {
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink
        ? 'This link has already been taken'
        : ''
      return errorMessage
    },
    timezonelist() {
      return [
        {
          offset: '+05:30',
          label: '(GMT+05:30) India Standard Time',
          tzCode: 'Asia/Calcutta',
        },
        { offset: '-11:00', label: '(GMT-11:00) Niue', tzCode: 'Pacific/Niue' },
        {
          offset: '-11:00',
          label: '(GMT-11:00) Pago Pago',
          tzCode: 'Pacific/Pago_Pago',
        },
        {
          offset: '-10:00',
          label: '(GMT-10:00) Hawaii Time',
          tzCode: 'Pacific/Honolulu',
        },
        {
          offset: '-10:00',
          label: '(GMT-10:00) Rarotonga',
          tzCode: 'Pacific/Rarotonga',
        },
        {
          offset: '-10:00',
          label: '(GMT-10:00) Tahiti',
          tzCode: 'Pacific/Tahiti',
        },
        {
          offset: '-09:30',
          label: '(GMT-09:30) Marquesas',
          tzCode: 'Pacific/Marquesas',
        },
        {
          offset: '-09:00',
          label: '(GMT-09:00) Alaska Time',
          tzCode: 'America/Anchorage',
        },
        {
          offset: '-09:00',
          label: '(GMT-09:00) Gambier',
          tzCode: 'Pacific/Gambier',
        },
        {
          offset: '-08:00',
          label: '(GMT-08:00) Pacific Time',
          tzCode: 'America/Los_Angeles',
        },
        {
          offset: '-08:00',
          label: '(GMT-08:00) Pacific Time - Tijuana',
          tzCode: 'America/Tijuana',
        },
        {
          offset: '-08:00',
          label: '(GMT-08:00) Pacific Time - Vancouver',
          tzCode: 'America/Vancouver',
        },
        {
          offset: '-08:00',
          label: '(GMT-08:00) Pacific Time - Whitehorse',
          tzCode: 'America/Whitehorse',
        },
        {
          offset: '-08:00',
          label: '(GMT-08:00) Pitcairn',
          tzCode: 'Pacific/Pitcairn',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time',
          tzCode: 'America/Denver',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Arizona',
          tzCode: 'America/Phoenix',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Chihuahua, Mazatlan',
          tzCode: 'America/Mazatlan',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Dawson Creek',
          tzCode: 'America/Dawson_Creek',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Edmonton',
          tzCode: 'America/Edmonton',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Hermosillo',
          tzCode: 'America/Hermosillo',
        },
        {
          offset: '-07:00',
          label: '(GMT-07:00) Mountain Time - Yellowknife',
          tzCode: 'America/Yellowknife',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Belize',
          tzCode: 'America/Belize',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Central Time',
          tzCode: 'America/Chicago',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Central Time - Mexico City',
          tzCode: 'America/Mexico_City',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Central Time - Regina',
          tzCode: 'America/Regina',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Central Time - Tegucigalpa',
          tzCode: 'America/Tegucigalpa',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Central Time - Winnipeg',
          tzCode: 'America/Winnipeg',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Costa Rica',
          tzCode: 'America/Costa_Rica',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) El Salvador',
          tzCode: 'America/El_Salvador',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Galapagos',
          tzCode: 'Pacific/Galapagos',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Guatemala',
          tzCode: 'America/Guatemala',
        },
        {
          offset: '-06:00',
          label: '(GMT-06:00) Managua',
          tzCode: 'America/Managua',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) America Cancun',
          tzCode: 'America/Cancun',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Bogota',
          tzCode: 'America/Bogota',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Easter Island',
          tzCode: 'Pacific/Easter',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Eastern Time',
          tzCode: 'America/New_York',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Eastern Time - Iqaluit',
          tzCode: 'America/Iqaluit',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Eastern Time - Toronto',
          tzCode: 'America/Toronto',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Guayaquil',
          tzCode: 'America/Guayaquil',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Havana',
          tzCode: 'America/Havana',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Jamaica',
          tzCode: 'America/Jamaica',
        },
        { offset: '-05:00', label: '(GMT-05:00) Lima', tzCode: 'America/Lima' },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Nassau',
          tzCode: 'America/Nassau',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Panama',
          tzCode: 'America/Panama',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Port-au-Prince',
          tzCode: 'America/Port-au-Prince',
        },
        {
          offset: '-05:00',
          label: '(GMT-05:00) Rio Branco',
          tzCode: 'America/Rio_Branco',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Atlantic Time - Halifax',
          tzCode: 'America/Halifax',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Barbados',
          tzCode: 'America/Barbados',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Bermuda',
          tzCode: 'Atlantic/Bermuda',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Boa Vista',
          tzCode: 'America/Boa_Vista',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Caracas',
          tzCode: 'America/Caracas',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Curacao',
          tzCode: 'America/Curacao',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Grand Turk',
          tzCode: 'America/Grand_Turk',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Guyana',
          tzCode: 'America/Guyana',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) La Paz',
          tzCode: 'America/La_Paz',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Manaus',
          tzCode: 'America/Manaus',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Martinique',
          tzCode: 'America/Martinique',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Port of Spain',
          tzCode: 'America/Port_of_Spain',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Porto Velho',
          tzCode: 'America/Porto_Velho',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Puerto Rico',
          tzCode: 'America/Puerto_Rico',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Santo Domingo',
          tzCode: 'America/Santo_Domingo',
        },
        {
          offset: '-04:00',
          label: '(GMT-04:00) Thule',
          tzCode: 'America/Thule',
        },
        {
          offset: '-03:30',
          label: '(GMT-03:30) Newfoundland Time - St. Johns',
          tzCode: 'America/St_Johns',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Araguaina',
          tzCode: 'America/Araguaina',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Asuncion',
          tzCode: 'America/Asuncion',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Belem',
          tzCode: 'America/Belem',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Buenos Aires',
          tzCode: 'America/Argentina/Buenos_Aires',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Campo Grande',
          tzCode: 'America/Campo_Grande',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Cayenne',
          tzCode: 'America/Cayenne',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Cuiaba',
          tzCode: 'America/Cuiaba',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Fortaleza',
          tzCode: 'America/Fortaleza',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Godthab',
          tzCode: 'America/Godthab',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Maceio',
          tzCode: 'America/Maceio',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Miquelon',
          tzCode: 'America/Miquelon',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Montevideo',
          tzCode: 'America/Montevideo',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Palmer',
          tzCode: 'Antarctica/Palmer',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Paramaribo',
          tzCode: 'America/Paramaribo',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Punta Arenas',
          tzCode: 'America/Punta_Arenas',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Recife',
          tzCode: 'America/Recife',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Rothera',
          tzCode: 'Antarctica/Rothera',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Salvador',
          tzCode: 'America/Bahia',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Santiago',
          tzCode: 'America/Santiago',
        },
        {
          offset: '-03:00',
          label: '(GMT-03:00) Stanley',
          tzCode: 'Atlantic/Stanley',
        },
        {
          offset: '-02:00',
          label: '(GMT-02:00) Noronha',
          tzCode: 'America/Noronha',
        },
        {
          offset: '-02:00',
          label: '(GMT-02:00) Sao Paulo',
          tzCode: 'America/Sao_Paulo',
        },
        {
          offset: '-02:00',
          label: '(GMT-02:00) South Georgia',
          tzCode: 'Atlantic/South_Georgia',
        },
        {
          offset: '-01:00',
          label: '(GMT-01:00) Azores',
          tzCode: 'Atlantic/Azores',
        },
        {
          offset: '-01:00',
          label: '(GMT-01:00) Cape Verde',
          tzCode: 'Atlantic/Cape_Verde',
        },
        {
          offset: '-01:00',
          label: '(GMT-01:00) Scoresbysund',
          tzCode: 'America/Scoresbysund',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Abidjan',
          tzCode: 'Africa/Abidjan',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Accra',
          tzCode: 'Africa/Accra',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Bissau',
          tzCode: 'Africa/Bissau',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Canary Islands',
          tzCode: 'Atlantic/Canary',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Casablanca',
          tzCode: 'Africa/Casablanca',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Danmarkshavn',
          tzCode: 'America/Danmarkshavn',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Dublin',
          tzCode: 'Europe/Dublin',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) El Aaiun',
          tzCode: 'Africa/El_Aaiun',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Faeroe',
          tzCode: 'Atlantic/Faroe',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) GMT (no daylight saving)',
          tzCode: 'Etc/GMT',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Lisbon',
          tzCode: 'Europe/Lisbon',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) London',
          tzCode: 'Europe/London',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Monrovia',
          tzCode: 'Africa/Monrovia',
        },
        {
          offset: '+00:00',
          label: '(GMT+00:00) Reykjavik',
          tzCode: 'Atlantic/Reykjavik',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Algiers',
          tzCode: 'Africa/Algiers',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Amsterdam',
          tzCode: 'Europe/Amsterdam',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Andorra',
          tzCode: 'Europe/Andorra',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Berlin',
          tzCode: 'Europe/Berlin',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Brussels',
          tzCode: 'Europe/Brussels',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Budapest',
          tzCode: 'Europe/Budapest',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Central European Time - Belgrade',
          tzCode: 'Europe/Belgrade',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Central European Time - Prague',
          tzCode: 'Europe/Prague',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Ceuta',
          tzCode: 'Africa/Ceuta',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Copenhagen',
          tzCode: 'Europe/Copenhagen',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Gibraltar',
          tzCode: 'Europe/Gibraltar',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Lagos',
          tzCode: 'Africa/Lagos',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Luxembourg',
          tzCode: 'Europe/Luxembourg',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Madrid',
          tzCode: 'Europe/Madrid',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Malta',
          tzCode: 'Europe/Malta',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Monaco',
          tzCode: 'Europe/Monaco',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Ndjamena',
          tzCode: 'Africa/Ndjamena',
        },
        { offset: '+01:00', label: '(GMT+01:00) Oslo', tzCode: 'Europe/Oslo' },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Paris',
          tzCode: 'Europe/Paris',
        },
        { offset: '+01:00', label: '(GMT+01:00) Rome', tzCode: 'Europe/Rome' },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Stockholm',
          tzCode: 'Europe/Stockholm',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Tirane',
          tzCode: 'Europe/Tirane',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Tunis',
          tzCode: 'Africa/Tunis',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Vienna',
          tzCode: 'Europe/Vienna',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Warsaw',
          tzCode: 'Europe/Warsaw',
        },
        {
          offset: '+01:00',
          label: '(GMT+01:00) Zurich',
          tzCode: 'Europe/Zurich',
        },
        { offset: '+02:00', label: '(GMT+02:00) Amman', tzCode: 'Asia/Amman' },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Athens',
          tzCode: 'Europe/Athens',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Beirut',
          tzCode: 'Asia/Beirut',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Bucharest',
          tzCode: 'Europe/Bucharest',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Cairo',
          tzCode: 'Africa/Cairo',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Chisinau',
          tzCode: 'Europe/Chisinau',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Damascus',
          tzCode: 'Asia/Damascus',
        },
        { offset: '+02:00', label: '(GMT+02:00) Gaza', tzCode: 'Asia/Gaza' },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Helsinki',
          tzCode: 'Europe/Helsinki',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Jerusalem',
          tzCode: 'Asia/Jerusalem',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Johannesburg',
          tzCode: 'Africa/Johannesburg',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Khartoum',
          tzCode: 'Africa/Khartoum',
        },
        { offset: '+02:00', label: '(GMT+02:00) Kiev', tzCode: 'Europe/Kiev' },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Maputo',
          tzCode: 'Africa/Maputo',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Moscow-01 - Kaliningrad',
          tzCode: 'Europe/Kaliningrad',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Nicosia',
          tzCode: 'Asia/Nicosia',
        },
        { offset: '+02:00', label: '(GMT+02:00) Riga', tzCode: 'Europe/Riga' },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Sofia',
          tzCode: 'Europe/Sofia',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Tallinn',
          tzCode: 'Europe/Tallinn',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Tripoli',
          tzCode: 'Africa/Tripoli',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Vilnius',
          tzCode: 'Europe/Vilnius',
        },
        {
          offset: '+02:00',
          label: '(GMT+02:00) Windhoek',
          tzCode: 'Africa/Windhoek',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Baghdad',
          tzCode: 'Asia/Baghdad',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Istanbul',
          tzCode: 'Europe/Istanbul',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Minsk',
          tzCode: 'Europe/Minsk',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Moscow+00 - Moscow',
          tzCode: 'Europe/Moscow',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Nairobi',
          tzCode: 'Africa/Nairobi',
        },
        { offset: '+03:00', label: '(GMT+03:00) Qatar', tzCode: 'Asia/Qatar' },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Riyadh',
          tzCode: 'Asia/Riyadh',
        },
        {
          offset: '+03:00',
          label: '(GMT+03:00) Syowa',
          tzCode: 'Antarctica/Syowa',
        },
        {
          offset: '+03:30',
          label: '(GMT+03:30) Tehran',
          tzCode: 'Asia/Tehran',
        },
        { offset: '+04:00', label: '(GMT+04:00) Baku', tzCode: 'Asia/Baku' },
        { offset: '+04:00', label: '(GMT+04:00) Dubai', tzCode: 'Asia/Dubai' },
        { offset: '+04:00', label: '(GMT+04:00) Mahe', tzCode: 'Indian/Mahe' },
        {
          offset: '+04:00',
          label: '(GMT+04:00) Mauritius',
          tzCode: 'Indian/Mauritius',
        },
        {
          offset: '+04:00',
          label: '(GMT+04:00) Moscow+01 - Samara',
          tzCode: 'Europe/Samara',
        },
        {
          offset: '+04:00',
          label: '(GMT+04:00) Reunion',
          tzCode: 'Indian/Reunion',
        },
        {
          offset: '+04:00',
          label: '(GMT+04:00) Tbilisi',
          tzCode: 'Asia/Tbilisi',
        },
        {
          offset: '+04:00',
          label: '(GMT+04:00) Yerevan',
          tzCode: 'Asia/Yerevan',
        },
        { offset: '+04:30', label: '(GMT+04:30) Kabul', tzCode: 'Asia/Kabul' },
        { offset: '+05:00', label: '(GMT+05:00) Aqtau', tzCode: 'Asia/Aqtau' },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Aqtobe',
          tzCode: 'Asia/Aqtobe',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Ashgabat',
          tzCode: 'Asia/Ashgabat',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Dushanbe',
          tzCode: 'Asia/Dushanbe',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Karachi',
          tzCode: 'Asia/Karachi',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Kerguelen',
          tzCode: 'Indian/Kerguelen',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Maldives',
          tzCode: 'Indian/Maldives',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Mawson',
          tzCode: 'Antarctica/Mawson',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Moscow+02 - Yekaterinburg',
          tzCode: 'Asia/Yekaterinburg',
        },
        {
          offset: '+05:00',
          label: '(GMT+05:00) Tashkent',
          tzCode: 'Asia/Tashkent',
        },
        {
          offset: '+05:30',
          label: '(GMT+05:30) Colombo',
          tzCode: 'Asia/Colombo',
        },
        {
          offset: '+05:30',
          label: '(GMT+05:30) India Standard Time',
          tzCode: 'Asia/Calcutta',
        },
        {
          offset: '+05:45',
          label: '(GMT+05:45) Kathmandu',
          tzCode: 'Asia/Kathmandu',
        },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Almaty',
          tzCode: 'Asia/Almaty',
        },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Bishkek',
          tzCode: 'Asia/Bishkek',
        },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Chagos',
          tzCode: 'Indian/Chagos',
        },
        { offset: '+06:00', label: '(GMT+06:00) Dhaka', tzCode: 'Asia/Dhaka' },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Moscow+03 - Omsk',
          tzCode: 'Asia/Omsk',
        },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Thimphu',
          tzCode: 'Asia/Thimphu',
        },
        {
          offset: '+06:00',
          label: '(GMT+06:00) Vostok',
          tzCode: 'Antarctica/Vostok',
        },
        {
          offset: '+06:30',
          label: '(GMT+06:30) Cocos',
          tzCode: 'Indian/Cocos',
        },
        {
          offset: '+06:30',
          label: '(GMT+06:30) Rangoon',
          tzCode: 'Asia/Yangon',
        },
        {
          offset: '+07:00',
          label: '(GMT+07:00) Bangkok',
          tzCode: 'Asia/Bangkok',
        },
        {
          offset: '+07:00',
          label: '(GMT+07:00) Christmas',
          tzCode: 'Indian/Christmas',
        },
        {
          offset: '+07:00',
          label: '(GMT+07:00) Davis',
          tzCode: 'Antarctica/Davis',
        },
        { offset: '+07:00', label: '(GMT+07:00) Hanoi', tzCode: 'Asia/Saigon' },
        { offset: '+07:00', label: '(GMT+07:00) Hovd', tzCode: 'Asia/Hovd' },
        {
          offset: '+07:00',
          label: '(GMT+07:00) Jakarta',
          tzCode: 'Asia/Jakarta',
        },
        {
          offset: '+07:00',
          label: '(GMT+07:00) Moscow+04 - Krasnoyarsk',
          tzCode: 'Asia/Krasnoyarsk',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Brunei',
          tzCode: 'Asia/Brunei',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) China Time - Beijing',
          tzCode: 'Asia/Shanghai',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Choibalsan',
          tzCode: 'Asia/Choibalsan',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Hong Kong',
          tzCode: 'Asia/Hong_Kong',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Kuala Lumpur',
          tzCode: 'Asia/Kuala_Lumpur',
        },
        { offset: '+08:00', label: '(GMT+08:00) Macau', tzCode: 'Asia/Macau' },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Makassar',
          tzCode: 'Asia/Makassar',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Manila',
          tzCode: 'Asia/Manila',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Moscow+05 - Irkutsk',
          tzCode: 'Asia/Irkutsk',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Singapore',
          tzCode: 'Asia/Singapore',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Taipei',
          tzCode: 'Asia/Taipei',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Ulaanbaatar',
          tzCode: 'Asia/Ulaanbaatar',
        },
        {
          offset: '+08:00',
          label: '(GMT+08:00) Western Time - Perth',
          tzCode: 'Australia/Perth',
        },
        {
          offset: '+08:30',
          label: '(GMT+08:30) Pyongyang',
          tzCode: 'Asia/Pyongyang',
        },
        { offset: '+09:00', label: '(GMT+09:00) Dili', tzCode: 'Asia/Dili' },
        {
          offset: '+09:00',
          label: '(GMT+09:00) Jayapura',
          tzCode: 'Asia/Jayapura',
        },
        {
          offset: '+09:00',
          label: '(GMT+09:00) Moscow+06 - Yakutsk',
          tzCode: 'Asia/Yakutsk',
        },
        {
          offset: '+09:00',
          label: '(GMT+09:00) Palau',
          tzCode: 'Pacific/Palau',
        },
        { offset: '+09:00', label: '(GMT+09:00) Seoul', tzCode: 'Asia/Seoul' },
        { offset: '+09:00', label: '(GMT+09:00) Tokyo', tzCode: 'Asia/Tokyo' },
        {
          offset: '+09:30',
          label: '(GMT+09:30) Central Time - Darwin',
          tzCode: 'Australia/Darwin',
        },
        {
          offset: '+10:00',
          label: "(GMT+10:00) Dumont D'Urville",
          tzCode: 'Antarctica/DumontDUrville',
        },
        {
          offset: '+10:00',
          label: '(GMT+10:00) Eastern Time - Brisbane',
          tzCode: 'Australia/Brisbane',
        },
        { offset: '+10:00', label: '(GMT+10:00) Guam', tzCode: 'Pacific/Guam' },
        {
          offset: '+10:00',
          label: '(GMT+10:00) Moscow+07 - Vladivostok',
          tzCode: 'Asia/Vladivostok',
        },
        {
          offset: '+10:00',
          label: '(GMT+10:00) Port Moresby',
          tzCode: 'Pacific/Port_Moresby',
        },
        {
          offset: '+10:00',
          label: '(GMT+10:00) Truk',
          tzCode: 'Pacific/Chuuk',
        },
        {
          offset: '+10:30',
          label: '(GMT+10:30) Central Time - Adelaide',
          tzCode: 'Australia/Adelaide',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Casey',
          tzCode: 'Antarctica/Casey',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Eastern Time - Hobart',
          tzCode: 'Australia/Hobart',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Eastern Time - Melbourne, Sydney',
          tzCode: 'Australia/Sydney',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Efate',
          tzCode: 'Pacific/Efate',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Guadalcanal',
          tzCode: 'Pacific/Guadalcanal',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Kosrae',
          tzCode: 'Pacific/Kosrae',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Moscow+08 - Magadan',
          tzCode: 'Asia/Magadan',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Norfolk',
          tzCode: 'Pacific/Norfolk',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Noumea',
          tzCode: 'Pacific/Noumea',
        },
        {
          offset: '+11:00',
          label: '(GMT+11:00) Ponape',
          tzCode: 'Pacific/Pohnpei',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Funafuti',
          tzCode: 'Pacific/Funafuti',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Kwajalein',
          tzCode: 'Pacific/Kwajalein',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Majuro',
          tzCode: 'Pacific/Majuro',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy',
          tzCode: 'Asia/Kamchatka',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Nauru',
          tzCode: 'Pacific/Nauru',
        },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Tarawa',
          tzCode: 'Pacific/Tarawa',
        },
        { offset: '+12:00', label: '(GMT+12:00) Wake', tzCode: 'Pacific/Wake' },
        {
          offset: '+12:00',
          label: '(GMT+12:00) Wallis',
          tzCode: 'Pacific/Wallis',
        },
        {
          offset: '+13:00',
          label: '(GMT+13:00) Auckland',
          tzCode: 'Pacific/Auckland',
        },
        {
          offset: '+13:00',
          label: '(GMT+13:00) Enderbury',
          tzCode: 'Pacific/Enderbury',
        },
        {
          offset: '+13:00',
          label: '(GMT+13:00) Fakaofo',
          tzCode: 'Pacific/Fakaofo',
        },
        { offset: '+13:00', label: '(GMT+13:00) Fiji', tzCode: 'Pacific/Fiji' },
        {
          offset: '+13:00',
          label: '(GMT+13:00) Tongatapu',
          tzCode: 'Pacific/Tongatapu',
        },
        { offset: '+14:00', label: '(GMT+14:00) Apia', tzCode: 'Pacific/Apia' },
        {
          offset: '+14:00',
          label: '(GMT+14:00) Kiritimati',
          tzCode: 'Pacific/Kiritimati',
        },
      ]
    },
  },
  // mounted() {
  // To demonstrate functionality of exposed component functions
  // Here we make focus on the user input
  // this.$refs.address.focus()
  // },

  methods: {
    saveRecord() {
      console.log('==saveRecord==')
      console.log('==this.tickets==', this.tickets)
      this.eventData._VenueAddress = this.venueAddress
      this.$axios
        .$post(`https://event.test.bitpod.io/svc/api/Events`, {
          ...this.eventData,
        })
        .then((res) => {
          console.log('=res===', res)
          const ticketList = []

          this.tickets.forEach(function (ticket) {
            ticket.Events = res.id
            ticket.Amount = parseInt(ticket.Amount)
            ticket.TicketCount = parseInt(ticket.TicketCount)
            ticketList.push(ticket)
          })
          console.log('=ticketList===', ticketList)
          // Array.from(this.tickets).forEach((ticket) => (ticket.Events = res.id))
          debugger
          return this.$axios
            .$post(`https://event.test.bitpod.io/svc/api/Tickets`, ticketList)
            .then((ticketres) => {
              this.onFormClose()
              return ticketres
            })
            .catch((e) => {
              console.log('error', e)
            })
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
    getAddressData(addressData, placeResultData, id) {
      console.log('==addressData==', addressData)
      debugger
      this.venueAddress.AddressLine =
        addressData.route + ', ' + addressData.administrative_area_level_1
      this.eventData.VenueName = addressData.route
      this.venueAddress.Country = addressData.country
      this.venueAddress.City = addressData.locality
      this.venueAddress.State = addressData.locality
      this.venueAddress.LatLng.lat = addressData.latitude
      this.venueAddress.LatLng.lng = addressData.longitude
    },
    changeEventName(value) {
      debugger
      this.verifyUniqueLink(value)
    },
    changeUniqueLink(value) {
      this.verifyUniqueLink(value)
    },
    verifyUniqueLink(value) {
      value = value.toLowerCase().replace(/\s/g, '')
      const regex = RegExp(/^[0-9a-zA-Z]+$/)
      if (regex.test(value)) {
        if (isNaN(value)) {
          this.eventData.UniqLink = value
          this.checkUniqueLink(this.eventData.UniqLink)
        }
      } else {
        this.isInalidEventLink = true
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
      console.log('==checkUniqueLink==result==', result)
      result.data.Event.EventCount > 0
        ? (this.isInalidEventLink = true)
        : (this.isInalidEventLink = false)
      console.log('==this.isInalidEventLink==', this.isInalidEventLink)
    },
    changeLocation(value) {
      debugger
      console.log('==changeLocation==', value)
      this.eventData.LocationType = value
      if (value === 'Venue') {
        this.isVenue = true
        this.isOnlineEvent = false
      }
      if (value === 'Online Event') {
        this.isVenue = false
        this.isOnlineEvent = true
      }
    },
    addNewRow1() {
      this.tickets.push({
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        StartDate: 0,
        EndDate: 0,
        TicketCount: 100,
      })
    },
    // setUniqLink(field) {
    //   if($("#UniqLink input").val()==""){
    //     $("#UniqLink input").val($("#EventTitle input").val().toLowerCase().replace(/\s/g, ""));
    //     var orgstr = $('#UniqLink input').val();
    //     if (/^(?![0-9]*$)[a-zA-Z0-9]+$/.test(orgstr) == false) {
    //       $(".val-field").remove();
    //       $('#UniqLink input').addClass("errorField1");
    //       $('#UniqLink .field-val ').append(`<div class="val-field" style="clear:both;top:149px">Lower case alphanumeric letters only</div>`);
    //         }
    //     else
    //       checkorg()
    //   }
    // },
    // checkorg() {
    //   var result=false;
    //     let apiorg = $('#UniqLink input').val();
    //     if ($('#UniqLink input').val()) {

    // },
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
</style>

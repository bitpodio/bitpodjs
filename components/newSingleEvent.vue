<template>
  <v-form ref="form" v-model="valid">
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
                  <CustomDate
                    v-model="eventData.StartDate"
                    :rules="requiredRules"
                    :field="startdatefield"
                  >
                  </CustomDate>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <CustomDate
                    v-model="eventData.EndDate"
                    :rules="requiredRules"
                    :field="enddatefield"
                  >
                  </CustomDate>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <Timezone
                    v-model="eventData.Timezone"
                    :rules="requiredRules"
                    :field="timezonefield"
                  ></Timezone>
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

            <v-btn color="primary" @click="next(2)">
              Next
            </v-btn>

            <!-- <v-btn text>Cancel</v-btn> -->
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
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12">
                    <v-text-field
                      v-model="webinarLink"
                      label="Online Event Link*"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isOnlineEvent" cols="12">
                    <v-text-field
                      v-model="joiningInstruction"
                      label="Additional online event joining instructions, URL, phone etc."
                      outlined
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col v-if="isVenue" cols="12">
                    <!-- <v-text-field label="Address" outlined required></v-text-field> -->
                    <no-ssr>
                      <vue-google-autocomplete
                        id="map"
                        ref="venueAddress.AddressLine"
                        classname="form-control"
                        placeholder="Address*"
                        @placechanged="getAddressData"
                      >
                      </vue-google-autocomplete>
                    </no-ssr>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="eventData.VenueName"
                      label="Venue Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.City"
                      label="City"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.State"
                      label="State"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12">
                    <v-text-field
                      v-model="venueAddress.Country"
                      label="Country"
                      outlined
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
                    <div class="flex">
                      <button class="button" @click="returnToCenter()">
                        Return to center
                      </button>
                      <p class="visibleCities">
                        Visible cities:
                        <span
                          v-text="
                            locationsVisibleOnMap.length > 0
                              ? locationsVisibleOnMap
                              : 'No visible cities'
                          "
                        />
                      </p>
                    </div>
                    <GMap
                      ref="gMap"
                      language="en"
                      :cluster="{ options: { styles: clusterStyle } }"
                      :center="{ lat: locations[0].lat, lng: locations[0].lng }"
                      :options="{ fullscreenControl: false, styles: mapStyle }"
                      :zoom="6"
                      @bounds_changed="checkForMarkers"
                    >
                      <GMapMarker
                        v-for="location in locations"
                        :key="location.id"
                        :position="{ lat: location.lat, lng: location.lng }"
                        :options="{
                          icon:
                            location === currentLocation
                              ? pins.selected
                              : pins.notSelected,
                        }"
                        @click="currentLocation = location"
                      >
                        <GMapInfoWindow :options="{ maxWidth: 200 }">
                          <code>
                            lat: {{ location.lat }}, lng: {{ location.lng }}
                          </code>
                        </GMapInfoWindow>
                      </GMapMarker>
                      <GMapCircle :options="circleOptions" />
                    </GMap>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>

            <v-btn color="primary" @click="e1 = 1">Prev</v-btn>
            <v-btn color="primary" @click="next(3)">
              Next
            </v-btn>
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
                        <CustomDate
                          v-model="ticket.StartDate"
                          :field="ticketstartdate"
                        >
                        </CustomDate>
                      </td>
                      <td class="pa-2 pb-0">
                        <CustomDate
                          v-model="ticket.Endate"
                          :field="ticketenddate"
                        >
                        </CustomDate>
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
            <v-btn color="primary" @click="e1 = 2">Prev</v-btn>
            <v-btn color="primary" @click="saveRecord">Save</v-btn>
            <!-- <v-btn color="primary" @click="dialog1 = false">Save</v-btn> -->
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-form>
</template>
<script>
// import addMonths from 'date-fns/addMonths'
// import addDays from 'date-fns/addDays'
import gql from 'graphql-tag'
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
// import Vue from 'vue'
// import DatetimePicker from 'vuetify-datetime-picker/dist'
import CustomDate from '~/components/common/form/date.vue'
import Timezone from '~/components/common/form/timezone'
// import 'vuetify-datetime-picker/src/stylus/main.styl'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
// Vue.use(DatetimePicker)
export default {
  components: {
    CustomDate,
    Timezone,
    //   // DatetimePicker,
    // VueGoogleAutocomplete,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: Function,
  },
  data: () => ({
    valid: true,
    requiredRules: [(v) => !!v || 'This field is required'],
    uniquelinkRules: [(v) => !!v || 'Lower case alphanumeric letters only'],
    isMap: false,
    currentLocation: {},
    locationsVisibleOnMap: '',
    circleOptions: {},
    locations: [],
    pins: {
      // selected: 'data:image/png;base64,iVBORw0KGgo...',
      // notSelected: 'data:image/png;base64,iVBORw0KGgo...',
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
    textFieldProps: {
      appendIcon: 'fa-calendar',
      outlined: true,
    },
    // StartDate: addDays(addMonths(new Date(), 1), 4).toISOString().substr(0, 10),
    dateTime: new Date(),
    startdatefield: {
      caption: 'StartDate*',
      type: 'datetime',
      fieldName: 'eventData.StartDate',
      // dateTime: new Date(),
    },
    enddatefield: {
      caption: 'EndDate*',
      type: 'datetime',
      fieldName: 'eventData.EndDate',
    },
    timezonefield: {
      caption: 'Timezone*',
      type: 'Timezone',
      fieldName: 'eventData.Timezone',
    },
    ticketstartdate: {
      caption: 'StartDate',
      type: 'datetime',
      fieldName: 'tickets.StartDate',
    },
    ticketenddate: {
      caption: 'EndDate',
      type: 'datetime',
      fieldName: 'tickets.EndDate',
    },
    eventData: {
      Title: '',
      // StartDate: addMonths(new Date(), 1).toISOString().substr(0, 16),
      // EndDate: addDays(addMonths(new Date(), 1), 4).toISOString().substr(0, 16),
      StartDate: 0,
      EndDate: 0,
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
      Status: 'Open for registration',
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
        // StartDate: addMonths(new Date(), 1).toISOString().substr(0, 16),
        // EndDate: addDays(addMonths(new Date(), 1), -1)
        //   .toISOString()
        //   .substr(0, 16),
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
  },
  // mounted() {
  // To demonstrate functionality of exposed component functions
  // Here we make focus on the user input
  // this.$refs.address.focus()
  // },

  methods: {
    returnToCenter() {
      this.$refs.gMap.map.setCenter(this.locations[0])
    },
    next(value) {
      const {
        Title,
        StartDate,
        EndDate,
        Timezone,
        UniqLink,
        LocationType,
        onlineEventLink,
      } = this.eventData
      this.$refs.form.validate()
      debugger
      if (
        value === 2 &&
        Title !== '' &&
        StartDate !== '' &&
        EndDate !== '' &&
        Timezone !== '' &&
        UniqLink !== ''
      ) {
        this.e1 = value
        debugger
      } else if (value === 3) {
        debugger
        if (
          LocationType === 'Venue' ||
          (LocationType === 'Online Event' && onlineEventLink !== '')
        ) {
          this.e1 = value
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
      console.log('==saveRecord==')
      console.log('==this.tickets==', this.tickets)
      const { Code, Type, StartDate, EndDate } = this.tickets
      debugger
      if ((Code !== '', Type !== '', StartDate !== '', EndDate !== '')) {
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
      }
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
      const latlng = {}
      latlng.lat = addressData.latitude
      latlng.lng = addressData.longitude
      latlng.name =
        addressData.route +
        ' ' +
        addressData.locality +
        ' ' +
        addressData.country
      this.locations[0] = latlng
      console.log('==this.locations==', this.locations)
      // this.locations[0].lat = addressData.latitude
      // this.locations[0].lng = addressData.latitude
      // this.locations[0].name = addressData.route + ' ' + addressData.country
      this.isMap = true
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

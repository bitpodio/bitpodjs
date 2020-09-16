<template>
  <v-form ref="form" v-model="valid">
    <v-dialog
      v-model="isMakeCopy"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">Copy Event</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="eventData.Title"
                label="Title"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-datetime-picker
                v-model="eventData.StartDate"
                label="Start Date*"
                dense
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
            <v-col cols="12" sm="6" md="4">
              <v-datetime-picker
                v-model="eventData.EndDate"
                label="End Date*"
                dense
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
            <v-col cols="12" sm="6" md="4">
              <Timezone
                v-model="eventData.Timezone"
                :field="timezonefield"
                class="v-timezone"
              ></Timezone>
            </v-col>
            <!-- <v-col cols="6" class="pb-1">
              <v-text-field
                v-model="UniqLink"
                label="Event Link*"
                hint="https://bitpod-event.test.bitpod.io/e/"
                persistent-hint
                outlined
                dense
                required
                :error-messages="uniqueLinkValidationMsg"
                @keyup="changeUniqueLink($event)"
              ></v-text-field>
            </v-col > -->
            <!-- <v-col cols="12" sm="6" md="4">
              <h2 >
                https://bitpod-event.test.bitpod.io/e/
              </h2>
            </v-col> -->
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="UniqLink"
                label="Event Link*"
                persistent-hint
                hint="https://bitpod-event.test.bitpod.io/e/"
                dense
                outlined
                @keyup="changeUniqueLink($event)"
              ></v-text-field>
              <!-- <span
                v-if="isInvalidEventLink && !!UniqLink"
                class="red--text pa-3 pt-0 body-1"
                >{{ uniqueLinkMessage }}</span
              > -->
            </v-col>
          </v-row>

          <v-row v-if="isOnline">
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="eventData.WebinarLink"
                label="Online Event Link*"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-textarea
                v-model="eventData.JoiningInstruction"
                label="Additional online event joining instructions, URL, phone etc."
                outlined
                dense
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="pl-0 pt-0 pb-0">
              <v-col v-if="isVenue" cols="12" class="pb-6">
                <no-ssr>
                  <vue-google-autocomplete
                    id="map"
                    ref="venueAddress.AddressLine"
                    v-model="venueAddress.AddressLine"
                    class="form-control pa-3 d-block rounded"
                    placeholder="Address*"
                    :required="true"
                    @placechanged="getAddressData"
                  ></vue-google-autocomplete>
                </no-ssr>
                <div
                  v-show="addresslineMessage !== ''"
                  class="red--text pa-3 pt-0 body-1"
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
                ></v-text-field>
              </v-col>
              <v-row class="px-2">
                <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="venueAddress.City"
                    label="City"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="venueAddress.State"
                    label="State"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="venueAddress.Country"
                    label="Country"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                  <v-text-field
                    v-model="venueAddress.PostalCode"
                    label="Zip Code"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-col v-if="isMap" class="event-map">
                <div class="flex"></div>
                <div :key="`${locations[0].lat}-${locations[0].lng}`">
                  <GMap
                    ref="gMap"
                    language="en"
                    class="event-map"
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

          <div class="col-md-12">
            <v-flex class="d-flex justify-center align-center pb-1">
              <h2 class="body-1 pb-1">
                <i class="fa fa-network pr-1" aria-hidden="true"></i> I would
                like to copy following event objects as well
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
          </div>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="isSpeakers"
                label="Speakers"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="isTickets"
                label="Tickets"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="isSessions"
                label="Sessions"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="isRegTypes"
                label="Registration Types"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="isOfferCodes"
                label="Offer Code"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn
            :disabled="!valid || isInvalidEventLink"
            color="primary"
            depressed
            @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import gql from 'graphql-tag'
import nuxtConfig from '../../../../../nuxt.config'
import strings from '~/strings.js'
import Timezone from '~/components/common/form/timezone'
import { required, link } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
// import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  components: {
    Timezone,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    isMakeCopy: {
      default: false,
      allowSpaces: false,
    },
  },
  data() {
    return {
      isSpeakers: true,
      isTickets: true,
      isSessions: true,
      isRegTypes: true,
      isOfferCodes: true,
      addresslineMessage: '',
      isVenue: false,
      isOnline: false,
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
      valid: true,
      StartDate: null,
      EndDate: null,
      UniqLink: '',
      isInvalidEventLink: false,
      uniqueLinkMessage: '',
      linkRules: [required, link],
      data: {
        event: {},
      },
      // formData: {},
      eventData: {},
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'eventData.Timezone',
      },
      VenueName: '',
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
    }
  },
  computed: {
    eventEndDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            // const { StartDate } = this.eventData
            let endDateMessage = ''
            if (!EndDate) endDateMessage = 'This field is required'
            // else if (StartDate && EndDate && StartDate > EndDate)
            //   endDateMessage = strings.EVENT_START_END_DATE
            // else if (EndDate < new Date())
            //   endDateMessage = strings.EVENT_END_DATE
            else endDateMessage = ''
            return endDateMessage || true
          },
        ],
      }
    },
  },
  // mounted() {
  //   this.getDropDownData('EventPrivacy')
  //     .then((res) => {
  //       this.eventPrivacyDropdown = res.map((i) => i.value)
  //       return res
  //     })
  //     .catch((e) => {
  //       console.log('Error', e)
  //     })
  //   this.getDropDownData('Currency')
  //     .then((res) => {
  //       this.currencyDropdown = res.map((i) => i.value)
  //       return res
  //     })
  //     .catch((e) => {
  //       console.log('Error', e)
  //     })
  // },
  methods: {
    uniqueLinkValidationMsg() {
      debugger
      const errorMessage = this.isInvalidEventLink
        ? this.uniqueLinkMessage
        : null
      return errorMessage
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
        this.isInvalidEventLink = true
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
        this.isInvalidEventLink = true
        this.uniqueLinkMessage = strings.UNIQUE_LINK_DUPLICATE
      } else this.isInvalidEventLink = false
    },
    returnToCenter() {
      this.$refs.gMap && this.$refs.gMap.map.setCenter(this.locations[0])
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
    getAddressData(addressData, placeResultData, id) {
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      this.VenueName = addressData.route || ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      // this.venueAddress.LatLng.lat = addressData.latitude || ''
      // this.venueAddress.LatLng.lng = addressData.longitude || ''
      const latlng = {}
      latlng.lat = addressData.latitude
      latlng.lng = addressData.longitude
      // latlng.name =
      //   addressData.route +
      //   ' ' +
      //   addressData.locality +
      //   ' ' +
      //   addressData.country
      const newLocations = []
      newLocations[0] = latlng

      this.locations = newLocations
      this.isMap = true
      this.returnToCenter()
    },
    close() {
      this.$emit('update:isMakeCopy', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    onSave() {
      this.formData.Currency = this.currency
      this.formData.Privacy = this.privacy
      delete this.formData._VenueAddress
      this.$axios
        .$patch(
          `https://${nuxtConfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}`,
          {
            ...this.formData,
          }
        )
        .then((res) => {
          this.close()
          this.refresh()
          return (this.data.event = res)
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
    // getDropDownData(filterType) {
    //   return this.$apollo
    //     .query({
    //       query: gql`
    //         ${generalconfiguration}
    //       `,
    //       variables: {
    //         filters: {
    //           where: {
    //             type: filterType,
    //           },
    //         },
    //       },
    //     })
    //     .then((result) => {
    //       const generalConfig = formatGQLResult(
    //         result.data,
    //         'GeneralConfiguration'
    //       )
    //       return generalConfig
    //     })
    //     .catch((e) => {
    //       console.log('Error', e)
    //     })
    // },
    // async checkUniqueLink() {
    //   if (this.formData.UniqLink !== '') {
    //     const where = { UniqLink: this.formData.UniqLink }
    //     const result = await this.$apollo.query({
    //       query: gql`
    //         ${eventCount}
    //       `,
    //       variables: {
    //         where,
    //       },
    //     })
    //     if (result.data.Event.EventCount > 0) {
    //       this.isInvalidEventLink = true
    //       this.uniqueLinkMessage = 'This link is already taken'
    //     } else {
    //       this.isInvalidEventLink = false
    //       this.uniqueLinkMessage = ''
    //     }
    //   }
    // },
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
        this.eventData = event.length > 0 ? { ...event[0] } : {}
        this.eventData.Title = `Copy of ${this.eventData.Title}`
        this.eventData.StartDate = new Date(this.eventData.StartDate)
        this.eventData.EndDate = new Date(this.eventData.EndDate)
        this.eventData.UniqLink = ''
        debugger
        if (
          this.eventData.BusinessType === 'Single' &&
          this.eventData.LocationType === 'Venue'
        ) {
          this.isVenue = true
          this.isMap = true
          this.venueAddress = this.eventData._VenueAddress
          if (this.eventData._VenueAddress.LatLng !== null) {
            const latlng = this.eventData._VenueAddress.LatLng
            const newLocations = []
            newLocations[0] = latlng
            this.locations = newLocations
            this.returnToCenter()
          }
        } else if (
          this.eventData.BusinessType === 'Single' &&
          this.eventData.LocationType === 'Online Event'
        ) {
          this.isOnline = true
        }

        // this.eventData.EndDate = addDays(addMonths(new Date(), 1), 4),
        // this.eventData.id = this.$route.params.id
        // this.formData = event.length > 0 ? { ...event[0] } : {}
        // this.formData.id = this.$route.params.id
        // debugger
        // this.currency = this.formData.Currency
        // this.privacy = this.formData.Privacy
        return {
          event: event.length > 0 ? event[0] : {},
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
<style scoped>
.form-control {
  border: 1px solid #9a9a9a;
  width: 100%;
  max-height: 40px;
}
.event-map {
  max-height: 280px !important;
  overflow: hidden !important;
}
</style>

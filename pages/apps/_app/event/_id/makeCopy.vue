<template>
  <div>
    <v-dialog
      v-model="isViewEvent"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <div class="flex">
          <div class="pb-2 text-center pa-4">
            <i18n path="Common.CopiedSuccessfully" class="text-h5" />
          </div>
          <div class="pa-2 text-center">
            <i18n path="Common.ClickPreviewButton" class="text--primary" />
          </div>

          <div class="pb-2 text-center">
            <v-btn depressed color="primary" class="ma-1" @click="viewEvent"
              ><v-icon left>mdi-eye-outline</v-icon><i18n path="Drawer.Preview"
            /></v-btn>
            <v-btn text color="primary" class="ma-1" @click="closeForm"
              ><i18n path="Drawer.Close"
            /></v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-dialog
        v-model="isMakeCopy"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n path="Common.CopyEvent" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="Title"
                  :rules="requiredRules"
                  :label="$t('Common.Title')"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-form ref="dateform" v-model="datevalid" :lazy-validation="lazy">
              <v-row>
                <v-col v-if="isVenue || isOnline" cols="12" sm="4" md="4">
                  <CustomDate
                    v-model="StartDate"
                    :label="$t('Common.StartD')"
                    :field="startDateField"
                    :rules="startDateRule"
                    :on-change="changeStartDate()"
                    type="datetime"
                  />
                </v-col>
                <v-col v-if="isVenue || isOnline" cols="12" sm="4" md="4">
                  <CustomDate
                    v-model="EndDate"
                    :label="$t('Common.EndD')"
                    :field="endDateField"
                    :rules="endDateRule"
                    :on-change="changeEndDate()"
                    type="datetime"
                  />
                </v-col>

                <v-col v-if="isVenue || isOnline" cols="12" sm="4" md="4">
                  <Timezone
                    v-model="eventData.Timezone"
                    :field="timezonefield"
                    class="v-timezone"
                  ></Timezone>
                </v-col>
              </v-row>
            </v-form>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="UniqLink"
                  :label="$t('Common.EventL')"
                  class="text-links"
                  :rules="requiredRules"
                  persistent-hint
                  :hint="eventLinkHint"
                  dense
                  outlined
                  @keyup="changeUniqueLink($event)"
                ></v-text-field>
                <v-flex
                  v-if="isInvalidEventLink && !!UniqLink"
                  class="red--text pt-1 pb-0 mt-n6 pl-3 body-2"
                  >{{ uniqueLinkMessage }}</v-flex
                >
              </v-col>
            </v-row>
            <v-row v-if="isOnline">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="eventData.WebinarLink"
                  :label="$t('Common.OnlineEventLinkReq')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-textarea
                  v-model="eventData.JoiningInstruction"
                  :label="$t('Common.AdditionalOnlineEvent')"
                  outlined
                  dense
                  rows="2"
                ></v-textarea>
              </v-col>
            </v-row>
            <div v-if="isVenue" class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1 primary--text">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <i18n path="Common.Venue" />
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="6" class="pl-0 pt-0 pb-0">
                <v-col v-if="isVenue" cols="12" class="pb-6 pt-0">
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
                    :label="$t('Common.VenueName')"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-row class="px-2">
                  <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.City"
                      :label="$t('Common.City')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.State"
                      :label="$t('Common.State')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.Country"
                      :label="$t('Common.Country')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="isVenue" cols="12" sm="6" md="6" class="pb-0">
                    <v-text-field
                      v-model="venueAddress.PostalCode"
                      :label="$t('Common.ZipCode')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0 pa-0">
                <v-col v-if="isMap" class="event-map pa-0">
                  <div class="flex"></div>
                  <div
                    v-if="locations[0] && locations[0].lat"
                    :key="`${locations[0].lat}-${locations[0].lng}`"
                  >
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
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1 fs-16">
                  <i class="fa fa-network pr-1" aria-hidden="true"></i
                  ><i18n path="Common.CopyEventObjects" />
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="4" md="4" class="py-0">
                <v-checkbox
                  v-model="isSpeakers"
                  :label="$t('Common.Speakers')"
                  class="ma-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="py-0">
                <v-checkbox
                  v-model="isTickets"
                  :label="$t('Common.Tickets')"
                  class="ma-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="py-0">
                <v-checkbox
                  v-model="isSessions"
                  :label="$t('Common.Sessions')"
                  class="ma-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="py-0">
                <v-checkbox
                  v-model="isRegistrationTypes"
                  :label="$t('Common.RegistrationTypes')"
                  class="ma-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="py-0">
                <v-checkbox
                  v-model="isOfferCode"
                  :label="$t('Common.OfferCode')"
                  class="ma-0"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn
              :disabled="
                !valid || !datevalid || isInvalidEventLink || saveBtnDisabled
              "
              color="primary"
              depressed
              @click="onSave"
              ><i18n path="Drawer.Copy"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Timezone from '~/components/common/form/timezone'
import { required } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import { formatGQLResult } from '~/utility/gql.js'
import CustomDate from '~/components/common/form/date.vue'
import { getIdFromAtob } from '~/utility'
import nuxtconfig from '~/nuxt.config'

export default {
  components: {
    Timezone,
    CustomDate,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    isMakeCopy: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      datevalid: false,
      valid: false,
      lazy: false,
      Title: '',
      StartDate: null,
      EndDate: null,
      isSpeakers: true,
      isTickets: true,
      isSessions: true,
      isRegistrationTypes: true,
      isOfferCode: true,
      addresslineMessage: '',
      requiredRules: [required],
      saveBtnDisabled: false,
      isRecurring: false,
      copyEventId: '',
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
      UniqLink: '',
      isInvalidEventLink: true,
      uniqueLinkMessage: '',
      isViewEvent: false,
      data: {
        event: {},
      },
      eventData: {},
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'eventData.Timezone',
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
    }
  },
  computed: {
    isVenue() {
      return (
        this.eventData &&
        this.eventData.BusinessType === 'Single' &&
        this.eventData.LocationType === 'Venue'
      )
    },
    isMap() {
      return (
        this.eventData &&
        this.eventData.BusinessType === 'Single' &&
        this.eventData.LocationType === 'Venue'
      )
    },
    isOnline() {
      return (
        this.eventData &&
        this.eventData.BusinessType === 'Single' &&
        this.eventData.LocationType === 'Online event'
      )
    },
    startDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date',
        type: 'datetime',
      }
    },
    endDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date',
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
          if (!EndDate) endDateMessage = this.requiredRules
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
      return `${nuxtconfig.integrationLinks.EVENT_LINK_HINT}${this.UniqLink}`
    },
    gMapCenter() {
      return { lat: this.locations[0].lat, lng: this.locations[0].lng }
    },
  },
  watch: {
    id() {
      this.$apollo.queries.data.refresh()
    },
  },
  methods: {
    changeStartDate() {
      this.$refs.dateform && this.$refs.dateform.validate()
      this.eventData.StartDate = this.StartDate
    },
    changeEndDate(value) {
      this.$refs.dateform && this.$refs.dateform.validate()
      this.eventData.EndDate = this.EndDate
    },
    closeForm() {
      this.isViewEvent = false
      this.$router.push(
        this.localePath('/apps/event/event/' + this.copyEventId)
      )
    },
    viewEvent() {
      const baseUrl = this.$bitpod.getApiUrl()
      const eventUrl = baseUrl.replace('svc/api', 'e')
      window.open(`${eventUrl}${this.eventData.UniqLink}`, '_blank')
    },
    changeUniqueLink(event) {
      this.verifyUniqueLink(event.currentTarget.value)
    },
    verifyUniqueLink(value) {
      value = value.toLowerCase().replace(/\s/g, '')
      value = value.trim()
      this.UniqLink = value
      const regex = RegExp(/^[0-9a-zA-Z]+$/)
      if (regex.test(value)) {
        if (isNaN(value)) {
          this.UniqLink = value
          this.checkUniqueLink(this.UniqLink)
        }
      } else {
        this.isInvalidEventLink = true
        this.uniqueLinkMessage = this.$t('Messages.Warn.UniqueLinkFormat')
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
        fetchPolicy: 'no-cache',
      })
      if (result.data.Event.EventCount > 0) {
        this.isInvalidEventLink = true
        this.uniqueLinkMessage = this.$t('Messages.Error.UniqueLinkDuplicate')
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
      this.eventData.VenueName = addressData.route || ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
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
    close() {
      this.$emit('update:isMakeCopy', false)
      this.$refs.form.reset()
    },
    setObjects() {
      this.eventData.isOfferCode = this.isOfferCode
      this.eventData.isRegistrationTypes = this.isRegistrationTypes
      this.eventData.isSessions = this.isSessions
      this.eventData.isSpeakers = this.isSpeakers
      this.eventData.isTickets = this.isTickets
    },
    async onSave() {
      this.saveBtnDisabled = true
      this.setObjects()
      if (
        this.eventData.BusinessType === 'Single' &&
        this.eventData.LocationType === 'Venue'
      ) {
        delete this.eventData._VenueAddress.LatLng.__typename
        delete this.eventData._VenueAddress.LatLng.visible
        delete this.eventData._VenueAddress.LatLng.name
      }
      this.eventData.UniqLink = this.UniqLink
      this.eventData.Title = this.Title
      const baseUrl = this.$bitpod.getApiUrl()
      let res = null
      try {
        res = await this.$axios.$post(`${baseUrl}Events/cloneEvent`, {
          ...this.eventData,
        })
      } catch (e) {
        this.saveBtnDisabled = false
        console.error(
          `Error in Save function of makecopy form, context: clone event , baseUrl: ${baseUrl} eventData: ${this.eventData}  error: ${e}`
        )
      }
      if (res) {
        this.isMakeCopy = false
        this.isViewEvent = true
        this.copyEventId = res.id
        return res
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
              id: this.$route.params.id || this.id,
            },
          },
          eventId: this.$route.params.id || this.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.eventData = event.length > 0 ? { ...event[0] } : {}
        if (
          (this.Title === '' || this.Title === undefined) &&
          this.eventData.Title
        ) {
          this.Title = `Copy of ${this.eventData.Title}`
        }

        this.StartDate = new Date(this.eventData.StartDate)
        this.EndDate = new Date(this.eventData.EndDate)
        this.eventData.UniqLink = ''
        this.eventData.id = getIdFromAtob(this.eventData.id)
        if (
          this.eventData.BusinessType === 'Single' &&
          this.eventData.LocationType === 'Venue'
        ) {
          this.venueAddress = this.eventData._VenueAddress
          if (this.eventData._VenueAddress.LatLng !== null) {
            const latlng = this.eventData._VenueAddress.LatLng
            const newLocations = []
            latlng.name = `${this.eventData.VenueName} ${this.eventData._VenueAddress.City} ${this.eventData._VenueAddress.Country}`
            newLocations[0] = latlng
            this.locations = newLocations
            this.returnToCenter()
          }
        }
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
.text-links {
  height: 80px;
}
</style>

<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> New Session
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-10 pb-9">New Session</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row v-if="dialog">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="session.Name"
                  label="Name*"
                  outlined
                  :rules="required"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <RichText
                  v-model="session.Description"
                  label="Description"
                  class="mb-5"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-datetime-picker
                  v-model="session.StartDate"
                  label="Start Date*"
                  :text-field-props="sdateProps()"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-datetime-picker
                  v-model="session.EndDate"
                  label="End Date*"
                  :text-field-props="edateProps()"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <Timezone
                  v-model="session.Timezone"
                  :rules="requiredRules"
                  :field="timezonefield"
                  dense
                  class="v-timezone"
                ></Timezone>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="session.Location"
                  label="Location"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <Lookup
                  v-model="session.Type"
                  :field="typeProps"
                  :rules="required"
                  :on-change="changeType"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <Lookup v-model="session.MySpeaker" :field="speakerProps()" />
              </v-col>
              <v-col cols="12" sm="6">
                <Lookup
                  v-model="session.SessionTicket"
                  :field="ticketProps()"
                  :rules="[
                    (v) => {
                      return v.length ? true : 'This field is required *'
                    },
                  ]"
                />
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <Lookup
                  v-model="session.LocationType"
                  :field="locationTypeProps"
                  :rules="required"
                />
              </v-col>
              <v-col v-if="session.LocationType === 'Bitpod Virtual'" cols="12">
                <v-text-field
                  v-model="session.BitpodVirtualLink"
                  label="Bitpod Virtual Link"
                  outlined
                  dense
                  :disabled="true"
                  :value="getBitpodVirtualLink()"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Phone call'"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="session.Phone"
                  label="Phone*"
                  outlined
                  dense
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'In-person meeting'"
                cols="12"
                sm="6"
                md="4"
              >
                <v-checkbox
                  v-model="session.SeatReservation"
                  class="ma-0"
                  label="Seat Reservation"
                ></v-checkbox>
              </v-col>
              <v-col
                v-if="session.LocationType === 'In-person meeting'"
                cols="12"
                class="mt-3"
              >
                <v-autocomplete
                  v-model="session.LocationId"
                  :items="locationLookupOptions"
                  item-text="Name"
                  item-value="id"
                  label="Location"
                  outlined
                  dense
                  class="st-date"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Online meeting'"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="WebinarLink"
                  label="online meeting link*"
                  outlined
                  :rules="requiredRules"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0 pt-0">
                <div v-if="session.LocationType === 'Zoom'">
                  To send Zoom joining info, you must setup Zoom integration,
                  <a href="" @click.stop.prevent="openWindow(zoomDocumentLink)"
                    >click here</a
                  >
                  for documentation.
                </div>
                <div v-if="session.LocationType === 'Google Meet'">
                  To send google meet joining info, you must setup google meet
                  integration,
                  <a
                    href=""
                    @click.stop.prevent="openWindow(googleMeetDocumentLink)"
                    >click here</a
                  >
                  for documentation.
                </div>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Custom'"
                cols="12"
                class="pt-0 pb-6"
              >
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
                  class="red--text pa-3 pt-0 body-1"
                >
                  {{ addresslineMessage }}
                </div>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Custom'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.City"
                  label="City"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Custom'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.State"
                  label="State"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Custom'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.Country"
                  label="Country"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Custom'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.ZipCode"
                  label="Zip Code"
                  outlined
                  dense
                  @change="changeAddress()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            color="primary"
            :disabled="!valid"
            depressed
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import strings from '~/strings.js'
import { required } from '~/utility/rules.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import location from '~/config/apps/event/gql/location.gql'
import speaker from '~/config/apps/event/gql/eventSpeakers.gql'
import event from '~/config/apps/event/gql/event.gql'
import { getIdFromAtob } from '~/utility'
import { getApiUrl } from '~/utility/index.js'
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      eventDetails: {},
      valid: false,
      required: [required],
      dialog: false,
      isSaveButtonDisabled: false,
      isGroup: false,
      InPersonMeeting: [],
      inPersonMeetingOptions: [],
      ticketOptions: [],
      speakerOptions: [],
      addresslineMessage: '',
      requiredRules: [required],
      zoomDocumentLink: strings.ZOOM_DOCUMENT_LINK,
      googleMeetDocumentLink: strings.GOOGLE_MEET_DOCUMENT_LINK,
      session: {},
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
      phoneRules: [
        (v) => {
          if (v && !isNaN(v)) {
            return true
          }
          return strings.INVALID_PHONE_MSG
        },
      ],
      typeProps: {
        type: 'lookup',
        caption: 'Type*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'SessionType',
            }
          },
        },
      },
      locationTypeProps: {
        type: 'lookup',
        caption: 'Location Type*',
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
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'session.Timezone',
      },
    }
  },
  computed: {
    locationLookupOptions() {
      const items = this.inPersonMeetingOptions
      return items
    },
    startDateRule() {
      return [
        (v) => {
          if (!v) {
            return strings.FIELD_REQUIRED
          }
          const startDate = new Date(v)
          const endDate = new Date(this.session.EndDate)
          const eventStartDate = new Date(this.eventDetails.StartDate)
          const eventEndDate = new Date(this.eventDetails.EndDate)
          return startDate > endDate
            ? strings.START_END_DATE
            : startDate < eventStartDate || startDate > eventEndDate
            ? strings.START_EVENT_DURATION_TIME
            : true
        },
      ]
    },
    endDateRule() {
      return [
        (v) => {
          if (!v) {
            return strings.FIELD_REQUIRED
          }
          const startDate = new Date(this.session.StartDate)
          const endDate = new Date(v)
          const eventStartDate = new Date(this.eventDetails.StartDate)
          const eventEndDate = new Date(this.eventDetails.EndDate)
          return startDate > endDate
            ? strings.END_START_DATE
            : endDate < eventStartDate || endDate > eventEndDate
            ? strings.END_EVENT_DURATION_TIME
            : true
        },
      ]
    },
  },
  methods: {
    getBitpodVirtualLink() {
      const randomStr = Math.random().toString(36).substring(2, 6)
      const roomName = `/${this.eventDetails.UniqLink}-${(
        this.session.Name || 'Session_Name'
      )
        .split(' ')[0]
        .replace(/[^a-zA-Z ]/g, '')}-${randomStr}`
      this.session.BitpodVirtualLink = `${strings.BITOPD_VIRTUAL_LINK}${roomName}`
    },
    sdateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: this.startDateRule,
      }
    },
    edateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: this.endDateRule,
      }
    },
    ticketProps() {
      const items = this.ticketOptions
      return {
        type: 'lookup',
        multiple: true,
        caption: 'Tickets*',
        items,
        dataSource: {
          items,
          itemText: 'Code',
          itemValue: 'id',
        },
      }
    },
    speakerProps() {
      const items = this.speakerOptions
      return {
        type: 'lookup',
        multiple: true,
        caption: 'Speakers',
        items,
        dataSource: {
          items,
          itemText: 'Code',
          itemValue: 'id',
        },
      }
    },
    changeAddressData(value) {
      this.addresslineMessage =
        value === ' ' || value === '' ? strings.FIELD_REQUIRED : ''
    },
    getAddressData(addressData, placeResultData, id) {
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      this.venueAddress.LatLng.lat = addressData.latitude || ''
      this.venueAddress.LatLng.lng = addressData.longitude || ''
    },
    changeType(value) {
      this.session.MaxAllow = parseInt(this.session.MaxAllow) || 5
      this.isGroup = value === 'Group'
    },
    openWindow(link) {
      window.open(link, '_blank')
    },
    async onSave() {
      const baseUrl = getApiUrl()
      this.session.EventId = this.$route.params.id
      if (this.session && this.session.SessionTicket) {
        this.session.TicketName = this.ticketOptions
          .filter((i) => this.session.SessionTicket.includes(i.id))
          .map((j) => {
            return j.Code
          })
          .join(',')
      }
      if (this.session && this.session.MySpeaker) {
        this.session.Speaker = this.speakerOptions
          .filter((i) => this.session.MySpeaker.includes(i.id))
          .map((j) => {
            return j.Code
          })
          .join(',')
      }
      let res = null
      if (this.session.LocationType === 'Custom') {
        if (this.venueAddress.AddressLine !== '') {
          this.session._CurrentAddress = this.venueAddress
        } else {
          this.addresslineMessage = strings.FIELD_REQUIRED
          return
        }
      }
      try {
        res = await this.$axios.$post(`${baseUrl}Sessions`, {
          ...this.session,
        })
      } catch (e) {
        console.error(
          `Error in session grid new session form on Save function - context: create session, eventId - ${this.session.EventId}`
        )
      }
      if (res) {
        this.closeForm()
        this.refresh()
      }
    },
    closeForm() {
      this.session.Name = ''
      this.session.Description = ''
      this.session.StartDate = ''
      this.session.EndDate = ''
      this.session.Timezone = 'Asia/Calcutta'
      this.session.Location = ''
      this.session.Type = ''
      this.session.MySpeaker = ''
      this.session.SessionTicket = ''
      this.session.LocationType = ''
      this.dialog = false
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${location}
        `
      },
      variables() {
        return {
          filters: {
            where: {},
          },
          ticketFilters: {
            where: {
              Events: this.$route.params.id,
            },
          },
          sessionFilters: {
            where: {
              EventId: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const locationResult = formatGQLResult(data, 'Location')
        const ticketResult = formatGQLResult(data, 'Ticket')
        const locId = []
        this.inPersonMeetingOptions = locationResult.map(({ id, ...rest }) => {
          const decryptedId = getIdFromAtob(id)
          if (rest.Default) {
            locId.push(decryptedId)
          }
          return {
            id: decryptedId,
            ...rest,
          }
        })
        this.session.LocationId = locId
        this.ticketOptions = ticketResult.map(({ id, ...rest }) => ({
          id: getIdFromAtob(id),
          ...rest,
        }))
      },
      error(error) {
        this.error = error
      },
    },
    speaker: {
      query() {
        return gql`
          ${speaker}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const EventResult = formatGQLResult(data, 'Event')[0]
        EventResult.EventSpeakers = {
          EventSpeakersFind: EventResult.EventSpeakers,
        }
        const speakerResult = formatGQLResult(EventResult, 'EventSpeakers')
        if (speakerResult) {
          this.speakerOptions = speakerResult.map(
            ({ id, FirstName, LastName }) => ({
              id: getIdFromAtob(id),
              Code: FirstName + LastName,
            })
          )
        }
      },
      error(error) {
        this.error = error
      },
    },
    event: {
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
        this.eventDetails = formatGQLResult(data, 'Event')[0]
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
</style>

<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="1000" :top="true" width="10px">
      <div
        class="toast py-2 pr-1 pl-5 text-h6 light font-weight-regular text-center"
      >
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-btn text small @click="openDialog">
      <v-icon class="fs-18" left>{{
        isEdit ? 'fa-pencil' : 'mdi-plus'
      }}</v-icon>
      {{ isEdit ? $t('Common.EditSession') : $t('Common.NewSession') }}
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            {{ isEdit ? $t('Common.EditSession') : $t('Common.NewSession') }}
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid">
            <v-row v-if="dialog">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="session.Name"
                  :label="$t('Common.SessionName')"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <div class="col-md-12 pb-0 pt-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-clock" aria-hidden="true"></i>
                    <i18n path="Common.SessionInformation" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-col v-if="dialog" cols="12" sm="6" md="4">
                <CustomDate
                  v-model="session.StartDate"
                  :label="$t('Common.StartDateTime')"
                  :field="startField"
                  :rules="startDateRule"
                  type="datetime"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.Duration"
                  :field="durationProps"
                  :rules="[rules.required]"
                  @change="changeDuration"
                />
              </v-col>
              <v-col v-if="isCustomMin" cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="customDuration"
                  :label="$t('Common.CustomDuration')"
                  outlined
                  type="number"
                  min="1"
                  :rules="durationRules"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <Timezone
                  v-model="session.Timezone"
                  :rules="[rules.required]"
                  :field="timezonefield"
                  dense
                  class="v-timezone"
                ></Timezone>
              </v-col>
              <v-col cols="12">
                <Lookup v-model="session.MySpeaker" :field="speakerProps()" />
              </v-col>
              <v-col cols="12">
                <Lookup
                  v-model="session.SessionTicket"
                  :field="ticketProps()"
                />
              </v-col>
              <div class="col-md-12 pb-0 pt-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-location" aria-hidden="true"></i>
                    <i18n path="Common.Location" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-col cols="12" sm="6" class="pb-0">
                <Lookup
                  v-model="session.LocationType"
                  :field="locationTypeProps"
                  :rules="[rules.required]"
                  @change="locationChanged"
                />
              </v-col>
              <v-col v-if="session.LocationType === 'Bitpod Virtual'" cols="12">
                <v-text-field
                  v-model="session.BitpodVirtualLink"
                  :label="$t('Common.BitpodVirtualLink')"
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
                  :label="$t('Common.PhoneRequired')"
                  outlined
                  dense
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col v-if="session.LocationType === 'Online event'" cols="12">
                <v-text-field
                  v-model="session.WebinarLink"
                  :label="$t('Common.OnlineEventLink')"
                  outlined
                  :rules="[rules.onlineEventLink]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0 pt-0">
                <div v-if="session.LocationType === 'Zoom'">
                  <i18n path="Common.SendZoomJoiningInfo" />
                  <a href="" @click.stop.prevent="openWindow(zoomDocumentLink)"
                    ><i18n path="Common.ClickHere"
                  /></a>
                  <i18n path="Common.ForDocumentation" />
                </div>
                <div v-if="session.LocationType === 'Google Meet'">
                  <i18n path="Common.SendGoogleMeetJoiningInfo" />
                  <a
                    href=""
                    @click.stop.prevent="openWindow(googleMeetDocumentLink)"
                    ><i18n path="Common.ClickHere"
                  /></a>
                  <i18n path="Common.ForDocumentation" />
                </div>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Venue'"
                cols="12"
                class="pt-0"
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
                  v-if="addresslineMessage !== ''"
                  class="red--text px-3 pb-2 caption"
                >
                  {{ addresslineMessage }}*
                </div>
                <div v-else class="transparent--text pl-3 pb-2 caption">
                  {{ required }}
                </div>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Venue'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Venue'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Venue'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.LocationType === 'Venue'"
                cols="12"
                sm="6"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="venueAddress.PostalCode"
                  :label="$t('Common.ZipCode')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <div class="col-md-12 pb-0 pt-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                    <i18n path="Common.Description" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-col cols="12">
                <RichText v-model="session.Description" class="mb-5" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :disabled="
              !valid ||
              (session.LocationType === 'Venue' && !venueAddress.AddressLine)
            "
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { formatGQLResult } from '~/utility/gql.js'
import { rules } from '~/utility/rules.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import location from '~/config/apps/event/gql/location.gql'
import speaker from '~/config/apps/event/gql/eventSpeakers.gql'
import event from '~/config/apps/event/gql/event.gql'
import { getIdFromAtob } from '~/utility'
import CustomDate from '~/components/common/form/date.vue'
import nuxtconfig from '~/nuxt.config'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    CustomDate,
    SaveBtn,
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
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    item: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      customDuration: '50',
      isCustomMin: false,
      snackbar: false,
      snackbarText: '',
      eventDetails: {},
      valid: false,
      dialog: false,
      isSaveButtonDisabled: false,
      isGroup: false,
      InPersonMeeting: [],
      inPersonMeetingOptions: [],
      ticketOptions: [],
      speakerOptions: [],
      addresslineMessage: '',
      rules: rules(this.$i18n),
      zoomDocumentLink: nuxtconfig.integrationLinks.ZOOM_DOCUMENT_LINK,
      googleMeetDocumentLink:
        nuxtconfig.integrationLinks.GOOGLE_MEET_DOCUMENT_LINK,
      session: {},
      durationRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return this.$t('Messages.Error.DurationGreaterMsg')
        },
      ],
      venueAddress: {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
        LatLng: { lat: 0.0, lng: 0.0 },
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
          return this.$t('Messages.Error.PleaseEnterValidPhone')
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
        caption: this.$t('Common.LocationTypeRequired'),
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'EventLocationType',
            }
          },
        },
      },
      durationProps: {
        type: 'lookup',
        caption: this.$t('Common.DurationRequired'),
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
      timezonefield: {
        caption: this.$t('Common.Timezone'),
        type: 'Timezone',
        fieldName: 'session.Timezone',
      },
    }
  },
  computed: {
    startField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: this.$t('Common.StartDateTime'),
        type: 'datetime',
      }
    },
    startDateRule() {
      return [
        (v) => {
          if (!v) {
            return this.$t('Messages.Error.ThisFieldRequired')
          }
          const startDate = new Date(new Date(v).toLocaleString())
          const eventStartDate = new Date(
            new Date(this.eventDetails.StartDate).toLocaleString()
          )
          const eventEndDate = new Date(
            new Date(this.eventDetails.EndDate).toLocaleString()
          )
          return startDate < eventStartDate || startDate > eventEndDate
            ? this.$t('Messages.Error.SessionStartDate')
            : true
        },
      ]
    },
  },
  methods: {
    locationChanged(value) {
      if (value !== 'Venue') {
        this.venueAddress = {
          AddressLine: '',
          City: '',
          State: '',
          Country: '',
          PostalCode: '',
          LatLng: { lat: 0.0, lng: 0.0 },
        }
        this.addresslineMessage = ''
      }
      if (value !== 'Online event') {
        this.session.WebinarLink = ''
      }
    },
    openDialog() {
      if (this.isEdit) {
        const container = Object.keys(this.item[0]).length
          ? { ...this.item[0] }
          : {}
        container.StartDate = container.StartDate
          ? new Date(
              utcToZonedTime(new Date(container.StartDate), container.Timezone)
            )
          : ''
        if (
          container.Duration === 15 ||
          container.Duration === 30 ||
          container.Duration === 45 ||
          container.Duration === 60
        ) {
          container.Duration += ''
        } else {
          this.isCustomMin = true
          this.customDuration = container.Duration
          container.Duration = '0'
        }
        this.session = { ...container }
        if (container.LocationType === 'Venue') {
          this.venueAddress = { ...container._CurrentAddress }
          delete this.venueAddress.id
          delete this.venueAddress.LatLng
        }
      } else {
        this.session.StartDate = new Date(this.eventDetails.StartDate)
        if (this.session.StartDate.getSeconds()) {
          this.session.StartDate.setMinutes(
            this.session.StartDate.getMinutes() + 1
          )
        }
        this.session.Duration = '60'
      }
      this.dialog = true
    },
    changeDuration(value) {
      if (value === '0') {
        this.isCustomMin = true
      } else {
        this.isCustomMin = false
      }
    },
    getBitpodVirtualLink() {
      if (!this.isEdit || !this.session.BitpodVirtualLink) {
        const randomStr = Math.random().toString(36).substring(2, 6)
        const roomName = `/${this.eventDetails.UniqLink}-${(
          this.session.Name || 'Session_Name'
        )
          .split(' ')[0]
          .replace(/[^a-zA-Z ]/g, '')}-${randomStr}`
        this.session.BitpodVirtualLink = `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}${roomName}`
      }
    },
    ticketProps() {
      const items = this.ticketOptions
      return {
        type: 'lookup',
        multiple: true,
        caption: this.$t('Common.Tickets'),
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
        caption: this.$t('Common.Speakers'),
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
        value === ' ' || value === ''
          ? this.$t('Messages.Error.ThisFieldRequired')
          : ''
      this.venueAddress.AddressLine = value
    },
    getAddressData(addressData, placeResultData, id) {
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      if (!this.venueAddress.LatLng) {
        this.venueAddress.LatLng = {
          lat: '',
          lng: '',
        }
      }
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
      const baseUrl = this.$bitpod.getApiUrl()
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
      if (this.session.LocationType === 'Venue') {
        if (this.venueAddress.AddressLine !== '') {
          this.session._CurrentAddress = this.venueAddress
        } else {
          this.addresslineMessage = this.$t('Messages.Error.ThisFieldRequired')
          return
        }
      } else {
        delete this.session._CurrentAddress
      }
      this.session.StartDate = new Date(
        zonedTimeToUtc(this.session.StartDate, this.session.Timezone)
      )
      try {
        if (this.session.Duration === '0') {
          this.session.Duration = this.customDuration
        }
        this.session.Duration = parseInt(this.session.Duration)
        if (this.isEdit) {
          res = await this.$axios.$patch(
            `${baseUrl}Sessions/${this.session.id}`,
            {
              ...this.session,
            }
          )
        } else {
          res = await this.$axios.$post(`${baseUrl}Sessions`, {
            ...this.session,
          })
        }
      } catch (e) {
        console.error(
          `Error in session grid new session form on Save function - context: create session, eventId - ${this.session.EventId}`
        )
      }
      if (res) {
        if (this.isEdit) {
          this.snackbarText = this.$t('Messages.Success.RecordUpdatedSuccess')
        } else {
          this.snackbarText = this.$t('Messages.Success.RecordCreateSuccess')
        }
        this.snackbar = true
        this.closeForm()
        this.refresh()
      }
    },
    closeForm() {
      this.session.Name = ''
      this.session.Description = ''
      this.session.StartDate = ''
      this.session.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.session.Location = ''
      this.session.Type = ''
      this.session.MySpeaker = ''
      this.session.SessionTicket = ''
      this.session.LocationType = ''
      this.session.WebinarLink = ''
      this.customDuration = '50'
      this.isCustomMin = false
      this.dialog = false
      this.venueAddress = {
        AddressLine: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: '',
        LatLng: { lat: 0.0, lng: 0.0 },
      }
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

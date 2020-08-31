<template>
  <v-form ref="form" v-model="valid">
    <v-dialog
      v-model="eventForm"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            >Edit Event Information</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.Title"
                label="Title *"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <RichText v-model="formData.Description" label="Description" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="custom-date-time-picker">
                <v-datetime-picker
                  v-model="formData.StartDate"
                  label="Start Date *"
                  :text-field-props="textFieldProps"
                  @input="changeStartDate($event)"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
                <span v-show="startdateMessage !== ''" class="error-message">{{
                  startdateMessage
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-datetime-picker
                v-model="formData.EndDate"
                label="End Date *"
                :text-field-props="textFieldProps"
                @input="changeEndDate($event)"
              >
                <template slot="dateIcon">
                  <v-icon>fas fa-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                  <v-icon>fas fa-clock</v-icon>
                </template>
              </v-datetime-picker>
              <span v-show="startdateMessage !== ''" class="error-message">{{
                startdateMessage
              }}</span>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <Timezone
                v-model="formData.Timezone"
                :rules="[() => !!formData.Timezone || 'This field is required']"
                :field="timezonefield"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="formData.Organizer"
                label="Event organizer *"
                :rules="nameRules"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="formData.EventManager"
                label="Event Manager/Team Email *"
                :rules="emailRules"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="tags"
                :items="tagsDropdown"
                label="Tags"
                multiple
                chips
                persistent-hint
              ></v-select>
            </v-col>
            <v-col cols="12">
              <no-ssr>
                <vue-google-autocomplete
                  id="map"
                  ref="address"
                  v-model="VenueAddress.AddressLine"
                  outlined
                  label="Venue Address"
                  classname="form-control"
                  placeholder="Address"
                  @placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </no-ssr>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.VenueName"
                :rules="namerules"
                label="Venue Name *"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.City"
                label="City *"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.State"
                label="State*"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.Country"
                label="Country*"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.PostalCode"
                label="Zip Code*"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn :disabled="!valid" color="primary" depressed @click="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import event from '~/config/apps/event/gql/event.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import strings from '~/strings.js'
import Timezone from '~/components/common/form/timezone'
import { formatTimezoneDateFieldsData } from '~/utility/form.js'

export default {
  props: {
    eventForm: {
      default: false,
    },
  },
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    Timezone,
  },
  data() {
    return {
      loading: 0,
      backupTz: '',
      valid: true,
      address: '',
      startdateMessage: '',
      enddateMessage: '',
      tags: [],
      tagsDropdown: [],
      nameRules: [(v) => !!v || 'Name is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      // textFieldProps: {
      //   appendIcon: 'fa-calendar',
      //   outlined: true,
      // },
      allowSpaces: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
      timezonefield: {
        caption: 'Timezone',
        type: 'Timezone',
        // fieldName: 'formData.Timezone',
      },
      formData: {},
      VenueAddress: {},
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
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    textFieldProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const { EndDate } = this.formData
            let startdateMessage = ''
            if (!StartDate) startdateMessage = strings.FIELD_REQUIRED
            else if (StartDate && EndDate && StartDate > EndDate)
              startdateMessage = strings.EVENT_START_END_DATE
            else if (StartDate < new Date())
              startdateMessage = strings.EVENT_START_DATE
            else startdateMessage = ''
            return startdateMessage || true
            // return startdateMessage.length ? startdateMessage : true
          },
        ],
      }
    },
  },
  mounted() {
    this.getTags()
      .then((res) => {
        this.tagsDropdown = res.map((i) => i.value)
        return res
      })
      .catch((e) => {
        console.log('ee', e)
      })
  },
  methods: {
    close() {
      this.$emit('update:eventForm', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData
      console.log('==addressData==', addressData)
      this.VenueAddress.AddressLine =
        addressData.route + ', ' + addressData.administrative_area_level_1
      this.formData.VenueName = addressData.route
      this.VenueAddress.Country = addressData.country
      this.VenueAddress.City = addressData.locality
      this.VenueAddress.State = addressData.locality
      // this.formData.LatLng.lat = parseInt(addressData.latitude)
      // this.formData.LatLng.lng = parseInt(addressData.longitude)
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPpp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatDatePicker(date) {
      return date ? format(new Date(date), 'PP') : ''
    },
    formatedDate(date, timezone) {
      debugger
      if (date) {
        debugger
        const formattedDate = new Date(date)
        // const timezone = 'America/New_York'
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        // zonedDate could be used to initialize a date picker or display the formatted local date/time

        // Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
        // const pattern = 'PPpp' // 'd.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
        // const output = format(zonedDate, pattern, { timezone })
        return zonedDate
      }
      // return date ? format(zonedDate, 'PPpp', { timezone }) : ''
    },
    changeStartDate() {
      if (this.formData.StartDate === null)
        this.startdateMessage = 'This field is required'
      else if (this.formData.StartDate > this.formData.EndDate)
        this.startdateMessage = 'Start date should not be greater than End date'
      else this.startdateMessage = ''
    },
    changeEndDate() {
      if (this.formData.EndDate === null)
        this.enddateMessage = 'This field is required'
      else if (this.formData.StartDate > this.formData.EndDate)
        this.startdateMessage = 'End date should not be less than End date'
      else this.enddateMessage = null
    },
    onSave() {
      console.log('====e666', this.tags)
      this.formData.Tags = this.tags
      console.log('asdasdasdfdg', this.formData)
      console.log('asdasdasd')
      console.log('======FormData11=======', this.formData)
      const convertedEventRecord = formatTimezoneDateFieldsData(
        this.formData,
        this.fields
      )

      this.formData.StartDate = convertedEventRecord.StartDate

      this.formData.EndDate = convertedEventRecord.EndDate

      this.formData.Timezone = convertedEventRecord.Timezone

      console.log('Modeified111 =====', this.formData)

      Object.assign({}, this.formData, { _VenueAddress: this.VenueAddress })
      delete this.formData.VenueAddress
      delete this.formData._VenueAddress.LatLng
      console.log('======FormData', this.formData)
      this.$axios
        .$patch(
          `https://event.test.bitpod.io/svc/api/Events/${this.$route.params.id}`,
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
          console.log('error', e)
        })
    },
    getTags() {
      return this.$apollo
        .query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: 'EventTags',
              },
            },
          },
        })
        .then((result) => {
          console.log('result====', result)
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          console.log('====res', generalConfig)
          return generalConfig
        })
        .catch((e) => {
          console.log(e)
        })
    },
    dateValidation() {
      this.errorMessage =
        this.formData.EndDate === null ? 'this is error' : this.formData.EndDate
      return this.errorMessage
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
              id: this.$route.params.id,
            },
          },
          badgeFilter: {
            where: {
              EventId: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        const badge = formatGQLResult(data, 'Badge')
        const eventSummary = data.Event.EventGetEventSummery
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.tags = this.formData.Tags
        debugger
        this.formData.StartDate = this.formatedDate(
          this.formData.StartDate,
          this.formData.Timezone
        )
        this.formData.EndDate = this.formatedDate(
          this.formData.EndDate,
          this.formData.Timezone
        )
        console.log('====VenueAddress444', this.datetime)
        console.log('====VenueAddress333', this.tags)
        console.log('====VenueAddress', event._VenueAddress)
        console.log('====VenueAddress1', this.formData._VenueAddress)
        this.VenueAddress =
          this.formData._VenueAddress != null ? this.formData._VenueAddress : {}
        console.log('====FormData', this.formData)
        return {
          event: event.length > 0 ? event[0] : {},
          badge: badge.length > 0 ? badge[0] : {},
          eventSummary,
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
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
}
.v-picker {
  border-radius: 0;
}
.error-message {
  color: red;
  padding: 10px;
  font-size: 12px;
}
</style>

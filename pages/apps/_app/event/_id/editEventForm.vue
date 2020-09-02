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
            <v-col class="d-flex" cols="12" sm="6" md="4">
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
                  :rules="[addressValidation]"
                  placeholder="Venue Address *"
                  @placechanged="getAddressData"
                  @change="addressChanged"
                >
                </vue-google-autocomplete>
                <span style="color: red;" v-if="errorAlert.message != ''">{{
                  errorAlert.message
                }}</span>
              </no-ssr>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.VenueName"
                label="Venue Name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.City"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.State"
                label="State"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.Country"
                label="Country"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="VenueAddress.PostalCode"
                label="Zip Code"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn
            :disabled="!valid || !this.addressLine"
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
      valid: true,
      startdateMessage: '',
      enddateMessage: '',
      tags: [],
      addressLine: '',
      tagsDropdown: [],
      nameRules: [(v) => !!v || 'This field is required'],
      addressRules: [(v) => !!v || 'This is required'],
      errorAlert: {
        message: '',
        visible: false,
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      allowSpaces: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
      timezonefield: {
        caption: 'Timezone',
        type: 'Timezone',
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
          },
        ],
      }
    },
    addressValidation() {
      if (this.addressLine === '') {
        const message = 'This field is required *'
        this.setErrorAlert(true, message)
        return message
      }
      this.setErrorAlert(false, '')
      return true
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
    setErrorAlert(visible, message) {
      this.errorAlert.visible = visible
      this.errorAlert.message = message
    },
    addressChanged(data) {
      this.addressLine = data
    },
    close() {
      this.$emit('update:eventForm', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    getAddressData(addressData, placeResultData, id) {
      this.VenueAddress.AddressLine =
        addressData.route + ', ' + addressData.administrative_area_level_1
      this.formData.VenueName = addressData.route
      this.VenueAddress.Country = addressData.country
      this.VenueAddress.City = addressData.locality
      this.VenueAddress.State = addressData.locality
      // this.formData.LatLng.lat = parseInt(addressData.latitude)
      // this.formData.LatLng.lng = parseInt(addressData.longitude)
    },
    getZonedDateTime(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        return zonedDate
      }
    },
    onSave() {
      this.formData.Tags = this.tags
      const convertedEventRecord = formatTimezoneDateFieldsData(
        this.formData,
        this.fields
      )
      this.formData.StartDate = convertedEventRecord.StartDate
      this.formData.EndDate = convertedEventRecord.EndDate
      this.formData.Timezone = convertedEventRecord.Timezone
      Object.assign({}, this.formData, { _VenueAddress: this.VenueAddress })
      delete this.formData.VenueAddress
      delete this.formData._VenueAddress.LatLng
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
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.tags = this.formData.Tags
        this.addressLine = this.formData._VenueAddress.AddressLine
        this.formData.StartDate = this.getZonedDateTime(
          this.formData.StartDate,
          this.formData.Timezone
        )
        this.formData.EndDate = this.getZonedDateTime(
          this.formData.EndDate,
          this.formData.Timezone
        )
        this.VenueAddress =
          this.formData._VenueAddress != null ? this.formData._VenueAddress : {}
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

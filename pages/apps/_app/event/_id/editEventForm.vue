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
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-2 text-h5">Edit Event Information</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click.native="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" class="mt-3 pb-0">
              <v-text-field
                v-model="formData.Title"
                label="Title *"
                :rules="requiredRule"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-5">
              <span>Description</span>
              <RichText v-model="formData.Description" label="Description" />
            </v-col>
            <v-col
              v-if="formData.BusinessType !== 'Recurring'"
              cols="12"
              sm="6"
              md="4"
              class="pb-0"
            >
              <div class="custom-date-time-picker">
                <CustomDate
                  v-model="StartDate"
                  label="Start Date*"
                  :field="startDateField"
                  :rules="startDateRule"
                  :on-change="changeStartDate"
                  type="datetime"
                />
              </div>
            </v-col>
            <v-col
              v-if="formData.BusinessType !== 'Recurring'"
              cols="12"
              sm="6"
              md="4"
              class="pb-0"
            >
              <CustomDate
                v-model="EndDate"
                label="End Date*"
                :field="endDateField"
                :rules="endDateRule"
                :on-change="changeEndDate"
                type="datetime"
              />
            </v-col>
            <v-col
              v-if="formData.BusinessType !== 'Recurring'"
              class="d-flex pb-0"
              cols="12"
              sm="6"
              md="4"
            >
              <Timezone v-model="formData.Timezone" :field="timezonefield" />
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <v-text-field
                v-model="formData.Organizer"
                label="Event organizer *"
                :rules="requiredRule"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <v-text-field
                v-model="formData.EventManager"
                label="Event Manager/Team Email *"
                :rules="emailRules"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col
              v-if="formData.BusinessType === 'Recurring'"
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="formData.MaxNoRegistrations"
                type="number"
                label="Max registrations per day"
                min="0"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="tags"
                :items="tagsDropdown"
                label="Tags"
                multiple
                chips
                small-chips
                outlined
                persistent-hint
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-if="formData.LocationType === 'Online event'"
                v-model="formData.WebinarLink"
                label="Online Event Link*"
                :rules="requiredRule"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-textarea
                v-if="formData.LocationType === 'Online event'"
                v-model="formData.JoiningInstruction"
                label="Additional online event joining instructions,URL,phone,etc*"
                outlined
                required
                dense
              ></v-textarea>
            </v-col>
            <div
              v-if="
                formData.BusinessType !== 'Recurring' &&
                formData.LocationType !== 'Online event'
              "
              style="display: contents;"
            >
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
                  <span v-if="errorAlert.message != ''" style="color: red;">{{
                    errorAlert.message
                  }}</span>
                </no-ssr>
              </v-col>
              <v-col cols="12" class="mt-6">
                <v-text-field
                  v-model="formData.VenueName"
                  label="Venue Name"
                  outlined
                  dense
                  @change="changeVenueName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.City"
                  label="City"
                  outlined
                  dense
                  @change="changeCity"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.State"
                  label="State"
                  outlined
                  dense
                  @change="changeState"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.Country"
                  label="Country"
                  outlined
                  dense
                  @change="changeCountry"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.PostalCode"
                  label="Zip Code"
                  outlined
                  dense
                  @change="changeZipCode"
                ></v-text-field>
              </v-col>
            </div>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            :disabled="VenueAddress.AddressLine === '' || !valid"
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
import { email, required } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import strings from '~/strings.js'
import Timezone from '~/components/common/form/timezone'
import { formatTimezoneDateFieldsData } from '~/utility/form.js'
import { getApiUrl } from '~/utility'
import CustomDate from '~/components/common/form/date.vue'

export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    Timezone,
    CustomDate,
  },
  props: {
    eventForm: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
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
      requiredRule: [required],
      errorAlert: {
        message: '',
        visible: false,
      },
      emailRules: [required, email],
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
      StartDate: null,
      EndDate: null,
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
    addressValidation() {
      if (this.addressLine === '') {
        const message = strings.FIELD_REQUIRED
        this.setErrorAlert(true, message)
        return message
      }
      this.setErrorAlert(false, '')
      return true
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
          const startDate = new Date(v)
          return startDate > new Date(this.EndDate)
            ? strings.START_END_DATE
            : true
        },
      ]
    },
    endDateRule() {
      return [
        (v) => {
          const endDate = new Date(v)
          return new Date(this.StartDate) > endDate
            ? strings.END_START_DATE
            : true
        },
      ]
    },
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('EventTags')
      if (res) {
        this.tagsDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventForm while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
  },

  methods: {
    onReset() {
      this.$refs.form.reset()
    },
    changeStartDate(value) {
      this.$refs.form.validate()
    },
    changeEndDate(value) {
      this.$refs.form.validate()
    },
    setErrorAlert(visible, message) {
      this.errorAlert.visible = visible
      this.errorAlert.message = message
    },
    addressChanged(data) {
      this.addressLine = data
      this.VenueAddress.AddressLine = data
    },
    changeVenueName(data) {
      this.formData.VenueName = data
    },
    changeCity(data) {
      this.VenueAddress.City = data
    },
    changeState(data) {
      this.VenueAddress.State = data
    },
    changeCountry(data) {
      this.VenueAddress.Country = data
    },
    changeZipCode(data) {
      this.VenueAddress.PostalCode = data
    },
    close() {
      this.$emit('update:eventForm', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    getAddressData(addressData, placeResultData, id) {
      this.VenueAddress.AddressLine = addressData.route
      this.formData.VenueName = addressData.route
      this.VenueAddress.Country = addressData.country
      this.VenueAddress.City = addressData.locality
      const venue = placeResultData.address_components.find(
        (i) =>
          addressData.administrative_area_level_1 &&
          i.short_name === addressData.administrative_area_level_1
      )
      this.VenueAddress.State = venue ? venue.long_name : ''
      this.VenueAddress.PostalCode = addressData.postal_code || ''
    },
    getZonedDateTime(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        return zonedDate
      }
    },
    async onSave() {
      const url = getApiUrl()
      this.formData.Tags = this.tags
      this.formData.StartDate = this.StartDate
      this.formData.EndDate = this.EndDate

      if (
        this.formData.BusinessType !== 'Recurring' ||
        this.formData.StartDate !== null ||
        this.formData.EndDate !== null
      ) {
        const convertedEventRecord = formatTimezoneDateFieldsData(
          this.formData,
          this.fields
        )
        this.formData.StartDate = convertedEventRecord.StartDate
        this.formData.EndDate = convertedEventRecord.EndDate
        this.formData.Timezone = convertedEventRecord.Timezone
      } else {
        this.formData.StartDate = null
        this.formData.EndDate = null
      }
      if (this.formData.BusinessType !== 'Recurring') {
        Object.assign({}, this.formData, { _VenueAddress: this.VenueAddress })
        delete this.formData.VenueAddress
        delete this.formData._VenueAddress.LatLng
        try {
          const res = await this.$axios.$patch(
            `${url}Events/${this.$route.params.id || this.id}`,
            {
              ...this.formData,
            }
          )
          if (res) {
            this.close()
            this.refresh()
            this.data.event = res
          }
        } catch (e) {
          console.log(
            `Error in pages/apps/event/_id/editEventForm while making a PATCH call to Event model from method onSave context:-Url:-${url},FormData:-${this.formData}`,
            e
          )
        }
      } else {
        this.formData.MaxNoRegistrations = parseInt(
          this.formData.MaxNoRegistrations
        )
        delete this.formData._VenueAddress
        try {
          const res = await this.$axios.$patch(
            `${url}Events/${this.$route.params.id || this.id}`,
            {
              ...this.formData,
            }
          )
          if (res) {
            this.close()
            this.refresh()
            return (this.data.event = res)
          }
        } catch (e) {
          console.log(
            `Error in pages/apps/event/_id/editEventForm while making a PATCH call to Event model from method onSave context:-Url:-${url},FormData:-${this.formData}`,
            e
          )
        }
      }
    },
    async getDropDownData(filterType) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: filterType,
              },
            },
          },
        })
        if (result) {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/event/_id/editEventSettings while making a GQL call to GeneralConfiguration model from method getDropDownData`,
          e
        )
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
          badgeFilter: {
            where: {
              EventId: this.$route.params.id || this.id,
            },
          },
          eventId: this.$route.params.id || this.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.tags = this.formData.Tags
        if (
          this.formData.BusinessType !== 'Recurring' &&
          this.formData.StartDate !== null &&
          this.formData.EndDate !== null
        ) {
          this.addressLine =
            this.formData._VenueAddress &&
            this.formData._VenueAddress.AddressLine
          this.StartDate = this.getZonedDateTime(
            this.formData.StartDate,
            this.formData.Timezone
          )
          this.EndDate = this.getZonedDateTime(
            this.formData.EndDate,
            this.formData.Timezone
          )
          this.VenueAddress =
            this.formData._VenueAddress != null
              ? this.formData._VenueAddress
              : {}
        } else {
          this.StartDate = this.formData.StartDate
            ? this.getZonedDateTime(
                this.formData.StartDate,
                this.formData.Timezone
              )
            : null
          this.EndDate = this.formData.EndDate
            ? this.getZonedDateTime(
                this.formData.EndDate,
                this.formData.Timezone
              )
            : null
        }
        // this.setEventData()
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

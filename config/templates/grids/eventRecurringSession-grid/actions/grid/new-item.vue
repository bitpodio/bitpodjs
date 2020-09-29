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
          <v-icon left>mdi-plus</v-icon> New Recurring Session
        </v-btn>
      </template>
      <v-card>
        <div v-if="timeSlotMessage !== ''" class="red--text pa-3 pt-0 body-1">
          {{ timeSlotMessage }}
        </div>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-10 pb-9">New Session</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                  Basic Information
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="session.Name"
                  label="Name*"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.Type"
                  :field="typeProps"
                  :rules="required"
                  :on-change="changeType"
                />
              </v-col>
              <v-col v-if="isGroup" cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="session.MaxAllow"
                  label="Max Allow*"
                  outlined
                  type="number"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-clock" aria-hidden="true"></i>
                  Session Time
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.StartTime"
                  :field="startTimeProps"
                  :rules="required"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.EndTime"
                  :field="endTimeProps"
                  :rules="required"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Timezone
                  v-model="session.Timezone"
                  :rules="requiredRules"
                  :field="timezonefield"
                  dense
                  class="v-timezone"
                ></Timezone>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.Duration"
                  :field="durationProps"
                  @change="changeDuration"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="isCustomMin" cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="customDuration"
                  label="Duration"
                  outlined
                  type="number"
                  min="1"
                  :rules="durationRules"
                  dense
                  @change="setCustomDuration($event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-location" aria-hidden="true"></i>
                  Location
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <Lookup
                  v-model="session.LocationType"
                  :field="locationTypeProps"
                  :rules="required"
                />
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
                  label="Seat Reservation"
                ></v-checkbox>
              </v-col>
              <v-col
                v-if="session.LocationType === 'In-person meeting'"
                cols="12"
                class="mt-3"
              >
                <Lookup
                  v-model="session.LocationId"
                  :field="inPersonMeetingProps"
                  :rules="personMeetingRules"
                />
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
              <v-col cols="12" class="pb-0">
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
              <!-- </v-row>
            <v-row> -->
              <v-col v-if="session.LocationType === 'Custom'" cols="12">
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
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-help-circle" aria-hidden="true"></i>
                  When can session be scheduled?
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <Lookup
                  v-model="session.ScheduledType"
                  :value="ScheduledType"
                  :field="scheduledTypeProps"
                />
              </v-col>
              <v-col
                v-if="session.ScheduledType === 'Over a period of rolling days'"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="session.RollingDays"
                  label="Rolling Days"
                  outlined
                  type="number"
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                v-if="session.ScheduledType === 'Over a date range'"
                cols="12"
                sm="6"
                md="4"
                class="pb-0"
              >
                <v-datetime-picker
                  v-model="session.StartDate"
                  label="Start Date*"
                  :text-field-props="startDateProps"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
                <!-- <CustomDate
                  v-model="session.StartDate"
                  label="Start Date*"
                  :field="startDateField"
                  :rules="startDateRule"
                  :on-change="changeStartDate"
                  type="date"
                /> -->
              </v-col>
              <v-col
                v-if="session.ScheduledType === 'Over a date range'"
                cols="12"
                sm="6"
                md="4"
              >
                <v-datetime-picker
                  v-model="session.EndDate"
                  label="End Date*"
                  :text-field-props="endDateProps"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
                <!-- <CustomDate
                  v-model="session.EndDate"
                  label="End Date*"
                  :field="endDateField"
                  :rules="endDateRule"
                  :on-change="changeEndDate"
                  type="date"
                /> -->
              </v-col>
            </v-row>
            <div class="col-md-12 pl-0">
              <v-flex class="d-flex justify-center align-center pb-1">
                <h2 class="body-1 pb-1">
                  <i class="fa fa-help-circle" aria-hidden="true"></i>
                  Working Day?
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
            </div>
            <v-row>
              <v-col v-for="(day, k) in days" :key="k" cols="4" class="py-0">
                <v-checkbox
                  v-model="day.Value"
                  :label="day.Label"
                  class="mt-0"
                  height="20"
                  @change="selectDays(day)"
                ></v-checkbox>
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
// import { getApiUrl } from '~/utility/index.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import location from '~/config/apps/event/gql/location.gql'
import { getIdFromAtob } from '~/utility'
// import CustomDate from '~/components/common/form/date.vue'
import { getApiUrl } from '~/utility/index.js'
export default {
  components: {
    // CustomDate,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
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
      valid: false,
      required: [required],
      dialog: false,
      isSaveButtonDisabled: false,
      isCustomMin: false,
      isGroup: false,
      InPersonMeeting: [],
      inPersonMeetingOptions: [],
      customDuration: 15,
      timeSlotMessage: '',
      requiredRules: [required],
      ScheduledType: 'Over a period of rolling days',
      zoomDocumentLink: strings.ZOOM_DOCUMENT_LINK,
      googleMeetDocumentLink: strings.GOOGLE_MEET_DOCUMENT_LINK,
      session: {
        MaxAllow: 5,
        StartDate: '',
        EndDate: '',
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
      selectedDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      phoneRules: [
        (v) => {
          if (v && !isNaN(v)) {
            return true
          }
          return strings.INVALID_PHONE_MSG
        },
      ],
      durationRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return strings.DURATION_RANGE
        },
      ],
      personMeetingRules: [
        (v) => {
          if (v.length > 0) {
            return true
          }
          return strings.LOCATION_MSG
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
      startTimeProps: {
        type: 'lookup',
        caption: 'Start Time*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      endTimeProps: {
        type: 'lookup',
        caption: 'End Time*',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'AvailableHour',
            }
          },
        },
      },
      durationProps: {
        type: 'lookup',
        caption: 'Duration',
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
      scheduledTypeProps: {
        type: 'lookup',
        caption: 'Event Scheduled',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'ScheduledType',
            }
          },
        },
      },
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'session.Timezone',
      },
      days: [
        {
          Label: 'Sundays',
          Value: false,
        },
        {
          Label: 'Mondays',
          Value: true,
        },
        {
          Label: 'Tuesdays',
          Value: true,
        },
        {
          Label: 'Wednesdays',
          Value: true,
        },
        {
          Label: 'Thursdays',
          Value: true,
        },
        {
          Label: 'Fridays',
          Value: true,
        },
        {
          Label: 'Saturdays',
          Value: false,
        },
      ],
    }
  },
  computed: {
    startDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const startDate = new Date(v)
            return startDate > new Date(this.EndDate)
              ? strings.START_END_DATE
              : true
            // const StartDate = v && new Date(v)
            // const { EndDate } = this.eventData
            // let startDateMessage = ''
            // if (!StartDate) startDateMessage = strings.FIELD_REQUIRED
            // else if (StartDate && EndDate && StartDate > EndDate)
            //   startDateMessage = strings.EVENT_START_END_DATE
            // else if (StartDate < new Date())
            //   startDateMessage = strings.EVENT_START_DATE
            // else startDateMessage = ''
            // return startDateMessage || true
          },
        ],
      }
    },
    endDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const endDate = new Date(v)
            return new Date(this.StartDate) > endDate
              ? strings.END_START_DATE
              : true
            // const EndDate = v && new Date(v)
            // const { StartDate } = this.eventData
            // let endDateMessage = ''
            // if (!EndDate) endDateMessage = strings.FIELD_REQUIRED
            // else if (StartDate && EndDate && StartDate > EndDate)
            //   endDateMessage = strings.EVENT_START_END_DATE
            // else if (EndDate < new Date())
            //   endDateMessage = strings.EVENT_END_DATE
            // else endDateMessage = ''
            // return endDateMessage || true
          },
        ],
      }
    },
    inPersonMeetingProps() {
      const items = this.inPersonMeetingOptions
      return {
        type: 'lookup',
        multiple: true,
        caption: 'Location',
        items,
        dataSource: {
          items,
          itemText: 'Name',
          itemValue: 'id',
        },
      }
    },
    // startDateField() {
    //   return {
    //     appendIcon: 'fa-calendar',
    //     outlined: true,
    //     caption: 'Start Date',
    //     type: 'datetime',
    //   }
    // },
    // endDateField() {
    //   return {
    //     appendIcon: 'fa-calendar',
    //     outlined: true,
    //     caption: 'End Date',
    //     type: 'datetime',
    //   }
    // },
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
  methods: {
    removeDay(day) {
      let removeIndex
      this.selectedDays.forEach((d, i) => {
        if (d === 'monday' && day.Label === 'Mondays') {
          removeIndex = i
        }
        if (d === 'tuesday' && day.Label === 'Tuesdays') {
          removeIndex = i
        }
        if (d === 'wednesday' && day.Label === 'Wednesdays') {
          removeIndex = i
        }
        if (d === 'thursday' && day.Label === 'Thursdays') {
          removeIndex = i
        }
        if (d === 'friday' && day.Label === 'Fridays') {
          removeIndex = i
        }
        if (d === 'saturday' && day.Label === 'Saturdays') {
          removeIndex = i
        }
        if (d === 'sunday' && day.Label === 'Sundays') {
          removeIndex = i
        }
      })
      this.selectedDays.splice(removeIndex, 1)
    },
    addDay(day) {
      let dayName
      if (day.Label === 'Mondays') {
        dayName = 'monday'
      }
      if (day.Label === 'Tuesdays') {
        dayName = 'tuesday'
      }
      if (day.Label === 'Wednesdays') {
        dayName = 'wednesday'
      }
      if (day.Label === 'Thursdays') {
        dayName = 'thursday'
      }
      if (day.Label === 'Fridays') {
        dayName = 'friday'
      }
      if (day.Label === 'Saturdays') {
        dayName = 'saturday'
      }
      if (day.Label === 'Sundays') {
        dayName = 'sunday'
      }
      this.selectedDays.push(dayName)
    },
    selectDays(d) {
      if (d.Value === true) {
        this.addDay(d)
      } else {
        this.removeDay(d)
      }
    },

    // changeStartDate(value) {
    //   this.$refs.form.validate()
    // },
    // changeEndDate(value) {
    //   this.$refs.form.validate()
    // },
    changeAddressData(value) {
      this.addresslineMessage = value === '' ? strings.FIELD_REQUIRED : ''
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
      this.MaxAllow = parseInt(this.session.MaxAllow) || 5
      this.isGroup = value === 'Group'
    },
    changeDuration(value) {
      if (value === '0') {
        this.isCustomMin = true
        this.Duration = this.customDuration
      } else {
        this.isCustomMin = false
      }
    },
    setCustomDuration(value) {
      this.Duration = value
    },
    openWindow(link) {
      window.open(link, '_blank')
    },
    async onSave() {
      if (this.session.StartTime > this.session.EndTime) {
        this.timeSlotMessage = 'End time should be greater than start time.'
        return
      } else {
        this.timeSlotMessage = ''
      }
      if (this.session.LocationType === 'Custom') {
        this.session._CurrentAddress = this.venueAddress
      }
      console.log('==days==', this.days)

      const ObjectID5 = (
        m = Math,
        d = Date,
        h = 16,
        s = (s) => m.floor(s).toString(h)
      ) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
      const _Exceptions = this.selectedDays.map((item, key) => {
        return {
          id: ObjectID5(),
          type: 'wday',
          wday: item,
          _intervals: [
            {
              id: ObjectID5(),
              from: this.session.StartTime,
              to: this.session.EndTime,
            },
          ],
        }
      })

      // this.session._Exceptions = Exceptions
      this.session.RollingDays = parseInt(this.session.RollingDays)
      this.session.Duration = parseInt(this.session.Duration)
      this.session.Frequency = parseInt(this.session.Duration)
      // this.session.isActive = true
      this.session.EventId = this.$route.params.id
      console.log('==selectedDays==', this.selectedDays)
      console.log('==Exceptions==', _Exceptions)
      const baseUrl = getApiUrl()
      let res = null
      let exceptionRes = null
      try {
        res = await this.$axios.$post(`${baseUrl}Sessions`, {
          ...this.session,
        })
      } catch (e) {
        console.error('Error', e)
      }
      if (res) {
        try {
          exceptionRes = await this.$axios.$patch(
            `${baseUrl}Sessions/${res.id}`,
            {
              _Exceptions,
            }
          )
        } catch (e) {
          console.error('Error', e)
        }
      }
      if (exceptionRes) {
        this.dialog = false
        this.refresh()
        return exceptionRes
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
        }
      },
      update(data) {
        const locationResult = formatGQLResult(data, 'Location')
        this.inPersonMeetingOptions = locationResult.map(({ id, ...rest }) => ({
          id: getIdFromAtob(id),
          ...rest,
        }))
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

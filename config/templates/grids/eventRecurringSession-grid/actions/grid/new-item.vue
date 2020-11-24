<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
    <v-col class="px-0">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon v-if="actionType === 'New'" left>mdi-plus</v-icon>
            <v-icon v-if="actionType === 'Edit'" left class="fs-16"
              >fa-pencil</v-icon
            >
            {{ (actionType === 'New' ? $t('Common.NewRecurringSession') : $t('Drawer.Edit')) }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              {{ (actionType === 'New' ? $t('Common.NewSession') : $t('Common.EditSession')) }}
            </h2>

            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="closeForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text
            v-if="dialog"
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0"
          >
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <div
                v-show="timeSlotMessage !== ''"
                class="col-md-12 pl-0 pb-2 red--text pa-3 pt-0 body-1"
              >
                {{ timeSlotMessage }}
              </div>
              <div class="col-md-12 pl-0 pb-0 pt-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    <i18n path="Common.BasicInformation" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-row v-if="dialog">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.Name"
                    :label="$t('Common.NameRequired')"
                    outlined
                    :rules="[rules.required]"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="session.Type"
                    :field="typeProps"
                    :rules="[rules.required]"
                    :on-change="changeType"
                  />
                </v-col>
                <v-col v-if="isGroup" cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.MaxAllow"
                    :label="$t('Common.MaxAllow')"
                    outlined
                    type="number"
                    :rules="maxAllowRules"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="col-md-12 pl-0 pb-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-clock" aria-hidden="true"></i>
                    <i18n path="Common.SessionTime" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-row v-if="actionType === 'New' && dialog === true">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="session.StartTime"
                    :field="startTimeProps"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="session.EndTime"
                    :field="endTimeProps"
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row v-if="dialog">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Timezone
                    v-model="session.Timezone"
                    :rules="[rules.required]"
                    :field="timezonefield"
                    dense
                    class="v-timezone"
                  ></Timezone>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="Duration1"
                    :field="durationProps"
                    :rules="[rules.required]"
                    @change="changeDuration"
                  />
                </v-col>
              </v-row>
              <v-row v-if="dialog">
                <v-col v-if="isCustomMin" cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="customDuration"
                    :label="$t('Common.DurationRequired')"
                    outlined
                    type="number"
                    min="1"
                    :rules="durationRules"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="col-md-12 pl-0 pb-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-location" aria-hidden="true"></i>
                    <i18n path="Common.Location" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-row v-if="dialog">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="session.LocationType"
                    :field="locationTypeProps"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  v-if="
                    session.LocationType === 'Bitpod Virtual' &&
                    session.Type === 'Group'
                  "
                  cols="12"
                  sm="8"
                >
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
                <v-col
                  v-if="session.LocationType === 'In-person meeting'"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="session.SeatReservation"
                    class="ma-0"
                    :label="$t('Common.SeatReservation')"
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
                    :label="$t('Common.Location')"
                    outlined
                    dense
                    class="st-date"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col
                  v-if="session.LocationType === 'Online meeting'"
                  cols="12"
                  sm="8"
                  md="8"
                >
                  <v-text-field
                    v-model="session.WebinarLink"
                    :label="$t('Common.OnlineMeetingLink')"
                    outlined
                    :rules="[rules.onlineEventLink]"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0 pt-0">
                  <div v-if="session.LocationType === 'Zoom'">
                    <i class="fa fa-bulb" aria-hidden="true"></i>
                    <i18n path="Common.SendZoomJoiningInfo" />
                    <a
                      href=""
                      @click.stop.prevent="openWindow(zoomDocumentLink)"
                      ><i18n path="Common.ClickHere"
                    /></a>
                    <i18n path="Common.ForDocumentation" />
                  </div>
                  <div v-if="session.LocationType === 'Google Meet'">
                    <i class="fa fa-bulb" aria-hidden="true"></i>
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
                    :label="$t('Common.City')"
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
                    :label="$t('Common.State')"
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
                    :label="$t('Common.Country')"
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
                    :label="$t('Common.ZipCode')"
                    outlined
                    dense
                    @change="changeAddress()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="col-md-12 pl-0 pb-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1 primary--text">
                    <i class="fa fa-help-circle" aria-hidden="true"></i>
                    <i18n path="Common.SessionScheduled" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-row v-if="dialog">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <Lookup
                    v-model="session.ScheduledType"
                    :value="ScheduledType"
                    :field="scheduledTypeProps"
                  />
                </v-col>
                <v-col
                  v-if="
                    session.ScheduledType === 'Over a period of rolling days'
                  "
                  cols="12"
                  sm="6"
                  md="4"
                  class="pb-0"
                >
                  <v-text-field
                    v-model="session.RollingDays"
                    :label="$t('Common.RollingDays')"
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
                  <CustomDate
                    v-model="session.StartDate"
                    :label="$t('Common.StartD')"
                    :field="startDateField"
                    type="date"
                    :on-change="changeStartDate"
                  />
                  <div
                    v-show="startDateMessage !== ''"
                    class="red--text pa-0 pt-0 body-10 mt-n6"
                  >
                    {{ startDateMessage }}
                  </div>
                </v-col>
                <v-col
                  v-if="session.ScheduledType === 'Over a date range'"
                  cols="12"
                  sm="6"
                  md="4"
                  class="pb-0"
                >
                  <CustomDate
                    v-model="session.EndDate"
                    :label="$t('Common.EndD')"
                    :field="endDateField"
                    type="date"
                    :on-change="changeEndDate"
                  />
                  <div
                    v-show="endDateMessage !== ''"
                    class="red--text pa-0 pt-0 body-10 mt-n6"
                  >
                    {{ endDateMessage }}
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="dialog">
                <v-col cols="12" class="mt-3">
                  <Lookup
                    v-model="session.SessionTicket"
                    :field="ticketProps()"
                  />
                </v-col>
              </v-row>
              <div class="col-md-12 pl-0">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2
                    v-if="actionType === 'New'"
                    class="body-1 pb-1 primary--text"
                  >
                    <i class="fa fa-help-circle" aria-hidden="true"></i>
                    <i18n path="Common.WorkingDay" />
                  </h2>
                  <h2
                    v-if="actionType === 'Edit'"
                    class="body-1 pb-1 primary--text"
                  >
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    <i18n path="Common.AdvancedSetting" />
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
              </div>
              <v-row v-if="actionType === 'New' && dialog === true">
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
              <v-row v-if="actionType === 'Edit'">
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.Frequency"
                    :label="$t('Common.Frequency')"
                    outlined
                    type="number"
                    :rules="numberRules"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.MinimumSchedulingNotice"
                    :label="$t('Common.MinimumSchedulingNotice')"
                    outlined
                    type="number"
                    :rules="numberRules"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.BufferBefore"
                    :label="$t('Common.BufferBefore')"
                    outlined
                    type="number"
                    :rules="numberRules"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="session.BufferAfter"
                    :label="$t('Common.BufferAfter')"
                    outlined
                    type="number"
                    :rules="numberRules"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-4 pt-2">
                  <RichText
                    v-model="session.Description"
                    class="mb-3"
                    :label="$t('Common.Description')"
                  ></RichText>
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
              ><i18n path="Drawer.Save"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import { rules } from '~/utility/rules.js'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import location from '~/config/apps/event/gql/location.gql'
import { getIdFromAtob } from '~/utility'
import CustomDate from '~/components/common/form/date.vue'
import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    CustomDate,
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
    editDialog: {
      default: false,
      allowSpaces: false,
      type: Boolean,
    },
    items: {
      default: () => [],
      allowSpaces: false,
      type: Array,
    },
    type: {
      default: 'New',
      allowSpaces: false,
      type: String,
    },
  },
  data() {
    const session =
      this.type === 'Edit'
        ? { ...this.items[0] }
        : {
            MaxAllow: 5,
            StartDate: '',
            EndDate: '',
            ScheduledType: 'Over a period of rolling days',
            RollingDays: 30,
            Frequency: '30',
          }
    const actionType = this.type
    const isGroup = session.Type === 'Group'
    const venueAddress =
      this.type === 'Edit' && this.items[0]._CurrentAddress
        ? this.items[0]._CurrentAddress
        : {
            AddressLine: '',
            City: '',
            State: '',
            Country: '',
            PostalCode: '',
            LatLng: {
              lat: 0.0,
              lng: 0.0,
            },
          }
    return {
      rules: rules(this.$i18n),
      snackbar: false,
      timeout: 2000,
      valid: false,
      dialog: false,
      actionType,
      isSaveButtonDisabled: false,
      isCustomMin: false,
      isGroup,
      InPersonMeeting: [],
      inPersonMeetingOptions: [],
      slotOptions: [],
      ticketOptions: [],
      Duration1: '30',
      customDuration: '15',
      timeSlotMessage: '',
      addresslineMessage: '',
      ScheduledType: 'Over a period of rolling days',
      zoomDocumentLink: nuxtconfig.integrationLinks.ZOOM_DOCUMENT_LINK,
      startDateMessage: '',
      endDateMessage: '',
      googleMeetDocumentLink:
        nuxtconfig.integrationLinks.GOOGLE_MEET_DOCUMENT_LINK,
      sessionResult: [],
      session,
      venueAddress,

      selectedDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      phoneRules: [
        (v) => {
          if (v && !isNaN(v)) {
            return true
          }
          return this.$t('Messages.Error.PleaseEnterValidPhone')
        },
      ],
      durationRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return this.$t('Messages.Error.DurationGreaterMsg')
        },
      ],
      maxAllowRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return this.$t('Messages.Error.MaxAllowMsg')
        },
      ],
      numberRules: [
        (v) => {
          if (!v || v > -1) {
            return true
          }
          return 'value should not be negative'
        },
      ],
      personMeetingRules: [
        (v) => {
          if (v.length > 0) {
            return true
          }
          return this.$t('Messages.Error.SelectLocation')
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
      smalllocationTypeProps: {
        type: 'lookup',
        caption: 'Location type*',
        dataSource: {
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'EventLocationType',
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
    }
  },
  computed: {
    snackbarText() {
      return this.actionType === 'New'
        ? this.$t('Messages.Success.RecurringSessionCreatedSuccess')
        : this.$t('Messages.Success.RecurringSessionUpdatedSuccess')
    },
    durationProps() {
      return {
        type: 'lookup',
        caption: this.$t('Common.Duration'),
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
      }
    },
    days() {
      return [
        {
          Label: this.$t('Common.Sundays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Mondays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Tuesdays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Wednesdays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Thursdays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Fridays'),
          Value: false,
        },
        {
          Label: this.$t('Common.Saturdays'),
          Value: false,
        },
      ]
    },
    slotLookupOptions() {
      const items = this.slotOptions
      return items
    },
    locationLookupOptions() {
      const items = this.inPersonMeetingOptions
      return items
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
    startDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date',
        type: 'date',
      }
    },
    endDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date',
        type: 'date',
      }
    },
    startDateRule() {
      return [
        (v) => {
          const startDate = new Date(v)
          return startDate > new Date(this.session.EndDate)
            ? this.$t('Messages.Error.StartEndDate')
            : true
        },
      ]
    },
    endDateRule() {
      return [
        (v) => {
          const endDate = new Date(v)
          return new Date(this.session.StartDate) > endDate
            ? this.$t('Messages.Error.EndStartDate')
            : true
        },
      ]
    },
  },
  watch: {
    items(newVal, oldVal) {
      this.$apollo.queries.data.refresh()
      this.session =
        this.type === 'Edit'
          ? { ...this.items[0] }
          : {
              MaxAllow: 5,
              StartDate: '',
              EndDate: '',
              ScheduledType: 'Over a period of rolling days',
              RollingDays: 30,
              Frequency: '30',
            }
      this.actionType = this.type
      this.isGroup = this.session.Type === 'Group'
      this.venueAddress =
        this.type === 'Edit' && this.items[0]._CurrentAddress
          ? this.items[0]._CurrentAddress
          : {
              AddressLine: '',
              City: '',
              State: '',
              Country: '',
              PostalCode: '',
              LatLng: {
                lat: 0.0,
                lng: 0.0,
              },
            }
    },
  },
  methods: {
    getBitpodVirtualLink() {
      const randomStr = Math.random().toString(36)
      const roomName = `/${randomStr.substring(2, 5)}-${randomStr.substring(
        5,
        8
      )}-${randomStr.substring(8, 11)}`
      this.session.BitpodVirtualLink = `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}${roomName}`
    },
    closeForm() {
      this.dialog = false
      this.resetForm()
      this.$parent.$parent.$parent.$data.selectedItems = []
    },
    resetForm() {
      this.dialog = false
      this.$apollo.queries.data.refresh()
      this.session.Name = ''
      this.session.Type = ''
      this.session.StartTime = ''
      this.session.EndTime = ''

      this.session.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.Duration1 = '30'
      this.session.LocationType = ''
      this.session.LocationId = ''

      this.session.SeatReservation = false
      this.session.Phone = ''
      this.session.WebinarLink = ''
      this.session.SessionTicket = ''

      this.session.RollingDays = '30'
      this.session.MaxAllow = 5
      this.session.ScheduledType = 'Over a period of rolling days'
      this.session.Frequency = '30'
      this.session.SessionTicket = ''

      this.venueAddress.AddressLine = ''
      this.venueAddress.City = ''
      this.venueAddress.State = ''
      this.venueAddress.Country = ''
      this.venueAddress.PostalCode = ''
      this.customDuration = '15'
      this.isGroup = false
      this.isCustomMin = false
    },
    ticketProps() {
      const items = this.ticketOptions
      return {
        type: 'lookup',
        multiple: true,
        caption: 'Select tickets for this session',
        items,
        dataSource: {
          items,
          itemText: 'Code',
          itemValue: 'id',
        },
      }
    },
    setSelectedDays(selectedDays) {
      selectedDays.map((x) => {
        this.days.map((day) => {
          if (x === 'monday' && day.Label === this.$t('Common.Mondays')) {
            day.Value = true
          }
          if (x === 'tuesday' && day.Label === 'Tuesdays') {
            day.Value = true
          }
          if (x === 'wednesday' && day.Label === this.$t('Common.Wednesdays')) {
            day.Value = true
          }
          if (x === 'thursday' && day.Label === this.$t('Common.Thursdays')) {
            day.Value = true
          }
          if (x === 'friday' && day.Label === this.$t('Common.Fridays')) {
            day.Value = true
          }
          if (x === 'saturday' && day.Label === this.$t('Common.Saturdays')) {
            day.Value = true
          }
          if (x === 'sunday' && day.Label === this.$t('Common.Sundays')) {
            day.Value = true
          }
        })
      })
    },
    getMaxEnd(arr) {
      if (arr.length === 0) return false
      arr.sort(function (a, b) {
        if (a.end < b.end) return 1
        if (a.end > b.end) return -1
        return 0
      })
      return arr[0].end
    },

    partitionIntoOverlappingRanges(array) {
      array.sort(function (a, b) {
        if (a.start < b.start) return -1
        if (a.start > b.start) return 1
        return 0
      })

      const rarray = []
      let g = 0
      rarray[g] = [array[0]]

      for (let i = 1, l = array.length; i < l; i++) {
        if (
          array[i].start >= array[i - 1].start &&
          array[i].start < this.getMaxEnd(rarray[g])
        ) {
          rarray[g].push(array[i])
        } else {
          g++
          rarray[g] = [array[i]]
        }
      }
      for (let i = 0; i < rarray.length; i++) {
        if (rarray[i].length > 1) {
          return true
        }
      }
      return false
    },
    removeDay(day) {
      let removeIndex
      this.selectedDays.forEach((d, i) => {
        if (d === 'monday' && day.Label === 'Mondays') {
          removeIndex = i
        }
        if (d === 'tuesday' && day.Label === 'Tuesdays') {
          removeIndex = i
        }
        if (d === 'wednesday' && day.Label === this.$t('Common.Wednesdays')) {
          removeIndex = i
        }
        if (d === 'thursday' && day.Label === this.$t('Common.Thursdays')) {
          removeIndex = i
        }
        if (d === 'friday' && day.Label === this.$t('Common.Fridays')) {
          removeIndex = i
        }
        if (d === 'saturday' && day.Label === this.$t('Common.Saturdays')) {
          removeIndex = i
        }
        if (d === 'sunday' && day.Label === this.$t('Common.Sundays')) {
          removeIndex = i
        }
      })
      this.selectedDays.splice(removeIndex, 1)
    },
    addDay(day) {
      let dayName
      if (day.Label === this.$t('Common.Mondays')) {
        dayName = 'monday'
      }
      if (day.Label === this.$t('Common.Tuesdays')) {
        dayName = 'tuesday'
      }
      if (day.Label === this.$t('Common.Wednesdays')) {
        dayName = 'wednesday'
      }
      if (day.Label === this.$t('Common.Thursdays')) {
        dayName = 'thursday'
      }
      if (day.Label === this.$t('Common.Fridays')) {
        dayName = 'friday'
      }
      if (day.Label === this.$t('Common.Saturdays')) {
        dayName = 'saturday'
      }
      if (day.Label === this.$t('Common.Sundays')) {
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

    changeStartDate(v) {
      const startDate = new Date(v)
      this.startDateMessage =
        startDate > new Date(this.session.EndDate)
          ? this.$t('Messages.Error.StartEndDate')
          : ''
      if (this.startDateMessage === '') {
        this.endDateMessage = ''
      }
    },
    changeEndDate(v) {
      const endDate = new Date(v)
      this.endDateMessage =
        new Date(this.session.StartDate) > endDate
          ? this.$t('Messages.Error.EndStartDate')
          : ''
      if (this.endDateMessage === '') {
        this.startDateMessage = ''
      }
    },
    changeAddressData(value) {
      this.addresslineMessage =
        value === ' ' || value === ''
          ? this.$t('Messages.Error.ThisFieldRequired')
          : ''
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
      if (value === 'Group') {
        this.isGroup = true
        this.session.MaxAllow = 5
      } else {
        this.isGroup = false
      }
    },
    changeDuration(value) {
      if (value === '0') {
        this.isCustomMin = true
      } else {
        this.isCustomMin = false
      }
    },

    openWindow(link) {
      window.open(link, '_blank')
    },
    setTicketName() {
      const cloneTickets = JSON.parse(JSON.stringify(this.ticketOptions))
      let TicketName = ''
      this.session.SessionTicket.forEach(function (tid) {
        cloneTickets.forEach(function (ticket) {
          if (tid === ticket.id) {
            if (TicketName === '') {
              TicketName = ticket.Code
            } else {
              TicketName += ',' + ticket.Code
            }
          }
        })
      })
      this.session.TicketName = TicketName
    },
    async onSave() {
      if (this.session.StartTime > this.session.EndTime) {
        this.timeSlotMessage = this.$t('Messages.Error.StartEndTime')
        return
      } else if (this.session.StartTime === this.session.EndTime) {
        this.timeSlotMessage = this.$t('Messages.Error.StartEndTimeEqlMsg')
        return
      } else {
        this.timeSlotMessage = ''
      }
      if (this.session.LocationType === 'Custom') {
        if (this.venueAddress.AddressLine !== '') {
          this.venueAddress.LatLng.__typename &&
            delete this.venueAddress.LatLng.__typename
          this.session._CurrentAddress = this.venueAddress
        } else {
          this.addresslineMessage = this.$t('Messages.Error.ThisFieldRequired')
          return
        }
      } else {
        delete this.session._CurrentAddress
      }
      const tempData = []
      this.sessionResult.push({
        StartTime: this.session.StartTime,
        EndTime: this.session.EndTime,
      })
      this.sessionResult.forEach((row) => {
        let startTime = row.StartTime && row.StartTime.replace(':', '.')
        let endTime = row.EndTime && row.EndTime.replace(':', '.')
        startTime = parseInt(startTime)
        endTime = parseInt(endTime)
        const newsObject = { start: startTime, end: endTime }
        tempData.push(newsObject)
      })
      const isInvalidSlot = this.partitionIntoOverlappingRanges(tempData)
      if (
        this.actionType === 'Edit' ||
        isInvalidSlot === false ||
        (await this.$refs.confirm.open(
          this.$t('Drawer.SessionOverlaps'),
          this.$t('Messages.Warn.OverLapSessionMsg'),
          { color: 'warning' }
        ))
      ) {
        const ObjectID5 = (
          m = Math,
          d = Date,
          h = 16,
          s = (s) => m.floor(s).toString(h)
        ) =>
          s(d.now() / 1000) +
          ' '.repeat(h).replace(/./g, () => s(m.random() * h))
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
        this.session.RollingDays =
          this.session.RollingDays && parseInt(this.session.RollingDays)
        this.session.Duration = this.isCustomMin
          ? parseInt(this.customDuration)
          : parseInt(this.Duration1)
        this.session.MaxAllow =
          this.session.MaxAllow && parseInt(this.session.MaxAllow)
        this.session.EventId = this.$route.params.id

        this.session.MinimumSchedulingNotice = parseInt(
          this.session.MinimumSchedulingNotice
        )

        this.session.BufferBefore =
          this.session.BufferBefore && parseInt(this.session.BufferBefore)
        this.session.BufferAfter =
          this.session.BufferAfter && parseInt(this.session.BufferAfter)
        this.session.Frequency =
          this.session.Frequency && parseInt(this.session.Frequency)
        if (this.session.SessionTicket && this.session.SessionTicket) {
          this.setTicketName()
        }
        const baseUrl = this.$bitpod.getApiUrl()
        let res = null
        let exceptionRes = null

        if (this.actionType === 'New') {
          try {
            res = await this.$axios.$post(`${baseUrl}Sessions`, {
              ...this.session,
            })
          } catch (e) {
            console.error(
              `Error in Recurring session grid new session form on Save function - context: create Recurring session, eventId - ${this.session.EventId} baseUrl - ${baseUrl} session - ${this.session}, error:${e}`
            )
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
              console.error(
                `Error in Recurring session grid new session form on Save function - context: create Recurring session , Schedules,intervals, eventId - ${this.session.EventId} sessionId -${res.id}, baseUrl - ${baseUrl} schedules - ${_Exceptions}, error:${e}`
              )
            }
          }
          if (exceptionRes) {
            this.dialog = false
            this.resetForm()
            this.isGroup = false
            this.refresh()
            this.snackbar = true
            return exceptionRes
          }
        } else if (this.actionType === 'Edit') {
          try {
            res = await this.$axios.$patch(
              `${baseUrl}Sessions/${this.session.id}`,
              {
                ...this.session,
              }
            )
          } catch (e) {
            console.error(
              `Error in Recurring session grid edit session form on Save function - context: edit Recurring session, eventId - ${this.session.EventId}, sessionId - ${this.session.id} baseUrl - ${baseUrl} session - ${this.session}, error:${e}`
            )
          }
          if (res) {
            this.dialog = false
            this.isGroup = false
            this.refresh()
            this.snackbar = true
            return res
          }
        }
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
          orgInfoFilters: {
            where: {},
          },
          fetchPolicy: 'no-cache',
        }
      },
      update(data) {
        const locationResult = formatGQLResult(data, 'Location')
        const ticketResult = formatGQLResult(data, 'Ticket')
        this.sessionResult = formatGQLResult(data, 'Session')
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
        this.ticketOptions = ticketResult.map(({ id, ...rest }) => ({
          id: getIdFromAtob(id),
          ...rest,
        }))
        if (OrganizationInfo[0].weekDay.length > 0) {
          this.setSelectedDays(OrganizationInfo[0].weekDay)
        } else {
          this.setSelectedDays(this.selectedDays)
        }
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

        let filterOption
        if (
          this.slotOptions &&
          this.slotOptions.length > 0 &&
          this.session.Duration
        ) {
          filterOption = this.slotOptions.filter(
            ({ key }) => key === `${this.session.Duration}`
          )
        }
        this.isCustomMin = false
        if (
          filterOption &&
          filterOption.length === 0 &&
          this.session.Duration &&
          this.slotOptions &&
          this.slotOptions.length !== 0
        ) {
          this.Duration1 = '0'
          this.customDuration = `${this.session.Duration}`
          this.isCustomMin = true
        } else if (
          this.slotOptions &&
          this.slotOptions.length === 0 &&
          this.session.Duration
        ) {
          if ([15, 30, 45, 60].includes(this.session.Duration)) {
            this.Duration1 = `${this.session.Duration}`
            this.isCustomMin = false
          } else {
            this.Duration1 = '0'
            this.customDuration = `${this.session.Duration}`
            this.isCustomMin = true
          }
        } else if (this.session.Duration) {
          this.Duration1 = `${this.session.Duration}`
          this.isCustomMin = false
        }
      },
      error(error) {
        this.error = error
      },
    },

    durationOptions: {
      query() {
        return gql`
          ${registrationStatusOptions}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              type: 'EventDuration',
            },
          },
          where: {},
        }
      },
      update(data) {
        this.slotOptions = formatGQLResult(data, 'GeneralConfiguration')
      },
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
  width: 100%;
}
</style>

<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="getQuestions">
          <v-icon left class="fs-16">fa-pencil</v-icon
          ><i18n path="Common.EditItem" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-2 text-h5">
            <i18n path="Common.EditEvent" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" class="mt-3 pb-0">
              <v-text-field
                v-model="formData.Title"
                :label="$t('Common.Title')"
                :rules="[rules.required]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-5">
              <span><i18n path="Common.Description" /> </span>
              <RichText v-model="formData.Description" />
            </v-col>
            <v-form
              ref="dateform"
              v-model="datevalid"
              :lazy-validation="lazy"
              class="px-3 v-data-table__wrapper"
            >
              <v-row>
                <v-col
                  v-if="formData.BusinessType === 'Single'"
                  class="col-6 col-md-6"
                >
                  <v-datetime-picker
                    ref="dateTimeComponent"
                    v-model="StartDate"
                    :label="$t('Common.StartD')"
                    :text-field-props="eventStartDateProps"
                    :on-change="changeStartDate()"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col
                  v-if="formData.BusinessType === 'Single'"
                  class="col-6 col-md-6"
                >
                  <v-datetime-picker
                    ref="dateTimeComponent1"
                    v-model="EndDate"
                    :label="$t('Common.EndD')"
                    :text-field-props="eventEndDateProps"
                    :on-change="changeEndDate()"
                  >
                    <template slot="dateIcon">
                      <v-icon>fas fa-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>fas fa-clock</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col
                  v-if="formData.BusinessType === 'Single'"
                  class="d-flex pb-0"
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <Timezone
                    v-model="formData.Timezone"
                    :field="timezonefield"
                    :value="formData.Timezone"
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <v-select
                v-model="status"
                :items="statusDropdown"
                :label="$t('Common.Status')"
                outlined
                persistent-hint
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <v-text-field
                v-model="formData.Organizer"
                :label="$t('Common.EventOrganizer')"
                :rules="[rules.required]"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <v-text-field
                v-model="formData.EventManager"
                :label="$t('Common.EventManagerTeamEmail')"
                :rules="[rules.required, rules.email]"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col
              v-if="formData.BusinessType === 'Recurring'"
              cols="12"
              md="6"
              sm="6"
            >
              <v-text-field
                v-model="formData.MaxNoRegistrations"
                type="number"
                :label="$t('Common.MaxRegistrationsPerDay')"
                min="0"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <v-select
                v-model="privacy"
                :items="privacyDropdown"
                :label="$t('Common.Privacy')"
                outlined
                persistent-hint
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <v-select
                v-model="currency"
                :items="currencyDropdown"
                :label="$t('Common.CurrencyReq')"
                outlined
                persistent-hint
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="tags"
                :items="tagsDropdown"
                :label="$t('Common.Tags')"
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
                v-if="formData.LocationType === 'Bitpod Virtual'"
                :label="$t('Common.BitpodVirtualLink')"
                outlined
                dense
                disabled
                :value="virtualLink"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-if="formData.LocationType === 'Online event'"
                v-model="formData.WebinarLink"
                :label="$t('Common.OnlineEventLinkReq')"
                :rules="[rules.required]"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-textarea
                v-if="formData.LocationType === 'Online event'"
                v-model="formData.JoiningInstruction"
                :label="$t('Common.AdditionalOnlineEventJoining')"
                outlined
                required
                dense
              ></v-textarea>
            </v-col>
            <div
              v-if="formData.LocationType === 'Venue'"
              style="display: contents"
            >
              <v-col cols="12" class="mt-n6 positionRelative">
                <div v-if="addressClicked" class="address-legend">
                  {{ $t('Common.AddressRequired') }}
                </div>
                <no-ssr>
                  <vue-google-autocomplete
                    id="map"
                    ref="address"
                    v-model="VenueAddress.AddressLine"
                    outlined
                    :label="$t('Common.VenueAddress')"
                    classname="form-control"
                    :rules="[addressValidation]"
                    :placeholder="!addressClicked && $t('Common.Address')"
                    @placechanged="getAddressData"
                    @change="addressChanged"
                    @focus="focusIn"
                    @blur="focusOut"
                  >
                  </vue-google-autocomplete>
                  <span v-if="errorAlert.message != ''" style="color: red">{{
                    errorAlert.message
                  }}</span>
                </no-ssr>
              </v-col>
              <v-col cols="12" class="mt-6">
                <v-text-field
                  v-model="formData.VenueName"
                  :label="$t('Common.VenueName')"
                  outlined
                  dense
                  @change="changeVenueName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                  @change="changeCity"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                  @change="changeState"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                  @change="changeCountry"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="VenueAddress.PostalCode"
                  :label="$t('Common.ZipCode')"
                  outlined
                  dense
                  @change="changeZipCode"
                ></v-text-field>
              </v-col>
            </div>
            <v-col cols="12" class="mb-5">
              <span><i18n path="Common.CancellationPolicy" /> </span>
              <RichText v-model="formData.CancellationPolicy" />
            </v-col>
            <v-col cols="12" class="mb-5">
              <span><i18n path="Common.Message" /> </span>
              <RichText v-model="formData.Message" />
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-checkbox
                v-model="formData.isRefundable"
                :label="$t('Common.AllowCancelation')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-checkbox
                v-model="formData.SessionTimingConflict"
                :label="$t('Common.ValidateSessionTimingConflict')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-checkbox
                v-model="formData.ShowRemainingTickets"
                :label="$t('Common.ShowRemainingTicketsCount')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-checkbox
                v-model="formData.ShowAttendeeForm"
                :label="$t('Common.ShowAttendeeForm')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="pb-0">
              <v-checkbox
                v-model="formData.NotifyOrganizer"
                :label="$t('Common.NotifyOrganizer')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col
              v-if="formData.BusinessType === 'Single'"
              cols="12"
              sm="6"
              md="6"
              class="pb-0"
            >
              <v-checkbox
                v-model="formData.printBadgeOnCheckIn"
                :label="$t('Common.AskToPrintBadgeAfterCheckin')"
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col
              v-if="formData.BusinessType === 'Recurring'"
              cols="12"
              sm="6"
              md="4"
              class="pb-0"
            >
              <v-checkbox
                v-model="formData.showTimezone"
                :label="
                  $t('Common.Allowusertoselectatimezoneforrecurringevent')
                "
                dense
                height="20"
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <div class="mb-5 black--text">
                <i18n path="Common.UploadImages" />
              </div>
              <File
                :field="fileField"
                :value="selectedImage"
                @input="fileUploadedEventBanner"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :disabled="VenueAddress.AddressLine === '' || !valid || !datevalid"
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
import { rules } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import Timezone from '~/components/common/form/timezone'
import SaveBtn from '~/components/common/saveButton'
import File from '~/components/common/form/file.vue'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    Timezone,
    File,
    SaveBtn,
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      fileField: {
        multiple: false,
        caption: 'Event Image(680x350)',
      },
      eventId: this.items[0].id,
      selectedImage: '',
      loading: 0,
      valid: true,
      datevalid: true,
      addressClicked: false,
      startdateMessage: '',
      enddateMessage: '',
      tags: [],
      addressLine: '',
      tagsDropdown: [],
      rules: rules(this.$i18n),
      errorAlert: {
        message: '',
        visible: false,
      },
      allowSpaces: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
      timezonefield: {
        caption: this.$t('Common.TimeZone'),
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
      statusDropdown: [],
      privacyDropdown: [],
      currencyDropdown: [],
      status: '',
      privacy: '',
      currency: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    virtualLink() {
      return `https://${this.$config.integrationLinks.BITOPD_VIRTUAL_LINK}/${this.formData.UniqLink}`
    },
    addressValidation() {
      if (this.addressLine === '') {
        const message = this.$t('Messages.Error.ThisFieldRequired')
        this.setErrorAlert(true, message)
        return message
      }
      this.setErrorAlert(false, '')
      return true
    },
    eventStartDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const StartDate = v && new Date(v)
            const EndDate = new Date(this.EndDate)
            let startDateMessage = ''
            if (!StartDate)
              startDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (StartDate > EndDate)
              startDateMessage = this.$t('Messages.Error.StartEndDate')
            else startDateMessage = ''
            return startDateMessage || true
          },
        ],
      }
    },
    eventEndDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const EndDate = v && new Date(v)
            const StartDate = new Date(this.StartDate)
            let endDateMessage = ''
            if (!EndDate)
              endDateMessage = this.$t('Messages.Error.ThisFieldRequired')
            else if (EndDate < StartDate)
              endDateMessage = this.$t('Messages.Error.EndStartDate')
            else endDateMessage = ''
            return endDateMessage || true
          },
        ],
      }
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
    try {
      const res = await this.getDropDownData('EventStatus')
      if (res) {
        this.statusDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventForm while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('EventPrivacy')
      if (res) {
        this.privacyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventForm while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
    try {
      const res = await this.getDropDownData('Currency')
      if (res) {
        this.currencyDropdown = res.map((i) => i.value)
      }
    } catch (e) {
      console.log(
        `Error in pages/apps/event/_id/editEventForm while making a GQL call to GeneralConfiguration model from method getDropDownData`,
        e
      )
    }
  },
  methods: {
    focusOut() {
      this.addressClicked = false
    },
    focusIn() {
      this.addressClicked = true
    },
    getQuestions() {
      this.dialog = true
    },
    outsideClicked() {
      this.$refs.dateTimeComponent.okHandler()
      this.$refs.dateTimeComponent1.okHandler()
    },
    changeStartDate() {
      this.$refs.dateform && this.$refs.dateform.validate()
      if (this.$refs.dateTimeComponent) {
        this.$refs.dateTimeComponent.$children[0].onClickOutside = this.outsideClicked
      }
    },
    changeEndDate() {
      this.$refs.dateform && this.$refs.dateform.validate()
      if (this.$refs.dateTimeComponent1) {
        this.$refs.dateTimeComponent1.$children[0].onClickOutside = this.outsideClicked
      }
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
    onClose() {
      //   this.$emit('update:eventForm', false)
      //   this.onReset()
      this.dialog = false
    },
    getAddressData(addressData, placeResultData, id) {
      this.addressClicked = true
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
    getUtcToZonedDateTime(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = zonedTimeToUtc(formattedDate, timezone)
        return zonedDate
      }
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.formData.Tags = this.tags
      this.formData.StartDate = this.StartDate
      this.formData.EndDate = this.EndDate
      this.formData.Status = this.status
      this.formData.Privacy = this.privacy
      this.formData.Currency = this.currency
      if (this.selectedImage !== '' || this.formData.Images.length === 0) {
        this.formData.Images = []
        this.formData.Images.push(this.selectedImage)
      } else {
        this.formData.Images = []
      }
      if (
        this.formData.BusinessType !== 'Recurring' ||
        this.formData.StartDate !== null ||
        this.formData.EndDate !== null
      ) {
        this.formData.StartDate = this.getUtcToZonedDateTime(
          this.formData.StartDate,
          this.formData.Timezone
        )
        this.formData.EndDate = this.getUtcToZonedDateTime(
          this.formData.EndDate,
          this.formData.Timezone
        )
      } else {
        this.formData.StartDate = null
        this.formData.EndDate = null
      }
      if (this.formData.BusinessType !== 'Recurring') {
        this.formData._VenueAddress = { ...this.VenueAddress }
        this.formData.SEODesc = this.formData.Description
        delete this.formData.VenueAddress
        delete this.formData._VenueAddress.LatLng
        this.formData._VenueAddress.id = this.formData._VenueAddress.id
          ? atob(this.formData._VenueAddress.id).split(':')[1]
          : ''
        try {
          const res = await this.$axios.$patch(`${url}Events/${this.eventId}`, {
            ...this.formData,
          })
          if (res) {
            this.onClose()
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
        this.formData.SEODesc = this.formData.Description
        delete this.formData._VenueAddress
        try {
          const res = await this.$axios.$patch(`${url}Events/${this.eventId}`, {
            ...this.formData,
          })
          if (res) {
            this.onClose()
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
    fileUploadedEventBanner(data) {
      if (data.length > 0) {
        this.selectedImage = data[0]
      } else {
        this.selectedImage = ''
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
              id: this.items[0].id,
            },
          },
          badgeFilter: {
            where: {
              EventId: this.items[0].id,
            },
          },
          eventId: this.items[0].id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.tags = this.formData.Tags
        this.status = this.formData.Status
        this.privacy = this.formData.Privacy
        this.currency = this.formData.Currency
        this.selectedImage = this.formData.Images
        if (
          this.formData.BusinessType !== 'Recurring' &&
          this.formData.StartDate !== null &&
          this.formData.EndDate !== null
        ) {
          if (this.formData._VenueAddress) {
            this.addressLine = this.formData._VenueAddress.AddressLine
            this.addressClicked = true
          }

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
              ? { ...this.formData._VenueAddress }
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
.address-legend {
  position: absolute;
  background: white;
  font-size: 13px !important;
  left: 20px !important;
  padding: 0 5px;
  top: 3px;
  color: grey;
}
.form-control:focus {
  border: 2px solid #1a73e8 !important;
  outline: #1a73e8;
}
</style>

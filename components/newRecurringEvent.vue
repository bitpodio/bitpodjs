<template>
  <div>
    <v-dialog v-model="isDateRange" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Availability</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isDateRange = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="validDateRange" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" class="mt-4">
                <Lookup
                  v-model="ScheduledType"
                  :value="ScheduledType"
                  :field="scheduledTypeProps"
                  :on-change="changeSchedule"
                />
              </v-col>
              <v-col v-if="isOverPeriod" cols="12">
                <v-text-field
                  v-model="RollingDays"
                  label="Rolling Days"
                  type="number"
                  min="0"
                  outlined
                  :rules="rollingDaysRules"
                ></v-text-field>
              </v-col>
              <v-col v-if="isOverDate" cols="12">
                <CustomDate
                  v-model="StartDate"
                  label="Start Date*"
                  :field="startDateField"
                  :rules="startDateRule"
                  type="date"
                />
                <!-- <v-datetime-picker
                  v-model="StartDate"
                  label="Start Date*"
                  :text-field-props="startDateRule"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker> -->
              </v-col>
              <v-col v-if="isOverDate" cols="12">
                <CustomDate
                  v-model="EndDate"
                  label="End Date*"
                  :field="endDateRule"
                  type="date"
                />
                <!-- <v-datetime-picker
                  v-model="EndDate"
                  label="End Date*"
                  :text-field-props="endDateRule"
                >
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker> -->
              </v-col>
              <div class="col-md-12">
                <v-flex class="d-flex justify-center align-center pb-2">
                  <h2 class="body-1 pb-1">
                    <i class="fa-repeat" aria-hidden="true"></i> Repeating days
                    of the week
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
                <v-divider></v-divider>
              </div>
              <v-col v-for="(day, k) in days" :key="k" cols="4">
                <v-checkbox v-model="day.Value" :label="day.Label"></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setSchedule">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isDateRange = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDuration" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Duration</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isDuration = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="Duration"
                label="Duration"
                type="number"
                min="1"
                :rules="durationRules"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setDuration">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isDuration = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isPhone" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isPhone = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-form ref="phoneform" v-model="validPhone" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="Phone"
                  label="Phone"
                  outlined
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setPhone">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isPhone = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isOnlineMeeting" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isOnlineMeeting = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-form
            ref="meetingform"
            v-model="validOnlineMeeting"
            :lazy-validation="lazy"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="WebinarLink"
                  label="Online meeting link"
                  :rules="onlineMeetingRules"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setOnlineMeeting">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isOnlineMeeting = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isCustom" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isCustom = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-row>
            <v-col cols="12">
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
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="venueAddress.City"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="venueAddress.State"
                label="State"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="venueAddress.Country"
                label="Country"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="venueAddress.ZipCode"
                label="Zip Code"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setCustomLocation">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isCustom = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isPersonMeeting" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isPersonMeeting = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-form
            ref="personmeetingform"
            v-model="validPersonMeeting"
            :lazy-validation="lazy"
          >
            <v-row>
              <v-col cols="12">
                <Lookup
                  v-model="InPersonMeeting"
                  :field="inPersonMeetingProps"
                  :rules="personMeetingRules"
                  :on-change="changePersonMeeting"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setPersonMeeting">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isPersonMeeting = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isSessionTicket" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Change Tickets</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isSessionTicket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-row>
            <v-col cols="12">
              <Lookup v-model="SessionTicket" :field="sessionTicketProps" />
            </v-col>
          </v-row>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setSessionTicket">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isSessionTicket = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isType" max-width="600px" max-height="350px">
      <v-card>
        <v-toolbar dark app color="accent">
          <v-toolbar-title>Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="isType = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="v-location">
          <v-form ref="typeform" v-model="validType" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12">
                <Lookup
                  v-model="Type"
                  :field="typeProps"
                  :on-change="changeType"
                />
              </v-col>
              <v-col v-if="isGroup" cols="12">
                <v-text-field
                  v-model="MaxAllow"
                  label="Max Allow*"
                  min="0"
                  :rules="maxAllowRules"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="pa-4">
          <v-btn color="primary" dark @click="setType">
            Apply
          </v-btn>
          <v-btn color="primary" dark @click="isType = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <div>
      <v-toolbar dark app color="accent">
        <v-toolbar-title>New Recurring Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="stepNumber">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="stepNumber > 1" step="1"
            >Basic Info</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="stepNumber > 2" step="2"
            >Tickets</v-stepper-step
          >
          <v-divider></v-divider>

          <v-stepper-step step="3">Recurring Session</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="stepper-box">
          <v-stepper-content step="1">
            <v-card flat>
              <p>
                Enter event name and details to help your audience learn about
                your event, add details that highlights why someone should
                attend it.
              </p>
              <v-form
                ref="validBasicInfoForm"
                v-model="validBasicInfo"
                :lazy-validation="lazy"
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="eventData.Title"
                      :rules="requiredRules"
                      label="Event Title*"
                      required
                      outlined
                      @change="changeEventName($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <RichText
                      v-model="eventData.Description"
                      class="mb-3"
                      label="Description"
                    ></RichText> </v-col
                  ><br />
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="eventData.UniqLink"
                      label="Event Link*"
                      hint="https://bitpod-event.test.bitpod.io/e/"
                      persistent-hint
                      :rules="requiredRules"
                      outlined
                      required
                      :error-messages="uniqueLinkValidationMsg"
                      @keyup="changeUniqueLink($event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>

            <v-btn color="primary" :disabled="isNextDisabled()" @click="next(2)"
              >Next</v-btn
            >
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card flat>
              <p>
                Setup event tickets and price, you can also set tickets validity
                so early birds can be offered better pricing.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addTicketRow"
                >Add Tickets</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title*</th>
                      <th class="text-left">Type*</th>
                      <th class="text-left">Price</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, k) in tickets" :key="k">
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.Code"
                          :rules="requiredRules"
                          label="Title"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="ticket.Type"
                          :field="ticketTypeProps"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.Amount"
                          label="price"
                          outlined
                          value
                          :disabled="isPriceDisabled(k)"
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="ticket.TicketCount"
                          label="quantity"
                          outlined
                          value
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-btn text small @click="deleteTicket(k)">
                          <v-icon left>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>

            <v-btn color="primary" @click="stepNumber = 1">Prev</v-btn>
            <v-btn color="primary" @click="next(3)">Next</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card v-if="isSession" flat>
              <p>
                Setup event recurrence, sessions availability to help your
                attendees book a time slot.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addSession"
                >Add Recurring Session</v-btn
              >
              <div v-if="isZoom">
                To send Zoom joining info, you must setup Zoom integration,
                <a href="" @click.stop.prevent="openWindow(zoomDocumentLink)"
                  >click here</a
                >
                for documentation.
              </div>
              <div v-if="isGoogleMeet">
                To send google meet joining info, you must setup google meet
                integration,
                <a
                  href=""
                  @click.stop.prevent="openWindow(googleMeetDocumentLink)"
                  >click here</a
                >
                for documentation.
              </div>
              <div v-if="isLocationMessage" class="red--text pa-3 pt-0 body-1">
                {{ locationMessage }}
              </div>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Date Range*</th>
                      <th class="text-left">Start Time*</th>
                      <th class="text-left">End Time*</th>
                      <th class="text-left">Slot Size*</th>
                      <th class="text-left">Timezone</th>
                      <th class="text-left">Location*</th>
                      <th class="text-left">Type*</th>
                      <th class="text-left">Tickets</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(session, k) in sessions" :key="k">
                      <td class="pa-2 pb-0">
                        <span>{{ session.CustomScheduledType }}</span>
                        <v-btn icon small @click="selectSchedule(k)">
                          <v-icon left>mdi-18px mdi-pencil</v-icon>
                        </v-btn>
                        <!-- <v-text-field
                          v-model="session.ScheduledType"
                          :rules="requiredRules"
                          label="Date Range"
                          outlined
                        ></v-text-field> -->
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.StartTime"
                          :field="startTimeProps"
                          :rules="validStartTimeRule(k)"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.EndTime"
                          :field="endTimeProps"
                          :rules="validEndTimeRule(k)"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.Duration"
                          :field="slotSizeProps"
                          :on-change="changeDuration(k)"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Timezone
                          v-model="session.Timezone"
                          :rules="requiredRules"
                          :field="timezonefield"
                        ></Timezone>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.LocationType"
                          :field="locationTypeProps"
                          :rules="requiredRules"
                          required
                          :on-change="changelocationType(k)"
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <!-- <v-text-field
                          v-model="session.Type"
                          label="Type*"
                          outlined
                          value
                        ></v-text-field> -->
                        <span v-if="session.Type === 'Group'"
                          >{{ session.Type }} {{ session.MaxAllow }}
                        </span>
                        <span v-if="session.Type === 'Personal'"
                          >{{ session.Type }}
                        </span>
                        <v-btn icon small @click="selectType(k)">
                          <v-icon left>mdi-18px mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                      <td class="pa-2 pb-0">
                        <!-- <v-text-field
                          v-model="session.Tickets"
                          label="Tickets"
                          outlined
                          value
                        ></v-text-field> -->
                        <span>{{ customTicket }} </span>
                        <v-btn icon small @click="selectSessionTickets(k)">
                          <v-icon left>mdi-18px mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-btn text small @click="deleteSession(k)">
                          <v-icon left>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-btn color="primary" @click="stepNumber = 2">Prev</v-btn>
              <v-btn
                color="primary"
                :disabled="isSaveButtonDisabled"
                @click="saveRecord"
                >Save</v-btn
              >
            </v-card>
            <v-card
              v-else
              outlined
              class="text-center elevation-2 vs-notification pa-5"
            >
              <div v-if="isEventCreate" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle body-1 primary white--text"
                  ></i>
                </div>
                <div class="pb-2 text-uppercase">
                  <span class="text-uppercase Body 1" style="font-size: 20px;"
                    >EVENT HAS BEEN CREATED.</span
                  >
                </div>
                <div class="pb-3 text--primary">
                  Event goers can only register after you publish it. We
                  recommend you click view button to verify your event page and
                  if everything looks as expected then PUBLISH it.
                  <br />
                  You can also use events link from left panel to edit or
                  publish this event any time you like.
                </div>
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon>View</v-btn
                  >
                  <v-btn
                    outlined
                    color="primary"
                    class="ma-1"
                    @click="eventPublish"
                  >
                    <v-icon left>mdi-rotate-315 mdi-send</v-icon> Publish</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
              <div v-if="isEventPublish" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle body-1 primary white--text"
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="pb-2">
                  <span class="text-uppercase Body 1" style="font-size: 20px;">
                    YOUR EVENT HAS BEEN PUBLISHED.</span
                  >
                </div>
                <div class="pb-2 text--primary">
                  Now it is open for registrations, you can click on view to
                  fetch the event landing page URL, which you can share with
                  others, so they can register.
                </div>
                <div class="pb-2">
                  <v-btn
                    depressed
                    color="primary"
                    class="ma-1"
                    @click="viewRegistration"
                    ><v-icon left>mdi-eye-outline</v-icon>View</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import strings from '../strings.js'
import { formatTimezoneDateFieldsData } from '~/utility/form.js'
import { getApiUrl } from '~/utility/index.js'
import Lookup from '~/components/common/form/lookup.vue'
import registrationStatusOptions from '~/config/apps/event/gql/registrationStatusOptions.gql'
import location from '~/config/apps/event/gql/location.gql'
import Timezone from '~/components/common/form/timezone'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import { formatGQLResult } from '~/utility/gql.js'
// import Checkbox from '~/components/common/form/checkbox.vue'
import CustomDate from '~/components/common/form/date.vue'
// import nuxtconfig from '~/nuxt.config'
// function ObjectID5() {
//       return (m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) =>
//         s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
// }
const ObjectID5 = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Lookup,
    Timezone,
    CustomDate,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  props: {
    onFormClose: Function,
  },
  data: () => {
    // const currentDatetime = new Date(new Date().setSeconds(0))
    // const tid = this.ObjectID5()
    return {
      isUniqLinkValid: false,
      valid: true,
      validDateRange: true,
      validPhone: true,
      validOnlineMeeting: true,
      validCustomLocation: true,
      validPersonMeeting: true,
      validType: true,
      validBasicInfo: true,
      lazy: false,
      locationMesssage: '',
      isLocationMessage: false,
      customTicket: 'Ticket',
      slotOptions: [],
      maxAllowRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v >= 0) {
            return true
          }
          return 'Max Allow should be greater than zero'
        },
      ],
      durationRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return 'Duration should be greater than zero'
        },
      ],
      rollingDaysRules: [
        (v) => {
          if (!v && v.trim()) {
            return true
          }
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return 'Rolling days should be greater than zero'
        },
      ],
      phoneRules: [
        (v) => {
          if (v && !isNaN(v)) {
            return true
          }
          return 'Please enter valid phone number!'
        },
      ],
      onlineMeetingRules: [
        (v) => {
          if (v) {
            return true
          }
          return 'Please enter online meeting link! '
        },
      ],
      personMeetingRules: [
        (v) => {
          if (v.length > 0) {
            console.log('==selected session==', this.selectedSession)
            return true
          }
          return 'Please select location!'
        },
      ],
      isDateRange: false,
      isOverDate: false,
      isOverPeriod: true,
      isDuration: false,
      isPhone: false,
      isOnlineMeeting: false,
      isCustom: false,
      isPersonMeeting: false,
      isZoom: false,
      isGoogleMeet: false,
      isType: false,
      isSessionTicket: false,
      Duration: 0,
      Phone: '',
      WebinarLink: '',
      InPersonMeeting: '',
      Type: 'Personal',
      MaxAllow: 5,
      isGroup: false,
      Address: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: '',
      SessionTicket: [],
      zoomDocumentLink:
        'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Zoom/views/Zoom',
      googleMeetDocumentLink:
        'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Gmail/views/Gmail',
      selectedSession: '',
      ScheduledType: '',
      RollingDays: '',
      StartDate: null,
      EndDate: null,
      addresslineMessage: '',
      // ObjectID5: (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h)),
      // isIndefinitely: false,
      isSaveButtonDisabled: false,
      isSession: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [(v) => !!v || 'This field is required'],
      isMap: false,
      ticketTypeProps: {
        caption: 'Type*',
        type: 'lookup',
        dataSource: {
          query: registrationStatusOptions,
          itemText: 'value',
          itemValue: 'key',
          filter(data) {
            return {
              type: 'TicketType',
            }
          },
        },
      },
      scheduledTypeProps: {
        caption: 'Event Scheduled',
        type: 'lookup',
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
      startTimeProps: {
        caption: 'Start Time*',
        type: 'lookup',
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
        caption: 'End Time*',
        type: 'lookup',
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
      slotSizeProps: {
        caption: 'Slot Size*',
        type: 'lookup',
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
        caption: 'Location*',
        type: 'lookup',
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
      inPersonMeetingProps: {
        caption: 'Location',
        type: 'lookup',
        multiple: true,
        dataSource: {
          query: location,
          itemText: 'Name',
          itemValue: 'id',
          filter(data) {
            return {}
          },
        },
      },
      typeProps: {
        caption: 'Type*',
        type: 'lookup',
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

      // dateTime: new Date(),
      // fields: [
      //   {
      //     type: 'timezone',
      //     fieldName: 'Timezone',
      //   },
      //   {
      //     type: 'datetime',
      //     fieldName: 'StartDate',
      //   },
      //   {
      //     type: 'datetime',
      //     fieldName: 'EndDate',
      //   },
      // ],
      timezonefield: {
        caption: 'Timezone*',
        type: 'Timezone',
        fieldName: 'Timezone',
      },
      text: null,
      eventData: {
        Title: '',
        // Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        Description: '',
        UniqLink: '',
        // JoiningInstruction: '',
        BusinessType: 'Recurring',
        Privacy: 'Public',
        Currency: '',
        Status: 'Not ready',
        // LocationType: 'Venue',
        VenueName: '',
      },

      stepNumber: 1,

      isInalidEventLink: false,
      uniqueLinkMessage: '',
      days: [
        {
          Label: 'Sundays',
          Value: false,
        },
        {
          Label: 'Mondays',
          Value: false,
        },
        {
          Label: 'Tuesdays',
          Value: false,
        },
        {
          Label: 'Wednesdays',
          Value: false,
        },
        {
          Label: 'Thursdays',
          Value: false,
        },
        {
          Label: 'Fridays',
          Value: false,
        },
        {
          Label: 'Saturdays',
          Value: false,
        },
      ],
      tickets: [
        {
          id: ObjectID5(),
          TicketId: 0,
          // TicketId:
          Code: 'General admission',
          Type: 'Free',
          Amount: 0,
          TicketCount: 100,
        },
      ],
      sessions: [
        {
          SessionId: 0,
          Name: '',
          CustomScheduledType: 'over 30 rolling days ',
          ScheduledType: 'Over a period of rolling days',
          StartTime: '10:00',
          EndTime: '19:00',
          Duration: '30',
          Timezone: '',
          LocationType: '',
          Type: 'Personal',
          Tickets: '0 ticket',
          RollingDays: 30,
          Frequency: 30,
          isActive: true,
          StartDate: null,
          EndDate: null,
          LocationId: [],
          _CurrentAddress: {},
          SessionTicket: [],
          Days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          _Exceptions: [],
        },
      ],
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
    slotLookupOptions() {
      const items = this.slotOptions
      return {
        caption: 'Slot Size*',
        type: 'lookup',
        items,
        dataSource: {
          items,
          itemText: 'value',
          itemValue: 'key',
        },
      }
    },
    startDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'Start Date',
        type: 'date',
        // rules: [
        //   (v) => {
        //     const startDate = new Date(v)
        //     return startDate > this.EndDate
        //       ? 'Start Date should be less than End Date'
        //       : true
        //   },
        // ],
      }
    },
    startDateRule() {
      return [
        (v) => {
          const startDate = new Date(v)
          console.log('==startDate==', startDate)
          console.log('==this.EndDate==', this.EndDate)
          return startDate > new Date(this.EndDate)
            ? 'Start Date should be less than End Date'
            : true
        },
      ]
    },
    endDateRule() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: 'End Date',
        type: 'date',
        rules: [
          (v) => {
            const endDate = new Date(v)
            return this.StartDate > endDate
              ? 'End Date should be greater than Start Date'
              : true
          },
        ],
      }
    },
    // endDateRule() {
    //   return [
    //       (v) => {
    //         const endDate = new Date(v)
    //         return this.StartDate > endDate
    //           ? 'End Date should be greater than Start Date'
    //           : true
    //       },
    //     ],
    //   }
    // },
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
    sessionTicketProps() {
      return {
        caption: 'tickets',
        type: 'lookup',
        multiple: true,
        items: this.tickets,
        dataSource: {
          items: this.tickets,
          itemText: 'Code',
          itemValue: 'id',
        },
      }
    },
    eventStartDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        // rules: [
        //   (v) => {
        //     const StartDate = v && new Date(v)
        //     const { EndDate } = this.eventData
        //     let startDateMessage = ''
        //     if (!StartDate) startDateMessage = strings.FIELD_REQUIRED
        //     else if (StartDate && EndDate && StartDate > EndDate)
        //       startDateMessage = strings.EVENT_START_END_DATE
        //     else if (StartDate < new Date())
        //       startDateMessage = strings.EVENT_START_DATE
        //     else startDateMessage = ''
        //     return startDateMessage || true
        //   },
        // ],
      }
    },
    eventEndDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        // rules: [
        //   (v) => {
        //     const EndDate = v && new Date(v)
        //     const { StartDate } = this.eventData
        //     let endDateMessage = ''
        //     if (!EndDate) endDateMessage = strings.FIELD_REQUIRED
        //     else if (StartDate && EndDate && StartDate > EndDate)
        //       endDateMessage = strings.EVENT_START_END_DATE
        //     else if (EndDate < new Date())
        //       endDateMessage = strings.EVENT_END_DATE
        //     else endDateMessage = ''
        //     return endDateMessage || true
        //   },
        // ],
      }
    },
  },
  methods: {
    isNextDisabled() {
      return this.isUniqLinkValid === false
    },
    changePersonMeeting(locationId) {
      // debugger
    },
    validStartTimeRule(index) {
      return [
        (v) => {
          const startTime = parseInt(
            this.sessions[index].StartTime.split(':')[0]
          )
          const endTime = parseInt(this.sessions[index].EndTime.split(':')[0])
          return startTime > endTime
            ? 'Start Time should not be greater than End Time'
            : true
        },
      ]
    },
    validEndTimeRule(index) {
      return [
        (v) => {
          const startTime = parseInt(
            this.sessions[index].StartTime.split(':')[0]
          )
          const endTime = parseInt(this.sessions[index].EndTime.split(':')[0])
          return startTime > endTime
            ? 'End Time should not be less than Start Time'
            : true
        },
      ]
    },
    getMaxEnd(arr) {
      console.log('==getMaxend==')
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
      console.log('==array==' + JSON.stringify(rarray))
      for (let i = 0; i < rarray.length; i++) {
        console.log('==array=i=' + JSON.stringify(rarray[i]))
        console.log('==array[]==' + rarray[i].length)
        if (rarray[i].length > 1) {
          return true
        }
      }
      return false
    },

    getAddressData(addressData, placeResultData, id) {
      this.venueAddress.AddressLine =
        addressData.route ||
        '' + ', ' + addressData.administrative_area_level_1 ||
        ''
      // this.eventData.VenueName = addressData.route || ''
      this.venueAddress.Country = addressData.country || ''
      this.venueAddress.City = addressData.locality || ''
      this.venueAddress.State = addressData.administrative_area_level_1 || ''
      this.venueAddress.LatLng.lat = addressData.latitude || ''
      this.venueAddress.LatLng.lng = addressData.longitude || ''
      // const latlng = {}
      // latlng.lat = addressData.latitude
      // latlng.lng = addressData.longitude
      // latlng.name =
      //   addressData.route +
      //   ' ' +
      //   addressData.locality +
      //   ' ' +
      //   addressData.country
      // const newLocations = []
      // newLocations[0] = latlng
    },
    // ObjectID5() {
    //   return (m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) =>
    //     s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
    // },
    openWindow(link) {
      window.open(link, '_blank')
    },
    changeType(value) {
      this.isGroup = value === 'Group'
    },
    changelocationType(index) {
      // const index = 0
      return () => {
        console.log('==changelocationtype==index==', index)
        this.selectedSession = index
        if (this.sessions[index].LocationType === 'Phone call') {
          this.isPhone = true
          this.isZoom = false
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'Online meeting') {
          this.isOnlineMeeting = true
          this.isZoom = false
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'Custom') {
          this.isCustom = true
          this.isZoom = false
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'In-person meeting') {
          this.isPersonMeeting = true
          this.isZoom = false
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'Zoom') {
          this.isZoom = true
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'Google Meet') {
          this.isGoogleMeet = true
          this.isZoom = false
        }
      }
    },
    changeDuration(index) {
      return () => {
        this.selectedSession = index
        console.log(
          '==this.sessions[index].Duration==',
          this.sessions[index].Duration
        )
        if (this.sessions[index].Duration === '0') {
          this.isDuration = true
        }
      }
    },
    setDuration() {
      this.isDuration = false
      this.sessions[this.selectedSession].Duration = this.Duration
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    setPhone() {
      this.$refs.phoneform.validate()
      if (this.validPhone) {
        this.isPhone = false
        this.sessions[this.selectedSession].Phone = this.Phone
        console.log('==sessions==', JSON.stringify(this.sessions))
      }
    },
    setOnlineMeeting() {
      this.$refs.meetingform.validate()
      if (this.validOnlineMeeting) {
        this.isOnlineMeeting = false
        this.sessions[this.selectedSession].WebinarLink = this.WebinarLink
        console.log('==sessions==', JSON.stringify(this.sessions))
      }
    },
    setCustomLocation() {
      if (this.venueAddress && this.venueAddress.AddressLine !== '') {
        this.isCustom = false
        console.log('==sessions==', JSON.stringify(this.sessions))
        this.sessions[this.selectedSession]._CurrentAddress = this.venueAddress
      }
    },
    setPersonMeeting() {
      this.$refs.personmeetingform.validate()
      if (this.validPersonMeeting) {
        this.isPersonMeeting = false
        this.sessions[this.selectedSession].LocationId = this.InPersonMeeting
        console.log('==sessions==', JSON.stringify(this.sessions))
      }
    },
    selectType(index) {
      this.selectedSession = index
      this.isType = true
    },
    setType() {
      this.$refs.typeform.validate()
      if (this.validType) {
        this.isType = false
        this.sessions[this.selectedSession].Type = this.Type
        if (this.Type === 'Group') {
          this.sessions[this.selectedSession].MaxAllow = parseInt(this.MaxAllow)
        }
      }
    },
    selectSessionTickets(index) {
      this.selectedSession = index
      this.isSessionTicket = true
    },
    setSessionTicket() {
      this.isSessionTicket = false
      this.customTicket = `Ticket ${this.SessionTicket.length}`
      this.sessions[this.selectedSession].SessionTicket = this.SessionTicket
    },
    setScheduleType(type) {
      if (type === 'Over a date range') {
        this.isOverDate = true
        this.isOverPeriod = false
        this.isIndefinitely = false
      } else if (type === 'Over a period of rolling days') {
        this.isOverDate = false
        this.isOverPeriod = true
        this.isIndefinitely = false
      } else if (type === 'Indefinitely') {
        this.isOverDate = false
        this.isOverPeriod = false
        this.isIndefinitely = true
      }
    },
    selectSchedule(index) {
      this.isDateRange = true
      this.selectedSession = index
      const session = this.sessions[index]
      if (session.ScheduledType !== '') {
        this.ScheduledType = session.ScheduledType
      } else {
        this.ScheduledType = 'Over a period of rolling days'
      }
      this.setScheduleType(this.ScheduledType)
      this.RollingDays = session.RollingDays
      this.StartDate = session.StartDate
      this.EndDate = session.EndDate
      session.Days.forEach((day, i) => {
        this.days.forEach((d, i) => {
          if (day === 'monday' && d.Label === 'Mondays') {
            d.Value = true
          }
          if (day === 'tuesday' && d.Label === 'Tuesdays') {
            d.Value = true
          }
          if (day === 'wednesday' && d.Label === 'Wednesdays') {
            d.Value = true
          }
          if (day === 'thursday' && d.Label === 'Thursdays') {
            d.Value = true
          }
          if (day === 'friday' && d.Label === 'Fridays') {
            d.Value = true
          }
          if (day === 'saturday' && d.Label === 'Saturdays') {
            d.Value = true
          }
          if (day === 'sunday' && d.Label === 'Sundays') {
            d.Value = true
          }
        })
      })
    },
    setSchedule() {
      if (this.validDateRange) {
        this.isDateRange = false
        this.sessions[this.selectedSession].ScheduledType = this.ScheduledType
        this.sessions[this.selectedSession].RollingDays = this.RollingDays
        this.sessions[this.selectedSession].StartDate = this.StartDate
        this.sessions[this.selectedSession].EndDate = this.EndDate
        this.sessions[this.selectedSession].Timezone = this.Timezone

        if (this.ScheduledType === 'Over a period of rolling days') {
          this.sessions[
            this.selectedSession
          ].CustomScheduledType = `over ${this.RollingDays} rolling days`
        } else if (this.ScheduledType === 'Over a date range') {
          const formatedDate = `from ${format(
            new Date(this.StartDate),
            'MM/dd/yyyy'
          )} to ${format(new Date(this.EndDate), 'MM/dd/yyyy')}`
          this.sessions[this.selectedSession].CustomScheduledType = formatedDate
        } else if (this.ScheduledType === 'Indefinitely') {
          this.sessions[this.selectedSession].CustomScheduledType =
            'indefinitely into the future'
        }
        this.sessions[this.selectedSession].Days = []
        this.days.forEach((d, i) => {
          if (d.Label === 'Mondays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('monday')
          }
          if (d.Label === 'Tuesdays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('tuesday')
          }
          if (d.Label === 'Wednesdays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('wednesday')
          }
          if (d.Label === 'Thursdays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('thursday')
          }
          if (d.Label === 'Fridays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('friday')
          }
          if (d.Label === 'Saturdays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('saturday')
          }
          if (d.Label === 'Sundays' && d.Value === true) {
            this.sessions[this.selectedSession].Days.push('sunday')
          }
        })
      }
    },
    changeSchedule(value) {
      this.setScheduleType(value)
      // if (value === 'Over a date range') {
      //   this.isOverDate = true
      //   this.isOverPeriod = false
      //   this.isIndefinitely = false
      // } else if (value === 'Over a period of rolling days') {
      //   this.isOverDate = false
      //   this.isOverPeriod = true
      //   this.isIndefinitely = false
      // } else if (value === 'Indefinitely') {
      //   this.isOverDate = false
      //   this.isOverPeriod = false
      //   this.isIndefinitely = true
      // }
    },
    close() {
      this.onFormClose()
      this.stepNumber = 1
    },
    closeForm() {
      this.onFormClose()
      this.stepNumber = 1
      this.$router.push('/apps/event/event/recurring/' + this.eventId)
    },

    buildMutationUpsertQuery(modelName) {
      return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
    },
    viewRegistration() {
      const baseUrl = getApiUrl()
      // const baseUrl = 'event.test.bitpod.io/svc/api'
      const regUrl = baseUrl.replace('svc/api', 'e')
      window.open(`${regUrl}${this.eventData.UniqLink}`, '_blank')
    },
    async eventPublish() {
      const eventStatus = { Status: 'Open for registration' }
      this.isEventPublish = true
      this.isEventCreate = false
      const modelName = 'Event'
      const where = {
        id: this.eventId,
      }
      const editItemMutation = this.buildMutationUpsertQuery(modelName)
      await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
            data: eventStatus,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
    },
    isPriceDisabled(index) {
      if (this.tickets[index].Type === 'Free') {
        this.tickets[index].Amount = 0
        return true
      } else return false
    },
    deleteTicket(index) {
      if (this.tickets.length > 1) {
        this.tickets.splice(index, 1)
      }
    },
    deleteSession(index) {
      if (this.sessions.length > 1) {
        this.sessions.splice(index, 1)
      }
    },
    editSession(index) {
      this.isDateRange = true
    },
    next(value) {
      const { Title, UniqLink } = this.eventData

      this.$refs.validBasicInfoForm.validate()
      if (
        value === 2 &&
        Title !== '' &&
        UniqLink !== '' &&
        this.isInalidEventLink === false &&
        this.validBasicInfo
      ) {
        this.stepNumber = value
      } else if (value === 3) {
        this.stepNumber = value
      }
    },

    saveRecord() {
      const { Code, Type } = this.tickets
      // this.$refs.form.validate()
      if (Code !== '' && Type !== '') {
        // if (this.venueAddress.AddressLine !== '')
        //   this.eventData._VenueAddress = this.venueAddress
        // let isInvalidSession = false
        const isInvalidSessionMap = this.sessions.map((session, index) => {
          return session.StartTime > session.EndTime
        })
        const isLocationTypeEmpty = this.sessions.map((session, index) => {
          // return session.LocationType === ''
          if (session.LocationType === '') {
            return true
          } else if (session.LocationType === 'In-person meeting') {
            if (session.LocationId.length === 0) {
              this.locationMessage = 'Selected location should not be blank'
              return true
            }
          } else if (session.LocationType === 'Phone call') {
            if (session.Phone === undefined || session.Phone === '') {
              this.locationMessage = 'Selected location should not be blank'
              return true
            }
          } else if (session.LocationType === 'Online meeting') {
            if (
              session.WebinarLink === undefined ||
              session.WebinarLink === ''
            ) {
              this.locationMessage = 'Selected location should not be blank'
              return true
            }
          } else if (session.LocationType === 'Custom') {
            if (
              session.AddressLine === undefined ||
              session.AddressLine === ''
            ) {
              this.locationMessage = 'Selected location should not be blank'
              return true
            }
          }
          return false
        })
        console.log('===isInvalidSessionMap==', isInvalidSessionMap)
        this.isLocationMessage = !!isLocationTypeEmpty.includes(true)
        console.log('====isLocationMessage=', this.isLocationMessage)
        console.log('====locationmessage=', this.locationMesssage)
        const tempData = []
        this.sessions.forEach((row) => {
          let startTime = row.StartTime.replace(':', '.')
          let endTime = row.EndTime.replace(':', '.')
          startTime = parseInt(startTime)
          endTime = parseInt(endTime)
          const newsObject = { start: startTime, end: endTime }
          tempData.push(newsObject)
        })
        console.log('==tempData=', JSON.stringify(tempData))
        const isInvalidSlot = this.partitionIntoOverlappingRanges(tempData)
        console.log('==isInvalidSlot=', isInvalidSlot)
        if (
          !isLocationTypeEmpty.includes(true) &&
          !isInvalidSessionMap.includes(true) &&
          (isInvalidSlot === false ||
            confirm(
              'This session overlaps with another session, are you sure? click Yes to create and cancel to cancel it.'
            ))
        ) {
          this.isSaveButtonDisabled = true
          this.eventData.EventManager = this.$auth.$state.user.data.email
          this.eventData.Organizer = this.$auth.$state.user.data.name
          const baseUrl = getApiUrl()
          this.$axios
            .$post(`${baseUrl}Events`, {
              ...this.eventData,
            })
            .then((res) => {
              this.eventId = res.id

              const ticketList = []
              const sessionList = []

              this.tickets.forEach(function (ticket) {
                ticket.Events = res.id
                ticket.Amount = parseInt(ticket.Amount)
                ticket.TicketCount = parseInt(ticket.TicketCount)
                ticketList.push(ticket)
              })

              return this.$axios
                .$post(`${baseUrl}Tickets`, ticketList)
                .then((ticketres) => {
                  this.sessions.forEach(function (session) {
                    session.EventId = res.id

                    // session.Duration = parseInt(session.Duration.split(' ')[0])
                    // session.Frequency = parseInt(session.Duration.split(' ')[0])
                    session.Duration = parseInt(session.Duration)
                    session.Frequency = parseInt(session.Duration)
                    session.Name = session.StartTime + ' ' + session.EndTime
                    const fields = [
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
                    ]
                    if (
                      session.StartDate !== null &&
                      session.EndDate !== null
                    ) {
                      const convertedEventRecord = formatTimezoneDateFieldsData(
                        session,
                        fields
                      )
                      session.StartDate = convertedEventRecord.StartDate
                      session.EndDate = convertedEventRecord.EndDate
                    }

                    const ObjectID5 = (
                      m = Math,
                      d = Date,
                      h = 16,
                      s = (s) => m.floor(s).toString(h)
                    ) =>
                      s(d.now() / 1000) +
                      ' '.repeat(h).replace(/./g, () => s(m.random() * h))
                    const Exceptions = session.Days.map((item, key) => {
                      return {
                        id: ObjectID5(),
                        type: 'wday',
                        wday: item,
                        _intervals: [
                          {
                            id: ObjectID5(),
                            from: session.StartTime,
                            to: session.EndTime,
                          },
                        ],
                      }
                    })

                    session._Exceptions = Exceptions
                    sessionList.push(session)
                  })
                  return this.$axios
                    .$post(`${baseUrl}Sessions`, sessionList)
                    .then((sessionres) => {
                      this.isSession = false
                      this.isEventCreate = true
                      return sessionres
                    })
                    .catch((e) => {
                      console.log('error', e)
                      this.isSaveButtonDisabled = false
                    })
                })
                .catch((e) => {
                  console.log('error', e)
                  this.isSaveButtonDisabled = false
                })
            })
            .catch((e) => {
              console.log('error', e)
              this.isSaveButtonDisabled = false
            })
        }
      }
    },

    changeEventName(value) {
      this.verifyUniqueLink(value)
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
        this.isInalidEventLink = true
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
        this.isInalidEventLink = true
        this.uniqueLinkMessage = strings.UNIQUE_LINK_DUPLICATE
      } else {
        this.isInalidEventLink = false
        this.isUniqLinkValid = true
      }
    },
    addTicketRow() {
      this.tickets.push({
        TicketId: this.tickets.length + 1,
        id: ObjectID5(),
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        TicketCount: 100,
      })
    },
    addSession() {
      this.sessions.push({
        SessionId: this.sessions.length + 1,
        Name: '',
        ScheduledType: 'Over a period of rolling days',
        CustomScheduledType: 'over 30 rolling days ',
        StartTime: '10:00',
        EndTime: '19:00',
        Duration: '30',
        Timezone: '',
        LocationType: '',
        Type: 'Personal',
        Tickets: '0 ticket',
        RollingDays: 30,
        Frequency: 30,
        isActive: true,
        StartDate: 0,
        EndDat: 0,
        LocationId: [],
        Days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      })
    },
  },

  apollo: {
    data: {
      query() {
        return gql`
          ${organizationInfo}
        `
      },
      variables() {
        return {
          filters: {
            where: {},
          },
          slotFilters: {
            where: {
              type: 'EventDuration',
            },
          },
        }
      },
      update(data) {
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
        this.slotOptions = formatGQLResult(data, 'GeneralConfiguration')
        this.eventData.Currency = OrganizationInfo[0].Currency
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
.vs-notification {
  box-shadow: 0 1px 2px 0 hsla(0, 0%, 0%, 0.25) !important;
}
.v-location {
  min-height: 300px;
}
</style>

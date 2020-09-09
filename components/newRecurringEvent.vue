<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
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
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="isOverDate" cols="12">
              <v-datetime-picker
                v-model="StartDate"
                label="Start Date*"
                :text-field-props="eventStartDateProps"
              >
                <template slot="dateIcon">
                  <v-icon>fas fa-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                  <v-icon>fas fa-clock</v-icon>
                </template>
              </v-datetime-picker>
            </v-col>
            <v-col v-if="isOverDate" cols="12">
              <v-datetime-picker
                v-model="EndDate"
                label="End Date*"
                :text-field-props="eventEndDateProps"
              >
                <template slot="dateIcon">
                  <v-icon>fas fa-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                  <v-icon>fas fa-clock</v-icon>
                </template>
              </v-datetime-picker>
            </v-col>
            <div class="col-md-12">
              <v-flex class="d-flex justify-center align-center pb-2">
                <h2 class="body-1 pb-1">
                  <i class="fa-repeat" aria-hidden="true"></i> Repeating days of
                  the week
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
            </div>
            <v-col v-for="(day, k) in days" :key="k" cols="4">
              <v-checkbox v-model="day.Value" :label="day.Label"></v-checkbox>
            </v-col>
          </v-row>
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="Duration"
                label="Duration"
                type="number"
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="Phone"
                label="Phone"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="WebinarLink"
                label="Online meeting link"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="Address"
                label="Address"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="City"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="State"
                label="State"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="Country"
                label="Country"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ZipCode"
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <Lookup
                v-model="InPersonMeeting"
                :field="inPersonMeetingProps"
              />
            </v-col>
          </v-row>
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <Lookup
                v-model="SessionTicket"
                :field="sessionTicketProps"
              />
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <Lookup
                v-model="Type"
                :field="typeProps"
                :on-change="changeType"
              />
            </v-col>
            <v-col cols="12" v-if="isGroup">
              <v-text-field
                v-model="MaxAllow"
                label="Max Allow*"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
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
                    outlined
                    required
                    :error-messages="uniqueLinkValidationMsg"
                    @keyup="changeUniqueLink($event)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <v-btn color="primary" @click="next(2)">Next</v-btn>
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
              <div v-if="isZoom"> To send Zoom joining info, you must setup Zoom integration, <a href="" v-on:click.stop.prevent="openWindow(zoomDocumentLink)">click here</a> for documentation.</div>
              <div v-if="isGoogleMeet">To send google meet joining info, you must setup google meet integration, <a href="" v-on:click.stop.prevent="openWindow(googleMeetDocumentLink)">click here</a> for documentation.</div>
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
                        <v-btn text small @click="selectSchedule(k)">
                          <v-icon left>mdi-pencil</v-icon>
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
                        />
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.EndTime"
                          :field="endTimeProps"
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
                          v-model="Timezone"
                          :rules="requiredRules"
                          :field="timezonefield"
                        ></Timezone>
                      </td>
                      <td class="pa-2 pb-0">
                        <Lookup
                          v-model="session.LocationType"
                          :field="locationTypeProps"
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
                        <span v-if="session.Type === 'Group'">{{session.Type}} {{session.MaxAllow}}  </span>
                        <span v-if="session.Type === 'Personal'">{{session.Type}}  </span>
                        <v-btn text small @click="selectType(k)">
                          <v-icon left>mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                      <td class="pa-2 pb-0">
                        <!-- <v-text-field
                          v-model="session.Tickets"
                          label="Tickets"
                          outlined
                          value
                        ></v-text-field> -->
                        <span>ticket </span>
                        <v-btn text small @click="selectSessionTickets(k)">
                          <v-icon left>mdi-pencil</v-icon>
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
                    aria-hidden="true"
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
  </v-form>
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
// import CustomDate from '~/components/common/form/date.vue'
// import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Lookup,
    Timezone,
    // CustomDate
  },
  props: {
    onFormClose: Function,
  },
  data: () => {
    // const currentDatetime = new Date(new Date().setSeconds(0))
    return {
      valid: true,
      lazy: false,
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
      MaxAllow: 0,
      isGroup	: false,
      Address: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: '',
      zoomDocumentLink: 'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Zoom/views/Zoom',
      googleMeetDocumentLink: 'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Gmail/views/Gmail',
      selectedSession: '',
      ScheduledType: '',
      RollingDays: '',
      StartDate: null,
      EndDate: null,
      // ObjectID5: (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h)),
      // isIndefinitely: false,
      isSaveButtonDisabled: false,
      addresslineMessage: '',
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
            return {
              
            }
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
        _VenueAddress: {},
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
          // id: this.ObjectID5,
          // TicketId: 0,
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
          // SessionTicket: [],
          Days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          _Exceptions: [],
        },
      ],
    }
  },
  computed: {
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
    sessionTicketProps(){
      return {
        caption: 'tickets',
        type: 'lookup',
        multiple: true,
        items: this.tickets,
        dataSource: {
          items: this.tickets,
          itemText: 'Code',
          itemValue: 'id'
        }
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
    openWindow(link){
      window.open(link, '_blank')
    },
    changeType(value){
      this.isGroup = value === 'Group' ? true : false 
    },
    changelocationType(index) {
      // const index = 0
      return () => {
        console.log('==changelocationtype==index==', index)
        this.selectedSession = index
        if(this.sessions[index].LocationType === 'Phone call'){
          this.isPhone = true
        }
        if(this.sessions[index].LocationType === 'Online meeting'){
          this.isOnlineMeeting = true
        }
        if(this.sessions[index].LocationType === 'Custom'){
          this.isCustom = true
        }
        if(this.sessions[index].LocationType === 'In-person meeting'){
          this.isPersonMeeting = true
        }
        if(this.sessions[index].LocationType === 'Zoom'){
          this.isZoom = true
          this.isGoogleMeet = false
        }
        if(this.sessions[index].LocationType === 'Google Meet'){
          this.isGoogleMeet = true
          this.isZoom = false
        } 
      }
    },
    changeDuration(index){
      return () => {
        this.selectedSession = index
        console.log('==this.sessions[index].Duration==', this.sessions[index].Duration)
        if(this.sessions[index].Duration === '0'){
          this.isDuration = true
        }
      }
    },
    setDuration(){
      this.isDuration = false
      this.sessions[this.selectedSession].Duration = this.Duration
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    setPhone(){
      this.isPhone = false
      this.sessions[this.selectedSession].Phone = this.Phone
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    setOnlineMeeting(){
      this.isOnlineMeeting = false
      this.sessions[this.selectedSession].WebinarLink = this.WebinarLink
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    setCustomLocation(){
      this.isCustom = false
      // this.sessions[this.selectedSession].WebinarLink = this.WebinarLink
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    setPersonMeeting(){
      this.isPersonMeeting = false

      debugger
      this.sessions[this.selectedSession].LocationId = this.InPersonMeeting
      console.log('==sessions==', JSON.stringify(this.sessions))
    },
    selectType(index){
      this.selectedSession = index
      this.isType = true
    },
    setType(){
      this.isType = false
      this.sessions[this.selectedSession].Type = this.Type
      if(this.Type === 'Group'){
        this.sessions[this.selectedSession].MaxAllow = parseInt(this.MaxAllow)
      }
    },
    selectSessionTickets(index){
      this.selectedSession = index
      this.isSessionTicket = true
    },
    setSessionTicket(){
      this.isSessionTicket = false
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
      this.isDateRange = false
      this.sessions[this.selectedSession].ScheduledType = this.ScheduledType
      this.sessions[this.selectedSession].RollingDays = this.RollingDays
      this.sessions[this.selectedSession].StartDate = this.StartDate
      this.sessions[this.selectedSession].EndDate = this.EndDate
      this.sessions[this.selectedSession].Timezone = this.Timezone
      // console.log(
      //   '==formatted date==',
      //   format(new Date(this.StartDate), 'mm/dd/yyyy')
      // )
      // console.log('==formatted date==', format(this.StartDate, 'mm/dd/yyyy'))
      if (this.ScheduledType === 'Over a period of rolling days') {
        this.sessions[
          this.selectedSession
        ].CustomScheduledType = `over ${this.RollingDays} rolling days`
      }
      // else if(this.ScheduledType === 'Over a date range'){
      //   this.sessions[this.selectedSession].CustomScheduledType = `from ${this.StartDate} to ${this.EndDate}`
      // }
      else {
        this.sessions[
          this.selectedSession
        ].CustomScheduledType = this.ScheduledType
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
      this.$refs.form.validate()
      if (
        value === 2 &&
        Title !== '' &&
        UniqLink !== '' &&
        this.isInalidEventLink === false
      ) {
        this.stepNumber = value
      } else if (value === 3) {
        this.stepNumber = value
      }
    },

    saveRecord() {
      this.isSaveButtonDisabled = true
      const { Code, Type, StartDate, EndDate } = this.tickets
      this.$refs.form.validate()
      if (
        Code !== '' &&
        Type !== '' &&
        StartDate !== null &&
        EndDate !== null
      ) {
        if (this.venueAddress.AddressLine !== '')
          this.eventData._VenueAddress = this.venueAddress

        // const convertedEventRecord = formatTimezoneDateFieldsData(
        //   this.eventData,
        //   this.fields
        // )
        // this.eventData.StartDate = convertedEventRecord.StartDate
        // this.eventData.EndDate = convertedEventRecord.EndDate
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
                  if(session.StartDate !== null && session.EndDate !== null){ 
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
      } else this.isInalidEventLink = false
    },
    addTicketRow() {
      this.tickets.push({
        TicketId: this.tickets.length + 1,
        // id: this.ObjectID5,
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
        Duration: '30 min',
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
        }
      },
      update(data) {
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
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
</style>

<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-dialog
      v-model="isDateRange"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Availability</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isDateRange = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="validDateRange" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" class="mt-4 pb-0">
                <Lookup
                  v-model="ScheduledType"
                  :value="ScheduledType"
                  :field="scheduledTypeProps"
                  :on-change="changeSchedule"
                />
              </v-col>
              <v-col v-if="isOverPeriod" cols="12" class="pb-0">
                <v-text-field
                  v-model="RollingDays"
                  label="Rolling Days"
                  type="number"
                  min="0"
                  outlined
                  dense
                  :rules="rollingDaysRules"
                ></v-text-field>
              </v-col>
              <v-col v-if="isOverDate" cols="12" class="pb-0">
                <CustomDate
                  v-model="StartDate"
                  label="Start Date*"
                  :field="startDateField"
                  :rules="startDateRule"
                  :on-change="changeStartDate"
                  type="date"
                />
              </v-col>
              <v-col v-if="isOverDate" cols="12">
                <CustomDate
                  v-model="EndDate"
                  label="End Date*"
                  :field="endDateRule"
                  :rules="endDateRule"
                  :on-change="changeEndDate"
                  type="date"
                />
              </v-col>
              <div class="col-md-12">
                <v-flex class="d-flex justify-center align-center pb-1">
                  <h2 class="body-1 pb-1">
                    <i class="fa-repeat pr-1" aria-hidden="true"></i> Repeating
                    days of the week
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
                <v-divider></v-divider>
              </div>
              <v-col v-for="(day, k) in days" :key="k" cols="4" class="py-0">
                <v-checkbox
                  v-model="day.Value"
                  :label="day.Label"
                  class="mt-0"
                  height="20"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn depressed color="primary" class="mr-1" @click="setSchedule">
            Apply
          </v-btn>
          <v-btn depressed color="grey lighten-2" @click="isDateRange = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isDuration"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Duration</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isDuration = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            ref="durationform"
            v-model="validDuration"
            :lazy-validation="lazy"
          >
            <v-row>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  v-model="Duration"
                  label="Duration"
                  type="number"
                  min="0"
                  :rules="durationRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn depressed class="mr-1" color="primary" @click="setDuration">
            Apply
          </v-btn>
          <v-btn depressed color="grey lighten-2" @click="isDuration = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isPhone"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Location</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isPhone = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="phoneform" v-model="validPhone" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  v-model="Phone"
                  label="Phone"
                  outlined
                  dense
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn depressed class="mr-1" color="primary" @click="setPhone">
            Apply
          </v-btn>
          <v-btn depressed color="grey lighten-2" @click="isPhone = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOnlineMeeting"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Location</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isOnlineMeeting = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            ref="meetingform"
            v-model="validOnlineMeeting"
            :lazy-validation="lazy"
          >
            <v-row>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  v-model="WebinarLink"
                  label="Online meeting link"
                  :rules="onlineMeetingRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn
            depressed
            class="mr-1"
            color="primary"
            @click="setOnlineMeeting"
          >
            Apply
          </v-btn>
          <v-btn
            depressed
            color="grey lighten-2"
            @click="isOnlineMeeting = false"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isCustom"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Location</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isCustom = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" class="mt-3 mb-3">
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
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="venueAddress.City"
                label="City"
                outlined
                dense
                @change="changeAddress()"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="venueAddress.State"
                label="State"
                outlined
                dense
                @change="changeAddress()"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="venueAddress.Country"
                label="Country"
                outlined
                dense
                @change="changeAddress()"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="venueAddress.ZipCode"
                label="Zip Code"
                outlined
                dense
                @change="changeAddress()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn
            depressed
            class="mr-1"
            color="primary"
            @click="setCustomLocation"
          >
            Apply
          </v-btn>
          <v-btn depressed color="grey lighten-2" @click="isCustom = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isPersonMeeting"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Location</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isPersonMeeting = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            ref="personmeetingform"
            v-model="validPersonMeeting"
            :lazy-validation="lazy"
          >
            <v-row>
              <v-col cols="12" class="mt-3">
                <Lookup
                  v-model="InPersonMeeting"
                  :field="inPersonMeetingProps"
                  :rules="personMeetingRules"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn
            depressed
            color="primary"
            class="mr-1"
            @click="setPersonMeeting"
          >
            Apply
          </v-btn>
          <v-btn
            depressed
            color="grey lighten-2"
            @click="isPersonMeeting = false"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isSessionTicket"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Change Tickets</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isSessionTicket = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" class="mt-3">
              <Lookup v-model="SessionTicket" :field="sessionTicketProps" />
            </v-col>
          </v-row>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn
            depressed
            color="primary"
            class="mr-1"
            @click="setSessionTicket"
          >
            Apply
          </v-btn>
          <v-btn
            depressed
            color="grey lighten-2"
            @click="isSessionTicket = false"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isType"
      persistent
      scrollable
      max-width="600px"
      max-height="350px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-4 pb-0 text-h5">Location</h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="isType = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="v-location px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="typeform" v-model="validType" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" class="mt-4 pb-0">
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
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 mb-3">
          <v-btn depressed color="primary" class="mr-1" @click="setType">
            Apply
          </v-btn>
          <v-btn depressed color="grey lighten-2" @click="isType = false">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-4 pb-0 text-h5">New Recurring Event</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-tabs v-model="tabs" height="36" class="mb-6 mt-2 v-event-icon">
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1" class="px-0 mr-4" @click="selectTab(1)">
            <v-icon left>fa-info-circle</v-icon><span>Basic Info</span>
          </v-tab>
          <v-tab
            href="#tab-2"
            class="px-0 mr-4"
            :disabled="!validTab1()"
            @click="selectTab(2)"
          >
            <v-icon left>fa-ticket</v-icon><span>Tickets</span>
          </v-tab>
          <v-tab
            href="#tab-3"
            class="px-0 mr-4"
            :disabled="!validTab1() || !validTab2()"
            @click="selectTab(3)"
          >
            <v-icon left>fa-history</v-icon><span>Recurring Session</span>
          </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 event-inner">
        <v-tabs-items v-model="tabs">
          <v-tab-item :value="'tab-1'">
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
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      v-model="eventData.Title"
                      :rules="requiredRules"
                      label="Event Title*"
                      required
                      dense
                      outlined
                      @change="changeEventName($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pb-4 pt-2">
                    <RichText
                      v-model="eventData.Description"
                      class="mb-3"
                      label="Description"
                    ></RichText>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="pb-0">
                    <v-text-field
                      v-model="eventData.UniqLink"
                      label="Event Link*"
                      :hint="eventLinkHint"
                      persistent-hint
                      outlined
                      dense
                      required
                      :error-messages="uniqueLinkValidationMsg"
                      @keyup="changeUniqueLink($event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-tab-item>

          <v-tab-item :value="'tab-2'">
            <v-card flat>
              <v-form
                ref="validTicketsForm"
                v-model="validTickets"
                :lazy-validation="lazy"
              >
                <p>
                  Setup event tickets and price, you can also set tickets
                  validity so early birds can be offered better pricing.
                </p>
                <v-btn
                  class="ma-2 ml-0 mb-3"
                  outlined
                  color="primary"
                  @click="addTicketRow"
                  >Add Tickets</v-btn
                >
                <v-simple-table class="event-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left pl-0">Title*</th>
                        <th class="text-left pl-2">Type*</th>
                        <th class="text-left pl-2">
                          Price ({{ eventData.Currency }})
                        </th>
                        <th class="text-left pl-2">Quantity</th>
                        <th class="text-left pl-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ticket, k) in tickets" :key="k">
                        <td class="pa-2 pb-0 pl-0">
                          <v-text-field
                            v-model="ticket.Code"
                            :rules="requiredRules"
                            outlined
                            dense
                            @change="changeTicketCode(k)"
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
                            outlined
                            dense
                            value
                            type="Number"
                            min="0"
                            :disabled="isPriceDisabled(k)"
                            @change="changeTicketAmount(k)"
                          ></v-text-field>
                        </td>
                        <td class="pa-2 pb-0">
                          <v-text-field
                            v-model="ticket.TicketCount"
                            outlined
                            dense
                            value
                            type="Number"
                            min="0"
                          ></v-text-field>
                        </td>
                        <td class="pa-2 pb-0">
                          <v-btn icon class="mt-1" @click="deleteTicket(k)">
                            <v-icon>fa-trash</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-form>
            </v-card>
          </v-tab-item>

          <v-tab-item :value="'tab-3'">
            <v-card v-if="isSession" flat>
              <v-form
                ref="validSessionsForm"
                v-model="validSessions"
                :lazy-validation="lazy"
              >
                <p>
                  Setup event recurrence, sessions availability to help your
                  attendees book a time slot.
                </p>
                <v-btn
                  class="ma-2 ml-0 mb-3"
                  outlined
                  color="primary"
                  @click="addSession"
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
                <div
                  v-if="isLocationMessage"
                  class="red--text pa-3 pt-0 body-1"
                >
                  {{ locationMessage }}
                </div>
                <v-simple-table class="event-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left pl-0">Date Range*</th>
                        <th class="text-left pl-2 st-date">Start Time*</th>
                        <th class="text-left pl-2 st-date">End Time*</th>
                        <th class="text-left pl-2 st-date">Slot Size*</th>
                        <th class="text-left pl-2 event-timezone">
                          Timezone
                        </th>
                        <th class="text-left pl-2 event-timezone">
                          Location*
                        </th>
                        <th class="text-left pl-2">Type*</th>
                        <th class="text-left">Tickets</th>
                        <th class="text-left"></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(session, k) in sessions" :key="k">
                        <td class="pa-2 pb-0 pl-0">
                          <span>{{ session.CustomScheduledType }}</span>
                          <v-btn icon small @click="selectSchedule(k)">
                            <v-icon>mdi-18px mdi-pencil</v-icon>
                          </v-btn>
                        </td>
                        <td class="pa-2 pb-0 st-date">
                          <Lookup
                            v-model="session.StartTime"
                            :field="startTimeProps"
                            :rules="validStartTimeRule(k)"
                          />
                        </td>
                        <td class="pa-2 pb-0 st-date">
                          <Lookup
                            v-model="session.EndTime"
                            :field="endTimeProps"
                            :rules="validEndTimeRule(k)"
                          />
                        </td>
                        <td class="pa-2 pb-0">
                          <v-autocomplete
                            v-model="session.Duration"
                            :items="slotLookupOptions"
                            item-text="value"
                            item-value="key"
                            label="Slot Size"
                            outlined
                            dense
                            class="st-date"
                            @change="changeDuration(k)"
                          ></v-autocomplete>
                        </td>
                        <td class="pa-2 pb-0 event-timezone text-truncate">
                          <Timezone
                            v-model="session.Timezone"
                            :rules="requiredRules"
                            :field="timezonefield"
                            offset-y
                            class="st-date"
                          ></Timezone>
                        </td>
                        <td class="pa-2 pb-0 event-timezone">
                          <div v-if="session.selectedLocation">
                            {{ session.selectedLocation }}
                            <v-icon @click="closeShowLocation(k)"
                              >mdi-close</v-icon
                            >
                          </div>
                          <Lookup
                            v-else
                            v-model="session.LocationType"
                            :field="locationTypeProps"
                            :rules="requiredRules"
                            required
                            :on-change="changelocationType(k)"
                          />
                        </td>
                        <td class="pa-2 pb-0">
                          <span v-if="session.Type === 'Group'"
                            >{{ getMaxAllow(session) }}
                          </span>
                          <span v-if="session.Type === 'Personal'"
                            >{{ session.Type }}
                          </span>
                          <v-btn icon small @click="selectType(k)">
                            <v-icon>mdi-18px mdi-pencil</v-icon>
                          </v-btn>
                        </td>
                        <td class="pa-2 pb-0">
                          <span>{{ getTicketCount(session) }} </span>
                          <v-btn icon small @click="selectSessionTickets(k)">
                            <v-icon>mdi-18px mdi-pencil</v-icon>
                          </v-btn>
                        </td>
                        <td class="pa-2 pb-0">
                          <v-btn icon class="mt-1" @click="deleteSession(k)">
                            <v-icon>fa-trash</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-form>
            </v-card>
            <v-card
              v-else
              outlined
              class="text-center elevation-2 vs-notification pa-5"
            >
              <div v-if="isEventCreate" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle fs-18 primary white--text"
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
                    <v-icon left>mdi-rotate-315 mdi-send</v-icon>
                    Publish</v-btn
                  >
                  <v-btn text color="primary" class="ma-1" @click="closeForm"
                    >Close</v-btn
                  >
                </div>
              </div>
              <div v-if="isEventPublish" class="flex">
                <div class="py-2">
                  <i
                    class="fa fa-calendar pa-4 d-inline-flex rounded-circle fs-18 primary white--text"
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
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
      >
        <v-btn
          v-if="currentTab > 1 && !isEventCreate && !isEventPublish"
          depressed
          color="grey lighten-2"
          @click="prev()"
          >Prev</v-btn
        >
        <v-btn
          v-if="currentTab < 3"
          depressed
          color="primary"
          :disabled="isNextDisabled()"
          @click="next()"
          >Next</v-btn
        >
        <v-btn
          v-if="currentTab > 2 && !isEventCreate && !isEventPublish"
          depressed
          color="primary"
          :disabled="isSaveButtonDisabled"
          @click="saveRecord"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
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
import Timezone from '~/components/common/form/timezone'
import eventCount from '~/config/apps/event/gql/eventCount.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getIdFromAtob } from '~/utility'
import CustomDate from '~/components/common/form/date.vue'
import { required } from '~/utility/rules.js'

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
    onFormClose: {
      type: Function,
      default: () => null,
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      showLocation: false,
      selectedLocation: '',
      isUniqLinkValid: false,
      valid: true,
      tabs: null,
      currentTab: 1,
      validTickets: true,
      validDateRange: true,
      validDuration: true,
      validPhone: true,
      validOnlineMeeting: true,
      validCustomLocation: true,
      validPersonMeeting: true,
      validType: true,
      validBasicInfo: true,
      validSessions: true,
      lazy: false,
      locationMesssage: '',
      isLocationMessage: false,
      slotOptions: [],
      inPersonMeetingOptions: [],
      weekDay: [],
      maxAllowRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v >= 0) {
            return true
          }
          return strings.MAX_ALLOW_MSG
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
      rollingDaysRules: [
        (v) => {
          if (!v && v.trim()) {
            return true
          }
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return strings.ROLLING_DAYS_RANGE
        },
      ],
      phoneRules: [
        (v) => {
          if (v && !isNaN(v)) {
            return true
          }
          return strings.INVALID_PHONE_MSG
        },
      ],
      onlineMeetingRules: [
        (v) => {
          if (v) {
            return true
          }
          return strings.ONLINE_MEETING_MSG
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
      InPersonMeeting: [],
      Type: 'Personal',
      MaxAllow: 5,
      isGroup: false,
      Address: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: '',
      SessionTicket: [],
      TicketName: '',
      zoomDocumentLink: strings.ZOOM_DOCUMENT_LINK,
      googleMeetDocumentLink: strings.GOOGLE_MEET_DOCUMENT_LINK,
      selectedSession: '',
      ScheduledType: '',
      RollingDays: '',
      StartDate: null,
      EndDate: null,
      addresslineMessage: '',
      isSaveButtonDisabled: false,
      isSession: true,
      isEventCreate: false,
      isEventPublish: false,
      requiredRules: [required],
      isMap: false,
      ticketTypeProps: {
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
        type: 'lookup',
        caption: 'Location',
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
      typeProps: {
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

      timezonefield: {
        type: 'Timezone',
        fieldName: 'Timezone',
      },
      text: null,
      eventData: {
        Title: '',
        Description: '',
        UniqLink: '',
        BusinessType: 'Recurring',
        Privacy: 'Public',
        Currency: '',
        Status: 'Not ready',
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
          Code: 'General admission',
          Type: 'Free',
          Amount: 0,
          TicketCount: 100,
          CodeAmount: 'General admission 0',
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
          selectedLocation: '',
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
    eventLinkHint() {
      return `${strings.EVENT_LINK_HINT}${this.eventData.UniqLink}`
    },
    slotLookupOptions() {
      const items = this.slotOptions
      return items
    },
    inPersonMeetingProps() {
      const items = this.inPersonMeetingOptions
      return {
        type: 'lookup',
        multiple: true,
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
    uniqueLinkValidationMsg() {
      const errorMessage = this.isInalidEventLink ? this.uniqueLinkMessage : ''
      return errorMessage
    },
    sessionTicketProps() {
      return {
        type: 'lookup',
        multiple: true,
        items: this.tickets,
        dataSource: {
          items: this.tickets,
          itemText: 'CodeAmount',
          itemValue: 'id',
        },
      }
    },
    eventStartDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
      }
    },
    eventEndDateProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
      }
    },
  },
  watch: {
    resetData() {
      this.tickets = []
      const ticket = this.ticketDefaultData()
      this.tickets = [ticket]
    },
  },
  methods: {
    setSelectedDays(selectedDays) {
      this.sessions[0].Days = selectedDays
    },
    getMaxAllow(session) {
      return `${session.Type} ${session.MaxAllow}`
    },
    getTicketCount(session) {
      if (session.SessionTicket) {
        return `${session.SessionTicket.length} Ticket`
      } else {
        return '0 Ticket'
      }
    },
    changeStartDate(value) {
      this.$refs.form.validate()
    },
    changeEndDate(value) {
      this.$refs.form.validate()
    },
    changeTicketCode(index) {
      this.tickets[index].CodeAmount =
        this.tickets[index].Code + ' ' + this.tickets[index].Amount
    },
    changeTicketAmount(index) {
      this.tickets[index].CodeAmount =
        this.tickets[index].Code + ' ' + this.tickets[index].Amount
    },
    selectTab(tabNumber) {
      this.currentTab = tabNumber
    },
    isNextDisabled() {
      return this.isUniqLinkValid === false
    },
    validStartTimeRule(index) {
      return [
        (v) => {
          const startTime = parseInt(
            this.sessions[index].StartTime.split(':')[0]
          )
          const endTime = parseInt(this.sessions[index].EndTime.split(':')[0])
          return startTime > endTime ? strings.START_END_TIME : true
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
          return startTime > endTime ? strings.END_START_TIME : true
        },
      ]
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
    changeAddressData(value) {
      this.addresslineMessage = value === '' ? strings.FIELD_REQUIRED : ''
    },
    changeAddress() {
      const { City, State, Country, PostalCode } = this.venueAddress
      if (this.$refs['venueAddress.AddressLine']) {
        this.venueAddress.AddressLine = this.$refs[
          'venueAddress.AddressLine'
        ].autocompleteText
      }
      this.venueAddress.Country = Country || ''
      this.venueAddress.City = City || ''
      this.venueAddress.State = State || ''
      this.venueAddress.PostalCode = PostalCode || ''
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
    openWindow(link) {
      window.open(link, '_blank')
    },
    changeType(value) {
      this.MaxAllow = this.sessions[this.selectedSession].MaxAllow || 5
      this.isGroup = value === 'Group'
    },
    changelocationType(index) {
      return () => {
        this.selectedSession = index
        if (this.sessions[index].LocationType === 'Phone call') {
          this.Phone = ''
          this.isPhone = true
          this.isZoom = false
          this.isGoogleMeet = false
          this.selectedLocation = ''
        }
        if (this.sessions[index].LocationType === 'Online meeting') {
          this.WebinarLink = ''
          this.isOnlineMeeting = true
          this.isZoom = false
          this.isGoogleMeet = false
          this.selectedLocation = ''
        }
        if (this.sessions[index].LocationType === 'Custom') {
          this.isCustom = true
          this.isZoom = false
          this.isGoogleMeet = false
          this.selectedLocation = ''
          if (this.$refs['venueAddress.AddressLine']) {
            this.$refs['venueAddress.AddressLine'].autocompleteText = ''
            this.venueAddress.AddressLine = ''
          }

          this.venueAddress.City = ''
          this.venueAddress.State = ''
          this.venueAddress.Country = ''
          this.venueAddress.PostalCode = ''
          this.venueAddress.LatLng = {}
        }
        if (this.sessions[index].LocationType === 'In-person meeting') {
          this.isPersonMeeting = true
          this.$refs.personmeetingform.reset()
          this.isZoom = false
          this.isGoogleMeet = false
        }
        if (this.sessions[index].LocationType === 'Zoom') {
          this.isZoom = true
          this.isGoogleMeet = false
          this.isLocationMessage = false
        }
        if (this.sessions[index].LocationType === 'Google Meet') {
          this.isGoogleMeet = true
          this.isZoom = false
          this.isLocationMessage = false
        }
        if (this.sessions[index].LocationType === 'Ask invitee') {
          this.isGoogleMeet = false
          this.isZoom = false
          this.isLocationMessage = false
        }
      }
    },
    changeDuration(index) {
      this.selectedSession = index
      if (this.sessions[index].Duration === '0') {
        this.isDuration = true
        this.Duration = 0
      }
    },
    setDuration() {
      this.$refs.durationform.validate()
      if (this.validDuration) {
        this.isDuration = false
        this.sessions[this.selectedSession].Duration = this.Duration
        const filterOption = this.slotOptions.filter(
          ({ key }) => key === this.duration
        )
        if (!filterOption.length) {
          const newSlotOption = [
            ...this.slotOptions,
            { key: this.Duration, value: `${this.Duration} min` },
          ]
          this.slotOptions = newSlotOption
        }
      }
    },
    setPhone() {
      this.$refs.phoneform.validate()
      if (this.validPhone) {
        this.isLocationMessage = false
        this.isPhone = false
        this.sessions[
          this.selectedSession
        ].selectedLocation = `Phone ${this.Phone}`
        this.sessions[this.selectedSession].Phone = this.Phone
        const sessions = [...this.sessions]
        this.sessions = sessions
      }
    },
    closeShowLocation(index) {
      this.sessions[index].LocationType = ''
      this.sessions[index].selectedLocation = ''
      const sessions = [...this.sessions]
      this.sessions = sessions
    },
    setOnlineMeeting() {
      this.$refs.meetingform.validate()
      if (this.validOnlineMeeting) {
        this.isOnlineMeeting = false
        this.isLocationMessage = false
        this.sessions[this.selectedSession].selectedLocation = 'Online meeting'
        this.sessions[this.selectedSession].WebinarLink = this.WebinarLink
        const sessions = [...this.sessions]
        this.sessions = sessions
      }
    },
    setCustomLocation() {
      if (this.venueAddress && this.venueAddress.AddressLine !== '') {
        this.addresslineMessage = ''
        this.isCustom = false
        this.isLocationMessage = false
        this.sessions[this.selectedSession].selectedLocation =
          this.venueAddress.AddressLine + ' ' + this.venueAddress.City
        this.sessions[this.selectedSession]._CurrentAddress = this.venueAddress
        const sessions = [...this.sessions]
        this.sessions = sessions
      } else if (
        this.$refs['venueAddress.AddressLine'] &&
        this.$refs['venueAddress.AddressLine'].autocompleteText !== ''
      ) {
        this.venueAddress.AddressLine = this.$refs[
          'venueAddress.AddressLine'
        ].autocompleteText
        this.addresslineMessage = ''
        this.isCustom = false
        this.isLocationMessage = false
        this.sessions[this.selectedSession].selectedLocation =
          this.venueAddress.AddressLine + ' ' + this.venueAddress.City
        this.sessions[this.selectedSession]._CurrentAddress = this.venueAddress
        const sessions = [...this.sessions]
        this.sessions = sessions
      } else {
        this.addresslineMessage = strings.FIELD_REQUIRED
      }
    },
    setPersonMeeting() {
      this.$refs.personmeetingform.validate()
      if (this.validPersonMeeting) {
        this.isPersonMeeting = false
        this.isLocationMessage = false
        this.sessions[this.selectedSession].selectedLocation = ''
        this.InPersonMeeting.forEach((recordId) => {
          this.inPersonMeetingOptions.forEach((option, i) => {
            if (option.id === recordId) {
              this.sessions[
                this.selectedSession
              ].selectedLocation += `${option.Name},`
            }
          })
        })
        this.sessions[this.selectedSession].LocationId = this.InPersonMeeting
        const sessions = [...this.sessions]
        this.sessions = sessions
      }
    },
    selectType(index) {
      this.selectedSession = index
      this.Type = this.sessions[index].Type
      if (this.Type === 'Group') {
        this.MaxAllow = this.sessions[this.selectedSession].MaxAllow || 5
        this.isGroup = true
      } else {
        this.isGroup = false
      }
      this.isType = true
    },
    setType() {
      this.$refs.typeform.validate()
      if (this.validType) {
        this.isType = false
        this.sessions[this.selectedSession].Type = this.Type
        if (this.Type === 'Group') {
          this.sessions[this.selectedSession].MaxAllow = parseInt(this.MaxAllow)
        } else {
          this.sessions[this.selectedSession].MaxAllow = 5
          this.MaxAllow = 5
        }
        const sessions = [...this.sessions]
        this.sessions = sessions
      }
    },
    selectSessionTickets(index) {
      this.selectedSession = index
      this.SessionTicket = []
      this.isSessionTicket = true
    },
    setSessionTicket() {
      this.isSessionTicket = false
      const cloneTickets = JSON.parse(JSON.stringify(this.tickets))
      let TicketName = ''
      this.SessionTicket.forEach(function (tid) {
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
      this.sessions[this.selectedSession].TicketName = TicketName
      this.sessions[this.selectedSession].SessionTicket = this.SessionTicket
      const sessions = [...this.sessions]
      this.sessions = sessions
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
      this.$refs.form.validate()
      if (
        this.validDateRange ||
        (this.ScheduledType === 'Over a date range' &&
          this.StartDate !== null &&
          this.EndDate !== null)
      ) {
        this.isDateRange = false
        this.sessions[this.selectedSession].ScheduledType = this.ScheduledType
        this.sessions[this.selectedSession].RollingDays = this.RollingDays
        this.sessions[this.selectedSession].StartDate = this.StartDate
        this.sessions[this.selectedSession].EndDate = this.EndDate

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
    },
    close() {
      this.onFormClose()
      this.tabs = 'tab-1'
      this.resetForm()
    },
    closeForm() {
      this.onFormClose()
      this.tabs = 'tab-1'
      this.$router.push('/apps/event/event/recurring/' + this.eventId)
      this.resetForm()
    },
    resetForm() {
      this.loading = true
      this.$refs.validBasicInfoForm.reset()
      this.$refs.validTicketsForm && this.$refs.validTicketsForm.reset()
      this.$refs.validSessionsForm && this.$refs.validSessionsForm.reset()
      setTimeout(() => {
        this.loading = false
        this.isEventCreate = false
        this.isEventPublish = false
        this.isSaveButtonDisabled = false
        this.valid = false
        this.currentTab = 1
      }, 3000)
    },

    buildMutationUpsertQuery(modelName) {
      return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
    },
    viewRegistration() {
      const baseUrl = getApiUrl()
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
      } else {
        this.resetSession()
      }
    },
    resetSession() {
      this.validSessionsForm = false
      this.isZoom = false
      this.isGoogleMeet = false
      const session = this.defaultSession()
      this.sessions = [session]
    },
    editSession(index) {
      this.isDateRange = true
    },
    validTab1() {
      const { Title, UniqLink } = this.eventData
      if (
        Title !== '' &&
        UniqLink !== '' &&
        this.isInalidEventLink === false &&
        this.validBasicInfo
      ) {
        return true
      } else {
        return false
      }
    },
    validTab2() {
      const isValidTicket = this.tickets.map((ticket, index) => {
        return ticket.Code !== '' && ticket.Type !== ''
      })
      return !isValidTicket.includes(false)
    },
    prev() {
      this.currentTab = parseInt(this.tabs.split('-')[1])
      this.currentTab -= 1
      const tabValue = `tab-${this.currentTab}`
      this.tabs = tabValue
    },
    setNextTab() {
      this.currentTab = parseInt(this.tabs.split('-')[1])
      this.currentTab += 1
      const tabValue = `tab-${this.currentTab}`
      this.tabs = tabValue
    },
    next() {
      const { Title, UniqLink } = this.eventData

      this.$refs.validBasicInfoForm.validate()
      if (
        this.currentTab === 1 &&
        Title !== '' &&
        UniqLink !== '' &&
        this.isInalidEventLink === false &&
        this.validBasicInfo
      ) {
        this.setNextTab()
      } else if (this.currentTab === 2 && this.validTickets) {
        this.$refs.validTicketsForm.validate()
        this.currentTab = 3
        this.setNextTab()
      }
    },

    async saveRecord() {
      const { Code, Type } = this.tickets
      this.$refs.validSessionsForm.validate()
      if (this.validSessions && Code !== '' && Type !== '') {
        const isInvalidSessionMap = this.sessions.map((session, index) => {
          return session.StartTime > session.EndTime
        })
        const isLocationTypeEmpty = this.sessions.map((session, index) => {
          if (session.LocationType === 'In-person meeting') {
            if (session.LocationId.length === 0) {
              return true
            }
          } else if (session.LocationType === 'Phone call') {
            if (session.Phone === undefined || session.Phone === '') {
              return true
            }
          } else if (session.LocationType === 'Online meeting') {
            if (
              session.WebinarLink === undefined ||
              session.WebinarLink === ''
            ) {
              return true
            }
          } else if (session.LocationType === 'Custom') {
            if (
              session._CurrentAddress.AddressLine === undefined ||
              session._CurrentAddress.AddressLine === ''
            ) {
              return true
            }
          }
          return false
        })
        this.isLocationMessage = !!isLocationTypeEmpty.includes(true)
        if (this.isLocationMessage) {
          this.locationMessage = 'Selected location should not be blank'
        }
        const tempData = []
        this.sessions.forEach((row) => {
          let startTime = row.StartTime.replace(':', '.')
          let endTime = row.EndTime.replace(':', '.')
          startTime = parseInt(startTime)
          endTime = parseInt(endTime)
          const newsObject = { start: startTime, end: endTime }
          tempData.push(newsObject)
        })
        const isInvalidSlot = this.partitionIntoOverlappingRanges(tempData)
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
          const res = await this.$axios
            .$post(`${baseUrl}Events`, {
              ...this.eventData,
            })
            .catch((e) => {
              console.log('error', e)
              this.isSaveButtonDisabled = false
            })

          if (res) {
            this.eventId = res.id
            const ticketList = []
            let sessionList = []

            this.tickets.forEach(function (ticket) {
              ticket.Events = res.id
              ticket.Amount = parseInt(ticket.Amount)
              ticket.TicketCount = parseInt(ticket.TicketCount)
              ticketList.push(ticket)
            })
            const ticketres = await this.$axios
              .$post(`${baseUrl}Tickets`, ticketList)
              .catch((e) => {
                console.log('error', e)
                this.isSaveButtonDisabled = false
              })
            if (ticketres) {
              const cloneSessions = JSON.parse(JSON.stringify(this.sessions))
              cloneSessions.forEach(function (session) {
                session.EventId = res.id
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
                if (session.StartDate !== null && session.EndDate !== null) {
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
            }
            sessionList = sessionList.map((i) => {
              if (i.LocationType !== 'Bitpod Virtual') {
                return i
              }
              const randomStr = Math.random().toString(36)
              const roomName = `/${randomStr.substring(
                2,
                5
              )}-${randomStr.substring(5, 8)}-${randomStr.substring(8, 11)}`
              return Object.assign(i, {
                BitpodVirtualLink: `${strings.BITOPD_VIRTUAL_LINK}${roomName}`,
              })
            })
            const sessionres = await this.$axios
              .$post(`${baseUrl}Sessions`, sessionList)
              .catch((e) => {
                console.log('error', e)
                this.isSaveButtonDisabled = false
              })
            if (sessionres) {
              this.isSession = false
              this.isEventCreate = true
              return sessionres
            }
          }
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
        CodeAmount: 'General admission 0',
        TicketCount: 100,
      })
    },
    ticketDefaultData() {
      return {
        id: ObjectID5(),
        TicketId: 0,
        Code: 'General admission',
        Type: 'Free',
        Amount: 0,
        TicketCount: 100,
        CodeAmount: 'General admission 0',
      }
    },
    defaultSession() {
      return {
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
      }
    },
    addSession() {
      const session = this.defaultSession()
      if (this.weekDay.length > 0) {
        session.Days = this.weekDay
      }
      this.sessions.push(session)
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
          inPersonMeetingFilters: {},
        }
      },
      update(data) {
        const OrganizationInfo = formatGQLResult(data, 'OrganizationInfo')
        this.slotOptions = formatGQLResult(data, 'GeneralConfiguration')
        const locationResult = formatGQLResult(data, 'Location')
        this.inPersonMeetingOptions = locationResult.map(({ id, ...rest }) => ({
          id: getIdFromAtob(id),
          ...rest,
        }))
        this.eventData.Currency = OrganizationInfo[0].Currency
        if (OrganizationInfo[0].weekDay.length > 0) {
          this.setSelectedDays(OrganizationInfo[0].weekDay)
          this.weekDay = OrganizationInfo[0].weekDay
        }
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
.event-inner {
  min-height: 455px;
}
.st-date {
  max-width: 125px !important;
  min-width: 125px !important;
  box-sizing: border-box;
}
.event-timezone {
  max-width: 160px !important;
  min-width: 160px !important;
  box-sizing: border-box;
}
</style>

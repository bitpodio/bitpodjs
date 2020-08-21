<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h1>{{ data.event.Title }}</h1>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn depressed color="primary">View</v-btn>
          </div>
          <v-menu bottom origin="center center" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Publish to eventbrite</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Make a copy</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Edit email template</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Integrations</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-chip class="my-2" label>
          {{ formatDate(data.event.StartDate) }} -
          {{ formatDate(data.event.EndDate) }}
        </v-chip>
        <v-flex>
          <p class="blue--text">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <a class="blue--text">
              {{ data.event.VenueName }}
              {{
                formatField(
                  data.event._VenueAddress &&
                    data.event._VenueAddress.AddressLine
                )
              }}
              {{
                formatField(
                  data.event._VenueAddress && data.event._VenueAddress.City
                )
              }}
              {{
                formatField(
                  data.event._VenueAddress && data.event._VenueAddress.State
                )
              }}
              {{
                formatField(
                  data.event._VenueAddress && data.event._VenueAddress.Country
                )
              }}
            </a>
          </p>
        </v-flex>

        <v-flex d-flex flex-md-row flex-lg-row flex-column my-2>
          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 success d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-check" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.eventSummary.totalRegistration }}
              </div>
              <div class="caption text-truncate">Total Registration</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 error d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-x" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.eventSummary.totalFailed }}
              </div>
              <div class="caption text-truncate">Abandoned Registration</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa fa-banknote" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.eventSummary.Revenue }}
              </div>
              <div class="caption text-truncate">Revenue</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 primary d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-calendar2" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">10 Days</div>
              <div class="caption text-truncate">Opens in</div>
            </div>
          </div>
        </v-flex>

        <v-stepper
          alt-labels
          class="elevation-0 boxview"
          style="max-width: 800px;"
        >
          <v-stepper-header>
            <v-stepper-step step="3" complete>Not Ready</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="4"
              complete="true"
              class="text-center align-center"
              >Open for regsitarion</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="4">Sold out</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="" class="text-center align-center"
              >Registarion Closed</v-stepper-step
            >
          </v-stepper-header>
        </v-stepper>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                color="warning"
                size="24"
                class="d-inline-flex"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span class="white--text name-initial">{{
                  data.event.createdBy
                }}</span>
              </v-avatar>
            </template>
            <span>{{ data.event.createdBy }}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-avatar color="warning" size="24" class="d-inline-flex">
              <span class="white--text name-initial">{{
                data.event.createdBy
              }}</span>
            </v-avatar>
            <span>{{ data.event.createdBy }}</span>
          </v-tooltip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >Created this event on
              {{ formatDate(data.event.createdDate) }}.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-users pr-1" aria-hidden="true"></i>Attendees
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventAttendees" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>Registrations
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrations" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-envelope1 pr-1" aria-hidden="true"></i> Invites
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventInvites" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-ticketalt pr-1" aria-hidden="true"></i> Tickets
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventTickets" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-settings1 pr-1" aria-hidden="true"></i> Discount Codes
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventDiscountCodes" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-question-circle pr-1" aria-hidden="true"></i>
          Registration Questions
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrationQuestion" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-black-board pr-1" aria-hidden="true"></i> Sessions
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventSession" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-mic pr-1" aria-hidden="true"></i> Speakers
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventSpeakers" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-external-link pr-1" aria-hidden="true"></i> Tasks
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventTasks" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-file-text-o pr-1" aria-hidden="true"></i> Registration
          Form
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrationForm" content-name="Event" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
        </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-info-circle pr-1" aria-hidden="true"></i> Event
            Information
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editeventform = !editeventform">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Organizer</div>
          <div class="body-1">{{ formatField(data.event.Organizer) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Manager</div>
          <div class="body-1 text--primary">
            {{ formatField(data.event.EventManager) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Tags</div>
          <div class="body-1">{{ formatField(data.event.Tags) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Description</div>
          <div class="body-1">
            {{ formatField(data.event.Description) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-id-badge pr-1" aria-hidden="true"></i> Badge
        </h2>
        <v-divider></v-divider>
        <v-flex my-3 d-flex justify-center align-center>
          <div v-html="data.badge.Template" />
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-tag pr-1" aria-hidden="true"></i> SEO Details
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editseoform = !editseoform">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Title</div>
          <div class="body-1">
            {{ formatField(data.event.SEOTitle) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Description</div>
          <div class="body-1">{{ formatField(data.event.SEODesc) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">SEO Keywords</div>
          <div class="body-1">{{ formatField(data.event.SEOKeywords) }}</div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i> Event
            Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn
            text
            small
            @click="editeventsettingform = !editeventsettingform"
          >
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Privacy</div>
          <div class="body-1">{{ formatField(data.event.Privacy) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Currency</div>
          <div class="body-1">{{ formatField(data.event.Currency) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">GL Account Code</div>
          <div class="body-1">{{ formatField(data.event.ProjectCode) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Cost Center</div>
          <div class="body-1">{{ formatField(data.event.CostCenter) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Business Type</div>
          <div class="body-1">{{ formatField(data.event.BusinessType) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Link</div>
          <div class="body-1">{{ formatField(data.event.UniqLink) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Cancelation Policy</div>
          <div class="body-1">
            {{ formatField(data.event.CancellationPolicy) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.isRefundable === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Allow Cancelation</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Allow Cancelation</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.SessionTimingConflict === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Validate Session Timing Conflict</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Validate Session Timing Conflict</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.ShowRemainingTickets === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Remaining Tickets Count</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Remaining Tickets Count</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.ShowAttendeeForm === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Attendee Form</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Attendee Form</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.NotifyOrganizer === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Notify organizer when someone registers</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Notify organizer when someone registers</span>
          </span>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i>
            Registration Page Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editregform = !editregform">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Registration Site Template</div>
          <div class="body-1">
            {{ formatField(data.event.RegistrationSiteTemplate) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <span
            v-if="
              data.event._sectionHeading &&
              data.event._sectionHeading.showimagegallery === true
            "
          >
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Image Gallery</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Image Gallery</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span
            v-if="
              data.event._sectionHeading &&
              data.event._sectionHeading.showeventreviews === true
            "
          >
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Event Reviews</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Event Reviews</span>
          </span>
        </v-flex>
      </div>
    </v-flex>

    <v-dialog
      v-model="editeventform"
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
          <v-btn icon dark @click="editeventform = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Event Name*"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                clearable
                outlined
                clear-icon="fa fa-close"
                label="Description"
                value=""
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    outlined
                    label="Start Date"
                    append-icon="fa-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.dialog.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    outlined
                    label="End Date"
                    append-icon="fa-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Timezone*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Event organizer *"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Event Manager/Team Email *"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="editeventform = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editseoform"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">Edit Seo Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="editseoform = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-checkbox
                v-model="allowSpaces"
                label=" SEO elements are auto derived from event elements when event is created or edited. Check this if you want to Turn off auto update"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Part which goes into URL"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Meta Description" outlined> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Meta Keywords" outlined> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="editseoform = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
export default {
  components: {
    Grid,
  },
  data() {
    return {
      loading: 0,
      editeventform: false,
      editseoform: false,
      allowSpaces: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
    }
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
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
.event-tile {
  height: 60px;
  max-width: 200px;
  min-width: 200px;
}
.event-tile-left {
  width: 75px;
  min-width: 75px;
  height: 60px;
  border-radius: 4px 0 0 4px;
}
.event-tile-left .fa {
  font-size: 24px;
  color: #fff;
}
.event-tile-right {
  height: 60px;
  min-width: 125px;
  border-radius: 0 4px 4px 0;
}
.event-tile-value {
  font-size: 20px;
}
</style>

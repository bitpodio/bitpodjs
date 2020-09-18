<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-2 pb-0">
        <v-flex class="d-flex justify-center align-center pb-2">
          <div class="text-h4 text-capitalize">{{ data.event.Title }}</div>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn depressed color="primary" @click="viewRegistration"
              >View</v-btn
            >
          </div>
          <div v-if="data.event.Status === 'Not ready'" class="mr-2">
            <v-btn outlined color="primary">Publish</v-btn>
          </div>
          <v-menu
            left
            :close-on-click="closeOnClick"
            :offset-y="offset"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item @click="isMakeCopy = true">
                <v-list-item-icon class="mr-2">
                  <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Make a copy</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <i class="fa fa-pencil-square-o mt-1" aria-hidden="true"></i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit email template</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <i class="fa fa-link1 mt-1" aria-hidden="true"></i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Integrations</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                </v-list-item-icon>
                <v-list-item-content @click.stop="copylinks = true">
                  <v-list-item-title>Copy Links</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-dialog v-model="copylinks" max-width="800">
            <v-card>
              <v-card-title class="pa-4 pr-2">
                <h2 class="black--text text--lighten-1 pt-1 pb-0 text-h5">
                  Copy Links
                </h2>
                <v-spacer></v-spacer>
                <div>
                  <v-btn icon @click="copylinks = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-text class="pa-4 pt-0">
                <v-col cols="12" sm="12" class="pl-0 pb-0 d-flex">
                  <v-text-field
                    id="eventLink"
                    :value="eventLink()"
                    label="Event Link"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                  <v-btn icon class="ml-2">
                    <v-icon>mdi-18px mdi-content-copy</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" class="pl-0 pb-0 d-flex">
                  <v-text-field
                    :value="sessionLink()"
                    label="Recurring sessions Link"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                  <v-btn icon class="ml-2">
                    <v-icon>mdi-18px mdi-content-copy</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" class="pl-0 pb-0 d-flex">
                  <v-text-field
                    :value="embedLink()"
                    label="Embed Recurring Sessions"
                    outlined
                    hint="You will need to contact Bitpod support to whitelist your domain, if you would like to embed it, into any of your website."
                    persistent-hint
                    readonly
                    dense
                  ></v-text-field>
                  <v-btn icon class="ml-2">
                    <v-icon>mdi-18px mdi-content-copy</v-icon>
                  </v-btn>
                </v-col>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-chip class="my-2 mt-1 greybg">
          Recurring Event
        </v-chip>

        <v-flex d-flex flex-md-row flex-lg-row my-2>
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
              class="pa-2 primary d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-black-board" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.eventSummary.TotalSession }}
              </div>
              <div class="caption text-truncate">Total Sessions</div>
            </div>
          </div>
        </v-flex>

        <v-stepper
          alt-labels
          class="elevation-0 boxview mt-n3"
          style="max-width: 800px;"
        >
          <v-stepper-header success>
            <v-stepper-step
              step="3"
              color="success"
              complete
              class="ml-n13 body-2"
              >Not Ready</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              step="4"
              color="success"
              complete="true"
              class="body-2"
              >Open for regsitarion</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="4" color="success" class="body-2"
              >Sold out</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="" color="success" class="body-2"
              >Registarion Closed</v-stepper-step
            >
          </v-stepper-header>
        </v-stepper>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-chip pill class="greybg" v-on="on">
            <v-avatar left color="warning" size="24">
              <span class="white--text name-initial">{{
                data.event.createdBy
              }}</span>
            </v-avatar>
            <span>{{ data.event.createdBy }}</span>
          </v-chip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >Created this event on
              {{ formatDate(data.event.createdDate) }}.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-2">
        <v-flex class="d-flex justify-center align-center pb-1">
          <h2 class="body-1 pb-1">
            <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
          </h2>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed small color="primary" v-bind="attrs" v-on="on">
                Upload
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Badge Logo</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Event Banner (680x350)</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Other</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
        <v-card
          v-for="image in data.event.Images"
          :key="image"
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0"
          @click.stop="dialog = true"
        >
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="150"
            max-height="150"
            width="150"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title class="pa-1">
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="pa-1">
              <v-card
                v-for="image in data.event.Images"
                :key="image"
                class="mx-auto elevation-0"
                @click.stop="dialog = true"
              >
                <v-img
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  width="100%"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-card
          v-for="image in data.event.Logo"
          :key="image"
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0"
        >
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="150"
            max-height="150"
            width="150"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
        <v-card
          v-for="image in data.event.Other"
          :key="image"
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0"
        >
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="150"
            max-height="150"
            width="150"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-black-board pr-1" aria-hidden="true"></i> Recurring
          Sessions
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRecurringSession" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-users pr-1" aria-hidden="true"></i> Attendees
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventAttendees" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-user-plus pr-1" aria-hidden="true"></i> Registrations
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrations" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-envelope1 pr-1" aria-hidden="true"></i> Invites
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventInvites" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-ticketalt pr-1" aria-hidden="true"></i> Tickets
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventTickets" :content="content" :context="data" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-settings1 pr-1" aria-hidden="true"></i> Discount Codes
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventDiscountCodes" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-question-circle pr-1" aria-hidden="true"></i>
          Registration Questions
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrationQuestion" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-mic pr-1" aria-hidden="true"></i> Speakers
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventSpeakers" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-external-link pr-1" aria-hidden="true"></i> Tasks
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventTasks" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-2 pb-0">
        <h2 class="body-1 pb-2">
          <i class="fa fa-file-text-o pr-1" aria-hidden="true"></i> Registration
          Form
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrationForm" :content="content" />
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-3 mb-2">
        <v-flex class="d-flex justify-center align-center pb-1">
          <h2 class="body-1 pb-0">
            <i class="fa fa-info-circle pr-1" aria-hidden="true"></i> Event
            Information
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click.stop="eventform = true">
            <v-icon left>fa-pencil</v-icon>Edit
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
          <div class="body-1 v-tags">
            <v-chip
              v-for="Tags in data.event.Tags"
              :key="Tags"
              small
              class="ma-1"
            >
              {{ Tags }}
            </v-chip>
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Description</div>
          <div class="body-1">
            <div v-html="formatField(data.event.Description)" />
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-3 mb-2">
        <v-flex class="d-flex justify-center align-center pb-1">
          <h2 class="body-1 pb-0">
            <i class="fa fa-tag pr-1" aria-hidden="true"></i> SEO Details
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="seoForm = true">
            <v-icon left>fa-pencil</v-icon>Edit
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

      <div class="xs12 sm4 md4 lg4 boxview pa-3 mb-2">
        <v-flex class="d-flex justify-center align-center pb-1">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i> Event
            Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="formdialog1 = true">
            <v-icon left>fa-pencil</v-icon>Edit
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
          <div class="body-2 text--secondary">Session Link</div>
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

      <div class="xs12 sm4 md4 lg4 boxview pa-3 mb-2">
        <v-flex class="d-flex justify-center align-center pb-1">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i>
            Registration Page Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="sitesetting = true">
            <v-icon left>fa-pencil</v-icon>Edit
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
    <editSeoForm :seo-form.sync="seoForm" />
    <makeCopy :is-make-copy.sync="isMakeCopy" />
  </v-flex>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import editSeoForm from '~/pages/apps/_app/event/_id/editSeoForm.vue'
import makeCopy from '~/pages/apps/_app/event/_id/makeCopy.vue'
import Grid from '~/components/common/grid'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
import nuxtconfig from '~/nuxt.config'

export default {
  layout: 'event',
  components: {
    Grid,
    editSeoForm,
    makeCopy,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      seoForm: false,
      isMakeCopy: false,
      dialog: false,
      copylinks: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    getAttachmentLink(id, isDownloadLink) {
      const attachmentUrl = `https://${nuxtconfig.axios.eventUrl}${
        nuxtconfig.axios.apiEndpoint
      }Attachments${isDownloadLink ? '/download' : ''}${id ? '/' + id : ''}`
      return attachmentUrl
    },
    viewRegistration() {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
      window.open(`${regUrl}`, '_blank')
    },
    eventLink() {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
      return regUrl
    },
    sessionLink() {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/t/${this.data.event.UniqLink}`
      return regUrl
    },
    embedLink() {
      const regUrl = `<iframe src="https://${nuxtconfig.axios.eventUrl}/embed/t/${this.data.event.UniqLink}"></iframe>`
      return regUrl
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
.v-tags {
  min-height: 36px;
}
</style>

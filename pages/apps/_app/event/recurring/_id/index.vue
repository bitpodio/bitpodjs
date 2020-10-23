<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column class="mxw-w70">
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex pb-2">
          <div class="text-h4 text-capitalize event-title">
            {{ data.event.Title }}
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <div class="mr-2">
              <v-btn depressed color="primary" @click="viewRegistration"
                >View</v-btn
              >
            </div>
            <div v-if="data.event.Status === 'Not ready'" class="mr-2">
              <v-btn outlined color="primary" @click="publishEvent"
                >Publish</v-btn
              >
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
                <v-list-item @click="true">
                  <v-list-item-icon class="mr-2">
                    <i
                      class="fa fa-pencil-square-o mt-1"
                      aria-hidden="true"
                    ></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Edit email template</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="redirectIntegration">
                  <v-list-item-icon class="mr-2">
                    <i class="fa fa-link1 mt-1" aria-hidden="true"></i>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Integrations</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="copylinks = true">
                  <v-list-item-icon class="mr-2">
                    <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                  </v-list-item-icon>
                  <v-list-item-content>
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
          </div>
        </v-flex>
        <v-chip class="my-2 mt-1 greybg">
          Recurring Event
        </v-chip>

        <v-flex d-flex flex-md-row flex-lg-row my-2 class="event-cards">
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
            v-if="data.eventSummary.Revenue"
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-banknote" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.event.Currency }} {{ data.eventSummary.Revenue }}
              </div>
              <div class="caption text-truncate">Revenue</div>
            </div>
          </div>

          <div
            v-if="data.eventSummary.TotalSession"
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 primary d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa fa-black-board" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.eventSummary.TotalSession }}
              </div>
              <div class="caption text-truncate">Total Sessions</div>
            </div>
          </div>

          <div
            v-if="data.event.MySpeakers"
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-mic1" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.event.MySpeakers.length }}
              </div>
              <div class="caption text-truncate">Total Speakers</div>
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
              <div class="event-tile-value text-truncate">29 Days</div>
              <div class="caption text-truncate">Opens in</div>
            </div>
          </div>
        </v-flex>

        <v-stepper
          v-model="Status"
          alt-labels
          class="elevation-0 boxview event-steper"
          style="max-width: 800px;"
        >
          <v-stepper-header success>
            <v-stepper-step
              editable
              step="1"
              :complete="true"
              color="success"
              class="ml-n13 body-2"
              @click="changeStatus('Not ready')"
              >Not Ready</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              editable
              step="2"
              :complete="Status > 1"
              color="success"
              class="body-2"
              @click="changeStatus('Open for registration')"
              >Open for registration</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              editable
              step="3"
              :complete="Status > 2"
              class="body-2"
              color="success"
              @click="changeStatus('Sold out')"
              >Sold out</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              editable
              step="4"
              :complete="Status > 3"
              class="body-2"
              color="success"
              @click="changeStatus('Registration closed')"
              >Registration closed</v-stepper-step
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
      <div
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
          </h2>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed text small v-bind="attrs" v-on="on">
                <v-icon left>mdi-upload</v-icon> Upload
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
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-black-board pr-1" aria-hidden="true"></i> Recurring
            Sessions
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          ref="recurringGrid"
          view-name="eventRecurringSession"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-users pr-1" aria-hidden="true"></i> Attendees
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventRecurringAttendees"
          :content="content"
          :context="data"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
            Registrations
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="recurringEventRegistrations"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-mail pr-1" aria-hidden="true"></i>
            Invites
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="eventInvites" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-ticketalt pr-1" aria-hidden="true"></i>
            Tickets
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventTickets"
          :content="content"
          class="mt-n12"
          :context="data"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings1 pr-1" aria-hidden="true"></i>
            Discount Codes
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventDiscountCodes"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-question-circle pr-1" aria-hidden="true"></i>
            Registration Questions
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventRegistrationQuestion"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-mic pr-1" aria-hidden="true"></i>
            Speakers
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="eventSpeakers" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
            Tasks
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventTasks"
          :content="content"
          :context="data"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-file-text-o pr-1" aria-hidden="true"></i>
            Registration Form
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventRegistrationForm"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
            Notes
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Notes model-name="Events" />
      </div>
    </v-flex>
    <v-flex column class="mxw-w30">
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-info-circle pr-1" aria-hidden="true"></i> Event
            Information
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click.stop="eventForm = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
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
        <v-flex v-if="data.event.Tags" my-3>
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
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-tag pr-1" aria-hidden="true"></i> SEO Details
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="seoForm = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
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

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i> Event
            Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="eventSetting = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
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
          <div class="body-1 d-block text-truncate">
            {{ formatField(eventUniqueLink) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Session Link</div>
          <div class="body-1 d-block text-truncate">
            {{ formatField(eventSessionLink) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Cancelation Policy</div>
          <div class="body-1">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="formatField(data.event.CancellationPolicy)"></div>
          </div>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.isRefundable"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Allow Cancelation"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.SessionTimingConflict"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Validate Session Timing Conflict"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.ShowRemainingTickets"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Show Remaining Tickets Count"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.ShowAttendeeForm"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Show Attendee Form"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
        <v-flex class="mt-2">
          <v-checkbox
            v-model="data.event.NotifyOrganizer"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Notify organizer when someone 
            registers"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
        <v-flex class="mt-2">
          <v-checkbox
            v-model="data.event.showTimezone"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Allow user to select a time zone for 
            recurring event"
            color="green"
            @change="updateReg()"
          ></v-checkbox>
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i>
            Registration Page Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="siteSetting = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Registration Site Template</div>
          <div class="body-1">
            {{ formatField(data.event.RegistrationSiteTemplate) }}
          </div>
        </v-flex>
        <v-flex>
          <v-checkbox
            v-model="registrationSetting.showimagegallery"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Show Image Gallery"
            color="green"
            @change="updateReg1()"
          ></v-checkbox>
        </v-flex>
        <v-flex>
          <v-checkbox
            v-model="registrationSetting.showeventreviews"
            dense
            height="20"
            class="ma-0 pa-0"
            label="Show Event Reviews"
            color="green"
            @change="updateReg1()"
          ></v-checkbox>
        </v-flex>
      </div>
      <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
        <div class="toast py-2 pr-1 pl-3">
          {{ snackbarText }}
        </div>
      </v-snackbar>
    </v-flex>
    <div v-if="seoForm">
      <editSeoForm :seo-form.sync="seoForm" />
    </div>
    <div v-if="eventForm">
      <editEventForm :event-form.sync="eventForm" />
    </div>
    <div v-if="eventSetting">
      <editEventSetting :event-setting.sync="eventSetting" />
    </div>
    <div v-if="siteSetting">
      <editSiteSetting :site-setting.sync="siteSetting" />
    </div>
    <makeCopy :is-make-copy.sync="isMakeCopy" />
  </v-flex>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import _ from 'lodash'
import editEventForm from '../../_id/editEventForm.vue'
import nuxtConfig from '../../../../../../nuxt.config'
import editSeoForm from '~/pages/apps/_app/event/_id/editSeoForm.vue'
import editEventSetting from '~/pages/apps/_app/event/_id/editEventSetting.vue'
import editSiteSetting from '~/pages/apps/_app/event/_id/editSiteSetting.vue'
import makeCopy from '~/pages/apps/_app/event/_id/makeCopy.vue'
import Grid from '~/components/common/grid'
import Notes from '~/components/common/notes'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getApiUrl } from '~/utility/index.js'
import { configLoaderMixin } from '~/utility'

export default {
  layout: 'event',
  components: {
    Grid,
    editSeoForm,
    editEventForm,
    editEventSetting,
    editSiteSetting,
    makeCopy,
    Notes,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      seoForm: false,
      eventForm: false,
      eventSetting: false,
      siteSetting: false,
      isMakeCopy: false,
      dialog: false,
      copylinks: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
      eventUniqueLink: '',
      eventSessionLink: '',
      Status: '',
      eventData: {},
      registrationSetting: {
        showimagegallery: false,
        showeventreviews: false,
      },
      snackbar: false,
      timeout: '1000',
      snackbarText: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    updateData() {
      const dataObj = {
        isRefundable: this.data.event.isRefundable,
        SessionTimingConflict: this.data.event.SessionTimingConflict,
        ShowRemainingTickets: this.data.event.ShowRemainingTickets,
        ShowAttendeeForm: this.data.event.ShowAttendeeForm,
        NotifyOrganizer: this.data.event.NotifyOrganizer,
        showTimezone: this.data.event.showTimezone,
      }
      return dataObj
    },
    updateSectionHeading() {
      const dataObj = {
        RegistrationSiteTemplate: this.eventData.RegistrationSiteTemplate
          ? this.eventData.RegistrationSiteTemplate
          : 'Dark',
        _sectionHeading: {
          animation:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.animation) ||
            '',
          datetimelabel:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.datetimelabel) ||
            '',
          gallery:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.gallery) ||
            '',
          registrationTypes:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.registrationTypes) ||
            '',
          registrationbtn:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.registrationbtn) ||
            '',
          registrationquestionsectionlabel:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading
                .registrationquestionsectionlabel) ||
            '',
          review:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.review) ||
            '',
          session:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.session) ||
            '',
          sessionsectionlabel:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.sessionsectionlabel) ||
            '',
          speakers:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.speakers) ||
            '',
          ticketlabel:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.ticketlabel) ||
            '',
          ticketsectionlabel:
            (this.eventData._sectionHeading &&
              this.eventData._sectionHeading.ticketsectionlabel) ||
            '',
          showimagegallery: this.registrationSetting.showimagegallery,
          showeventreviews: this.registrationSetting.showeventreviews,
        },
      }
      return dataObj
    },
  },
  methods: {
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    updateStepper() {
      const status = this.eventData.Status
      if (status === 'Not ready') {
        this.Status = 1
      } else if (status === 'Open for registration') {
        this.Status = 2
      } else if (status === 'Sold out') {
        this.Status = 3
      } else {
        this.Status = 4
      }
    },
    async changeStatus(statusName) {
      const url = getApiUrl()
      try {
        const res = await this.$axios.$patch(
          `${url}Events/${this.$route.params.id}`,
          {
            Status: statusName,
          }
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in app/Event/_id/index.vue while making a PATCH call to Event model from method changeStatus context:-URL:-${url}\nInput:-\t Status:-${statusName}\n id:-${this.$route.params.id} `,
          e
        )
      }
    },
    async publishEvent() {
      this.eventData.Status = 'Open for registration'
      const url = getApiUrl()
      try {
        const res = await this.$axios.patch(
          `${url}Events/${this.$route.params.id}`,
          this.formData
        )
        if (res) {
          this.snackbarText = 'Congratulations, your event has been published.'
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in app/Event/_id/index.vue while making a PATCH call to Event model from method publishEvent context:-URL:-${url}\n formData:-${this.formData}\n id:-${this.$route.params.id} `,
          e
        )
      }
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    getAttachmentLink(id, isDownloadLink) {
      const attachmentUrl = `https://${nuxtConfig.axios.eventUrl}${
        nuxtConfig.axios.apiEndpoint
      }Attachments${isDownloadLink ? '/download' : ''}${id ? '/' + id : ''}`
      return attachmentUrl
    },
    viewRegistration() {
      const regUrl = `https://${nuxtConfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
      window.open(`${regUrl}`, '_blank')
    },
    eventLink() {
      const baseUrl = getApiUrl()
      const regUrl = baseUrl.replace('svc/api', `e/${this.data.event.UniqLink}`)
      return regUrl
    },
    sessionLink() {
      const baseUrl = getApiUrl()
      const regUrl = baseUrl.replace('svc/api', `t/${this.data.event.UniqLink}`)
      return regUrl
    },
    embedLink() {
      const baseUrl = getApiUrl()
      const embedLink = baseUrl.replace(
        'svc/api',
        `embed/t/${this.data.event.UniqLink}`
      )
      const regUrl = `<iframe src="${embedLink}"></iframe>`
      return regUrl
    },
    redirectIntegration() {
      this.$router.push(
        `/apps/event/list/EventIntegration/integrations?event=${this.$route.params.id}`
      )
    },
    async updateEvent() {
      const obj = this.updateData
      obj.id = this.$route.params.id
      const URL = `https://${nuxtConfig.axios.eventUrl}${nuxtConfig.axios.apiEndpoint}Events/${this.$route.params.id}`
      try {
        const res = await this.$axios.$patch(URL, obj)
        if (res) {
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${this.$route.params.id} \n URL:- ${URL} \n Object:- ${obj}`,
          e
        )
      }
    },
    updateRegistrationSetting(eventData) {
      this.registrationSetting.showimagegallery = this.eventData._sectionHeading
        ? this.eventData._sectionHeading.showimagegallery
        : false
      this.registrationSetting.showeventreviews = this.eventData._sectionHeading
        ? this.eventData._sectionHeading.showeventreviews
        : false
    },
    async updateRegistrationPage() {
      const obj = this.updateSectionHeading
      const URL = `https://${nuxtConfig.axios.eventUrl}${nuxtConfig.axios.apiEndpoint}Events/${this.$route.params.id}`
      try {
        const res = await this.$axios.$patch(URL, obj)
        if (res) {
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateRegistrationPage context: EventId:-${this.$route.params.id} \n URL:- ${URL} \n Object:- ${obj}`,
          e
        )
      }
    },
    updateReg: _.debounce(function () {
      this.updateEvent()
    }, 500),
    updateReg1: _.debounce(function () {
      this.updateRegistrationPage()
    }, 500),
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
        this.eventData = event[0]
        this.eventData_sectionHeading =
          this.eventData._sectionHeading !== null
            ? this.eventData._sectionHeading
            : {}
        this.updateStepper()
        this.updateRegistrationSetting(this.eventData)
        this.eventUniqueLink = `https://${nuxtConfig.axios.eventUrl}/e/${event[0].UniqLink}`
        this.eventSessionLink = `https://${nuxtConfig.axios.eventUrl}/t/${event[0].UniqLink}`
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

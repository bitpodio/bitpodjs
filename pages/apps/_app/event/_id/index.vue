<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-1">
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
          <v-menu left :offset-y="offset" transition="slide-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item>
                <v-list-item-icon class="mr-2">
                  <i class="fa fa-paperplane mt-1" aria-hidden="true"></i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Publish to eventbrite</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
            </v-list>
          </v-menu>
        </v-flex>
        <v-chip small class="mt-1 mb-3 event-datechip" label>
          {{ formatedDate(data.event.StartDate, data.event.Timezone) }} -
          {{ formatedDate(data.event.EndDate, data.event.Timezone) }} -
          {{ formatField(data.event.Timezone) }}
        </v-chip>
        <v-flex>
          <div
            v-if="data.event.LocationType === 'Online Event'"
            class="pb-1"
            @click="viewRegistration"
          >
            <a>{{ viewRegistrationLink() }}</a>
          </div>
          <div v-else>
            <p class="blue--text body-2">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <a
                v-if="
                  data &&
                  data.event &&
                  data.event._VenueAddress &&
                  data.event._VenueAddress.AddressLine &&
                  !data.event._VenueAddress.AddressLine.includes(
                    data.event.VenueName
                  )
                "
                class="blue--text"
              >
                {{ formatAddressField(data.event.VenueName) }}
              </a>
              <a class="blue--text">
                {{
                  formatAddressField(
                    data.event._VenueAddress &&
                      data.event._VenueAddress.AddressLine
                  )
                }}
                {{
                  formatAddressField(
                    data.event._VenueAddress && data.event._VenueAddress.City
                  )
                }}
                {{
                  formatAddressField(
                    data.event._VenueAddress && data.event._VenueAddress.State
                  )
                }}
                {{
                  formatAddressField(
                    data.event._VenueAddress && data.event._VenueAddress.Country
                  )
                }}
                {{
                  formatAddressField(
                    data.event._VenueAddress &&
                      data.event._VenueAddress.PostalCode
                  )
                }}
              </a>
            </p>
          </div>
        </v-flex>

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
          alt-labels
          class="elevation-0 boxview mt-n3"
          style="max-width: 800px;"
        >
          <v-stepper-header success>
            <v-stepper-step
              step="3"
              complete
              color="success"
              class="ml-n13 body-2"
              >Not Ready</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              step="4"
              complete="true"
              color="success"
              class="body-2"
              >Open for regsitarion</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="4" class="body-2" color="success"
              >Sold out</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="" class="body-2" color="success"
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
      <div
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
              <v-list-item
                @click="
                  checkArray = []
                  badgeLogo = !badgeLogo
                "
              >
                <v-list-item-title>
                  <File
                    :field="fileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="badgeLogo"
                    :value="checkArray"
                    @input="fileUploadedBadgeLogo"
                  />
                  Badge Logo
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="
                  checkArray = []
                  eventBanner = !eventBanner
                "
              >
                <v-list-item-title>
                  <File
                    :field="fileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="eventBanner"
                    :value="checkArray"
                    @input="fileUploadedEventBanner"
                  />
                  Event Banner(680x350)
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="
                  checkArray = []
                  otherDialog = !otherDialog
                "
              >
                <v-list-item-title>
                  <File
                    :field="otherFileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="otherDialog"
                    :value="checkArray"
                    @input="fileUploadedOther"
                  />
                  Other
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
        <v-card
          v-for="image in data.event.Images"
          :key="image"
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0 cardImg rounded cursorPointer"
          :class="{ 'on-hover': hover }"
        >
          <span class="cardDelete">
            <i
              class="fa-trash pa-2 cursorPointer"
              @click="deleteBannerFile(e, image)"
            ></i>
          </span>
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="rounded"
            max-width="150"
            max-height="150"
            width="150"
            @click.stop="bannerDialog = true"
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
          <v-flex class="mt-1 d-flex">
            <v-card-text class="pa-0 pb-1 d-inline-block text-truncate"
              ><a
                class="d-inline-block text-truncate anchorTag"
                :href="getAttachmentLink(image, true)"
                >{{ bannerName }}</a
              ></v-card-text
            >
            <v-spacer></v-spacer>
            <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
          </v-flex>
          <v-card-text class="pa-0 mt-n2">Event Banner</v-card-text>
        </v-card>
        <v-dialog v-model="bannerDialog" max-width="600">
          <v-card>
            <v-card-title class="pa-1">
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="bannerDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="pa-1">
              <v-card
                v-for="image in data.event.Images"
                :key="image"
                class="mx-auto elevation-0"
                @click.stop="bannerDialog = true"
              >
                <v-img
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="white"
                  width="100%"
                  contain
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
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0 cardImg rounded"
        >
          <span class="cardDelete">
            <i
              class="fa-trash pa-2 cursorPointer"
              @click="deleteLogoFile(image)"
            ></i>
          </span>
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="rounded white"
            max-width="150"
            max-height="150"
            width="150"
            contain
            @click.stop="logoDialog = true"
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
          <v-flex class="mt-1 d-flex">
            <v-card-text class="pa-0 pb-1 d-inline-block"
              ><a
                class="d-inline-block text-truncate anchorTag"
                :href="getAttachmentLink(image, true)"
                >{{ logoName }}</a
              ></v-card-text
            >
            <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
          </v-flex>
          <v-card-text class="pa-0 mt-n2">Logo Image</v-card-text>
        </v-card>
        <v-dialog v-model="logoDialog" max-width="600">
          <v-card>
            <v-card-title class="pa-1">
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="logoDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="pa-1">
              <v-card
                v-for="image in data.event.Logo"
                :key="image"
                class="mx-auto elevation-0"
                @click.stop="logoDialog = true"
              >
                <v-img
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="white"
                  width="100%"
                  contain
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
          v-for="(image, index) in eventData.Other"
          :key="image"
          class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0 cardImg rounded"
        >
          <span class="cardDelete">
            <i
              class="fa-trash pa-2 cursorPointer"
              @click="deleteOtherFile(image)"
            ></i>
          </span>
          <v-img
            :src="getAttachmentLink(image, true)"
            :lazy-src="getAttachmentLink(image, true)"
            aspect-ratio="1"
            class="rounded"
            max-width="150"
            max-height="150"
            width="150"
            @click.stop="otherDialogOpen = true"
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
          <v-flex class="mt-1 d-flex">
            <v-card-text class="pa-0 pb-1"
              ><a
                class="d-inline-block text-truncate anchorTag"
                :href="getAttachmentLink(image, true)"
                >{{ OtherImageName[index] }}</a
              ></v-card-text
            >
            <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
          </v-flex>
          <v-card-text class="pa-0 mt-n2 otherImg">Logo Image</v-card-text>
        </v-card>
        <v-dialog v-model="otherDialogOpen" max-width="600">
          <v-card>
            <v-card-title class="pa-1">
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="otherDialogOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="pa-1">
              <v-card
                v-for="image in eventData.Other"
                :key="image"
                class="mx-auto elevation-0"
              >
                <v-img
                  :src="getAttachmentLink(image, true)"
                  :lazy-src="getAttachmentLink(image, true)"
                  aspect-ratio="1"
                  class="white"
                  width="100%"
                  contain
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
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-users pr-1" aria-hidden="true"></i> Attendees
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="eventAttendees" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
          view-name="eventRegistrations"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
          :context="data"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
            Sessions
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="eventSession" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
            Tasks
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="eventTasks" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
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
          class="mt-12"
        />
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-info-circle pr-1" aria-hidden="true"></i> Event
            Information
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click.stop="eventForm = true">
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

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pb-0 pr-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-id-badge pr-1" aria-hidden="true"></i> Badge
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="newbadge = true">
            <v-icon left>mdi-plus</v-icon>Create
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3 d-flex justify-center align-center>
          <div v-html="data.badge.Template" />
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
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

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-settings pr-1" aria-hidden="true"></i> Event
            Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="eventSetting = true">
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
          <div class="body-2 text--secondary">Cancelation Policy</div>
          <div class="body-1">
            {{ formatField(data.event.CancellationPolicy) }}
          </div>
        </v-flex>
        <v-flex my-3 class="d-block text-truncate">
          <span v-if="data.event.isRefundable === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Allow Cancelation</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Allow Cancelation</span>
          </span>
        </v-flex>
        <v-flex my-3 class="d-block text-truncate">
          <span v-if="data.event.SessionTimingConflict === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Validate Session Timing Conflict</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Validate Session Timing Conflict</span>
          </span>
        </v-flex>
        <v-flex my-3 class="d-block text-truncate">
          <span v-if="data.event.ShowRemainingTickets === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Remaining Tickets Count</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Remaining Tickets Count</span>
          </span>
        </v-flex>
        <v-flex my-3 class="d-block text-truncate">
          <span v-if="data.event.ShowAttendeeForm === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Show Attendee Form</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Show Attendee Form</span>
          </span>
        </v-flex>
        <v-flex my-3 class="d-block text-truncate">
          <span v-if="data.event.NotifyOrganizer === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Notify organizer when someone registers</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Notify organizer when someone registers</span>
          </span>
        </v-flex>
        <v-flex my-3>
          <span v-if="data.event.SendCalendar === true">
            <v-icon color="success">mdi-checkbox-marked-outline</v-icon>
            <span class="ml-2">Send calendar invite when registered</span>
          </span>
          <span v-else>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <span class="ml-2">Send calendar invite when registered</span>
          </span>
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
      <v-snackbar v-model="snackbar" :timeout="timeout" top="true">
        <div class="toast py-2 pr-1 pl-3">
          {{ snackbarText }}
        </div>
      </v-snackbar>
    </v-flex>
    <editEventForm :event-form.sync="eventForm" />
    <editSeoForm :seo-form.sync="seoForm" />
    <editEventSetting :event-setting.sync="eventSetting" />
    <editSiteSetting :site-setting.sync="siteSetting" />
    <makeCopy :is-make-copy.sync="isMakeCopy" />
  </v-flex>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import editSeoForm from './editSeoForm.vue'
import editEventForm from './editEventForm.vue'
import editEventSetting from './editEventSetting.vue'
import editSiteSetting from './editSiteSetting.vue'
import makeCopy from './makeCopy.vue'
import nuxtconfig from '~/nuxt.config'
import Grid from '~/components/common/grid'
import File from '~/components/common/form/file.vue'
import event from '~/config/apps/event/gql/event.gql'
import copy from '~/components/common/copy'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'

export default {
  components: {
    Grid,
    editSeoForm,
    editEventForm,
    editEventSetting,
    editSiteSetting,
    File,
    copy,
    makeCopy,
  },
  mixins: [configLoaderMixin],
  props: ['value', 'field'],
  data() {
    return {
      loading: 0,
      dialog: false,
      editeventform: false,
      editseoform: false,
      eventForm: false,
      seoForm: false,
      badgeLogo: false,
      eventBanner: false,
      otherDialog: false,
      eventSetting: false,
      siteSetting: false,
      logoDialog: false,
      bannerDialog: false,
      otherDialogOpen: false,
      formData: {
        Logo: [],
        Images: [],
        ImagesURL: [],
        Other: [],
      },
      eventData: {},
      checkArray: [],
      logoFileId: '',
      bannerFileId: '',
      otherFileId: '',
      isMakeCopy: false,
      data: {
        event: {},
        badge: {},
        eventSummary: {},
      },
      fileField: {
        multiple: false,
      },
      otherFileField: {
        multiple: true,
      },
      bannerName: '',
      OtherImageName: [],
      logoName: '',
      snackbar: false,
      timeout: '1000',
      snackbarText: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    baseUrl() {
      return nuxtconfig.axios.eventUrl
    },
  },
  watch: {
    eventData() {
      if (this.eventData.Other.length > 0) {
        this.getImageName()
      }
    },
  },

  methods: {
    getImageName() {
      this.eventData.Other.map((id) => {
        this.getOtherImageName(id)
      })
    },
    getImageUrl(imageId) {
      const downloadLink = this.getAttachmentLink(imageId, true)
      return downloadLink
    },
    async getBannerImageName(imageId) {
      try {
        const res = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/${imageId}`
        )
        if (res) {
          this.bannerName = res.fileName
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    async getLogoName(imageId) {
      try {
        const res = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/${imageId}`
        )
        if (res) {
          this.logoName = res.fileName
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    async getOtherImageName(imageId) {
      try {
        const res = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/${imageId}`
        )
        if (res) {
          this.OtherImageName.push(res.fileName)
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    fileUploadedBadgeLogo(data) {
      this.badgeLogo = false
      this.formData.Logo = []
      this.formData.Logo.push(data[0])
      this.updateEventGallery(this.formData)
    },
    fileUploadedEventBanner(data) {
      this.eventBanner = false
      const imageUrl = `/svc/api/Attachments/download/${data[0]}`
      this.formData.Images = []
      this.formData.ImagesURL = []
      this.formData.Images.push(data[0])
      this.formData.ImagesURL.push(imageUrl)

      this.updateEventGallery(this.formData)
    },
    fileUploadedOther(data) {
      this.otherDialog = false
      this.formData.Other = []
      this.formData.Other.push(...data)
      this.updateOtherImageGallery(this.formData.Other)
    },
    async updateEventGallery(formData) {
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}`,
          formData
        )
        if (res) {
          this.snackbarText = 'Attachment added successfully'
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    updateOtherImageGallery(formData) {
      try {
        formData.map(async (id) => {
          const res = await this.$axios.$put(
            `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}/Others/rel/${id}`
          )
          if (res) {
            this.snackbarText = 'Attachment added successfully'
            this.snackbar = true
            this.refresh()
          }
        })
      } catch (e) {
        console.log('Error', e)
      }
    },
    viewRegistrationLink() {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
      return regUrl
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPpp') : ''
    },
    formatedDate(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        const pattern = 'PPpp' // 'd.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
        const output = format(zonedDate, pattern, { timezone })
        return output
      }
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
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
    async deleteBannerFile(e, id) {
      const checkRes = confirm('Are you sure you want to delete')
      if (checkRes) {
        const res = await this.$axios.delete(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}/BannerImage/${id}`
        )
        if (res) {
          this.refresh()
          this.snackbarText = 'Attachment deleted successfully'
          this.snackbar = true
        }
      }
    },
    async deleteLogoFile(id) {
      const checkRes = confirm('Are you sure you want to delete')
      if (checkRes) {
        const res = await this.$axios.delete(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}/LogoURL/${id}`
        )
        if (res) {
          this.snackbarText = 'Attachment deleted successfully'
          this.snackbar = true
          this.refresh()
        }
      }
    },
    async deleteOtherFile(id) {
      const checkRes = confirm('Are you sure you want to delete')
      if (checkRes) {
        const res = await this.$axios.delete(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}/Others/${id}`
        )
        if (res) {
          this.snackbarText = 'Attachment deleted successfully'
          this.snackbar = true
          this.refresh()
        }
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
        this.eventData = event.length > 0 ? event[0] : {}
        if (event[0].Images.length > 0) {
          this.getBannerImageName(event[0].Images[0])
        }
        if (event[0].Logo.length > 0) {
          this.getLogoName(event[0].Logo[0])
        }
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
.upload-btn {
  position: relative;
  right: 45px;
  bottom: 28px;
}
.v-tags {
  min-height: 36px;
}
.cardImg {
  position: relative;
}
.cardDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 99;
  display: none;
}
.cardImg:hover .cardDelete {
  display: inline-block;
}

.otherImg {
  visibility: hidden;
}
.anchorTag {
  max-width: 120px;
}
</style>

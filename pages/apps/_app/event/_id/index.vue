<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column class="mxw-w70">
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
            <v-btn outlined color="primary" @click="publishEvent"
              >Publish</v-btn
            >
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
              <v-list-item @click="redirectIntegration">
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
        <v-chip small class="mt-1 mb-3 event-datechip greybg" label>
          {{ formatedDate(data.event.StartDate, data.event.Timezone) }} -
          {{ formatedDate(data.event.EndDate, data.event.Timezone) }} -
          {{ formatField(data.event.Timezone) }}
        </v-chip>
        <v-flex>
          <div v-if="data.event.LocationType === 'Online Event'" class="pb-1">
            <div v-if="data.event.WebinarLink">
              <v-icon class="fs-16 mr-1 primary--text mt-n1">fa-globe</v-icon>
              <a
                :href="data.event.WebinarLink"
                class="text-decoration-none"
                target="_blank"
              >
                {{ data.event.WebinarLink }}
              </a>
            </div>
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
          </h2>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                text
                small
                v-bind="attrs"
                v-on="on"
                @click="allow = true"
              >
                <v-icon left>fa-upload</v-icon> Upload
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                class="cursorPointer"
                @click.native="checkLogoClicked"
              >
                <v-list-item-title>
                  <File
                    :field="fileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="badgeLogo"
                    :value="checkArray"
                    :hide-preview="true"
                    @input="fileUploadedBadgeLogo"
                  />
                  Badge Logo
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="cursorPointer"
                @click.native="checkBannerClicked"
              >
                <v-list-item-title>
                  <File
                    :field="fileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="eventBanner"
                    :value="checkArray"
                    :hide-preview="true"
                    @input="fileUploadedEventBanner"
                  />
                  Event Banner(680x350)
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="cursorPointer"
                @click.native="checkOtherClicked"
              >
                <v-list-item-title>
                  <File
                    :field="otherFileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="otherDialog"
                    :value="checkArray"
                    :hide-preview="true"
                    @input="fileUploadedOther"
                  />
                  Other
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
        <div v-if="data.event.Images && data.event.Images.length === 0">
          <v-card
            class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-1 elevation-0 cardImg rounded cursorPointer"
            :class="{ 'on-hover': hover }"
          >
            <v-img
              :src="$config.cdnUri + 'default-min.jpg'"
              :lazy-src="$config.cdnUri + 'default-min.jpg'"
              aspect-ratio="1"
              class="rounded"
              max-width="150"
              max-height="150"
              width="150"
              position="right"
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
            <v-card-text class="pa-0 pt-1">Event Banner</v-card-text>
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
                  class="mx-auto elevation-0"
                  @click.stop="bannerDialog = true"
                >
                  <v-img
                    :src="$config.cdnUri + 'default-min.jpg'"
                    :lazy-src="$config.cdnUri + 'default-min.jpg'"
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
        <div>
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
          view-name="eventAttendees"
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
          view-name="eventRegistrations"
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
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 positionRelative rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-ticketalt pr-1" aria-hidden="true"></i>
            Tickets
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <div class="mt-2">
          <v-switch
            v-model="switchSeat"
            label="Seatmap & Tickets"
            class="mt-0 ml-2 max-h24 positionAbsolute"
            height="20"
          ></v-switch>
          <div v-if="switchSeat" class="d-flex justify-center">
            <v-flex
              class="d-flex flex-column justify-center ma-2 cursorPointer seat-actions pa-2"
              @click="routeToSeatmap"
            >
              <v-icon class="fs-16">mdi-plus</v-icon>
              <v-text class="text-center body-2 pt-1">New Seat Map</v-text>
            </v-flex>
            <v-flex
              class="d-flex flex-column justify-center ma-2 cursorPointer seat-actions pa-2"
            >
              <v-icon class="fs-16">fa-grid</v-icon>
              <v-text class="text-center body-2 pt-1"
                >Select Existing Seat Map</v-text
              >
            </v-flex>
          </div>
          <div v-else>
            <Grid
              view-name="eventTickets"
              :content="content"
              :context="data"
              class="mt-n14"
            />
          </div>
        </div>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
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

      <div
        v-if="data.event.LocationType !== 'Online Event'"
        class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pb-0 pr-2 box-grey"
      >
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-id-badge pr-1" aria-hidden="true"></i> Badge
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="openBadgeForm">
            <v-icon left>mdi-plus</v-icon>Create
          </v-btn>
          <v-btn text small class="ml-1" @click="openPrintForm">
            <v-icon left>fa-printer</v-icon>Print
          </v-btn>
          <v-menu left :offset-y="offset" transition="slide-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item @click="editBadgeForm = true">
                <v-icon left class="fs-16">fa-pencil</v-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="deleteBadge">
                <v-icon left class="fs-16">fa-trash</v-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3 d-flex justify-center align-center>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="getBadge(badgeData.Template)" />
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

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
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
            {{ formatField(data.event.UniqLink) }}
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
            debounce="500"
            height="20"
            class="ma-0 pa-0"
            label="Allow Cancelation"
            color="green"
            @change="updateReg"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.SessionTimingConflict"
            dense
            debounce="500"
            height="20"
            class="ma-0 pa-0"
            label="Validate Session Timing Conflict"
            color="green"
            @change="updateReg"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.ShowRemainingTickets"
            dense
            debounce="500"
            height="20"
            class="ma-0 pa-0"
            label="Show Remaining Tickets Count"
            color="green"
            @change="updateReg"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.ShowAttendeeForm"
            label="Show Attendee Form"
            color="green"
            dense
            debounce="500"
            height="20"
            class="ma-0 pa-0"
            @change="updateReg"
          ></v-checkbox>
        </v-flex>
        <v-flex class="d-block text-truncate">
          <v-checkbox
            v-model="data.event.NotifyOrganizer"
            dense
            debounce="500"
            height="20"
            class="ma-0 pa-0"
            label="Notify organizer when someone registers"
            color="green"
            @change="updateReg"
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
    <div v-if="eventForm">
      <editEventForm :event-form.sync="eventForm" />
    </div>
    <div v-if="seoForm">
      <editSeoForm :seo-form.sync="seoForm" />
    </div>
    <div v-if="eventSetting">
      <editEventSetting :event-setting.sync="eventSetting" />
    </div>
    <div v-if="siteSetting">
      <editSiteSetting :site-setting.sync="siteSetting" />
    </div>
    <makeCopy :key="isMakeCopy" :is-make-copy.sync="isMakeCopy" />
    <newBadgeForm :new-badge.sync="newBadge" />
    <editBadgeForm :id="badgeData.id" :edit-badge-form.sync="editBadgeForm" />
  </v-flex>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import _ from 'lodash'
import editSeoForm from './editSeoForm.vue'
import editEventForm from './editEventForm.vue'
import editEventSetting from './editEventSetting.vue'
import editSiteSetting from './editSiteSetting.vue'
import newBadgeForm from './newBadgeForm.vue'
import editBadgeForm from './editBadgeForm.vue'
import makeCopy from './makeCopy.vue'
import badge from '~/config/apps/event/gql/badge.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import eventAttendees from '~/config/apps/event/gql/eventAttendees.gql'
import nuxtconfig from '~/nuxt.config'
import Grid from '~/components/common/grid'
import File from '~/components/common/form/file.vue'
import event from '~/config/apps/event/gql/event.gql'
import copy from '~/components/common/copy'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin, getIdFromAtob, getApiUrl } from '~/utility'

export default {
  components: {
    Grid,
    editSeoForm,
    editEventForm,
    editEventSetting,
    editSiteSetting,
    newBadgeForm,
    editBadgeForm,
    File,
    copy,
    makeCopy,
  },
  mixins: [configLoaderMixin],
  props: {
    value: { type: null, default: null },
    field: { type: null, default: null },
    offset: { type: Boolean, default: false },
    switchSeat: { type: Boolean, required: false },
  },
  data() {
    return {
      loading: 0,
      dialog: false,
      editeventform: false,
      editseoform: false,
      eventForm: false,
      newBadge: false,
      editBadgeForm: false,
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
      badgeData: {},
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
      logoId: '',
      getBadgeCategory: 'Guest',
      attendees: [],
      Status: '',
      registrationSetting: {
        showimagegallery: false,
        showeventreviews: false,
      },
      hover: {},
      settingData: {},
      allow: true,
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    baseUrl() {
      return nuxtconfig.axios.eventUrl
    },
    updateData() {
      const dataObj = {
        isRefundable: this.data.event.isRefundable,
        SessionTimingConflict: this.data.event.SessionTimingConflict,
        ShowRemainingTickets: this.data.event.ShowRemainingTickets,
        ShowAttendeeForm: this.data.event.ShowAttendeeForm,
        NotifyOrganizer: this.data.event.NotifyOrganizer,
      }
      return dataObj
    },
    updateSectionHeading() {
      const dataObj = {
        _sectionHeading: {
          showimagegallery: this.registrationSetting.showimagegallery,
          showeventreviews: this.registrationSetting.showeventreviews,
        },
      }
      return dataObj
    },
  },
  watch: {
    eventData() {
      if (this.eventData.Other.length > 0) {
        this.getImageName()
      }
    },
  },
  mounted() {
    this.getAttendees()
  },

  methods: {
    openPrintForm() {
      const myWindow = window.open('', '', 'width=900,height=900')
      this.attendees.map((ele) => {
        const str = this.getBadgePrinted(this.badgeData.Template, ele)
        myWindow.document.write(`${str}`)
      })
      myWindow.document.close()
      myWindow.focus()
      myWindow.print()
      setTimeout(function () {
        myWindow.close()
      }, 1000)
    },
    openBadgeForm() {
      const res = confirm('New badge will replace your existing badge.')
      if (res) {
        this.newBadge = true
      }
    },
    async getAttendees() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${eventAttendees}
          `,
          variables: {
            filters: {
              where: {
                EventId: this.$route.params.id,
              },
            },
          },
        })
        if (result) {
          const attendeesData = formatGQLResult(result.data, 'Attendee')
          this.attendees = attendeesData
          return attendeesData
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GQL call to Attendee model in method getAttendees context: EventId:-${this.$route.params.id}`,
          e
        )
      }
    },
    getBadge(str) {
      this.getOrgInfo()
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${this.$auth.user.data.name}`)
          .replace('{{ Category }}', `${this.getBadgeCategory}`)
          .replace('{{ Organization }}', `${this.$store.state.currentOrg.name}`)
          .replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        if (this.data.event && this.data.event.Title) {
          str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
        }
      }
      return str
    },
    async selectedBadge(id) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${badge}
          `,
          variables: {
            filters: {
              where: {
                id: getIdFromAtob(id),
              },
            },
          },
        })
        const getSelectedBadgeData = formatGQLResult(result.data, 'Badge')
        const badgeCategory =
          getSelectedBadgeData.length > 0
            ? getSelectedBadgeData[0].Category
            : {}
        return badgeCategory
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GQL call to Badge model in method selectedBadge context: id:-${getIdFromAtob(
            id
          )}`
        )
      }
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
      this.formData.Status = 'Open for registration'
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
    getBadgePrinted(str, ele) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${ele.FullName}`)
          .replace(
            '{{ Category }}',
            `${(ele.regType && ele.regType.Name) || 'Guest'}`
          )
          .replace('{{ Organization }}', `${ele.CompanyName}`)
          .replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        if (this.data.event && this.data.event.Title) {
          str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
        }
      }
      return str
    },
    async deleteBadge() {
      const url = getApiUrl()
      const check = confirm('Are you sure you want to delete this badge?')
      if (check === true) {
        try {
          const res = await this.$axios.$delete(
            `https://${nuxtconfig.axios.eventUrl}${
              nuxtconfig.axios.apiEndpoint
            }Badges/${getIdFromAtob(this.badgeData.id)}`
          )
          if (res) {
            this.snackbarText = 'Badges deleted successfully'
            this.snackbar = true
            this.refresh()
          }
        } catch (e) {
          console.error(
            `Error in apps/event/_id/index.vue while making a DELETE call to Badge model in method deleteBadge context: url:-${url} BadgeId:-${getIdFromAtob(
              this.badgeData.id
            )}`,
            e
          )
        }
      }
    },
    async getOrgInfo() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${organizationInfo}
          `,
          variables: {
            filters: {
              where: {},
            },
          },
        })
        if (result) {
          const orgInfo = formatGQLResult(result.data, 'OrganizationInfo')
          this.logoId = orgInfo[0].Image[0]
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GQL call to OrganizationInfo model in method getOrgInfo `,
          e
        )
      }
    },
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
    checkLogoClicked() {
      if (this.allow) {
        this.checkArray = []
        this.badgeLogo = !this.badgeLogo
        this.allow = false
      }
    },
    checkBannerClicked() {
      if (this.allow) {
        this.checkArray = []
        this.eventBanner = !this.eventBanner
        this.allow = false
      }
    },
    checkOtherClicked() {
      if (this.allow) {
        this.checkArray = []
        this.otherDialog = !this.otherDialog
        this.allow = false
      }
    },
    fileUploadedBadgeLogo(data) {
      this.allow = true
      if (data.length > 0) {
        this.formData.Logo = []
        this.formData.Logo.push(data[0])
        this.updateEventGallery(this.formData)
      }
    },
    fileUploadedEventBanner(data) {
      this.allow = true
      if (data.length > 0) {
        const imageUrl = `/svc/api/Attachments/download/${data[0]}`
        this.formData.Images = []
        this.formData.ImagesURL = []
        this.formData.Images.push(data[0])
        this.formData.ImagesURL.push(imageUrl)

        this.updateEventGallery(this.formData)
      }
    },
    fileUploadedOther(data) {
      this.allow = true
      if (data.length > 0) {
        this.formData.Other = []
        this.formData.Other.push(...data)
        this.updateOtherImageGallery(this.formData.Other)
      }
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
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatedDate(date, timezone) {
      if (date) {
        const formattedDate = new Date(date)
        const zonedDate = utcToZonedTime(formattedDate, timezone)
        const pattern = 'PPp' // 'd.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
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
    redirectIntegration() {
      this.$router.push(
        `/apps/event/list/Event/integrations?event=${this.$route.params.id}`
      )
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
      const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}`
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
    async updateEvent() {
      const obj = this.updateData
      obj.id = this.$route.params.id
      const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}`
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
    updateReg: _.debounce(function () {
      this.updateEvent()
    }, 500),
    updateReg1: _.debounce(function () {
      this.updateRegistrationPage()
    }, 500),
    routeToSeatmap() {
      this.$router.push(`/apps/seatmap/new`)
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
        this.badgeData = badge.length > 0 ? badge[0] : {}
        this.updateRegistrationSetting(this.eventData)

        this.updateStepper()
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
.seat-actions {
  border: 1px dashed #ccc;
  max-width: 240px;
}
.max-h24 {
  max-height: 24px;
  right: 12px;
  top: 10px;
}
</style>

<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Common.EventApp" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex column class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex pb-1 flex-column flex-md-row">
            <div class="text-h4 text-capitalize event-title">
              {{ data.event.Title }}
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex">
              <div
                v-if="
                  eventData.LocationType === 'Bitpod Virtual' &&
                  data.event.Status !== 'Not ready'
                "
                class="mr-2"
              >
                <v-btn
                  depressed
                  tile
                  color="success"
                  class="rounded"
                  @click="goLive"
                >
                  <i18n path="Common.JoinEvent" />

                  <v-icon right class="fs-22">
                    mdi-video
                  </v-icon>
                </v-btn>
              </div>
              <div class="mr-2">
                <v-btn depressed color="primary" @click="viewRegistration"
                  ><i18n path="Drawer.View"
                /></v-btn>
              </div>
              <div v-if="data.event.Status === 'Not ready'" class="mr-2">
                <v-btn outlined color="primary" @click="publishEvent"
                  ><i18n path="Drawer.Publish"
                /></v-btn>
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
                      <v-list-item-title
                        ><i18n path="Drawer.Publishtoeventbrite"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="isMakeCopy = true">
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.MakeaCopy"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <i
                        class="fa fa-pencil-square-o mt-1"
                        aria-hidden="true"
                      ></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.Editemailtemplate"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="redirectIntegration">
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-link1 mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.Integrations"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-flex>
          <v-chip
            v-if="
              data.event.StartDate !== undefined &&
              data.event.EndDate !== undefined
            "
            small
            class="mt-1 mb-3 event-datechip greybg"
            label
          >
            {{ getEventStartDate() }} - {{ getEventEndDate() }} -
            {{ formatField(data.event.Timezone) }}
          </v-chip>
          <v-flex>
            <div
              v-if="
                data.event.LocationType === 'Online Event' ||
                data.event.LocationType === 'Online event'
              "
              class="pb-1"
            >
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
            <div
              v-else-if="data.event.LocationType === 'Bitpod Virtual'"
              class="pb-1 d-inline-flex"
            >
              <a class="text-truncate bitpodLink" @click="goLive"
                ><v-icon class="fs-16 mr-1 primary--text mt-n1">fa-video</v-icon
                >{{ viewBitpodVirtualLink() }}</a
              >
              <copy
                class="pl-2"
                :text-to-copy="viewBitpodVirtualLink()"
                icon-size="20"
                tooltip="Copy attendee link"
              />
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
                      data.event._VenueAddress &&
                        data.event._VenueAddress.Country
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
                <i18n
                  path="Common.TotalRegistration"
                  class="caption text-truncate"
                />
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
                <i18n
                  path="Common.AbandonedRegistration"
                  class="caption text-truncate"
                />
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

                <i18n path="Common.Revenue" class="caption text-truncate" />
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

                <i18n
                  path="Common.TotalSessions"
                  class="caption text-truncate"
                />
              </div>
            </div>

            <div
              v-if="data.event.MySpeakers && data.event.MySpeakers.length > 0"
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

                <i18n
                  path="Common.TotalSpeakers"
                  class="caption text-truncate"
                />
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
                <i18n
                  path="Common.29Days"
                  class="event-tile-value text-truncate"
                />

                <i18n path="Common.OpensIn" class="caption text-truncate" />
              </div>
            </div>
          </v-flex>

          <v-stepper
            v-if="data.event.Title"
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
                ><i18n path="Common.NotReady" />
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="2"
                :complete="Status > 1"
                color="success"
                class="body-2"
                @click="changeStatus('Open for registration')"
                ><i18n path="Common.OpenForRegistration" />
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="3"
                :complete="Status > 2"
                class="body-2"
                color="success"
                @click="changeStatus('Sold out')"
                ><i18n path="Common.SoldOut" />
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="4"
                :complete="Status > 3"
                class="body-2"
                color="success"
                @click="changeStatus('Registration closed')"
                ><i18n path="Common.RegistrationClosed" />
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>

          <v-divider></v-divider>
          <v-flex class="d-flex flex-row align-center flex-wrap pt-2 pt-sm-0">
            <v-chip pill class="greybg" v-on="on">
              <v-avatar left color="warning" size="24">
                <span class="white--text name-initial">{{
                  data.event.createdBy
                }}</span>
              </v-avatar>
              <span>{{ data.event.createdBy }}</span>
            </v-chip>
            <v-subheader
              v-if="data.event.createdDate !== undefined"
              class="d-inline-flex pl-1"
              >{{
                $t('Common.CreatedThisEventOn', {
                  date: $d(
                    new Date(data.event.createdDate),
                    'short',
                    $i18n.locale
                  ),
                })
              }}
            </v-subheader>
          </v-flex>
        </div>
        <div
          class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-2">
            <h2 class="body-1 pb-0">
              <i class="fa fa-image pr-1" aria-hidden="true"></i>
              <i18n path="Common.ImageGallery" />
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
                  <v-icon left>fa-upload</v-icon> <i18n path="Drawer.Upload" />
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
                    <i18n path="Common.BadgeLogo" />
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
                    <i18n path="Common.EventB" />
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
                    <i18n path="Common.Other" />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-flex>
          <v-divider></v-divider>
          <div>
            <v-card
              v-if="data.event.Images && data.event.Images.length === 0"
              class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-5 pr-3 elevation-0 cardImg rounded cursorPointer"
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
                @click.stop="dbannerDialog = true"
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
              <v-flex class="mt-1 d-flex otherImg">
                <v-card-text class="pa-0 pb-1"
                  ><a
                    class="d-inline-block text-truncate anchorTag"
                    :href="getAttachmentLink(image, true)"
                    >{{ OtherImageName[index] }}</a
                  ></v-card-text
                >
                <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
              </v-flex>
              <v-card-text class="pa-0 mt-n2"
                ><i18n path="Common.BannerImage"
              /></v-card-text>
            </v-card>
            <v-dialog v-model="dbannerDialog" max-width="600">
              <v-card>
                <v-card-title class="pa-1">
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn icon @click="dbannerDialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-card-title>
                <v-img :src="$config.cdnUri + 'default-min.jpg'"> </v-img>
              </v-card>
            </v-dialog>
            <v-card
              v-for="image in data.event.Images"
              :key="image"
              class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-5 pr-3 elevation-0 cardImg rounded cursorPointer"
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
              <v-card-text class="pa-0 mt-n2"
                ><i18n path="Common.EventBanner"
              /></v-card-text>
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
                    <v-img :src="getAttachmentLink(image, true)"> </v-img>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-card
              v-for="image in data.event.Logo"
              :key="image"
              class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-5 pr-3 elevation-0 cardImg rounded"
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
              <v-card-text class="pa-0 mt-n2"
                ><i18n path="Common.LogoImage"
              /></v-card-text>
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
                    <v-img :src="getAttachmentLink(image, true)"> </v-img>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-card
              v-for="(image, index) in eventData.Other"
              :key="index"
              class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-5 pr-3 elevation-0 cardImg rounded"
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
                @click.stop="openOtherDialog(image)"
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
              <v-flex class="mt-1 d-flex">
                <v-card-text class="pa-0 pb-1">
                  <a
                    class="d-inline-block text-truncate anchorTag"
                    :href="getAttachmentLink(image, true)"
                    >{{
                      OtherImageName[index] && OtherImageName[index].fileName
                    }}</a
                  >
                </v-card-text>
                <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
              </v-flex>
              <v-card-text class="pa-0 mt-n2 otherImg"
                ><i18n path="Common.LogoImage"
              /></v-card-text>
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
                <v-img :src="displaySelectedOtherImage"> </v-img>
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
              <i class="fa fa-users pr-1" aria-hidden="true"></i>
              <i18n path="Common.Attendees" />
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
              <i18n path="Common.Registrations" />
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
              <i18n path="Common.Invites" />
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
              <i18n path="Common.TicketsNotRequired" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <div class="mt-2 seatmap-btn">
            <v-switch
              v-if="data.event.LocationType === 'Venue'"
              v-model="switchSeat"
              :label="$t('Common.SeatmapTickets')"
              class="mt-0 ml-0 max-h24 positionAbsolute"
              height="20"
              @change="updateSeatReservation"
            ></v-switch>
            <div v-if="switchSeat" class="d-flex justify-center">
              <div v-if="layoutId && switchDailog" class="text-center">
                <v-hover v-slot:default="{ hover }">
                  <div>
                    <v-card
                      :elevation="hover ? 1 : 0"
                      class="ma-3 mt-0 ma-auto seatMaptile"
                      height="110"
                      max-width="110"
                      width="110"
                    >
                      <v-card-text>
                        <div>
                          <v-icon size="64" color="warning">fa-grid</v-icon>
                        </div>
                      </v-card-text>
                      <v-flex
                        v-if="hover"
                        class="d-flex justify-center text-center"
                      >
                        <v-card-action class="mt-n4">
                          <div class="d-flex justify-center text-center pb-5">
                            <div class="mr-1" @click="onEditSeatMap">
                              <v-icon small color="black">fa-pencil</v-icon>
                            </div>
                            <div @click="popupDialog = true">
                              <v-icon small color="black">fa-trash</v-icon>
                            </div>
                          </div>
                        </v-card-action>
                      </v-flex>
                    </v-card>
                    <div class="text-truncate text-capitalize text-center">
                      {{ layoutName }}
                    </div>
                  </div>
                </v-hover>
              </div>
              <div
                v-else-if="switchDailog"
                class="d-inline-flex flex-column flex-sm-row"
              >
                <v-flex
                  class="d-flex flex-column justify-center ma-2 cursorPointer seat-actions pa-2"
                  @click="routeToSeatmap"
                >
                  <v-icon class="fs-16">mdi-plus</v-icon>
                  <v-text class="text-center body-2 pt-1"
                    ><i18n path="Common.NewSeatMap"
                  /></v-text>
                </v-flex>
                <v-flex
                  class="d-flex flex-column justify-center ma-2 cursorPointer seat-actions pa-2"
                  @click="selectExistingSeatMap = true"
                >
                  <v-icon class="fs-16">fa-grid</v-icon>
                  <v-text class="text-center body-2 pt-1"
                    ><i18n path="Common.SelectExistingSeatMap"
                  /></v-text>
                </v-flex>
              </div>
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
              <i18n path="Common.DiscountCodes" />
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
              <i18n path="Common.RegistrationQuestions" />
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
              <i18n path="Common.Sessions" />
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
              <i18n path="Common.Speakers" />
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
              <i18n path="Common.Tasks" />
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
              <i18n path="Common.RegistrationForm" />
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
          class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
              <i18n path="Common.Notes" />
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-info-circle pr-1" aria-hidden="true"></i>
                  <i18n path="Common.EventInformation" />
                </h2>
              </template>
              <span><i18n path="Common.EventInformation" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click.stop="eventForm = true">
              <v-icon left class="fs-16">fa-pencil</v-icon
              ><i18n path="Drawer.Edit" />
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <i18n path="Common.Organizer" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.Organizer) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.EventManager" class="body-2 text--secondary" />

            <div class="body-1 text--primary">
              {{ formatField(data.event.EventManager) }}
            </div>
          </v-flex>
          <v-flex v-if="data.event.Tags" my-3>
            {{ $t('Common.Tags') }}
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
          v-if="data.event.LocationType === 'Venue'"
          class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pb-0 pr-2 box-grey"
        >
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-id-badge pr-1" aria-hidden="true"></i>
                  <i18n path="Common.Badge" />
                </h2>
              </template>
              <span><i18n path="Common.Badge" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click="openBadgeForm">
              <v-icon left>mdi-plus</v-icon><i18n path="Drawer.Create" />
            </v-btn>
            <v-btn text small class="ml-1" @click="openPrintForm">
              <v-icon left>fa-printer</v-icon><i18n path="Drawer.Print" />
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
                    <v-list-item-title
                      ><i18n path="Drawer.Edit"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteBadge">
                  <v-icon left class="fs-16">fa-trash</v-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      ><i18n path="Drawer.Delete"
                    /></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-flex>
          <v-divider></v-divider>
          <iframe
            v-show="false"
            id="print"
            ref="iframe"
            style="
              width: 500px;
              position: relative;
              right: 252px;
              height: 500px;
            "
          >
          </iframe>
          <v-flex ref="printForm" my-3 d-flex justify-center align-center>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="getBadge(badgeData.Template)" />
          </v-flex>
        </div>

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.SEODetails" />
                </h2>
              </template>
              <span><i18n path="Common.SEODetails" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click="seoForm = true">
              <v-icon left class="fs-16">fa-pencil</v-icon
              ><i18n path="Drawer.Edit" />
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <i18n path="Common.SEOTitle" class="body-2 text--secondary" />

            <div class="body-1">
              {{ formatField(data.event.SEOTitle) }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.SEODescription" class="body-2 text--secondary" />
            <div class="body-1 d-flex flex-wrap braek-all">
              {{ formatField(data.event.SEODesc) }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.SEOKeywords" class="body-2 text--secondary" />

            <div class="body-1 d-flex flex-wrap braek-all">
              {{ formatField(data.event.SEOKeywords) }}
            </div>
          </v-flex>
        </div>

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-settings pr-1" aria-hidden="true"></i>
                  <i18n path="Common.EventSettings" />
                </h2>
              </template>
              <span><i18n path="Common.EventSettings" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click="eventSetting = true">
              <v-icon left class="fs-16">fa-pencil</v-icon
              ><i18n path="Drawer.Edit" />
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <i18n path="Common.Privacy" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.Privacy) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.Currency" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.Currency) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.GLAccountCode" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.ProjectCode) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.CostCenter" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.CostCenter) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.BusinessType" class="body-2 text--secondary" />

            <div class="body-1">{{ formatField(data.event.BusinessType) }}</div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.EventLink" class="body-2 text--secondary" />

            <div class="body-1 d-block text-truncate">
              {{ eventLink(data.event.UniqLink) }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n
              path="Common.CancellationPolicy"
              class="body-2 text--secondary"
            />

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
              :label="$t('Common.AllowCancelation')"
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
              :label="$t('Common.ValidateSessionTimingConflict')"
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
              :label="$t('Common.ShowRemainingTicketsCount')"
              color="green"
              @change="updateReg"
            ></v-checkbox>
          </v-flex>
          <v-flex class="d-block text-truncate">
            <v-checkbox
              v-model="data.event.ShowAttendeeForm"
              :label="$t('Common.ShowAttendeeForm')"
              color="green"
              dense
              debounce="500"
              height="20"
              class="ma-0 pa-0"
              @change="updateReg"
            ></v-checkbox>
          </v-flex>
          <v-flex class="mt-2">
            <v-checkbox
              v-model="data.event.NotifyOrganizer"
              dense
              debounce="500"
              height="20"
              class="ma-0 pa-0"
              :label="$t('Common.NotifyOrganizer')"
              color="green"
              @change="updateReg"
            ></v-checkbox>
          </v-flex>
          <v-flex class="d-block text-truncate">
            <v-checkbox
              v-model="data.event.printBadgeOnCheckIn"
              dense
              debounce="500"
              height="20"
              class="ma-0 pa-0"
              :label="$t('Common.AskToPrintBadgeAfterCheckin')"
              color="green"
              @change="updateReg"
            ></v-checkbox>
          </v-flex>
        </div>
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.RegistrationPageSettings" />
                </h2>
              </template>
              <span><i18n path="Common.RegistrationPageSettings" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click="siteSetting = true">
              <v-icon left class="fs-16">fa-pencil</v-icon
              ><i18n path="Drawer.Edit" />
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <i18n
              path="Common.RegistrationSiteTemplate"
              class="body-2 text--secondary"
            />

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
              :label="$t('Common.ShowImageGallery')"
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
              :label="$t('Common.ShowEventReviews')"
              color="green"
              @change="updateReg1()"
            ></v-checkbox>
          </v-flex>
        </div>
        <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
          <div class="fs-16 text-center">
            {{ snackbarText }}
          </div>
        </v-snackbar>
        <v-dialog v-model="popupDialog" width="500">
          <v-card>
            <v-card-text class="pt-3">
              <i18n path="Common.DeleteLayout" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small dark dense @click="onDeleteSeatMap">
                <i18n path="Drawer.OK" />
              </v-btn>
              <v-btn
                color="primary"
                small
                outlined
                dense
                @click="popupDialog = false"
              >
                <i18n path="Drawer.Cancel" />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <div v-if="eventForm">
        <editEventForm :event-form.sync="eventForm" :snackbar.sync="snackbar" />
      </div>
      <div v-if="seoForm">
        <editSeoForm :seo-form.sync="seoForm" :snackbar.sync="snackbar" />
      </div>
      <div v-if="eventSetting">
        <editEventSetting
          :event-setting.sync="eventSetting"
          :snackbar.sync="snackbar"
        />
      </div>
      <div v-if="siteSetting">
        <editSiteSetting
          :site-setting.sync="siteSetting"
          :snackbar.sync="snackbar"
        />
      </div>
      <makeCopy :key="isMakeCopy" :is-make-copy.sync="isMakeCopy" />
      <newBadgeForm :new-badge.sync="newBadge" :snackbar.sync="snackbar" />
      <editBadgeForm
        :id="badgeData.id"
        :edit-badge-form.sync="editBadgeForm"
        :snackbar.sync="snackbar"
      />
      <selectExistingSeatMap
        :select-existing-seat-map.sync="selectExistingSeatMap"
      />
      <confirm ref="confirm"></confirm>
    </v-flex>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import _ from 'lodash'
import editSeoForm from './editSeoForm.vue'
import selectExistingSeatMap from './selectExistingSeatMap.vue'
import editEventForm from './editEventForm.vue'
import editEventSetting from './editEventSetting.vue'
import editSiteSetting from './editSiteSetting.vue'
import newBadgeForm from './newBadgeForm.vue'
import editBadgeForm from './editBadgeForm.vue'
import makeCopy from './makeCopy.vue'
import badge from '~/config/apps/event/gql/badge.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import nuxtconfig from '~/nuxt.config'
import Grid from '~/components/common/grid'
import File from '~/components/common/form/file.vue'
import event from '~/config/apps/event/gql/event.gql'
import copy from '~/components/common/copy'
import Notes from '~/components/common/notes'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin, getIdFromAtob } from '~/utility'

export default {
  components: {
    Grid,
    editSeoForm,
    editEventForm,
    editEventSetting,
    editSiteSetting,
    selectExistingSeatMap,
    newBadgeForm,
    editBadgeForm,
    File,
    copy,
    makeCopy,
    Notes,
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
      selectExistingSeatMap: false,
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
      dbannerDialog: false,
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
      timeout: '4000',
      snackbarText: this.$t('Messages.Success.EventDetailsUpdateSuccess'),
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
      displaySelectedOtherImage: '',
      layoutId: '',
      switchDailog: false,
      layoutName: '',
      popupDialog: false,
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
        printBadgeOnCheckIn: this.data.event.printBadgeOnCheckIn,
      }
      return dataObj
    },
    updateSectionHeading() {
      const dataObj = {
        RegistrationSiteTemplate: this.eventData.RegistrationSiteTemplate
          ? this.eventData.RegistrationSiteTemplate
          : 'event',
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
  mounted() {
    this.getAttendees()
    setTimeout(this.openPrint, 3000)
  },

  methods: {
    getEventStartDate() {
      return this.$d(
        new Date(
          this.formatedDate(this.eventData.StartDate, this.eventData.Timezone)
        ),
        'long',
        this.$i18n.locale
      )
    },
    goBack() {
      this.$router.back()
    },
    getEventEndDate() {
      return this.$d(
        new Date(
          this.formatedDate(this.eventData.EndDate, this.eventData.Timezone)
        ),
        'long',
        this.$i18n.locale
      )
    },
    eventLink() {
      const baseUrl = this.$bitpod.getApiUrl()
      const regUrl = baseUrl.replace(
        'svc/api/',
        `e/${this.data.event.UniqLink}`
      )
      const url = this.formatField(regUrl)
      return url
    },
    openOtherDialog(image) {
      this.otherDialogOpen = true
      this.displaySelectedOtherImage = this.getAttachmentLink(image, true)
    },
    goLive() {
      window.open(
        `apps/event/live/${this.eventData.UniqLink}?e=${this.$route.params.id}`
      )
    },
    openPrintForm() {
      const logoUrl = `src="${
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      }"`
      let str
      this.getAttendees()
      if (this.attendees.length > 0) {
        this.attendees.map((ele) => {
          if (this.logoId !== '') {
            str = this.getBadgePrinted(this.badgeData.Template, ele)
          } else {
            str = this.getBadgePrinted(this.badgeData.Template, ele)
            str = str.replace(logoUrl, '')
          }
          if (
            this.eventData.LocationType === 'Venue' &&
            this.$refs.iframe &&
            this.$refs.printForm
          ) {
            this.$refs.iframe.contentWindow.document.write(
              `<div style="display:flex">${str}</div>`
            )
          }
        })
      } else {
        if (this.logoId !== '') {
          str = this.getBadge(this.badgeData.Template)
        } else {
          str = this.getBadge(this.badgeData.Template)
          str = str.replace(logoUrl, '')
        }
        this.$refs.iframe.contentWindow.document.write(
          `<div style="display:flex">${str}</div>`
        )
      }
      setTimeout(this.getPrinted, 3000)
    },
    getPrinted() {
      this.$refs.iframe.contentWindow.print()
      this.$refs.iframe.contentWindow.close()
      this.$refs.iframe.contentWindow.document.close()
    },
    openPrint() {
      this.$refs.iframe.contentWindow.document.firstChild.innerHTML = this.$refs.printForm.innerHTML
    },
    async openBadgeForm() {
      const res = await this.$refs.confirm.open(
        this.$t('Common.NewBadge'),
        this.$t('Messages.Warn.ReplaceBadge'),
        { color: 'warning' }
      )
      if (res) {
        this.newBadge = true
      }
    },
    async getAttendees() {
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.get(
          `${url}Events/${this.$route.params.id}/Attende`
        )
        if (res) {
          this.attendees = res.data
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GQL call to Attendee model in method getAttendees context: EventId:-${this.$route.params.id}`,
          e
        )
      }
    },
    getBadge(str) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${this.$auth.user.data.name}`)
          .replace('{{ Category }}', `${this.getBadgeCategory}`)
          .replace('{{ Organization }}', `${this.$store.state.currentOrg.name}`)
        if (this.logoId !== '') {
          str = str.replace(
            logoUrl,
            this.getAttachmentLink(this.logoId, true) || logoUrl
          )
        }
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
      const url = this.$bitpod.getApiUrl()
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
        console.error(
          `Error in app/Event/_id/index.vue while making a PATCH call to Event model from method changeStatus context:-URL:-${url}\nInput:-\t Status:-${statusName}\n id:-${this.$route.params.id} `,
          e
        )
      }
    },
    async publishEvent() {
      const eventObj = {
        Status: 'Open for registration',
      }
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.patch(
          `${url}Events/${this.$route.params.id}`,
          eventObj
        )
        if (res) {
          this.snackbarText = this.$t('Messages.Success.EventPublished')
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
        if (this.logoId !== '') {
          str = str.replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        }
        if (this.data.event && this.data.event.Title) {
          str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
        }
      }
      return str
    },
    async deleteBadge() {
      const url = this.$bitpod.getApiUrl()
      const check = await this.$refs.confirm.open(
        this.$t('Common.DeleteBadge'),
        this.$t('Messages.Warn.DeleteBadge'),
        { color: 'error lighten-1' }
      )
      if (check === true) {
        try {
          const res = await this.$axios.$delete(
            `${url}Badges/${getIdFromAtob(this.badgeData.id)}`
          )
          if (res) {
            this.snackbarText = this.$t('Messages.Success.BadgesDeleteSuccess')
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
          if (this.eventData.Logo.length > 0) {
            this.logoId = this.eventData.Logo[0]
          } else if (
            this.eventData.Logo.length === 0 &&
            orgInfo[0].Image.length === 0
          ) {
            this.logoId = ''
          } else {
            this.logoId = orgInfo[0].Image[0]
          }
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GQL call to OrganizationInfo model in method getOrgInfo `,
          e
        )
      }
    },
    async getImageName() {
      const url = this.$bitpod.getApiUrl()
      const imageData = await Promise.all(
        this.eventData.Other.map((id) => {
          return this.$axios.$get(`${url}Attachments/${id}`)
        })
      )
      this.OtherImageName = imageData
    },
    getImageUrl(imageId) {
      const downloadLink = this.getAttachmentLink(imageId, true)
      return downloadLink
    },
    async getBannerImageName(imageId) {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}Attachments/${imageId}`)
        if (res) {
          this.bannerName = res.fileName
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GET call to Attachment model in method getBannerImageName context: URL:- ${url} \n ImageId:-${imageId}`,
          e
        )
      }
    },
    async getLogoName(imageId) {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}Attachments/${imageId}`)
        if (res) {
          this.logoName = res.fileName
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a GET call to Attachment model in method getLogoName context: URL:- ${url} \n ImageId:-${imageId}`,
          e
        )
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
        this.updateEventGallery({ Logo: this.formData.Logo })
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

        this.updateEventGallery({ Images: this.formData.Images })
      }
    },
    fileUploadedOther(data) {
      this.allow = true
      if (data.length > 0) {
        this.formData.Other.push(data)
        this.updateOtherImageGallery(data)
      }
    },
    async updateEventGallery(formData) {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$patch(
          `${url}Events/${this.$route.params.id}`,
          formData
        )
        if (res) {
          this.snackbarText = this.$t('Messages.Success.AttachmentAddSuccess')
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a PATCH call to Event model in method updateEventGallery context: URL:- ${url} \nEventId:-${this.$route.params.id}\n formData:-${formData}`,
          e
        )
      }
    },
    updateOtherImageGallery(formData) {
      const url = this.$bitpod.getApiUrl()
      formData
        .reduce((acc, i) => {
          return acc.then(() => {
            return this.$axios.$put(
              `${url}Events/${this.$route.params.id}/Others/rel/${i}`
            )
          })
        }, Promise.resolve())
        .then(() => {
          this.snackbarText = this.$t('Messages.Success.AttachmentAddSuccess')
          this.snackbar = true
          return this.refresh()
        })
        .catch((e) => {
          console.error(
            `Error in apps/event/_id/index.vue while making a PUT call to Event model in method updateOtherImageGallery context: EventId:-${this.$route.params.id} \n URL:- ${url} \n formData:- ${formData}`,
            e
          )
        })
    },
    viewRegistrationLink() {
      const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
      return regUrl
    },
    viewBitpodVirtualLink() {
      return `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}/${this.data.event.UniqLink}`
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
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    viewRegistration() {
      const orgName = this.$store.state.currentOrg.name
      if (orgName === 'bitpod') {
        const regUrl = `https://${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
        window.open(`${regUrl}`, '_blank')
      } else {
        const regUrl = `https://${orgName}-${nuxtconfig.axios.eventUrl}/e/${this.data.event.UniqLink}`
        window.open(`${regUrl}`, '_blank')
      }
    },
    async deleteBannerFile(e, id) {
      const url = this.$bitpod.getApiUrl()
      const checkRes = await this.$refs.confirm.open(
        this.$t('Drawer.Delete'),
        this.$t('Messages.Warn.DeleteImage'),
        { color: 'error lighten-1' }
      )
      if (checkRes) {
        const res = await this.$axios.delete(
          `${url}Events/${this.$route.params.id}/BannerImage/${id}`
        )
        if (res) {
          this.refresh()
          this.snackbarText = this.$t(
            'Messages.Success.AttachmentDeleteSuccess'
          )
          this.snackbar = true
        }
      }
    },
    async deleteLogoFile(id) {
      const url = this.$bitpod.getApiUrl()
      const checkRes = await this.$refs.confirm.open(
        this.$t('Drawer.Delete'),
        this.$t('Messages.Warn.DeleteImage'),
        { color: 'error lighten-1' }
      )
      if (checkRes) {
        const res = await this.$axios.delete(
          `${url}Events/${this.$route.params.id}/LogoURL/${id}`
        )
        if (res) {
          this.snackbarText = this.$t(
            'Messages.Success.AttachmentDeleteSuccess'
          )
          this.snackbar = true
          this.refresh()
        }
      }
    },
    async deleteOtherFile(id) {
      const url = this.$bitpod.getApiUrl()
      const checkRes = await this.$refs.confirm.open(
        this.$t('Drawer.Delete'),
        this.$t('Messages.Warn.DeleteImage'),
        { color: 'error lighten-1' }
      )
      if (checkRes) {
        const res = await this.$axios.delete(
          `${url}Events/${this.$route.params.id}/Others/${id}`
        )
        if (res) {
          this.snackbarText = this.$t(
            'Messages.Success.AttachmentDeleteSuccess'
          )
          this.snackbar = true
          this.refresh()
        }
      }
    },
    redirectIntegration() {
      this.$router.push(
        this.localePath(
          `/apps/event/list/EventIntegration/integrations?event=${this.$route.params.id}`
        )
      )
    },
    updateRegistrationSetting(eventData) {
      this.registrationSetting.showimagegallery = this.eventData._sectionHeading
        ? this.eventData._sectionHeading.showimagegallery
        : false
      this.registrationSetting.showeventreviews = this.eventData._sectionHeading
        ? this.eventData._sectionHeading.showeventreviews
        : false
      this.layoutId = this.eventData ? this.eventData.LayoutId : ''
      this.switchDailog = this.eventData
        ? this.eventData.SeatReservation
        : false
      if (this.switchDailog) {
        this.switchSeat = true
      }
    },
    async updateRegistrationPage() {
      const obj = this.updateSectionHeading
      const URL = `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
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
      const URL = `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
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
      this.$router.push(
        this.localePath(`/apps/seatmap/new?event=${this.$route.params.id}`)
      )
    },
    async updateSeatReservation() {
      const seatReservation = this.switchSeat
      const URL = `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
      const obj = { SeatReservation: seatReservation }
      try {
        const res = await this.$axios.$patch(URL, obj)
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${this.$route.params.id} \n URL:- ${URL} \n Object:- ${obj}`,
          e
        )
      }
    },
    async getSeatMap(eventData) {
      const layoutId = this.eventData.LayoutId
      if (layoutId) {
        const URL = `${this.$bitpod.getApiUrl()}SeatMaps/${layoutId}`
        try {
          const res = await this.$axios.$get(URL)
          if (res) {
            this.layoutName = res.Name
          }
        } catch (e) {
          console.error(
            `Error in apps/event/_id/index.vue while making a get call to SeatMap model in method getSeatMap context: LayoutId:-${layoutId} \n URL:- ${URL} `,
            e
          )
        }
      }
    },
    async onDeleteSeatMap() {
      const URL = `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
      try {
        const res = await this.$axios.$patch(URL, { LayoutId: '' })
        if (res) {
          this.popupDialog = false
          this.snackbarText = this.$t(
            'Messages.Success.SeatLayoutDeleteSuccess'
          )
          this.snackbar = true
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${this.$route.params.id} \n URL:- ${URL} `,
          e
        )
      }
    },
    onEditSeatMap() {
      this.$router.push(this.localePath(`/apps/seatmap/${this.layoutId}`))
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
        if (Object.values(data).length === 0) {
          this.$apollo.queries.data.refresh()
        }
        const event = formatGQLResult(data, 'Event')
        const badge = formatGQLResult(data, 'Badge')
        const eventSummary =
          (data.Event && data.Event.EventGetEventSummery) || {}
        this.eventData = event.length > 0 ? event[0] : {}
        this.badgeData = badge.length > 0 ? badge[0] : {}
        this.eventData_sectionHeading =
          this.eventData._sectionHeading !== null
            ? this.eventData._sectionHeading
            : {}
        this.getOrgInfo()
        this.updateRegistrationSetting(this.eventData)
        this.getSeatMap(this.eventData)
        this.updateStepper()
        this.getAttendees()
        if (event[0] && event[0].Images && event[0].Images.length > 0) {
          this.getBannerImageName(event[0].Images[0])
        }
        if (event[0] && event[0].Logo && event[0].Logo.length > 0) {
          this.getLogoName(event[0].Logo[0])
        }
        if (event[0] && event[0].Other && event[0].Other.length > 0) {
          this.getImageName()
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
@media (max-width: 500px) {
  .bitpodLink {
    width: 240px !important;
  }
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
  margin: 16px !important;
  padding: 0 !important;
  margin-left: 0 !important;
}
.cardDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
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
  min-width: 240px;
}
.max-h24 {
  max-height: 24px;
  right: 12px;
  top: 10px;
}
</style>

<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"
        ><i18n path="Common.RecurringEvent" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex column class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex pb-2 flex-column flex-md-row">
            <div class="text-h4 text-capitalize event-title">
              {{ data.event.Title }}
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex">
              <div class="mr-2">
                <v-btn
                  :disabled="!data || !data.event || !data.event.UniqLink"
                  depressed
                  color="primary"
                  @click="viewRegistration"
                  ><i18n path="Drawer.View"
                /></v-btn>
              </div>
              <div v-if="data.event.Status === 'Not ready'" class="mr-2">
                <v-btn outlined color="primary" @click="publishEvent"
                  ><i18n path="Drawer.Publish"
                /></v-btn>
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
                      <v-list-item-title
                        ><i18n path="Drawer.MakeaCopy"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- <v-list-item @click="true">
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
                  </v-list-item> -->
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
                  <v-list-item @click.stop="copylinks = true">
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-clone mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Common.CopyLinks"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-dialog v-model="copylinks" max-width="800">
                <v-card>
                  <v-card-title class="pa-4 pr-2">
                    <h2 class="black--text text--lighten-1 pt-1 pb-0 text-h5">
                      <i18n path="Common.CopyLinks" />
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
                        :label="$t('Common.EventLink')"
                        outlined
                        readonly
                        dense
                      ></v-text-field>
                      <copy
                        :text-to-copy="eventLink()"
                        unique-id="eventLink"
                        class="ml-2 mt-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" class="pl-0 pb-0 d-flex">
                      <v-text-field
                        id="sessionLink"
                        :value="sessionLink()"
                        :label="$t('Common.RecurringSessionsLink')"
                        outlined
                        readonly
                        dense
                      ></v-text-field>
                      <copy
                        :text-to-copy="sessionLink()"
                        unique-id="sessionLink"
                        class="ml-2 mt-3"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" class="pl-0 pb-0 d-flex">
                      <v-text-field
                        id="embedLink"
                        :value="embedLink()"
                        :label="$t('Common.EmbedRecurringSessions')"
                        outlined
                        :hint="$t('Common.ContactBitpodSupport')"
                        persistent-hint
                        readonly
                        dense
                      ></v-text-field>
                      <copy
                        :text-to-copy="embedLink()"
                        unique-id="embedLink"
                        class="ml-2 mt-3"
                      />
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </v-flex>
          <v-chip class="my-2 mt-1 greybg">
            <i18n path="Common.RecurringEvent" />
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
                ><i18n path="Common.NotReady"
              /></v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="2"
                :complete="Status > 1"
                color="success"
                class="body-2"
                @click="changeStatus('Open for registration')"
                ><i18n path="Common.OpenForRegistration"
              /></v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="3"
                :complete="Status > 2"
                class="body-2"
                color="success"
                @click="changeStatus('Sold out')"
                ><i18n path="Common.SoldOut"
              /></v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                editable
                step="4"
                :complete="Status > 3"
                class="body-2"
                color="success"
                @click="changeStatus('Registration closed')"
                ><i18n path="Common.RegistrationClosed"
              /></v-stepper-step>
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
                    'long',
                    $i18n.locale
                  ),
                })
              }}</v-subheader
            >
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
              v-for="(image, index) in eventData ? eventData.Other : []"
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
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                <i18n path="Common.RecurringSessions" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            ref="recurringGrid"
            view-name="eventRecurringSession"
            :content="content"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-users pr-1" aria-hidden="true"></i>
                <i18n path="Common.Attendees" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eventRecurringAttendees"
            :content="content"
            :context="data"
            :has-mobile-custom-view="true"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
                <i18n path="Common.Registrations" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="recurringEventRegistrations"
            :content="content"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-mail pr-1" aria-hidden="true"></i>
                <i18n path="Common.Invites" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid view-name="eventInvites" :content="content" class="mt-n12" />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg recurring-event"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-ticketalt pr-1" aria-hidden="true"></i>
                <i18n path="Common.TicketsNotRequired" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eventTickets"
            :content="content"
            class="mt-n12"
            :context="data"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewsmall pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-settings1 pr-1" aria-hidden="true"></i>
                <i18n path="Common.DiscountCodes" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eventDiscountCodes"
            :content="content"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-question-circle pr-1" aria-hidden="true"></i>
                <i18n path="Common.RegistrationQuestions" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eventRegistrationQuestion"
            :content="content"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-mic pr-1" aria-hidden="true"></i>
                <i18n path="Common.Speakers" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid view-name="eventSpeakers" :content="content" class="mt-n12" />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
                <i18n path="Common.Tasks" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eventTasks"
            :content="content"
            :context="data"
            class="mt-n12"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewsmall pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-file-text-o pr-1" aria-hidden="true"></i>
                <i18n path="Common.RegistrationForm" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
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
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
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
            <i18n path="Common.Tags" class="body-2 text--secondary" />
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

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-0 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
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
              {{ formatField(eventUniqueLink) }}
            </div>
          </v-flex>
          <v-flex my-3>
            <i18n path="Common.SessionLink" class="body-2 text--secondary" />

            <div class="body-1 d-block text-truncate">
              {{ formatField(eventSessionLink) }}
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
              height="20"
              class="ma-0 pa-0"
              :label="$t('Common.AllowCancelation')"
              color="green"
              @change="updateReg()"
            ></v-checkbox>
          </v-flex>
          <v-flex class="d-block text-truncate">
            <v-checkbox
              v-model="data.event.allowChat"
              dense
              debounce="500"
              height="20"
              class="ma-0 pa-0"
              :label="$t('Common.AllowChat')"
              color="green"
              @change="updateReg"
            ></v-checkbox>
          </v-flex>
          <v-flex class="d-block text-truncate">
            <v-checkbox
              v-model="data.event.SessionTimingConflict"
              dense
              height="20"
              class="ma-0 pa-0"
              :label="$t('Common.ValidateSessionTimingConflict')"
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
              :label="$t('Common.ShowRemainingTicketsCount')"
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
              :label="$t('Common.ShowAttendeeForm')"
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
              :label="$t('Common.NotifyOrganizer')"
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
              :label="$t('Common.Allowusertoselectatimezoneforrecurringevent')"
              color="green"
              @change="updateReg()"
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
          <div class="toast py-2 pr-1 pl-3">
            {{ snackbarText }}
          </div>
        </v-snackbar>
      </v-flex>
      <div v-if="seoForm">
        <editSeoForm
          :seo-form.sync="seoForm"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="eventForm">
        <editEventForm
          :event-form.sync="eventForm"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="eventSetting">
        <editEventSetting
          :event-setting.sync="eventSetting"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="siteSetting">
        <editSiteSetting
          :site-setting.sync="siteSetting"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <makeCopy :is-make-copy.sync="isMakeCopy" />
      <confirm ref="confirm"></confirm>
    </v-flex>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import _ from 'lodash'
import editEventForm from '../../_id/editEventForm.vue'
import editSeoForm from '~/pages/apps/_app/event/_id/editSeoForm.vue'
import editEventSetting from '~/pages/apps/_app/event/_id/editEventSetting.vue'
import editSiteSetting from '~/pages/apps/_app/event/_id/editSiteSetting.vue'
import makeCopy from '~/pages/apps/_app/event/_id/makeCopy.vue'
import Grid from '~/components/common/grid'
import copy from '~/components/common/copy'
import File from '~/components/common/form/file.vue'
import Notes from '~/components/common/notes'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'
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
    File,
    copy,
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
      badgeLogo: false,
      eventBanner: false,
      otherDialog: false,
      logoDialog: false,
      bannerDialog: false,
      otherDialogOpen: false,
      formData: {
        Logo: [],
        Images: [],
        ImagesURL: [],
        Other: [],
      },
      checkArray: [],
      fileField: {
        multiple: false,
      },
      otherFileField: {
        multiple: true,
      },
      bannerName: '',
      OtherImageName: [],
      logoName: '',
      allow: true,
      displaySelectedOtherImage: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
    updateData() {
      const dataObj = {
        isRefundable: this.data.event.isRefundable,
        allowChat: this.data.event.allowChat,
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
    openOtherDialog(image) {
      this.otherDialogOpen = true
      this.displaySelectedOtherImage = this.getAttachmentLink(image, true)
    },
    goBack() {
      this.$router.back()
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
    async getImageName() {
      const url = this.$bitpod.getApiUrl()
      const imageData = await Promise.all(
        this.eventData.Other.map((id) => {
          return this.$axios.$get(`${url}Attachments/${id}`)
        })
      )
      this.OtherImageName = imageData
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
    async deleteBannerFile(e, id) {
      const url = this.$bitpod.getApiUrl()
      const checkRes = await this.$refs.confirm.open(
        this.$t('Common.DeleteImage'),
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
        this.$t('Common.DeleteImage'),
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
        this.$t('Common.DeleteImage'),
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
    getImageUrl(imageId) {
      const downloadLink = this.getAttachmentLink(imageId, true)
      return downloadLink
    },
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
        console.log(
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
          `Error in app/Event/_id/index.vue while making a PATCH call to Event model from method publishEvent context:-URL:-${url}\n formData:-${this.eventData}\n id:-${this.$route.params.id} `,
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
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    viewRegistration() {
      const orgName = this.$store.state.currentOrg.name
      if (orgName) {
        const regUrl = `https://${orgName}-${this.$config.axios.eventUrl}/e/${this.data.event.UniqLink}`
        window.open(`${regUrl}`, '_blank')
      } else {
        const regUrl = `https://${this.$config.axios.eventUrl}/e/${this.data.event.UniqLink}`
        window.open(`${regUrl}`, '_blank')
      }
    },
    eventLink() {
      const baseUrl = this.$bitpod.getApiUrl()
      const regUrl = baseUrl.replace('svc/api', `e/${this.data.event.UniqLink}`)
      return regUrl
    },
    sessionLink() {
      const baseUrl = this.$bitpod.getApiUrl()
      const regUrl = baseUrl.replace('svc/api', `t/${this.data.event.UniqLink}`)
      return regUrl
    },
    embedLink() {
      const baseUrl = this.$bitpod.getApiUrl()
      const embedLink = baseUrl.replace(
        'svc/api',
        `embed/t/${this.data.event.UniqLink}`
      )
      const regUrl = `<iframe src="${embedLink}"></iframe>`
      return regUrl
    },
    redirectIntegration() {
      this.$router.push(
        this.localePath(
          `/apps/event/list/EventIntegration/integrations?event=${this.$route.params.id}`
        )
      )
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
      const URL = `https://${this.$bitpod.getApiUrl()}Events/${
        this.$route.params.id
      }`
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
        if (Object.values(data).length === 0) {
          this.$apollo.queries.data.refresh()
        }
        const event = formatGQLResult(data, 'Event')
        const badge = formatGQLResult(data, 'Badge')
        const eventSummary =
          (data.Event && data.Event.EventGetEventSummery) || {}
        this.eventData = event[0] || {}
        this.eventData.id = this.$route.params.id
        this.eventData_sectionHeading =
          this.eventData._sectionHeading !== null
            ? this.eventData._sectionHeading
            : {}
        this.updateStepper()
        this.updateRegistrationSetting(this.eventData)
        this.eventUniqueLink = `https://${this.$config.axios.eventUrl}/e/${
          event[0] && event[0].UniqLink
        }`
        this.eventSessionLink = `https://${this.$config.axios.eventUrl}/t/${
          event[0] && event[0].UniqLink
        }`
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
.cardDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
  display: none;
}
.cardImg {
  position: relative;
  margin: 16px !important;
  padding: 0 !important;
  margin-left: 0 !important;
}
.cardImg:hover .cardDelete {
  display: inline-block;
}
.upload-btn {
  position: relative;
  right: 45px;
  bottom: 28px;
}
.otherImg {
  visibility: hidden;
}
.anchorTag {
  max-width: 120px;
}
@media (max-width: 500px) {
  .pad-card {
    padding: 0 12px 0 12px;
  }
}
@media (min-width: 600px) {
  .pad-card {
    padding: 12px 12px 0 12px;
  }
}
</style>

<template>
  <v-flex class="public-page-main">
    <v-flex>
      <div v-if="event.ImageURL" class="background-event-img">
        <picture>
          <source :srcset="event.ImageURL" sizes="100vw" />
          <img
            class="listing-hero-image js-picturefill-img"
            data-automation="listing-hero-image"
          />
        </picture>
      </div>
      <div v-else class="background-event-img">
        <picture>
          <source :srcset="$config.cdnUri + 'default-min.jpg'" sizes="100vw" />
          <img
            class="listing-hero-image js-picturefill-img"
            data-automation="listing-hero-image"
          />
        </picture>
      </div>
    </v-flex>
    <v-flex class="public-main public-info">
      <v-flex
        class="d-flex elevation-0 flex-column elevation-md-1 mb-4 rounded-lg overflow-hidden"
      >
        <v-skeleton-loader
          :loading="!eventImage"
          :tile="true"
          type="avatar"
          height="300px"
          width="100%"
        >
          <v-flex class="d-flex flex-column flex-md-row">
            <v-flex class="flex-70">
              <v-img
                v-if="event.ImageURL"
                :src="event.ImageURL"
                :lazy-src="event.ImageURL"
                class="eventsite-banner"
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
              <v-img
                v-else
                :src="$config.cdnUri + 'default-min.jpg'"
                :lazy-src="$config.cdnUri + 'default-min.jpg'"
                class="eventsite-banner"
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
            </v-flex>
            <v-flex
              flex-column
              class="flex-30 justify-center d-flex event-right-info pa-2"
            >
              <div class="text-h4 text-center text-capitalize">
                {{ formatField(registration.EventName) }}
              </div>
              <div class="body-1 text-center text-capitalize">
                By
                {{
                  formatField(
                    registration &&
                      registration.EventList &&
                      registration.EventList.Organizer
                  )
                }}
              </div>
            </v-flex>
          </v-flex>
        </v-skeleton-loader>
        <v-flex
          v-if="
            registration &&
            registration.EventList &&
            registration.EventList.Description
          "
          class="d-flex boxview"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="pa-3"
            v-html="
              registration &&
              registration.EventList &&
              registration.EventList.Description
            "
          />
        </v-flex>
      </v-flex>
      <v-flex d-flex flex-md-row flex-lg-row flex-column-reverse>
        <v-flex column class="mxw-w70 mr-0 mr-md-2">
          <v-skeleton-loader
            :loading="!eventImage"
            :tile="true"
            type="avatar"
            height="200px"
            width="100%"
            class="rounded-lg"
          >
            <div>
              <div v-if="event.BusinessType === 'Single'">
                <div
                  v-if="
                    registration &&
                    registration.SessionListId &&
                    registration.SessionListId.length
                  "
                >
                  <div
                    class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
                  >
                    <v-flex class="d-flex justify-center align-center pb-3">
                      <h2 class="body-1 pb-0">
                        <i
                          class="fa fa-black-board pr-1"
                          aria-hidden="true"
                        ></i>
                        <i18n path="Common.Sessions" />
                      </h2>
                      <v-spacer></v-spacer>
                    </v-flex>
                    <v-divider></v-divider>
                    <div>
                      <v-list>
                        <v-list-item
                          v-for="item in registration.SessionListId"
                          :key="item.id"
                          class="px-1 pt-2 session-view-in"
                        >
                          <v-list-item-avatar
                            tile
                            size="48"
                            class="my-0 session-view"
                          >
                            <v-avatar
                              size="48"
                              tile
                              v-bind="attrs"
                              :style="{
                                'background-color': getRandomColor(item.Name),
                              }"
                              v-on="on"
                            >
                              <div class="d-flex flex-column">
                                <div v-if="item.StartDate">
                                  <div class="white--text text-h6 pt-0">
                                    {{ formatDateDay(item.StartDate) }}
                                  </div>
                                  <div class="white--text body-2 mt-n1">
                                    {{ formatDateMonth(item.StartDate) }}
                                  </div>
                                </div>
                                <div v-else>
                                  <v-icon class="white--text"
                                    >fa-history</v-icon
                                  >
                                </div>
                              </div>
                            </v-avatar>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title class="text-capitalize d-flex"
                              ><div>{{ item.Name }}</div>
                              <div
                                v-if="checkLiveSession(item)"
                                class="live-view-section"
                              >
                                <div class="ring-container ml-2">
                                  <div class="ringring"></div>
                                  <div class="circle-ring"></div>
                                </div>
                              </div>
                            </v-list-item-title>
                            <div v-if="item.StartDate" class="mt-1">
                              <v-list-item-subtitle class="session-date">
                                {{
                                  formatDateTime(item.StartDate, item.Timezone)
                                }}
                                <span v-if="item.Timezone" class="ml-1">{{
                                  item.Timezone
                                }}</span>
                              </v-list-item-subtitle>
                            </div>
                          </v-list-item-content>

                          <v-list-item-icon class="ma-0">
                            <div
                              v-if="
                                item.LocationType === 'Bitpod Virtual' &&
                                event.BusinessType === 'Single'
                              "
                            >
                              <v-btn
                                class="ma-2 mr-0"
                                outlined
                                color="success"
                                :disabled="isPast"
                                @click="startEvent(item.id, true)"
                              >
                                <i18n path="Common.JoinSession" /><v-icon right>
                                  mdi-video
                                </v-icon>
                              </v-btn>
                            </div>
                            <div v-if="item.LocationType === 'Online event'">
                              <a
                                :href="!isPast && item.WebinarLink"
                                target="_blank"
                                class="text-decoration-none"
                                ><v-btn
                                  class="ma-2 mr-0"
                                  outlined
                                  color="success"
                                  :disabled="isPast"
                                >
                                  <i18n path="Common.JoinSession" /><v-icon
                                    right
                                  >
                                    mdi-video
                                  </v-icon>
                                </v-btn></a
                              >
                            </div>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  registration &&
                  registration.EventList &&
                  registration.EventList.allowChat === true &&
                  registration.EventList.LocationType === 'Bitpod Virtual' &&
                  !registration.chatToken.includes('error')
                "
              >
                <div>
                  <div
                    class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
                  >
                    <v-flex class="d-flex justify-center align-center pb-3">
                      <h2 class="body-1 pb-0">
                        <i
                          class="fa-message-square pr-1"
                          aria-hidden="true"
                        ></i>
                        <i18n path="Common.Chat" />
                      </h2>
                      <v-spacer></v-spacer>
                    </v-flex>
                    <v-divider></v-divider>
                    <div class="body-1 mt-2">
                      <iframe
                        id="rcChannel"
                        name="rcChannel"
                        :src="`https://chat.bitpod.io/channel/${registration.EventList.chatChannel}?layout=embedded`"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        allow="camera;microphone;fullscreen"
                        @load="authenticateIFrame()"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div
                  v-if="
                    registration &&
                    registration.attendee &&
                    registration.attendee.length
                  "
                >
                  <div
                    class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
                  >
                    <v-flex class="d-flex justify-center align-center pb-3">
                      <h2 class="body-1 pb-0">
                        <i class="fa fa-users pr-1" aria-hidden="true"></i>
                        <i18n path="Common.Attendee" />
                      </h2>
                      <v-spacer></v-spacer>
                    </v-flex>
                    <v-divider></v-divider>
                    <div>
                      <v-list>
                        <v-list-item
                          v-for="item in registration.attendee"
                          :key="item.id"
                          class="pa-0 my-3"
                        >
                          <v-list-item-avatar size="36" class="mr-2 ma-0">
                            <v-avatar
                              color="primary"
                              size="36"
                              v-bind="attrs"
                              class="mr-"
                              v-on="on"
                            >
                              <v-avatar
                                color="primary"
                                size="36"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <span class="white--text Twitter-18">{{
                                  item.FullName
                                }}</span>
                              </v-avatar>
                            </v-avatar>
                          </v-list-item-avatar>

                          <v-list-item-content class="py-0">
                            <v-list-item-title class="text-capitalize">{{
                              item.FullName
                            }}</v-list-item-title>
                            <div v-if="item.Email" class="mt-1">
                              <v-list-item-subtitle class="session-date">
                                {{ item.Email }}
                              </v-list-item-subtitle>
                            </div>
                          </v-list-item-content>

                          <v-list-item-icon class="ma-0 mt-2">
                            <div class="mt-2">
                              <div
                                v-if="
                                  registration.EventList.BusinessType ===
                                    'Recurring' && registration.ZoomLink
                                "
                              >
                                <a
                                  :href="!isPast && registration.ZoomLink"
                                  target="_blank"
                                  class="text-decoration-none"
                                >
                                  <v-btn
                                    class="ma-2 mr-0"
                                    outlined
                                    color="success"
                                    :disabled="isPast"
                                  >
                                    <i18n path="Common.JoinSession" /><v-icon
                                      right
                                    >
                                      mdi-video
                                    </v-icon>
                                  </v-btn>
                                </a>
                              </div>
                              <div
                                v-if="
                                  registration.EventList.BusinessType ===
                                    'Recurring' &&
                                  registration.SessionListId[0].LocationType ===
                                    'Online meeting' &&
                                  registration.SessionListId[0].WebinarLink
                                "
                              >
                                <a
                                  :href="
                                    !isPast &&
                                    registration.SessionListId[0].WebinarLink
                                  "
                                  target="_blank"
                                  class="text-decoration-none"
                                >
                                  <v-btn
                                    class="ma-2 mr-0"
                                    outlined
                                    color="success"
                                    :disabled="isPast"
                                  >
                                    <i18n path="Common.JoinSession" /><v-icon
                                      right
                                    >
                                      mdi-video
                                    </v-icon>
                                  </v-btn>
                                </a>
                              </div>
                              <div
                                v-if="
                                  registration.EventList.BusinessType ===
                                    'Recurring' &&
                                  registration.SessionListId[0].LocationType ===
                                    'Google Meet'
                                "
                              >
                                <p class="pb-0 fs-14 primary--text">
                                  <i
                                    class="fa-info-circle pr-1"
                                    aria-hidden="true"
                                  ></i>
                                  <i18n path="Common.CheckCalendarInvite" />
                                </p>
                              </div>
                            </div>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-skeleton-loader>
          <div>
            <div
              v-if="
                event && event.speakers && Object.keys(event.speakers).length
              "
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
            >
              <v-flex class="d-flex justify-center align-center pb-3">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-mic pr-1" aria-hidden="true"></i>
                  <i18n path="Common.Speakers" />
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
              <div class="d-flex flex-wrap justify-center justify-md-start">
                <v-card
                  v-for="item in Object.values(event.speakers)"
                  :key="item.id"
                  class="pb-speakers ma-4 ml-0 mb-0 ma-xs-4 elevation-0 greybg"
                >
                  <div v-if="item.imageURL" class="overflow-hidden">
                    <img
                      :src="item.imageURL"
                      height="160px"
                      class="positionRelative speaker-img grey lighten-4"
                    />
                  </div>
                  <div v-else class="overflow-hidden">
                    <img
                      :src="$config.cdnUri + 'default_profile.png'"
                      height="160px"
                      class="positionRelative speaker-img grey lighten-4"
                    />
                  </div>
                  <v-text
                    class="text-center fs-20 d-flex justify-center pt-1 text-capitalize"
                    >{{ item.firstName }}</v-text
                  >
                  <v-card-actions class="pa-1 pt-0 d-flex justify-center">
                    <a
                      :href="item.socialMedia.facebook"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      <v-btn icon>
                        <v-icon class="fs-18">mdi-facebook</v-icon>
                      </v-btn>
                    </a>

                    <a
                      :href="item.socialMedia.twitter"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      <v-btn icon>
                        <v-icon class="fs-18">mdi-twitter</v-icon>
                      </v-btn>
                    </a>

                    <a
                      :href="item.socialMedia.linkdin"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      <v-btn icon>
                        <v-icon class="fs-18">mdi-linkedin</v-icon>
                      </v-btn>
                    </a>
                  </v-card-actions>
                </v-card>
              </div>
            </div>
          </div>
          <div
            v-if="
              registration &&
              registration.EventList &&
              registration.EventList.Other &&
              registration.EventList.Other.length
            "
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                <i class="fa fa-users pr-1" aria-hidden="true"></i>
                <i18n path="Common.Gallery" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <div class="pa-3">
              <v-row>
                <v-col
                  v-for="image in registration.EventList.Other"
                  :key="image"
                  class="d-flex child-flex pl-0 pt-0 rounded-lg gallery-img"
                  cols="4"
                >
                  <v-img
                    :src="getAttachmentLink(image, true)"
                    :lazy-src="getAttachmentLink(image, true)"
                    aspect-ratio="1"
                    class="grey lighten-4"
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
                </v-col>
              </v-row>
            </div>
          </div>
          <div
            v-if="event && event.review && event.review.length"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-1 mr-0 mb-4 pb-2 rounded-lg d-none"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                <i class="fa fa-users pr-1" aria-hidden="true"></i>
                <i18n path="Common.Reviews" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <v-list class="mt-2">
              <v-list-item
                v-for="item in event.review"
                :key="item.id"
                class="px-0 mb-5"
              >
                <v-list-item-avatar size="48" class="mr-2 ma-0 mt-n6">
                  <v-avatar
                    color="primary"
                    size="36"
                    v-bind="attrs"
                    class="mr-"
                    v-on="on"
                  >
                    <v-avatar
                      color="primary"
                      size="36"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="white--text Twitter-18">{{
                        item.UserName
                      }}</span>
                    </v-avatar>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content class="py-0">
                  <v-list-item-title
                    class="fs-18"
                    v-text="item.UserName"
                  ></v-list-item-title>
                  <v-list-item-subtitle class="mb-1">
                    <v-rating
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      empty-icon="$ratingFull"
                      large
                      length="5"
                      disabled
                      :value="item.Rating"
                      dense
                      small
                      class="ps-rating"
                    ></v-rating>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    class="body-2"
                    v-text="item.Description"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div
            v-if="
              event.BusinessType === 'Single' &&
              registration.EventList.HasTickets
            "
          >
            <v-expansion-panels
              accordion
              flat
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-0 mb-4 pb-2 rounded-lg"
            >
              <v-expansion-panel flat class="elevation-0 pa-0">
                <v-expansion-panel-header class="elevation-0 pa-0"
                  ><v-flex class="d-flex justify-center align-center pb-0">
                    <h2 class="body-1 pb-0">
                      <i class="fa fa-ticket pr-1" aria-hidden="true"></i>
                      <i18n path="Common.TicketsNotRequired" />
                    </h2>
                    <v-spacer></v-spacer> </v-flex
                ></v-expansion-panel-header>
                <v-expansion-panel-content class="pa-0">
                  <v-divider></v-divider>
                  <v-simple-table dense class="ticket-view-table">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left event-ticket-name">
                            <i18n path="Common.Name" />
                          </th>
                          <th class="text-left">
                            <i18n path="Common.Amount" />
                          </th>
                          <th class="text-left">
                            <i18n path="Common.Quantity" />
                          </th>
                          <th class="text-left">
                            <i18n path="Common.Total" />
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="event.seatReservation">
                        <tr v-for="item in attendeeData" :key="item">
                          <td>{{ item.ticketName }}</td>
                          <td>{{ item.price }}</td>
                          <td>
                            <div class="total-align">{{ item.count }}</div>
                          </td>
                          <td>{{ item.total }}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <span><i18n path="Common.Total" /></span>
                            <span>{{ registration.TicketQuantity }}</span>
                          </td>
                          <td></td>
                        </tr>
                        <tr v-if="registration.Discount">
                          <td></td>
                          <td></td>
                          <td><i18n path="Common.Discount" /></td>
                          <td>
                            {{ registration.Currency }}
                            {{ registration.Discount }}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td><i18n path="Common.Total" /></td>
                          <td>
                            {{ registration.Currency }}
                            {{ registration.TotalAmount }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="item in attendeeData" :key="item">
                          <td>{{ item.ticketName }}</td>
                          <td>{{ registration.Currency }} {{ item.price }}</td>
                          <td>
                            <div class="total-align">{{ item.count }}</div>
                          </td>
                          <td>{{ registration.Currency }} {{ item.total }}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td><i18n path="Common.SubTotal" /></td>
                          <td>
                            {{ registration.Currency }}
                            {{ registration.SubTotal }}
                          </td>
                        </tr>
                        <tr v-if="registration.Discount">
                          <td></td>
                          <td></td>
                          <td><i18n path="Common.Discount" /></td>
                          <td>
                            {{ registration.Currency }}
                            {{ registration.Discount }}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td><i18n path="Common.Total" /></td>
                          <td>
                            {{ registration.Currency }}
                            {{ registration.TotalAmount }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-flex>
        <v-flex column class="mxw-w30">
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 ml-md-2 mr-0 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-calendar pr-1" aria-hidden="true"></i>
                <i18n path="Common.DateTime" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>

            <v-flex my-3>
              <v-skeleton-loader
                :loading="!eventImage"
                type="list-item-two-line"
                height="20"
                width="100%"
              >
                <div
                  v-if="event.BusinessType === 'Recurring'"
                  class="body-1 my-n3"
                >
                  <v-list
                    v-if="!isPast"
                    class="pa-0 if-rec"
                    :data-title="event.BusinessType"
                  >
                    <v-list-item
                      v-for="item in registration.attendee"
                      :key="item.id"
                      class="pa-0 if-rec-child"
                    >
                      <v-list-item-content class="py-0">
                        <v-list-item-title>
                          {{ formatDate(item.BookingDate) }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <div v-else class="py-2">
                    <i18n path="Common.PastEventMessage" />
                  </div>
                </div>
                <div v-else-if="isPast" class="py-2">
                  <i18n path="Common.PastEventMessage" />
                </div>
                <div v-else class="body-1">
                  {{ getEventStartDate() }} -<br />
                  {{ getEventEndDate() }} -<br />
                  {{ formatField(event && event.timeZone) }}
                </div>
              </v-skeleton-loader>
            </v-flex>
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 ml-md-2 mr-0 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-location pr-1" aria-hidden="true"></i>
                <i18n path="Common.Venue" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <v-skeleton-loader
              :loading="!eventImage"
              type="list-item-two-line"
              height="20"
              width="100%"
              class="my-3"
            >
              <div
                v-if="event.BusinessType === 'Single' && event.locationType"
                class="location-type"
              >
                <v-text :class="event.locationType">{{
                  event.locationType
                }}</v-text>
              </div>
              <div v-if="event.BusinessType === 'Recurring'">
                <div
                  v-if="
                    registration &&
                    registration.SessionListId &&
                    registration.SessionListId.length
                  "
                >
                  <div
                    v-for="item in registration.SessionListId"
                    :key="item.id"
                    class="pt-2"
                  >
                    <v-text>{{ item.LocationType }}</v-text>
                  </div>
                </div>
              </div>
              <div v-if="event.locationType === 'Bitpod Virtual'">
                <v-btn
                  class="ma-3 ml-0"
                  outlined
                  color="success"
                  :disabled="isPast"
                  @click="startEvent(event.UniqLink, true)"
                >
                  <i18n path="Common.JoinEvent" /><v-icon right>
                    mdi-video
                  </v-icon>
                </v-btn>
              </div>
              <div v-else-if="event.locationType === 'Online event'">
                <div>
                  <v-chip class="ma-2 ml-0" color="primary" outlined pill>
                    <i18n path="Common.OnlineEvent" />
                  </v-chip>
                </div>
                <div v-if="event.locationType === 'Online event'">
                  <a
                    :href="!isPast && event.WebinarLink"
                    target="_blank"
                    class="text-decoration-none"
                    ><v-btn
                      class="ma-2 ml-0"
                      outlined
                      :disabled="isPast"
                      color="success"
                    >
                      <i18n path="Common.JoinEvent" /><v-icon right>
                        mdi-video
                      </v-icon>
                    </v-btn></a
                  >
                </div>
              </div>
              <div v-else>
                <v-flex my-3>
                  <div class="body-1 text-justify">
                    {{
                      registration &&
                      registration.EventList &&
                      registration.EventList._VenueAddress &&
                      registration.EventList._VenueAddress.AddressLine
                    }}
                    {{
                      registration &&
                      registration.EventList &&
                      registration.EventList._VenueAddress &&
                      registration.EventList._VenueAddress.City
                    }}
                    {{
                      registration &&
                      registration.EventList &&
                      registration.EventList._VenueAddress &&
                      registration.EventList._VenueAddress.State
                    }}
                    {{
                      registration &&
                      registration.EventList &&
                      registration.EventList._VenueAddress &&
                      registration.EventList._VenueAddress.Country
                    }}
                    {{
                      registration &&
                      registration.EventList &&
                      registration.EventList._VenueAddress &&
                      registration.EventList._VenueAddress.PostalCode
                    }}
                  </div>
                </v-flex>
              </div>
            </v-skeleton-loader>
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 ml-md-2 mr-0 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-user pr-1" aria-hidden="true"></i>
                <i18n path="Common.Organizer" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>

            <v-flex my-3>
              <v-skeleton-loader
                :loading="!eventImage"
                type="list-item-two-line"
                height="20"
                width="100%"
              >
                <div class="body-1">
                  {{
                    formatField(
                      registration &&
                        registration.EventList &&
                        registration.EventList.Organizer
                    )
                  }}
                </div>
              </v-skeleton-loader>
            </v-flex>
          </div>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import { configLoaderMixin } from '~/utility'

export default {
  layout: 'public',
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      isEditReg: false,
      isCancelReg: false,
      isRefund: false,
      event: {},
      registration: {},
      eventImage: false,
      attendeeData: {},
      isPast: false,
      isSessionLive: false,
      interval: null,
    }
  },
  computed: {
    filter() {
      return {
        where: {
          EventId: this.registration && this.registration.EventId,
        },
      }
    },
    baseUrl() {
      return this.$config.axios.eventUrl
    },
    orgName() {
      return this.$store.state.currentOrg.name
      // return this.$store.state.currentOrgInfo.Name
    },
  },
  created() {
    this.$eventBus.$on('refresh-session-list', () => {
      this.$forceUpdate()
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.$eventBus.$off('refresh-session-list')
  },
  mounted() {
    this.getRegistrationData()
    this.checkLiveView()
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatDateDay(date) {
      return date ? format(new Date(date), 'd') : ''
    },
    formatDateMonth(date) {
      return date ? format(new Date(date), 'LLL') : ''
    },
    formatDateTime(date, timezone) {
      return date
        ? format(new Date(this.formatedDate(new Date(date), timezone)), 'p')
        : ''
    },
    getRandomColor(name) {
      return window.GeoPattern.generate(name).color
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    startEvent(roomName, isFullLink) {
      const baseUrl = this.$bitpod.getApiUrl()
      const regUrl = baseUrl.replace(
        '/svc/api/',
        `${this.$config.basePublicPath}/apps/event/virtual/`
      )
      if (isFullLink) {
        window.open(`${regUrl}${this.registration.id}`)
      } else {
        const currentOrgName = window.location.origin
          .split('-')[0]
          .split('//')[1]
        window.open(
          `https://meet.bitpod.io/${currentOrgName}-${roomName}?e=${this.event.id}`
        )
      }
    },
    getEventStartDate() {
      return this.$d(
        new Date(
          this.formatedDate(
            this.event.startDateTime
              ? new Date(this.event.startDateTime)
              : new Date(),
            this.event.timeZone
          )
        ),
        'long',
        this.$i18n.locale
      )
    },
    getEventEndDate() {
      return this.$d(
        new Date(
          this.formatedDate(
            this.event.endDateTime
              ? new Date(this.event.endDateTime)
              : new Date(),
            this.event.timeZone
          )
        ),
        'long',
        this.$i18n.locale
      )
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
    goLive() {
      let roomName
      if (this.type === 'Group') {
        roomName = this.roomname
      } else {
        roomName = `${
          this.registration.FirstName.trim().replace(/[^a-zA-Z ]/g, '') ||
          'unknown'
        }-${
          this.registration.LastName.trim().replace(/[^a-zA-Z ]/g, '') || 'user'
        }-${this.registration.RegistrationId}`.toLowerCase()
      }
      window.open(`apps/event/live/${roomName}?e=${this.$route.params.id}`)
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    async getRegistrationData() {
      const URL = `${this.$bitpod.getApiUrl()}Registrations/findRegistration?regId=${
        this.$route.params.id
      }`
      try {
        const { result } = await this.$axios.$get(URL)
        if (result) {
          if (result.status === 'Not Found') {
            return this.$nuxt.error({ statusCode: 404 })
          } else {
            this.registration = result
            result.attendee.map((i) => {
              if (!this.attendeeData[i.TicketId]) {
                this.attendeeData[i.TicketId] = {
                  count: 1,
                  ticketName: i.TicketName,
                  price: i.TicketAmount,
                  total: i.TicketAmount,
                }
              } else {
                this.attendeeData[i.TicketId].count++
                this.attendeeData[i.TicketId].total += i.TicketAmount
              }
            })
            this.getEventData(result.EventId)
          }
        }
      } catch (e) {
        console.error(
          `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: regId:-${this.$route.params.id} \n URL:- ${URL} `,
          e
        )
      }
    },
    async getEventData(data) {
      if (data) {
        const eventid = data.toString()
        const filter = { id: eventid }
        const URL = `${this.$bitpod.getApiUrl()}Events/findEvent?eventFilter=${JSON.stringify(
          filter
        )}`
        try {
          const res = await this.$axios.$get(URL)
          if (res) {
            this.event = res.result
            this.eventImage = true
            if (this.event.BusinessType === 'Single') {
              this.isPast =
                new Date().getTime() >
                new Date(this.event.endDateTime).getTime()
            } else {
              const reg = this.registration
              if (reg.attendee.length && reg.SessionListId.length) {
                this.isPast =
                  new Date().getTime() >
                  new Date(reg.attendee[0].BookingDate).setMinutes(
                    new Date(reg.attendee[0].BookingDate).getMinutes() +
                      reg.SessionListId[0].Duration
                  )
              } else {
                this.isPast = false
              }
            }
          }
        } catch (e) {
          console.error(
            `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${data.EventId} \n URL:- ${URL} `,
            e
          )
        }
      }
    },
    authenticateIFrame() {
      setTimeout(() => {
        document.getElementById('rcChannel').contentWindow.postMessage(
          {
            externalCommand: 'login-with-token',
            token: this.registration.chatToken,
          },
          '*'
        )
      }, 2000)
    },
    checkLiveSession(item) {
      const liveStart =
        new Date().getTime() > new Date(item.StartDate).getTime()
      const liveEnd =
        new Date().getTime() <
        new Date(
          new Date(item.StartDate).getTime() + item.Duration * 60000
        ).getTime()
      return liveStart && liveEnd
    },
    checkLiveView() {
      const self = this
      this.interval = setInterval(() => {
        self.registration.SessionListId.map((e) => {
          self.checkLiveSession(e)
        })
        this.$eventBus.$emit('refresh-session-list')
      }, 30000)
    },
  },
}
</script>

<style scoped>
.public-main {
  max-width: 70%;
  margin: 0 auto;
}
.public-info {
  position: relative;
  margin-top: -250px;
}
.background-event-img {
  height: 350px;
  background-color: lightgrey;
  overflow: hidden;
  width: 100%;
}
.listing-hero-image {
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-filter: blur(50px) brightness(0.9);
  -ms-filter: blur(50px) brightness(0.9);
  filter: blur(50px) brightness(0.9);
  display: inline-block;
  width: 200% !important;
  position: relative;
  top: 50%;
  left: 50%;
}
.eventsite-banner {
  max-height: 300px;
  min-height: 100%;
  flex-shrink: 0;
  max-width: 100%;
}
.eventsite-banner img {
  min-height: 300px;
}
.flex-70 {
  flex: 70%;
  width: 70%;
}
.flex-30 {
  flex: 30%;
  max-width: 30%;
}
.pb-speakers {
  max-width: 200px;
  width: 200px;
}
.event-right-info {
  background: #f0f0f0 !important;
  min-height: 300px !important;
}
.session-date {
  min-height: 18px;
}
.speaker-img {
  width: 100%;
}
.ps-rating {
  pointer-events: none;
}
.gallery-img {
  max-width: 220px;
}
.if-rec[data-title='Recurring'] .if-rec-child {
  display: none;
}
.if-rec[data-title='Recurring'] .if-rec-child:nth-child(1) {
  display: flex;
}
.location-type .Online.event {
  display: none;
}
.total-align {
  margin-left: 34px;
}
.ticket-view-table {
  width: 100%;
}
.event-ticket-name {
  white-space: nowrap;
}
@media screen and (max-width: 600px) {
  .background-event-img {
    display: none;
  }
  .public-main {
    max-width: 100%;
  }
  .public-info {
    margin-top: -20px;
  }
  .boxview {
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .flex-70,
  .flex-30 {
    flex: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  .eventsite-banner {
    max-height: 160px;
    min-height: 160px;
  }
  .eventsite-banner img {
    max-height: 160px;
    min-height: 160px;
  }
  .event-right-info {
    min-height: auto !important;
  }
}
</style>

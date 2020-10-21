<template>
  <v-flex>
    <v-flex>
      <div v-if="event.ImageURL" class="background-event-img">
        <picture>
          <source
            :srcset="'https://event.test.bitpod.io' + event.ImageURL"
            sizes="100vw"
          />
          <img
            class="listing-hero-image js-picturefill-img"
            data-automation="listing-hero-image"
          />
        </picture>
      </div>
      <div v-else class="background-event-img">
        <picture>
          <source
            srcset="
              https://res.cloudinary.com/mytestlogo/image/upload/v1579865731/default-min.jpg
            "
            sizes="100vw"
          />
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
        <v-flex class="d-flex flex-column flex-md-row">
          <v-flex class="flex-70">
            <v-img
              v-if="event.ImageURL"
              :src="'https://event.test.bitpod.io' + event.ImageURL"
              :lazy-src="'https://event.test.bitpod.io' + event.ImageURL"
              class="eventsite-banner"
            ></v-img>
            <v-img
              v-else
              :src="$config.cdnUri + 'default-min.jpg'"
              :lazy-src="$config.cdnUri + 'default-min.jpg'"
              class="eventsite-banner"
            ></v-img>
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
          <div v-if="event.BusinessType">
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
                      <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                      Sessions
                    </h2>
                    <v-spacer></v-spacer>
                  </v-flex>
                  <v-divider></v-divider>
                  <div>
                    <v-list>
                      <v-list-item
                        v-for="item in registration.SessionListId"
                        :key="item.id"
                        class="px-1 pt-2"
                      >
                        <v-list-item-avatar tile size="48" class="my-0">
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
                                <v-icon class="white--text">fa-history</v-icon>
                              </div>
                            </div>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="text-capitalize">{{
                            item.Name
                          }}</v-list-item-title>
                          <div v-if="item.StartDate" class="mt-1">
                            <v-list-item-subtitle class="session-date">
                              {{ formatDateTime(item.StartDate) }}
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
                              @click="startEvent(item.BitpodVirtualLink, true)"
                            >
                              Join Session<v-icon right>
                                mdi-video
                              </v-icon>
                            </v-btn>
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
                registration.attendee &&
                registration.attendee.length
              "
            >
              <div
                class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
              >
                <v-flex class="d-flex justify-center align-center pb-3">
                  <h2 class="body-1 pb-0">
                    <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                    Attendee
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
                          <div v-if="showAttndeeBtn">
                            <v-btn
                              class="ma-2 mr-0"
                              outlined
                              color="success"
                              @click="goLive"
                            >
                              Join Session<v-icon right>
                                mdi-video
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="d-none">
            <div
              v-if="
                event && event.sessions && Object.keys(event.sessions).length
              "
            >
              <div
                class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
              >
                <v-flex class="d-flex justify-center align-center pb-3">
                  <h2 class="body-1 pb-0">
                    <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                    Sessions
                  </h2>
                  <v-spacer></v-spacer>
                </v-flex>
                <v-divider></v-divider>
                <div>
                  <v-list>
                    <v-list-item
                      v-for="item in Object.values(event.sessions)"
                      :key="item.id"
                      class="px-1 pt-2"
                    >
                      <v-list-item-avatar tile size="48" class="my-0">
                        <v-avatar
                          size="48"
                          tile
                          v-bind="attrs"
                          :style="{
                            'background-color': getRandomColor(item.label),
                          }"
                          v-on="on"
                        >
                          <div class="d-flex flex-column">
                            <div v-if="item.startDateTime">
                              <div class="white--text text-h6 pt-0">
                                {{ formatDateDay(item.startDateTime) }}
                              </div>
                              <div class="white--text body-2 mt-n1">
                                {{ formatDateMonth(item.startDateTime) }}
                              </div>
                            </div>
                            <div v-else>
                              <v-icon class="white--text">fa-history</v-icon>
                            </div>
                          </div>
                        </v-avatar>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize">{{
                          item.label
                        }}</v-list-item-title>
                        <div v-if="item.startTime">
                          <v-list-item-subtitle class="session-date">
                            <v-icon class="fs-16 mr-1">fa-clock</v-icon>
                            {{ formatField(item.startTime) }}
                            {{ formatField(item.endTime) }}
                          </v-list-item-subtitle>
                        </div>
                        <div v-else>
                          <v-list-item-subtitle
                            class="session-date"
                            v-text="formatDate(item.startDateTime)"
                          ></v-list-item-subtitle>
                        </div>
                      </v-list-item-content>

                      <v-list-item-icon class="ma-0">
                        <div v-if="item.locationType === 'Bitpod Virtual'">
                          <v-btn
                            class="ma-2 mr-0"
                            outlined
                            color="success"
                            @click="startEvent(item.bitpodVirtualLink, true)"
                          >
                            Join Session<v-icon right>
                              mdi-video
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </div>
              </div>
            </div>
            <div
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
            >
              <v-flex class="d-flex justify-center align-center pb-3">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-users pr-1" aria-hidden="true"></i> Attendees
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
              <div>
                <v-list>
                  <v-list-item
                    v-for="item in registration.attendee"
                    :key="item.id"
                    class="px-0"
                  >
                    <v-list-item-avatar size="48" class="mr-2 ma-0">
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
                          <span class="white--text Twitter">{{
                            item.FullName
                          }}</span>
                        </v-avatar>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content class="py-0">
                      <v-list-item-title
                        class="text-capitalize"
                        v-text="item.FullName"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.Email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon class="ma-0 mt-2">
                      <v-btn icon disabled>
                        <v-icon>mdi-message-outline</v-icon>
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>
          <div>
            <div
              v-if="
                event && event.speakers && Object.keys(event.speakers).length
              "
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 rounded-lg"
            >
              <v-flex class="d-flex justify-center align-center pb-3">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                  Speakers
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
                      :src="'https://event.test.bitpod.io' + item.imageURL"
                      height="160px"
                      class="positionRelative speaker-img grey lighten-4"
                    />
                  </div>
                  <div v-else class="overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/mytestlogo/default_profile"
                      height="160px"
                      class="positionRelative speaker-img grey lighten-4"
                    />
                  </div>
                  <v-text
                    class="text-center fs-20 d-flex justify-center pt-1 text-capitalize"
                    >{{ item.firstName }}</v-text
                  >
                  <v-card-actions class="pa-1 pt-0 d-flex justify-center">
                    <v-btn icon :to="item.socialMedia.facebook" target="_blank">
                      <v-icon class="fs-18">mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn icon :to="item.socialMedia.twitter" target="_blank">
                      <v-icon class="fs-18">mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn icon :to="item.socialMedia.linkdin" target="_blank">
                      <v-icon class="fs-18">mdi-linkedin</v-icon>
                    </v-btn>
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
                <i class="fa fa-users pr-1" aria-hidden="true"></i> Gallery
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
                    :src="'https://event.test.bitpod.io' + image"
                    :lazy-src="'https://event.test.bitpod.io' + image"
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
                <i class="fa fa-users pr-1" aria-hidden="true"></i> Reviews
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
          <div v-if="event.BusinessType === 'Single'">
            <v-expansion-panels
              accordion
              flat
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-0 mb-4 pb-2 rounded-lg"
            >
              <v-expansion-panel
                v-for="(item, i) in 1"
                :key="i"
                flat
                class="elevation-0 pa-0"
              >
                <v-expansion-panel-header class="elevation-0 pa-0"
                  ><v-flex class="d-flex justify-center align-center pb-0">
                    <h2 class="body-1 pb-0">
                      <i class="fa fa-ticket pr-1" aria-hidden="true"></i>
                      Tickets
                    </h2>
                    <v-spacer></v-spacer> </v-flex
                ></v-expansion-panel-header>
                <v-expansion-panel-content class="pa-0">
                  <v-divider></v-divider>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Amount
                          </th>
                          <th class="text-left">
                            Quantity
                          </th>
                          <th class="text-left">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Student</td>
                          <td>{{ registration.SubTotal }}</td>
                          <td>{{ registration.TicketQuantity }}</td>
                          <td>{{ registration.TotalAmount }}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Total</td>
                          <td>
                            {{ registration.Currency
                            }}{{ registration.TotalAmount }}
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
                Date and Time
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <v-flex my-3>
              <div
                v-if="event.BusinessType === 'Recurring'"
                class="body-1 my-n3"
              >
                <v-list class="pa-0">
                  <v-list-item
                    v-for="item in registration.attendee"
                    :key="item.id"
                    class="pa-0"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        {{ formatDate(item.BookingDate) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
              <div v-else class="body-1">
                {{ formatDate(event && event.startDateTime) }} -<br />
                {{ formatDate(event && event.endDateTime) }} -<br />
                {{ formatField(event && event.timeZone) }}
              </div>
            </v-flex>
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 ml-md-2 mr-0 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-location pr-1" aria-hidden="true"></i>
                Venue
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
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
            <div v-if="showJoinBtn()">
              <v-btn
                class="ma-3 ml-0"
                outlined
                color="success"
                @click="startEvent(event.UniqLink)"
              >
                Join Event<v-icon right>
                  mdi-video
                </v-icon>
              </v-btn>
            </div>
            <div v-else-if="event.locationType === 'Online event'">
              <div>
                <v-chip class="ma-2 ml-0" color="primary" outlined pill>
                  Online Event
                </v-chip>
              </div>
              <div v-if="showOnlineJoinBtn()">
                <a
                  :href="event.WebinarLink"
                  target="_blank"
                  class="text-decoration-none"
                  ><v-btn class="ma-3 ml-0" outlined color="success">
                    Join Event<v-icon right>
                      mdi-video
                    </v-icon>
                  </v-btn></a
                >
              </div>
            </div>
            <div v-else>
              <v-flex my-3>
                <div class="body-1">
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
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 ml-md-2 mr-0 pb-2 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-calendar pr-1" aria-hidden="true"></i>
                Organizer
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <v-flex my-3>
              <div class="body-1">
                {{
                  formatField(
                    registration &&
                      registration.EventList &&
                      registration.EventList.Organizer
                  )
                }}
              </div>
            </v-flex>
          </div>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import format from 'date-fns/format'
import nuxtconfig from '~/nuxt.config'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'public',
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      isEditReg: false,
      showAttndeeBtn: false,
      isCancelReg: false,
      isRefund: false,
      roomname: '',
      type: '',
      event: {},
      registration: {},
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
  },
  mounted() {
    this.getRegistrationData()
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
    formatDateTime(date) {
      return date ? format(new Date(date), 'p') : ''
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
      if (isFullLink) {
        window.open(`${roomName}?e=${this.event.id}`)
      } else {
        window.open(`https://meet.bitpod.io/${roomName}?e=${this.event.id}`)
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
    showJoinBtn() {
      return (
        this.event.locationType === 'Bitpod Virtual' &&
        this.registration &&
        this.registration.SessionListId &&
        !this.registration.SessionListId.filter((i) => {
          return i.LocationType === 'Bitpod Virtual'
        }).length
      )
    },
    showOnlineJoinBtn() {
      return (
        this.event.locationType === 'Online event' &&
        this.registration &&
        this.registration.SessionListId &&
        !this.registration.SessionListId.filter((i) => {
          return i.LocationType === 'Online event'
        }).length
      )
    },
    async getRegistrationData() {
      const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Registrations/findRegistration?regId=${this.$route.params.id}`
      // const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Registrations/${this.$route.params.id}`
      try {
        const res = await this.$axios.$get(URL)
        if (res) {
          this.registration = res
          this.getEventData(res.EventId)
          if (res.SessionListId[0].BitpodVirtualLink) {
            this.roomname = `${
              res.SessionListId[0].BitpodVirtualLink.split('/')[3]
            }-${new Date(res.attendee[0].BookingDate || null)
              .getTime()
              .toString(36)}`
            this.showAttndeeBtn =
              true && this.registration.EventList.BusinessType === 'Recurring'
          }
          this.type = res.Type
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
        const URL = `https://${nuxtconfig.axios.eventUrl}${
          nuxtconfig.axios.apiEndpoint
        }Events/findEvent?eventFilter=${JSON.stringify(filter)}`
        try {
          const res = await this.$axios.$get(URL)
          if (res) {
            this.event = res.result
          }
        } catch (e) {
          console.error(
            `Error in apps/event/_id/index.vue while making a Patch call to Event model in method updateEvent context: EventId:-${data.EventId} \n URL:- ${URL} `,
            e
          )
        }
      }
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
}
</style>

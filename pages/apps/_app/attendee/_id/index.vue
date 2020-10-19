<template>
  <v-flex>
    <v-flex>
      <div class="background-event-img">
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
              :src="$config.cdnUri + 'default-min.jpg'"
              class="eventsite-banner"
            ></v-img>
          </v-flex>
          <v-flex
            flex-column
            class="flex-30 justify-center d-flex event-right-info pa-2"
          >
            <div class="text-h4 text-center text-capitalize">
              {{ formatField(data.registration.EventName) }}
            </div>
            <div class="body-1 text-center text-capitalize">
              By {{ formatField(event && event.organizer) }}
            </div>
          </v-flex>
        </v-flex>
        <v-flex v-if="event && event.description" class="d-flex boxview">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="pa-3" v-html="event && event.description" />
        </v-flex>
      </v-flex>
      <v-flex d-flex flex-md-row flex-lg-row flex-column-reverse>
        <v-flex column class="mxw-w70 mr-0 mr-md-2">
          <div
            v-if="event && event.sessions && Object.keys(event.sessions).length"
          >
            <div
              v-if="content"
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
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
                      <v-list-item-subtitle
                        class="session-date"
                        v-text="formatDate(item.startDateTime)"
                      ></v-list-item-subtitle>
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
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                <i class="fa fa-users pr-1" aria-hidden="true"></i> Attendees
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <Grid
              view-name="registrationAttendeesPublic"
              :content="content"
              :context="data"
              class="mt-n12"
            />
          </div>
          <div
            v-if="event && event.speakers && event.speakers.length"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                <i class="fa fa-ticket pr-1" aria-hidden="true"></i>
                Speakers
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <div class="d-flex">
              <div
                v-for="item in Object.values(event.speakers)"
                :key="item.id"
                class="speaker-inner"
              >
                <div class="avatar-container">
                  <div v-if="item.imageURL">
                    <img
                      :src="'https://event.test.bitpod.io' + item.imageURL"
                      class="avatar-image avatar"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="https://res.cloudinary.com/mytestlogo/default_profile"
                      class="avatar-image avatar"
                    />
                  </div>
                </div>
                <div class="speaker-name">
                  <span title="Rishi B">{{ item.firstName }}</span>
                  <div class="middle">
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      class="social-icons text-decoration-none"
                    >
                      <i class="fa fa-linkedin"></i>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      class="social-icons text-decoration-none"
                    >
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      class="social-icons text-decoration-none"
                    >
                      <i class="fa fa-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div
              v-if="
                event && event.speakers && Object.keys(event.speakers).length
              "
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
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
                  class="pb-speakers ma-4 ml-0 mb-0 ma-xs-4"
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
                    <v-btn icon>
                      <v-icon class="fs-18">mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon class="fs-18">mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon class="fs-18">mdi-linkedin</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </div>
          </div>
          <div
            v-if="event && event.Other && event.Other.length"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
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
                  v-for="image in event.Other"
                  :key="image"
                  class="d-flex child-flex pl-0 pt-0 rounded-lg"
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
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-1 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
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
          <div
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-3">
              <h2 class="body-1 pb-0">
                <i class="fa fa-ticket pr-1" aria-hidden="true"></i>
                Tickets
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
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
                    <td>{{ data.registration.SubTotal }}</td>
                    <td>{{ data.registration.TicketQuantity }}</td>
                    <td>{{ data.registration.TotalAmount }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td>
                      {{ data.registration.Currency
                      }}{{ data.registration.TotalAmount }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-flex>
        <v-flex column class="mxw-w30">
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 mx-md-2 pb-2 elevation-1 rounded-lg"
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
              <div class="body-1">
                {{ formatDate(event && event.startDateTime) }} -<br />
                {{ formatDate(event && event.endDateTime) }} -<br />
                {{ formatField(event && event.timeZone) }}
              </div>
            </v-flex>
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-0 mx-md-2 pb-2 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-location pr-1" aria-hidden="true"></i>
                Venue
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>

            <div v-if="event.locationType === 'Bitpod Virtual'">
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
            <div v-else>
              <v-flex my-3>
                <div class="body-1">
                  {{
                    formatField(event && event.address && event.address.name)
                  }}
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import nuxtconfig from '~/nuxt.config'
import registration from '~/config/apps/event/gql/registration.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'public',
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      isEditReg: false,
      isCancelReg: false,
      isRefund: false,
      event: {},
      data: {
        registration: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Registrations : null
    },
    filter() {
      return {
        where: {
          EventId: this.data.registration && this.data.registration.EventId,
        },
      }
    },
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
    async getEventData(data) {
      if (data.EventId) {
        // const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${data.EventId}`
        const eventid = data.EventId.toString()
        console.log('id', eventid)
        const filter = { id: eventid }
        const URL = `https://${nuxtconfig.axios.eventUrl}${
          nuxtconfig.axios.apiEndpoint
        }Events/findEvent?eventFilter=${JSON.stringify(filter)}`
        try {
          const res = await this.$axios.$get(URL)
          if (res) {
            console.log('res', res)
            this.event = res.result
            console.log('eventdata', this.event)
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
  apollo: {
    data: {
      query() {
        return gql`
          ${registration}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const registrationData = formatGQLResult(data, 'Registration')
        if (registrationData.length) {
          const regdata = registrationData.length > 0 ? registrationData[0] : {}
          this.getEventData(regdata)
          return { registration: regdata }
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
  min-height: 16px;
}
.speaker-img {
  width: 100%;
}
.ps-rating {
  pointer-events: none;
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
}
</style>

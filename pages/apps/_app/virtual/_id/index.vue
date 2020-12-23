<template>
  <div>
    <v-app-bar app flat class="greybg headernew pl-0 video-stream" height="50">
      <v-toolbar-title
        class="pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
      >
        <span class="bitpod-logo logo-ds d-none d-sm-flex">
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-new.png'"
            class="logofull mr-2"
          ></v-img>
        </span>
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-flex class="public-page-main">
      <v-flex class="public-main public-info pa-5">
        <v-flex d-flex flex-md-row flex-lg-row flex-column>
          <v-flex column class="flex-70 mr-0 mr-md-2">
            <div
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-0 mr-0 mb-4 mt-11 d-flex overflowHidden"
            >
              <div class="pa-0 flex-60 d-flex flex-column black">
                <div>
                  <iframe
                    width="100%"
                    height="400"
                    :src="videoSrc"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="pa-2">
                  <h2 class="white--text">{{ sessionName }}</h2>
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
                class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-0 mx-0 mr-0 flex-40"
              >
                <div>
                  <div class="body-1 mt-2">
                    <iframe
                      id="rcChannel"
                      name="rcChannel"
                      class="boxview"
                      :src="`https://chat.bitpod.io/channel/${registration.EventList.chatChannel}?layout=embedded`"
                      width="100%"
                      height="450"
                      frameBorder="0"
                      allow="camera;microphone;fullscreen"
                      @load="authenticateIFrame()"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="text-h5 text-capitalize">
                {{ formatField(registration.EventName) }}
              </div>
              <v-flex
                v-if="
                  registration &&
                  registration.EventList &&
                  registration.EventList.Description
                "
                class="d-flex flex-column"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div
                  class="py-3"
                  v-html="
                    registration &&
                    registration.EventList &&
                    registration.EventList.Description
                  "
                />
              </v-flex>
            </div>
            <div>
              <div
                v-if="
                  event && event.speakers && Object.keys(event.speakers).length
                "
                class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2"
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
                      <v-btn
                        icon
                        :to="item.socialMedia.facebook"
                        target="_blank"
                      >
                        <v-icon class="fs-18">mdi-facebook</v-icon>
                      </v-btn>

                      <v-btn
                        icon
                        :to="item.socialMedia.twitter"
                        target="_blank"
                      >
                        <v-icon class="fs-18">mdi-twitter</v-icon>
                      </v-btn>

                      <v-btn
                        icon
                        :to="item.socialMedia.linkdin"
                        target="_blank"
                      >
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
              class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-0 mb-4 pb-2"
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
                    class="d-flex child-flex pl-0 pt-0 gallery-img"
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
          </v-flex>
          <v-flex column class="flex-30 pl-3">
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
                    class="xs12 sm4 md4 lg4 boxviewsmall pa-0 mb-0 mx-0 mr-0 pb-2"
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
                    <div class="session-list">
                      <v-list class="pb -0">
                        <v-list-item
                          v-for="item in registration.SessionListId"
                          :key="item.id"
                          class="xs12 sm4 md4 lg4 grey lighten-2 boxviewsmall pa-3 mb-4 mx-0 py-2 session-view-in"
                          :class="{
                            selected:
                              item.WebinarLink + '?autoplay=1' === videoSrc,
                          }"
                          @click="
                            ;(videoSrc =
                              item.WebinarLink + '?autoplay=1' || ''),
                              (sessionName = item.Name || '')
                          "
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
                            <v-list-item-title class="text-capitalize">{{
                              item.Name
                            }}</v-list-item-title>
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
                            <div>
                              <div
                                v-if="
                                  item.LocationType === 'Bitpod Virtual' &&
                                  event.BusinessType === 'Single'
                                "
                              >
                                <v-btn
                                  class="mt-2 mr-0"
                                  depressed
                                  x-small
                                  color="error"
                                  :disabled="isPast"
                                >
                                  <i18n path="Common.Live" />
                                </v-btn>
                                <v-btn
                                  class="mt-2 mr-0"
                                  depressed
                                  x-small
                                  :disabled="isPast"
                                >
                                  <i18n path="Common.Watching" />
                                </v-btn>
                              </div>
                              <div v-if="item.LocationType === 'Online event'">
                                <a
                                  :href="!isPast && item.WebinarLink"
                                  target="_blank"
                                  class="text-decoration-none isLive"
                                  ><v-btn
                                    class="mt-2 mr-0"
                                    depressed
                                    x-small
                                    color="error"
                                    :disabled="isPast"
                                  >
                                    <i18n path="Common.Live" /> </v-btn
                                ></a>
                                <a
                                  :href="!isPast && item.WebinarLink"
                                  target="_blank"
                                  class="text-decoration-none isWatchig"
                                  ><v-btn
                                    class="mt-2 mr-0"
                                    depressed
                                    x-small
                                    :disabled="isPast"
                                  >
                                    <i18n path="Common.Watching" /> </v-btn
                                ></a>
                              </div>
                            </div>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
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
                    class="xs12 sm4 md4 lg4 boxviewsmall pa-3 mb-4 mx-0 mr-0 pb-2"
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
                            </div>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-flex>
  </div>
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
      videoSrc: '',
      sessionName: '',
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
      if (isFullLink) {
        window.open(`${roomName}?e=${this.event.id}`)
      } else {
        window.open(`https://meet.bitpod.io/${roomName}?e=${this.event.id}`)
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
            if (
              this.registration &&
              this.registration.SessionListId &&
              this.registration.SessionListId.length
            ) {
              this.videoSrc = this.registration.SessionListId[0].WebinarLink
              this.sessionName = this.registration.SessionListId[0].Name
            }
            result.attendee.map((i) => {
              if (!this.attendeeData[i.TicketName]) {
                this.attendeeData[i.TicketName] = {
                  count: 1,
                  ticketName: i.TicketName,
                  price: i.TicketAmount,
                  total: i.TicketAmount,
                }
              } else {
                this.attendeeData[i.TicketName].count++
                this.attendeeData[i.TicketName].total += i.TicketAmount
              }
            })
            Object.values(this.attendeeData).map((i) => {
              const ticketname = this.registration.TicketListId.find((j) => {
                return j.Code === i.ticketName
              })
              return Object.assign(i, {
                ticketAmount: ticketname ? ticketname.Amount || 0 : 0,
              })
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
  },
}
</script>

<style scoped>
.public-main {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
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
  flex: 75%;
  width: 75%;
}
.flex-30 {
  flex: 25%;
  max-width: 25%;
}
.flex-60 {
  flex: 65%;
  width: 65%;
  max-width: 65%;
}
.flex-40 {
  flex: 35%;
  max-width: 35%;
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
.session-list .v-list {
  background: transparent !important;
}
.session-list .boxview:last-child {
  margin-bottom: 0 !important;
}
.isWatchig {
  display: none;
}
.selected .isWatchig {
  display: inline-block;
}
.selected .isLive {
  display: none;
}
.video-stream {
  min-height: 50px;
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

<template>
  <div>
    <div>
      <v-row class="px-3">
        <v-col
          ref="summaryBlock"
          cols="12"
          class="overflowHidden px-0 summaryBlock"
          :class="{ scrollReplacement: !hasScroll }"
          @mouseenter="updateScroll"
        >
          <div style="width: 1080px;">
            <div
              v-for="(data, index) in eventSummaryData"
              :key="index"
              class="white d-inline-block elevation-2 rounded"
              :class="{ 'mr-5': index < 4 }"
              style="width: 200px; height: 60px;"
            >
              <v-skeleton-loader
                :loading="!eventSummaryLoaded"
                tile="true"
                type="avatar"
                height="60"
                width="60"
              >
                <div
                  class="d-flex"
                  :class="{ cursorPointer: data.click }"
                  @click="routeToAbandoned(data.click)"
                >
                  <div
                    style="width: 60px; height: 60px;"
                    :class="data.class"
                    class="rounded-l"
                  >
                    <v-icon
                      style="font-size: 28px;"
                      class="pl-4 pt-4 white--text"
                      :class="data.icon"
                    ></v-icon>
                  </div>
                  <div class="pl-2 pt-1">
                    <h3 class="font-weight-regular text-truncate summaryTile">
                      {{ data.caption === 'Total Revenue' ? '$' : ''
                      }}{{ data.data
                      }}{{ data.caption === 'Email Conversion' ? '%' : '' }}
                    </h3>
                    <h5 class="font-weight-regular text-truncate summaryTile">
                      {{ data.caption }}
                    </h5>
                  </div>
                </div>
              </v-skeleton-loader>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.EventsonSale" />
          </h3>
          <div
            v-for="(data, index) in eventOnSaleData"
            :key="index"
            class="white elevation-2 rounded mb-3 cursorPointer dataTile"
            @click="routeToEvent(data.id)"
          >
            <v-skeleton-loader
              :loading="!eventOnSaleLoaded"
              tile="true"
              type="avatar"
              height="70"
              width="70"
            >
              <div class="d-flex">
                <div
                  style="width: 70px; height: 70px;"
                  :class="data.class"
                  class="rounded-l"
                >
                  <v-icon
                    v-if="data.type === 'Recurring'"
                    style="font-size: 28px;"
                    class="pl-5 pt-5 white--text fa fa-timer rec-event"
                  ></v-icon>
                  <div v-else class="pt-3 positionRelative text-center pt-2">
                    <h2 class="white--text font-weight-regular">
                      {{ data.date }}
                    </h2>
                    <h4 class="white--text font-weight-regular mt-n2">
                      {{ data.month }}
                    </h4>
                  </div>
                </div>
                <div
                  v-if="data.imageUrl"
                  style="width: 40px;"
                  class="py-4 px-1 ml-2"
                >
                  <v-img
                    :src="getURL(data.imageUrl)"
                    :lazy-src="getURL(data.imageUrl)"
                    aspect-ratio="1"
                    min-height="40"
                    max-height="40"
                    contain
                  >
                  </v-img>
                </div>
                <div class="pl-2 pt-1">
                  <h3
                    class="font-weight-regular text-truncate pl-1 text-capitalize tileCaption"
                  >
                    {{ data.title }}
                  </h3>
                  <h4
                    v-if="data.location"
                    class="font-weight-regular text-truncate d-inline-flex pt-1"
                    style="width: 170px;"
                  >
                    <v-icon>mdi-map-marker-outline</v-icon>
                    <div>
                      {{ data.location }}
                    </div>
                  </h4>
                  <h5 class="attendeeCount grey--text">
                    <v-icon>mdi-account-multiple-outline</v-icon>
                    {{ data.attendeeCount }}
                  </h5>
                </div>
              </div>
            </v-skeleton-loader>
          </div>
          <v-hover v-slot:default="{ hover }">
            <h4
              v-if="eventOnSaleLoaded"
              class="font-weight-regular float-right viewAll cursorPointer"
              :class="{
                'grey--text': !hover,
                'blue--text': hover,
              }"
              @click="routeToLiveEvents"
            >
              <i18n path="Common.Viewall" />
            </h4>
          </v-hover>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.10DaysTicketsSale" />
          </h3>
          <div
            v-if="!ticketSoldLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey dummyChart"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="LineChart"
              :data="ticketSaleData"
              :options="ticketSalechartOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.RecentBuyers" />
          </h3>
          <div
            v-for="(data, index) in recentBuyersData"
            :key="index"
            class="white elevation-2 rounded mb-3 cursorPointer dataTile"
            @click="routeToRegistration(data.id)"
          >
            <v-skeleton-loader
              :loading="!recentBuyersLoaded"
              tile="true"
              type="avatar"
              height="50"
              width="50"
              style="position: relative; top: 10px; left: 10px;"
              class="rounded"
            >
              <div class="d-flex">
                <div
                  v-if="recentBuyersLoaded"
                  style="width: 50px; height: 50px;"
                  class="rounded"
                  :class="data.class"
                >
                  <v-avatar :class="data.class">
                    <span class="white--text headline text-uppercase">{{
                      data.creatorName[0]
                    }}</span>
                  </v-avatar>
                </div>
                <div class="pl-2 pt-1">
                  <h3
                    class="font-weight-regular text-truncate text-capitalize tileCaption"
                  >
                    {{ data.creatorName }}
                  </h3>
                  <h5 class="font-weight-regular text-truncate tileCaption">
                    {{ data.eventName }}
                  </h5>
                </div>
                <div class="attendeeCount mb-n2">
                  <v-chip
                    class="ma-2"
                    :color="
                      data.status === 'Success'
                        ? 'green'
                        : data.status === 'Failed'
                        ? 'red'
                        : data.status === 'Cancelled'
                        ? 'grey'
                        : 'orange'
                    "
                    text-color="white"
                    small
                  >
                    {{ data.status }}
                  </v-chip>
                  <h5 class="font-weight-regular px-2">{{ data.time }}</h5>
                </div>
              </div>
            </v-skeleton-loader>
          </div>
          <v-hover v-slot:default="{ hover }">
            <h4
              v-if="eventOnSaleLoaded"
              class="font-weight-regular float-right viewAll cursorPointer"
              :class="{
                'grey--text': !hover,
                'blue--text': hover,
              }"
              @click="routeToRegistrations"
            >
              <i18n path="Common.Viewall" />
            </h4>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.InvitationsConversionbyEvent" />
          </h3>
          <div
            v-if="!conversionLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey dummyChart"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="BubbleChart"
              :data="conversionBubbleData"
              :options="conversionBubbleOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.SalebyGeoLocation" />
          </h3>
          <div
            v-if="!geoLocationLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <v-img
              src="https://res.cloudinary.com/mytestlogo/image/upload/v1574258140/GeoChartBlank_cde6u6.png"
              lazy-src="https://res.cloudinary.com/mytestlogo/image/upload/v1574258140/GeoChartBlank_cde6u6.png"
              aspect-ratio="1"
              min-height="316"
              max-height="316"
              contain
            >
            </v-img>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="GeoChart"
              :data="geoLocationData"
              :options="geoLocationOptions"
              :resize-debounce="100"
              :settings="{ packages: ['geochart'] }"
            /></div
        ></v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.TicketsSold" />
          </h3>
          <div v-if="!pieLoaded" class="rounded white elevation-2 chartHeight">
            <div class="pt-11 positionRelative text-center">
              <div class="pt-15 holeWrapper">
                <div class="pieHole white d-inline-block rounded-circle"></div>
              </div>
              <div class="pie-dummy rounded-circle mx-auto"></div>
            </div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="PieChart"
              :data="pieChartData"
              :options="pieChartOptions"
              :resize-debounce="100"
            /></div
        ></v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.InvitationsConversionTrend" />
          </h3>
          <div
            v-if="!conversionTrendLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey dummyChart"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="AreaChart"
              :data="conversionAreaData"
              :options="conversionAreaOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.SessionsSold" />
          </h3>
          <div
            v-if="!sessionLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey dummyChart"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden">
            <GChart
              type="LineChart"
              :data="sessionSaleData"
              :options="sessionSalechartOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <h3 class="font-weight-regular pb-2">
            <i18n path="Common.EventsTimeline" />
          </h3>
          <div
            v-if="!eventTimelineLoaded"
            class="rounded white elevation-2 chartHeight"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey dummyChart"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded overflowHidden white">
            <GChart
              type="Timeline"
              :data="timelineData"
              :options="timelineOptions"
              :resize-debounce="100"
              :settings="{ packages: ['timeline'] }"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { GChart } from 'vue-google-charts'
import gql from 'graphql-tag'
import {
  sessionSoldData,
  ticketSoldData,
  conversionData,
  geoData,
  pieData,
} from './aggregateFilters.js'
import { formatGQLResult } from '~/utility/gql.js'
import { getIdFromAtob } from '~/utility'
import nuxtconfig from '~/nuxt.config'
import timeAgo from '~/utility/get-time-difference.js'
import eventList from '~/config/apps/event/gql/eventlist.gql'
import registrationList from '~/config/apps/event/gql/registrationList.gql'
export default {
  layout: 'event',
  components: {
    GChart,
  },
  data() {
    return {
      ticketSaleData: [['Date', 'Ticket Sold']],
      ticketSalechartOptions: {
        curveType: 'function',
        legend: 'none',
        height: '316',
        hAxis: { logscale: true },
        chartArea: { width: '80%', height: '70%' },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      conversionBubbleData: [['ID', 'Sent', 'Open', 'Country', 'Register']],
      conversionBubbleOptions: {
        legend: 'none',
        height: '316',
        chartArea: { width: '80%', height: '70%' },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      geoLocationData: [['City', 'Sale']],
      geoLocationOptions: {
        legend: 'none',
        height: '316',
        displayMode: 'markers',
        chartArea: { width: '80%', height: '70%' },
        colorAxis: { colors: ['green', 'yellow'] },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      pieChartData: [['Event', 'Sold']],
      pieChartOptions: {
        legend: 'none',
        height: '316',
        pieHole: 0.4,
        chartArea: { width: '80%', height: '70%' },
        colorAxis: { colors: ['green', 'yellow'] },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      conversionAreaData: [['ID', 'Sent', 'Open']],
      conversionAreaOptions: {
        legend: 'none',
        height: '316',
        chartArea: { width: '80%', height: '70%' },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      sessionSaleData: [['Id', 'Session Sold']],
      sessionSalechartOptions: {
        curveType: 'function',
        legend: 'none',
        height: '316',
        hAxis: { logscale: true },
        chartArea: { width: '80%', height: '70%' },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      timelineData: [],
      timelineOptions: {
        legend: 'none',
        height: '316',
        chartArea: { width: '80%', height: '70%' },
        animation: {
          startup: true,
          duration: 1000,
          easing: 'in',
        },
      },
      eventSummaryData: [
        {
          caption: 'Total Registrations',
          icon: 'fa fa-user-check',
          data: '',
          class: 'green accent-4',
        },
        {
          caption: 'Abandoned Registrations',
          icon: 'fa fa-user-x',
          data: '',
          class: 'red lighten-1',
          click: 'routeToAbandoned',
        },
        {
          caption: 'Total Revenue',
          icon: 'fa fa-banknote',
          data: '',
          class: 'yellow darken-2',
        },
        {
          caption: 'Tickets Sold',
          icon: 'fa fa-ticket',
          data: '',
          class: 'light-blue darken-1',
        },
        {
          caption: 'Email Conversion',
          icon: 'fa fa-seo-consulting',
          data: '',
          class: 'green accent-4',
        },
      ],
      eventOnSaleData: [
        {
          class: 'green accent-4',
        },
        {
          class: 'red lighten-1',
        },
        {
          class: 'yellow darken-2',
        },
        {
          class: 'light-blue darken-1',
        },
      ],
      recentBuyersData: [
        {
          class: 'green accent-4',
        },
        {
          class: 'red lighten-1',
        },
        {
          class: 'yellow darken-2',
        },
        {
          class: 'light-blue darken-1',
        },
      ],
      eventSummaryLoaded: false,
      eventOnSaleLoaded: false,
      ticketSoldLoaded: false,
      recentBuyersLoaded: false,
      conversionLoaded: false,
      geoLocationLoaded: false,
      pieLoaded: false,
      conversionTrendLoaded: false,
      sessionLoaded: false,
      eventTimelineLoaded: false,
      hasScroll: false,
    }
  },
  mounted() {
    this.getSummaryData()
    this.getTicketSoldData()
    this.getSessionSoldData()
    this.getConversionData()
    this.getGeoData()
    this.getPieData()
  },
  methods: {
    routeToLiveEvents(method) {
      this.$router.push('/apps/event/list/Event/All Events')
    },
    routeToRegistrations(method) {
      this.$router.push('/apps/event/list/Registrations/Registrations')
    },
    routeToAbandoned(method) {
      if (method === 'routeToAbandoned') {
        this.$router.push(
          '/apps/event/list/Registrations/Abandoned Registrations'
        )
      }
    },
    routeToEvent(id) {
      this.$router.push(`/apps/event/event/recurring/${id}`)
    },
    routeToRegistration(id) {
      this.$router.push(`/apps/event/registration/${id}`)
    },
    updateScroll() {
      const block = this.$refs.summaryBlock
      this.hasScroll = block.scrollWidth > block.clientWidth
    },
    getURL(id) {
      const attachmentUrl = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/download/${id}`
      return attachmentUrl
    },
    getSummaryData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/getEventSummery`
        )
        .then((data) => {
          this.eventSummaryData[0].data = data.data.result.totalRegistration
          this.eventSummaryData[1].data = data.data.result.totalFailed
          this.eventSummaryData[2].data = data.data.result.Revenue
          this.eventSummaryData[3].data = data.data.result.TotalTickets
          this.eventSummaryData[4].data = data.data.result._id
          this.eventSummaryLoaded = true
          return data
        })
        .catch((err) => {
          return err
        })
    },
    getSessionSoldData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${
            nuxtconfig.axios.apiEndpoint
          }Events/aggregate?filter=${JSON.stringify(sessionSoldData())}`
        )
        .then((data) => {
          if (data.data.data.length) {
            data.data.data.forEach((i) => {
              if (i.SessionId.length) {
                i._id.forEach((j, index) => {
                  const data = i.SessionId.reduce((acc, k) => {
                    return k.includes(j) ? ++acc : acc
                  }, 0)
                  if (data) {
                    this.sessionSaleData.push([
                      i.Name + '-' + i.sessionname[index],
                      data,
                    ])
                  }
                })
              }
            })
            this.sessionLoaded = true
          }
          return data
        })
        .catch((err) => {
          return err
        })
    },
    getTicketSoldData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${
            nuxtconfig.axios.apiEndpoint
          }Registrations/aggregate?filter=${JSON.stringify(ticketSoldData())}`
        )
        .then((data) => {
          if (data.data.data.length) {
            const monthsName = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]
            const today = new Date()
            for (let i = 0; i < 10; i++) {
              const present = data.data.data.filter(
                (j) => j.day === today.getDate()
              )
              this.ticketSaleData.push([
                today.getDate() + '/' + monthsName[today.getMonth()],
                present.length ? present[0].TicketQuantity : 0,
              ])
              today.setDate(today.getDate() - 1)
            }
            this.ticketSoldLoaded = true
          }
          return data
        })
        .catch((err) => {
          return err
        })
    },
    getConversionData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${
            nuxtconfig.axios.apiEndpoint
          }Events/aggregate?filter=${JSON.stringify(conversionData())}`
        )
        .then((data) => {
          if (data.data.data.length) {
            data.data.data.forEach((i) => {
              this.conversionBubbleData.push([
                i.Event,
                i.Sent.length,
                i.Open.filter((j) => j > 0).length,
                i.Country,
                i.isRegistered.filter((k) => k === true).length,
              ])
              this.conversionAreaData.push([
                i.Event,
                i.Sent.length,
                i.Open.filter((j) => j > 0).length,
              ])
            })
            this.conversionLoaded = true
            this.conversionTrendLoaded = true
          }
          return data
        })
        .catch((err) => {
          return err
        })
    },
    getGeoData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${
            nuxtconfig.axios.apiEndpoint
          }Registrations/aggregate?filter=${JSON.stringify(geoData())}`
        )
        .then((data) => {
          if (data.data.data.length) {
            data.data.data.forEach((i) => {
              this.geoLocationData.push([i._id, i.total])
            })
            this.geoLocationLoaded = true
          }
          return data
        })
        .catch((err) => {
          return err
        })
    },
    getPieData() {
      this.$axios
        .get(
          `https://${nuxtconfig.axios.eventUrl}${
            nuxtconfig.axios.apiEndpoint
          }Events/aggregate?filter=${JSON.stringify(pieData())}`
        )
        .then((data) => {
          if (data.data.data.length) {
            data.data.data.forEach((i) => {
              if (i.TicketId.length) {
                i._id.forEach((j, index) => {
                  const data = i.TicketId.reduce((acc, k) => {
                    return k.includes(j) ? ++acc : acc
                  }, 0)
                  if (data) {
                    this.pieChartData.push([
                      i.Name + '-' + i.ticketname[index],
                      data,
                    ])
                  }
                })
              }
            })
            this.pieLoaded = true
          }
          return data
        })
        .catch((err) => {
          return err
        })
    },
  },
  apollo: {
    eventInfo: {
      query() {
        return gql`
          ${eventList}
        `
      },
      variables() {
        return {
          filters: {
            limit: 4,
            order: 'createdDate DESC',
            skip: 0,
            where: {
              and: [{ Status: 'Open for registration' }],
            },
          },
          where: {
            and: [{ Status: 'Open for registration' }],
          },
        }
      },
      update(data) {
        const eventData = formatGQLResult(data, 'Event')
        if (eventData.length) {
          this.eventOnSaleData = eventData.map((item, index) => {
            return {
              imageUrl: item.Images.length ? item.Images[0] : '',
              title: item.Title,
              attendeeCount: item.Attende.totalCount,
              class: this.eventOnSaleData[index].class,
              id: getIdFromAtob(item.id),
              type: item.BusinessType,
              date: item.StartDate
                ? new Date(item.StartDate).toString().split(' ')[2]
                : '',
              month: item.StartDate
                ? new Date(item.StartDate).toString().split(' ')[1]
                : '',
              location: item.VenueName ? item.VenueName : '',
            }
          })
          this.eventOnSaleLoaded = true
        }
      },
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
    timelineInfo: {
      query() {
        return gql`
          ${eventList}
        `
      },
      variables() {
        return {
          filters: {
            limit: 4,
            order: 'id DESC',
            skip: 0,
            where: {
              and: [
                { Status: { neq: 'Not ready' } },
                { EndDate: { gte: new Date().toISOString() } },
                {
                  or: [
                    { StartDate: { lte: new Date().toISOString() } },
                    { StartDate: { gte: new Date().toISOString() } },
                  ],
                },
              ],
            },
          },
          where: {
            and: [
              { Status: { neq: 'Not ready' } },
              { EndDate: { gte: new Date().toISOString() } },
              {
                or: [
                  { StartDate: { lte: new Date().toISOString() } },
                  { StartDate: { gte: new Date().toISOString() } },
                ],
              },
            ],
          },
        }
      },
      update(data) {
        const eventData = formatGQLResult(data, 'Event')
        this.timelineData = []
        if (eventData.length) {
          eventData.forEach((element) => {
            this.timelineData.push([
              element.Title,
              new Date(element.StartDate),
              new Date(element.EndDate),
            ])
          })
          this.eventTimelineLoaded = true
        }
      },
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
    registrationInfo: {
      query() {
        return gql`
          ${registrationList}
        `
      },
      variables() {
        return {
          filters: { limit: 4, order: 'id DESC', skip: 0 },
          where: {},
        }
      },
      update(data) {
        const registrationData = formatGQLResult(data, 'Registration')
        if (registrationData.length) {
          this.recentBuyersData = registrationData.map((item, index) => {
            return {
              title: item.Title,
              eventName: item.EventName,
              creatorName: item.FullName,
              status: item.Status,
              time: timeAgo(item.createdDate),
              class: this.recentBuyersData[index].class,
              id: getIdFromAtob(item.id),
            }
          })
          this.recentBuyersLoaded = true
        }
      },
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
.attendeeCount {
  position: absolute;
  right: 10px;
  bottom: 5px;
  text-align: right;
}
.holeWrapper {
  position: absolute;
  width: 100%;
}
.pie-dummy {
  width: 200px;
  height: 200px;
  background-image: conic-gradient(#c5c4c0 64%, #ababab 17%, #d6d4d4);
}
.pieHole {
  width: 80px;
  height: 80px;
}
.scrollReplacement {
  border-bottom: 6px solid transparent !important;
}
.summaryBlock {
  border-bottom: 6px solid transparent;
}
.summaryBlock:hover {
  border-bottom: none;
  overflow: auto hidden;
}
.chartHeight {
  height: 316px;
}
.dummyChart {
  height: 316px;
}
.summaryTile {
  width: 132px;
}
.dataTile {
  height: 70px;
}
.tileCaption {
  width: 200px;
}
</style>

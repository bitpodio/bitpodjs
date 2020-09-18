<template>
  <div>
    <div>
      <v-row class="px-3">
        <v-col cols="12" class="summaryBlock px-0">
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
                <div class="d-flex">
                  <div
                    style="width: 60px; height: 60px;"
                    :class="data.class"
                    class="rounded-l"
                  >
                    <v-icon
                      style="font-size: 28px;"
                      class="pl-4 pt-4 white--text"
                      >{{ data.icon }}</v-icon
                    >
                  </div>
                  <div class="pl-2 pt-1">
                    <h3
                      class="font-weight-regular text-truncate"
                      style="width: 132px;"
                    >
                      {{ data.data }}
                    </h3>
                    <h5
                      class="font-weight-regular text-truncate"
                      style="width: 132px;"
                    >
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
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">Events on Sale</h3>
          <div
            v-for="(data, index) in eventOnSaleData"
            :key="index"
            class="white elevation-2 rounded mb-3"
            style="height: 70px;"
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
                  <v-icon style="font-size: 28px;" class="pl-5 pt-5 white--text"
                    >mdi-timer</v-icon
                  >
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
                    class="font-weight-regular text-truncate"
                    style="width: 132px;"
                  >
                    {{ data.title }}
                  </h3>
                  <h5
                    class="font-weight-regular text-truncate"
                    style="width: 132px;"
                  >
                    {{ data.attendeeCount }}
                  </h5>
                </div>
              </div>
            </v-skeleton-loader>
          </div>
        </v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">10 Days Tickets Sale</h3>
          <div
            v-if="!ticketSoldLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey"
              style="height: 52px;"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="LineChart"
              :data="ticketSaleData"
              :options="ticketSalechartOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">Recent Buyers</h3>
          <div
            v-for="(data, index) in recentBuyersData"
            :key="index"
            class="white elevation-2 rounded mb-3"
            style="height: 70px;"
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
                    class="font-weight-regular text-truncate"
                    style="width: 132px;"
                  >
                    {{ data.creatorName }}
                  </h3>
                  <h5
                    class="font-weight-regular text-truncate"
                    style="width: 132px;"
                  >
                    {{ data.eventName }}
                  </h5>
                </div>
                <div>
                  <v-chip
                    class="ma-2"
                    :color="data.status === 'Success' ? 'green' : 'orange'"
                    text-color="white"
                    small
                  >
                    {{ data.status }}
                  </v-chip>
                </div>
              </div>
            </v-skeleton-loader>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Invitations Conversion by Event
          </h3>
          <div
            v-if="!conversionLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey"
              style="height: 52px;"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="BubbleChart"
              :data="conversionBubbleData"
              :options="conversionBubbleOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Sale by Geo Location
          </h3>
          <div
            v-if="!geoLocationLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
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
          <div v-else class="elevation-2 rounded">
            <GChart
              type="GeoChart"
              :data="geoLocationData"
              :options="geoLocationOptions"
              :resize-debounce="100"
              :settings="{ packages: ['geochart'] }"
            /></div
        ></v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Tickets Sold
          </h3>
          <div
            v-if="!pieLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div class="pie-dummy-wrapper"><div class="pie-dummy"></div></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="PieChart"
              :data="pieChartData"
              :options="pieChartOptions"
              :resize-debounce="100"
            /></div
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Invitations Conversion Trend
          </h3>
          <div
            v-if="!conversionTrendLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey"
              style="height: 52px;"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="PieChart"
              :data="pieChartData"
              :options="pieChartOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Sessions Sold
          </h3>
          <div
            v-if="!sessionLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey"
              style="height: 52px;"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="BubbleChart"
              :data="ticketSaleData"
              :options="ticketSalechartOptions"
              :resize-debounce="100"
            />
          </div>
        </v-col>
        <v-col cols="4">
          <h3 class="font-weight-regular pb-2">
            Events Timeline
          </h3>
          <div
            v-if="!eventTimelineLoaded"
            style="height: 316px;"
            class="rounded white elevation-2"
          >
            <div
              v-for="i in 5"
              :key="i"
              class="mx-14 borderBottomGrey"
              style="height: 52px;"
            ></div>
          </div>
          <div v-else class="elevation-2 rounded">
            <GChart
              type="BubbleChart"
              :data="ticketSaleData"
              :options="ticketSalechartOptions"
              :resize-debounce="100"
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
import nuxtconfig from '~/nuxt.config'
import timeAgo from '~/utility/get-time-difference.js'
export default {
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
        chartArea: { width: '80%', height: '80%' },
      },
      conversionBubbleData: [['ID', 'Sent', 'Open', 'Country', 'Register']],
      conversionBubbleOptions: {
        legend: 'none',
        height: '316',
        chartArea: { width: '80%', height: '80%' },
      },
      geoLocationData: [['City', 'Sale']],
      geoLocationOptions: {
        legend: 'none',
        height: '316',
        displayMode: 'markers',
        chartArea: { width: '80%', height: '80%' },
        colorAxis: { colors: ['green', 'yellow'] },
      },
      pieChartData: [['Event', 'Sold']],
      pieChartOptions: {
        legend: 'none',
        height: '316',
        pieHole: 0.4,
        chartArea: { width: '80%', height: '80%' },
        colorAxis: { colors: ['green', 'yellow'] },
      },
      eventSummaryData: [
        {
          caption: 'Total Registrations',
          icon: 'mdi-account-check',
          data: '',
          class: 'greenColor',
        },
        {
          caption: 'Abandoned Registrations',
          icon: 'mdi-account-remove',
          data: '',
          class: 'redColor',
        },
        {
          caption: 'Total Revenue',
          icon: 'mdi-cash-usd',
          data: '',
          class: 'yellowColor',
        },
        {
          caption: 'Tickets Sold',
          icon: 'mdi-ticket-confirmation',
          data: '',
          class: 'blueColor',
        },
        {
          caption: 'Email Conversion',
          icon: 'mdi-account-convert',
          data: '',
          class: 'greenColor',
        },
      ],
      eventOnSaleData: [
        {
          class: 'greenColor',
        },
        {
          class: 'redColor',
        },
        {
          class: 'yellowColor',
        },
        {
          class: 'blueColor',
        },
      ],
      recentBuyersData: [
        {
          class: 'greenColor',
        },
        {
          class: 'redColor',
        },
        {
          class: 'yellowColor',
        },
        {
          class: 'blueColor',
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
          data.data.data.forEach((i) => {
            this.conversionBubbleData.push([
              i.Event,
              i.Sent.length,
              i.Open.filter((j) => j > 0).length,
              i.Country,
              i.isRegistered.filter((k) => k === true).length,
            ])
          })
          this.conversionLoaded = true
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
          data.data.data.forEach((i) => {
            this.geoLocationData.push([i._id, i.total])
          })
          this.geoLocationLoaded = true
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
          query {
            Event {
              EventFind(filter: { limit: 4, order: "StartDate", skip: 0 }) {
                edges {
                  node {
                    id
                    Attende {
                      totalCount
                    }
                    Images
                    Title
                  }
                }
              }
            }
          }
        `
      },
      variables() {
        return {
          filters: {},
          where: {},
        }
      },
      update(data) {
        const eventData = formatGQLResult(data, 'Event')
        this.eventOnSaleData = eventData.map((item, index) => {
          return {
            imageUrl: item.Images.length ? item.Images[0] : '',
            title: item.Title,
            attendeeCount: item.Attende.totalCount,
            class: this.eventOnSaleData[index].class,
          }
        })
        this.eventOnSaleLoaded = true
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
          query {
            Registration {
              RegistrationFind(
                filter: { limit: 4, order: "id DESC", skip: 0 }
              ) {
                edges {
                  node {
                    id
                    EventName
                    FullName
                    Status
                    createdDate
                  }
                }
              }
            }
          }
        `
      },
      variables() {
        return {
          filters: {},
          where: {},
        }
      },
      update(data) {
        const registrationData = formatGQLResult(data, 'Registration')
        this.recentBuyersData = registrationData.map((item, index) => {
          return {
            title: item.Title,
            eventName: item.EventName,
            creatorName: item.FullName,
            status: item.Status,
            time: timeAgo(item.createdDate),
            class: this.recentBuyersData[index].class,
          }
        })
        this.recentBuyersLoaded = true
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

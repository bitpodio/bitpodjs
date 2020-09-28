<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm12 md12 lg12>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-0">
          <div
            class="text-h4 text-capitalize d-inline-block text-truncate col-md-10 pa-0"
          >
            {{ data.invites.Title }}
          </div>
          <v-spacer></v-spacer>
          <div class="mr-2 d-none">
            <v-btn icon small>
              <v-icon class="fs-18">fa-trash</v-icon>
            </v-btn>
          </div>
        </v-flex>

        <v-flex>
          <v-row>
            <v-col class="col-12 pb-0">
              <div class="body-2 text--secondary">Sender</div>
              <div class="body-1">
                {{ formatField(data.invites.SenderName) }}
              </div>
            </v-col>
            <v-col class="col-12 pb-0">
              <div class="body-2 text--secondary">Due Date</div>
              <div class="body-1">
                {{ formatField(data.invites.DueDate) }}
              </div>
            </v-col>
            <v-col class="col-12 pb-0">
              <div class="body-2 text--secondary">Sent Date</div>
              <div class="body-1">
                {{ formatDate(data.invites.createdDate) }}
              </div>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex d-flex flex-md-row flex-lg-row my-2 class="event-cards mt-4">
          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-paperplane" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                {{ data.analytics.Sent }}
              </div>
              <div class="caption text-truncate">Sent</div>
            </div>
          </div>

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
                3
              </div>
              <div class="caption text-truncate">Delivered</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 primary d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-check-square" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                3
              </div>
              <div class="caption text-truncate">Open</div>
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
                1
              </div>
              <div class="caption text-truncate">Bounce</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-minus" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                0
              </div>
              <div class="caption text-truncate">Unsubscribe</div>
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 success d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                4
              </div>
              <div class="caption text-truncate">Register</div>
            </div>
          </div>
        </v-flex>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-chip pill class="greybg" v-on="on">
            <v-avatar left color="warning" size="24">
              <span class="white--text name-initial"
                >{{ data.invites.Owner }}
              </span>
            </v-avatar>
            <span>{{ data.invites.Owner }}</span>
          </v-chip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >send this invite on
              {{ formatDate(data.invites.createdDate) }}.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-mail pr-1" aria-hidden="true"></i>
            Invites
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventInvitesDetails"
          :content="content"
          class="mt-12"
        />
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import invites from '~/config/apps/event/gql/eventInviteSummary.gql'
import nuxtconfig from '~/nuxt.config'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        invites: {},
        analytics: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
  },
  async mounted() {
    try {
      const filter = {
        filterArray: [
          {
            type: 'match',
            filterQuery: { $and: [{ CRMActivityId: this.$route.params.id }] },
          },
          {
            type: 'group',
            filterQuery: {
              _id: '$CRMActivityId',
              Sent: { $sum: { $cond: [{ $eq: ['$Sent', true] }, 1, 0] } },
              Unsubscribed: {
                $sum: { $cond: [{ $eq: ['$Unsubscribed', true] }, 1, 0] },
              },
              Open: { $sum: { $cond: [{ $gte: ['$Open', 1] }, 1, 0] } },
              Delivered: {
                $sum: { $cond: [{ $eq: ['$Delivered', true] }, 1, 0] },
              },
              SpamReport: {
                $sum: { $cond: [{ $eq: ['$SpamReport', true] }, 1, 0] },
              },
              isRegistered: {
                $sum: { $cond: [{ $eq: ['$isRegistered', true] }, 1, 0] },
              },
              Bounce: { $sum: { $cond: [{ $eq: ['$Bounce', true] }, 1, 0] } },
            },
          },
          {
            type: 'project',
            filterQuery: {
              _id: 0,
              Bounce: 1,
              Sent: 1,
              Delivered: 1,
              Unsubscribed: 1,
              SpamReport: 1,
              Open: 1,
              isRegistered: 1,
            },
          },
        ],
      }
      const res = await this.$axios.$get(
        `https://${
          nuxtconfig.axios.eventUrl
        }/svc/api/EmailAnalytics/aggregate?filter=${JSON.stringify(filter)}`
      )
      if (res) {
        console.log('Check', res)
        this.analytics = res.data[0]
        return res
      }
    } catch (e) {
      console.log('Error', e)
    }
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${invites}
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
        const invites = formatGQLResult(data, 'CRMActivity')
        return {
          invites: invites.length > 0 ? invites[0] : {},
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

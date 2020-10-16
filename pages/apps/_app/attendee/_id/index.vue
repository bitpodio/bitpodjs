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
      <v-flex class="d-flex elevation-1 mb-4 rounded-lg overflow-hidden">
        <v-flex class="flex-70">
          <v-img
            :src="$config.cdnUri + 'default-min.jpg'"
            class="eventsite-banner"
          ></v-img>
        </v-flex>
        <v-flex class="flex-30 justify-center d-flex greybg pa-2">
          <span class="text-h4 text-center text-capitalize"
            >{{ formatField(data.registration.EventName) }}
            {{ data.event && data.event.Title }}
          </span>
        </v-flex>
      </v-flex>
      <v-flex>
        <div
          v-if="content"
          class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
              Sessions
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="registrationSessionsPublic"
            :content="content"
            :filter="filter"
            class="mt-n12"
          />
        </div>
      </v-flex>
      <v-flex d-flex flex-md-row flex-lg-row flex-column>
        <v-flex column class="mxw-w70">
          <div
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
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
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
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
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-2 pb-2 elevation-1 rounded-lg"
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
                Sun, Nov 15th, 2020, 11:40 AM -<br />
                Thu, Nov 19th, 2020, 11:40 AM -<br />
                (GMT+05:30) India Standard Time
              </div>
            </v-flex>
          </div>
          <div
            class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mb-4 mx-2 pb-2 elevation-1 rounded-lg"
          >
            <v-flex class="d-flex justify-center align-center pb-2">
              <h2 class="body-1 pb-0">
                <i class="fa-location pr-1" aria-hidden="true"></i>
                Venue
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
            <v-flex my-3>
              <div class="body-1">
                Mumbai - Pune Expressway
              </div>
            </v-flex>
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
      data: {
        registration: {},
        event: {},
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
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    async getEventData(data) {
      debugger
      if (data.EventId) {
        const URL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${data.EventId}`
        try {
          const res = await this.$axios.$get(URL)
          if (res) {
            console.log('res', res)
            this.data.event = res
            console.log('eventdata', this.data.event)
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
        debugger
        const registrationData = formatGQLResult(data, 'Registration')
        if (registrationData.length) {
          const regdata = registrationData.length > 0 ? registrationData[0] : {}
          this.getEventData(regdata)
          return { registration: regdata }
        }
        // return {
        //   registration: registration.length > 0 ? registration[0] : {},
        // }
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
  top: -250px;
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
</style>

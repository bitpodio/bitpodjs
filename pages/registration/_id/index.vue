<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <v-row>
          <v-col class="col-md-6 col-12">
            <v-card class="elevation-0">
              <v-list>
                <v-list-item class="pl-0">
                  <v-list-item-avatar size="62">
                    <v-avatar
                      color="primary"
                      size="62"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="white--text headline">{{
                        data.registration.FirstName
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <h2>{{ data.registration.FirstName }}</h2>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      data.registration.Status
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="text-truncate">
              <v-icon class="mr-2">mdi-email-outline</v-icon>
              {{ data.registration.Email }}
            </div>
          </v-col>
        </v-row>
        <v-flex>
          <p class="blue--text">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <a class="blue--text"
              >gf, Indira Gandhi International Airport New Delhi Delhi India
              110037</a
            >
          </p>
        </v-flex>
        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-avatar color="warning" size="24" class="d-inline-flex">
            <span class="white--text body-2">{{
              data.registration.FirstName
            }}</span>
          </v-avatar>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1">Registered 1 day ago.</span></v-subheader
          >
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1">Attendees</h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrations" content-name="Registrations" />
      </div>
      <div class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <!-- <Grid :content="content.EventsManagement" view-name="All Events" /> -->
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Event Information</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Name</div>
          <div class="body-1">{{ data.registration.EventName }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Start Date</div>
          <div class="body-1 text--primary"></div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">End Date</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Address</div>
          <div class="body-1"></div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Payment Details</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Card Type</div>
          <div class="body-1"></div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Name on Card</div>
          <div class="body-1"></div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Card Number (Last 4 Digit)</div>
          <div class="body-1"></div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Transaction Id</div>
          <div class="body-1"></div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Survey Questions</h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Privacy</div>
          <div class="body-1">Public</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Currency</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">GL Account Code</div>
          <div class="body-1">asddeee</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Cost Center</div>
          <div class="body-1">-</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Business Type</div>
          <div class="body-1">Single</div>
        </v-flex>
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import Grid from '~/components/common/grid'
import registration from '~/config/apps/event/gql/registration.gql'
import { formatGQLResult } from '~/utility/gql.js'
export default {
  components: {
    Grid,
  },
  data() {
    return {
      loading: 0,
      data: {
        registration: {},
      },
    }
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
        const registration = formatGQLResult(data, 'Registration')
        return {
          registration: registration.length > 0 ? registration[0] : {},
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

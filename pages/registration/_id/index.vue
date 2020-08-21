<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <v-row>
          <v-col class="col-md-6 col-12 pt-0">
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
                      <span class="white--text Twitter">{{
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
          <v-col class="col-md-6 col-12 pt-0">
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-email-outline</v-icon>
              {{ data.registration.Email }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-cellphone-iphone</v-icon>
              {{ data.registration.Phone }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
              {{ data.registration.Country }}
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                color="warning"
                size="24"
                class="d-inline-flex"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span class="white--text name-initial">{{
                  data.registration.FirstName
                }}</span>
              </v-avatar>
            </template>
            <span>{{ data.registration.FirstName }}</span>
          </v-tooltip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1"
              >Registered on
              {{ formatDate(data.registration.createdDate) }}.</span
            ></v-subheader
          >
        </v-flex>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-black-board pr-1" aria-hidden="true"></i> Sessions
        </h2>
        <v-divider></v-divider>
        <Grid view-name="registrationSessions" content-name="Registrations" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>Attendees
        </h2>
        <v-divider></v-divider>
        <Grid view-name="registrationAttendees" content-name="Registrations" />
      </div>
      <div class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-envelope1 pr-1" aria-hidden="true"></i> Emails
        </h2>
        <v-divider></v-divider>
        <Grid view-name="registrationEmails" content-name="Registrations" />
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-info-circle pr-1" aria-hidden="true"></i> Event
          Information
        </h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Name</div>
          <div class="body-1">
            {{ formatField(data.registration.EventName) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Start Date</div>
          <div class="body-1 text--primary">
            {{ formatField(data.registration.BookingDate) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">End Date</div>
          <div class="body-1">
            {{ formatField(data.registration.ExpiryYear) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Address</div>
          <div class="body-1">
            -
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-banknote pr-1" aria-hidden="true"></i> Payment Details
        </h2>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Card Type</div>
          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.brand
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Name on Card</div>
          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.card_holder_name
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Card Number (Last 4 Digit)</div>
          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.last4
              )
            }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Transaction Id</div>
          <div class="body-1">
            {{
              formatField(
                data.registration._CustomerPayment &&
                  data.registration._CustomerPayment.id
              )
            }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-question-circle pr-1" aria-hidden="true"></i> Survey
          Questions
        </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
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

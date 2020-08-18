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
                      <span class="white--text headline Twitter">{{
                        data.discount.FirstName
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <h2>{{ data.discount.FirstName }}</h2>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      data.discount.Job
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{
                      data.discount.Organization
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="col-md-6 col-12 pt-0">
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-email-outline</v-icon>
              {{ data.discount.Email }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-cellphone-iphone</v-icon>
              {{ data.discount.CellPhone }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
              {{ data.discount.Country }}
            </div>
            <div class="text-truncate my-3">
              <v-icon class="mr-2">mdi-calendar-blank</v-icon>
              {{ data.discount.createdDate }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1">Members</h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrations" content-name="Registrations" />
      </div>
      <div class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <!-- <Grid :content="content.EventsManagement" view-name="All Events" /> -->
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1">Information</h2>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Max Usage</div>
            <div class="body-1">
              {{
                data.discount.maxUsageCount ? data.discount.maxUsageCount : '-'
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Valid Till</div>
            <div class="body-1">{{ formatField(data.discount.validTill) }}</div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Created By</div>
            <div class="body-1">{{ data.discount.createdBy }}</div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Created Date</div>
            <div class="body-1">
              {{ formatDate(data.discount.createdDate) }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Description</div>
            <div class="body-1">{{ data.discount.description }}</div>
          </v-col>
        </v-row>
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import discount from '~/config/apps/event/gql/discount.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  components: {
    Grid,
  },
  data() {
    return {
      loading: 0,
      data: {
        discount: {},
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
          ${discount}
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
        const discount = formatGQLResult(data, 'OfferCode')
        return {
          discount: discount.length > 0 ? discount[0] : {},
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

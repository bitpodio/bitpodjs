<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <v-row class="ma-1 discount-top">
          <v-col
            class="col-md-2 col-lg-2 col-4 d-flex flex-column justify-center align-center grey lighten-2"
          >
            <div class="body-2 text--secondary">
              <i class="fa fa-tag pr-1" aria-hidden="true"></i> Save
            </div>
            <h1>
              {{ formatField(data.discount.offerValue) }}
              <span v-if="data.discount.isPercent === true">
                %
              </span>
            </h1>
          </v-col>
          <v-col class="col-md-10 col-lg-10 col-8">
            <div class="col-md-12 pb-0 pt-0">
              <span v-if="data.discount.isActive === true">
                <i
                  class="fa fa-thumbs-up pr-1 success--text"
                  aria-hidden="true"
                ></i>
                <span class="ml-2">Active</span>
              </span>
              <span v-else>
                <i
                  class="fa fa-thumbs-down pr-1"
                  text-color="error"
                  aria-hidden="true"
                ></i>
                <span class="ml-2">Inactive</span>
              </span>
            </div>
            <div class="col-md-12 pt-2 pb-0">
              <h2>{{ formatField(data.discount.eventName) }}</h2>
            </div>
            <div class="col-md-12 pt-2 pb-0">
              <v-chip class="ma-2 ml-0" label color="orange" text-color="white">
                {{ formatField(data.discount.codeTitle) }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>Members
        </h2>
        <v-divider></v-divider>
        <Grid view-name="eventRegistrations" content-name="Registrations" />
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2 pr-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-info-circle pr-1" aria-hidden="true"></i>
          Information
        </h2>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Max Usage</div>
            <div class="body-1">
              {{ formatField(data.discount.maxUsageCount) }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Valid Till</div>
            <div class="body-1">{{ formatDate(data.discount.validTill) }}</div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Created By</div>
            <div class="body-1">{{ formatField(data.discount.createdBy) }}</div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Created Date</div>
            <div class="body-1">
              {{ formatDate(data.discount.createdDate) }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12">
            <div class="body-2 text--secondary">Description</div>
            <div class="body-1">
              {{ formatField(data.discount.description) }}
            </div>
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

<style scoped>
.discount-top {
  border: 1px solid #e6e6e6;
}
</style>

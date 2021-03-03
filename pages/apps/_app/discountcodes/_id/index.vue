<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Drawer.DiscountCode" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row class="ma-1 discount-top">
            <v-col
              class="col-md-2 col-lg-2 col-4 d-flex flex-column justify-center align-center grey lighten-2"
            >
              <div class="body-2 text--secondary">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Drawer.Save" />
              </div>
              <h1>
                {{ formatField(data.discount.offerValue) }}
                <i18n v-if="data.discount.isPercent === true" path="Common.%" />
              </h1>
            </v-col>
            <v-col class="col-md-10 col-lg-10 col-8">
              <div class="col-md-12 pb-0 pt-0 public-page-main">
                <div v-if="data.discount.isActive === true" class="d-flex">
                  <i
                    class="fa fa-thumbs-up pr-1 success--text discount-Active"
                    aria-hidden="true"
                  ></i>
                  <v-skeleton-loader
                    :loading="!discountDataLoaded"
                    :tile="true"
                    class="rounded-lg"
                    type="avatar"
                    height="25"
                    width="100"
                  >
                    <i18n path="Common.Active" class="ml-2" />
                  </v-skeleton-loader>
                </div>
                <div v-else class="d-flex">
                  <i
                    class="fa fa-thumbs-down pr-1 pt-1"
                    text-color="error"
                    aria-hidden="true"
                  ></i>
                  <v-skeleton-loader
                    :loading="!discountDataLoaded"
                    :tile="true"
                    class="rounded-lg"
                    type="avatar"
                    height="25"
                    width="100"
                  >
                    <i18n path="Common.Inactive" class="ml-2" />
                  </v-skeleton-loader>
                </div>
              </div>
              <div class="col-md-12 pt-2 pb-0">
                <h2>{{ formatField(data.discount.eventName) }}</h2>
              </div>
              <div class="col-md-12 pt-2 pb-0">
                <v-chip
                  class="ma-2 ml-0"
                  label
                  color="orange"
                  text-color="white"
                >
                  {{ formatField(data.discount.codeTitle) }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
                <i18n path="Common.Members" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid view-name="discountMembers" :content="content" class="mt-n12" />
        </div>
      </v-flex>
      <v-flex class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pb-0 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.Information" />
                </h2>
              </template>
              <span><i18n path="Common.Information" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.MaxUsage" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.discount.maxUsageCount) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ValidTill" class="body-2 text--secondary" />
              <div v-if="data.discount.validTill !== undefined" class="body-1">
                {{
                  $d(new Date(data.discount.validTill), 'long', $i18n.locale)
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.CreatedBy" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.discount.createdBy) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.CreatedDate" class="body-2 text--secondary" />
              <div
                v-if="data.discount.createdDate !== undefined"
                class="body-1"
              >
                {{
                  $d(new Date(data.discount.createdDate), 'long', $i18n.locale)
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Description" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.discount.description) }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import discount from '~/config/apps/event/gql/discount.gql'
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
      discountDataLoaded: false,
      data: {
        discount: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.DiscountCodes : null
    },
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    goBack() {
      this.$router.back()
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
        this.discountDataLoaded = true
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
.discount-Active {
  padding-top: 2px;
}
@media (max-width: 500px) {
  .pad-card {
    padding: 0 12px 0 12px;
  }
}
@media (min-width: 600px) {
  .pad-card {
    padding: 12px 12px 0 12px;
  }
}
</style>

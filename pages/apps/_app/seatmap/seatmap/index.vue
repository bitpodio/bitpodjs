<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column class="px-3">
    <v-flex column xs12 sm12 md12 lg12>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-0">
          <div
            class="text-h5 text-capitalize d-inline-block text-truncate col-md-10 pa-0 pb-2"
          >
            {{ data.seatmap.Name }}
          </div>
          <v-spacer></v-spacer>
          <div class="mr-2 invite-actions d-none">
            <span>
              <v-btn icon small>
                <v-icon class="fs-18">fa-pencil</v-icon>
              </v-btn>
            </span>
            <v-btn icon small>
              <v-icon class="fs-18">fa-trash</v-icon>
            </v-btn>
          </div>
        </v-flex>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-chip pill class="greybg" v-on="on">
            <v-avatar left color="warning" size="24">
              <span class="white--text name-initial">{{
                data.seatmap.createdBy
              }}</span>
            </v-avatar>
            <span>{{ data.seatmap.createdBy }}</span>
          </v-chip>
          <v-subheader class="d-inline-flex pl-1"
            ><span class="pl-1">created on 16 March 2020.</span></v-subheader
          >
        </v-flex>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mr-0 mb-4 pb-6 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-calendar pr-1" aria-hidden="true"></i>
            Events
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="Events" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview boxviewsmall pa-3 mr-0 mb-4 pb-6 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
            Business Units
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="organizationBusinessUnit"
          :content="content"
          class="mt-n12"
        />
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import seatmap from '~/config/apps/seatmap/gql/seatmapsList.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'seatmap',
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        seatmap: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.seatmaps : null
    },
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
          ${seatmap}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.query.id,
            },
          },
        }
      },
      update(data) {
        const seatmap = formatGQLResult(data, 'SeatMap')
        return {
          seatmap: seatmap.length > 0 ? seatmap[0] : {},
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
.boxview:hover .invite-actions {
  display: block !important;
}
</style>

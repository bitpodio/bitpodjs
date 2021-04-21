<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36">ESign Request</v-text></v-flex
    >
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex column class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row>
            <v-col class="col-md-5 col-12 pt-0">
              <v-card class="elevation-0 mt-n2">
                <v-list class="pt-0">
                  <v-list-item class="pl-0">
                    <v-list-item-avatar size="62">
                      <v-avatar
                        color="primary"
                        size="62"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span class="white--text Twitter">First Name</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <h2 class="text-capitalize text-truncate">
                          First Name
                        </h2>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-chip small text-color="white">
                          Status</v-chip
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col class="col-md-5 col-12 pt-0">
              <div class="text-truncate my-3 mt-0">
                <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
                {{ data.requestData.SenderEmail }}
              </div>
              <div class="text-truncate my-3">
                <v-icon class="mr-2 fs-16">mdi-link</v-icon>
                {{ data.requestData.DocumentTemplate }}
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-flex class="d-flex flex-row align-center flex-wrap pt-2 pt-sm-0">
            <v-chip pill class="greybg" v-on="on">
              <v-avatar left color="warning" size="24">
                <span class="white--text name-initial">{{
                  data.requestData.SenderName
                }}</span>
              </v-avatar>
              <span>{{ data.requestData.SenderName }}</span>
            </v-chip>
            <v-subheader
              v-if="data.requestData.createdDate !== undefined"
              class="d-inline-flex pl-1"
            >
              {{
                $t('Common.RegisteredOn', {
                  date: $d(
                    new Date(data.requestData.createdDate),
                    'long',
                    $i18n.locale
                  ),
                })
              }}
            </v-subheader>
          </v-flex>
        </div>
        <div>
          <div
            v-if="content"
            class="xs12 sm8 md8 lg8 boxview pad-card pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
          >
            <div class="sticky d-flex flex-column justify-center boxview">
              <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
                <h2 class="body-1 pb-0">
                  <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                  Recepients
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
            </div>
            <Grid
              view-name="eSignRequestRecepients"
              :content="content"
              class="mt-n12"
            />
          </div>
        </div>
        <div
          class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
              <i18n path="Common.Notes" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
        </div>
      </v-flex>
      <v-flex column class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 pr-2 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  Request Information
                </h2>
              </template>
              <span>Request Information</span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <v-flex my-3>
            <span class="body-2 text--secondary">Subject</span>

            <div class="body-1">
              {{ data.requestData.Subject }}
            </div>
          </v-flex>
          <v-flex my-3>
            <span class="body-2 text--secondary">Sender Name</span>

            <div class="body-1 text--primary">
              {{ data.requestData.SenderName }}
            </div>
          </v-flex>
          <v-flex my-3>
            <span class="body-2 text--secondary">Reply to</span>

            <div class="body-1">
              {{ data.requestData.ReplyTo }}
            </div>
          </v-flex>
          <v-flex my-3>
            <span class="body-2 text--secondary">Message</span>
            <div class="body-1">{{ data.requestData.EmailText }}</div>
          </v-flex>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ESignRequest from '~/config/apps/eSign/gql/eSignRequest.gql'
import { formatGQLResult } from '~/utility/gql.js'
import Grid from '~/components/common/grid'
import { configLoaderMixin } from '~/utility'

export default {
  layout: 'event',
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        requestData: {},
      },
    }
  },
  computed: {
    content() {
      debugger
      return this.contents ? this.contents.eSignRequest : null
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${ESignRequest}
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
        const request = formatGQLResult(data, 'ESignRequest')
        return {
          requestData: request.length > 0 ? request[0] : {},
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
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
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

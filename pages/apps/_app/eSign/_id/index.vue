<template>
  <div>
    <v-flex class="detailview-head mb-3 pl-8"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36">ESign Request</v-text></v-flex
    >
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex column class="mxw-w70 pl-8">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row>
            <v-col class="col-md-5 col-12 pt-0">
              <v-card class="elevation-0 mt-n2">
                <v-list class="pt-0">
                  <v-list-item class="pl-0">
                    <v-list-item-avatar size="62">
                      <v-avatar color="primary" size="62">
                        <span class="white--text Twitter">{{
                          data.requestData.Subject
                        }}</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <h2 class="text-capitalize text-truncate">
                          {{ data.requestData.Subject }}
                        </h2>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-chip
                          small
                          :class="{
                            warning: data.requestData.Status === 'Pending',
                            info: data.requestData.Status === 'Inprogress',
                            success: data.requestData.Status === 'Completed',
                          }"
                        >
                          {{ data.requestData.Status }}</v-chip
                        ></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
              <div
                v-if="
                  data.requestData.SignedDocument &&
                  data.requestData.SignedDocument.length > 0
                "
                class="py-2 d-inline-flex"
              >
                <v-icon class="fs-16 mr-2 success--text"
                  >mdi-checkbox-marked-circle</v-icon
                >
                <a
                  :href="
                    getSignedDocumentUrl(data.requestData.SignedDocument[0])
                  "
                  class="text-truncate url-link"
                  >{{
                    getSignedDocumentUrl(
                      data.requestData.SignedDocument[0]
                    ).substr(0, 35) + '...'
                  }}</a
                >
                <copy
                  class="pl-2"
                  :text-to-copy="
                    getSignedDocumentUrl(data.requestData.SignedDocument[0])
                  "
                  icon-size="20"
                  tooltip="Copy final pdf link"
                />
              </div>
            </v-col>
            <v-col class="col-md-5 col-12 pt-0">
              <div class="text-truncate my-3 mt-0">
                <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
                {{ data.requestData.SenderEmail }}
              </div>
              <div
                v-if="data.requestData.DocumentTemplate"
                class="d-inline-flex"
              >
                <v-icon class="mr-2 fs-16">mdi-link</v-icon>
                <a :href="data.requestData.DocumentTemplate">{{
                  data.requestData.DocumentTemplate.substr(0, 35) + '...'
                }}</a>
                <copy
                  class="pl-2"
                  :text-to-copy="data.requestData.DocumentTemplate"
                  icon-size="20"
                  tooltip="Copy document template link"
                />
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
                $t('Common.CreatedOn', {
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
                  Recipients
                </h2>
                <v-spacer></v-spacer>
              </v-flex>
              <v-divider></v-divider>
            </div>
            <Grid
              view-name="eSignRequestRecipients"
              :content="content"
              class="mt-12"
            />
          </div>
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex class="d-flex justify-center align-center pb-md-2 pt-1">
              <h2 class="body-1 pb-0">
                <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
                <i18n path="Common.Tasks" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid
            view-name="eSignTasks"
            :content="content"
            :context="data"
            class="mt-n12"
          />
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
          <Notes ref="notes" model-name="ESIGNREQUESTS" />
        </div>
      </v-flex>
      <v-flex column class="mxw-w30 pl-8">
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
import copy from '~/components/common/copy'
import Notes from '~/components/common/notes'
import { configLoaderMixin } from '~/utility'

export default {
  layout: 'eSign',
  components: {
    Grid,
    Notes,
    copy,
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
    getSignedDocumentUrl(id) {
      console.log(id)
      return `${this.$bitpod.getApiUrl()}/Attachments/download/${id}`
    },
  },
}
</script>

<style scoped>
@media (max-width: 500px) {
  .pad-card {
    padding: 0 12px 0 12px;
  }
  .url-link {
    width: 240px !important;
  }
}
@media (min-width: 600px) {
  .pad-card {
    padding: 12px 12px 0 12px;
  }
}
</style>

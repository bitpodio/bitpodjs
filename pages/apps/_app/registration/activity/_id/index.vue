<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Common.Activity" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex column xs12 sm12 md12 lg12>
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-0">
            <div
              class="text-h5 text-capitalize d-inline-block text-truncate col-md-10 pa-0"
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
              <v-col class="col-12 pb-0 pt-0">
                <v-list class="d-inline-block">
                  <v-list-item class="pl-0">
                    <v-list-item-avatar size="36">
                      <v-avatar color="primary" size="36">
                        <span class="white--text Twitter">{{
                          data.invites.Owner
                        }}</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ data.invites.Owner }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-menu
                      offset-y
                      transition="slide-y-transition"
                      bottom
                      :nudge-width="300"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-flex class="d-flex">
                              <i18n
                                path="Common.From"
                                class="col-md-3 text-right pa-0"
                              />
                              <div
                                class="col pa-0 pl-3 d-inline-block text-truncate"
                              >
                                {{ data.invites.Owner }}
                              </div>
                            </v-flex>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-flex class="d-flex">
                              <i18n
                                path="Common.EmailSubject"
                                class="col-md-3 text-right pa-0"
                              />
                              <div
                                class="col pa-0 pl-3 d-inline-block text-truncate"
                              >
                                {{ data.invites.Title }}
                              </div>
                            </v-flex>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-flex class="d-flex">
                              <i18n
                                path="Common.EmailDate"
                                class="col-md-3 text-right pa-0"
                              />
                              <div class="col pa-0 pl-3">
                                {{ formatDate(data.invites.createdDate) }}
                              </div>
                            </v-flex>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-flex class="d-flex">
                              <i18n
                                path="Common.EmailStatus"
                                class="col-md-3 text-right pa-0"
                              />
                              <div class="col pa-0 pl-3">
                                {{ data.invites.Status }}
                              </div>
                            </v-flex>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-flex>

          <v-flex mb-3 d-flex justify-center align-center class="email-body">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="data.invites.Body" />
          </v-flex>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import invites from '~/config/apps/event/gql/eventInviteSummary.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        invites: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
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
<style>
.email-body .in-table div > img {
  width: 40px !important;
  max-width: 40px !important;
  margin-right: 0;
}
</style>

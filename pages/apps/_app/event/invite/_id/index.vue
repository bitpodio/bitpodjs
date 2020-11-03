<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <div class="toast py-2 pr-1 pl-3 fs-16">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-flex column xs12 sm12 md12 lg12>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-0 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-0">
          <div
            class="text-h4 text-capitalize d-inline-block text-truncate col-md-10 pa-0"
          >
            {{ data.invites.Title }}
          </div>
          <v-spacer></v-spacer>
          <div class="mr-2 invite-actions d-none">
            <div class="positionAbsolute editIcon">
              <editDraft
                v-if="data.invites.Status === 'Draft' && dataReady && prevReady"
                :edit-draft="true"
                :draft-data="data.invites"
                :draft-template="draftTemplate"
                :template="
                  templateType === 'My Template' ||
                  templateType === 'Invitation Template'
                    ? 'Invitation Template'
                    : 'General Template'
                "
                :my-template="
                  templateType === 'My Template' ||
                  templateType === 'Invitation Template'
                    ? 'My Template'
                    : 'My General Template'
                "
                :prior-selected-data="priorData"
              />
            </div>
            <v-btn icon small @click="deleteSaved">
              <v-icon class="fs-18">fa-trash</v-icon>
            </v-btn>
          </div>
        </v-flex>

        <v-flex>
          <v-row>
            <v-col class="col-12 pb-0">
              <i18n path="Common.Sender" class="body-2 text--secondary" />

              <div class="body-1">
                {{ formatField(data.invites.SenderName) }}
              </div>
            </v-col>
            <v-col class="col-12 pb-0">
              <i18n path="Common.DueDate" class="body-2 text--secondary" />

              <div v-if="data.invites.DueDate !== undefined" class="body-1">
                {{ $d(new Date(data.invites.DueDate), 'long', $i18n.locale) }}
              </div>
            </v-col>
            <v-col class="col-12 pb-0">
              <i18n path="Common.SentDate" class="body-2 text--secondary" />

              <div v-if="data.invites.createdDate !== undefined" class="body-1">
                {{
                  $d(new Date(data.invites.createdDate), 'long', $i18n.locale)
                }}
              </div>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex d-flex flex-md-row flex-lg-row my-2 class="event-cards mt-4">
          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-paperplane" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.Sent
                  "
                >
                  {{ analytics.Sent }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Sent" class="caption text-truncate" />
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 success d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-check" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.Delivered
                  "
                >
                  {{ analytics.Delivered }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Delivered" class="caption text-truncate" />
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 primary d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-check-square" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.Open
                  "
                >
                  {{ analytics.Open }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Open" class="caption text-truncate" />
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 error d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-x" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.SpamReport
                  "
                >
                  {{ analytics.SpamReport }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Bounce" class="caption text-truncate" />
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 warning d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-minus" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.Unsubscribed
                  "
                >
                  {{ analytics.Unsubscribed }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Unsubscribe" class="caption text-truncate" />
            </div>
          </div>

          <div
            class="align-center d-flex flex-row rounded event-tile mr-2 mb-2"
          >
            <div
              class="pa-2 success d-flex justify-center align-center event-tile-left"
            >
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </div>
            <div class="d-flex flex-column pa-2 event-tile-right greybg">
              <div class="event-tile-value text-truncate">
                <span
                  v-if="
                    data.invites.Status === 'Completed' &&
                    analytics &&
                    analytics.isRegistered
                  "
                >
                  {{ analytics.isRegistered }}
                </span>
                <span v-else><i18n path="Common.0" /></span>
              </div>

              <i18n path="Common.Register" class="caption text-truncate" />
            </div>
          </div>
        </v-flex>

        <v-divider></v-divider>
        <v-flex class="d-flex flex-row align-center">
          <v-chip pill class="greybg" v-on="on">
            <v-avatar left color="warning" size="24">
              <span class="white--text name-initial"
                >{{ data.invites.Owner }}
              </span>
            </v-avatar>
            <span>{{ data.invites.Owner }}</span>
          </v-chip>
          <v-subheader
            v-if="data.invites.createdDate !== undefined"
            class="d-inline-flex pl-1"
            >{{
              $t('Common.SendThisInviteOn', {
                date: $d(
                  new Date(data.invites.createdDate),
                  'long',
                  $i18n.locale
                ),
              })
            }}</v-subheader
          >
        </v-flex>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-0 mb-4 pb-6 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-mail pr-1" aria-hidden="true"></i>
            <i18n path="Common.Invites" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="eventInvitesDetails"
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
import invites from '~/config/apps/event/gql/eventInviteSummary.gql'
import editDraft from '~/config/templates/grids/eventInvites-grid/actions/grid/sendEventInvite.vue'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    Grid,
    editDraft,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      dataReady: false,
      prevReady: false,
      draftTemplate: '',
      templateType: 'My Template',
      priorData: {},
      loading: 0,
      data: {
        invites: {},
      },
      analytics: {},
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
  },
  async mounted() {
    try {
      const filter = {
        filterArray: [
          {
            type: 'match',
            filterQuery: { $and: [{ CRMActivityId: this.$route.params.id }] },
          },
          {
            type: 'group',
            filterQuery: {
              _id: '$CRMActivityId',
              Sent: { $sum: { $cond: [{ $eq: ['$Sent', true] }, 1, 0] } },
              Unsubscribed: {
                $sum: { $cond: [{ $eq: ['$Unsubscribed', true] }, 1, 0] },
              },
              Open: { $sum: { $cond: [{ $gte: ['$Open', 1] }, 1, 0] } },
              Delivered: {
                $sum: { $cond: [{ $eq: ['$Delivered', true] }, 1, 0] },
              },
              SpamReport: {
                $sum: { $cond: [{ $eq: ['$SpamReport', true] }, 1, 0] },
              },
              isRegistered: {
                $sum: { $cond: [{ $eq: ['$isRegistered', true] }, 1, 0] },
              },
              Bounce: { $sum: { $cond: [{ $eq: ['$Bounce', true] }, 1, 0] } },
            },
          },
          {
            type: 'project',
            filterQuery: {
              _id: 0,
              Bounce: 1,
              Sent: 1,
              Delivered: 1,
              Unsubscribed: 1,
              SpamReport: 1,
              Open: 1,
              isRegistered: 1,
            },
          },
        ],
      }
      const res = await this.$axios.$get(
        `${this.$bitpod.getApiUrl()}EmailAnalytics/aggregate?filter=${JSON.stringify(
          filter
        )}`
      )
      if (res) {
        this.analytics = res.data[0] || {}
        return res
      }
    } catch (e) {
      console.log('Error', e)
    }
  },
  methods: {
    async deleteSaved() {
      const url = this.$bitpod.getApiUrl()
      const check = await this.$confirm(this.$t('Messages.Warn.DeleteActivity'))
      let res = null
      if (check === true) {
        try {
          res = await this.$axios.$delete(
            `${url}CRMACTIVITIES/${this.$route.params.id}`
          )
        } catch (e) {
          console.error(
            `Error in invitationHistory-grid while making a DELETE call to CRMACTIVITIES model in method deleteSaved context: url:-${url}`,
            e
          )
        }
        if (res) {
          this.snackbarText = this.$t('Messages.Success.TaskDeleteSuccess')
          this.snackbar = true
          this.$router.back()
        }
      }
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : '-'
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    async getTemplate(id) {
      if (!id) {
        this.dataReady = true
      } else {
        const temp = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}MarketingTemplates/${id}`
        )
        if (temp) {
          this.draftTemplate = temp.Body
          this.dataReady = true
          if (temp.Type) {
            this.templateType = temp.Type
          }
        }
      }
    },
    async getPrior(id) {
      if (!id) {
        this.prevReady = true
      } else {
        const prev = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}CRMACTIVITIES/${id}`
        )
        if (prev) {
          this.priorData = prev
          this.prevReady = true
        }
      }
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
        if (invites && invites.length) {
          this.getTemplate(invites[0].TemplateId)
          this.getPrior(invites[0].ParentId)
        }
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

<style scoped>
.boxview:hover .invite-actions {
  display: block !important;
}
.editIcon {
  right: 60px;
  top: 31px;
}
</style>

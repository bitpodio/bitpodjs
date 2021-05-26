<template>
  <div>
    <v-flex class="greybg">
      <v-col class="d-flex greybg pt-10 flex-row seatmap-inner align-center">
        <v-text class="text-h5"
          ><i18n path="Common.SignOrGetSignatures"
        /></v-text>
        <v-btn
          color="primary"
          max-width="64px"
          text
          depressed
          class="ml-4"
          @click="handleNewTemplate"
          ><v-icon>mdi-plus</v-icon><i18n path="Common.New"
        /></v-btn>
      </v-col>
      <v-col cols="12" class="overflowHidden px-0 seatmap-inner">
        <div
          style="width: 100%;"
          :class="{
            'd-flex flex-nowrap': true,
            'summary-block': $vuetify.breakpoint.smAndDown,
          }"
        >
          <div
            v-for="(data, index) in requestSummaryData"
            :key="index"
            class="white d-inline-block elevation-2 rounded flex-grow-0 flex-shrink-0"
            :class="{ 'mr-5': index < 4 }"
            style="width: 200px; height: 60px;"
          >
            <nuxt-link
              :to="eSignViews(data.view)"
              class="text-decoration-none black--text"
            >
              <v-skeleton-loader
                :loading="false"
                :tile="true"
                type="avatar"
                height="60"
                width="60"
              >
                <div class="d-flex">
                  <div
                    style="width: 60px; height: 60px;"
                    :class="data.class"
                    class="rounded-l"
                  >
                    <v-icon
                      style="font-size: 28px;"
                      class="pl-4 pt-4 white--text"
                      >{{ data.icon }}</v-icon
                    >
                  </div>
                  <div class="pl-2 pt-1">
                    <h3 class="font-weight-regular text-truncate summaryTile">
                      {{ data.value }}
                    </h3>
                    <h5 class="font-weight-regular text-truncate summaryTile">
                      {{ data.caption }}
                    </h5>
                  </div>
                </div>
              </v-skeleton-loader>
            </nuxt-link>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="px-0 seatmap-inner">
        <div class="d-flex">
          <div v-if="$route.params.viewName === 'eSign'" class="fs-18 min-h36">
            <i18n path="Common.Total" />
          </div>
          <div
            v-else-if="$route.params.viewName === 'eSignCompleted'"
            class="fs-18 min-h36"
          >
            <i18n path="Common.Completed" />
          </div>
          <div
            v-else-if="$route.params.viewName === 'eSignInprogress'"
            class="fs-18 min-h36"
          >
            <i18n path="Common.InProgress" />
          </div>
          <div v-else class="fs-18 min-h36">
            <i18n path="Common.Declined" />
          </div>
          <v-menu offset-y transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon class="fs-30">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <div v-for="(item, index) in requestSummaryData" :key="index">
                <v-list-item :to="eSignViews(item.view)">
                  {{ item.caption }}
                </v-list-item>
              </div>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col class="d-flex flex-wrap greybg pa-0 pt-10 seatmap-inner">
        <v-col
          v-for="item in items"
          :key="item.id"
          class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
        >
          <nuxt-link :to="eSignRoutes(item.id)" class="text-decoration-none">
            <v-card class="elevation-0 pa-0">
              <div class="positionRelative">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :class="{
                        'ma-2 positionAbsolute request-status text-darken-4': true,
                        'success--text':
                          item.Status === 'Completed' &&
                          !(
                            new Date(item.ExpirationDate).getTime() &&
                            new Date(item.ExpirationDate).getTime() <
                              new Date().setHours(0, 0, 0, 0)
                          ),
                        'info--text':
                          item.Status === 'Inprogress' &&
                          !(
                            new Date(item.ExpirationDate).getTime() &&
                            new Date(item.ExpirationDate).getTime() <
                              new Date().setHours(0, 0, 0, 0)
                          ),
                        'warning--text':
                          item.Status === 'Pending' &&
                          !(
                            new Date(item.ExpirationDate).getTime() &&
                            new Date(item.ExpirationDate).getTime() <
                              new Date().setHours(0, 0, 0, 0)
                          ),
                        'error--text':
                          item.Status === 'Declined' ||
                          (new Date(item.ExpirationDate).getTime() &&
                            new Date(item.ExpirationDate).getTime() <
                              new Date().setHours(0, 0, 0, 0)),
                      }"
                      depressed
                      small
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{
                        new Date(item.ExpirationDate).getTime() &&
                        new Date().setHours(0, 0, 0, 0) >
                          new Date(item.ExpirationDate).getTime()
                          ? $t('Common.Expired')
                          : item.Status
                      }}
                    </v-btn>
                  </template>
                  <div v-if="item.Recipient && item.Recipient.edges">
                    <div
                      v-for="(recipient, index) in item.Recipient.edges"
                      :key="index"
                      class="h1 recipient-status-info"
                    >
                      {{
                        recipient.node.Status
                          ? `${recipient.node.FullName} [${recipient.node.type}]: ${recipient.node.Status}`
                          : `${recipient.node.FullName} [${recipient.node.type}]: Pending`
                      }}
                    </div>
                  </div>
                </v-tooltip>
                <div class="overflow-h rounded-t">
                  <v-flex
                    class="tile-img tile-pattern rounded-0"
                    :style="{
                      'background-image': getRandomImage(item.Subject),
                    }"
                  ></v-flex>
                </div>
              </div>
              <v-flex class="tile-info pa-4 pb-0">
                <div class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0">
                  {{ $d(new Date(item.createdDate), 'long', $i18n.locale) }}
                </div>
                <v-card-title
                  class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ item.Subject }}
                </v-card-title>
              </v-flex>
              <v-card-actions class="pt-0 pl-4 tiles-action">
                <div class="text-truncate d-block">
                  {{ item.createdBy }}
                </div>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-col>
    </v-flex>
    <div v-if="dialog">
      <ESignForm
        :new-template-dialog.sync="dialog"
        :refresh="refresh"
        template-name="ESign Offer Letter"
        :recipient-list="testRecipientList"
        :template-data="testTemplateData"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ESignForm from './ESignForm.vue'
import requestSummary from '~/config/apps/eSign/gql/eSignRequestSummary.gql'

export default {
  components: {
    ESignForm,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      requestSummaryData: [
        {
          caption: this.$t('Common.Total'),
          value: 0,
          icon: 'mdi-file-document-outline',
          class: 'light-blue darken-1',
          view: 'eSign',
        },
        {
          caption: this.$t('Common.Completed'),
          value: 0,
          icon: 'mdi-file-check-outline',
          class: 'green accent-4',
          view: 'eSignCompleted',
        },
        {
          caption: this.$t('Common.InProgress'),
          value: 0,
          icon: 'mdi-file-move-outline',
          class: 'yellow darken-2',
          view: 'eSignInprogress',
        },
        {
          caption: this.$t('Common.Declined'),
          value: 0,
          icon: 'mdi-file-remove-outline',
          class: 'red lighten-1',
          view: 'eSignDeclined',
        },
      ],
      testRecipientList: [
        { FullName: 'Test', Email: 'test@test.com', type: 'HR' },
        { FullName: 'Sample', Email: 'sample@sample.com', type: 'Candidate' },
      ],
      testTemplateData: {
        today: 'date',
        Employee: {
          FirstName: 'first',
          LastName: 'last',
          _CurrentAddress: { AddressLine: 'address' },
          Designation: 'new',
          Location: 'Pune',
        },
        ctc: '1000',
        joiningDate: '04/02/2000',
        acceptByDate: '09/04/2023',
        HR: { FirstName: 'HR', LastName: 'Last', Designation: 'HR' },
        basic_annual: '2000',
        basic: '200',
        hra_annual: '53798',
        hra: '8998',
        lta_annual: '42342',
        lta: '4232',
        ca_annual: '534543',
        ca: '534',
        mr_annual: '534',
        mr: '53434',
        sa_annual: '543534',
        sa: '534',
        total_annual: '534543',
        total: '435543',
        bonus: '3453',
        performanceBonus: '3534',
        pt_annual: '53453',
        pt: '534534',
        ctc_monthly: '45334',
        workaddress: 'Pune',
        organizationPhone: '432423',
      },
    }
  },
  async created() {
    console.log()
    if (this.items && this.items.length > 0) {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${requestSummary}
          `,
          variables: {
            where: {},
          },
          fetchPolicy: 'no-cache',
        })
        if (result.data && result.data.ESignRequest) {
          console.log(result.data)
          this.requestSummaryData[0].value =
            result.data.ESignRequest.ESignRequestCount
          this.requestSummaryData[1].value =
            result.data.ESignRequest.ESignRequestCompleted
          this.requestSummaryData[2].value =
            result.data.ESignRequest.ESignRequestInprogress
          this.requestSummaryData[3].value =
            result.data.ESignRequest.ESignRequestDeclined
        }
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    handleNewTemplate() {
      this.dialog = true
    },
    eSignRoutes(id) {
      return this.localePath(`/apps/eSign/eSign/${id}`)
    },
    eSignViews(path) {
      return this.localePath(`/apps/eSign/list/eSignRequest/${path}`)
    },
    getRandomImage(name) {
      return window.GeoPattern.generate(name).toDataUrl()
    },
  },
}
</script>

<style scoped>
.seat-maps {
  height: 125px;
  width: 155px;
  max-width: 155px;
}
.seat-card {
  top: 12px;
}
.box-actions {
  bottom: 5px;
  right: 5px;
  display: none;
}
.seat-maps:hover .box-actions {
  display: block;
}
.seatmap-inner {
  max-width: 70%;
  margin: auto;
}
.tile-pattern {
  background-size: cover;
  height: 140px;
}
.tile-img {
  max-height: 140px;
  min-height: 140px;
  transition: transform 0.3s, opacity 0.3s ease-out;
  -moz-transition: transform 0.3s, opacity 0.3s ease-out;
  -webkit-transition: transform 0.3s, opacity 0.3s ease-out;
  -o-transition: transform 0.3s, opacity 0.3s ease-out;
}
.tile-img:focus,
.tile-img:hover {
  transform: scale(1.1);
  opacity: 1;
  overflow: hidden;
}
.eventtiles {
  max-width: 280px;
  min-width: 280px;
}
.tile-info {
  min-height: 92px;
}
.tiles-action {
  min-height: 36px;
}
.summary-block {
  border-bottom: 6px solid transparent;
}
.summary-block:hover {
  border-bottom: none;
  overflow: auto hidden;
}
.request-status {
  right: -15px;
  top: 5px;
  z-index: 4;
}
.min-h36 {
  min-height: 36px;
  line-height: 36px;
}
.overflow-h {
  overflow: hidden;
}
.v-tooltip__content {
  color: black !important;
  font-size: 14px !important;
  padding: 0.5em !important;
  background-color: white !important;
}
@media (max-width: 600px) {
  .seatmap-inner {
    max-width: 100%;
  }
}
</style>

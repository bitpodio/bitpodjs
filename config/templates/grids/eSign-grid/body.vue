<template>
  <div>
    <v-flex class="greybg">
      <div class="esign-action">
        <v-btn text small @click="handleNewTemplate">
          <v-icon left class="fs-16">mdi-plus</v-icon
          ><i18n path="Common.SendDocforeSign" />
        </v-btn>
      </div>
      <v-col cols="12" class="overflowHidden px-0">
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
      <v-col class="d-flex flex-wrap greybg pa-0 pt-10">
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
                        'success--text': checkStatus(
                          item.Status,
                          'Completed',
                          item.ExpirationDate
                        ),
                        'info--text': checkStatus(
                          item.Status,
                          'Inprogress',
                          item.ExpirationDate
                        ),
                        'warning--text': checkStatus(
                          item.Status,
                          'Pending',
                          item.ExpirationDate
                        ),
                        'error--text': checkStatus(
                          item.Status,
                          'Declined',
                          item.ExpirationDate
                        ),
                        'grey--text': checkIfExpired(
                          item.Status,
                          item.ExpirationDate
                        ),
                      }"
                      depressed
                      small
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <i18n
                        v-if="
                          checkStatus(
                            item.Status,
                            'Completed',
                            item.ExpirationDate
                          )
                        "
                        path="Common.Completed"
                      />
                      <i18n
                        v-else-if="
                          checkStatus(
                            item.Status,
                            'Inprogress',
                            item.ExpirationDate
                          )
                        "
                        path="Common.OutForSignature"
                      />
                      <i18n
                        v-else-if="
                          checkStatus(
                            item.Status,
                            'Pending',
                            item.ExpirationDate
                          )
                        "
                        path="Common.Pending"
                      />
                      <i18n
                        v-else-if="
                          checkStatus(
                            item.Status,
                            'Declined',
                            item.ExpirationDate
                          )
                        "
                        path="Common.Declined"
                      />
                      <i18n v-else path="Common.Expired" />
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
                      'background-image': getRandomImage(item.id),
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
      <ESignForm :new-template-dialog.sync="dialog" :refresh="refresh" />
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
          caption: this.$t('Common.All'),
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
          caption: this.$t('Common.OutForSignature'),
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
    }
  },
  async created() {
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
          this.requestSummaryData[0].value =
            result.data.ESignRequest.ESignRequestCount
          this.requestSummaryData[1].value =
            result.data.ESignRequest.ESignRequestCompleted
          this.requestSummaryData[2].value =
            result.data.ESignRequest.ESignRequestInprogress
          this.requestSummaryData[3].value =
            result.data.ESignRequest.ESignRequestDeclined
        }
      } catch (err) {
        console.error(
          'Error in eSign-grid/body.vue in created while making an apollo query to get request summary data',
          err
        )
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
    checkStatus(itemStatus, status, expirationDate) {
      return (
        itemStatus === status &&
        !this.checkIfExpired(itemStatus, expirationDate)
      )
    },
    checkIfExpired(status, expirationDate) {
      if (status === 'Completed' || status === 'Declined') return false
      return (
        new Date(expirationDate).getTime() &&
        new Date(expirationDate).getTime() < new Date().setHours(0, 0, 0, 0)
      )
    },
  },
}
</script>

<style scoped>
.esign-action {
  position: absolute;
  top: -58px;
  display: inline-flex !important;
  right: 170px;
}
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
</style>

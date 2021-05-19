<template>
  <div :class="{ 'positionRelative position': !isCustomMobile }">
    <div v-if="item.CheckIn === null && item.Status !== 'Failed'" class="pt-1">
      <div v-if="isCustomMobile" class="text-center">
        <div class="d-flex justify-end">
          <v-btn icon color="gray" @click="updateDate(item.id)">
            <v-icon class="fs-14">fa-minus-circle</v-icon>
          </v-btn>
        </div>
        <p class="text-caption mb-0"><i18n path="Common.TapToCheckIn" /></p>
      </div>
      <v-chip
        v-else
        class="ma-2 pb-0 mt-1"
        height="20"
        color="blue"
        text-color="white"
        label
        small
        @click="updateDate(item.id)"
      >
        <i18n path="Common.CheckIn" />
      </v-chip>
    </div>
    <div
      v-if="item.CheckIn !== null && item.Status !== 'Failed' && isCustomMobile"
      class="text-center"
    >
      <div class="d-flex justify-center flex-column-reverse">
        <div class="d-flex justify-end">
          <timeAgo
            :date="item.CheckIn"
            :small-font-size="true"
            :is-success="true"
          />
        </div>
        <div class="d-flex justify-end">
          <v-icon color="success"> fa-check </v-icon>
        </div>
      </div>
    </div>
    <div
      v-if="
        item.CheckIn !== null && item.Status !== 'Failed' && !isCustomMobile
      "
      style="display: flex; height: 20px;"
      class="ma-2 pb-0 mt-1"
    >
      <v-icon color="success" class="pr-1 fs-14">mdi-check</v-icon>
      <i18n path="Common.CheckedInJustnow" class="pr-1" />
      <timeAgo :date="item.CheckIn" />
    </div>
    <v-dialog
      v-model="isCheckedIn"
      persistent
      scrollable
      max-width="600px"
      max-height="1100px"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex justify-center font-weight-regular"
        >
          <h4 class="black--text justify-center font-weight-regular pt-10 ml-5">
            <i
              class="fa fa-checkmark-circle tick-check icon-tick pr-2"
              aria-hidden="true"
            ></i
            ><i18n path="Common.SuccessfulCheckedin" />
          </h4>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row style="justify-content: center;">
              <v-col cols="12" sm="10" md="8" class="pb-0 justify-center">
                <v-flex my-3 d-flex justify-center align-center>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div v-html="setTemplates()" />
                </v-flex>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10 ml-0 justify-center"
        >
          <v-btn
            v-if="noBadgeFound"
            color="primary"
            small
            v-bind="attrs"
            v-on="on"
            @click.native="openPrintForm"
          >
            <v-icon left>mdi-printer</v-icon><i18n path="Common.PrintBadges" />
          </v-btn>
          <v-btn text small v-bind="attrs" v-on="on" @click="onClose">
            <i18n path="Drawer.Close" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true"
      ><div class="text-center">{{ snackbarText }}</div></v-snackbar
    >
    <iframe
      v-show="false"
      id="print"
      ref="iframe"
      style="width: 500px; position: relative; height: 500px;"
    >
    </iframe>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import timeAgo from '~/components/common/timeAgo'
import nuxtconfig from '~/nuxt.config'
import badge from '~/config/apps/event/gql/badge.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  components: {
    timeAgo,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
    isCustomMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCheckedIn: false,
      id: '',
      isPrinted: true,
      data: {
        event: {},
      },
      eventBadge: {},
      Template: '',
      logoId: '',
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
      noBadgeFound: true,
    }
  },
  mounted() {
    this.getOrgInfo()
  },
  methods: {
    async updateDate(ele) {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(`${url}Attes/${this.item.id}`, {
          CheckIn: new Date(),
        })
        if (res) {
          this.refresh()
          if (
            this.context.event.printBadgeOnCheckIn === true &&
            this.context.event.BusinessType !== 'Recurring'
          ) {
            this.id = ele
            this.isCheckedIn = true
            this.isPrinted = true
          } else {
            this.isCheckedIn = false
            this.snackbarText = this.$t('Messages.Success.SuccessfulCheckedIn')
            this.snackbar = true
          }
        }
      } catch (e) {
        console.error(
          `Error in templates/grids/eventAttendees-grid/column-checkin.vue while making a PUT call to Attendees model from method updateDate context:-TicketId:-${this.item.id}`
        )
      }
    },
    getDefaultBadge(str) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${this.$auth.user.data.name}`)
          .replace('{{ Category }}', `${this.getBadgeCategory}`)
          .replace('{{ Organization }}', `${this.$store.state.currentOrg.name}`)
          .replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        if (this.data.event && this.data.event.Title) {
          str = str.replace('{{ EventName }}', `${this.data.event.Title}`)
        }
      }
      return str
    },
    openPrintForm() {
      const logoUrl = `src="${
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      }"`
      let str
      if (this.logoId !== '') {
        str = this.setTemplates()
      } else {
        str = this.setTemplates()
        str = str.replace(logoUrl, '')
      }
      this.$refs.iframe.contentWindow.document.write(
        `<div style="display:flex">${str}</div>`
      )
      setTimeout(this.printBadge, 3000)
    },
    printBadge() {
      this.$refs.iframe.contentWindow.print()
      this.$refs.iframe.contentWindow.close()
      this.$refs.iframe.contentWindow.document.close()
    },
    onClose() {
      this.isCheckedIn = false
      this.isPrinted = false
      this.id = ''
    },
    setTemplates() {
      this.getOrgInfo()
      if (this.context.badge && Object.keys(this.context.badge).length > 0) {
        const template = this.context.badge.Template
        const str = this.getBadge(template, this.item)
        return str
      } else {
        const template = '<p>No Badge Found'
        this.noBadgeFound = false
        return template
      }
    },
    getBadge(str, items) {
      const parser = new DOMParser()
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        if (items.regType !== null) {
          const strDom = parser.parseFromString(str, 'text/html')
          strDom
            .getElementsByClassName('badge-category')[0]
            .style.setProperty('--defaultColor', `${items.regType.ColorCode}`)
          str = strDom.documentElement.innerHTML
        }
        str = str
          .replace('{{ FullName }}', `${items.FullName}`)
          .replace(
            '{{ Category }}',
            `${(items.regType && items.regType.Name) || 'Guest'}`
          )
          .replace('{{ Organization }}', `${items.CompanyName || ''}`)
        if (this.logoId !== '') {
          str = str.replace(
            logoUrl,
            this.getAttachmentLink(this.logoId, true) || logoUrl
          )
        }
        if (this.context.event && this.context.event.Title) {
          str = str.replace('{{ EventName }}', `${this.context.event.Title}`)
        }
        return str
      }
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    async getOrgInfo() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${organizationInfo}
          `,
          variables: {
            filters: {
              where: {},
            },
          },
        })
        if (result) {
          const orgInfo = formatGQLResult(result.data, 'OrganizationInfo')
          if (this.context.event.Logo && this.context.event.Logo.length > 0) {
            this.logoId = this.context.event.Logo[0]
          } else if (
            this.context.event.Logo.length === 0 &&
            orgInfo[0].Image.length === 0
          ) {
            this.logoId = ''
          } else {
            this.logoId = orgInfo[0].Image[0]
          }
        }
      } catch (e) {
        console.error(
          'Error while fetching data using gql in print-badges.vue using the organizationInfo gql in method getOrgInfo',
          e
        )
      }
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${badge}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              or: [
                {
                  EventId: {
                    inq: [this.$route.params.id],
                  },
                },
                {
                  EventId: {
                    exists: false,
                  },
                },
              ],
            },
          },
        }
      },
      update(data) {
        const badge = formatGQLResult(data, 'Badge')
        this.eventBadge = badge.length > 0 ? badge : {}
        this.eventBadge.filter((e) => {
          if (e.EventId === this.$route.params.id) {
            this.Template = e.Template
          }
        })
        return {
          badge: badge.length > 0 ? badge : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.error(
          'Error while fetching data using gql in eventAttendees/actions/row-select/print-badges.vue using the badge gql in apollo data query section',
          error
        )
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
.tick-check {
  font-size: 30px;
  color: #0cb14b !important;
  position: relative;
  top: 3px;
}
.position {
  right: 10px;
}
</style>

<template>
  <div class="positionRelative position">
    <div v-if="item.CheckIn === null" class="pt-1">
      <v-chip
        class="ma-2 pb-0 mt-1"
        height="20"
        color="blue"
        text-color="white"
        label
        small
        @click="updateDate(item.id)"
      >
        Check In
      </v-chip>
    </div>
    <div v-else style="display: flex; height: 20px;" class="ma-2 pb-0 mt-1">
      <v-icon color="success fs-14" class="pr-1 fs-14">mdi-check</v-icon>
      <div>Checked in Just now</div>
    </div>
    <v-dialog
      v-model="isCheckedIn"
      persistent
      scrollable
      transition="dialog-bottom-transition"
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
            >You have successfully checked in. Enjoy the event!
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
            depressed
            small
            v-bind="attrs"
            v-on="on"
            @click="openPrintForm"
          >
            <v-icon left>mdi-printer</v-icon>Print Badges
          </v-btn>
          <v-btn text small v-bind="attrs" v-on="on" @click="onClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true"
      ><div class="text-center">{{ snackbarText }}</div></v-snackbar
    >
  </div>
</template>

<script>
import gql from 'graphql-tag'
import nuxtconfig from '~/nuxt.config'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import badge from '~/config/apps/event/gql/badge.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getApiUrl } from '~/utility'

export default {
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
  },
  data() {
    return {
      isCheckedIn: false,
      id: '',
      Template: '',
      logoId: '',
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
      noBadgeFound: true,
      eventId: '',
      eventTitle: '',
      eventType: '',
      printBadgeOnCheckIn: false,
    }
  },
  mounted() {
    this.getEventId()
  },
  methods: {
    setTemplates() {
      if (this.Template !== '') {
        const str = this.getBadge(this.Template, this.item)
        this.noBadgeFound = true
        return str
      } else {
        const template = '<p>No Badge Found'
        this.noBadgeFound = false
        return template
      }
    },
    onClose() {
      this.isCheckedIn = false
      this.id = ''
    },
    async updateDate(ele) {
      const URL = `https://${nuxtconfig.axios.eventUrl}/svc/api/Attes/${this.item.id}`
      try {
        const res = await this.$axios.$patch(URL, {
          CheckIn: new Date(),
        })
        if (res) {
          this.refresh()
          if (
            this.eventType !== 'Recurring' &&
            this.printBadgeOnCheckIn === true
          ) {
            this.id = ele
            this.isCheckedIn = true
          } else {
            this.isCheckedIn = false
            this.snackbarText =
              'Congratulations, You have successfully checked in.'
            this.snackbar = true
          }
        }
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/registrationAttendees-grid/column-checkin.vue on updateDate method context: API: ${URL}\n attendeeId: ${ele}`,
          e
        )
      }
    },
    async getEventId() {
      const url = getApiUrl()
      try {
        const res = await this.$axios.get(
          `${url}Registrations/${this.$route.params.id}/EventList`
        )
        if (res) {
          this.eventId = res.data.id
          this.eventTitle = res.data.Title
          this.eventType = res.data.BusinessType
          this.printBadgeOnCheckIn = res.data.printBadgeOnCheckIn
          this.getEventSelectedBadge()
        }
        return res
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/registrationAttendees-grid/column-checkin.vue on getEventId while making a GET call to registration model context: API: ${url}\n EventId: ${this.$route.params.id}`,
          e
        )
      }
    },
    async getEventSelectedBadge() {
      try {
        const result = await this.$apollo.query({
          query: gql`
            ${badge}
          `,
          variables: {
            filters: {
              where: {
                EventId: `${this.eventId}`,
              },
            },
          },
        })
        if (result) {
          const badgeTemplate = formatGQLResult(result.data, 'Badge')
          this.Template = badgeTemplate[0].Template
          this.getOrgInfo()
        }
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/registrationAttendees-grid/column-checkin.vue while making a GQL call to Badge model in method getEventSelectedBadge context: EventId: ${this.eventId}`,
          e
        )
      }
    },
    openPrintForm() {
      const myWindow = window.open('', '', 'width=900,height=900')
      const str = this.getBadge(this.Template, this.item)
      myWindow.document.write(`${str}`)
      myWindow.document.close()
      myWindow.focus()
      myWindow.print()
      setTimeout(function () {
        myWindow.close()
      }, 1000)
    },
    getBadge(str, items) {
      const logoUrl =
        nuxtconfig.publicRuntimeConfig.cdnUri +
        'admin-default-template-logo.png'
      if (str) {
        str = str
          .replace('{{ FullName }}', `${items.FullName}`)
          .replace(
            '{{ Category }}',
            `${(items.regType && items.regType.Name) || 'Guest'}`
          )
          .replace('{{ Organization }}', `${items.CompanyName || ''} `)
          .replace(logoUrl, this.getAttachmentLink(this.logoId, true))
        if (this.eventTitle) {
          str = str.replace('{{ EventName }}', `${this.eventTitle}`)
        }
      }
      return str
    },
    getAttachmentLink(id, isDownloadLink) {
      const attachmentUrl = `https://${nuxtconfig.axios.eventUrl}${
        nuxtconfig.axios.apiEndpoint
      }Attachments${isDownloadLink ? '/download' : ''}${id ? '/' + id : ''}`
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
          this.logoId = orgInfo[0].Image[0]
        }
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/registrationAttendees-grid/column-checkin.vue while making a GQL call to organizationInfo model from method getOrgInfo`,
          e
        )
      }
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

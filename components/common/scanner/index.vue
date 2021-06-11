<template>
  <div class="greybg">
    <div class="d-flex justify-center d-sm-none">
      <v-dialog
        v-model="dialog"
        width="500"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            plain
            x-large
            class="v-vertical-bitpod-btn m-2 elevation-0"
            :disabled="hasEventEnded"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="fs-30 mb-1">
              mdi-qrcode-scan
            </v-icon>
            <i18n path="Common.Scan" class="fs-14" />
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n path="Common.ScanQR" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="closeForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 small-form"
          >
            <div v-if="loadingFeed" class="qr-code-loader">
              <v-progress-circular
                :size="70"
                :width="5"
                color="priamry"
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else-if="!loadingFeed && !hasCamera" class="qr-code-loader">
              <v-icon color="error">mdi-camera-off</v-icon>
              <p class="error--text">No camera found</p>
            </div>
            <div v-else-if="!loadingFeed && !!feedError" class="qr-code-loader">
              <p class="error--text">{{ feedError }}</p>
            </div>
            <video
              v-show="!loadingFeed && !!!feedError"
              id="qr-scanner-feed"
            ></video>
            <div
              class="d-flex flex-column justify-center align-center add-min-height"
            >
              <p v-if="!!decodeError && isAvailableForScan" class="text-center">
                {{ decodeError }}
              </p>
              <v-progress-circular
                v-if="!isAvailableForScan"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <p v-if="hasEventEnded" class="text-center mb-2">
      <i18n path="Messages.Warn.EventEnded" />
    </p>
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
            <v-icon left>mdi-printer</v-icon><i18n path="Common.PrintBadge" />
          </v-btn>
          <v-btn text small v-bind="attrs" v-on="on" @click="onClose">
            <i18n path="Drawer.Close" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import QrScanner from 'qr-scanner'
import nuxtconfig from '~/nuxt.config'
import badge from '~/config/apps/event/gql/badge.gql'
import organizationInfo from '~/config/apps/event/gql/organizationInfo.gql'
import { formatGQLResult } from '~/utility/gql.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import QrScannerWorkerPath from '!!file-loader!../../../node_modules/qr-scanner/qr-scanner-worker.min.js'

export default {
  props: {
    viewName: {
      type: String,
      required: true,
    },
    hasEventEnded: {
      type: Boolean,
      required: true,
    },
    eventInfo: {
      type: Object,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      qrScanner: null,
      loadingFeed: true,
      feedError: '',
      decodeError: '',
      isAvailableForScan: true,
      hasCamera: true,
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
      dataUseful: {},
      attendeeInfo: {},
    }
  },
  mounted() {
    QrScanner.WORKER_PATH = QrScannerWorkerPath
    QrScanner.hasCamera()
      .then((hasCam) => {
        this.hasCamera = hasCam
        this.loadingFeed = false
        return hasCam
      })
      .catch((err) => {
        this.hasCamera = false
        console.error(err)
      })
  },
  watch: {
    dialog(newVal) {
      this.resetScanner()
      if (newVal) {
        this.$nextTick(() => {
          const videoElem = document.getElementById('qr-scanner-feed')
          if (videoElem && this.hasCamera) {
            this.qrScanner = new QrScanner(
              videoElem,
              (result) => {
                this.decodeError = ''
                if (this.isAvailableForScan) this.checkInAttendee(result)
              },
              (error) => {
                this.decodeError = error
              }
            )
            if (this.qrScanner) {
              this.qrScanner
                .start()
                .then(() => {
                  this.loadingFeed = false
                  return this.loadingFeed
                })
                .catch((err) => {
                  console.error(err)
                })
            }
          }
        })
      }
    },
  },
  methods: {
    closeForm() {
      this.resetScanner()
      this.dialog = false
    },
    async checkInAttendee(scanString) {
      this.isAvailableForScan = false
      const attendeeId = scanString.substring(
        scanString.indexOf('AttendeeId:') + 11,
        scanString.indexOf(',')
      )
      const attendeeName = scanString.substring(
        scanString.indexOf(',AttendeeName:') + 14
      )
      if (attendeeId) {
        const url = this.$bitpod.getApiUrl()
        try {
          const res = await this.$axios.$patch(`${url}Attes/checkInAttnde`, {
            attendeeId,
          })
          const checkInResult = res && res[1] ? res[1] : false
          if (checkInResult && checkInResult.status === 200) {
            this.attendeeInfo = checkInResult.data
            if (
              this.eventInfo.printBadgeOnCheckIn === true &&
              this.eventInfo.BusinessType !== 'Recurring'
            ) {
              this.$eventBus.$emit('eventInvites-grid-refresh', this.viewName)
              this.id = attendeeId
              this.isCheckedIn = true
              this.isPrinted = true
            } else {
              this.$eventBus.$emit(
                'toggle-snackbar',
                this.viewName,
                this.$t('Messages.Success.AttendeeCheckedIn', {
                  attendee: attendeeName,
                }),
                7000,
                true
              )
            }
          } else {
            this.invalidQrCode(checkInResult ? checkInResult.status : 500)
          }
        } catch (err) {
          this.invalidQrCode()
          console.error(err)
        }
      } else {
        this.invalidQrCode()
      }
      setTimeout(() => {
        this.isAvailableForScan = true
      }, 700)
    },
    resetScanner() {
      this.loadingFeed = true
      this.feedError = ''
      this.decodeError = ''
      this.isAvailableForScan = true
      if (this.qrScanner) {
        this.qrScanner.destroy()
        this.qrScanner = null
      }
    },
    invalidQrCode(errorCode = 500) {
      let errorMessage = this.$t('Messages.Error.GenericError')
      switch (errorCode) {
        case 500.1:
          errorMessage = this.$t('Messages.Error.FailedCheckIn')
          break
        case 500.2:
          errorMessage = this.$t('Messages.Error.AlreadyCheckedIn')
          break
        case 404:
          errorMessage = this.$t('Messages.Error.AttendeeNotFound')
          break
        default:
          errorMessage = this.$t('Messages.Error.InvalidQR')
          break
      }
      this.$eventBus.$emit(
        'toggle-snackbar',
        this.viewName,
        errorMessage,
        7000,
        true
      )
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
      if (this.dataUseful && this.dataUseful.length) {
        const template = this.dataUseful[0].Template
        const str = this.getBadge(template, this.attendeeInfo)
        this.noBadgeFound = true
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
        if (items.regType !== null && items.regType) {
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
        if (this.eventInfo && this.eventInfo.Title) {
          str = str.replace('{{ EventName }}', `${this.eventInfo.Title}`)
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
          if (this.eventInfo.Logo && this.eventInfo.Logo.length > 0) {
            this.logoId = this.eventInfo.Logo[0]
          } else if (
            this.eventInfo.Logo.length === 0 &&
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
                    inq: [this.eventId],
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
          if (e.EventId === this.eventId) {
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
    dataUseful: {
      query() {
        return gql`
          ${badge}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              EventId: this.eventId,
            },
          },
        }
      },
      update(data) {
        const badge = formatGQLResult(data, 'Badge')
        console.debug(badge)
        return badge
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
<style>
.v-vertical-bitpod-btn {
  height: 60px;
}
.v-vertical-bitpod-btn > .v-btn__content {
  flex-direction: column !important;
}
.qr-code-loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#qr-scanner-feed {
  min-height: 300px;
  width: 100%;
}
.text-center {
  text-align: center;
}
.add-min-height {
  min-height: 40px;
}
</style>

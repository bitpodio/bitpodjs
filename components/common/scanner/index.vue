<template>
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
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="fs-30">
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
            Scan QR Code
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click.native="closeForm">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 small-form">
          <div v-if="loadingFeed" class="qr-code-loader">
            <v-progress-circular
              :size="70"
              :width="5"
              color="priamry"
              indeterminate
            ></v-progress-circular>
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
</template>
<script>
import QrScanner from 'qr-scanner'
// eslint-disable-next-line import/no-webpack-loader-syntax
import QrScannerWorkerPath from '!!file-loader!../../../node_modules/qr-scanner/qr-scanner-worker.min.js'

export default {
  props: {
    viewName: {
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
    }
  },
  mounted() {
    QrScanner.WORKER_PATH = QrScannerWorkerPath
  },
  watch: {
    dialog(newVal) {
      this.resetScanner()
      if (newVal) {
        this.$nextTick(() => {
          const videoElem = document.getElementById('qr-scanner-feed')
          if (videoElem) {
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
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$put(`${url}Attes/${attendeeId}`, {
          CheckIn: new Date(),
        })
        if (res) {
          this.$eventBus.$emit('eventInvites-grid-refresh', this.viewName)
          this.$eventBus.$emit(
            'toggle-snackbar',
            this.viewName,
            `${attendeeName} checked in`,
            3000
          )
          this.closeForm()
        } else {
          this.$eventBus.$emit(
            'toggle-snackbar',
            this.viewName,
            `Invalid QR Code`,
            3000
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isAvailableForScan = true
      }
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
  },
}
</script>
<style>
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

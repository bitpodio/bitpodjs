<template>
  <div>
    <v-dialog
      v-if="showDialog"
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            {{ titleMessage }}
          </h2>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 d-flex">
          <v-progress-circular
            v-if="showLoader"
            :size="40"
            color="primary"
            class="ma-2 mr-4"
            indeterminate
          ></v-progress-circular>
          <div class="fs-16 mb-4 message">
            {{ statusMessage }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <iframe
      id="print"
      ref="iframe"
      style="width: 0; position: absolute; height: 0;"
      :src="`https://${orgName}-${$config.axios.backendBaseUrl}${$config.basePublicPath}/embed-cookie`"
      @load="iframeLoaded"
    >
    </iframe>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'

export default {
  data() {
    return {
      orgName: '',
      loadIframe: false,
      showDialog: false,
      statusMessage: '',
      titleMessage: '',
      showLoader: false,
      dialog: true,
    }
  },
  created() {
    const domain = this.$route.query.targetDomain
    console.log('domain.. ', domain)
    if (domain) {
      this.orgName = domain
      console.log('orgName.. ', this.orgName)
      this.loadIframe = true
    }
  },
  mounted() {
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    iframeLoaded() {
      console.log(
        'document.cookie that is passed to embed cookie',
        document.cookie
      )
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      console.log('message received from the the iframe', e.data)
      if (e.data === 'success') {
        // const orgId = this.$auth.user.data.orgList[0].id
        // const jobStatusChecker = async () => {
        //   try {
        //     const jobData = await this.$axios.$get(
        //       `${this.$bitpod.getApiUrl()}OrgSetups?filter={"orgId": ${orgId}}`,
        //       {
        //         headers: {
        //           'x-org-id': orgId,
        //         },
        //       }
        //     )
        //     if (!jobData.length) {
        //       //! Currently old orgs don't have a jobstatus.
        //       //! Considers an org to be old one if jobData's length is empty
        //       location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}${nuxtconfig.auth.redirect.home}`
        //     } else if (
        //       jobData.length &&
        //       new Date() - new Date(jobData[0].createdDate) < 90000
        //     ) {
        //       const jobInfo = jobData[0]
        //       if (jobInfo._SetupErrors.length) {
        //         const errorCode =
        //           jobInfo._SetupErrors[jobInfo._SetupErrors.length - 1].Code
        //         this.statusMessage = this.$t(`Messages.Error.SetupExitCode`, {
        //           code: errorCode,
        //         })
        //         this.titleMessage = this.$t('Messages.Error.SetupErrorTitle')
        //         this.showDialog = true
        //       } else if (jobInfo._SetupStatus.length) {
        //         const lastStatus =
        //           jobInfo._SetupStatus[jobInfo._SetupStatus.length - 1]
        //         if (lastStatus.Code === 200) {
        //           this.statusMessage = 'Redirecting to new Organization'
        //           location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}${nuxtconfig.auth.redirect.home}`
        //         } else {
        //           this.statusMessage = this.$t(
        //             'Messages.Information.SetupInProgressText'
        //           )
        //           this.titleMessage = this.$t(
        //             'Messages.Information.SetupInProgressTitle'
        //           )
        //           this.showDialog = true
        //           this.showLoader = true
        //           setTimeout(jobStatusChecker, 1000)
        //         }
        //       } else {
        //         this.statusMessage = this.$t(
        //           'Messages.Information.SetupInProgressText'
        //         )
        //         this.titleMessage = this.$t(
        //           'Messages.Information.SetupInProgressTitle'
        //         )
        //         this.showLoader = true
        //         this.showDialog = true
        //         setTimeout(jobStatusChecker, 1000)
        //       }
        //     } else if (
        //       jobData.length &&
        //       !jobData[0]._SetupErrors.length &&
        //       jobData[0]._SetupStatus[jobData[0]._SetupStatus.length - 1]
        //         .Code === 200
        //     ) {
              location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}${nuxtconfig.auth.redirect.home}`
        //     } else {
        //       this.statusMessage = this.$t(
        //         'Messages.Error.SetupExitCodeTimeout'
        //       )
        //       this.titleMessage = this.$t('Messages.Error.SetupErrorTitle')
        //       this.showDialog = true
        //     }
        //   } catch (err) {
        //     this.statusMessage = this.$t('Messages.Error.SetupExitCodeCatch')
        //     this.titleMessage = this.$t('Messages.Error.SetupErrorTitle')
        //     this.showDialog = true
        //     console.error(
        //       'Error while checking status of setup job on /forwardLogin. Error: ',
        //       err
        //     )
        //   }
        // }
        // setTimeout(jobStatusChecker, 1000)
      }
    },
  },
}
</script>

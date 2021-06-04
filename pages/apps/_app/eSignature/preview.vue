<template>
  <v-container fluid class="pa-0">
    <v-app-bar flat fixed color="#e5e5e5" height="100">
      <v-row>
        <v-col cols="12" class="d-flex justify-space-around py-0">
          <v-toolbar-title class="black--text text-h5"
            >Verify content and emails</v-toolbar-title
          >
        </v-col>
        <v-col cols="12" class="d-flex justify-center py-0 text-body-1 mt-1">
          <template v-for="(recipient, index) in recipients">
            <span :key="index">{{ recipient.Email }}</span>
            <span
              v-if="index < recipients.length - 1"
              :key="index + recipients.length"
              >, &nbsp;</span
            >
          </template>
        </v-col>
      </v-row>
    </v-app-bar>
    <div
      v-if="templateLoading"
      style="height: 80vh;"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        :size="72"
        :width="6"
        color="primary"
      ></v-progress-circular>
    </div>
    <div
      v-else-if="errorMessage !== ''"
      style="height: 80vh;"
      class="text-center d-flex justify-center align-center flex-column"
    >
      <v-icon :size="144" color="red" class="mb-6">mdi-alert-circle</v-icon>
      <span class="text-h5"> {{ errorMessage }}</span>
    </div>
    <div
      v-else
      class="html-preview-container mx-auto px-2"
      v-html="htmlTemplate"
    ></div>
    <v-footer class="esignature-preview-footer" fixed color="#e5e5e5">
      <v-col cols="12" class="d-flex justify-space-around py-0">
        <v-btn
          class="esignature-submit-button my-2 text-capitalize fs-18"
          large
          :disabled="templateLoading || errorMessage !== ''"
          max-width="400px"
          width="90%"
          color="cream"
          @click="createNewRequest"
          >Send</v-btn
        >
      </v-col>
      <v-col cols="12" class="d-flex justify-center py-0">
        <v-btn
          text
          small
          @click="
            hasHistory()
              ? $router.go(-1)
              : $router.push(localePath('/apps/eSignature'))
          "
          >back</v-btn
        >
        <v-btn text small>options</v-btn>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { addDays } from 'date-fns'

export default {
  layout: 'eSignature',
  data() {
    return {
      templateLoading: true,
      htmlTemplate: '',
      recipients: [],
      errorMessage: '',
      templateUrl: '',
    }
  },
  async created() {
    let documentUrl = this.$route.query.url
    const googleDocumentEmbeddedSuffix = '?embedded=true'
    if (
      documentUrl.includes('https://docs.google.com/document/') &&
      !documentUrl.includes(googleDocumentEmbeddedSuffix)
    ) {
      documentUrl += googleDocumentEmbeddedSuffix
    }
    this.templateUrl = documentUrl
    const regExp = new RegExp(/&lt;(Signature|Initials):([\S]*)\/&gt;/, 'gi')
    try {
      const res = await this.$axios.get(documentUrl)
      const matches = []
      const documentText = res.data
      let regexMatch
      while ((regexMatch = regExp.exec(documentText)) !== null) {
        matches.push(regexMatch[2])
      }
      if (matches.length === 0) {
        this.errorMessage = 'No signature tag found'
        return
      }
      const parties = _.uniq(matches)
      for (const email of parties) {
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          this.errorMessage = `Email ${email} is not valid`
          return
        }
      }
      this.recipients = []
      for (const value of parties) {
        const recipientObj = {
          FullName: '',
          Email: value,
          type: this.generateType(8),
        }
        this.recipients.push(recipientObj)
      }
      this.htmlTemplate = documentText
    } catch (err) {
      this.errorMessage = 'Invalid URL'
      console.error(
        `Error in pages/eSignature/preview.vue in getHTMLTemplate while making a GET call to get the HTML code of the URL, context: ${documentUrl}`,
        err
      )
    } finally {
      this.templateLoading = false
    }
  },
  methods: {
    generateType(length) {
      const result = []
      const characters = 'abcdefghijklmnopqrstuvwxyz'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        )
      }
      return result.join('')
    },
    async createNewRequest() {
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNREQUESTS/createQuickESignRequest`
      this.templateLoading = true
      try {
        const postEsignRequestData = {
          selectedList: this.recipients,
          Message: 'Sample Message',
          documentUrl: this.templateUrl,
          subject: 'Agreement',
          senderName: 'Docxy eSignature',
          senderEmail: 'digital@bitpod.io',
          setReplyTo: 'digital@bitpod.io',
          ExpirationDate: addDays(new Date(), 30),
          TemplateData: JSON.stringify({}),
        }
        console.log(postEsignRequestData)
        const response = await this.$axios.$post(
          bitpodURL,
          postEsignRequestData
        )
        if (response) {
          const requestObject = {
            url: this.templateUrl,
            createdOn: new Date(),
          }
          let previousRequests = []
          const parsedPrevRequests = JSON.parse(
            localStorage.getItem('previousRequests')
          )
          if (parsedPrevRequests && parsedPrevRequests.length > 0) {
            previousRequests = parsedPrevRequests
          }
          previousRequests.push(requestObject)
          console.log(previousRequests)
          localStorage.setItem(
            'previousRequests',
            JSON.stringify(previousRequests)
          )
        }
        this.$router.push(
          this.localePath('/apps/eSignature/requestSuccessPage')
        )
      } catch (err) {
        console.error(
          `Error in pages/eSignature.vue in sendNow while making a POST call to a custom API to create a new eSignature request, context: ${bitpodURL}`,
          err
        )
        this.errorMessage = err
      }
    },
    hasHistory() {
      return window.history.length > 1
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Handlee&family=Risque&display=swap');
.html-preview-container {
  max-width: 600px;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: #fff;
}
.esignature-submit-button {
  font-family: 'Handlee', cursive !important;
}
</style>

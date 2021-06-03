<template>
  <v-container class="esignature-container my-12">
    <v-dialog
      v-model="confirmationDialog"
      persistent
      scrollable
      max-width="900px"
    >
      <v-card>
        <v-card-title class="px-xs-2 px-md-10 px-lg-10 px-xl-15">
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            Create Request
          </h2>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="12">
              <span class="body-2"
                >Can you confirm you would like to send this document to
                <template v-for="(recipient, index) in recipients">
                  <span :key="index" class="green--text text--darken-3">{{
                    recipient.Email
                  }}</span>
                  <span
                    v-if="index < recipients.length - 1"
                    :key="recipients.length + index"
                  >
                    and
                  </span>
                </template>
                to get their signatures</span
              >
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text
          class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 overflow-y-auto"
          style="height: 900px;"
        >
          <v-row>
            <v-col cols="12">
              <div class="html-preview-container" v-html="htmlTemplate"></div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <!--
          @todo: Update label to use localization
        -->
          <SaveBtn
            class="sendButtons"
            :reset="toggleLoading"
            label="Yes, Send it"
            :action="createNewRequest"
          ></SaveBtn>
          <v-btn
            color="green darken-3"
            class="white--text"
            depressed
            @click="confirmationDialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center">
          <span class="text-h2 px-2 grey--text text--darken-2 esignature-logo">
            docxy
          </span>
        </v-row>
        <v-row justify="center">
          <span class="text-body-2 px-2 grey--text text--darken-2">
            eSignature for google docs
          </span>
        </v-row>
        <v-row justify="center" class="py-4">
          <span
            class="text-h4 px-2 indigo--text text--accent-3"
            v-text="'<signature:trump@obama.com/>'"
          >
          </span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <div class="body-1 px-2 grey--text text--darken-2">
          Add docxy tag
          <span
            class="esignature-tag-bg"
            v-text="'<Signature:john@gmail.com/>'"
          ></span>
          at all signature spots in your google doc, now use “File - Publish to
          the web” option to get the link. Paste link
          <v-icon>fa-hand-o-down</v-icon> to send for signatures. Bingo!!
        </div>
      </v-col>
      <v-col cols="12">
        <v-form v-model="eSignatureRequestForm">
          <!--
        @todo: Update label to use localization
        -->
          <v-col cols="12">
            <v-text-field
              v-model="templateUrl"
              label="Document URL (Google Doc publish to web link)"
              large
              :rules="[validUrlRule]"
              :error-messages="addressFieldErrorMessage"
              outlined
              :loading="templateUrlLoading"
              dense
              @input="handleUrlChange"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="#feffc8"
              class="white--text text-capitalize py-2"
              large
              :disabled="!eSignatureRequestForm || disableSubmit"
              block
              @click="verifyTemplateUrl"
              >Send for Signatures</v-btn
            >
          </v-col>
        </v-form>
      </v-col>
      <v-col cols="12">
        <div class="body-1 px-2 grey--text text--darken-2">
          Recently Used
        </div>
      </v-col>
      <v-col cols="12">
        <a
          v-for="request in previousRequests"
          :key="request.id"
          :href="request.url"
          class="text-body-2 pl-2 py-1 d-block text-decoration-none"
          >{{ request.url }}</a
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import _ from 'lodash'
import { addDays } from 'date-fns'
import SaveBtn from '~/components/common/saveButton'

export default {
  layout: 'public',
  components: {
    SaveBtn,
  },
  data() {
    return {
      eSignatureRequestForm: false,
      templateUrl: '',
      templateUrlLoading: false,
      confirmationDialog: false,
      recipients: [],
      addressFieldErrorMessage: [],
      htmlTemplate: '',
      cancelTemplateLoading: false,
      disableSubmit: true,
      previousRequests: [],
      toggleLoading: false,
    }
  },
  mounted() {
    try {
      const prevRequests = localStorage.getItem('previousRequests')
      this.previousRequests = JSON.parse(prevRequests)
    } catch (err) {
      console.error(
        'Error in pages/eSignature.vue in mounted while reading from the localstorage',
        err
      )
    }
  },
  methods: {
    verifyTemplateUrl() {
      this.confirmationDialog = true
    },
    formatDocument(documentText) {
      const matches = []
      let regexMatch
      const regExp = /{{{(Signature|Initials):([\S]*)}}}/gi
      while ((regexMatch = regExp.exec(documentText)) !== null) {
        matches.push(regexMatch[2])
      }
      const parties = [...new Set(matches)]
      for (const item of parties) {
        const replaceRegEx = new RegExp(`Signature:${item}`, 'gi')
        const type = this.generateType(8)
        documentText = documentText.replaceAll(
          replaceRegEx,
          `ESign.${type}.Signature`
        )
        const replaceRegExInitials = new RegExp(`Initials:${item}`, 'gi')
        documentText = documentText.replaceAll(
          replaceRegExInitials,
          `ESign.${type}.Initials`
        )
      }
      return documentText
    },
    handleUrlChange(value) {
      console.log(value, this.eSignatureRequestForm)
      this.addressFieldErrorMessage = []
      this.disableSubmit = true
      if (value.length > 0) this.getHTMLTemplate(value)
    },
    /**
     * @todo update error messages to use localization
     */
    getHTMLTemplate: _.debounce(async function (documentUrl) {
      const googleDocumentEmbeddedSuffix = '?embedded=true'
      if (
        documentUrl.includes('https://docs.google.com/document/') &&
        !documentUrl.includes(googleDocumentEmbeddedSuffix)
      )
        documentUrl += googleDocumentEmbeddedSuffix
      if (this.eSignatureRequestForm) {
        const regExp = new RegExp(
          /&lt;(Signature|Initials):([\S]*)\/&gt;/,
          'gi'
        )
        this.templateUrlLoading = true
        try {
          const res = await this.$axios.get(documentUrl)
          const matches = []
          const documentText = res.data
          let regexMatch
          while ((regexMatch = regExp.exec(documentText)) !== null) {
            matches.push(regexMatch[2])
          }
          if (matches.length === 0) {
            this.addressFieldErrorMessage.push('No signature tag found')
            return
          }
          const parties = _.uniq(matches)
          for (const email of parties) {
            if (
              !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
              )
            ) {
              this.addressFieldErrorMessage.push(`Email ${email} is not valid`)
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
          this.htmlTemplate = this.formatDocument(documentText)
          this.disableSubmit = false
        } catch (err) {
          console.error(
            `Error in pages/eSignature.vue in getHTMLTemplate while making a GET call to get the HTML code of the URL, context: ${documentUrl}`,
            err
          )
        } finally {
          this.templateUrlLoading = false
        }
      }
    }, 1000),
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
      try {
        const postEsignRequestData = {
          selectedList: this.recipients,
          Message: 'Sample Message',
          documentUrl: this.templateUrl,
          subject: 'Document',
          senderName: 'Sample Name',
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
          console.log(response)
          const requestObject = {
            url: this.templateUrl,
            createdOn: new Date(),
            requestId: response.id,
          }
          this.previousRequests.push(requestObject)
          localStorage.setItem(
            'previousRequests',
            JSON.stringify(this.previousRequests)
          )
        }
      } catch (err) {
        console.error(
          `Error in pages/eSignature.vue in sendNow while making a POST call to a custom API to create a new eSignature request, context: ${bitpodURL}`,
          err
        )
      } finally {
        this.templateUrl = ''
        this.confirmationDialog = false
        this.toggleLoading = !this.toggleLoading
      }
    },
    /**
     * @todo add localization to variables.
     */
    validUrlRule(v) {
      const valuePrefix = ['https://docs.google.com/document/', 'test']
      if (v === '') return true
      let errorMessage = ''
      if (valuePrefix.every((item) => !v.includes(item)))
        errorMessage = 'Invalid URL'
      return errorMessage || true
    },
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Risque&display=swap');
.esignature-container {
  width: 90%;
  max-width: 600px;
}
.esignature-tag-bg {
  background-color: rgba(169, 169, 170, 0.4);
}
.esignature-logo.text-h2 {
  font-family: 'Risque', cursive !important;
}
</style>

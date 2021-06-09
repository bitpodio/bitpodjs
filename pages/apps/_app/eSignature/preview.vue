<template>
  <v-container fluid class="pa-0">
    <v-dialog v-model="updateRequestDataDialog" persistent max-width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.OptionsCaption" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="updateRequestDataDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form v-model="updateRequestDataForm">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="requestDataSubject"
                  :label="$t('Common.Subject')"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                >
                  <template v-slot:prepend-inner>
                    <i18n
                      class="esignature-requested-subject"
                      path="Common.SignatureRequestedSubject"
                    />
                  </template>
                </v-text-field>
              </v-col>
              <v-col class="col-8">
                <CustomDate
                  v-model="requestDataExpiryDate"
                  :field="expiryDateField"
                  :label="$t('Common.StartD')"
                  :rules="expiryDateFieldRule()"
                  type="date"
                />
              </v-col>
              <v-col class="col-4">
                <v-text-field
                  v-model="requestDataDaysLeft"
                  :rules="[rules.negativeNumberRules, rules.required]"
                  outlined
                  required
                  dense
                  label="Days Left"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions
          class="justify-center px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            class="white--text mb-5"
            color="blue darken-2"
            @click="updateRequestData"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-app-bar flat fixed color="blue darken-2" height="100">
      <v-col class="mt-2">
        <v-col cols="12" class="d-flex justify-space-around py-0">
          <v-toolbar-title class="white--text text-h5"
            ><i18n path="Common.VerifyContentAndEmail"
          /></v-toolbar-title>
        </v-col>
        <v-col
          cols="12"
          class="d-flex white--text flex-wrap justify-center py-0 text-body-1 mt-1 text-wrap"
        >
          <div v-for="(recipient, index) in recipients" :key="index">
            <span v-if="index < recipients.length - 1"
              >{{ recipient.Email }}, &nbsp;</span
            >
            <span v-else>{{ recipient.Email }}</span>
          </div>
        </v-col>
      </v-col>
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
      class="html-preview-container mx-auto"
      style="word-break: break-word;"
      v-html="htmlTemplate"
    ></div>
    <v-footer class="esignature-preview-footer" fixed color="#f5f5f5">
      <v-col cols="12" class="d-flex justify-space-around py-0">
        <v-btn
          :class="{
            'esignature-submit-button white--text my-2 text-capitalize fs-18': true,
            'white--text': !(templateLoading || errorMessage !== ''),
          }"
          large
          :disabled="templateLoading || errorMessage !== ''"
          max-width="400px"
          width="90%"
          color="blue darken-2"
          @click="createNewRequest"
          ><i18n path="Drawer.Send"
        /></v-btn>
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
          ><i18n path="Drawer.Back"
        /></v-btn>
        <v-btn
          text
          small
          @click="
            updateRequestDataDialog = true
            requestDataSubject = requestSubject
            requestDataDaysLeft = requestDaysLeft
          "
          ><i18n path="Common.OptionsCaption"
        /></v-btn>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { addDays, differenceInDays } from 'date-fns'
import CustomDate from '~/components/common/form/date.vue'
import { rules } from '~/utility/rules.js'

const signatureTagRegExp = new RegExp(
  /&lt;(Signature|Initials):([\S]*)\/&gt;/,
  'gi'
)

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regexTitle = /<title>([\S\s]*)<\/title>/

export default {
  layout: 'eSignature',
  components: {
    CustomDate,
  },
  data() {
    return {
      templateLoading: true,
      htmlTemplate: '',
      recipients: [],
      errorMessage: '',
      templateUrl: '',
      rules: rules(this.$i18n),
      requestSubject: 'Agreement',
      requestExpiryDate: addDays(new Date(), 30),
      requestDaysLeft: 30,
      updateRequestDataDialog: false,
      updateRequestDataForm: false,
      requestDataSubject: '',
      requestDataExpiryDate: addDays(new Date(), 30),
      requestDataDaysLeft: 30,
    }
  },
  computed: {
    expiryDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: this.$t('Common.ExpiresOn'),
        type: 'date',
      }
    },
  },
  watch: {
    requestDataDaysLeft(val) {
      if (/^\d*[0-9]\d*$/.test(val)) {
        this.requestDataExpiryDate = addDays(new Date(), val)
          .toISOString()
          .substr(0, 10)
      }
    },
    requestDataExpiryDate(val) {
      const dateToday = new Date().toISOString().substr(0, 10)
      this.requestDataDaysLeft = differenceInDays(
        new Date(val),
        new Date(dateToday)
      )
    },
  },
  created() {
    let documentUrl = this.$route.query.url
    const googleDocumentEmbeddedSuffix = '?embedded=true'
    if (
      documentUrl.includes('https://docs.google.com/document/') &&
      !documentUrl.includes(googleDocumentEmbeddedSuffix)
    ) {
      documentUrl += googleDocumentEmbeddedSuffix
    }
    this.templateUrl = documentUrl
    this.loadRequestTemplate()
    this.loadRequestSubject()
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
          subject: this.requestSubject,
          senderName: 'Docxy eSignature',
          senderEmail: 'digital@bitpod.io',
          setReplyTo: 'digital@bitpod.io',
          ExpirationDate: this.requestExpiryDate,
          TemplateData: JSON.stringify({}),
        }
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
          localStorage.setItem(
            'previousRequests',
            JSON.stringify(previousRequests)
          )
        }
        this.$router.push(
          this.localePath(`/apps/eSignature/success/${response[1].id}`)
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
    updateRequestData() {
      this.requestSubject = this.requestDataSubject
      this.requestExpiryDate = this.requestDataExpiryDate
      this.requestDaysLeft = this.requestDataDaysLeft
      this.updateRequestDataDialog = false
    },
    expiryDateFieldRule() {
      return [
        (v) => {
          const ExpiryDate = v && new Date(v)
          let expiryDateMessage = ''
          if (!ExpiryDate)
            expiryDateMessage = this.$t('Messages.Error.ThisFieldRequired')
          else if (ExpiryDate < new Date())
            expiryDateMessage = this.$t('Messages.Error.RequestStartDate')
          else expiryDateMessage = ''
          return expiryDateMessage || true
        },
      ]
    },
    async loadRequestTemplate() {
      const documentUrl = this.templateUrl
      try {
        const res = await this.$axios.get(documentUrl)
        const matches = []
        const documentText = res.data
        let regexMatch
        while ((regexMatch = signatureTagRegExp.exec(documentText)) !== null) {
          matches.push(regexMatch[2])
        }
        if (matches.length === 0) {
          this.errorMessage = 'No signature tag found'
          return
        }
        const parties = _.uniq(matches)
        for (const email of parties) {
          if (!emailRegExp.test(email)) {
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
    async loadRequestSubject() {
      const googleDocumentEmbeddedSuffix = '?embedded=true'
      let documentUrl = this.templateUrl
      if (documentUrl.includes('https://docs.google.com/document/')) {
        documentUrl = documentUrl.replace(googleDocumentEmbeddedSuffix, '')
        try {
          const result = await this.$axios.get(documentUrl)
          const documentText = result.data
          const subject = regexTitle.exec(documentText)
          this.requestSubject = subject[1] || 'Agreement'
        } catch (err) {
          console.error(
            `Error in pages/eSignature/preview.vue in getHTMLTemplate while making a GET call to get the HTML code of the URL, context: ${documentUrl}`,
            err
          )
        }
      }
    },
  },
}
</script>

<style>
.html-preview-container {
  background-color: #fff;
  max-width: 816px;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: block;
  margin: 2em auto;
  padding: 100px 50px;
}
.esignature-requested-subject {
  margin-top: 4px;
  color: grey;
  min-width: 160px;
}
</style>

<template>
  <v-container class="esignature-container">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-img
            max-width="55"
            max-height="55"
            class="mb-n4"
            :src="$config.cdnUri + 'otter-solid'"
          ></v-img>
          <span class="text-h2 px-2 black--text esignature-logo">
            <i18n path="Common.Docxy" />
          </span>
        </v-row>
        <v-row justify="center">
          <span class="text-body-2 px-2 grey--text text--darken-2 fs-22">
            <i18n path="Common.ESignatureForGoogleDocs" />
          </span>
        </v-row>
        <v-row justify="center" class="mt-6">
          <span
            class="text-h4 black--text px-2 text-center esignature-subheading"
          >
            <i18n path="Common.ReadyToSendDoc" />
          </span>
        </v-row>
        <v-row justify="center">
          <span class="text-body-1 px-2 grey--text text--darken-2 text-center">
            <i18n path="Common.StartByAddingSignatureTag" />
          </span>
        </v-row>
        <v-row justify="center" align="center" class="pt-4 mt-6">
          <span
            :class="{
              'px-2 indigo--text text--accent-3': true,
              'text-h5': $vuetify.breakpoint.smAndDown,
              'text-h4': !$vuetify.breakpoint.smAndDown,
            }"
            v-text="$t('Common.SignatureTagExample')"
          >
          </span>
          <copy class="mb-n1" text-to-copy="<signature:john@xyz.com/>" />
        </v-row>
        <v-row justify="center">
          <span class="text-body-1 px-2 grey--text text--darken-2 text-center">
            <i18n path="Common.SignatureTagLooksLike" />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mt-n1" v-bind="attrs" v-on="on"
                  >mdi-information-outline</v-icon
                >
              </template>
            </v-tooltip>
          </span></v-row
        >
      </v-col>
      <v-col cols="12" class="mt-6">
        <v-form v-model="eSignatureRequestForm">
          <v-col cols="12" class="py-0">
            <span class="text-body-1 grey--text text--darken-2"
              ><i18n path="Common.AfterAddingTagsPublish" />
            </span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mt-n1" v-bind="attrs" v-on="on"
                  >mdi-information-outline</v-icon
                >
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="templateUrl"
              large
              :rules="[validUrlRule]"
              :error-messages="addressFieldErrorMessage"
              outlined
              :loading="templateUrlLoading"
              dense
              @input="handleUrlChange"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-btn
              color="blue darken-2"
              :class="{
                'white--text text-capitalize py-2 esignature-submit-button': true,
                'white--text': !(!eSignatureRequestForm || disableSubmit),
              }"
              large
              :disabled="!eSignatureRequestForm || disableSubmit"
              block
              @click="verifyTemplateUrl"
            >
              <v-img
                max-width="20"
                max-height="20"
                :class="{
                  'mx-2 mt-n1 ': true,
                  'signature-svg-img': !(
                    !eSignatureRequestForm || disableSubmit
                  ),
                  'signature-svg-img-disabled':
                    !eSignatureRequestForm || disableSubmit,
                }"
                :src="$config.cdnUri + 'signature-solid'"
              ></v-img>
              <i18n path="Common.SendForSignatures" />
            </v-btn>
          </v-col>
        </v-form>
      </v-col>
      <v-col v-if="previousRequests && previousRequests.length > 0" cols="12">
        <div class="body-1 px-2 grey--text text--darken-2">
          <i18n path="Common.RecentlyUsed" />
        </div>
      </v-col>
      <template v-for="(request, index) in orderedRequests">
        <v-col :key="index" cols="11">
          <span
            style="word-wrap: break-word; color: #5d5fef; cursor: pointer;"
            class="text-body-2 px-2 py-1 d-block text-decoration-none"
            @click="
              templateUrl = request.url
              handleUrlChange(request.url)
            "
            >{{ request.url }}</span
          >
        </v-col>
        <v-col :key="index + previousRequests.length" cols="1">
          <a :href="request.url" target="_blank" class="text-decoration-none">
            <v-icon>mdi-open-in-new</v-icon>
          </a>
        </v-col>
      </template>
    </v-row>
    <v-footer
      absolute
      class="esignature-container text-center esignature-footer mx-auto pa-0"
    >
      <v-row class="esignature-footer pa-4">
        <a
          href="https://bitpod.io/privacy-policy"
          class="text-decoration-none px-2"
          ><i18n path="Common.PrivacyPolicy"
        /></a>
        <a href="https://bitpod.io/terms" class="text-decoration-none px-2"
          ><i18n path="Common.TermsOfUse"
        /></a>
        <v-spacer></v-spacer>
        <v-icon class="mt-n1">mdi-help-circle-outline</v-icon>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script>
import _ from 'lodash'
import copy from '~/components/common/copy'

const signatureTagRegExp = new RegExp(
  /&lt;(Signature|Initials):([\S]*)\/&gt;/,
  'gi'
)

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  layout: 'eSignature',
  components: {
    copy,
  },
  data() {
    return {
      eSignatureRequestForm: false,
      templateUrl: '',
      templateUrlLoading: false,
      confirmationDialog: false,
      addressFieldErrorMessage: [],
      htmlTemplate: '',
      cancelTemplateLoading: false,
      previousRequests: [],
      disableSubmit: true,
    }
  },
  computed: {
    orderedRequests() {
      return _.orderBy(this.previousRequests, 'createdOn', 'desc')
    },
  },
  mounted() {
    try {
      const prevRequests = localStorage.getItem('previousRequests')
      const parsedPrevRequests = JSON.parse(prevRequests)
      if (parsedPrevRequests && parsedPrevRequests.length > 0) {
        this.previousRequests = parsedPrevRequests
      }
    } catch (err) {
      console.error(
        'Error in pages/eSignature.vue in mounted while reading from the localstorage',
        err
      )
    }
  },
  methods: {
    verifyTemplateUrl() {
      this.$router.push({
        path: this.localePath('/apps/eSignature/preview'),
        query: {
          url: this.templateUrl,
        },
      })
    },
    handleUrlChange(value) {
      this.addressFieldErrorMessage = []
      this.disableSubmit = true
      if (value.length > 0) this.getHTMLTemplate(value)
    },
    getHTMLTemplate: _.debounce(async function (documentUrl) {
      const googleDocumentEmbeddedSuffix = '?embedded=true'
      if (
        documentUrl.includes('https://docs.google.com/document/') &&
        !documentUrl.includes(googleDocumentEmbeddedSuffix)
      ) {
        documentUrl += googleDocumentEmbeddedSuffix
        this.templateUrl = documentUrl
      }
      if (this.eSignatureRequestForm) {
        this.templateUrlLoading = true
        try {
          const res = await this.$axios.get(documentUrl)
          const matches = []
          const documentText = res.data
          let regexMatch
          while (
            (regexMatch = signatureTagRegExp.exec(documentText)) !== null
          ) {
            matches.push(regexMatch[2])
          }
          if (matches.length === 0) {
            this.addressFieldErrorMessage.push('No signature tag found')
            return
          }
          const parties = _.uniq(matches)
          for (const email of parties) {
            if (!emailRegExp.test(email)) {
              this.addressFieldErrorMessage.push(`Email ${email} is not valid`)
              return
            }
          }
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
.signature-svg-img {
  filter: invert(1);
}
.esignature-container {
  width: 90%;
  max-width: 600px;
}
.esignature-tag-bg {
  background-color: rgba(255, 253, 234, 0.4);
}
.esignature-logo.text-h2 {
  font-family: 'Risque', cursive !important;
  font-size: 60px !important;
}
.esignature-subheading.text-h4 {
  font-size: 36px !important;
}
.esignature-submit-button.white--text {
  font-size: 18px;
}
.esignature-footer {
  background-color: #fffffe;
}
.signature-svg-img-disabled {
  filter: invert(0);
  opacity: 0.4;
}
</style>

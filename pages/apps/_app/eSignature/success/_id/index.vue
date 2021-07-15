<template>
  <v-container class="esignature-container">
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <div class="toast py-2 pr-1 pl-3 fs-16">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-row v-if="recipientList.length > 0" justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-img
            max-width="55"
            max-height="55"
            class="mb-n4"
            :src="$config.cdnUri + 'otter-solid'"
          ></v-img>
          <span class="text-h2 px-2 black--text text--darken-2 esignature-logo">
            <i18n path="Common.Docxy" />
          </span>
        </v-row>
        <v-row justify="center">
          <span class="text-body-2 px-2 grey--text text--darken-2">
            <i18n path="Common.ESignatureForGoogleDocs" />
          </span>
        </v-row>
        <v-row justify="center" class="py-4">
          <v-col cols="12">
            <v-row justify="center">
              <v-icon :size="72" color="green" class="mt-6"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <span class="text-h4 px-2 black--text text-center">
                <i18n path="Common.DocumentHasBeenSent" />
              </span>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <span class="text-body-1 px-2 black--text text-center">
                <i18n path="Common.EmailHasBeenSent" />
              </span>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row
              v-for="(recipient, index) in recipientList"
              :key="index"
              justify="center"
              align="center"
            >
              <span class="text-h5 px-2 black--text text-center">
                {{ recipient.Email }}
              </span>
              <copy
                class="mb-n1"
                :text-to-copy="getSignatureLink(recipient.id)"
              />
            </v-row>
          </v-col>
          <v-col cols="12" class="mt-8 pb-0">
            <v-row justify="center" align="center">
              <span class="text-body-1 px-2 black--text text-center">
                <i18n path="Common.DocumentSignedNotify" />
              </span>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-form ref="form" v-model="updateSenderForm">
              <v-row justify="center" align="center">
                <v-text-field
                  v-model="senderEmail"
                  :rules="[rules.required, rules.email]"
                  :loading="updateSenderLoading"
                  dense
                  outlined
                ></v-text-field>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-row justify="center" align="center">
              <v-btn
                color="blue darken-2"
                :class="{
                  'white--text text-capitalize esignature-submit-button': true,
                  'white--text': !(!updateSenderForm || updateSenderLoading),
                }"
                :disabled="!updateSenderForm || updateSenderLoading"
                large
                block
                @click="addSenderEmail"
              >
                <i18n path="Common.RegisterForEmailAlerts" />
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" class="pt-4">
            <v-row justify="center" align="center">
              <nuxt-link
                :to="localePath('/apps/eSignature')"
                class="text-decoration-none"
              >
                <span class="text-h6 px-2 black--text text-center">
                  <i18n path="Common.Home" />
                </span>
              </nuxt-link>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import copy from '~/components/common/copy'
import { rules } from '~/utility/rules.js'

export default {
  layout: 'eSignature',
  components: {
    copy,
  },
  data() {
    return {
      senderEmail: '',
      dataLoading: true,
      errorMessage: '',
      recipientList: [],
      updateSenderForm: false,
      updateSenderLoading: false,
      rules: rules(this.$i18n),
      snackbar: false,
      snackbarText: '',
    }
  },
  async beforeCreate() {
    const bitpodUrl = `${this.$bitpod.getApiUrl()}ESIGNREQUESTS/getESignRequest?id=${
      this.$route.params.id
    }`
    try {
      const result = await this.$axios.get(bitpodUrl)
      if (result) {
        this.recipientList = result.data.Recipient
      }
    } catch (err) {
      console.error(
        'Error in pages/eSignature/success.vue in beforeCreate while calling a custom API getESignRequest to url:',
        bitpodUrl,
        err
      )
    }
  },
  methods: {
    async addSenderEmail() {
      const bitpodUrl = `${this.$bitpod.getApiUrl()}ESIGNREQUESTS/updateESignRequestSender`
      try {
        this.updateSenderLoading = true
        const result = await this.$axios.patch(bitpodUrl, {
          requestId: this.$route.params.id,
          senderEmail: this.senderEmail,
        })
        if (result) {
          this.$refs.form.reset()
          this.snackbarText = 'Successfully updated email'
          this.snackbar = true
        }
      } catch (err) {
        console.error(
          'Error in pages/eSignature/success.vue in addSenderEmail while calling a custom API updateESignRequestSender to url:',
          bitpodUrl,
          err
        )
        this.snackbarText = 'Failed to update email'
        this.snackbar = true
      } finally {
        this.updateSenderLoading = false
      }
    },
    getSignatureLink(recipientId) {
      return `https://bitpod-event.test.bitpod.io/gs/apps/eSign?requestID=${this.$route.params.id}&recipientID=${recipientId}`
    },
  },
}
</script>

<style>
.esignature-container {
  width: 90%;
  max-width: 600px;
}
.esignature-logo.text-h2 {
  font-family: 'Risque', cursive !important;
}
.esignature-submit-button.black--text {
  font-size: 18px;
}
</style>

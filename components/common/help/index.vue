<template>
  <div class="help-section">
    <v-btn icon class="d-none d-sm-inline" @click="helpDialog = !helpDialog">
      <v-icon> mdi-help</v-icon>
    </v-btn>
    <v-list shaped class="d-block d-sm-none py-0 mt-n2">
      <v-list-item @click="mobileHelp">
        <v-list-item-action class="nav-icon">
          <v-icon class="fs-18">mdi-help</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="nav-title">
            <i18n path="Common.Help" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="helpDialog" content-class="help-box">
      <v-card>
        <div class="text-center pa-2 help-top-section positionRelative">
          <div class="robo-img mt-2">
            <v-img :src="$config.cdnUri + 'robo-white.png'"></v-img>
          </div>
          <div class="headline ma-2 white--text">
            <i18n path="Common.HowHelp" />
          </div>
          <span class="positionAbsolute help-close">
            <v-btn icon color="white" @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </span>
          <span v-if="!helpForm" class="positionAbsolute help-back">
            <v-btn icon color="white" @click="helpForm = true">
              <v-icon>fa-arrow-left</v-icon>
            </v-btn>
          </span>
        </div>
        <div v-if="helpForm">
          <a :href="helpDocs" target="_blank">
            <div class="d-flex pt-4 px-2">
              <div class="chanel-icon d-flex ma-4 mr-6">
                <i
                  class="fa fa-flag fs-18 d-flex align-center justify-center"
                  style="background: #0cb14b;"
                ></i>
              </div>
              <div
                class="chanel-right d-flex flex-column justify-center align-start"
              >
                <div class="chanel-right-head">
                  <i18n path="Common.UserGuide" />
                </div>
                <div class="chanel-right-info body-2">
                  <i18n path="Common.UserGuideInfo" />
                </div>
              </div>
              <div class="chanel-more d-flex align-center justify-center">
                <i class="fa fa-chevron-right fs-22"></i>
              </div>
            </div>
          </a>
          <a :href="helpFaqs" target="_blank">
            <div class="d-flex pt-4 px-2">
              <div class="chanel-icon d-flex ma-4 mr-6">
                <i
                  class="fa fa-support fs-18 d-flex align-center justify-center"
                  style="background: #f4b400;"
                ></i>
              </div>
              <div
                class="chanel-right d-flex flex-column justify-center align-start"
              >
                <div class="chanel-right-head">
                  <i18n path="Common.Faqs" />
                </div>
                <div class="chanel-right-info body-2">
                  <i18n path="Common.FaqsInfo" />
                </div>
              </div>
              <div class="chanel-more d-flex align-center justify-center">
                <i class="fa fa-chevron-right fs-22"></i>
              </div>
            </div>
          </a>
          <a :href="helpVideo" target="_blank">
            <div class="d-flex pt-4 px-2">
              <div class="chanel-icon d-flex ma-4 mr-6">
                <i
                  class="fa fa-youtube fs-18 d-flex align-center justify-center"
                  style="background: #f25955;"
                ></i>
              </div>
              <div
                class="chanel-right d-flex flex-column justify-center align-start"
              >
                <div class="chanel-right-head">
                  <i18n path="Common.HelpVideos" />
                </div>
                <div class="chanel-right-info body-2">
                  <i18n path="Common.HelpVideosInfo" />
                </div>
              </div>
              <div class="chanel-more d-flex align-center justify-center">
                <i class="fa fa-chevron-right fs-22"></i>
              </div>
            </div>
          </a>
          <v-card-actions>
            <v-btn
              block
              depressed
              color="primary"
              class="my-3"
              @click="helpForm = false"
            >
              <i18n path="Common.ContactSupport" />
            </v-btn>
          </v-card-actions>
        </div>
        <div v-else>
          <v-col class="col-12 col-md-12 py-0 mt-4">
            <v-text-field
              :value="this.$auth.$state.user.data.name"
              :label="$t('Common.Name')"
              outlined
              disabled
              dense
            ></v-text-field>
          </v-col>
          <v-col class="col-12 col-md-12 py-0">
            <v-text-field
              :value="this.$auth.$state.user.data.email"
              :label="$t('Common.EmailCaption')"
              outlined
              disabled
              dense
            ></v-text-field>
          </v-col>
          <v-col class="col-12 col-md-12 py-0">
            <v-textarea
              v-model="helpMessage"
              :label="$t('Common.Message')"
              outlined
              no-resize
              rows="2"
              row-height="25"
              height="100"
            ></v-textarea>
          </v-col>
          <v-card-actions>
            <v-btn
              block
              depressed
              color="primary"
              class="mb-3 mt-0"
              @click="onSave"
            >
              <i18n path="Common.LeaveMessage" />
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: {
    helpVideo: {
      type: String,
      default: 'https://www.youtube.com/channel/UCPE_a4LrIlP2RL04P92Bl-Q',
    },
  },
  data() {
    return {
      helpDialog: false,
      helpForm: true,
      formData: {
        Name: '',
        Email: '',
        Message: '',
        FullName: '',
      },
      helpMessage: '',
      snackbar: false,
      timeout: '4000',
      snackbarText: '',
      helpDocs: this.localePath(`/adm/docs/HelpCenter/`),
      helpFaqs: this.localePath(
        `/adm/docs/HelpCenter/Introduction/FAQs/views/FAQs`
      ),
    }
  },
  methods: {
    async onSave() {
      this.formData.Name = this.$auth.$state.user.data.name
      this.formData.FullName = this.$auth.$state.user.data.name
      this.formData.Email = this.$auth.$state.user.data.email
      this.formData.Message = this.helpMessage
      try {
        const url = `https://${this.$config.axios.crmUrl}${nuxtconfig.axios.apiEndpoint}`
        const res = await this.$axios.$post(`${url}Leads`, {
          ...this.formData,
        })
        if (res) {
          this.helpDialog = false
          this.helpForm = true
          this.onReset()
          this.snackbarText = this.$t('Messages.Success.ThanksHelp')
          this.snackbar = true
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
    onReset() {
      this.helpMessage = ''
    },
    close() {
      this.helpDialog = false
      this.helpForm = true
      this.helpMessage = ''
    },
    mobileHelp() {
      this.helpDialog = !this.helpDialog
      this.$emit('clicked')
    },
  },
}
</script>

<template>
  <v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="1000">
      <div class="toast py-2 pr-1 pl-3">
        Some Error Occured, Please contact Administrator.
      </div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-col class="px-0">
          <v-btn
            text
            small
            v-bind="attrs"
            v-on="on"
            @click="campaignFormDisplayed"
          >
            <v-icon dark left>{{
              template === 'General Template' ? 'mdi-email-outline' : 'mdi-plus'
            }}</v-icon>
            {{ buttonLabel }}
          </v-btn>
        </v-col>
      </template>
      <template>
        <v-card class="invite-form">
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-4 pb-2 text-h5">
              New Email Confirmation Template
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="resetForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-tabs v-model="curentTab" height="36">
              <!-- <v-tab class="px-0 mr-4">Basic Info</v-tab>
              <v-tab :disabled="invalid" class="px-0 mr-4">Content</v-tab> -->
              <v-tab class="px-0 mr-4">Content</v-tab>
              <v-tab class="px-0 mr-4">Basic Info</v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <v-tabs-items v-model="curentTab">
              <v-tab-item>
                <v-card v-if="choosedTemplate === 0" flat>
                  <p class="mt-4 mb-3">
                    Use a pre designed template or editor to design your
                    content.
                  </p>
                  <div class="pr-3 pt-1 tabContent">
                    <v-row>
                      <v-hover
                        v-for="item in MarketingTemplate"
                        :key="item.id"
                        v-slot:default="{ hover }"
                      >
                        <div style="position: relative;">
                          <v-card
                            :elevation="hover ? 4 : 2"
                            class="ma-3 ml-0 mt-0"
                            :class="{ 'on-hover': hover }"
                            height="250"
                            width="250"
                          >
                            <div v-if="item.ImageURL !== null" class="pa-1">
                              <v-img
                                :src="item.ImageURL"
                                :lazy-src="item.ImageURL"
                                aspect-ratio="1"
                                min-height="240"
                                max-height="240"
                                contain
                              >
                                <template v-slot:placeholder>
                                  <v-img
                                    :src="$config.cdnUri + 'invitee-image.png'"
                                    min-height="200"
                                    max-height="200"
                                  >
                                  </v-img>
                                </template>
                              </v-img>
                            </div>
                            <div v-else class="pa-1">
                              <v-img
                                :src="$config.cdnUri + 'invitee-image.png'"
                                class="grey lighten-2"
                                min-height="200"
                                max-height="200"
                              >
                              </v-img>
                            </div>
                          </v-card>
                          <div
                            v-if="hover"
                            class="align-self-center templateButtons"
                          >
                            <v-btn
                              class="my-2 mx-0"
                              outlined
                              color="primary"
                              @click="
                                choosedTemplate = 3
                                RTEValue = item.Body
                                templateID = item.id
                                templateSubject = Subject
                              "
                              >Select</v-btn
                            >
                            <v-btn
                              class="ma-2"
                              outlined
                              color="primary"
                              @click="
                                setPreviewImage(
                                  item.ImageURL !== null
                                    ? item.ImageURL
                                    : $config.cdnUri + 'invitee-image.png'
                                )
                              "
                              >View</v-btn
                            >
                          </div>
                          <div
                            class="text-truncate text-center text-capitalize"
                          >
                            {{ item.Name }}
                          </div>
                        </div>
                      </v-hover>
                      <v-col
                        class="pl-5 templateTile"
                        cols="4"
                        @click="chooseTemplate(3)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer pa-2"
                        >
                          <v-icon class="py-5" size="48">fa-code1</v-icon>
                          <h3
                            class="text-h5 my-2"
                            style="font-size: 18px !important;"
                          >
                            Rich Text Editor
                          </h3>
                          <div class="Caption mb-4">
                            Use editor to design your content.
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>

                <v-card
                  v-else-if="choosedTemplate == 4"
                  class="pa-10 tabContent"
                  flat
                  align="center"
                >
                  <v-progress-circular
                    :size="70"
                    :width="3"
                    color="grey"
                    indeterminate
                  ></v-progress-circular>
                </v-card>
                <v-card v-else flat class="tabContent">
                  <v-flex class="d-flex">
                    <p class="mt-5 mb-4">
                      Continue with default content or use editor to change
                      content.
                    </p>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ma-2"
                      outlined
                      color="primary"
                      @click="
                        choosedTemplate = 0
                        RTEValue = ''
                      "
                      >X Discard</v-btn
                    >
                  </v-flex>

                  <RichText
                    v-model="RTEValue"
                    class="pl-0"
                    :is-invitee="true"
                    :show-template-dropdown="true"
                    :is-general="template === 'General Template'"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="tabContent">
                  <p class="mt-4 mb-2">
                    Start with entering basic information about your email
                    invite and then press next.
                  </p>
                  <div class="pr-3 pt-1">
                    <v-form ref="form">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="subject"
                            label="Subject *"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v ? true : 'This field is required'
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="senderName"
                            label="Sender Name"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="sender"
                            label="Sender *"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v ? true : 'This field is required'
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="setReplyTo"
                            label="Set reply-to *"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v ? true : 'This field is required'
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-icon class="amber--text">fa-bulb</v-icon>
                          <v-card-text class="d-inline pa-0">
                            You may refer invite members data by using
                            placeholder expressions in subject line. e.g:
                            ${Contact.FirstName} ${Contact.LastName}
                            ${OrganizationInfo.Name}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn v-if="curentTab > 0" depressed @click="curentTab--"
              >Prev</v-btn
            >
            <v-btn
              v-if="curentTab < 1"
              color="primary"
              depressed
              @click="curentTab++"
              >Next</v-btn
            >
            <!-- <v-btn
              v-if="(curentTab = 1)"
              color="primary"
              :disabled="!valid"
              depressed
              @click.native="onSave"
              >Save</v-btn
            > -->
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-if="!!previewURL" v-model="preview" width="600px">
      <v-card>
        <v-card-title class="pa-1">
          <v-spacer></v-spacer>
          <v-btn icon @click="preview = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="previewURL"></v-img>
      </v-card>
    </v-dialog>
    <v-dialog v-model="previousInviteDialog" width="600px">
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">Select Prior Invite</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="previousInviteDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container class="pt-12">
          <Grid
            :value="priorInviteeSelected"
            view-name="inviteeEventTasks"
            :content="CRMcontent()"
            :single-select="true"
            @onSelectedListChange="previousInviteSelect"
          />
        </v-container>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import nuxtConfig from '~/nuxt.config'
import Grid from '~/components/common/grid'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin, getIdFromAtob } from '~/utility'
import marketingTemplates from '~/config/apps/admin/gql/marketingTemplates.gql'
export default {
  components: {
    Grid,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  mixins: [configLoaderMixin],
  props: {
    buttonLabel: {
      type: String,
      default: 'send event invite',
      required: false,
    },
    template: {
      type: String,
      default: 'Invitation Template',
      required: false,
    },
    myTemplate: {
      type: String,
      default: 'My Template',
      required: false,
    },
    context: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
  },
  data() {
    debugger
    return {
      templateItems: [],
      selectedList: [],
      dialog: false,
      curentTab: 0,
      // eslint-disable-next-line no-template-curly-in-string
      subject: 'Thank you for registering for ${Event.Title}',
      senderName: (this.$auth && this.$auth.user.data.name) || '',
      sender: (this.$auth && this.$auth.user.data.email) || '',
      setReplyTo: (this.$auth && this.$auth.user.data.email) || '',
      choosedTemplate: 0,
      preview: false,
      previewURL: '',
      RTEValue: '',
      registrationRadio: '',
      openRadio: '',
      priorInvite: {},
      previousInviteDialog: false,
      templateID: '',
      templateSubject: '',
      snackbar: false,
      acknowledgement: false,
      disableButton: false,
      scheduleInvite: false,
      scheduledTime: '',
      selectAll: false,
      priorInviteeSelected: [],
      validDate: false,
      invalid: true,
    }
  },
  watch: {
    curentTab(newVal, oldVal) {
      if (oldVal === 1) {
        this.$refs.form.validate()
        if (!this.subject || !this.setReplyTo || !this.sender) {
          this.curentTab = 1
        }
      }
    },
  },
  methods: {
    campaignFormDisplayed() {
      if (this.template === 'General Template') {
        this.selectedList = this.$parent.$parent.$data.selectedItems
      }
    },
    content() {
      return this.contents ? this.contents.Contacts : null
    },
    CRMcontent() {
      return this.contents ? this.contents.Event : null
    },
    updateList(data) {
      this.selectedList = data
    },
    textFieldProps() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        dense: true,
        rules: [
          (v) => {
            const scheduledDate = v && new Date(v)
            if (
              scheduledDate &&
              scheduledDate.getTime() < new Date().getTime()
            ) {
              this.validDate = false
              return 'Invalid date'
            } else {
              this.validDate = true
              return true
            }
          },
        ],
      }
    },
    resetForm() {
      this.dialog = false
      this.selectedList = []
      this.choosedTemplate = 0
      this.curentTab = 0
      this.RTEValue = ''
      this.registrationRadio = ''
      this.openRadio = ''
      this.priorInvite = {}
      this.templateID = ''
      this.templateSubject = ''
      this.acknowledgement = false
      this.disableButton = false
      this.priorInviteeSelected = []
    },
    previousInviteSelect(data) {
      if (data && data.length) {
        this.priorInvite = data[0]
      } else {
        this.priorInvite = {}
      }
      this.previousInviteDialog = false
    },
    unselectContact(index) {
      this.selectedList = this.selectedList.filter((i, key) => key !== index)
    },
    setPreviewImage(url) {
      this.previewURL = url
      this.preview = true
    },
    templateExists() {
      return this.templateItems.find((i) => i.Body === this.RTEValue)
    },
    sendNow(type) {
      this.disableButton = true
      const exceptionURL = `https://${nuxtConfig.axios.eventUrl}${nuxtConfig.axios.apiEndpoint}/CRMACTIVITIES`
      const postData = {
        ContactId: this.selectedList.map((i) => i.id),
        DueDate: null,
        EventId: this.$route.params.id,
        IncludeRegister: true,
        Name: '',
        Owner: this.sender,
        ReplyTo: this.setReplyTo,
        SenderName: this.senderName,
        Status: 'Start',
        TemplateId: getIdFromAtob(this.templateID),
        TemplateName: this.templateSubject,
        Title: this.subject,
        Type: 'Mass Email',
      }
      if (this.openRadio) {
        postData.ParentId = this.priorInvite.id
        postData.PreviousEmailCondition = this.openRadio
      }
      if (this.registrationRadio) {
        postData.RegistrationCondition = this.registrationRadio
      }
      if (type === 'Schedule') {
        postData.DueDate = this.scheduledTime.toISOString()
        postData.Status = type
      }
      if (type === 'Draft') {
        postData.Status = type
      }
      if (this.selectAll) {
        postData.ContactId = []
      }
      Promise.all([])
        .then(() => {
          if (!this.templateExists()) {
            return this.$axios({
              method: 'POST',
              url: `https://${nuxtConfig.axios.eventUrl}${nuxtConfig.axios.apiEndpoint}MarketingTemplates`,
              data: {
                Body: this.RTEValue,
                Name: '',
                Subject: this.subject,
                Type: this.myTemplate,
              },
            })
          } else {
            return false
          }
        })
        .then((saved) => {
          if (saved) {
            postData.TemplateId = saved.data.id
          }
          return this.$axios({
            method: 'POST',
            url: exceptionURL,
            data: postData,
          })
        })
        .then((data) => {
          if (data.data.Status === 'Draft') {
            this.resetForm()
          }
          this.acknowledgement = true
          return data
        })
        .catch(() => {
          this.disableButton = false
          this.snackbar = true
        })
    },
    chooseTemplate(index) {
      this.choosedTemplate = index
      switch (index) {
        case 1:
          this.choosedTemplate = 4
          this.$apollo.queries.MarketingTemplate.refresh()
          break
        // case 2:
        //   this.choosedTemplate = 4
        //   this.$apollo.queries.inviteeTemplate.refresh()
        //   break
      }
    },
  },
  apollo: {
    MarketingTemplate: {
      query() {
        return gql`
          ${marketingTemplates}
        `
      },
      variables() {
        const category =
          this.context.event.BusinessType === 'Recurring'
            ? 'Recurring'
            : this.context.event.BusinessType.LocationType === 'Online event'
            ? 'Online'
            : 'General'
        return {
          filters: {
            where: {
              Type: 'Registration Email Template',
              Category: category,
            },
          },
          where: {},
        }
      },
      update(data) {
        if (this.curentTab === 1) {
          this.choosedTemplate = 1
        }
        this.templateItems = formatGQLResult(data, 'MarketingTemplate')
        return formatGQLResult(data, 'MarketingTemplate')
      },
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
<style scoped>
.invite-inner {
  height: calc(100vh - 100px);
}
</style>

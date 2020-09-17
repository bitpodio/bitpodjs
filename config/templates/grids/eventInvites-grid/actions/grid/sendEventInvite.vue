<template>
  <v-row justify="center" class="pt-4">
    <v-snackbar v-model="snackbar" :top="true" :timeout="1000">
      <div class="toast py-2 pr-1 pl-3">
        Some Error Occured, Please contact Administrator.
      </div>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default-big"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon>
          send Event Invite
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Email Invite</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="resetForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container style="height: 100%;">
          <template>
            <v-tabs v-model="curentTab">
              <v-tab>Basic Info</v-tab>
              <v-tab>Content</v-tab>
              <v-tab>Contacts</v-tab>
              <v-tab>Verify</v-tab>
            </v-tabs>
            <v-tabs-items v-model="curentTab">
              <v-tab-item class="pl-2">
                <v-card flat class="tabContent">
                  <v-card-text class="pl-1"
                    >Start with entering basic information about your email
                    invite and then press next.</v-card-text
                  >
                  <div class="pr-3 pt-1">
                    <v-text-field
                      v-model="subject"
                      label="Subject *"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="senderName"
                      label="Sender Name"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="sender"
                      label="Sender *"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="setReplyTo"
                      label="Set reply-to *"
                      outlined
                    ></v-text-field>
                    <v-icon class="amber--text fc-icon"
                      >mdi-lightbulb-on-outline</v-icon
                    >
                    <v-card-text class="d-inline pa-0">
                      You may refer invite members data by using placeholder
                      expressions in subject line. e.g: ${Contact.FirstName}
                      ${Contact.LastName} ${OrganizationInfo.Name}</v-card-text
                    >
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card v-if="choosedTemplate === 0" flat>
                  <v-card-text class="pl-3"
                    >Use a pre designed template or editor to design your
                    content.</v-card-text
                  >
                  <div class="pr-3 pt-1 pl-1 tabContent">
                    <v-row>
                      <v-col
                        class="pl-5 templateTile"
                        cols="4"
                        @click="chooseTemplate(1)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer"
                        >
                          <v-icon class="py-5" size="50"
                            >mdi-star-outline</v-icon
                          >
                          <h3 class="font-weight-regular ma-2">My Templates</h3>
                          <h5 class="font-weight-regular ma-2">
                            A place where you can save templates for future use.
                          </h5>
                        </v-card>
                      </v-col>
                      <v-col
                        cols="4"
                        class="templateTile"
                        @click="chooseTemplate(2)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer"
                        >
                          <v-icon class="py-5" size="50">mdi-newspaper</v-icon>
                          <h3 class="font-weight-regular ma-2">
                            Pre-designed Templates
                          </h3>
                          <h5 class="font-weight-regular ma-2">
                            Ready-to-use templates to send emails quickly.
                          </h5>
                        </v-card>
                      </v-col>
                      <v-col
                        cols="4"
                        class="templateTile"
                        @click="chooseTemplate(3)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer"
                        >
                          <v-icon class="py-5" size="50">mdi-xml</v-icon>
                          <h3 class="font-weight-regular ma-2">
                            Rich Text Editor
                          </h3>
                          <h5 class="font-weight-regular ma-2">
                            Use editor to design your content.
                          </h5>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
                <v-card
                  v-else-if="choosedTemplate === 1 || choosedTemplate === 2"
                  flat
                  class="tabContent"
                >
                  <v-card-text class="pl-3"
                    >Select a template to continue.
                    <span
                      class="blue--text cursorPointer"
                      @click="choosedTemplate = 0"
                    >
                      Back
                    </span></v-card-text
                  >
                  <v-flex
                    class="d-flex flex-wrap pl-3 justify-center justify-md-start"
                  >
                    <v-hover
                      v-for="item in templateItems"
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
                              class="grey lighten-2"
                              min-height="200"
                              max-height="200"
                              contain
                            >
                              <template v-slot:placeholder>
                                <v-img
                                  :src="$config.cdnUri + 'invitee-image.png'"
                                  class="grey lighten-2"
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
                          <v-card-actions>
                            <div class="text-truncate text-capitalize">
                              {{ item.Name }}
                            </div>
                          </v-card-actions>
                        </v-card>
                        <v-row
                          v-if="hover"
                          class="fill-height flex-column"
                          justify="space-between"
                        >
                          <div class="align-self-center templateButtons">
                            <v-btn
                              class="ma-2"
                              outlined
                              color="indigo"
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
                              color="indigo"
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
                        </v-row>
                      </div>
                    </v-hover>
                  </v-flex>
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
                  <v-btn
                    class="ma-2 float-right"
                    outlined
                    color="blue"
                    @click="
                      choosedTemplate = 0
                      RTEValue = ''
                    "
                    >X Discard</v-btn
                  >
                  <v-card-text class="pl-3"
                    >Continue with default content or use editor to change
                    content.</v-card-text
                  >
                  <RichText
                    v-model="RTEValue"
                    class="pl-3"
                    :is-invitee="true"
                    :show-template-dropdown="true"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-card flat>
                  <v-card-text
                    >From contact list below, select contacts who should receive
                    your invite and add them to invitees list.</v-card-text
                  >
                </v-card>
                <v-row class="px-6">
                  <v-col cols="6" class="contactsGrid">
                    <div class="borderBottomGrey pb-1">
                      <v-checkbox
                        v-model="selectAll"
                        class="ma-0 pa-0 float-right"
                        label="Select All"
                      >
                      </v-checkbox>
                      <v-icon>mdi-contacts</v-icon>
                      <h4 class="d-inline font-weight-regular">Contacts</h4>
                    </div>
                    <div class="borderRightGrey pr-3 mr-n3">
                      <Grid
                        :value="selectedList"
                        view-name="InviteContacts"
                        :content="content()"
                        @onSelectedListChange="updateList"
                      />
                    </div>
                  </v-col>
                  <v-col cols="6" class="contactsGrid">
                    <div class="borderBottomGrey pb-1">
                      <v-icon>mdi-email-outline</v-icon>
                      <h4 class="d-inline font-weight-regular">
                        Invitees List
                      </h4>
                    </div>
                    <div>
                      <div
                        v-for="(item, key) in selectedList"
                        :key="item.Email"
                        class="borderBottomGrey py-2 pl-2"
                      >
                        <v-btn
                          class="float-right fc-icon"
                          text
                          small
                          @click="unselectContact(key)"
                        >
                          <v-icon dark left>mdi-delete</v-icon>
                        </v-btn>
                        {{ item.FullName }} ({{ item.Email }})
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="borderBottomGrey pb-3 mb-3">
                      <v-icon>mdi-filter-outline</v-icon>
                      <h4 class="d-inline font-weight-regular">
                        Advance Filters
                      </h4>
                      <v-btn
                        class="ml-10"
                        text
                        small
                        @click="
                          registrationRadio = ''
                          openRadio = ''
                          priorInvite = {}
                          priorInviteeSelected = []
                        "
                      >
                        <v-icon dark left>mdi-replay</v-icon>
                        Reset
                      </v-btn>
                    </div>
                    <h4>Check prior registrations</h4>
                    <h4 class="font-weight-regular">Send to those who have</h4>
                    <v-radio-group
                      v-model="registrationRadio"
                      :mandatory="false"
                      class="mt-0"
                    >
                      <v-radio
                        label="Not Registered"
                        value="NotRegister"
                      ></v-radio>
                      <v-radio label="Registered" value="Register"></v-radio>
                    </v-radio-group>
                    <h4 class="d-inline">Check prior invite (</h4>
                    <h4
                      class="blue--text d-inline cursorPointer"
                      @click="previousInviteDialog = true"
                    >
                      {{ !!priorInvite.id ? priorInvite.Title : 'Click here' }}
                    </h4>
                    <h4 class="d-inline">
                      {{
                        !!priorInvite.id
                          ? ' - ' +
                            new Date(priorInvite.createdDate).toDateString()
                          : 'to select one of the prior invite'
                      }}
                      )
                    </h4>
                    <h4 class="font-weight-regular">Send to those who have</h4>
                    <v-radio-group
                      v-model="openRadio"
                      :mandatory="false"
                      class="mt-0"
                      :disabled="!priorInvite.id"
                    >
                      <v-radio label="Not Opened" value="NotRead"></v-radio>
                      <v-radio label="Opened" value="Read"></v-radio>
                      <v-radio
                        label="Opened & Clicked"
                        value="clicked"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-row v-if="acknowledgement" class="ma-1">
                  <v-col cols="12">
                    <v-card align="center" justify="center" class="pb-3">
                      <h3 class="font-weight-regular ma-2 pt-5">
                        Thank you for submitting your email invite.
                      </h3>
                      <h5 class="font-weight-regular ma-2 py-3">
                        If approval is turned on it will be sent for approval to
                        administrator and you will be notified status through
                        email.
                      </h5>
                      <v-btn
                        class="blue accent-4 white--text"
                        @click="resetForm"
                        >close</v-btn
                      >
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else-if="scheduleInvite" class="ma-3">
                  <v-col cols="5" style="max-width: 300px;">
                    <v-card align="center" justify="center" class="pb-10">
                      <v-icon class="py-5" size="50">mdi-calendar</v-icon>
                      <h3 class="font-weight-regular ma-2">
                        Fixed Time and Time Zone
                      </h3>
                      <h5 class="font-weight-regular ma-2 pb-2">
                        We'll launch your invite on the date and time you
                        specify.
                      </h5>
                      <div style="width: 200px;">
                        <v-datetime-picker
                          v-model="scheduledTime"
                          label="Schedule Date *"
                          :text-field-props="textFieldProps()"
                        >
                          <template slot="dateIcon">
                            <v-icon>fas fa-calendar</v-icon>
                          </template>
                          <template slot="timeIcon">
                            <v-icon>fas fa-clock</v-icon>
                          </template>
                        </v-datetime-picker>
                      </div>
                      <v-btn
                        class="blue accent-4 white--text"
                        :disabled="
                          disableButton || !scheduledTime || !validDate
                        "
                        @click="sendNow('Schedule')"
                        >Schedule</v-btn
                      >
                      <v-btn
                        class="blue accent-4 white--text"
                        :disabled="disableButton"
                        @click="scheduleInvite = false"
                        >Cancel</v-btn
                      >
                    </v-card>
                  </v-col>
                </v-row>
                <v-row
                  v-else-if="!selectedList.length && !selectAll"
                  class="ma-3"
                >
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="font-weight-regular">CONTACT DETAILS</h4>
                    <v-btn
                      class="float-right"
                      color="blue"
                      outlined
                      @click="curentTab = 2"
                      >Select Contact</v-btn
                    >
                    <h5 class="font-weight-regular">
                      You have not added any contact yet.
                    </h5>
                  </v-col>
                </v-row>
                <v-row v-else-if="!RTEValue" class="ma-3">
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="font-weight-regular">CONTENT DETAILS</h4>
                    <v-btn
                      class="float-right"
                      color="blue"
                      outlined
                      @click="curentTab = 1"
                      >Select Content</v-btn
                    >
                    <h5 class="font-weight-regular">
                      You have not added any content yet.
                    </h5>
                  </v-col>
                </v-row>
                <v-row v-else class="ma-1">
                  <v-col class="pl-5 templateTile" cols="4">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-5" size="50">mdi-email-outline</v-icon>
                      <h3 class="font-weight-regular ma-2">Send Now</h3>
                      <h5 class="font-weight-regular ma-2">
                        Send email invite right away.
                      </h5>
                      <v-btn
                        class="blue accent-4 white--text"
                        :disabled="disableButton"
                        @click="sendNow"
                        >Send</v-btn
                      >
                    </v-card>
                  </v-col>
                  <v-col cols="4" class="templateTile">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-5" size="50">mdi-calendar</v-icon>
                      <h3 class="font-weight-regular ma-2">
                        Schedule Invite
                      </h3>
                      <h5 class="font-weight-regular ma-2">
                        Schedule your invite the way you prefer.
                      </h5>
                      <v-btn
                        class="blue accent-4 white--text"
                        :disabled="disableButton"
                        @click="scheduleInvite = true"
                        >Schedule</v-btn
                      >
                    </v-card>
                  </v-col>
                  <v-col cols="4" class="templateTile">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-5" size="50">mdi-floppy</v-icon>
                      <h3 class="font-weight-regular ma-2">
                        Save as Draft
                      </h3>
                      <h5 class="font-weight-regular ma-2">
                        Save your email as draft.
                      </h5>
                      <v-btn
                        class="blue accent-4 white--text"
                        :disabled="disableButton"
                        @click="sendNow('Draft')"
                        >Save as Draft</v-btn
                      >
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="ma-1">
                  <v-col cols="12">
                    <div class="borderBottomGrey pb-3">
                      <v-icon>mdi-information-outline</v-icon>
                      <h4 class="d-inline font-weight-regular">
                        Subject and Sender
                      </h4>
                      <v-btn class="ml-10" text small @click="curentTab = 0">
                        <v-icon dark left>mdi-pencil</v-icon>
                        Edit
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>Name</div>
                    <div class="blue--text pt-1 pb-2">{{ senderName }}</div>
                    <div>Subject</div>
                    <div class="blue--text pt-1">{{ subject }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div>Sender Address</div>
                    <div class="blue--text pt-1 pb-2">{{ sender }}</div>
                    <div>Reply-to Address</div>
                    <div class="blue--text pt-1">{{ setReplyTo }}</div>
                  </v-col>
                  <v-col cols="12">
                    <div class="borderBottomGrey pb-3">
                      <h4 class="d-inline font-weight-regular">
                        Contact Details
                      </h4>
                    </div>
                    <div
                      v-for="(item, key) in selectedList"
                      :key="item.Email"
                      class="borderBottomGrey py-2 pl-2"
                    >
                      <v-btn
                        v-if="!acknowledgement"
                        class="float-right fc-icon"
                        text
                        small
                        @click="unselectContact(key)"
                      >
                        <v-icon dark left>mdi-delete</v-icon>
                      </v-btn>
                      {{ item.FullName }} ({{ item.Email }})
                    </div>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </template>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn v-if="curentTab > 0" depressed @click="curentTab--"
            >Prev</v-btn
          >
          <v-btn
            v-if="curentTab < 3"
            color="primary"
            depressed
            @click="curentTab++"
            >Next</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="!!previewURL" v-model="preview" width="600px">
      <v-card>
        <v-card-title>
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
  </v-row>
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
  data() {
    return {
      templateItems: [],
      selectedList: [],
      dialog: false,
      curentTab: 0,
      subject: ``,
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
    }
  },
  methods: {
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
                Type: 'My Template',
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
        case 2:
          this.choosedTemplate = 4
          this.$apollo.queries.inviteeTemplate.refresh()
          break
      }
    },
  },
  apollo: {
    eventInfo: {
      query() {
        return gql`
          query {
            Event {
              EventFind(
                filter: { 
                  where: {
                    id: "${this.$route.params.id}" 
                  }
                }
              ){ edges { node { id Title } } }
            }
          }
        `
      },
      variables() {
        return {
          filters: {},
          where: {},
        }
      },
      update(data) {
        this.subject = `Join us for ${
          data.Event.EventFind.edges[0].node.Title
        } | ${new Date().toDateString()}`
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
    MarketingTemplate: {
      query() {
        return gql`
          ${marketingTemplates}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              Type: 'My Template',
              createdBy: this.$auth.user.data.email,
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
    inviteeTemplate: {
      query() {
        return gql`
          ${marketingTemplates}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              Type: 'Invitation Template',
            },
          },
          where: {},
        }
      },
      update(data) {
        if (this.curentTab === 1) {
          this.choosedTemplate = 2
        }
        this.templateItems = formatGQLResult(data, 'MarketingTemplate')
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

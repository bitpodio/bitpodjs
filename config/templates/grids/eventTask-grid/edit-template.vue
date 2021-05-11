<template>
  <v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="1000">
      <i18n path="Common.SomeErrorOccured" class="toast py-2 pr-1 pl-3" />
    </v-snackbar>
    <v-dialog v-model="dialog" persistent scrollable content-class="slide-form">
      <template v-slot:activator="{ on, attrs }">
        <v-col class="px-0">
          <v-btn
            text
            small
            v-bind="attrs"
            v-on="on"
            @click="campaignFormDisplayed"
          >
            <v-icon dark left>{{ buttonIcon }}</v-icon>
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
              <i18n path="Common.NewEmailConfirmationTemplate" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="resetForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-tabs v-model="curentTab" height="36">
              <v-tab class="px-0 mr-4"><i18n path="Common.Content" /></v-tab>
              <v-tab :disabled="!RTEValue" class="px-0 mr-4"
                ><i18n path="Common.BasicInfo"
              /></v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <v-tabs-items v-model="curentTab">
              <v-tab-item>
                <v-card v-if="choosedTemplate === 0" flat>
                  <p class="mt-4 mb-3">
                    <i18n path="Common.PredesignedTemplate" />
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
                                    :src="
                                      $config.cdnUri + 'new-invitee-image.png'
                                    "
                                    min-height="200"
                                    max-height="200"
                                  >
                                  </v-img>
                                </template>
                              </v-img>
                            </div>
                            <div v-else class="pa-1">
                              <v-img
                                :src="$config.cdnUri + 'new-invitee-image.png'"
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
                              ><i18n path="Common.Select"
                            /></v-btn>
                            <v-btn
                              class="ma-2"
                              outlined
                              color="primary"
                              @click="
                                setPreviewImage(
                                  item.ImageURL !== null
                                    ? item.ImageURL
                                    : $config.cdnUri + 'new-invitee-image.png'
                                )
                              "
                              ><i18n path="Drawer.View"
                            /></v-btn>
                          </div>
                          <div
                            class="text-truncate text-center text-capitalize"
                          >
                            {{ item.Name }}
                          </div>
                        </div>
                      </v-hover>
                      <v-col
                        class="pl-0 pt-0 pb-0 pr-3 templateTile col-sm-4"
                        @click="chooseTemplate(3)"
                      >
                        <v-card
                          height="250"
                          width="253"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer pa-2"
                        >
                          <v-icon class="py-5" size="48">fa-code1</v-icon>
                          <h3
                            class="text-h5 my-2"
                            style="font-size: 18px !important;"
                          >
                            <i18n path="Common.RichTextEditor" />
                          </h3>
                          <div class="Caption mb-4">
                            <i18n
                              path="Common.UseEditor"
                              class="Caption mb-4"
                            />
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
                      <i18n path="Common.DefaultContent" />
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
                      ><i18n path="Drawer.XDiscard"
                    /></v-btn>
                  </v-flex>

                  <RichText
                    v-model="RTEValue"
                    class="pl-0"
                    :dropdown-options="dropdownOptions"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="tabContent">
                  <p class="mt-4 mb-2">
                    <i18n path="Common.EnteringBasicInformation" />
                  </p>
                  <div class="pr-3 pt-1">
                    <v-form ref="form">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="subject"
                            :label="$t('Common.SubjectRequired')"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v
                                  ? true
                                  : $t('Messages.Error.ThisFieldRequired')
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="senderName"
                            :label="$t('Common.SenderName')"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="sender"
                            :label="$t('Common.SenderRequired')"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v
                                  ? true
                                  : $t('Messages.Error.ThisFieldRequired')
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="setReplyTo"
                            :label="$t('Common.SetReply')"
                            outlined
                            dense
                            :rules="[
                              (v) => {
                                invalid = !subject || !sender || !setReplyTo
                                return v
                                  ? true
                                  : $t('Messages.Error.ThisFieldRequired')
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-icon class="amber--text">fa-bulb</v-icon>
                          <v-card-text class="d-inline pa-0">
                            {{
                              $t('Common.YouMayReferInviteMembersData', {
                                YouMayReferInviteMembersData:
                                  ' ${Contact.FirstName} ${Contact.LastName} ${OrganizationInfo.Name}',
                              })
                            }}
                          </v-card-text>
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
              ><i18n path="Drawer.Prev"
            /></v-btn>
            <v-btn
              v-if="curentTab < 1"
              color="primary"
              :disabled="!RTEValue"
              depressed
              @click="curentTab++"
              ><i18n path="Drawer.Next"
            /></v-btn>
            <SaveBtn
              v-if="dialog && curentTab === 1"
              color="primary"
              :disabled="!RTEValue || !subject || !sender || !setReplyTo"
              depressed
              :action="onSave"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveBtn>
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
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import { formatGQLResult } from '~/utility/gql.js'
import marketingTemplates from '~/config/apps/admin/gql/marketingTemplates.gql'
import { postGaData } from '~/utility/index.js'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    SaveBtn,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    buttonLabel: {
      type: String,
      default: 'send event invite',
      required: false,
    },
    buttonIcon: {
      default: 'mdi-plus',
      allowSpaces: false,
      type: String,
    },
    context: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    item: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    hideButton: {
      default: false,
      allowSpaces: false,
      type: Boolean,
    },
    openForm: {
      default: false,
      allowSpaces: false,
      type: Boolean,
    },
  },
  data() {
    return {
      templateItems: [],
      TemplateName: '',
      editItem: [],
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
      templateID: '',
      templateSubject: '',
      snackbar: false,
      disableButton: false,
      invalid: true,
    }
  },
  computed: {
    dropdownOptions() {
      return {
        'Event Name': 'Event Name',
        Description: 'Description',
        'Start Date': 'Start date',
        'End Date': 'End date',
        Timezone: 'Timezone',
        Organizer: 'Organizer',
        Venue: 'Venue',
        Address: 'Address',
        City: 'City',
        State: 'State',
        Country: 'Country',
        'Postal Code': 'Postal Code',
        'Event Webinar Link': 'Event Webinar Link',
        'Event Joining Instruction': 'Event Joining Instruction',
        'Organization Name': 'Organization Name',
        'Organization Address': 'Organization Address',
        'Organization City': 'Organization City',
        'Organization State': 'Organization State',
        'Organization Country': 'Organization Country',
        'Organization Postal Code': 'Organization Postal Code',
        'Privacy Policy': 'Privacy Policy',
        'Organization Facebook': 'Organization Facebook',
        'Organization Linkedin': 'Organization Linkedin',
        'Organization Twitter': 'Organization Twitter',
        Register: 'Register',
        Logo: 'Logo',
        'Registration Email': 'Registration Email',
        'Registration Phone': 'Registration Phone',
        'Registration Id': 'Registration Id',
        'Ticket Quantity': 'Ticket Quantity',
        'Session Location': 'Session Location',
        'Session Booking Date': 'Session Booking Date',
        'Session List': 'Session List',
        'Attendee List': 'Attendee List',
        'Payment Details': 'Payment Details',
        'First Name': 'First Name',
        'Last Name': 'Last Name',
        'Full Name': 'Full Name',
      }
    },
  },
  watch: {
    curentTab(newVal, oldVal) {
      if (oldVal === 0) {
        if (!this.RTEValue) {
          this.curentTab = 0
        }
      }
    },
    dialog(newVal) {
      if (newVal) {
        postGaData('New', this.$t('Common.NewEmailConfirmationTemplate'))
      }
    },
  },
  methods: {
    campaignFormDisplayed() {
      if (this.template === 'General Template') {
        this.selectedList = this.$parent.$parent.$data.selectedItems
      }
    },
    resetForm() {
      this.dialog = false
      this.selectedList = []
      this.choosedTemplate = 0
      this.curentTab = 0
      this.RTEValue = ''
      this.templateID = ''
      this.templateSubject = ''
      this.disableButton = false
      this.$eventBus.$emit('dialogOpen')
      postGaData(
        this.$t('Drawer.Save'),
        this.$t('Common.NewEmailConfirmationTemplate')
      )
    },
    setPreviewImage(url) {
      this.previewURL = url
      this.preview = true
    },
    async onSave() {
      postGaData(
        this.$t('Drawer.Save'),
        this.$t('Common.NewEmailConfirmationTemplate')
      )
      const baseUrl = this.$bitpod.getApiUrl()
      let res = null
      let activityRes = null
      try {
        res = await this.$axios.$patch(`${baseUrl}MarketingTemplates`, {
          Body: this.RTEValue,
          FromName: '',
          ReplyTo: this.setReplyTo,
          FromEmail: this.sender,
          Subject: this.subject,
          Type: this.myTemplate,
        })
      } catch (error) {
        console.log(
          `Error in task grid schedule a task on Save function - context: template  `
        )
      }
      if (res) {
        try {
          activityRes = await this.$axios.$patch(
            `${baseUrl}CRMACTIVITIES/${this.item.id}`,
            {
              TemplateId: res.id,
              TemplateName: this.TemplateName,
            }
          )
        } catch (error) {
          console.log(
            `Error in task grid schedule a task on Save function - context: template  `
          )
        }
      }
      if (activityRes) {
        this.refresh()
        this.dialog = false
        this.$eventBus.$emit('dialogOpen')
        this.$emit(
          'update-snackbar',
          this.$t('Messages.Success.EditTemplateSuccess')
        )
      }
    },
    chooseTemplate(index) {
      this.choosedTemplate = index
      switch (index) {
        case 1:
          this.choosedTemplate = 4
          this.$apollo.queries.MarketingTemplate.refresh()
          break
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
        this.TemplateName = category
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
    editTemplate: {
      query() {
        return gql`
          ${marketingTemplates}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.item.TemplateId,
            },
          },
          where: {},
        }
      },
      update(data) {
        this.editItem = formatGQLResult(data, 'MarketingTemplate')

        if (this.item.TemplateId) {
          this.choosedTemplate = 3
          this.RTEValue = this.editItem[0].Body
          this.templateID = this.editItem[0].id
          this.templateSubject = this.editItem[0].Subject
        }
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

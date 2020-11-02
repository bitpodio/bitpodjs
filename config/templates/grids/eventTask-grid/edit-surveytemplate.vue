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
              <v-tab class="px-0 mr-4"><i18n path="Common.BasicInfo" /></v-tab>
              <v-tab :disabled="invalid" class="px-0 mr-4"
                ><i18n path="Common.Content"
              /></v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <v-tabs-items v-model="curentTab">
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
                                invalid = !subject || !sender
                                return v ? true : 'This field is required'
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
                                invalid = !subject || !sender
                                return v ? true : 'This field is required'
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="tabContent">
                  <v-flex class="d-flex">
                    <p class="mt-5 mb-4">
                      <i18n path="Common.DefaultContent" />
                    </p>
                    <v-spacer></v-spacer>
                  </v-flex>

                  <RichText v-model="RTEValue" class="pl-0" />
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
              depressed
              @click="curentTab++"
              ><i18n path="Drawer.Next"
            /></v-btn>
            <v-btn
              v-if="(curentTab === 1)"
              color="primary"
              :disabled="!RTEValue || !subject || !sender"
              depressed
              @click.native="onSave"
              ><i18n path="Drawer.Save"
            /></v-btn>
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
export default {
  components: {
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
      editItem: [],
      selectedList: [],
      dialog: false,
      curentTab: 0,
      // eslint-disable-next-line no-template-curly-in-string
      subject: 'Thank you for registering for ${Event.Title}',
      senderName: (this.$auth && this.$auth.user.data.name) || '',
      sender: (this.$auth && this.$auth.user.data.email) || '',
      choosedTemplate: 0,
      preview: false,
      previewURL: '',
      RTEValue: '',
      priorInvite: {},
      templateID: '',
      templateSubject: '',
      snackbar: false,
      disableButton: false,
      invalid: true,
    }
  },
  watch: {
    curentTab(newVal, oldVal) {
      if (oldVal === 0) {
        this.$refs.form.validate()
        if (!this.subject || !this.sender) {
          this.curentTab = 0
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
    resetForm() {
      this.dialog = false
      this.selectedList = []
      this.choosedTemplate = 0
      this.curentTab = 0
      this.RTEValue = ''
      this.templateID = ''
      this.templateSubject = ''
      this.disableButton = false
    },
    setPreviewImage(url) {
      this.previewURL = url
      this.preview = true
    },
    async onSave() {
      const baseUrl = this.$bitpod.getApiUrl()
      let res = null
      let activityRes = null
      try {
        res = await this.$axios.$post(`${baseUrl}MarketingTemplates`, {
          Body: this.RTEValue,
          FromName: this.senderName,
          FromEmail: this.sender,
          Subject: this.subject,
        })
      } catch (error) {
        console.log(
          `Error in task grid schedule a task on Save function context : event task`
        )
      }
      if (res) {
        try {
          activityRes = await this.$axios.$patch(
            `${baseUrl}CRMACTIVITIES/${this.item.id}`,
            {
              Owner: this.sender,
              senderName: this.senderName,
              TemplateId: res.id,
            }
          )
        } catch (error) {
          console.log(
            `Error in task grid schedule a task on Save function context : event task`
          )
        }
      }
      if (activityRes) {
        this.refresh()
        this.dialog = false
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
        return {
          filters: {
            where: {
              Type: 'Survey Email Template',
            },
          },
          where: {},
        }
      },
      update(data) {
        if (!this.item.TemplateId) {
          this.editItem = formatGQLResult(data, 'MarketingTemplate')
          this.RTEValue = this.editItem[0].Body.replaceAll('<tr>', '<div>')
            .replaceAll('</tr>', '</div>')
            .replaceAll('<td>', '')
            .replaceAll('</td>', '')
          this.templateID = this.editItem[0].id
          this.templateSubject = this.editItem[0].Subject
        }
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
          this.RTEValue = this.editItem[0].Body.replaceAll('<tr>', '<div>')
            .replaceAll('</tr>', '</div>')
            .replaceAll('<td>', '')
            .replaceAll('</td>', '')
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

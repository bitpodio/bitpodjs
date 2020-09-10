<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default-big"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon dark left>mdi-plus</v-icon>
          send Event Invite
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Email Invite</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
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
                  <v-card-text class="pl-1"
                    >Use a pre designed template or editor to design your
                    content.</v-card-text
                  >
                  <div class="pr-3 pt-1 tabContent">
                    <v-row>
                      <v-col class="pl-5" cols="4" @click="chooseTemplate(1)">
                        <v-card
                          height="250"
                          align="center"
                          :hover="true"
                          class="hover"
                          justify="center"
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
                      <v-col cols="4" @click="chooseTemplate(2)">
                        <v-card
                          height="250"
                          align="center"
                          :hover="true"
                          class="hover"
                          justify="center"
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
                      <v-col cols="4" @click="chooseTemplate(3)">
                        <v-card
                          height="250"
                          align="center"
                          :hover="true"
                          class="hover"
                          justify="center"
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
                  <v-card-text class="pl-1"
                    >Select a template to continue.
                    <span
                      class="blue--text cursorPointer"
                      @click="choosedTemplate = 0"
                    >
                      Back
                    </span></v-card-text
                  >
                  <v-flex
                    class="d-flex flex-wrap pa-0 justify-center justify-md-start"
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
                  <v-card-text class="pl-1"
                    >Continue with default content or use editor to change
                    content.</v-card-text
                  >
                  <RichText v-model="RTEValue" />
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
                  <v-col cols="6">
                    <div class="mb-11 borderBottomGrey pb-3">
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
                  <v-col cols="6">
                    <div class="borderBottomGrey pb-3">
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
                      <v-radio label="Not Registered" value="0"></v-radio>
                      <v-radio label="Registered" value="1"></v-radio>
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
                      <v-radio label="Not Opened" value="0"></v-radio>
                      <v-radio label="Opened" value="1"></v-radio>
                      <v-radio label="Opened & Clicked" value="2"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>tab 4</v-card-text>
                </v-card>
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
import Grid from '~/components/common/grid'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
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
      senderName: this.$auth.user.data.name,
      sender: this.$auth.user.data.email,
      setReplyTo: this.$auth.user.data.email,
      choosedTemplate: 0,
      preview: false,
      previewURL: '',
      RTEValue: '',
      registrationRadio: '',
      openRadio: '',
      priorInvite: {},
      previousInviteDialog: false,
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
        this.choosedTemplate = 1
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
        this.choosedTemplate = 2
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

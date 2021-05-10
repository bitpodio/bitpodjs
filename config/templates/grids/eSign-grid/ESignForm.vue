<template>
  <v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <div class="toast py-2 pr-1 pl-3 fs-16">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-dialog v-model="addNewTemplateFormDialog" persistent max-width="60%">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.CreateNewSignatureTemplate" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="addNewTemplateFormDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewTemplateFormName"
                :label="$t('Common.Name')"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewTemplateFormURL"
                label="Google Document URL*"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewTemplateFormCategory"
                :label="$t('Common.Category')"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            color="primary"
            class="sendButtons"
            :reset="toggleLoading"
            :label="this.$t('Drawer.Save')"
            :action="handleAddNewTemplateForm"
          ></SaveBtn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="addNewRecipientFormDialog" persistent width="60%">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            New Contact
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              icon
              @click="
                {
                  addNewRecipientFormFirstName = ''
                  addNewRecipientFormLastName = ''
                  addNewRecipientFormName = ''
                  addNewRecipientFormEmail = ''
                  addNewRecipientFormDialog = false
                }
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewRecipientFormFirstName"
                :label="$t('Common.FirstName')"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewRecipientFormLastName"
                :label="$t('Common.LastName')"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewRecipientFormEmail"
                :label="$t('Common.EnterEmail')"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            color="primary"
            class="sendButtons"
            :reset="toggleLoading"
            :label="this.$t('Drawer.Save')"
            :action="handleAddNewRecipientForm"
          ></SaveBtn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog
      v-model="newTemplateDialog"
      persistent
      scrollable
      content-class="slide-form"
    >
      <template>
        <v-card class="invite-form">
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-4 pb-2 text-h5">
              <i18n path="Common.NewEsignRequest" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="resetForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-tabs v-model="currentTab" left height="36">
              <v-tab class="px-0 mr-4">
                <i18n path="Common.Template" />
              </v-tab>
              <v-tab :disabled="currentTab < 1" class="px-0 mr-4">
                <i18n path="Common.Data" />
              </v-tab>
              <v-tab :disabled="currentTab < 2" class="px-0 mr-4">
                <i18n path="Common.Recipients" />
              </v-tab>
              <v-tab :disabled="currentTab < 3" class="px-0 mr-4">
                <i18n path="Common.EmailInfo" />
              </v-tab>
              <v-tab :disabled="currentTab < 4" class="px-0 mr-4">
                <i18n path="Common.Verify" />
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <v-tabs-items v-model="currentTab">
              <v-tab-item>
                <v-card
                  v-if="templateLoading"
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
                  <div class="d-flex justify-start mt-4 pt-4 mr-8">
                    <v-btn
                      color="primary"
                      @click="addNewTemplateFormDialog = true"
                      ><v-icon small>mdi-plus</v-icon><i18n path="Common.New"
                    /></v-btn>
                  </div>
                  <v-flex
                    class="d-flex flex-wrap pl-0 justify-center justify-md-start mt-4 pt-4"
                  >
                    <v-hover
                      v-for="item in templateItems"
                      :key="item.id"
                      v-slot:default="{ hover }"
                    >
                      <v-card
                        :elevation="1"
                        :class="[
                          hover ? 'grey lighten-5' : '',
                          'ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0 seat-maps',
                        ]"
                        @click="selectSignTemplate(item)"
                      >
                        <v-card-text
                          class="font-weight-medium text-center positionRelative subtitle-1 seat-card pb-0"
                        >
                          <i class="fa fa-document fs-36 warning--text"></i>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <span v-bind="attrs">
                                <div
                                  class="body-1 grey--text text--darken-1 text-truncate"
                                  v-on="on"
                                >
                                  {{ item.Name }}
                                </div>
                              </span>
                            </template>
                            <span>{{ item.Name }}</span>
                          </v-tooltip>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-card
                  v-if="documentTextLoading"
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
                <v-card v-else flat>
                  <p class="mt-5 mb-4">
                    <i18n path="Common.FillTemplateData" />
                  </p>
                  <v-row>
                    <v-col v-if="currentTab === 1" class="col-12 col-md-8">
                      <div v-html="resolvedDocumentText"></div>
                    </v-col>
                    <v-col align="center" class="d-none d-md-block col-1">
                      <v-divider vertical></v-divider>
                    </v-col>
                    <v-col
                      class="col-12 col-md-3"
                      :order="$vuetify.breakpoint.smAndDown ? 'first' : 'last'"
                    >
                      <v-text-field
                        v-for="item in dataFields"
                        :key="item.id"
                        outlined
                        dense
                        :label="item.Name"
                        :value="getHandlebarsObjectValue(item.Name)"
                        @input="updateNestedObject(item.Name, $event, item.id)"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-card flat>
                  <p class="mt-5 mb-4">
                    <i18n path="Common.SelectRecipients" />
                  </p>
                </v-card>
                <v-row>
                  <v-col class="contactsGrid col-12">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left pl-4">
                              Recipient Type*
                            </th>
                            <th class="text-left pl-4 mxw-150">
                              Contact*
                            </th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody v-if="toggleRecipientLoading">
                          <td width="20%">
                            <v-skeleton-loader
                              type="list-item@4"
                            ></v-skeleton-loader>
                          </td>
                          <td width="60%">
                            <v-skeleton-loader
                              type="list-item@4"
                            ></v-skeleton-loader>
                          </td>
                        </tbody>
                        <tbody v-else>
                          <tr
                            v-for="(item, index) in selectedList"
                            :key="index"
                            class="contactsRow"
                          >
                            <td width="20%" class="pa-2 pb-0 pl-4">
                              {{ item.type }}
                            </td>
                            <td width="60%" class="pa-2 pb-0 pl-4">
                              <!-- <v-autocomplete
                                :items="contactList"
                                :item-text="
                                  (item) => `${item.FullName} (${item.Email})`
                                "
                                :search-input.sync="contactListSearch"
                                outlined
                              >
                              </v-autocomplete> -->
                              <v-autocomplete
                                v-model="selectedListNewContacts[index]"
                                :items="disabledContactList(index)"
                                item-value="id"
                                :filter="autocompleteFilter"
                                return-object
                                outlined
                                :search-input.sync="contactListSearch[index]"
                                :label="$t('Common.SearchContacts')"
                                dense
                                hide-details
                                :hide-no-data="!contactListResultsFound"
                                @input="updateSelectedListInput(index)"
                                @focus="focusSelectedListInput"
                              >
                                <template v-slot:selection>
                                  {{
                                    `${selectedListNewContacts[index].FullName} (${selectedListNewContacts[index].Email})`
                                  }}
                                </template>
                                <template v-slot:append>
                                  <v-progress-circular
                                    v-if="loadingContactList[index]"
                                    size="18"
                                    width="3"
                                    color="primary"
                                    indeterminate
                                  />
                                  <v-icon>mdi-menu-down</v-icon>
                                </template>
                                <template v-slot:item="data">
                                  <template>
                                    <v-list-item-content>
                                      <v-list-item-title>{{
                                        data.item.FullName
                                      }}</v-list-item-title>
                                      <v-list-item-subtitle>{{
                                        data.item.Email
                                      }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                            </td>
                            <td width="20%" class="pa-2 pt-3">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    class="mt-1"
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="addRecipientFormOpen(index)"
                                  >
                                    <v-icon color="primary">fa-plus</v-icon>
                                  </v-btn>
                                </template>
                                <span>New Contact</span>
                              </v-tooltip>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="tabContent">
                  <p class="mt-4 mb-2">
                    <i18n path="Common.SignatureBasicInformation" />
                  </p>
                  <div class="pr-3 pt-1">
                    <v-form ref="form">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="subject"
                            :label="$t('Common.SubjectRequired')"
                            required
                            outlined
                            dense
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
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="setReplyTo"
                            :label="$t('Common.SetReply')"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-textarea
                            v-model="message"
                            :label="$t('Common.Message')"
                            outlined
                            dense
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-icon class="amber--text">fa-bulb</v-icon>
                          <v-card-text class="d-inline pa-0">
                            {{
                              $t('Common.YouMayReferRecipients', {
                                contactTemplateData:
                                  ' ${Recipient.FullName} ${OrganizationInfo.Name}',
                              })
                            }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-row v-if="!selectedList.length" class="ma-3 ml-0 mb-6">
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="body-1 py-2">
                      <i18n path="Common.ContentDetails" />
                    </h4>
                    <v-flex class="flexInLargeScreen">
                      <h5 class="body-2 mt-2 mr-2">
                        <i18n path="Common.NotAddedContact" />
                      </h5>
                      <v-btn color="blue" outlined @click="currentTab = 1"
                        ><i18n path="Common.SelectContact"
                      /></v-btn>
                    </v-flex>
                  </v-col>
                </v-row>
                <v-row v-else-if="!templateSelected" class="ma-3 ml-0 mb-6">
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="body-1 py-2">
                      <i18n path="Common.ContactDetails" />
                    </h4>
                    <v-flex class="flexInLargeScreen">
                      <h5 class="body-2 mt-2 mr-2">
                        <i18n path="Common.NotAddedContent" />
                      </h5>
                      <v-btn color="blue" outlined @click="currentTab = 0"
                        ><i18n path="Common.SelectContent"
                      /></v-btn>
                    </v-flex>
                  </v-col>
                </v-row>
                <v-row v-else class="ma-1 my-3">
                  <v-col
                    class="pl-sm-0 col-12 col-sm-6 col-md-4"
                    :class="{
                      templateverify: !isFrench,
                      templateverifyFrench: isFrench,
                    }"
                  >
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-2 pt-7" size="48">fa-mail</v-icon>
                      <h3
                        class="text-h5 my-2"
                        style="font-size: 20px !important;"
                      >
                        <i18n path="Common.SendNow" />
                      </h3>
                      <h5 class="body-2 my-2 mb-5 sendOptions">
                        <i18n path="Common.SendDocumentNow" />
                      </h5>
                      <SaveBtn
                        v-if="newTemplateDialog"
                        color="primary"
                        class="sendButtons"
                        :disabled="disableButton"
                        :label="this.$t('Drawer.Send')"
                        :action="sendNow"
                      ></SaveBtn>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="ma-1">
                  <v-col cols="12" class="pl-0 pt-0">
                    <div class="borderBottomGrey pb-1">
                      <v-flex class="d-flex">
                        <v-icon size="18" class="mr-1"
                          >mdi-information-outline</v-icon
                        >
                        <h4 class="body-1 mt-1">
                          <i18n path="Common.SubjectAndSender" />
                        </h4>
                        <v-btn class="ml-10" text small @click="currentTab = 2">
                          <v-icon dark left>fa-pencil</v-icon>
                          <i18n path="Drawer.Edit" />
                        </v-btn>
                      </v-flex>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pl-0 pt-0">
                    <div><i18n path="Common.Name" /></div>
                    <div class="blue--text pt-1 pb-4 body-1">
                      {{ senderName }}
                    </div>
                    <div><i18n path="Common.Subject" /></div>
                    <div class="blue--text pt-1 body-1">{{ subject }}</div>
                    <div><i18n path="Common.Message" /></div>
                    <div class="blue--text pt-1 body-1">{{ message }}</div>
                  </v-col>
                  <v-col cols="6" class="pl-0">
                    <div><i18n path="Common.SenderAddress" /></div>
                    <div class="blue--text pt-1 pb-4 body-1">{{ sender }}</div>
                    <div><i18n path="Common.ReplyAddress" /></div>
                    <div class="blue--text pt-1 body-1">{{ setReplyTo }}</div>
                  </v-col>
                  <v-col cols="12" class="pl-0">
                    <div class="borderBottomGrey pb-1">
                      <v-flex class="d-flex">
                        <v-icon size="18" class="mr-1"
                          >fa-address-book-o</v-icon
                        >
                        <h4 class="mt-1 body-1">
                          <i18n path="Common.RecipientDetail" />
                        </h4>
                      </v-flex>
                    </div>
                    <div
                      v-for="item in selectedList"
                      :key="item.Email"
                      class="borderBottomGrey py-2 pl-2"
                    >
                      {{ item.FullName }} ({{ item.Email }})
                    </div>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn v-if="currentTab > 0" depressed @click="onPrev"
              ><i18n path="Drawer.Prev"
            /></v-btn>
            <v-btn
              v-if="currentTab < 4"
              color="primary"
              depressed
              :disabled="disableNext"
              @click="onNext"
              ><i18n path="Drawer.Next"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-flex>
</template>

<script>
import _ from 'lodash'
import handlebars from 'handlebars'
import SaveBtn from '~/components/common/saveButton'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    SaveBtn,
  },
  mixins: [configLoaderMixin],
  props: {
    newTemplateDialog: {
      type: Boolean,
      required: true,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    templateName: {
      type: String,
      default: '',
      required: false,
    },
    templateCategory: {
      type: String,
      default: '',
      required: false,
    },
    recipientList: {
      type: Array,
      default: () => [],
      required: false,
    },
    templateData: {
      type: Array,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      isFrench: false,
      currentTab: 0,
      disableButton: false,
      toggleLoading: false,
      subject: '',
      senderName: (this.$auth && this.$auth.user.data.name) || '',
      sender: (this.$auth && this.$auth.user.data.email) || '',
      setReplyTo: (this.$auth && this.$auth.user.data.email) || '',
      message: '',
      snackbar: false,
      snackbarText: '',
      templateItems: [],
      templateLoading: true,
      templateSelected: false,
      addNewTemplateFormDialog: false,
      addNewTemplateFormName: '',
      addNewTemplateFormURL: '',
      addNewTemplateFormCategory: '',
      newRecipientIndex: 0,
      addNewRecipientFormDialog: false,
      addNewRecipientFormFirstName: '',
      addNewRecipientFormLastName: '',
      addNewRecipientFormName: '',
      addNewRecipientFormEmail: '',
      postEsignRequestData: {},
      parties: [],
      contactList: [],
      contactListSearch: [],
      contactListSearchText: '',
      disableSearch: false,
      loadingContactList: [],
      contactListResultsFound: false,
      selectedList: [],
      selectedListNewContacts: [],
      selectedRecipientList: [],
      selectedRecipient: {},
      contactIsSet: [],
      toggleRecipientLoading: true,
      documentTextLoading: true,
      documentText: '',
      compiledDocumentText: '',
      resolvedDocumentText: '',
      dataFields: [],
      handlebarsDataObject: {},
      handlebarsDataIsSet: [],
    }
  },
  computed: {
    disableNext() {
      if (this.templateSelected === false) return true
      else if (this.currentTab === 1) {
        if (
          this.documentTextLoading ||
          this.handlebarsDataIsSet.some((item) => item === false)
        )
          return true
      } else if (this.currentTab === 2) {
        if (this.toggleRecipientLoading === true) return true
        if (this.contactIsSet.some((item) => item === false)) return true
      } else if (this.currentTab === 3 && this.subject === '') return true
      return false
    },
  },
  watch: {
    contactListSearch(val) {
      for (const [index, item] of val.entries()) {
        if (item && item.length > 3 && item !== this.contactListSearchText) {
          this.contactListResultsFound = false
          this.contactListSearchText = item
          console.log(this.contactListSearchText)
          this.loadingContactList[index] = true
          this.disableSearch = false
          this.getContacts()
        } else if (item && item.length <= 3) {
          this.contactListResultsFound = false
          this.loadingContactList[index] = false
          this.disableSearch = true
          this.contactListSearchText = item
        }
      }
    },
  },
  async mounted() {
    if (this.$i18n.locale === 'fr') {
      this.isFrench = true
    }
    if (this.templateName !== '') {
      try {
        const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES/findOne?filter[where][Name]=${
          this.templateName
        }`
        const response = await this.$axios.$get(bitpodURL)
        console.log(response)
        if (response) {
          this.selectSignTemplate(response)
        }
        this.getExistingTemplate()
      } catch (err) {
        console.error(err)
        this.getExistingTemplate()
      }
    } else {
      this.getExistingTemplate()
    }
  },
  methods: {
    onPrev() {
      this.currentTab--
      document.getElementsByClassName('invite-inner')[0].scrollTop = 0
    },
    onNext() {
      this.currentTab++
      document.getElementsByClassName('invite-inner')[0].scrollTop = 0
    },
    updateSelectedListInput(index) {
      if (this.selectedListNewContacts[index]) {
        this.$set(this.selectedList, index, {
          ...this.selectedList[index],
          FullName: this.selectedListNewContacts[index].FullName,
          Email: this.selectedListNewContacts[index].Email,
        })
        this.$set(this.contactIsSet, index, true)
        this.selectedRecipientList.push(this.selectedListNewContacts[index])
      } else {
        this.$set(this.selectedListNewContacts, index, {
          FullName: '',
          Email: '',
        })
        this.$set(this.contactIsSet, index, false)
      }
    },
    focusSelectedListInput() {
      this.contactListResultsFound = false
      this.contactList = []
    },
    resetForm() {
      this.$emit('update:newTemplateDialog', false)
      this.selectedList = []
      this.currentTab = 0
      this.templateSelected = false
      this.disableButton = false
    },
    async sendNow() {
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNREQUESTS/createESignRequest`
      try {
        this.postEsignRequestData = {
          ...this.postEsignRequestData,
          selectedList: this.selectedList.map((item) => ({
            FullName: item.FullName,
            Email: item.Email,
            type: item.type,
          })),
          subject: this.subject,
          senderName: this.senderName,
          senderEmail: this.sender,
          setReplyTo: this.setReplyTo,
          Message: this.message,
          TemplateData: JSON.stringify(this.handlebarsDataObject),
        }
        console.log(this.postEsignRequestData, bitpodURL)
        const response = await this.$axios.$post(
          bitpodURL,
          this.postEsignRequestData
        )
        if (response) {
          console.log(response)
          this.$emit('update:newTemplateDialog', false)
          this.refresh()
        }
      } catch (err) {
        console.error(err)
      }
    },
    async handleAddNewTemplateForm() {
      if (
        this.addNewTemplateFormName.length < 2 ||
        this.addNewTemplateFormURL.length < 5 ||
        this.addNewTemplateFormCategory.length < 2
      ) {
        this.snackbar = true
        this.snackbarText = 'Please enter valid input'
      } else {
        const addNewTemplateFormObject = {
          Name: this.addNewTemplateFormName,
          DocumentUrl: this.addNewTemplateFormURL,
          Category: this.addNewTemplateFormCategory,
        }
        this.toggleRecipientLoading = true
        const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES`
        try {
          const response = await this.$axios.$post(
            bitpodURL,
            addNewTemplateFormObject
          )
          if (response) {
            this.postEsignRequestData = {
              ...this.postEsignRequestData,
              documentId: response.id,
              documentUrl: response.DocumentUrl,
            }
            this.getHTMLTemplate(this.addNewTemplateFormURL)
            this.currentTab = 1
            this.selectedList = []
          }
        } catch (err) {
          this.snackbar = true
          this.snackbarText = 'Request Failed'
          console.error(err)
        }
        this.templateSelected = true
        this.toggleLoading = !this.toggleLoading
        this.subject = `Signature requested for ${this.addNewTemplateFormName}`
        this.addNewTemplateFormDialog = false
      }
    },
    autocompleteFilter(item, query, itemText) {
      console.log(item, query, itemText)
      return item.Email.includes(query) || item.FullName.includes(query)
    },
    selectContact(recipientName, recipientEmail, index) {
      const contactObject = {
        ...this.selectedList[index],
        FullName: recipientName,
        Email: recipientEmail,
      }
      console.log(recipientName)
      this.contactList.push(contactObject)
      this.selectedRecipientList.push(contactObject)
      this.$set(this.selectedListNewContacts, index, contactObject)
      this.$set(this.selectedList, index, contactObject)
      this.$set(this.contactIsSet, index, true)
      this.addNewRecipientFormFirstName = ''
      this.addNewRecipientFormLastName = ''
      this.addNewRecipientFormEmail = ''
    },
    async handleAddNewRecipientForm() {
      if (
        (this.addNewRecipientFormFirstName.length < 2 &&
          this.addNewRecipientFormLastName.length < 2) ||
        this.addNewRecipientFormEmail.length < 5
      ) {
        this.snackbar = true
        this.snackbarText = 'Please fill out all fields'
        this.toggleLoading = !this.toggleLoading
        return
      }
      const addNewRecipientFormObject = {
        FirstName: this.addNewRecipientFormFirstName,
        LastName: this.addNewRecipientFormLastName,
        Email: this.addNewRecipientFormEmail,
      }
      const bitpodURL = `${this.$bitpod.getApiUrl()}/Contacts`
      try {
        const response = await this.$axios.$post(
          bitpodURL,
          addNewRecipientFormObject
        )
        console.log(response)
        if (response) {
          this.selectContact(
            response.FullName,
            response.Email,
            this.newRecipientIndex
          )
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = 'Request Failed'
        this.addNewRecipientFormFirstName = ''
        this.addNewRecipientFormLastName = ''
        this.addNewRecipientFormEmail = ''
        console.error(err)
      }
      this.toggleLoading = !this.toggleLoading
      this.addNewRecipientFormDialog = false
    },
    addRecipientFormOpen(index) {
      this.newRecipientIndex = index
      this.addNewRecipientFormDialog = true
    },
    async getExistingTemplate() {
      let bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES`
      if (this.templateCategory !== '')
        bitpodURL =
          bitpodURL + `?filter[where][Category]=${this.templateCategory}`
      try {
        const response = await this.$axios.$get(bitpodURL)
        if (response) {
          this.templateItems = response
          this.templateLoading = false
        }
      } catch (err) {
        console.error(err)
      }
    },
    selectSignTemplate(item) {
      this.toggleRecipientLoading = true
      this.currentTab = 1
      this.templateSelected = true
      this.getHTMLTemplate(item.DocumentUrl)
      this.postEsignRequestData = {
        ...this.postEsignRequestData,
        documentId: item.id,
        documentUrl: item.DocumentUrl,
      }
      this.subject = `Signature requested for ${item.Name}`
    },
    prepareRecipientList(partyList) {
      this.parties = [...new Set(partyList)]
      this.selectedList = []
      this.selectedListNewContacts = []
      this.contactListSearch = []
      this.loadingContactList = []
      this.contactIsSet = []
      this.parties.forEach((item) => {
        this.selectedList.push({
          FullName: '',
          Email: '',
          type: item,
        })
        this.selectedListNewContacts.push({ FullName: '', Email: '' })
        this.contactListSearch.push('')
        this.loadingContactList.push(false)
        this.contactIsSet.push(false)
      })
      if (this.recipientList.length > 0) {
        const filteredRecipientList = this.recipientList.filter((item) => {
          item.index = this.parties.findIndex((party) => party === item.type)
          return item.index !== -1
        })
        console.log(filteredRecipientList)
        for (const item of filteredRecipientList) {
          if (item.FullName && item.Email) {
            console.log(item)
            this.selectContact(item.FullName, item.Email, item.index)
          }
        }
      }
      if (this.parties.length <= 0) {
        this.templateSelected = false
        this.currentTab = 0
        this.snackbarText =
          'This template does not contain any signature fields. Kindly choose a different template.'
        this.snackbar = true
      }
      console.log(this.selectedList)
    },
    async getHTMLTemplate(documentUrl) {
      const regExp = /{{{ESign\.(\w+)[.[\w]+]?}}}/g
      this.documentTextLoading = true
      try {
        const res = await this.$axios.get(documentUrl)
        const regexFontUrl = /@import url\('[\S]+'\);/g
        const filteredDocumentText = res.data.replace(regexFontUrl, '')
        this.documentText = filteredDocumentText
        this.compiledDocumentText = handlebars.compile(filteredDocumentText)
        this.prepareHTMLResolutionFields()
        this.documentTextLoading = false
        const matches = []
        let regexMatch
        while ((regexMatch = regExp.exec(this.documentText)) !== null) {
          matches.push(regexMatch[1])
        }
        this.prepareRecipientList(matches)
        this.toggleRecipientLoading = false
      } catch (err) {
        console.error(err)
        this.templateSelected = false
        this.currentTab = 0
        this.snackbarText =
          'This template could not be loaded. Check the provided URL or try again.'
        this.snackbar = true
      }
    },
    compileHandlebarsData() {
      this.resolvedDocumentText = this.compiledDocumentText(
        this.handlebarsDataObject
      )
    },
    updateNestedObject: _.debounce(function (path, value, index) {
      const keys = path.split('.')
      if (value === '') {
        _.set(this.handlebarsDataObject, keys, `{{${path}}}`)
        this.$set(this.handlebarsDataIsSet, index, false)
      } else {
        _.set(this.handlebarsDataObject, keys, value)
        this.$set(this.handlebarsDataIsSet, index, true)
      }
      this.compileHandlebarsData()
    }, 200),
    getHandlebarsObjectValue(path) {
      const value = _.get(this.handlebarsDataObject, path)
      return value === `{{${path}}}` ? '' : value
    },
    prepareHTMLResolutionFields() {
      const variablesRegex = /{{(\w[.\w]*)}}/g
      let variableMatch
      let variableMatches = []
      const handlebarsDataIsSet = []
      const handlebarsObject = {}
      while (
        (variableMatch = variablesRegex.exec(this.documentText)) !== null
      ) {
        if (variableMatch[1].includes('ESign') === false) {
          variableMatches.push(variableMatch[1])
        }
      }
      variableMatches = [...new Set(variableMatches)]
      this.dataFields = variableMatches.map((item, index) => {
        const dataFieldValue = {}
        dataFieldValue.id = index
        dataFieldValue.Name = item
        const propDataValue = _.get(this.templateData, item, undefined)
        if (propDataValue) {
          _.set(handlebarsObject, item, propDataValue)
          handlebarsDataIsSet.push(true)
        } else {
          _.set(handlebarsObject, item, `{{${item}}}`)
          handlebarsDataIsSet.push(false)
        }
        return dataFieldValue
      })
      this.handlebarsDataIsSet = handlebarsDataIsSet
      this.handlebarsDataObject = handlebarsObject
      this.compileHandlebarsData()
    },
    disabledContactList(index) {
      if (this.contactIsSet[index]) return this.selectedRecipientList
      else return this.contactList
    },
    getContacts: _.debounce(async function () {
      if (!this.disableSearch) {
        const filterText = this.contactListSearchText
        const bitpodURL = `${this.$bitpod.getApiUrl()}Contacts?filter={"where": {"or": [{"FullName":{"like":"${filterText}","options":"i"}}, {"Email":{"like":"${filterText}","options":"i"}}]}}`
        try {
          const response = await this.$axios.$get(bitpodURL)
          if (response && filterText === this.contactListSearchText) {
            this.contactList = response
            this.loadingContactList = this.loadingContactList.fill(false)
            this.contactListResultsFound = true
          }
        } catch (err) {
          this.snackbar = true
          this.snackbarText = 'Failed to load contacts.'
          console.error(err)
        }
      }
    }, 500),
  },
}
</script>
<style scoped>
.seat-maps {
  height: 125px;
  width: 155px;
  max-width: 155px;
}
.seat-card {
  top: 12px;
}
.box-actions {
  bottom: 5px;
  right: 5px;
  display: none;
}
.seat-maps:hover .box-actions {
  display: block;
}
.seatmap-inner {
  max-width: 65%;
  margin: auto;
}
@media (max-width: 600px) {
  .seatmap-inner {
    max-width: 100%;
  }
}
.contactsGrid {
  padding-right: 12px;
}

.contactsRow:hover {
  background-color: transparent !important;
}

.invite-inner {
  height: calc(100vh - 100px);
}
.templateverifyFrench {
  max-width: 350px !important;
}
.sendOptions {
  min-height: 40px !important;
}
@media (min-width: 600px) {
  .flexInLargeScreen {
    display: flex;
  }
}
@media (max-width: 599px) {
  .sendButtons {
    font-size: 12px;
  }
}
</style>

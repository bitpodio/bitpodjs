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
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="addNewTemplateFormURL"
                label="Google Document URL*"
                required
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
            <v-tabs v-model="curentTab" left height="36">
              <v-tab class="px-0 mr-4">
                <i18n path="Common.Template" />
              </v-tab>
              <v-tab :disabled="curentTab < 1" class="px-0 mr-4">
                <i18n path="Common.Recipients" />
              </v-tab>
              <v-tab :disabled="curentTab < 2" class="px-0 mr-4">
                <i18n path="Common.EmailInfo" />
              </v-tab>
              <v-tab :disabled="curentTab < 3" class="px-0 mr-4">
                <i18n path="Common.Verify" />
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <v-tabs-items v-model="curentTab">
              <v-tab-item>
                <v-card v-if="choosedTemplate === 0" flat>
                  <p class="mt-4 mb-3">
                    <i18n path="Common.SelectTemplateType" />
                  </p>
                  <div class="pr-3 pt-1 tabContent">
                    <v-row>
                      <v-col
                        class="pl-4 templateTile col-12 col-sm-6 col-md-4"
                        @click="chooseTemplate(1)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer pa-2"
                        >
                          <v-icon class="py-5" size="48">fa-star2</v-icon>
                          <h3
                            class="text-h5 my-2"
                            style="font-size: 18px !important;"
                          >
                            <i18n path="Common.CreateNewSignatureTemplate" />
                          </h3>
                          <i18n
                            path="Common.CreateNewSignatureTemplateDescription"
                            class="Caption mb-4"
                          />
                        </v-card>
                      </v-col>

                      <v-col
                        class="pl-5 templateTile col-12 col-sm-6 col-md-4"
                        @click="chooseTemplate(2)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer pa-2"
                        >
                          <v-icon class="py-5" size="48">fa-document</v-icon>
                          <h3
                            class="text-h5 my-2"
                            style="font-size: 18px !important;"
                          >
                            <i18n path="Common.ExistingSignatureTemplate" />
                          </h3>
                          <div class="Caption mb-4">
                            <i18n
                              path="Common.ExistingSignatureTemplateDescription"
                            />
                          </div>
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
                  <p class="mt-4 mb-4">
                    <i18n path="Common.SelectTemplateToContinue" />
                    <span
                      class="blue--text cursorPointer"
                      @click="choosedTemplate = 0"
                    >
                      <i18n path="Drawer.Back" />
                    </span>
                  </p>
                  <v-flex
                    class="d-flex flex-wrap pl-0 justify-center justify-md-start"
                  >
                    <v-hover
                      v-for="item in templateItems"
                      :key="item.id"
                      v-slot:default="{ hover }"
                    >
                      <div style="position: relative;">
                        <v-card
                          :elevation="hover ? 4 : 2"
                          class="ma-3 ml-0 mt-0 text-center"
                          :class="{ 'on-hover': hover }"
                          height="150"
                          width="250"
                        >
                          <div class="pa-1">
                            <v-icon class="py-5" color="secondary" size="48"
                              >fa-document</v-icon
                            >
                          </div>
                          <div
                            class="text-truncate text-center text-capitalize text-h5 pb-5 px-2"
                          >
                            {{ item.Name }}
                          </div>
                        </v-card>
                        <div
                          v-if="hover"
                          class="align-self-center templateButtons"
                        >
                          <v-btn
                            class="my-2 mx-0"
                            color="primary"
                            outlined
                            @click="selectSignTemplate(item)"
                            ><i18n path="Common.Select"
                          /></v-btn>
                          <v-btn
                            class="ma-2"
                            color="primary"
                            outlined
                            :href="item.DocumentUrl"
                            target="_blank"
                            ><i18n path="Drawer.View"
                          /></v-btn>
                        </div>
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
                  <v-flex class="flexInLargeScreen">
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
                        templateSelected = false
                      "
                      ><i18n path="Drawer.XDiscard"
                    /></v-btn>
                  </v-flex>
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
                            <th class="text-left pl-2 pl-md-0">
                              Recipient Type*
                            </th>
                            <th class="text-left pl-2 mxw-150">
                              Contact*
                            </th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody v-if="toggleRecipientLoading">
                          <td width="20%" class="pa-2 pb-0 pl-2 pl-md-0">
                            <v-skeleton-loader
                              type="list-item@4"
                            ></v-skeleton-loader>
                          </td>
                          <td width="60%" class="pa-2 pb-0">
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
                            <td width="20%" class="pa-2 pb-0 pl-2 pl-md-0">
                              {{ item.type }}
                            </td>
                            <td width="60%" class="pa-2 pb-0">
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
                                item-text="FullName"
                                return-object
                                outlined
                                :search-input.sync="contactListSearch[index]"
                                :label="$t('Common.Select')"
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
                              <v-tooltip left>
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
                      <v-btn color="blue" outlined @click="curentTab = 1"
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
                      <v-btn color="blue" outlined @click="curentTab = 0"
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
                        <v-btn class="ml-10" text small @click="curentTab = 2">
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
            <v-btn v-if="curentTab > 0" depressed @click="onPrev"
              ><i18n path="Drawer.Prev"
            /></v-btn>
            <v-btn
              v-if="curentTab < 3"
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
  },
  data() {
    return {
      snackbarText: '',
      templateItems: [],
      selectedList: [],
      selectedListNewContacts: [],
      curentTab: 0,
      subject: '',
      senderName: (this.$auth && this.$auth.user.data.name) || '',
      sender: (this.$auth && this.$auth.user.data.email) || '',
      setReplyTo: (this.$auth && this.$auth.user.data.email) || '',
      message: '',
      choosedTemplate: 0,
      templateSelected: false,
      snackbar: false,
      disableButton: false,
      isFrench: false,
      addNewTemplateFormDialog: false,
      addNewTemplateFormName: '',
      addNewTemplateFormURL: '',
      addNewRecipientFormDialog: false,
      addNewRecipientFormFirstName: '',
      addNewRecipientFormLastName: '',
      addNewRecipientFormName: '',
      addNewRecipientFormEmail: '',
      disableTab: true,
      postEsignRequestData: {},
      contactLoaded: false,
      contactList: [],
      contactListSearch: [],
      contactListSearchText: '',
      disableSearch: false,
      loadingContactList: [],
      contactListResultsFound: false,
      selectedRecipientList: [],
      contactIsSet: [],
      selectedRecipient: {},
      selectedParty: '',
      documentText: '',
      parties: [],
      toggleLoading: false,
      toggleRecipientLoading: true,
      newRecipientIndex: 0,
    }
  },
  computed: {
    disableNext() {
      if (this.templateSelected === false) return true
      else if (this.curentTab === 1) {
        if (this.toggleRecipientLoading === true) return true
        if (this.contactIsSet.some((item) => item === false)) return true
      } else if (this.curentTab === 2 && this.subject === '') return true
      return false
    },
  },
  watch: {
    contactListSearch(val) {
      console.log(val)
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
    selectedRecipientList(val) {
      console.log(val)
    },
  },
  mounted() {
    this.$eventBus.$on('itemSelected', this.updateSelectedList)
    if (this.$i18n.locale === 'fr') {
      this.isFrench = true
    }
    // const bitpodURL = `${this.$bitpod.getApiUrl()}Contacts`
    // try {
    //   const response = await this.$axios.$get(bitpodURL)
    //   if (response) {
    //     this.contactList = response
    //   }
    // } catch (err) {
    //   this.snackbar = true
    //   this.snackbarText = 'Failed to load contacts.'
    //   console.error(err)
    // }
  },
  beforeDestroy() {
    this.$eventBus.$off('itemSelected')
  },
  methods: {
    onPrev() {
      this.curentTab--
      document.getElementsByClassName('invite-inner')[0].scrollTop = 0
    },
    onNext() {
      this.curentTab++
      document.getElementsByClassName('invite-inner')[0].scrollTop = 0
    },
    updateSelectedList(data) {
      if (data.viewName === 'Contacts') {
        this.selectedList = [...data.items]
      }
    },
    updateSelectedListInput(index) {
      console.log(this.selectedList[index], this.selectedListNewContacts[index])
      if (this.selectedListNewContacts[index]) {
        this.selectedRecipientList.push(this.selectedListNewContacts[index])
        this.$set(this.selectedList, index, {
          ...this.selectedList[index],
          FullName: this.selectedListNewContacts[index].FullName,
          Email: this.selectedListNewContacts[index].Email,
        })
        this.$set(this.contactIsSet, index, true)
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
      this.choosedTemplate = 0
      this.curentTab = 0
      this.templateSelected = false
      this.disableButton = false
    },
    async sendNow() {
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
      }
      console.log(this.postEsignRequestData)
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNREQUESTS/createESignRequest`
      try {
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
    chooseTemplate(index) {
      switch (index) {
        case 1:
          this.choosedTemplate = 0
          this.addNewTemplateFormDialog = true
          break
        case 2:
          this.choosedTemplate = 4
          this.getExistingTemplate()
          break
      }
    },
    async handleAddNewTemplateForm() {
      if (
        this.addNewTemplateFormName.length < 2 ||
        this.addNewTemplateFormURL.length < 5
      ) {
        this.snackbar = true
        this.snackbarText = 'Please enter valid input'
      } else {
        const addNewTemplateFormObject = {
          Name: this.addNewTemplateFormName,
          DocumentUrl: this.addNewTemplateFormURL,
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
            this.choosedTemplate = 0
            this.curentTab = 1
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
          const signObject = {
            ...this.selectedList[this.newRecipientIndex],
            FullName: response.FullName,
            Email: response.Email,
          }
          this.contactList.push(signObject)
          this.$set(
            this.selectedListNewContacts,
            this.newRecipientIndex,
            signObject
          )
          this.$set(this.selectedList, this.newRecipientIndex, signObject)
          this.$set(this.contactIsSet, this.newRecipientIndex, true)
          this.selectedRecipientList.push(signObject)
          this.addNewRecipientFormFirstName = ''
          this.addNewRecipientFormLastName = ''
          this.addNewRecipientFormEmail = ''
          this.selectedParty = ''
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = 'Request Failed'
        this.addNewRecipientFormFirstName = ''
        this.addNewRecipientFormLastName = ''
        this.addNewRecipientFormEmail = ''
        this.selectedParty = ''
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
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES`
      try {
        const response = await this.$axios.$get(bitpodURL)
        if (response) {
          this.templateItems = response
          this.choosedTemplate = 2
        }
      } catch (err) {
        console.error(err)
      }
    },
    selectSignTemplate(item) {
      this.toggleRecipientLoading = true
      this.curentTab = 1
      this.choosedTemplate = 0
      this.templateSelected = true
      this.getHTMLTemplate(item.DocumentUrl)
      this.postEsignRequestData = {
        ...this.postEsignRequestData,
        documentId: item.id,
        documentUrl: item.DocumentUrl,
      }
      this.subject = `Signature requested for ${item.Name}`
    },
    async getHTMLTemplate(documentUrl) {
      const regExp = /{{{ESign\.(\w+)[.[\w]+]?}}}/g
      try {
        const res = await this.$axios.get(documentUrl)
        this.documentText = res.data
        const matches = []
        let tempMatch
        while ((tempMatch = regExp.exec(this.documentText)) !== null) {
          matches.push(tempMatch[1])
        }
        this.parties = [...new Set(matches)]
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
        if (this.parties.length <= 0) {
          this.templateSelected = false
          this.curentTab = 0
          this.snackbarText =
            'This template does not contain any signature fields. Kindly choose a different template.'
          this.snackbar = true
        }
        console.log(this.selectedList)
        this.toggleRecipientLoading = false
      } catch (err) {
        console.error(err)
      }
    },
    disabledContactList(index) {
      console.log(this.selectedListNewContacts[index], this.selectedList[index])
      if (this.contactIsSet[index]) return this.selectedRecipientList
      else return this.contactList
    },
    getContacts: _.debounce(async function () {
      if (!this.disableSearch) {
        const filterText = this.contactListSearchText
        const bitpodURL = `${this.$bitpod.getApiUrl()}Contacts?filter={"where":{"FullName":{"like":"${filterText}","options":"i"}}}`
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

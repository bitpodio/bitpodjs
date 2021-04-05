<template>
  <v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <div class="toast py-2 pr-1 pl-3 fs-16">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-dialog v-model="addNewTemplateFormDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            ><i18n path="Common.CreateNewSignatureTemplate"
          /></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="addNewTemplateFormName"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addNewTemplateFormURL"
                  label="Google Document URL*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="addNewTemplateFormDialog = false">
            <i18n path="Drawer.Close" />
          </v-btn>
          <SaveBtn
            color="primary"
            class="sendButtons"
            :reset="toggleLoading"
            :label="this.$t('Drawer.Send')"
            :action="handleAddNewTemplateForm"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addNewRecepientFormDialog" persistent max-width="600px">
      <v-card v-if="addNewRecepientFormPage == 1">
        <v-card-title>
          <span class="headline"><i18n path="Common.AddRecepient" /></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="addNewRecepientFormName"
                  label="Name*"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addNewRecepientFormEmail"
                  label="Email*"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedParty"
                  outlined
                  :items="unselectedParties"
                  :label="this.$t('Common.Party')"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            @click="
              {
                addNewRecepientFormDialog = false
                addNewRecepientFormPage = 0
              }
            "
          >
            <i18n path="Drawer.Close" />
          </v-btn>
          <SaveBtn
            color="primary"
            class="sendButtons"
            :reset="toggleLoading"
            :label="this.$t('Drawer.Send')"
            :action="handleAddNewRecepientForm"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline"><i18n path="Common.SelectRecepient" /></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="selectedRecepient"
                  :items="contactList"
                  :item-text="(item) => `${item.FullName} (${item.Email})`"
                  outlined
                  :label="this.$t('Common.Recepient')"
                  return-object
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedParty"
                  outlined
                  :items="unselectedParties"
                  :label="this.$t('Common.Party')"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="addNewRecepientFormPage = 1"
            ><i18n path="Common.NewRecepient"
          /></v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed @click="addNewRecepientFormDialog = false">
            <i18n path="Drawer.Close" />
          </v-btn>
          <v-btn color="primary" @click="handleSelectRecepient">
            <i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
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
                <i18n path="Common.Recepients" />
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
                          class="ma-3 ml-0 mt-0"
                          :class="{ 'on-hover': hover }"
                          height="250"
                          width="250"
                        >
                          <div class="pa-1">
                            <v-img
                              :src="$config.cdnUri + 'new-invitee-image.png'"
                              class="grey lighten-2"
                              min-height="200"
                              max-height="200"
                            >
                            </v-img>
                          </div>
                          <div
                            class="text-truncate text-center text-capitalize text-h5 pb-5"
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
                            outlined
                            color="primary"
                            @click="selectSignTemplate(item)"
                            ><i18n path="Common.Select"
                          /></v-btn>
                          <v-btn
                            class="ma-2"
                            outlined
                            color="primary"
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
                    <i18n path="Common.SelectRecepients" />
                  </p>
                </v-card>
                <v-row>
                  <v-col class="contactsGrid col-12">
                    <div class="borderBottomGrey pb-1">
                      <v-layout class="pl-3 mb-n1" row justify-space-between>
                        <div>
                          <v-icon class="pb-1" size="18"
                            >mdi-email-outline</v-icon
                          >
                          <h4 class="d-inline body-1">
                            <i18n path="Common.Recepients" />
                          </h4>
                        </div>
                        <v-btn text small @click="addRecepientFormOpen">
                          <v-icon size="18">mdi-plus</v-icon>
                          <i18n path="Common.New" />
                        </v-btn>
                      </v-layout>
                    </div>
                    <div>
                      <div
                        v-for="item in selectedList"
                        :key="item.id"
                        class="borderBottomGrey py-2 pl-2"
                      >
                        <v-btn
                          class="float-right fc-icon"
                          text
                          small
                          @click="unselectContact(item)"
                        >
                          <i class="fa fa-trash fs-16" aria-hidden="true"></i>
                        </v-btn>
                        {{ item.type }} - {{ item.FullName }} ({{ item.Email }})
                      </div>
                    </div>
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
                          <v-text-field
                            v-model="message"
                            :label="$t('Common.Message')"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-icon class="amber--text">fa-bulb</v-icon>
                          <v-card-text class="d-inline pa-0">
                            {{
                              $t('Common.YouMayReferInviteMembers', {
                                contactTemplateData:
                                  ' ${Registration.FirstName} ${Registration.LastName} ${OrganizationInfo.Name}',
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
                          <i18n path="Common.RecepientDetail" />
                        </h4>
                      </v-flex>
                    </div>
                    <div
                      v-for="item in selectedList"
                      :key="item.Email"
                      class="borderBottomGrey py-2 pl-2"
                    >
                      <v-btn
                        class="float-right fc-icon"
                        text
                        small
                        @click="unselectContact(item)"
                      >
                        <i class="fa fa-trash fs-16" aria-hidden="true"></i>
                      </v-btn>
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
      addNewRecepientFormDialog: false,
      addNewRecepientFormPage: 0,
      addNewRecepientFormName: '',
      addNewRecepientFormEmail: '',
      disableTab: true,
      postEsignRequestData: {},
      contactLoaded: false,
      contactList: [],
      selectedRecepient: {},
      selectedParty: '',
      documentText: '',
      parties: [],
      unselectedParties: [],
      toggleLoading: false,
    }
  },
  computed: {
    disableNext() {
      if (this.templateSelected === false) return true
      else if (
        this.curentTab === 1 &&
        this.selectedList.length < this.parties.length
      )
        return true
      else if (this.curentTab === 2 && this.subject === '') return true
      return false
    },
  },
  async mounted() {
    this.$eventBus.$on('itemSelected', this.updateSelectedList)
    if (this.$i18n.locale === 'fr') {
      this.isFrench = true
    }
    const bitpodURL = `${this.$bitpod.getApiUrl()}Contacts`
    try {
      const response = await this.$axios.$get(bitpodURL)
      if (response) {
        this.contactList = response
      }
    } catch (err) {
      this.snackbar = true
      this.snackbarText = 'Failed to load contacts.'
      console.error(err)
    }
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
    resetForm() {
      this.$emit('update:newTemplateDialog', false)
      this.selectedList = []
      this.choosedTemplate = 0
      this.curentTab = 0
      this.templateSelected = false
      this.disableButton = false
    },
    unselectContact(unselectedItem) {
      this.selectedList = this.selectedList.filter((item) => {
        if (unselectedItem.id === item.id) {
          this.unselectedParties.push(item.type)
          return false
        }
        return true
      })
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
        this.getHTMLTemplate(this.addNewTemplateFormURL)
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
    async handleAddNewRecepientForm() {
      if (
        this.addNewRecepientFormName.length < 2 ||
        this.addNewRecepientFormEmail.length < 5 ||
        this.selectedParty === ''
      ) {
        this.snackbar = true
        this.snackbarText = 'Please fill out all fields'
        this.toggleLoading = !this.toggleLoading
        return
      }
      const addNewRecepientFormObject = {
        FullName: this.addNewRecepientFormName,
        Email: this.addNewRecepientFormEmail,
      }
      const bitpodURL = `${this.$bitpod.getApiUrl()}/Contacts`
      try {
        const response = await this.$axios.$post(
          bitpodURL,
          addNewRecepientFormObject
        )
        if (response) {
          this.selectedList.push({ ...response, type: this.selectedParty })
          this.unselectedParties = this.unselectedParties.filter(
            (item) => item.type !== this.selectedParty
          )
          this.addNewRecepientFormName = ''
          this.addNewRecepientFormEmail = ''
          this.selectedParty = ''
          this.addNewRecepientFormPage = 0
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = 'Request Failed'
        console.error(err)
      }
      this.toggleLoading = !this.toggleLoading
      this.addNewRecepientFormDialog = false
    },
    handleSelectRecepient() {
      if (
        Object.keys(this.selectedRecepient).length === 0 ||
        this.selectedParty === ''
      ) {
        this.snackbar = true
        this.snackbarText = 'Please fill all fields'
        return
      }
      let isPresent = false
      for (const item of this.selectedList) {
        if (item.id === this.selectedRecepient.id) {
          isPresent = true
        }
      }
      if (!isPresent) {
        this.selectedList.push({
          ...this.selectedRecepient,
          type: this.selectedParty,
        })
        this.unselectedParties = this.unselectedParties.filter(
          (item) => this.selectedParty !== item
        )
        this.selectedRecepient = {}
        this.selectedParty = ''
        this.addNewRecepientFormDialog = false
      } else {
        this.snackbar = true
        this.snackbarText = 'This recepient has already been selected'
      }
    },
    addRecepientFormOpen() {
      if (this.unselectedParties.length === 0) {
        this.snackbar = true
        this.snackbarText = 'All parties have been assigned'
        return
      }
      this.addNewRecepientFormDialog = true
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
      const regExp = /{{ESign\.(\w+)}}/g
      try {
        const res = await this.$axios.get(documentUrl)
        this.documentText = res.data
        const matches = []
        let tempMatch
        while ((tempMatch = regExp.exec(this.documentText)) !== null) {
          matches.push(tempMatch[1])
        }
        this.parties = [...new Set(matches)]
        this.unselectedParties = this.parties
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
<style scoped>
.contactsGrid {
  padding-right: 12px;
}

.contactsGrid:hover {
  padding-right: 6px;
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

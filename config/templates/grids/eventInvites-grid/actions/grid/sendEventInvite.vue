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
              <i18n path="Common.NewEmailInvite" />
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
              <v-tab :disabled="invalid" class="px-0 mr-4"
                ><i18n path="Common.Contacts"
              /></v-tab>
              <v-tab :disabled="invalid" class="px-0 mr-4"
                ><i18n path="Common.Verify"
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
                                invalid = !subject || !sender || !setReplyTo
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
                                invalid = !subject || !sender || !setReplyTo
                                return v ? true : 'This field is required'
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
                                return v ? true : 'This field is required'
                              },
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-icon class="amber--text">fa-bulb</v-icon>
                          <v-card-text class="d-inline pa-0">
                            <i18n path="Common.YouMayReferInviteMembers"
                          /></v-card-text>
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card v-if="choosedTemplate === 0" flat>
                  <p class="mt-4 mb-3">
                    <i18n path="Common.PredesignedTemplate" />
                  </p>
                  <div class="pr-3 pt-1 tabContent">
                    <v-row>
                      <v-col
                        class="pl-4 templateTile"
                        cols="4"
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
                            <i18n path="Common.MyTemplates" />
                          </h3>
                          <i18n
                            path="Common.SaveTemplates"
                            class="Caption mb-4"
                          />
                        </v-card>
                      </v-col>

                      <v-col
                        class="pl-5 templateTile"
                        cols="4"
                        @click="chooseTemplate(2)"
                      >
                        <v-card
                          height="230"
                          align="center"
                          justify="center"
                          class="tileCard cursorPointer pa-2"
                        >
                          <v-icon class="py-5" size="48">fa-news</v-icon>
                          <h3
                            class="text-h5 my-2"
                            style="font-size: 18px !important;"
                          >
                            <i18n path="Common.PreDesignedTemplates" />
                          </h3>
                          <div class="Caption mb-4">
                            <i18n path="Common.ReadyToUseTemplates" />
                          </div>
                        </v-card>
                      </v-col>

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
                            <i18n path="Common.RichTextEditor" />
                          </h3>
                          <div class="Caption mb-4">
                            <i18n path="Common.UseEditor" />
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
                              templateObject = { ...item }
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
                                  : $config.cdnUri + 'invitee-image.png'
                              )
                            "
                            ><i18n path="Drawer.View"
                          /></v-btn>
                        </div>
                        <div class="text-truncate text-center text-capitalize">
                          {{ item.Name }}
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
                        templateObject = ''
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
              <v-tab-item class="tabContent">
                <v-card flat>
                  <p class="mt-5 mb-4">
                    <i18n path="Common.SelectContacts" />
                  </p>
                </v-card>
                <v-row>
                  <v-col cols="6" class="contactsGrid">
                    <div class="borderBottomGrey pb-1">
                      <v-checkbox
                        v-model="selectAll"
                        class="ma-0 pa-0 float-right"
                        :label="$t('Common.SelectAll')"
                      >
                      </v-checkbox>
                      <v-icon size="18" class="mr-1">fa-address-book-o</v-icon>
                      <h4 class="d-inline body-1">
                        <i18n path="Common.Contacts" />
                      </h4>
                    </div>
                    <div v-if="dialog" class="borderRightGrey pr-3 mr-n3">
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
                      <v-icon size="18">mdi-email-outline</v-icon>
                      <h4 class="d-inline body-1">
                        <i18n path="Common.InviteesList" />
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
                    <div class="borderBottomGrey pb-1 mb-3">
                      <v-icon>mdi-filter-outline</v-icon>
                      <h4 class="d-inline body-1">
                        <i18n path="Common.AdvanceFilters" />
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
                        <i18n path="Drawer.Reset" />
                      </v-btn>
                    </div>
                    <h4 class="body-1">
                      <i18n path="Common.CheckPriorRegistrations" />
                    </h4>
                    <v-flex class="d-flex">
                      <h4 class="body-1 mr-3 mt-1">
                        <i18n path="Common.SendToThoseWhoHave" />
                      </h4>
                      <v-radio-group
                        v-model="registrationRadio"
                        row
                        :mandatory="false"
                        class="mt-0"
                      >
                        <v-radio
                          :label="$t('Common.NotRegistered')"
                          value="NotRegister"
                        ></v-radio>
                        <v-radio
                          :label="$t('Common.Registered')"
                          value="Register"
                        ></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <h4 class="d-inline body-1">
                      <i18n path="Common.CheckPriorInvite" />
                    </h4>
                    <h4
                      class="blue--text d-inline cursorPointer"
                      @click="previousInviteDialog = true"
                    >
                      {{ !!priorInvite.id ? priorInvite.Title : 'Click here' }}
                    </h4>
                    <h4 class="d-inline body-1">
                      {{
                        !!priorInvite.id
                          ? ' - ' +
                            new Date(priorInvite.createdDate).toDateString()
                          : 'to select one of the prior invite'
                      }}
                      )
                    </h4>
                    <v-flex class="d-flex">
                      <h4 class="body-1 mr-3 mt-1">
                        <i18n path="Common.SendToThoseWhoHave" />
                      </h4>
                      <v-radio-group
                        v-model="openRadio"
                        row
                        :mandatory="false"
                        class="mt-0"
                        :disabled="!priorInvite.id"
                      >
                        <v-radio
                          :label="$t('Common.NotOpened')"
                          value="NotRead"
                        ></v-radio>
                        <v-radio
                          :label="$t('Common.Opened')"
                          value="Read"
                        ></v-radio>
                        <v-radio
                          :label="$t('Common.OpenedClicked')"
                          value="clicked"
                        ></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-row v-if="acknowledgement" class="ma-1">
                  <v-col cols="12" class="px-0 mb-4">
                    <v-card align="center" justify="center" class="pb-3">
                      <h3 class="text-h5 ma-2 pt-5">
                        <i18n path="Common.SubmittingEmailInvite" />
                      </h3>
                      <h5 class="body-2 ma-2 py-3">
                        <i18n path="Common.IfApprovalIsTurned" />
                      </h5>
                      <v-btn depressed color="primary" @click="resetForm"
                        ><i18n path="Drawer.Close"
                      /></v-btn>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else-if="scheduleInvite" class="ma-3 ml-0">
                  <v-col cols="5" style="max-width: 300px;" class="pl-0">
                    <v-card align="center" justify="center" class="pb-10">
                      <v-icon class="py-2 pt-7" size="48">fa-calendar</v-icon>
                      <h3
                        class="text-h5 my-2"
                        style="font-size: 20px !important;"
                      >
                        <i18n path="Common.FixedTimeAndTimeZone" />
                      </h3>
                      <h5 class="body-2 ma-2 mb-5">
                        <i18n path="Common.LaunchYourInvite" />
                      </h5>
                      <div style="width: 200px;">
                        <v-datetime-picker
                          v-model="scheduledTime"
                          :label="$t('Common.ScheduleDate')"
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
                        color="primary"
                        depressed
                        :disabled="
                          disableButton || !scheduledTime || !validDate
                        "
                        @click="sendNow('Schedule')"
                        ><i18n path="Drawer.Schedule"
                      /></v-btn>
                      <v-btn
                        class="ml-1"
                        color="grey lighten-2"
                        depressed
                        :disabled="disableButton"
                        @click="scheduleInvite = false"
                        ><i18n path="Drawer.Cancel"
                      /></v-btn>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row
                  v-else-if="!selectedList.length && !selectAll"
                  class="ma-3 ml-0 mb-6"
                >
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="body-1 py-2">
                      <i18n path="Common.NotAddedContact" />
                    </h4>
                    <v-flex class="d-flex">
                      <h5 class="body-2 mt-2 mr-2">
                        <i18n path="Common.Logout" />
                      </h5>
                      <v-btn color="blue" outlined @click="curentTab = 2"
                        ><i18n path="Common.SelectContact"
                      /></v-btn>
                    </v-flex>
                  </v-col>
                </v-row>
                <v-row v-else-if="!RTEValue" class="ma-3 ml-0 mb-6">
                  <v-col cols="12" class="red lighten-5">
                    <h4 class="body-1 py-2">
                      <i18n path="Common.ContactDetails" />
                    </h4>
                    <v-flex class="d-flex">
                      <h5 class="body-2 mt-2 mr-2">
                        <i18n path="Common.NotAddedContent" />
                      </h5>
                      <v-btn color="blue" outlined @click="curentTab = 1"
                        ><i18n path="Common.SelectContent"
                      /></v-btn>
                    </v-flex>
                  </v-col>
                </v-row>
                <v-row v-else class="ma-1 my-3">
                  <v-col class="templateverify pl-0" cols="4">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-2 pt-7" size="48">fa-mail</v-icon>
                      <h3
                        class="text-h5 my-2"
                        style="font-size: 20px !important;"
                      >
                        <i18n path="Common.SendNow" />
                      </h3>
                      <h5 class="body-2 my-2 mb-5">
                        <i18n path="Common.SendEmailInviteRightaway" />
                      </h5>
                      <v-btn
                        depressed
                        color="primary"
                        :disabled="disableButton"
                        @click="sendNow"
                        ><i18n path="Drawer.Send"
                      /></v-btn>
                    </v-card>
                  </v-col>
                  <v-col cols="4" class="templateverify">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-2 pt-7" size="48">fa-calendar</v-icon>
                      <h3
                        class="text-h5 my-2"
                        style="font-size: 20px !important;"
                      >
                        <i18n path="Common.ScheduleInvite" />
                      </h3>
                      <h5 class="body-2 my-2 mb-5">
                        <i18n path="Common.ScheduleInviteWayYouPrefer" />
                      </h5>
                      <v-btn
                        depressed
                        color="primary"
                        :disabled="disableButton"
                        @click="scheduleInvite = true"
                        ><i18n path="Drawer.Schedule"
                      /></v-btn>
                    </v-card>
                  </v-col>
                  <v-col cols="4" class="templateverify">
                    <v-card height="250" align="center" justify="center">
                      <v-icon class="py-2 pt-7" size="48">fa-save</v-icon>
                      <h3
                        class="text-h5 my-2"
                        style="font-size: 20px !important;"
                      >
                        <i18n path="Common.SaveAsDraft" />
                      </h3>
                      <h5 class="body-2 my-2 mb-5">
                        <i18n path="Common.SaveEmailAsDraft" />
                      </h5>
                      <v-btn
                        depressed
                        color="primary"
                        :disabled="disableButton"
                        @click="sendNow('Draft')"
                        ><i18n path="Common.SaveAsDraft"
                      /></v-btn>
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
                        <v-btn class="ml-10" text small @click="curentTab = 0">
                          <v-icon dark left>mdi-pencil</v-icon>
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
                          <i18n path="Common.ContactDetail" />
                        </h4>
                      </v-flex>
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
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn v-if="curentTab > 0" depressed @click="curentTab--"
              ><i18n path="Drawer.Prev"
            /></v-btn>
            <v-btn
              v-if="curentTab < 3"
              color="primary"
              depressed
              @click="curentTab++"
              ><i18n path="Drawer.Next"
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
    <v-dialog v-model="previousInviteDialog" width="600px">
      <v-card>
        <v-card-title class="d-flex align-start px-2 pl-4">
          <h2 class="black--text pt-0 pb-0 text-h5">
            <i18n path="Common.SelectPriorInvite" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="previousInviteDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-container class="pt-12 px-4">
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
  },
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
      invalid: true,
      templateObject: '',
    }
  },
  computed: {
    dropdownOptions() {
      return this.template !== 'General Template'
        ? {
            'Event Name': 'Event Name',
            Description: 'Description',
            'Start Date': 'Start Date',
            'End Date': 'End Date',
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
            'Contact First Name': 'Contact First Name',
            'Contact Last Name': 'Contact Last Name',
            'Contact Email': 'Contact Email',
            Register: 'Register',
            Logo: 'Logo',
          }
        : {
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
            'Contact First Name': 'Contact First Name',
            'Contact Last Name': 'Contact Last Name',
            'Contact Email': 'Contact Email',
            Logo: 'Logo',
          }
    },
  },
  watch: {
    curentTab(newVal, oldVal) {
      if (oldVal === 0) {
        this.$refs.form.validate()
        if (!this.subject || !this.setReplyTo || !this.sender) {
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
      this.scheduledTime = ''
      this.scheduleInvite = false
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
      const url = this.$bitpod.getApiUrl()
      this.disableButton = true
      const exceptionURL = `${url}CRMACTIVITIES`
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
            const newTemplateData = {
              Body: this.RTEValue,
              Subject: this.subject,
              Type: this.myTemplate,
            }
            if (this.templateObject && this.templateObject.Name) {
              newTemplateData.Name = `${this.templateObject.Name.split(
                '-'
              )[0].trim()} - ${new Date().toLocaleString()}`
              if (this.templateObject.ImageURL) {
                newTemplateData.ImageURL = this.templateObject.ImageURL
              }
            } else {
              newTemplateData.Name = `Custom - ${new Date().toLocaleString()}`
            }
            return this.$axios({
              method: 'POST',
              url: `${this.$bitpod.getApiUrl()}MarketingTemplates`,
              data: newTemplateData,
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
        if (data.Event.EventFind.edges && data.Event.EventFind.edges.length) {
          this.subject = `Join us for ${
            data.Event.EventFind.edges[0].node.Title
          } | ${new Date().toDateString()}`
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
              Type: this.myTemplate,
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
              Type: this.template,
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
<style scoped>
.invite-inner {
  height: calc(100vh - 100px);
}
</style>

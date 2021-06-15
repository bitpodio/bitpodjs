<template>
  <v-flex>
    <v-snackbar v-model="snackbar" :top="true" :timeout="3000">
      <div class="toast py-2 pr-1 pl-3 fs-16">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-dialog v-model="emptyDataFieldDialog" persistent max-width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.DataFieldEmpty" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="emptyDataFieldDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12">
              <i18n path="Common.DataFieldEmptyMessage" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            class="sendButtons"
            depressed
            @click="
              emptyDataFieldDialog = false
              currentTab++
            "
            ><i18n path="Common.Yes"
          /></v-btn>
          <v-btn
            color="primary"
            depressed
            class="sendButtons"
            @click="emptyDataFieldDialog = false"
            ><i18n path="Common.No"
          /></v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="deleteTemplateDialog" persistent max-width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.DeleteTemplate" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="deleteTemplateDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-row>
            <v-col cols="12">
              <i18n path="Messages.Warn.DeleteTemplate" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn depressed class="sendButtons" @click="deleteTemplate">
            <v-progress-circular
              v-if="deleteTemplateLoading"
              :size="24"
              :width="2"
              indeterminate
            ></v-progress-circular>
            <i18n v-else path="Common.Yes"
          /></v-btn>
          <v-btn
            color="primary"
            depressed
            class="sendButtons ml-2"
            @click="deleteTemplateDialog = false"
            ><i18n path="Common.No"
          /></v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="editTemplateDialog" persistent max-width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.EditTemplate" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="editTemplateDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="editTemplateForm" v-model="editTemplateFormValid">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="editTemplateFormName"
                  :label="$t('Common.Name')"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="editTemplateFormURL"
                  label="Google Document URL*"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="editTemplateFormCategory"
                  :label="$t('Common.Category')"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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
            :action="editTemplate"
          ></SaveBtn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="addNewTemplateFormDialog" persistent max-width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewTemplate" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="addNewTemplateFormDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="newTemplateForm" v-model="addNewTemplateFormValid">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewTemplateFormName"
                  :label="$t('Common.Name')"
                  :rules="[rules.required]"
                  outlined
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewTemplateFormURL"
                  label="Google Document URL*"
                  :rules="[rules.required]"
                  outlined
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewTemplateFormCategory"
                  :label="$t('Common.Category')"
                  :rules="[rules.required]"
                  outlined
                  required
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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
    <v-dialog v-model="addNewRecipientFormDialog" persistent width="600px">
      <v-sheet>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.NewContact" />
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
          <v-form ref="newRecipientForm" v-model="addNewRecipientFormValid">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewRecipientFormFirstName"
                  :rules="[rules.required]"
                  :label="$t('Common.FirstName')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewRecipientFormLastName"
                  :rules="[rules.required]"
                  :label="$t('Common.LastName')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="addNewRecipientFormEmail"
                  :rules="[rules.required, rules.email]"
                  :label="$t('Common.EnterEmail')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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
        <v-card class="invite-form overflow-x-hidden">
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-0 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-4 pb-2 text-h5">
              <i18n path="Common.NewESignatureDocument" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="resetForm">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-row
              :class="{
                'ml-0 justify-space-between max-width-full':
                  currentTab === 1 && !$vuetify.breakpoint.smAndDown,
              }"
            >
              <v-col
                :class="{
                  'col-7': currentTab === 1 && !$vuetify.breakpoint.smAndDown,
                }"
              >
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
              </v-col>
              <v-col
                v-if="currentTab === 1 && !$vuetify.breakpoint.smAndDown"
                class="greybg col-4 data-tab-subheading max-width-400"
              >
                <v-tabs height="36" class="greybg ml-8">
                  <v-tab class="px-0 mr-4 greybg">
                    <i18n path="Common.Fields" />
                  </v-tab>
                </v-tabs>
              </v-col>
            </v-row>
            <div
              :class="{
                'body-1 px-2 py-0': true,
                'pr-0': currentTab === 1 && !$vuetify.breakpoint.smAndDown,
              }"
              style="width: 100%;"
            >
              <div
                v-if="!templateLoading && currentTab === 0"
                class="d-flex align-center"
              >
                <i18n
                  class="body-2 mr-2"
                  path="Common.NewTemplateInformation"
                />
                <v-btn
                  text
                  small
                  color="primary"
                  class="py-0"
                  @click="addTemplateFormOpen"
                  ><v-icon small>mdi-plus</v-icon
                  ><i18n path="Common.NewTemplate"
                /></v-btn>
              </div>
              <div v-else-if="currentTab === 1">
                <v-row
                  :class="{
                    'ml-0 justify-space-between max-width-full':
                      currentTab === 1 && !$vuetify.breakpoint.smAndDown,
                  }"
                >
                  <v-col class="col-12 col-md-8">
                    <i18n class="body-2" path="Common.FillTemplateData" />
                  </v-col>
                  <v-col
                    v-if="!$vuetify.breakpoint.smAndDown"
                    class="col-12 col-md-4 greybg mx-0 max-width-400"
                  >
                    <i18n
                      class="body-2 pl-8"
                      path="Common.FillTemplateFields"
                    />
                  </v-col>
                </v-row>
              </div>
              <div v-else-if="currentTab === 2">
                <i18n class="body-2" path="Common.SelectRecipients" />
              </div>
              <div v-else-if="currentTab === 3">
                <i18n class="body-2" path="Common.SignatureBasicInformation" />
              </div>
            </div>
          </v-card-title>
          <v-card-text
            :class="{
              'pt-0 invite-inner': true,
              'px-xs-2 px-md-10 px-lg-10 px-xl-15 ':
                currentTab !== 1 || $vuetify.breakpoint.smAndDown,
              'pl-xs-2 pl-md-10 pl-lg-10 pl-xl-15 pr-3 mb-n5 overflow-y-hidden':
                currentTab === 1 && !$vuetify.breakpoint.smAndDown,
            }"
          >
            <v-tabs-items v-model="currentTab" style="height: 100%;">
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
                  <v-flex
                    class="d-flex flex-wrap pl-0 justify-center justify-md-start mt-4 pt-4"
                  >
                    <v-row class="ma-0">
                      <v-col
                        v-for="item in templateItems"
                        :key="item.id"
                        class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
                      >
                        <v-card
                          class="elevation-0 pa-0 greybg"
                          @click="selectSignTemplate(item)"
                        >
                          <div class="positionRelative">
                            <div class="overflow-h rounded-t">
                              <v-flex
                                class="tile-img tile-pattern rounded-0"
                                :style="{
                                  'background-image': getRandomImage(item.Name),
                                }"
                              ></v-flex>
                            </div>
                          </div>
                          <v-flex class="tile-info pa-4 pb-0">
                            <div
                              class="text--secondary pa-2 pb-0 body-2 pl-0 pt-0"
                            >
                              {{
                                $d(
                                  new Date(item.createdDate),
                                  'long',
                                  $i18n.locale
                                )
                              }}
                            </div>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-card-title
                                  class="text-h5 grey--text text--darken-4 text-truncate d-block text-capitalize pa-2 pt-0 pb-1 pl-0"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  {{ item.Name }}
                                </v-card-title>
                              </template>
                              <span>{{ item.Name }}</span>
                            </v-tooltip>
                          </v-flex>
                          <v-card-actions class="pt-0 pl-6 tiles-action">
                            <div class="text-truncate d-block">
                              {{ item.createdBy }}
                            </div>
                            <v-spacer></v-spacer>
                            <v-menu
                              offset-y
                              left
                              bottom
                              transition="slide-y-transition"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn icon small v-bind="attrs" v-on="on">
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>

                              <v-list dense>
                                <v-list-item
                                  @click="editTemplateFormOpen(item)"
                                >
                                  <v-list-item-icon class="mr-2">
                                    <i
                                      class="fa fa-pencil-square-o mt-1"
                                      aria-hidden="true"
                                    ></i>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      ><i18n path="Drawer.Edit"
                                    /></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                  @click="
                                    deleteTemplateDialog = true
                                    deleteTemplateId = item.id
                                  "
                                >
                                  <v-list-item-icon class="mr-2">
                                    <i
                                      class="fa fa-trash mt-1"
                                      aria-hidden="true"
                                    ></i>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      ><i18n path="Drawer.Delete"
                                    /></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-flex>
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent" style="height: inherit;">
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
                <v-card v-else flat style="height: inherit;">
                  <v-row
                    :class="{
                      'justify-space-between': !$vuetify.breakpoint.smAndDown,
                    }"
                    style="height: inherit;"
                  >
                    <v-col
                      v-if="currentTab === 1"
                      id="html-scroll-container"
                      :class="{
                        'col-12 col-md-8 overflow-hover': true,
                      }"
                      style="height: inherit;"
                    >
                      <div
                        class="html-preview-container"
                        v-html="resolvedDocumentText"
                      ></div>
                    </v-col>
                    <v-col
                      :class="{
                        'col-12 col-md-4 mx-0 px-8 pt-8 overflow-hover greybg': true,
                        'max-width-400': !$vuetify.breakpoint.smAndDown,
                      }"
                      :order="$vuetify.breakpoint.smAndDown ? 'first' : 'last'"
                      style="height: inherit;"
                    >
                      <v-text-field
                        v-for="item in dataFields"
                        :key="item.id"
                        outlined
                        dense
                        :label="item.Name"
                        :value="getHandlebarsObjectValue(item.Name)"
                        @focus="handleDataFieldFocus(item.Name)"
                        @blur="handleDataFieldBlur(item.Name)"
                        @input="updateNestedObject(item.Name, $event, item.id)"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item class="tabContent">
                <v-row>
                  <v-col class="contactsGrid col-12">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left pl-4">
                              <i18n path="Common.RecipientType" />
                            </th>
                            <th class="text-left pl-4 mxw-150">
                              <i18n path="Common.Contact" />
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
                                <span><i18n path="Common.NewContact" /></span>
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
                  <div class="pr-3 pt-1">
                    <v-form v-model="emailInfoValid">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="subject"
                            :label="$t('Common.Subject')"
                            :rules="[rules.required]"
                            required
                            outlined
                            dense
                          >
                            <template v-slot:prepend-inner>
                              <i18n
                                class="signature-requested-subject"
                                path="Common.SignatureRequestedSubject"
                              />
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="senderName"
                            :label="$t('Common.SenderName')"
                            :rules="[rules.required]"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="sender"
                            :label="$t('Common.SenderRequired')"
                            :rules="[rules.required, rules.email]"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="setReplyTo"
                            :label="$t('Common.SetReply')"
                            :rules="[rules.required, rules.email]"
                            outlined
                            dense
                          ></v-text-field>
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
                        :disabled="!expirationDateFormValid"
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
                        <v-btn class="ml-10" text small @click="currentTab = 3">
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
                    <div><i18n path="Common.TitleCaption" /></div>
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
                  <v-col cols="12" class="pl-0">
                    <div class="borderBottomGrey pb-1">
                      <v-flex class="d-flex">
                        <v-icon size="18" class="mr-1"
                          >mdi-application-cog</v-icon
                        >
                        <h4 class="mt-1 body-1">
                          <i18n path="Common.OptionsCaption" />
                        </h4>
                      </v-flex>
                    </div>
                    <div class="my-2 py-2 pl-2">
                      <v-form v-model="expirationDateFormValid">
                        <v-row>
                          <v-col class="col-6 col-sm-4 col-lg-3 pl-0">
                            <CustomDate
                              v-model="requestExpiryDate"
                              :field="expiryDateField"
                              :label="$t('Common.StartD')"
                              :rules="expiryDateFieldRule()"
                              type="date"
                            />
                          </v-col>
                          <v-col class="col-4 col-sm-3 col-lg-2 pl-0">
                            <v-text-field
                              v-model="daysLeftForRequest"
                              :rules="[
                                rules.negativeNumberRules,
                                rules.required,
                              ]"
                              outlined
                              required
                              dense
                              label="Days Left"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
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
import { addDays, differenceInDays } from 'date-fns'
import CustomDate from '~/components/common/form/date.vue'
import SaveBtn from '~/components/common/saveButton'
import { configLoaderMixin } from '~/utility'
import { rules } from '~/utility/rules.js'

export default {
  components: {
    SaveBtn,
    CustomDate,
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
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      isFrench: false,
      currentTab: 0,
      toggleLoading: false,
      subject: '',
      senderName: (this.$auth && this.$auth.user.data.name) || '',
      sender: (this.$auth && this.$auth.user.data.email) || '',
      setReplyTo: (this.$auth && this.$auth.user.data.email) || '',
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
      dataFieldFocused: false,
      handlebarsDataObject: {},
      handlebarsDataIsSet: [],
      emptyDataFieldDialog: false,
      editTemplateDialog: false,
      editTemplateId: '',
      editTemplateFormName: '',
      editTemplateFormURL: '',
      editTemplateFormCategory: '',
      deleteTemplateDialog: false,
      deleteTemplateId: '',
      deleteTemplateLoading: false,
      requestExpiryDate: addDays(new Date(), 30),
      daysLeftForRequest: 30,
      rules: rules(this.$i18n),
      emailInfoValid: false,
      editTemplateFormValid: false,
      addNewTemplateFormValid: false,
      addNewRecipientFormValid: false,
      expirationDateFormValid: false,
    }
  },
  computed: {
    disableNext() {
      if (this.templateSelected === false) return true
      else if (this.currentTab === 1) {
        if (this.documentTextLoading) return true
      } else if (this.currentTab === 2) {
        if (
          this.toggleRecipientLoading === true ||
          this.contactIsSet.some((item) => item === false)
        )
          return true
      } else if (this.currentTab === 3 && !this.emailInfoValid) return true
      return false
    },
    expiryDateField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: this.$t('Common.ExpiresOn'),
        type: 'date',
      }
    },
  },
  watch: {
    contactListSearch(val) {
      for (const [index, item] of val.entries()) {
        if (item && item.length > 3 && item !== this.contactListSearchText) {
          this.contactListResultsFound = false
          this.contactListSearchText = item
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
    daysLeftForRequest(val) {
      if (/^\d*[0-9]\d*$/.test(val)) {
        this.requestExpiryDate = addDays(new Date(), val)
          .toISOString()
          .substr(0, 10)
      }
    },
    requestExpiryDate(val) {
      const dateToday = new Date().toISOString().substr(0, 10)
      this.daysLeftForRequest = differenceInDays(
        new Date(val),
        new Date(dateToday)
      )
    },
  },
  async mounted() {
    if (this.$i18n.locale === 'fr') {
      this.isFrench = true
    }
    if (this.templateName !== '') {
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES/findOne?filter[where][Name]=${
        this.templateName
      }`
      try {
        const response = await this.$axios.$get(bitpodURL)
        if (response) {
          this.selectSignTemplate(response)
        }
        this.getExistingTemplate()
      } catch (err) {
        console.error(
          `Error in eSign-grid/ESignForm.vue in mounted while making a GET call to a built in API to get one template, context: ${bitpodURL}`,
          err
        )
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
      if (
        this.currentTab === 1 &&
        this.handlebarsDataIsSet.some((item) => item === false)
      ) {
        this.emptyDataFieldDialog = true
      } else {
        this.currentTab++
        document.getElementsByClassName('invite-inner')[0].scrollTop = 0
      }
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
          ExpirationDate: this.requestExpiryDate,
          TemplateData: JSON.stringify(this.formatHandlebarsData()),
        }
        const response = await this.$axios.$post(
          bitpodURL,
          this.postEsignRequestData
        )
        if (response) {
          this.$emit('update:newTemplateDialog', false)
          this.refresh()
          this.$eventBus.$emit('eventInvites-grid-refresh', 'eSign')
        }
      } catch (err) {
        console.error(
          `Error in eSign-grid/ESignForm.vue in sendNow while making a POST call to a custom API to create a new eSignature request, context: ${bitpodURL}`,
          err
        )
      }
    },
    async handleAddNewTemplateForm() {
      if (!this.addNewTemplateFormValid) {
        this.snackbar = true
        this.snackbarText = 'Please enter valid input'
        this.toggleLoading = !this.toggleLoading
        return
      }
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
        console.error(
          `Error in eSign-grid/ESignForm.vue in addNewForm while making a POST call to a built in API to create a new eSignature template, context: ${bitpodURL}`,
          err
        )
      }
      this.templateSelected = true
      this.toggleLoading = !this.toggleLoading
      this.subject = this.addNewTemplateFormName
      this.addNewTemplateFormDialog = false
    },
    autocompleteFilter(item, query, itemText) {
      return item.Email.includes(query) || item.FullName.includes(query)
    },
    selectContact(recipientName, recipientEmail, index) {
      const contactObject = {
        ...this.selectedList[index],
        FullName: recipientName,
        Email: recipientEmail,
      }
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
      if (!this.addNewRecipientFormValid) {
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
        console.error(
          `Error in eSign-grid/ESignForm.vue in addNewRecipient while making a POST call to a built in API to create a new contact, context: ${bitpodURL}`,
          err
        )
      }
      this.toggleLoading = !this.toggleLoading
      this.addNewRecipientFormDialog = false
    },
    addTemplateFormOpen() {
      this.addNewTemplateFormDialog = true
      if (this.$refs.newTemplateForm) this.$refs.newTemplateForm.reset()
    },
    editTemplateFormOpen(item) {
      this.editTemplateDialog = true
      if (this.$refs.editTemplateForm)
        this.$refs.editTemplateForm.resetValidation()
      this.editTemplateId = item.id
      this.editTemplateFormName = item.Name
      this.editTemplateFormURL = item.DocumentUrl
      this.editTemplateFormCategory = item.Category
    },
    addRecipientFormOpen(index) {
      this.newRecipientIndex = index
      this.addNewRecipientFormDialog = true
      if (this.$refs.newRecipientForm) this.$refs.newRecipientForm.reset()
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
        console.error(
          `Error in eSign-grid/ESignForm.vue in getExistingTemplate while making a GET call to a built in API to get all templates, context: ${bitpodURL}`,
          err
        )
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
      this.subject = item.Name
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
        for (const item of filteredRecipientList) {
          if (item.FullName && item.Email) {
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
    },
    async getHTMLTemplate(documentUrl) {
      const regExp = /{{{ESign\.(\w+)[.[\w]+]?}}}/g
      this.documentTextLoading = true
      try {
        const res = await this.$axios.get(documentUrl)
        const regexFontUrl = /@import url\('[\S]+'\);/g
        const matches = []
        let filteredDocumentText = res.data.replace(regexFontUrl, '')
        let regexMatch
        while ((regexMatch = regExp.exec(filteredDocumentText)) !== null) {
          matches.push(regexMatch[1])
          filteredDocumentText = filteredDocumentText.replaceAll(
            regexMatch[0],
            ''
          )
        }
        filteredDocumentText = filteredDocumentText.replaceAll('{{', '{{{')
        filteredDocumentText = filteredDocumentText.replaceAll('}}', '}}}')
        this.documentText = filteredDocumentText
        this.compiledDocumentText = handlebars.compile(filteredDocumentText)
        this.prepareHTMLResolutionFields()
        this.documentTextLoading = false
        this.prepareRecipientList(matches)
        this.toggleRecipientLoading = false
      } catch (err) {
        console.error(
          `Error in eSign-grid/ESignForm.vue in getHTMLTemplate while making a GET call to get the HTML code of the URL, context: ${documentUrl}`,
          err
        )
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
    prepareHTMLReplaceValue(path, value) {
      const elementIdentifier = path.replaceAll('.', '-')
      if (this.dataFieldFocused && value === '')
        return `<span class="focus-empty-field ${elementIdentifier}">{{${path}}}</span>`
      else if (this.dataFieldFocused)
        return `<span class="focus-filled-field ${elementIdentifier}">${value}</span>`
      else if (value === '')
        return `<span class="empty-field ${elementIdentifier}">{{${path}}}</span>`
      else
        return `<span class="filled-field ${elementIdentifier}">${value}</span>`
    },
    updateHandlebarsValue(object, path, value) {
      const replaceValue = this.prepareHTMLReplaceValue(path, value)
      _.set(object, path, replaceValue)
    },
    updateNestedObject: _.debounce(function (path, value, index) {
      value = value.trim()
      this.updateHandlebarsValue(this.handlebarsDataObject, path, value)
      if (value === '') {
        this.$set(this.handlebarsDataIsSet, index, false)
      } else {
        this.$set(this.handlebarsDataIsSet, index, true)
      }
      this.compileHandlebarsData()
    }, 200),
    isElementInViewport(el) {
      const rect = el.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    handleDataFieldFocus(path) {
      this.dataFieldFocused = true
      const value = this.getHandlebarsObjectValue(path)
      this.updateHandlebarsValue(this.handlebarsDataObject, path, value)
      const elementIdentifier = path.replaceAll('.', '-')
      const elementArray = document.getElementsByClassName(elementIdentifier)
      const containerElement = document.getElementById('html-scroll-container')
      if (elementArray.length > 0) {
        try {
          let element = elementArray[0]
          let lastHeight = 0
          if (!this.isElementInViewport(element)) {
            let scrollDistance = element.offsetTop
            if (!scrollDistance) {
              while (
                element &&
                !element.parentNode.isEqualNode(containerElement)
              ) {
                if (lastHeight !== element.offsetTop) {
                  lastHeight = element.offsetTop
                  scrollDistance += lastHeight
                }
                element = element.parentElement
              }
            }
            document.getElementById(
              'html-scroll-container'
            ).scrollTop = scrollDistance
          }
        } catch (err) {
          console.error(
            `Error in eSign-grid/ESignForm.vue in handleDataFieldFocus while scrolling to the next field`,
            err
          )
        }
      }
      this.compileHandlebarsData()
    },
    handleDataFieldBlur(path) {
      this.dataFieldFocused = false
      const value = this.getHandlebarsObjectValue(path)
      this.updateHandlebarsValue(this.handlebarsDataObject, path, value)
      this.compileHandlebarsData()
    },
    formatHandlebarsData() {
      const updatedHandlebarsData = {}
      for (const item of this.dataFields) {
        _.set(
          updatedHandlebarsData,
          item.Name,
          this.getHandlebarsObjectValue(item.Name)
        )
      }
      return updatedHandlebarsData
    },
    getHandlebarsObjectValue(path) {
      const value = _.get(this.handlebarsDataObject, path)
      const regexEmpty = new RegExp(
        `<span class="[\\w\\- ]+">{{${path}}}</span>`,
        'g'
      )
      const regexValue = /<span class="[\w\- ]+">([\s\S]*)<\/span>/g
      const match = regexValue.exec(value)
      const isEmpty = regexEmpty.test(value)
      if (match) return isEmpty ? '' : match[1]
      else return isEmpty ? '' : value
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
        const propDataValue = _.get(this.templateData, item, '')
        this.updateHandlebarsValue(handlebarsObject, item, propDataValue)
        if (propDataValue !== '') {
          handlebarsDataIsSet.push(true)
        } else {
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
          console.error(
            `Error in eSign-grid/ESignForm.vue in getContacts while making a GET call to get the contacts with specified name, context: ${bitpodURL}`,
            err
          )
        }
      }
    }, 500),
    getRandomImage(name) {
      return window.GeoPattern.generate(name).toDataUrl()
    },
    async editTemplate() {
      if (!this.editTemplateFormValid) {
        this.snackbar = true
        this.snackbarText = 'Please enter valid input'
        this.toggleLoading = !this.toggleLoading
        return
      }
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES/${
        this.editTemplateId
      }`
      const updatedObject = {
        Name: this.editTemplateFormName,
        DocumentUrl: this.editTemplateFormURL,
        Category: this.editTemplateFormCategory,
      }
      try {
        const res = await this.$axios.$patch(bitpodURL, updatedObject)
        if (res) {
          const updatedTemplateItems = this.templateItems.map((item) => {
            return item.id === this.editTemplateId
              ? {
                  ...item,
                  ...updatedObject,
                }
              : item
          })
          this.templateItems = updatedTemplateItems
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = 'Request Failed'
        console.error(
          `Error in eSign-grid/ESignForm.vue in editTemplate while making a PATCH call to update an eSignature template, context: ${bitpodURL}`,
          err
        )
      } finally {
        this.editTemplateDialog = false
        this.toggleLoading = !this.toggleLoading
      }
    },
    async deleteTemplate() {
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNTEMPLATES/${
        this.deleteTemplateId
      }`
      this.deleteTemplateLoading = true
      try {
        const res = await this.$axios.$delete(bitpodURL)
        if (res) {
          const updatedTemplateItems = this.templateItems.filter(
            (item) => item.id !== this.deleteTemplateId
          )
          this.templateItems = updatedTemplateItems
        }
      } catch (err) {
      } finally {
        this.toggleLoading = !this.toggleLoading
        this.deleteTemplateDialog = false
        this.deleteTemplateLoading = false
      }
    },
    expiryDateFieldRule() {
      return [
        (v) => {
          const ExpiryDate = v && new Date(v)
          let expiryDateMessage = ''
          if (!ExpiryDate)
            expiryDateMessage = this.$t('Messages.Error.ThisFieldRequired')
          else if (ExpiryDate < new Date())
            expiryDateMessage = this.$t('Messages.Error.RequestStartDate')
          else expiryDateMessage = ''
          return expiryDateMessage || true
        },
      ]
    },
  },
}
</script>
<style scoped>
.html-preview-container >>> .empty-field {
  color: red;
  padding: 2px;
  font-weight: bold;
  display: inline-block;
}
.html-preview-container >>> .filled-field {
  color: rgb(0, 85, 4);
  padding: 2px;
  font-weight: bold;
  display: inline-block;
}
.html-preview-container >>> .focus-empty-field {
  color: red;
  padding: 2px;
  outline: solid 2px black;
  font-weight: bold;
  display: inline-block;
}
.html-preview-container >>> .focus-filled-field {
  color: rgb(0, 85, 4);
  padding: 2px;
  outline: solid 2px black;
  font-weight: bold;
  display: inline-block;
}
#html-scroll-container {
  scroll-behavior: smooth;
}
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
.tile-pattern {
  background-size: cover;
  height: 140px;
}
.tile-img {
  max-height: 140px;
  min-height: 140px;
  transition: transform 0.3s, opacity 0.3s ease-out;
  -moz-transition: transform 0.3s, opacity 0.3s ease-out;
  -webkit-transition: transform 0.3s, opacity 0.3s ease-out;
  -o-transition: transform 0.3s, opacity 0.3s ease-out;
}
.tile-img:focus,
.tile-img:hover {
  transform: scale(1.1);
  opacity: 1;
  overflow: hidden;
}
.eventtiles {
  max-width: 280px;
  min-width: 280px;
}
.tile-info {
  min-height: 92px;
}
.tiles-action {
  min-height: 36px;
}
.overflow-h {
  overflow: hidden;
}
.overflow-hover {
  overflow: hidden;
  padding-right: 32px !important;
}
.overflow-hover:hover {
  overflow: auto;
  padding-right: 26px !important;
}
.v-tooltip__content {
  margin-left: -90px !important;
}
.max-width-400 {
  max-width: 400px;
}
.max-width-full {
  max-width: 100%;
}
.greybg >>> .v-tabs-bar {
  background-color: var(--v-greybg);
}
.signature-requested-subject {
  margin-top: 4px;
  color: grey;
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

<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Common.Member" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row class="public-page-main">
            <v-col class="col-md-6 col-12 pt-0 pb-0">
              <v-card class="elevation-0 pt-0">
                <v-list>
                  <v-list-item class="pl-0">
                    <div class="mt-n4">
                      <div>
                        <v-list-item-avatar
                          v-if="
                            copyMemberData &&
                            (copyMemberData.CustomerPic
                              ? copyMemberData.CustomerPic.length === 0
                              : false)
                          "
                          size="62"
                          style="margin: auto;"
                        >
                          <v-avatar
                            color="primary"
                            size="62"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <span class="white--text Twitter">{{
                              data.memberData.CustomerName
                            }}</span>
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-img
                          v-else
                          :src="getAttachmentLink(lastPicId, true)"
                          :lazy-src="getAttachmentLink(lastPicId, true)"
                          aspect-ratio="1"
                          class="mr-1"
                          max-width="139"
                          max-height="60"
                          width="120"
                          contain
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>

                        <div class="text-center mt-1">
                          <span
                            class="cursorPointer blue--text"
                            @click="checkContactClicked"
                          >
                            <File
                              :field="fileField"
                              :no-btn-look="true"
                              :block="true"
                              :open-file-dialog="contactLogo"
                              :value="checkArray"
                              :hide-preview="true"
                              @input="uploadContactImg" />
                            <i18n path="Drawer.Upload"
                          /></span>
                        </div>
                      </div>
                    </div>
                    <v-list-item-content class="pl-3 pb-8">
                      <v-skeleton-loader
                        :loading="!memberDataLoaded"
                        :tile="true"
                        class="rounded-lg mb-2"
                        type="text"
                        height="30"
                        width="200"
                        max-width="100"
                      >
                        <v-list-item-title class="mt-n4">
                          <h2 class="text-capitalize text-truncate">
                            {{ data.memberData.CustomerName }}
                          </h2>
                        </v-list-item-title>
                      </v-skeleton-loader>
                      <v-skeleton-loader
                        :loading="!memberDataLoaded"
                        :tile="true"
                        class="rounded-lg mb-2"
                        type="avatar"
                        height="15"
                        width="150"
                        max-width="180"
                      >
                        <v-list-item-subtitle class="mb-1">{{
                          data.memberData.CustomerId
                        }}</v-list-item-subtitle>
                      </v-skeleton-loader>
                      <v-skeleton-loader
                        :loading="!memberDataLoaded"
                        :tile="true"
                        class="rounded-lg mb-2"
                        type="avatar"
                        height="15"
                        width="200"
                        max-width="200"
                      >
                        <v-list-item-subtitle class="mb-1">
                          <v-chip
                            v-if="data.memberData.Rating"
                            small
                            :class="{
                              orange: data.memberData.Rating === 'Suspended',
                              red: data.memberData.Rating === 'Expired',
                              success: data.memberData.Rating === 'Active',
                            }"
                            text-color="white"
                          >
                            {{ data.memberData.Rating }}</v-chip
                          >
                        </v-list-item-subtitle>
                      </v-skeleton-loader>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col class="col-md-6 col-12 pt-0 pb-0">
              <v-skeleton-loader
                :loading="!memberDataLoaded"
                :tile="true"
                class="rounded-lg mb-2"
                type="avatar"
                height="15"
                width="100"
                max-width="200"
              >
                <div class="text-truncate my-3 pt-0">
                  <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
                  {{ formatField(data.memberData.Email) }}
                </div>
              </v-skeleton-loader>
              <v-skeleton-loader
                :loading="!memberDataLoaded"
                :tile="true"
                class="rounded-lg mb-2"
                type="avatar"
                height="15"
                width="200"
                max-width="150"
              >
                <div class="text-truncate my-3">
                  <v-icon class="mr-2 fs-16">mdi-cellphone-iphone</v-icon>
                  {{ formatField(data.memberData.BusinessNumber) }}
                </div>
              </v-skeleton-loader>
              <v-skeleton-loader
                :loading="!memberDataLoaded"
                :tile="true"
                class="rounded-lg mb-2"
                type="avatar"
                height="15"
                width="200"
                max-width="180"
              >
                <div class="text-truncate my-3">
                  <v-icon class="mr-2 fs-16">mdi-map-marker-outline</v-icon>
                  {{
                    formatAddressField(
                      data.memberData._BillingAddress &&
                        data.memberData._BillingAddress.City &&
                        data.memberData._BillingAddress.Country &&
                        data.memberData._BillingAddress.City !== '' &&
                        data.memberData._BillingAddress.Country !== ''
                        ? data.memberData._BillingAddress.City + ','
                        : data.memberData &&
                            data.memberData._BillingAddress &&
                            data.memberData._BillingAddress.City &&
                            data.memberData._BillingAddress.City
                    )
                  }}
                  {{
                    formatAddressField(
                      data.memberData._BillingAddress &&
                        data.memberData._BillingAddress.Country
                    )
                  }}
                </div>
              </v-skeleton-loader>
              <v-skeleton-loader
                :loading="!memberDataLoaded"
                :tile="true"
                class="rounded-lg mb-2"
                type="avatar"
                height="15"
                width="200"
              >
                <div class="text-truncate my-3">
                  <v-icon class="mr-2 fs-16">fa-user</v-icon>
                  {{ formatField(data.memberData.Type) }}
                </div>
              </v-skeleton-loader>
              <div
                v-if="data.memberData.createdDate !== undefined"
                class="text-truncate my-3"
              >
                <v-icon class="mr-2 fs-16">mdi-calendar-blank</v-icon>
                {{
                  $d(
                    new Date(data.memberData.createdDate),
                    'long',
                    $i18n.locale
                  )
                }}
              </div>
            </v-col>
            <div class="col-md-12 pb-0">
              <v-divider></v-divider>
              <v-flex
                class="d-flex flex-row align-center flex-wrap pt-2 pt-sm-0"
              >
                <v-chip pill class="greybg" v-on="on">
                  <v-avatar left color="warning" size="24">
                    <span class="white--text name-initial">{{
                      data.memberData.createdBy
                    }}</span>
                  </v-avatar>
                  <span>{{ data.memberData.createdBy }}</span>
                </v-chip>
                <v-subheader
                  v-if="data.memberData.createdDate !== undefined"
                  class="d-inline-flex pl-1"
                  >{{
                    $t('Common.CreatedThisMemberOn', {
                      date: $d(
                        new Date(data.memberData.createdDate),
                        'short',
                        $i18n.locale
                      ),
                    })
                  }}
                </v-subheader>
              </v-flex>
            </div>
          </v-row>
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.Contacts" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberContacts"
            :content="content"
            class="mt-n12"
            :context="data"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.AssociatedMembers" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="associatedMember"
            :content="content"
            class="mt-n12"
            :context="data"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.Emails" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberEmails"
            :content="content"
            class="mt-n12"
            :context="data"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
              <i18n path="Common.Subscriptions" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberProductSubscription"
            :content="content"
            class="mt-n12"
            :context="data"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.OpenActivity" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberTasks"
            :content="content"
            class="mt-n12"
            :context="data"
            :filter="filter"
          />
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.ActivityHistory" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberTaskHistory"
            :content="content"
            class="mt-n12"
            :context="data"
            :filter="filter1"
          />
        </div>
        <div
          class="xs12 sm8 md8 lg8 boxview boxviewsmall pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-comments-alt pr-1" aria-hidden="true"></i>
              <i18n path="Common.Notes" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Notes model-name="Customers" />
        </div>
        <div
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
        >
          <div class="d-flex justify-center align-center pb-2">
            <h2 class="body-1 pb-0">
              <i class="fa fa-image pr-1" aria-hidden="true"></i>
              <i18n path="Common.Attachments" />
            </h2>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="cursorPointer"
                  depressed
                  text
                  small
                  v-bind="attrs"
                  @click.native="checkOtherClicked"
                  v-on="on"
                >
                  <v-icon left>mdi-upload</v-icon>
                  <File
                    :field="otherFileField"
                    :no-btn-look="true"
                    :block="true"
                    :open-file-dialog="otherDialog"
                    :value="checkArray"
                    :hide-preview="true"
                    @input="fileUploadedOther"
                  />
                  <i18n path="Drawer.Upload" />
                </v-btn>
              </template>
            </v-menu>
          </div>
          <v-divider></v-divider>
          <div>
            <v-card
              v-for="(image, index) in data.memberData.AttachmentId"
              :key="index"
              class="d-inline-block mx-auto ma-4 ml-0 mr-0 pa-5 pr-3 elevation-0 cardImg rounded"
            >
              <span class="cardDelete">
                <i
                  class="fa-trash pa-2 cursorPointer"
                  @click="deleteOtherFile(image)"
                ></i>
              </span>
              <v-img
                :src="getAttachmentLink(image, true)"
                :lazy-src="getAttachmentLink(image, true)"
                aspect-ratio="1"
                class="rounded"
                max-width="150"
                max-height="150"
                width="150"
                @click.stop="openOtherDialog(image)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="mt-1 d-flex">
                <v-card-text class="pa-0 pb-1 text-truncate">
                  <a
                    class="d-inline-block text-truncate anchorTag linkWidth"
                    :href="getAttachmentLink(image, true)"
                    >{{
                      OtherImageName[index] && OtherImageName[index].fileName
                    }}</a
                  >
                </v-card-text>
                <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
              </div>
            </v-card>
          </div>
        </div>
      </v-flex>
      <v-flex class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 box-grey">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-info-circle pr-1" aria-hidden="true"></i>
                <i18n path="Common.MemberInformation" />
                <v-btn text small @click="editMemberInfoForm = true">
                  <v-icon left class="fs-16">fa-pencil</v-icon
                  ><i18n path="Drawer.Edit" />
                </v-btn>
              </h2>
            </template>
            <span><i18n path="Common.MemberInformation" /></span>
          </v-tooltip>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberName" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberId" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerId) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberOwner" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerOwner) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Phone" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.ContactNumber) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberType" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Type) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Status" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Rating) }}
              </div>
            </v-col>

            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.ParentMember" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.ParentCustomerName) }}
              </div>
            </v-col>

            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Ownership" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Ownership) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n
                path="Common.AnnualRevenue"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{ formatField(data.memberData.AnnualRevenue) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.ModifiedBy" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.modifiedBy) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.ModifiedDate" class="body-2 text--secondary" />
              <div
                v-if="data.memberData.modifiedDate !== undefined"
                class="body-1"
              >
                {{
                  $d(
                    new Date(data.memberData.modifiedDate),
                    'long',
                    $i18n.locale
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Description" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Description) }}
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 box-grey">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.AddressInformation" />
                <v-btn text small @click="editMemberInfoForm = true">
                  <v-icon left class="fs-16">fa-pencil</v-icon
                  ><i18n path="Drawer.Edit" />
                </v-btn>
              </h2>
            </template>
            <span><i18n path="Common.AddressInformation" /></span>
          </v-tooltip>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-6 col-12">
              <i18n
                path="Common.BillingStreet"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._BillingAddress &&
                      data.memberData._BillingAddress.AddressLine
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.BillingCity" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._BillingAddress &&
                      data.memberData._BillingAddress.City
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.BillingState" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._BillingAddress &&
                      data.memberData._BillingAddress.State
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.BillingZip" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._BillingAddress &&
                      data.memberData._BillingAddress.PostalCode
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n
                path="Common.BillingCountry"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._BillingAddress &&
                      data.memberData._BillingAddress.Country
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n
                path="Common.ShippingStreet"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._ShippingAddress &&
                      data.memberData._ShippingAddress.AddressLine
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.ShippingCity" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._ShippingAddress &&
                      data.memberData._ShippingAddress.City
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n
                path="Common.ShippingState"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._ShippingAddress &&
                      data.memberData._ShippingAddress.State
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.ShippingZip" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._ShippingAddress &&
                      data.memberData._ShippingAddress.PostalCode
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n
                path="Common.ShippingCountry"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.memberData._ShippingAddress &&
                      data.memberData._ShippingAddress.Country
                  )
                }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>
      <div v-if="editMemberInfoForm">
        <editMemberInfoForm
          :edit-member-info-form.sync="editMemberInfoForm"
          :refresh="refresh"
        />
      </div>
      <confirm ref="confirm"></confirm>
    </v-flex>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import editMemberInfoForm from './editMemberAccountInfo.vue'
import Grid from '~/components/common/grid'
import Notes from '~/components/common/notes'
import File from '~/components/common/form/file.vue'
import member from '~/config/apps/event/gql/member.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'

export default {
  components: {
    Grid,
    Notes,
    File,
    editMemberInfoForm,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        memberData: {},
      },
      fileField: {
        multiple: false,
      },
      formData: {
        CustomerPic: [],
      },
      checkArray: [],
      contactLogo: false,
      allow: true,
      lastPicId: '',
      editMemberInfoForm: false,
      objTask: { scheduleTask: false },
      otherDialog: false,
      otherDialogOpen: false,
      otherFileField: {
        multiple: true,
      },
      OtherImageName: [],
      displaySelectedOtherImage: '',
      copyMemberData: {},
      memberDataLoaded: false,
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Member : null
    },
    filter() {
      return {
        where: {
          and: [
            { CustomerId: this.$route.params.id },
            { Status: { neq: 'Completed' } },
            { Type: { neq: 'Mass Email' } },
          ],
        },
      }
    },
    filter1() {
      return {
        where: {
          and: [
            { CustomerId: this.$route.params.id },
            { Status: 'Completed' },
            { Type: { neq: 'Mass Email' } },
          ],
        },
      }
    },
  },
  methods: {
    formatAddressField(fieldValue) {
      return fieldValue || ' '
    },
    async getImageName() {
      const url = this.$bitpod.getApiUrl()
      try {
        const where = {
          where: { id: { inq: this.copyMemberData.AttachmentId } },
        }
        const imageData = await this.$axios.$get(
          `${url}Attachments?filter=${JSON.stringify(where)}`
        )
        if (imageData) {
          console.log('iage', imageData)
        }
        this.OtherImageName = imageData
      } catch (e) {
        console.error(
          `Error in apps/admin/member/index.vue while making a GET call to Attachment model in getImageName method context:-\nURL:${url}\n Error:${e}`
        )
      }
    },
    getImageUrl(imageId) {
      const downloadLink = this.getAttachmentLink(imageId, true)
      return downloadLink
    },
    fileUploadedOther(data) {
      this.allow = true
      if (data.length > 0) {
        this.updateOtherImageGallery(data)
      }
    },
    updateOtherImageGallery(formData) {
      const url = this.$bitpod.getApiUrl()
      formData
        .reduce((acc, i) => {
          return acc.then(() => {
            return this.$axios.$put(
              `${url}Customers/${this.$route.params.id}/getAttachment/rel/${i}`
            )
          })
        }, Promise.resolve())
        .then(() => {
          this.snackbarText = this.$t('Messages.Success.AttachmentAddSuccess')
          this.snackbar = true
          this.getImageName()
          return this.refresh()
        })
        .catch((e) => {
          console.error(
            `Error in apps/member/_id/index.vue while making a PUT call to Customers model in method updateOtherImageGallery context: memberId:-${this.$route.params.id} \n URL:- ${url} \n formData:- ${formData}`,
            e
          )
        })
    },
    openOtherDialog(image) {
      this.otherDialogOpen = true
      this.displaySelectedOtherImage = this.getAttachmentLink(image, true)
    },
    async deleteOtherFile(id) {
      const url = this.$bitpod.getApiUrl()
      const checkRes = await this.$refs.confirm.open(
        this.$t('Drawer.Delete'),
        this.$t('Messages.Warn.DeleteImage'),
        { color: 'error lighten-1' }
      )
      if (checkRes) {
        const res = await this.$axios.delete(
          `${url}Customers/${this.$route.params.id}/getAttachment/${id}`
        )
        if (res) {
          this.snackbarText = this.$t(
            'Messages.Success.AttachmentDeleteSuccess'
          )
          this.snackbar = true
          this.refresh()
        }
      }
    },
    checkOtherClicked() {
      if (this.allow) {
        this.checkArray = []
        this.otherDialog = !this.otherDialog
        this.allow = false
      }
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    checkContactClicked() {
      if (this.allow) {
        this.checkArray = []
        this.contactLogo = !this.contactLogo
        this.allow = false
      }
    },
    async uploadContactImg(data) {
      this.allow = true
      this.formData.CustomerPic = []
      this.formData.CustomerPic.push(data[0])
      try {
        await this.$axios.$patch(
          `${this.$bitpod.getApiUrl()}Customers/${this.$route.params.id}`,
          this.formData
        )
        this.refresh()
      } catch (e) {
        console.error(
          `Error in pages/apps/_app/member/_id/index while updating Customers context: Id: ${this.$route.params.id} , Data: ${this.formData}`,
          e
        )
      }
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PP') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
    goBack() {
      this.$router.back()
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${member}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        if (Object.values(data).length === 0) {
          this.$apollo.queries.data.refresh()
        } else {
          this.memberDataLoaded = true
        }
        const member = formatGQLResult(data, 'Customer')
        this.copyMemberData = member.length > 0 ? member[0] : {}
        if (member[0] && member[0].AttachmentId.length > 0) {
          this.getImageName()
        }
        if (
          this.copyMemberData &&
          this.copyMemberData.CustomerPic &&
          this.copyMemberData.CustomerPic.length > 0
        ) {
          this.lastPicId = this.copyMemberData.CustomerPic[0]
        }
        this.loading = 1
        return {
          memberData: member.length > 0 ? member[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
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
.linkWidth {
  max-width: 142px;
}
</style>

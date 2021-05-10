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
          <v-row>
            <v-col class="col-md-6 col-12 pt-0 pb-0">
              <v-card class="elevation-0 pt-0">
                <v-list>
                  <v-list-item class="pl-0">
                    <div class="mt-n9">
                      <div>
                        <v-list-item-avatar
                          v-if="lastPicId === ''"
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
                          class="rounded-circle"
                          max-width="100"
                          max-height="100"
                          min-height="100"
                          width="150"
                          cover
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
                      </div>
                      <div
                        class="cursorPointer blue--text text-center mt-1 d-none"
                        @click="checkContactClicked"
                      >
                        <File
                          :field="fileField"
                          :no-btn-look="true"
                          :block="true"
                          :open-file-dialog="orgLogo"
                          :value="checkArray"
                          :hide-preview="true"
                          @input="uploadContactImg"
                        />
                        <i18n path="Drawer.Upload" />
                      </div>
                    </div>
                    <v-list-item-content class="pl-3 pb-8">
                      <v-list-item-title class="mt-n4">
                        <h2 class="text-capitalize text-truncate">
                          {{ data.memberData.CustomerName }}
                        </h2>
                      </v-list-item-title>
                      <v-list-item-subtitle class="mb-1">{{
                        data.memberData.Website
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        data.memberData.Industry
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col class="col-md-6 col-12 pt-0 pb-0">
              <div class="text-truncate my-3 pt-0">
                <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
                {{ formatField(data.memberData.Email) }}
              </div>
              <div class="text-truncate my-3">
                <v-icon class="mr-2 fs-16">mdi-cellphone-iphone</v-icon>
                {{ formatField(data.memberData.BusinessNumber) }}
              </div>
              <div class="text-truncate my-3">
                <v-icon class="mr-2 fs-16">mdi-map-marker-outline</v-icon>
                {{ formatField(data.memberData.Country) }}
              </div>
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
          class="xs12 sm4 md4 lg4 boxview boxviewlarge pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.Tasks" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="memberTasks"
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
              <i class="fa fa-mail pr-1" aria-hidden="true"></i>
              <i18n path="Common.AssociateMember" />
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
            view-name="memberSubscription"
            :content="content"
            class="mt-n12"
            :context="data"
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
              <i18n path="Common.MemberOwner" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerOwner) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberName" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberType" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Type) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberNumber" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerId) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.MemberSite" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerSite) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Rating" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Rating) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n
                path="Common.ParentAccount"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{ formatField(data.memberData.ParentCustomerName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.HomePhone" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.ContactNumber) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.TickerSymbol" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.TickerSymbol) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Ownership" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.Ownership) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12 pb-0">
              <i18n path="Common.Employees" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.NumberOfEmployees) }}
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
              <i18n path="Common.SICCode" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.memberData.CustomerCode) }}
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
    </v-flex>
    <div v-if="editMemberInfoForm">
      <editMemberInfoForm
        :edit-member-info-form.sync="editMemberInfoForm"
        :refresh="refresh"
      />
    </div>
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
        Image: [],
      },
      checkArray: [],
      orgLogo: false,
      allow: true,
      lastPicId: '',
      editMemberInfoForm: false,
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Member : null
    },
    filter() {
      return {
        where: {
          Email: this.data.memberData && this.data.memberData.Email,
        },
      }
    },
  },
  methods: {
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    checkContactClicked() {
      if (this.allow) {
        this.checkArray = []
        this.orgLogo = !this.orgLogo
        this.allow = false
      }
    },
    async uploadContactImg(data) {
      this.allow = true
      this.formData.Image = []
      this.formData.Image.push(data[0])
      const url = this.$bitpod.getApiUrl()
      try {
        await this.$axios.$put(
          `${url}Contacts/${this.$route.params.id}/contactImg/rel/${data[0]}`,
          this.formData
        )
        this.refresh()
      } catch (e) {
        console.log(
          `Error in pages/apps/_app/contacts/_id/index.vue while making a PUT call to Contact model context:-\n data:-${data}`
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
        const member = formatGQLResult(data, 'Customer')
        // this.lastPicId =
        //   contact[0].contactPic[contact[0].contactPic.length - 1] || ''
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

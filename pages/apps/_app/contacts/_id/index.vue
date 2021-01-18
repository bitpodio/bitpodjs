<template>
  <div>
    <v-flex class="detailview-head mb-3"
      ><v-btn class="ml-n3 back-icon" icon @click="goBack"
        ><v-icon class="fs-30">mdi-chevron-left</v-icon> </v-btn
      ><v-text class="fs-18 min-h36"><i18n path="Common.Contact" /></v-text
    ></v-flex>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row>
            <v-col class="col-md-6 col-12 pt-0">
              <v-card class="elevation-0 pt-0">
                <v-list>
                  <v-list-item class="pl-0">
                    <div>
                      <div>
                        <v-list-item-avatar
                          v-if="lastPicId === ''"
                          size="62"
                          style="margin: auto"
                        >
                          <v-avatar
                            color="primary"
                            size="62"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <span class="white--text Twitter">{{
                              data.contact.FirstName
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
                        class="cursorPointer blue--text text-center mt-1"
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
                          {{ data.contact.FullName }}
                        </h2>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{
                        data.contact.Job
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        data.contact.Organization
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col class="col-md-6 col-12 pt-0">
              <div class="text-truncate my-3 pt-0">
                <v-icon class="mr-2 fs-16">mdi-email-outline</v-icon>
                {{ formatField(data.contact.Email) }}
              </div>
              <div class="text-truncate my-3">
                <v-icon class="mr-2 fs-16">mdi-cellphone-iphone</v-icon>
                {{ formatField(data.contact.CellPhone) }}
              </div>
              <div class="text-truncate my-3">
                <v-icon class="mr-2 fs-16">mdi-map-marker-outline</v-icon>
                {{ formatField(data.contact.Country) }}
              </div>
              <div
                v-if="data.contact.createdDate !== undefined"
                class="text-truncate my-3"
              >
                <v-icon class="mr-2 fs-16">mdi-calendar-blank</v-icon>
                {{
                  $d(new Date(data.contact.createdDate), 'long', $i18n.locale)
                }}
              </div>
            </v-col>
          </v-row>
        </div>
        <div
          v-if="content"
          class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
        >
          <v-flex class="d-flex justify-center align-center pb-3">
            <h2 class="body-1 pb-0">
              <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
              <i18n path="Common.Registrations" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid
            view-name="contactRegistration"
            class="mt-n12"
            :content="content"
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
              <i18n path="Common.Invites" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
          <Grid view-name="contactInvites" :content="content" class="mt-n12" />
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
          <Grid view-name="contactEmails" :content="content" class="mt-n12" />
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
          <Notes model-name="Contacts" />
        </div>
      </v-flex>
      <v-flex class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 box-grey">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.ContactInformation" />
              </h2>
            </template>
            <span><i18n path="Common.ContactInformation" /></span>
          </v-tooltip>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.DateOfBirth" class="body-2 text--secondary" />
              <div class="body-1">{{ formatDate(data.contact.BirthDate) }}</div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Department" class="body-2 text--secondary" />
              <div class="body-1">{{ formatField(data.contact.Job) }}</div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.OtherPhone" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.WorkPhone) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ReportsTo" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.ReportsTo) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Assistant" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.Assistant) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.AsstPhone" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.AsstPhone) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ContactOwner" class="body-2 text--secondary" />
              <div class="body-1">{{ formatField(data.contact.Owner) }}</div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.CreatedBy" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.modifiedBy) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ModifiedBy" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.modifiedBy) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ModifiedDate" class="body-2 text--secondary" />
              <div
                v-if="data.contact.modifiedDate !== undefined"
                class="body-1"
              >
                {{
                  $d(new Date(data.contact.modifiedDate), 'long', $i18n.locale)
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Description" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data.contact.Description) }}
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
              </h2>
            </template>
            <span><i18n path="Common.AddressInformation" /></span>
          </v-tooltip>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-6 col-12">
              <i18n
                path="Common.MailingStreet"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.contact._CurrentAddress &&
                      data.contact._CurrentAddress.AddressLine
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.MailingCity" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.contact._CurrentAddress &&
                      data.contact._CurrentAddress.City
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.MailingState" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.contact._CurrentAddress &&
                      data.contact._CurrentAddress.State
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-6 col-12">
              <i18n path="Common.MailingZip" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data.contact._CurrentAddress &&
                      data.contact._CurrentAddress.PostalCode
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n
                path="Common.MailingCountry"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{
                  formatField(
                    data.contact._CurrentAddress &&
                      data.contact._CurrentAddress.Country
                  )
                }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import Notes from '~/components/common/notes'
import File from '~/components/common/form/file.vue'
import contact from '~/config/apps/event/gql/contact.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'

export default {
  components: {
    Grid,
    Notes,
    File,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        contact: {},
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
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Contacts : null
    },
    filter() {
      return {
        where: {
          Email: this.data.contact && this.data.contact.Email,
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
          ${contact}
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
        const contact = formatGQLResult(data, 'Contact')
        this.lastPicId =
          contact[0].contactPic[contact[0].contactPic.length - 1] || ''
        return {
          contact: contact.length > 0 ? contact[0] : {},
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

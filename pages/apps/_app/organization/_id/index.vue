<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column class="mxw-w70">
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-row>
          <v-col class="col-md-12 col-12 pt-0">
            <v-card class="elevation-0">
              <v-list>
                <v-list-item class="pl-0">
                  <div>
                    <v-list-item-avatar
                      v-if="
                        data.organization &&
                        (data.organization.Image
                          ? data.organization.Image.length === 0
                          : false)
                      "
                      size="62"
                    >
                      <v-avatar
                        color="primary"
                        size="62"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span class="white--text Twitter">{{
                          data.organization.Name
                        }}</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-img
                      v-else-if="data.organization && data.organization.Image"
                      :src="getAttachmentLink(data.organization.Image[0], true)"
                      :lazy-src="
                        getAttachmentLink(data.organization.Image[0], true)
                      "
                      aspect-ratio="1"
                      class="mr-3"
                      max-width="139"
                      max-height="92"
                      width="150"
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
                        @click="checkOrgClicked"
                      >
                        <File
                          :field="fileField"
                          :no-btn-look="true"
                          :block="true"
                          :open-file-dialog="orgLogo"
                          :value="checkArray"
                          :hide-preview="true"
                          @input="uploadOrgLogo" />
                        <i18n path="Drawer.Upload"
                      /></span>
                    </div>
                  </div>
                  <v-list-item-content>
                    <v-list-item-title class="mt-n3">
                      <h2 class="wrap-word-normal">
                        {{ data.organization.Name }}
                      </h2>
                    </v-list-item-title>
                    <v-list-item-subtitle class="pb-1">{{
                      data.organization.Email
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{
                      data.organization.Mobile
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <div class="sticky d-flex flex-column justify-center boxview">
          <v-flex class="d-flex justify-center align-center pb-md-2 pt-md-2">
            <h2 class="body-1 pb-0">
              <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>
              <i18n path="Common.BusinessUnits" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
        </div>
        <Grid
          view-name="organizationBusinessUnit"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <div class="sticky d-flex flex-column justify-center boxview">
          <v-flex class="d-flex justify-center align-center pb-md-2 pt-md-2">
            <h2 class="body-1 pb-0">
              <i class="fa fa-server pr-1" aria-hidden="true"></i>
              <i18n path="Common.Subscriptions" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
        </div>
        <Grid
          view-name="organizationProductSubscription"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pad-card pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <div class="sticky d-flex flex-column justify-center boxview">
          <v-flex class="d-flex justify-center align-center pb-md-2 pt-md-2">
            <h2 class="body-1 pb-0">
              <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
              <i18n path="Common.Tasks" />
            </h2>
            <v-spacer></v-spacer>
          </v-flex>
          <v-divider></v-divider>
        </div>
        <Grid view-name="organizationTasks" :content="content" class="mt-n12" />
      </div>
      <div
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-image pr-1" aria-hidden="true"></i>
            <i18n path="Common.ImageGallery" />
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
        </v-flex>
        <v-divider></v-divider>
        <div>
          <v-card
            v-for="(image, index) in data.organization.BannerImages"
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
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-flex class="mt-1 d-flex">
              <v-card-text class="pa-0 pb-1">
                <a
                  class="d-inline-block text-truncate anchorTag file-name"
                  :href="getAttachmentLink(image, true)"
                  >{{
                    OtherImageName[index] && OtherImageName[index].fileName
                  }}</a
                >
              </v-card-text>
              <copy :text-to-copy="getImageUrl(image)" :unique-id="image" />
            </v-flex>
            <v-card-text class="pa-0 mt-n2 otherImg"
              ><i18n path="Common.LogoImage"
            /></v-card-text>
          </v-card>
          <v-dialog v-model="otherDialogOpen" max-width="600">
            <v-card>
              <v-card-title class="pa-1">
                <v-spacer></v-spacer>
                <div>
                  <v-btn icon @click="otherDialogOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-img :src="displaySelectedOtherImage"> </v-img>
            </v-card>
          </v-dialog>
        </div>
        <v-flex class="py-2"></v-flex>
      </div>
    </v-flex>
    <v-flex column class="mxw-w30">
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.OrganizationInformation" />
              </h2>
            </template>
            <span><i18n path="Common.OrganizationInformation" /></span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn text small @click="editOrgInfo = true">
            <v-icon left class="fs-16">fa-pencil</v-icon
            ><i18n path="Drawer.Edit" />
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-12 col-12 pb-0">
            <i18n path="Common.Address" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.AddressLine
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <i18n path="Common.City" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.City
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <i18n path="Common.State" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.State
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <div class="body-2 text--secondary"><i18n path="Common.Zip" /></div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.PostalCode
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-12 col-12 pb-0">
            <i18n path="Common.Country" class="body-2 text--secondary" />

            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.Country
                )
              }}
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.Settings" />
              </h2>
            </template>
            <span><i18n path="Common.Settings" /></span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn text small @click="editOrgSetting = true">
            <v-icon left class="fs-16">fa-pencil</v-icon
            ><i18n path="Drawer.Edit" />
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <i18n
            path="Common.EventRegistrationURL"
            class="body-2 text--secondary"
          />

          <div class="body-1">
            {{ formatField(data.organization.EventRegistrationURL) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n
            path="Common.SuccessTemplateCaption"
            class="body-2 text--secondary"
          />

          <div class="body-1">
            {{ formatField(data.organization.successTemplateCaption) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.Currency" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.organization.Currency) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.PrivacyPolicy" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.organization.PrivacyPolicy) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.SocialMedia" />
              </h2>
            </template>
            <span><i18n path="Common.SocialMedia" /></span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn text small @click="editSocialMedia = true">
            <v-icon left class="fs-16">fa-pencil</v-icon
            ><i18n path="Drawer.Edit" />
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <i18n path="Common.Facebook" class="body-2 text--secondary" />

          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.Facebook) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.Twitter" class="body-2 text--secondary" />

          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.Twitter) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.LinkedIn" class="body-2 text--secondary" />

          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.LinkedIn) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                <i18n path="Common.WorkTimings" />
              </h2>
            </template>
            <span><i18n path="Common.WorkTimings" /></span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn text small @click="editWorkTiming = true">
            <v-icon left class="fs-16">fa-pencil</v-icon
            ><i18n path="Drawer.Edit" />
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <i18n path="Common.StartTime" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.organization.AvailableStartHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.EndTime" class="body-2 text--secondary" />

          <div class="body-1">
            {{ formatField(data.organization.AvailableEndHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <i18n path="Common.WorkingDays" class="body-2 text--secondary" />

          <div class="body-1">
            <v-chip
              v-for="weekDay in data.organization.weekDay"
              :key="weekDay"
              small
              class="ma-1"
            >
              {{ weekDay }}
            </v-chip>
          </div>
        </v-flex>
      </div>
    </v-flex>

    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
    <div v-if="editOrgInfo">
      <editOrgInfoForm
        :edit-org-info.sync="editOrgInfo"
        :items="data.organization"
        :snackbar.sync="snackbar"
      />
    </div>
    <div v-if="editOrgSetting">
      <editOrgSetting
        :edit-org-setting.sync="editOrgSetting"
        :snackbar.sync="snackbar"
      />
    </div>
    <div v-if="editSocialMedia">
      <editSocialMedia
        :edit-social-media.sync="editSocialMedia"
        :snackbar.sync="snackbar"
      />
    </div>
    <div v-if="editWorkTiming">
      <editWorkTiming
        :edit-work-timing.sync="editWorkTiming"
        :snackbar.sync="snackbar"
      />
    </div>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import editOrgInfoForm from './editOrgInfoForm.vue'
import editOrgSetting from './editOrgSetting.vue'
import editSocialMedia from './editSocialMedia.vue'
import editWorkTiming from './editWorkTiming.vue'
import Grid from '~/components/common/grid'
import File from '~/components/common/form/file.vue'
import organization from '~/config/apps/admin/gql/organization.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'admin',
  components: {
    Grid,
    File,
    editOrgInfoForm,
    editOrgSetting,
    editSocialMedia,
    editWorkTiming,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        organization: {},
      },
      fileField: {
        multiple: false,
      },
      formData: {
        Image: [],
        BannerImages: [],
      },
      checkArray: [],
      orgLogo: false,
      editOrgInfo: false,
      editOrgSetting: false,
      editSocialMedia: false,
      editWorkTiming: false,
      allow: true,
      snackbar: false,
      snackbarText: this.$t('Messages.Success.OrgDetailsUpdateSuccess'),
      timeout: 4000,
      otherDialog: false,
      otherDialogOpen: false,
      otherFileField: {
        multiple: true,
      },
      OtherImageName: [],
      displaySelectedOtherImage: '',
      orgData: {},
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.organization : null
    },
  },
  mounted() {
    debugger
  },
  methods: {
    openOtherDialog(image) {
      this.otherDialogOpen = true
      this.displaySelectedOtherImage = this.getAttachmentLink(image, true)
    },
    checkOtherClicked() {
      if (this.allow) {
        this.checkArray = []
        this.otherDialog = !this.otherDialog
        this.allow = false
      }
    },
    fileUploadedOther(data) {
      this.allow = true
      if (data.length > 0) {
        this.updateOtherImageGallery(data)
      }
    },
    async getImageName() {
      const url = this.$bitpod.getApiUrl()
      try {
        const imageData = await Promise.all(
          this.orgData.BannerImages.map((id) => {
            return this.$axios.$get(`${url}Attachments/${id}`).catch((e) => {
              console.log(
                `Error in apps/admin/organizatin/index.vue while making a GET call to Attachment model in getImageName method context:-\nURL:${url} \nattachmentId:${id} \n Error:${e}`
              )
            })
          })
        )
        this.OtherImageName = imageData
      } catch (e) {
        console.log(
          `Error in apps/admin/organizatin/index.vue while making a GET call to Attachment model in getImageName method context:-\nURL:${url}\n Error:${e}`
        )
      }
    },
    updateOtherImageGallery(formData) {
      const url = this.$bitpod.getApiUrl()
      formData
        .reduce((acc, i) => {
          return acc.then(() => {
            return this.$axios.$put(
              `${url}OrganizationInfos/${this.$route.params.id}/getBanner/rel/${i}`
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
            `Error in apps/event/_id/index.vue while making a PUT call to Event model in method updateOtherImageGallery context: EventId:-${this.$route.params.id} \n URL:- ${url} \n formData:- ${formData}`,
            e
          )
        })
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
          `${url}OrganizationInfos/${this.$route.params.id}/getBanner/${id}`
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
    getImageUrl(imageId) {
      const downloadLink = this.getAttachmentLink(imageId, true)
      return downloadLink
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    checkOrgClicked() {
      if (this.allow) {
        this.checkArray = []
        this.orgLogo = !this.orgLogo
        this.allow = false
      }
    },
    async uploadOrgLogo(data) {
      this.allow = true
      this.formData.Image = []
      this.formData.Image.push(data[0])
      try {
        await this.$axios.$patch(
          `${this.$bitpod.getApiUrl()}OrganizationInfos/${
            this.$route.params.id
          }`,
          this.formData
        )
        this.refresh()
      } catch (e) {
        console.log('Error', e)
      }
    },
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${organization}
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
        const organization = formatGQLResult(data, 'OrganizationInfo')
        this.orgData = organization.length > 0 ? organization[0] : {}
        if (organization[0] && organization[0].BannerImages.length > 0) {
          this.getImageName()
        }
        return {
          organization: organization.length > 0 ? organization[0] : {},
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
.cardImg {
  position: relative;
  margin: 16px !important;
  padding: 0 !important;
  margin-left: 0 !important;
}
.cardDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
  display: none;
}
.cardImg:hover .cardDelete {
  display: inline-block;
}
.otherImg {
  visibility: hidden;
}
.file-name {
  width: 125px;
}
@media (max-width: 500px) {
  .pad-card {
    padding: 0 12px 0 12px;
  }
}
@media (min-width: 600px) {
  .pad-card {
    padding: 12px 12px 0 12px;
  }
}
</style>

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
                <v-list-item
                  class="pl-0"
                  v-for="image in data.organization.Image"
                  :key="image"
                >
                  <v-list-item-avatar
                    size="62"
                    v-if="
                      data.organization && data.organization.Image.length === 0
                    "
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
                    v-else
                    :src="getAttachmentLink(image, true)"
                    :lazy-src="getAttachmentLink(image, true)"
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
                  <v-list-item-content>
                    <v-list-item-title class="mt-n3">
                      <h2>{{ data.organization.Name }}</h2>
                    </v-list-item-title>
                    <v-list-item-subtitle class="pb-1">{{
                      data.organization.Email
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{
                      data.organization.Mobile
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list class="mt-n4 pl-2 ml-6"
                  ><span
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
                    <i18n path="Drawer.Upload" /></span
                ></v-list>
              </v-list>
            </v-card>
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
            <i18n path="Common.BusinessUnits" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="organizationBusinessUnit"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-server pr-1" aria-hidden="true"></i>
            <i18n path="Common.Subscriptions" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="organizationProductSubscription"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 pb-6 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-external-link pr-1" aria-hidden="true"></i>
            <i18n path="Common.Tasks" />
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
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
              <v-btn depressed text small v-bind="attrs" v-on="on">
                <v-icon left>mdi-upload</v-icon> <i18n path="Drawer.Upload" />
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-title
                  ><i18n path="Common.BadgeLogo"
                /></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  ><i18n path="Common.EventB"
                /></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  ><i18n path="Common.Other"
                /></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
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
      <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
        <div class="fs-16 text-center">
          {{ snackbarText }}
        </div>
      </v-snackbar>
    </v-flex>
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
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.organization : null
    },
  },
  methods: {
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

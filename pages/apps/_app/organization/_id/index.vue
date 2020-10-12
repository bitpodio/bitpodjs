<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div
        class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
      >
        <v-row>
          <v-col class="col-md-12 col-12 pt-0">
            <v-card class="elevation-0">
              <v-list>
                <v-list-item class="pl-0">
                  <v-list-item-avatar size="62">
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

                  <v-list-item-content>
                    <v-list-item-title>
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
                <v-list class="mt-n4 pl-2"
                  ><span class="cursorPointer" @click="checkOrgClicked">
                    <File
                      :field="fileField"
                      :no-btn-look="true"
                      :block="true"
                      :open-file-dialog="orgLogo"
                      :value="checkArray"
                      :hide-preview="true"
                      @input="uploadOrgLogo"
                    />
                    Upload</span
                  ></v-list
                >
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-user-plus pr-1" aria-hidden="true"></i> Business
            Units
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-server pr-1" aria-hidden="true"></i> Subscriptions
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
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-external-link pr-1" aria-hidden="true"></i> Tasks
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid view-name="organizationTasks" :content="content" class="mt-n12" />
      </div>
      <div
        v-if="content"
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-3">
          <h2 class="body-1 pb-0">
            <i class="fa fa-link1 pr-1" aria-hidden="true"></i> Integrations
          </h2>
          <v-spacer></v-spacer>
        </v-flex>
        <v-divider></v-divider>
        <Grid
          view-name="organizationIntegration"
          :content="content"
          class="mt-n12"
        />
      </div>
      <div
        class="xs12 sm4 md4 lg4 boxview pa-3 mr-2 mb-4 pb-0 elevation-1 rounded-lg"
      >
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-0">
            <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
          </h2>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed text small v-bind="attrs" v-on="on">
                <v-icon left>mdi-upload</v-icon> Upload
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Badge Logo</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Event Banner (680x350)</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Other</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-divider></v-divider>
        <v-flex class="py-2"></v-flex>
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-location pr-1" aria-hidden="true"></i> Organization
            Information
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editOrgInfo = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-12 col-12 pb-0">
            <div class="body-2 text--secondary">Address</div>
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
            <div class="body-2 text--secondary">City</div>
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
            <div class="body-2 text--secondary">State</div>
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
            <div class="body-2 text--secondary">Zip</div>
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
            <div class="body-2 text--secondary">Country</div>
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
          <h2 class="body-1 pb-1">
            <i class="fa fa-cog pr-1" aria-hidden="true"></i> Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editOrgSetting = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Registration URL</div>
          <div class="body-1">
            {{ formatField(data.organization.EventRegistrationURL) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Success Template Caption</div>
          <div class="body-1">
            {{ formatField(data.organization.successTemplateCaption) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Currency</div>
          <div class="body-1">
            {{ formatField(data.organization.Currency) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Privacy Policy</div>
          <div class="body-1">
            {{ formatField(data.organization.PrivacyPolicy) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-share-square-o pr-1" aria-hidden="true"></i> Social
            Media
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editSocialMedia = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Facebook</div>
          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.Facebook) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Twitter</div>
          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.Twitter) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">LinkedIn</div>
          <div class="body-1 text-truncate d-block">
            {{ formatField(data.organization.LinkedIn) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 pt-0 pr-2 pb-2 box-grey">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-timer pr-1" aria-hidden="true"></i> Work Timings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="editWorkTiming = true">
            <v-icon left class="fs-16">fa-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Start Time</div>
          <div class="body-1">
            {{ formatField(data.organization.AvailableStartHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">End Time</div>
          <div class="body-1">
            {{ formatField(data.organization.AvailableEndHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">working Days</div>
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
    <editOrgInfoForm
      :edit-org-info.sync="editOrgInfo"
      :items="data.organization"
    />
    <editOrgSetting :edit-org-setting.sync="editOrgSetting" />
    <editSocialMedia :edit-social-media.sync="editSocialMedia" />
    <editWorkTiming :edit-work-timing.sync="editWorkTiming" />
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
import nuxtconfig from '~/nuxt.config'
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
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.organization : null
    },
  },
  methods: {
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
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}OrganizationInfos/${this.$route.params.id}`,
          this.formData
        )
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

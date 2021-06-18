<template>
  <div>
    <v-flex d-flex flex-md-row flex-lg-row flex-column>
      <v-flex class="mxw-w70">
        <div
          class="xs12 sm8 md8 lg8 boxview pa-3 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <v-row>
            <v-col class="col-md-12 col-12 pt-0 d-flex">
              <v-card class="elevation-0 mt-n2">
                <v-list>
                  <v-list-item class="pl-0">
                    <div class="pt-0">
                      <v-list-item-avatar size="62">
                        <v-avatar
                          color="primary"
                          size="62"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <span class="white--text Twitter">{{
                            data && data.profileInfo.name
                          }}</span>
                        </v-avatar>
                      </v-list-item-avatar>
                    </div>
                    <v-list-item-content>
                      <v-list-item-title>
                        <h2 class="text-capitalize text-truncate">
                          {{ data && data.profileInfo.name }}
                        </h2>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{
                        data &&
                        data.profileInfo &&
                        data.profileInfo.contact &&
                        data.profileInfo.contact.phone
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
              <v-spacer></v-spacer>
              <div class="d-flex">
                <div class="d-flex">
                  <v-switch
                    v-if="!isExternal"
                    v-model="is2FAEnable"
                    inset
                    :label="$t('Common.TwoFactorAuth')"
                    class="mr-4 ma-0"
                    @change="toggle2FA"
                  ></v-switch>
                  <v-btn
                    v-if="!isExternal"
                    depressed
                    color="primary"
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="updatePasswordDialog = true"
                  >
                    <i18n path="Common.UpdatePassword" />
                  </v-btn>
                  <v-btn
                    v-else
                    depressed
                    color="primary"
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="updateExternalUserPassword"
                  >
                    <i18n path="Common.SetUpBitpodPassword" />
                  </v-btn>

                  <v-menu
                    right
                    :offset-y="offset"
                    transition="slide-y-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon small v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item @click="editUserProfileDialog = true">
                        <v-list-item-icon class="mr-2">
                          <i
                            class="fa fa-pencil-square-o mt-1"
                            aria-hidden="true"
                          ></i>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            ><i18n path="Common.EditProfile"
                          /></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item @click="deleteAccountDialog = true">
                        <v-list-item-icon class="mr-2">
                          <i
                            class="fa-cross-circle mt-1"
                            aria-hidden="true"
                          ></i>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            ><i18n path="Common.DeleteAccount"
                          /></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div
          v-if="content"
          class="xs12 sm8 md8 lg8 boxview pad-card pb-6 mr-2 mb-4 pa-3 pb-2 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex
              class="d-flex justify-center align-center pb-md-2 pt-2 pl-4"
            >
              <h2 class="body-1 pb-0">
                <i class="fa fa-black-board pr-1" aria-hidden="true"></i>
                <i18n path="Common.LoginActivity" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid view-name="userprofile" class="mt-n12" :content="content" />
        </div>
        <div
          v-if="content"
          class="xs12 sm8 md8 lg8 boxview pad-card pa-3 pb-6 mr-2 mb-4 pb-2 elevation-1 rounded-lg"
        >
          <div class="sticky d-flex flex-column justify-center boxview">
            <v-flex
              class="d-flex justify-center align-center pb-md-2 pt-2 pl-4"
            >
              <h2 class="body-1 pb-0">
                <i class="fa fa-box pr-1" aria-hidden="true"></i>
                <i18n path="Common.ConnectedApps" />
              </h2>
              <v-spacer></v-spacer>
            </v-flex>
            <v-divider></v-divider>
          </div>
          <Grid view-name="connectedApps" class="mt-n12" :content="content" />
        </div>
      </v-flex>
      <v-flex class="mxw-w30">
        <div class="xs12 sm4 md4 lg4 greybg pa-4 mb-2 py-0 box-grey">
          <v-flex class="d-flex justify-center align-center pb-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h2 class="body-1 pb-0" v-bind="attrs" v-on="on">
                  <i class="fa fa-tag pr-1" aria-hidden="true"></i>
                  <i18n path="Common.ProfileInformation" />
                </h2>
              </template>
              <span><i18n path="Common.ProfileInformation" /></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn text small @click="editUserProfileDialog = true">
              <v-icon left class="fs-16">fa-pencil</v-icon
              ><i18n path="Drawer.Edit" />
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-md-12 col-12">
              <i18n
                path="Common.FirstNameCaption"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{ formatField(data && data.profileInfo.firstName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n
                path="Common.LastNameCaption"
                class="body-2 text--secondary"
              />
              <div class="body-1">
                {{ formatField(data && data.profileInfo.lastName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Phone" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.phone
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.EmailCaption" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data && data.profileInfo.userName) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Language" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(data && data.profileInfo.language) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.TimeZone" class="body-2 text--secondary" />
              <div class="body-1">
                {{ formatField(timezone) }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Address" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.address
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.City" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.city
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.State" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.state
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.Country" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.country
                  )
                }}
              </div>
            </v-col>
            <v-col class="col-md-12 col-12">
              <i18n path="Common.ZipCode" class="body-2 text--secondary" />
              <div class="body-1">
                {{
                  formatField(
                    data &&
                      data.profileInfo &&
                      data.profileInfo.contact &&
                      data.profileInfo.contact.zipCode
                  )
                }}
              </div>
            </v-col>
          </v-row>
        </div>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          :top="true"
          width="2px"
        >
          <div class="fs-16 text-center">
            {{ snackbarText }}
          </div>
        </v-snackbar>
      </v-flex>
      <div v-if="editUserProfileDialog">
        <editUserProfileForm
          :edit-user-profile-dialog.sync="editUserProfileDialog"
          :refresh="refresh"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="updatePasswordDialog">
        <updateUserPasswordForm
          :update-password-dialog.sync="updatePasswordDialog"
          :refresh="refresh"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="deleteAccountDialog">
        <deleteAccountForm
          :delete-account-dialog.sync="deleteAccountDialog"
          :refresh="refresh"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
      <div v-if="updateExternalUserDialog">
        <updateExternalUserPassword
          :update-external-user-dialog.sync="updateExternalUserDialog"
          :refresh="refresh"
          :snackbar.sync="snackbar"
          :snackbar-text.sync="snackbarText"
        />
      </div>
    </v-flex>
  </div>
</template>

<script>
import editUserProfileForm from './editUserProfileInfo.vue'
import updateUserPasswordForm from './updateUserPasswordForm.vue'
import updateExternalUserPassword from './updateExternalUserPassword.vue'
import deleteAccountForm from './deleteUserAccount.vue'
import Grid from '~/components/common/grid'
import { configLoaderMixin, getID4ServerUrl } from '~/utility'

export default {
  components: {
    editUserProfileForm,
    updateUserPasswordForm,
    deleteAccountForm,
    updateExternalUserPassword,
    Grid,
  },
  layout: 'user-profile',
  mixins: [configLoaderMixin],
  data() {
    return {
      data: {
        profileInfo: {},
      },
      editUserProfileDialog: false,
      snackbar: false,
      timeout: '3000',
      snackbarText: this.$t('Messages.Success.EventDetailsUpdateSuccess'),
      is2FAEnable: false,
      twoFactorStatus: false,
      updatePasswordDialog: false,
      deleteAccountDialog: false,
      updateExternalUserDialog: false,
      timezoneItems: [],
      timezone: '',
      connectedApps: [],
      isExternal: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.UserProfile : null
    },
  },
  mounted() {
    this.getUserData()
    this.$eventBus.$on('refresh-page', this.getUserData)
    this.getConnectedApps()
  },
  beforeDestroy() {
    this.$eventBus.$off('refresh-page')
  },
  methods: {
    updateExternalUserPassword() {
      this.updateExternalUserDialog = true
    },
    async getConnectedApps() {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.sub}/connectedapps`
      try {
        const res = await this.$axios.$get(`${url}`)
        if (res) {
          this.connectedApps = res
        }
      } catch (e) {
        console.error(
          `Error in apps/userprofile/index.vue in getConnectedApps method context:-\nURl:${url} \nerror:${e}`
        )
      }
    },
    async getTimezone(id) {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}/timeZones`
      try {
        const res = await this.$axios.$get(`${url}`)
        if (res) {
          this.timezoneItems = res
          this.timezoneItems.map((ele) => {
            if (ele.id === id) {
              this.timezone = ele.displayName
            }
          })
        }
      } catch (e) {
        console.error(
          `Error in apps/userprofile/index.vue in getTimezone method context:-\nid:${id}\nURl:${url} \nerror:${e}`
        )
      }
    },
    async getUserData() {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.sub}`
      try {
        const res = await this.$axios.$get(`${url}`)
        this.data.profileInfo = Object.entries(res).length > 0 ? res : {}
        this.getTimezone(this.data.profileInfo.timeZone)
        this.isExternal = this.data.profileInfo.isExternal
        this.is2FAEnable = this.data.profileInfo.enableTwoFactor
      } catch (e) {
        console.error(
          `Error in apps/userprofile/index.vue in getConnectedApps method context:-\nURl:${url} \nerror:${e}`
        )
      }
    },
    async toggle2FA() {
      const url = `${getID4ServerUrl()}api/tiers/${
        this.$auth.state.user.data.TierHierarchy[0].Id
      }/users/${this.$auth.state.user.data.id}/enabletwofactor`
      try {
        const res = await this.$axios.$put(`${url}`, {
          Email: this.$auth.state.user.data.email,
          EnableTwoFactor: this.is2FAEnable,
        })
        if (res) {
          this.snackbarText = this.$t(
            'Messages.Success.TwoFactorUpdateSuccessMsg',
            {
              type: this.is2FAEnable ? 'enabled' : 'disabled',
            }
          )
          this.snackbar = true
          this.$eventBus.$emit('refresh-page')
        }
      } catch (e) {
        console.error(
          `Error in apps/userprofile/index.vue in getConnectedApps method context:-\nURl:${url} \nerror:${e}`
        )
      }
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
  },
}
</script>

<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="2000" :top="true" width="2px">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-dialog
      v-if="tab !== 0"
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-3 text-h5">
            {{
              tab === 1
                ? $t('Common.NameYourOrganization')
                : tab === 2
                ? $t('Drawer.CreateEventAction')
                : 'Error'
            }}
          </h2>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <div v-if="tab === 1">
            <div class="fs-16 mb-4 message">{{ $t('Common.SetupDomain') }}</div>
            <div class="d-flex">
              <v-form ref="form" class="suffixRoute" autocomplete="off">
                <v-text-field
                  v-model="orgName"
                  :label="$t('Common.OrganizationName')"
                  class="orgSuffix"
                  :rules="[
                    (v) => {
                      let valid =
                        !v || !/^[a-z0-9]+$/i.test(v)
                          ? $t('Messages.Warn.UniqueLinkFormat')
                          : v.length < 3
                          ? $t('Messages.Error.MinimumCharacter')
                          : v.length > 20
                          ? $t('Messages.Error.MaximumCharacter')
                          : !/^[a-z]+$/i.test(v[0])
                          ? $t('Messages.Error.NameMustStartWithAlphabet')
                          : !allow && allowable && !processing
                          ? $t('Messages.Error.OrganisationAlreadyExists')
                          : true
                      allowable = valid === true
                      return valid
                    },
                  ]"
                  outlined
                  dense
                  @keyup="startCheck"
                  @keydown="cancelCheck"
                ></v-text-field>
              </v-form>
              <div class="fs-20 pa-1">
                {{ $t('Common.SuffixRoute') }}
              </div>
            </div>
          </div>
          <div v-if="tab === 2">
            <div class="fs-16 mb-4 message">
              {{ $t('Common.CreateEventMessage') }}
            </div>
            <div>
              <v-form autocomplete="off">
                <v-text-field
                  v-model="eventName"
                  :label="$t('Common.EventNameRequired')"
                  :rules="[
                    (v) => {
                      return !v ? $t('Messages.Error.EventNameEmpty') : true
                    },
                  ]"
                  outlined
                  dense
                ></v-text-field>
                <CustomDate
                  v-model="startDateTime"
                  class="mt-1"
                  :label="$t('Common.CreateEventMessage')"
                  :field="startField"
                  :rules="startDateRule"
                  type="datetime"
                />
              </v-form>
            </div>
          </div>
          <div v-if="tab === 3">
            <div class="fs-16 mb-4 message">
              An error occured while creating you organization, please get in
              touch with customer support.
            </div>
          </div>
        </v-card-text>
        <v-divider v-if="tab !== 3"></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <div v-if="tab === 1" class="d-flex">
            <SaveBtn
              class="mt-1"
              dense
              color="primary"
              :disabled="!allow || processing"
              :label="this.$t('Common.CreateOrganisation')"
              :action="stepOne"
              :reset="resetBtn"
            ></SaveBtn>
            <div v-if="allowable" class="fs-14 pa-3 statusMessage">
              {{ statusMessage }}
            </div>
          </div>
          <div v-if="tab === 2" class="d-flex">
            <SaveBtn
              class="mt-1"
              dense
              color="primary"
              :disabled="!eventName || invalidDate || processing"
              :label="this.$t('Drawer.CreateEventAction')"
              :action="stepTwo"
              :reset="resetBtn"
            ></SaveBtn>
            <div class="fs-14 pa-3 statusMessage">{{ statusMessage }}</div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="(orgName && tab === 2) || redirectToOrg">
      <iframe
        id="print"
        ref="iframe"
        style="width: 0; position: absolute; height: 0;"
        :src="`https://${orgName}-${$config.axios.backendBaseUrl}${$config.basePublicPath}/embed-cookie`"
        @load="iframeLoaded"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
import SaveBtn from '~/components/common/saveButton'
import CustomDate from '~/components/common/form/date.vue'
export default {
  layout: 'only-nav',
  components: {
    SaveBtn,
    CustomDate,
  },
  data() {
    return {
      orgName: '',
      allow: false,
      resetBtn: false,
      allowable: false,
      snackbar: false,
      snackbarText: '',
      email: '',
      name: '',
      tab: 0,
      eventName: '',
      startDateTime: new Date(),
      endDateTime: new Date(),
      invalidDate: false,
      orgInfo: {},
      dialog: true,
      redirectToOrg: false,
      statusMessage: '',
      checkTimeout: 2000,
      checkTyping: null,
      processing: false,
    }
  },
  computed: {
    startField() {
      return {
        appendIcon: 'fa-calendar',
        outlined: true,
        caption: this.$t('Common.StartDateTime'),
        type: 'datetime',
      }
    },
    startDateRule() {
      return [
        (v) => {
          if (!v) {
            this.invalidDate = true
            return this.$t('Messages.Error.ThisFieldRequired')
          }
          if (
            new Date().setMinutes(new Date().getMinutes() - 1) >
            new Date(new Date(v).toLocaleString()).getTime()
          ) {
            this.invalidDate = true
            return this.$t('Messages.Error.EventStartDate')
          } else {
            this.invalidDate = false
            return true
          }
        },
      ]
    },
  },
  watch: {
    tab(newVal) {
      if (newVal === 2) {
        this.startDateTime = new Date(
          new Date().setDate(new Date().getDate() + 1)
        )
      }
    },
  },
  mounted() {
    window.addEventListener('message', this.messageReceived, false)
    if (
      this.$auth &&
      this.$auth.$state &&
      this.$auth.$state.user &&
      this.$auth.$state.user.data
    ) {
      if (this.$auth.user.data.orgList.length) {
        this.orgName = this.$auth.user.data.orgList[0].name
        this.redirectToOrg = true
      } else {
        this.tab = 1
      }
      this.email = this.$auth.$state.user.data.email
      this.name = this.$auth.$state.user.data.name
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    messageReceived(e) {
      if (e.data === 'success' && this.redirectToOrg) {
        const orgId = this.$auth.user.data.orgList[0].id
        this.tab = 2
        this.statusMessage = 'Setting up your Organization'
        this.processing = true
        const jobStatusChecker = async () => {
          try {
            const jobInfo = await this.$axios.$get(
              `${this.$bitpod.getApiUrl()}OrgSetups?filter={"orgId": ${orgId}}`,
              {
                headers: {
                  'x-org-id': this.orgInfo.id,
                },
              }
            )[0]
            if (jobInfo._SetupErrors.length) {
              this.processing = false
              this.statusMessage = ''
              this.snackbarText = 'Failed to setup your Organisation.'
              this.snackbar = true
              this.tab = 3
            } else if (jobInfo._SetupStatus.length) {
              const lastStatus =
                jobInfo._SetupStatus[jobInfo._SetupStatus.length - 1]
              if (
                lastStatus.Message === 'full setup completed' &&
                lastStatus.Code === 0
              ) {
                this.statusMessage = 'Redirecting to new Organization'
                document.cookie.split(';').forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, '')
                    .replace(
                      /=.*/,
                      '=;expires=' + new Date().toUTCString() + ';path=/'
                    )
                })
                document.cookie.split(';').forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, '')
                    .replace(
                      /=.*/,
                      '=;expires=' +
                        new Date().toUTCString() +
                        `;path=${this.$config.basePublicPath}`
                    )
                })
                localStorage.clear()
                location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}/apps/event/list/Event/live-and-draft-event`
              } else {
                setTimeout(jobStatusChecker, 1000)
              }
            } else {
              setTimeout(jobStatusChecker, 1000)
            }
          } catch (err) {
            this.snackbarText = 'Failed to setup your Organisation.'
            this.snackbar = true
            this.tab = 3
            console.error(
              'Error while checking status of setup job on /get-started. Error: ',
              err
            )
          }
        }
        setTimeout(jobStatusChecker, 1000)
      }
    },
    iframeLoaded() {
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    stepOne() {
      this.resetBtn = !this.resetBtn
      this.tab = 2
    },
    async stepTwo() {
      this.processing = true
      this.statusMessage = 'Creating your Organization'
      this.orgInfo = await this.createOrg()
      if (!this.orgInfo) {
        this.tab = 1
      } else {
        this.statusMessage = 'Setting up your Organization'
        this.endDateTime = new Date(
          new Date().setDate(this.startDateTime.getDate() + 4)
        )
        const eventObj = {
          BusinessType: 'Single',
          Currency: 'USD',
          Description: "I'm a demo event",
          EndDate: this.endDateTime,
          EventManager: this.email,
          JoiningInstruction: '',
          LocationType: 'Bitpod Virtual',
          Organizer: this.name,
          Privacy: 'Public',
          StartDate: this.startDateTime,
          Status: 'Not ready',
          Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          Title: this.eventName,
          UniqLink: `${this.eventName}`.replace(/[^A-Za-z0-9]/g, ''),
          VenueName: '',
          WebinarLink: '',
          _VenueAddress: {},
        }
        const obj = { orgData: this.orgInfo, eventData: eventObj }
        try {
          const scheduledJob = (
            await this.$axios.$post(
              `https://${this.$config.axios.backendBaseUrl}${nuxtconfig.axios.apiEndpoint}OrgSetups/scheduleSetup`,
              obj,
              {
                headers: {
                  'x-org-id': this.orgInfo.id,
                },
              }
            )
          )['1']
          if (scheduledJob.Status) {
            const jobStatusChecker = async () => {
              try {
                const jobInfo = await this.$axios.$get(
                  `${this.$bitpod.getApiUrl()}OrgSetups/${scheduledJob.id}`,
                  {
                    headers: {
                      'x-org-id': this.orgInfo.id,
                    },
                  }
                )
                if (jobInfo._SetupErrors.length) {
                  this.snackbarText = 'Failed to setup your Organisation.'
                  this.snackbar = true
                  this.tab = 1
                  this.processing = false
                  this.resetBtn = !this.resetBtn
                } else if (jobInfo._SetupStatus.length) {
                  const lastStatus =
                    jobInfo._SetupStatus[jobInfo._SetupStatus.length - 1]
                  if (
                    lastStatus.Message === 'full setup completed' &&
                    lastStatus.Code === 0
                  ) {
                    this.statusMessage = 'Redirecting to new Organization'
                    document.cookie.split(';').forEach((c) => {
                      document.cookie = c
                        .replace(/^ +/, '')
                        .replace(
                          /=.*/,
                          '=;expires=' + new Date(0).toUTCString() + ';path=/'
                        )
                    })
                    document.cookie.split(';').forEach((c) => {
                      document.cookie = c
                        .replace(/^ +/, '')
                        .replace(
                          /=.*/,
                          '=;expires=' +
                            new Date(0).toUTCString() +
                            `;path=${this.$config.basePublicPath}`
                        )
                    })
                    localStorage.clear()
                    location.href = `https://${this.orgName}-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}/apps/event/list/Event/live-and-draft-event`
                  } else {
                    setTimeout(jobStatusChecker, 1000)
                  }
                } else {
                  setTimeout(jobStatusChecker, 1000)
                }
              } catch (err) {
                this.snackbarText = 'Failed to setup your Organisation.'
                this.snackbar = true
                this.tab = 1
                this.processing = false
                this.resetBtn = !this.resetBtn
                console.error(
                  'Error while checking status of setup job on /get-started. Error: ',
                  err
                )
              }
            }
            setTimeout(jobStatusChecker, 1000)
          } else {
            this.snackbarText = 'Failed to setup your Organisation.'
            this.snackbar = true
            this.tab = 1
            this.processing = false
            this.resetBtn = !this.resetBtn
          }
        } catch (err) {
          this.snackbarText = 'Failed to setup your Organisation.'
          this.snackbar = true
          this.tab = 1
          this.processing = false
          this.resetBtn = !this.resetBtn
          console.error(
            'Error while setting up organization on /get-started. Error: ',
            err
          )
        }
      }
    },
    async createOrg() {
      try {
        const res = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}OrganizationInfos/createOrg?name=${
            this.orgName
          }`
        )
        if (res && res[1].success === true) {
          return res[1].data
        } else {
          this.resetBtn = !this.resetBtn
          this.statusMessage = ''
          this.snackbarText = 'Failed to create your Organisation.'
          this.snackbar = true
          return false
        }
      } catch (err) {
        this.statusMessage = ''
        this.snackbarText =
          'This Organisation is in use, maybe soft-deleted, Try with a new name.'
        this.snackbar = true
        this.resetBtn = !this.resetBtn
        console.error(
          'Error while creating organization on /get-started. Error: ',
          err
        )
        return false
      }
    },
    cancelCheck() {
      clearTimeout(this.checkTyping)
    },
    startCheck() {
      clearTimeout(this.checkTyping)
      this.processing = true
      this.statusMessage = 'Verifying Availability'
      this.checkTyping = setTimeout(this.checkAvailablity, this.checkTimeout)
    },
    async checkAvailablity() {
      if (this.allowable) {
        try {
          const res = await this.$axios.$get(
            `${this.$bitpod.getApiUrl()}OrganizationInfos/orgAvailable?name=${
              this.orgName
            }`
          )
          if (res) {
            this.allow = res.result
            this.processing = false
            this.statusMessage = ''
            this.$refs.form.validate()
          }
        } catch (err) {
          this.processing = false
          this.statusMessage = ''
          console.error(
            'Error while checking if org exists on /get-started. Error: ',
            err
          )
        }
      } else {
        this.allow = false
        this.processing = false
        this.statusMessage = ''
        this.$refs.form.validate()
      }
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 65vh;
}
.suffixRoute {
  width: 45% !important;
}
.message {
  color: grey;
}
.statusMessage {
  height: 14px;
}
</style>

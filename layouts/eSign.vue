<template>
  <v-app id="inspire">
    <v-app-bar app flat class="greybg headernew pl-0" height="50">
      <v-toolbar-title
        class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
      >
        <v-app-bar-nav-icon
          :ripple="false"
          size="24"
          height="36px"
          width="36px"
          class="ml-0 mx-md-2 mr-0 d-inline d-sm-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <AppLogo />
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          v-bind="attrs"
          color="blue darken-2"
          dark
          depressed
          small
          class="mx-3"
          v-on="on"
          @click="handleNewTemplate"
        >
          <i18n path="Common.SendDocforeSign" />
        </v-btn>
      </div>
      <Help class="d-none d-sm-inline" />
      <LanguageSwitcher />
      <AppDrawer />
      <div v-if="$auth.$state.loggedIn" class="ml-3">
        <v-menu
          v-model="account"
          :close-on-content-click="false"
          :nudge-width="180"
          offset-y
          transition="slide-y-transition"
          bottom
        >
          <template
            v-if="$auth.$state.loggedIn"
            v-slot:activator="{ on, attrs }"
          >
            <v-btn
              fab
              depressed
              x-small
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="userPlan"
            >
              <span class="white--text fs-16">{{
                $auth.user.data.name && $auth.user.data.name[0]
              }}</span>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="48" class="mt-0">
                  <v-avatar color="primary" size="48" v-bind="attrs" v-on="on">
                    <span class="white--text headline">{{
                      $auth.user.data.name && $auth.user.data.name[0]
                    }}</span>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content class="mxcol-200">
                  <v-list-item-title>{{
                    $auth.user.data.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $auth.user.data.email
                  }}</v-list-item-subtitle>
                  <div v-if="allowUpgrade">
                    <div class="d-inline-flex mxcol-200 mt-1 align-center">
                      <v-list-item-subtitle class="text-body-2">{{
                        userPlanData
                      }}</v-list-item-subtitle>
                      <Upgrade />
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list-item v-if="notShowUserProfile">
              <UserProfile />
            </v-list-item>
            <v-list-item>
              <OrgnaizationList />
            </v-list-item>
            <OldSite />
            <Theme />
            <v-list dense class="pt-0">
              <v-list-item>
                <v-btn text small color="primary" @click="onLogout">
                  <i18n path="Common.Logout" />
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          <i18n path="Common.Login" />
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="greybg">
      <v-container fluid>
        <v-row>
          <v-col class="pt-0">
            <div class="esign-app-title">
              <v-col
                class="d-flex greybg px-0 mb-3 flex-row seatmap-inner align-center"
              >
                <v-text class="text-h5"
                  ><i18n path="Common.ESignature"
                /></v-text>
              </v-col>
              <nuxt />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div v-if="logoutClicked">
      <iframe
        id="print"
        ref="iframe"
        style="width: 0; position: absolute; height: 0;"
        :src="`https://${$config.axios.backendBaseUrl}${$config.basePublicPath}/clear-cookie`"
        @load="iframecookieDeleted"
      />
    </div>
    <div v-if="dialog">
      <ESignForm :new-template-dialog.sync="dialog" :refresh="refresh" />
    </div>
  </v-app>
</template>

<script>
import ESignForm from '~/config/templates/grids/eSign-grid/ESignForm.vue'
import OrgnaizationList from '~/components/common/organization-list'
import AppDrawer from '~/components/common/app-drawer'
import Help from '~/components/common/help'
import OldSite from '~/components/common/oldsite'
import AppLogo from '~/components/common/app-logo'
import Upgrade from '~/components/common/upgrade'
import userUtils from '~/utility/userApps'
export default {
  layout: 'eSign',
  middleware: ['auth', 'authorization'],
  components: {
    OrgnaizationList,
    AppDrawer,
    Help,
    OldSite,
    Upgrade,
    ESignForm,
    AppLogo,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog1: false,
      dialog: false,
      notifications: false,
      sound: true,
      tabs: null,
      account: false,
      message: false,
      allowUpgrade: false,
      userPlanData: '',
      logoutClicked: false,
      notShowUserProfile: true,
    }
  },
  async created() {
    let token = this.$auth.strategy.token.get()
    if (token) {
      token = token.split(' ')[1]
    }
    await this.$apolloHelpers.onLogin(token, undefined, { expires: 7 })
  },
  mounted() {
    if (this.$store.state.auth.strategy === 'google') {
      this.notShowUserProfile = false
    }
    const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
    const userRoles = userInfo.roles || []
    this.allowUpgrade = userRoles.includes('$orgowner')
    window.addEventListener('message', this.messageReceived, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    onLogout(context) {
      if (this.$store.state.auth.loggedIn) {
        this.logoutClicked = true
      }
    },
    async userPlan() {
      const url = `${this.$bitpod.getApiUrl()}OrganizationInfos/getSubscription`
      try {
        const res = await this.$axios.$get(url)
        if (res) {
          const obj = res.filter((a) => {
            return a.isActive === true ? a : ''
          })
          this.userPlanData = obj[0].SubProduct.DisplayName
        }
      } catch (e) {
        console.error(
          `Error in layouts/eSign.vue in userPlan method while making get call to custom API to get users subscription, context: ${url} `,
          e
        )
      }
    },
    iframecookieDeleted() {
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      if (e.data === 'success' && this.logoutClicked) {
        this.$auth.logout()
        this.$apolloHelpers.onLogout()
      }
    },
    handleNewTemplate() {
      this.dialog = true
    },
  },
  head() {
    return {
      title: this.$t('Common.ESignature') + ' ' + this.$t('Common.Bitpod'),
    }
  },
}
</script>

<style>
.esign-app-title {
  width: 70% !important;
  margin: 0 auto;
}
@media (min-width: 1900px) {
  .esign-app-title {
    padding-left: 80px;
  }
}
@media (max-width: 1400px) {
  .esign-app-title {
    padding-left: 40px;
  }
}
@media (max-width: 600px) {
  .esign-app-title {
    width: 100% !important;
    padding-left: 0;
  }
}
</style>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :class="{
        'custom-nav-drawer': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
      app
      class="nav-bar greybg"
      :width="240"
      :right="$vuetify.rtl"
    >
      <div class="px-4 pt-3 pb-3">
        <i18n path="Common.CommunityApp" class="app-title-text" />
      </div>
      <v-list shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader pl-2">
                <i18n v-if="item.heading === 'Members'" path="Common.Members" />
              </v-subheader>
            </div>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="nav-title">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="localePath(item.to)"
              router
              exact
            >
              <v-list-item-action v-if="child.icon" class="nav-icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="localePath(item.to)"
            router
            exact
            :class="matchRoute(item.to)"
          >
            <v-list-item-action class="nav-icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="nav-title">
                <i18n v-if="item.text === 'Members'" path="Drawer.Members" />
                <i18n v-if="item.text === 'Contacts'" path="Drawer.Contacts" />
                <i18n v-if="item.text === 'Feeds'" path="Common.Feeds" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <Help
        class="d-block d-sm-none"
        @clicked="
          () => {
            drawer = false
          }
        "
      />
    </v-navigation-drawer>

    <v-app-bar app flat class="greybg headernew pl-0" height="50">
      <v-toolbar-title
        class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
      >
        <v-app-bar-nav-icon
          :ripple="false"
          size="24"
          height="36px"
          width="36px"
          class="ml-0 mr-0 d-lg-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <AppLogo />
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
        <v-dialog
          v-model="dialog"
          persistent
          scrollable
          content-class="slide-form-default"
        >
          <v-card>
            <v-card-title
              class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
            >
              <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
                <i18n path="Common.NewUser" />
              </h2>
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="onClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
              <v-form
                id="new-user-form"
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                @submit.prevent="onSave"
              >
                <v-row>
                  <v-col cols="12" sm="10" md="8" class="pb-0">
                    <v-text-field
                      v-model="email"
                      :label="$t('Common.EnterEmail')"
                      :rules="[rules.email, rules.required]"
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
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                depressed
                form="new-user-form"
                ><i18n path="Drawer.Save"
              /></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          <i18n path="Common.Login" />
        </v-btn>
      </div>
    </v-app-bar>

    <v-main
      class="greybg"
      :class="{
        'custom-nav-main': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
    >
      <v-container fluid>
        <v-row>
          <v-col class="pt-0 px-0 px-sm-3">
            <div>
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
  </v-app>
</template>

<script>
import OrgnaizationList from '~/components/common/organization-list'
import AppDrawer from '~/components/common/app-drawer'
import { rules } from '~/utility/rules.js'
import Help from '~/components/common/help'
import OldSite from '~/components/common/oldsite'
import AppLogo from '~/components/common/app-logo'
import Upgrade from '~/components/common/upgrade'
import Theme from '~/components/common/theme'
import userUtils from '~/utility/userApps'
export default {
  middleware: ['auth', 'authorization'],
  components: {
    OrgnaizationList,
    AppDrawer,
    Help,
    OldSite,
    Upgrade,
    Theme,
    AppLogo,
  },
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      drawer: null,
      dialog1: false,
      dialog: false,
      notifications: false,
      sound: true,
      tabs: null,
      account: false,
      message: false,
      valid: false,
      allowUpgrade: false,
      logoutClicked: false,
      notShowUserProfile: true,
      rules: rules(this.$i18n),
      userPlanData: '',
      activeClass: ' v-list-item--active',
      formData: {
        emailId: '',
      },
      email: '',
      items: [
        {
          icon: 'fa fa-users',
          text: 'Members',
          to: '/apps/member/list/Member/Members',
          allowedRoutes: [
            'apps/member/list/Member/Member',
            'apps/member/member/',
          ],
        },
        {
          icon: 'fa fa-address-book-o',
          text: 'Contacts',
          to: '/apps/member/list/Contacts/Contacts',
          allowedRoutes: [
            '/apps/member/contacts/',
            'apps/member/list/Contacts/Invites',
            'apps/member/event/invite/',
          ],
        },
        {
          icon: 'fa fa-message-square',
          text: 'Feeds',
          to: '/apps/member/list/Feed/feeds',
        },
      ],
    }
  },
  computed: {
    currentPage() {
      return this.$route.path
    },
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
    onClose() {
      this.dialog = false
      this.onReset()
    },
    onReset() {
      this.$refs.form.reset()
    },
    async onSave() {
      if (this.valid) {
        const url = this.$bitpod.getApiUrl()
        this.formData.emailId = this.email
        const orgId = this.$store.state.currentOrg.id
        this.formData.id = orgId
        try {
          const res = await this.$axios.$post(
            `${url}Organizations/${orgId}/Users`,
            this.formData
          )
          if (res) {
            this.dialog = false
            this.onReset()
            this.$eventBus.$emit('user-created')
          }
        } catch (e) {
          console.log(
            `Error in layouts/member.vue while making a POST call to Users model from method onSave context:-URL:-${url}\n OrgId:-${orgId}\n formData:-${this.formData} `,
            e
          )
        }
      }
    },
    matchRoute(toRoute) {
      return this.items.reduce((acc, i) => {
        if (!i.allowedRoutes || i.to !== toRoute) {
          return acc
        }
        const routeMatched = i.allowedRoutes.reduce((accc, j) => {
          return accc || this.currentPage.includes(j)
        }, false)
        return acc || routeMatched
      }, false)
        ? this.activeClass
        : ''
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
          `Error in layouts/member.vue in userPlan method while making get call to custom API to get users subscription, context: ${url} `,
          e
        )
      }
    },
    iframecookieDeleted() {
      console.log(
        'document.cookie that is passed to clear cookie',
        document.cookie
      )
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      console.log('message received from the the iframe', e.data)
      if (e.data === 'success' && this.logoutClicked) {
        this.$auth.logout()
        this.$apolloHelpers.onLogout()
      }
    },
  },
  head() {
    return {
      title: this.$t('Common.CommunityApp') + ' ' + this.$t('Common.Bitpod'),
    }
  },
}
</script>

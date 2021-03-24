<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="nav-bar greybg"
      :class="{
        'custom-nav-drawer': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
      :width="240"
      :right="$vuetify.rtl"
    >
      <div class="d-flex d-sm-none pl-3">
        <span class="bitpod-logo logo-ds">
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
            class="logofull mr-2"
          ></v-img>
        </span>
      </div>
      <v-list shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader pl-2">
                {{ item.heading }}
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
            v-else-if="item.requiresAuth ? $auth.loggedIn : true"
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
                {{ item.text }}
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
          class="ml-0 ml-md-2 mr-2 mr-md-3"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <span class="bitpod-logo logo-ds d-none d-sm-flex">
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
            class="logofull mr-2"
          ></v-img>
        </span>
        <i18n
          path="Common.HelpCenterMap"
          class="d-inline-flex align-center mx-0 mx-md-2 ml-0 ml-md-1"
          :class="$device.isMobile ? 'text-h6' : 'text-h5'"
        />
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Help class="d-none d-sm-inline" />
      <AppDrawer />
      <LanguageSwitcher />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <div v-if="$auth.$state.loggedIn">
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
            <v-list-item>
              <OrgnaizationList />
            </v-list-item>
            <OldSite />
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

    <v-main
      class="greybg help-center"
      :class="{
        'custom-nav-main': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
    >
      <v-container fluid class="pa-0">
        <v-row>
          <v-col class="pt-1 pb-0">
            <div>
              <nuxt />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import OrgnaizationList from '~/components/common/organization-list'
import AppDrawer from '~/components/common/app-drawer'
import Help from '~/components/common/help'
import OldSite from '~/components/common/oldsite'
import Upgrade from '~/components/common/upgrade'
import userUtils from '~/utility/userApps'
import HelpCenterFunc from '~/config/apps/help'
export default {
  head: {
    bodyAttrs: {
      class: 'help-center',
    },
  },
  components: {
    OrgnaizationList,
    AppDrawer,
    Help,
    OldSite,
    Upgrade,
  },
  props: {
    source: { type: String, default: '' },
  },
  data: () => ({
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
    triggerReset: false,
    triggerRecEventReset: false,
    allowUpgrade: false,
    activeClass: ' v-list-item--active',
    userPlanData: '',
    items: [],
  }),
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
    const HelpCenter = HelpCenterFunc(this.$config)
    Object.keys(HelpCenter).forEach((sectionName) => {
      this.items = this.items.concat({
        heading: this.$t(HelpCenter[sectionName].general.title),
      })
      Object.keys(HelpCenter[sectionName].views).forEach((viewName) => {
        this.items = this.items.concat({
          text: this.$t(HelpCenter[sectionName].views[viewName].title),
          to: HelpCenter[sectionName].views[viewName].to,
          requiresAuth: HelpCenter[sectionName].views[viewName].requiresAuth,
        })
      })
    })
  },
  mounted() {
    const loginStatus = this.$auth.strategy.token.get()
    if (!loginStatus) {
      location.replace(`${this.$config.basePublicPath}/unauthorized`)
    }
    const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
    const userRoles = userInfo.roles || []
    this.allowUpgrade = userRoles.includes('$orgowner')
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.$auth.logout()
    },
    closeSingleEventForm() {
      this.dialog1 = false
    },
    closeRecurringEventForm() {
      this.dialog = false
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
          `Error in layouts/event.vue in userPlan method while making get call to custom API to get users subscription, context: ${url} `,
          e
        )
      }
    },
  },
}
</script>
<style>
.help-center::-webkit-scrollbar {
  display: none;
}
.nav-bar > div.v-navigation-drawer__content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(182, 175, 175, 0.3);
  border-radius: 6px;
  background-color: #f5f5f5;
}
.nav-bar > div.v-navigation-drawer__content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
  display: unset;
}

.nav-bar > div.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
</style>

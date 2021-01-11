<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="nav-bar greybg"
      :width="240"
      :class="{
        'custom-nav-drawer': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
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
      <div class="text-center mt-4 pl-1">
        <v-btn
          v-bind="attrs"
          color="blue darken-2"
          dark
          depressed
          class="ma-3 block wd-full my-0 mb-1 ml-n4"
          v-on="on"
          @click.native="dialog = true"
        >
          <i18n path="Drawer.CreateUser" />
        </v-btn>
      </div>
      <v-list shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader pl-2">
                <i18n v-if="item.heading === 'Event'" path="Common.EventApp" />
                <i18n
                  v-if="item.heading === 'Security'"
                  path="Common.Security"
                />
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
          >
            <v-list-item-action class="nav-icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="nav-title">
                <i18n
                  v-if="item.text === 'Organization'"
                  path="Common.Organization"
                />
                <i18n v-if="item.text === 'Lookups'" path="Common.Lookups" />
                <i18n
                  v-if="item.text === 'Templates'"
                  path="Common.Templates"
                />
                <i18n
                  v-if="item.text === 'Badges Templates'"
                  path="Common.BadgesTemplates"
                />
                <i18n
                  v-if="item.text === 'Registration Form'"
                  path="Common.RegistrationForm"
                />
                <i18n v-if="item.text === 'Roles'" path="Common.Roles" />
                <i18n v-if="item.text === 'Users'" path="Common.Users" />
                <i18n
                  v-if="item.text === 'Access Keys'"
                  path="Common.AccessKeys"
                />
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
          path="Common.AdminApp"
          class="d-inline-flex align-center mx-0 mx-md-2 ml-0 ml-md-1 text-h5"
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
            <v-avatar color="primary ml-2" size="30" v-bind="attrs" v-on="on">
              <span class="white--text">{{
                $auth.user.data.name && $auth.user.data.name[0]
              }}</span>
            </v-avatar>
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
                    <Upgrade />
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
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
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
                color="primary"
                :disabled="!valid"
                depressed
                @click="onSave"
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

    <v-main class="greybg">
      <v-container fluid>
        <v-row>
          <v-col class="pt-0">
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
import { rules } from '~/utility/rules.js'
import Help from '~/components/common/help'
import OldSite from '~/components/common/oldsite'
import Upgrade from '~/components/common/upgrade'
import userUtils from '~/utility/userApps'
export default {
  middleware: ['auth', 'authorization'],
  components: {
    OrgnaizationList,
    AppDrawer,
    Help,
    OldSite,
    Upgrade,
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
      rules: rules(this.$i18n),
      formData: {
        emailId: '',
      },
      email: '',
      items: [
        { heading: 'Event' },
        {
          icon: 'fa fa-network',
          text: 'Organization',
          to: `/apps/admin/organization/${this.$store.state.currentOrgInfo.id}`,
        },
        {
          icon: 'fa fa-cog',
          text: 'Lookups',
          to: '/apps/admin/organization/lookups',
        },
        {
          icon: 'fa fa-file',
          text: 'Templates',
          to: '/apps/admin/list/marketingtemplates/template',
        },
        {
          icon: 'fa fa-id-badge',
          text: 'Badges Templates',
          to: '/apps/admin/list/badge/badge',
        },
        {
          icon: 'fa fa-file-text-o',
          text: 'Registration Form',
          to: '/apps/admin/list/registrationformdetails/registration form',
        },
        { heading: 'Security' },
        {
          icon: 'fa fa-shield',
          text: 'Roles',
          to: '/apps/admin/list/userroles/userroles',
        },
        {
          icon: 'fa fa-users',
          text: 'Users',
          to: '/apps/admin/list/users/users',
        },
        {
          icon: 'fa fa-key',
          text: 'Access Keys',
          to: '/apps/admin/list/accesskey/accesskey',
        },
      ],
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
    const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
    const userRoles = userInfo.roles || []
    this.allowUpgrade = userRoles.includes('$orgowner')
  },
  methods: {
    async onLogout() {
      this.$auth.logout()
      await this.$apolloHelpers.onLogout()
    },
    onClose() {
      this.dialog = false
      this.onReset()
    },
    onReset() {
      this.$refs.form.reset()
    },
    async onSave() {
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
          `Error in layouts/admin.vue while making a POST call to Users model from method onSave context:-URL:-${url}\n OrgId:-${orgId}\n formData:-${this.formData} `,
          e
        )
      }
    },
  },
}
</script>

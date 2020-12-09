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
      <v-toolbar-title
        class="ml-0 pl-3 px-2 py-1 logo-ds d-none d-sm-flex d-md-none align-center"
      >
        <span class="bitpod-logo logo-ds">
          <v-img
            :src="$config.cdnUri + 'logo-favicon.png'"
            class="logo-bitpod"
          ></v-img>
        </span>
        <i18n
          path="Common.AppTitle"
          class="d-inline-flex align-center mx-2 text-h5"
        />
        <v-spacer></v-spacer>
        <div v-if="drawer === true" class="d-none d-sm-flex">
          <v-app-bar-nav-icon
            class="nav-drawer"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </v-toolbar-title>
      <div class="text-center mt-3 mb-1 pl-1">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              color="primary"
              dark
              depressed
              class="ma-3 block wd-full my-0 mb-1 ml-n4"
              v-on="on"
            >
              <i18n path="Drawer.CreateEventAction" />
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              @click="
                triggerReset = !triggerReset
                dialog1 = !dialog1
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.SingleEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="
                triggerRecEventReset = !triggerRecEventReset
                dialog = !dialog
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.RecurringEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-list shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader pl-2">
                <i18n v-if="item.heading === 'Event'" path="Common.EventApp" />
                <i18n
                  v-if="item.heading === 'Promotions'"
                  path="Common.Promotions"
                />
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
                <i18n
                  v-if="item.text === 'Eventboard'"
                  path="Drawer.Eventboard"
                />
                <i18n v-if="item.text === 'Events'" path="Drawer.Events" />
                <i18n
                  v-if="item.text === 'Registrations'"
                  path="Drawer.Registrations"
                />
                <i18n
                  v-if="item.text === 'Discount Code'"
                  path="Drawer.DiscountCode"
                />
                <i18n v-if="item.text === 'Members'" path="Drawer.Members" />
                <i18n v-if="item.text === 'Contacts'" path="Drawer.Contacts" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-dialog
      v-model="dialog1"
      persistent
      scrollable
      content-class="slide-form"
    >
      <NewSingleEvent
        v-if="dialog1"
        :reset-data="triggerReset"
        :on-form-close="closeSingleEventForm"
      />
    </v-dialog>

    <v-dialog v-model="dialog" persistent scrollable content-class="slide-form">
      <NewRecurringEvent
        v-if="dialog"
        :reset-data="triggerRecEventReset"
        :on-form-close="closeRecurringEventForm"
      />
    </v-dialog>

    <v-app-bar app flat class="greybg headernew pl-0" height="50">
      <v-toolbar-title
        class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
      >
        <v-app-bar-nav-icon
          :ripple="false"
          size="24"
          height="36px"
          width="36px"
          class="ml-2 mr-3"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <span class="bitpod-logo logo-ds">
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
            class="logofull mr-2"
          ></v-img>
        </span>
        <i18n
          path="Common.AppTitle"
          class="d-inline-flex align-center mx-2 ml-3 text-h5"
        />
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
                <v-list-item-avatar size="48">
                  <v-avatar color="primary" size="48" v-bind="attrs" v-on="on">
                    <span class="white--text headline">{{
                      $auth.user.data.name && $auth.user.data.name[0]
                    }}</span>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{
                    $auth.user.data.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $auth.user.data.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list-item>
              <OrgnaizationList />
            </v-list-item>
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
      class="greybg"
      :class="{
        'custom-nav-main': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
    >
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
    <v-btn-fab elevation="1" fab icon outlined raised small
      ><v-icon>mdi-plus</v-icon></v-btn-fab
    >
  </v-app>
</template>

<script>
import OrgnaizationList from '~/components/common/organization-list'
import AppDrawer from '~/components/common/app-drawer'
export default {
  middleware: ['auth', 'authorization'],
  components: {
    OrgnaizationList,
    AppDrawer,
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
    activeClass: ' v-list-item--active',
    items: [
      {
        icon: 'fa fa-grid',
        text: 'Eventboard',
        to: '/apps/event/eventboard',
      },
      { heading: 'Event' },
      {
        icon: 'fa fa-calendar',
        text: 'Events',
        to: '/apps/event/list/Event/live and draft event',
        allowedRoutes: [
          '/apps/event/list/Event/eventInvitaionHistory',
          '/apps/event/event/',
        ],
      },
      {
        icon: 'fa fa-user-plus',
        text: 'Registrations',
        to: '/apps/event/list/Registrations/Registrations',
        allowedRoutes: ['/apps/event/registration'],
      },
      { heading: 'Promotions' },
      {
        icon: 'fa fa-building',
        text: 'Discount Code',
        to: '/apps/event/list/DiscountCodes/Discount Codes',
        allowedRoutes: ['/apps/event/discountcodes'],
      },
      { heading: 'Members' },
      {
        icon: 'fa fa-users',
        text: 'Members',
        to: '/apps/event/list/EventCustomers/Members',
      },
      {
        icon: 'fa fa-address-book-o',
        text: 'Contacts',
        to: '/apps/event/list/Contacts/Contacts',
        allowedRoutes: [
          '/apps/event/contacts/',
          'apps/event/list/Contacts/Invites',
        ],
      },
    ],
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
  },
}
</script>

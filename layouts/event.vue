<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="nav-bar greybg"
      :width="280"
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
      <div class="text-center mt-4">
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
            <v-list-item @click="dialog1 = !dialog1">
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.SingleEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="dialog = !dialog">
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
              :to="item.to"
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
                {{ item.text }}
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
      transition="dialog-bottom-transition"
    >
      <NewSingleEvent :on-form-close="closeSingleEventForm" />
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form"
      transition="dialog-bottom-transition"
    >
      <NewRecurringEvent :on-form-close="closeRecurringEventForm" />
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
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
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
      </v-toolbar-title>
      <div class="d-flex d-sm-flex d-md-none ml-n3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title class="pl-0 ml-n1"
        ><i18n path="Common.EventApp" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LanguageSwitcher />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-menu
        offset-y
        transition="slide-y-transition"
        bottom
        content-class="app-drawer"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="d-flex flex-wrap app-container">
              <nuxt-link
                to="/apps/event/list/Event/live and draft event"
                class="text-decoration-none"
              >
                <v-flex
                  class="d-flex justify-center align-center flex-column app-view"
                >
                  <v-flex class="d-flex justify-center align-center">
                    <i
                      class="fa fa-calendar fs-36 success--text"
                      aria-hidden="true"
                    ></i>
                  </v-flex>
                  <v-flex>
                    <i18n
                      path="Common.EventApp"
                      class="pa-1 caption text--primary"
                    />
                  </v-flex>
                </v-flex>
              </nuxt-link>
              <nuxt-link
                to="/apps/admin/organization/5cfe026f6ab042000c530105"
                class="text-decoration-none"
              >
                <v-flex
                  class="d-flex justify-center align-center flex-column app-view"
                >
                  <v-flex class="d-flex justify-center align-center">
                    <i
                      class="fa fa-cogs fs-36 primary--text"
                      aria-hidden="true"
                    ></i>
                  </v-flex>
                  <v-flex>
                    <i18n
                      path="Common.AdminApp"
                      class="pa-1 caption text--primary"
                    />
                  </v-flex>
                </v-flex>
              </nuxt-link>
              <nuxt-link to="" class="text-decoration-none">
                <v-flex
                  class="d-flex justify-center align-center flex-column app-view"
                >
                  <v-flex class="d-flex justify-center align-center">
                    <i
                      class="fa fa-help-circle fs-36 warning--text"
                      aria-hidden="true"
                    ></i>
                  </v-flex>
                  <v-flex>
                    <i18n
                      path="Common.HelpCenterMap"
                      class="pa-1 caption text--primary"
                    />
                  </v-flex>
                </v-flex>
              </nuxt-link>
              <a
                href="https://dev-survey.bitpod.io/"
                class="text-decoration-none"
                target="_blank"
              >
                <v-flex
                  class="d-flex justify-center align-center flex-column app-view"
                >
                  <v-flex class="d-flex justify-center align-center">
                    <v-img
                      src="https://survey.bitpod.io/favicon.ico"
                      class="survey-img"
                    ></v-img>
                  </v-flex>
                  <v-flex>
                    <i18n
                      path="Common.SurveyApp"
                      class="pa-1 caption text--primary"
                    />
                  </v-flex>
                </v-flex>
              </a>
              <nuxt-link to="" class="text-decoration-none">
                <v-flex
                  class="d-flex justify-center align-center flex-column app-view"
                >
                  <v-flex class="d-flex justify-center align-center">
                    <i
                      class="fa fa-grid-alt fs-36 primary--text"
                      aria-hidden="true"
                    ></i>
                  </v-flex>
                  <v-flex>
                    <i18n
                      path="Common.SeatMap"
                      class="pa-1 caption text--primary"
                    />
                  </v-flex>
                </v-flex>
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
import LanguageSwitcher from '~/components/LanguageSwitcher'

export default {
  components: {
    OrgnaizationList,
    LanguageSwitcher,
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
      },
      {
        icon: 'fa fa-user-plus',
        text: 'Registrations',
        to: '/apps/event/list/Registrations/Registrations',
      },
      { heading: 'Promotions' },
      {
        icon: 'fa fa-building',
        text: 'Discount Code',
        to: '/apps/event/list/DiscountCodes/Discount Codes',
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
      },
    ],
  }),
  async created() {
    if (!this.$apolloHelpers.getToken()) {
      let token = this.$auth.strategy.token.get()
      if (token) {
        token = token.split(' ')[1]
      }
      await this.$apolloHelpers.onLogin(token, undefined, { expires: 7 })
    }
  },
  methods: {
    async onLogout() {
      this.$auth.logout()
      await this.$apolloHelpers.onLogout()
    },
    closeSingleEventForm() {
      this.dialog1 = false
    },
    closeRecurringEventForm() {
      this.dialog = false
    },
  },
}
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="nav-bar">
      <v-toolbar-title class="ml-0 pl-3 px-2 py-2 logo-ds d-flex align-center">
        <span class="hidden-sm-and-down bitpod-logo logo-ds">
          <v-img
            src="https://res.cloudinary.com/mytestlogo/image/upload/v1578310772/logo/logo-favicon.png"
            height="50"
            width="30"
          ></v-img>
        </span>
        <span d-inline-flex align-center class="mx-2">Event</span>
        <v-spacer></v-spacer>
        <div v-if="drawer === true">
          <v-app-bar-nav-icon
            class="nav-drawer"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </v-toolbar-title>
      <div class="text-center">
        <v-btn
          v-bind="attrs"
          color="blue darken-2"
          dark
          depressed
          class="ma-3 block wd-full"
          v-on="on"
        >
          Create user
        </v-btn>
      </div>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader">
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
          <v-list-item v-else :key="item.text" link :to="item.to" router exact>
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

    <v-app-bar app flat class="greybg">
      <div
        v-if="drawer === false"
        class="ml-xs-0"
        :class="drawer ? '' : 'ml-md-n4 mr-md-2'"
      >
        <v-app-bar-nav-icon
          :ripple="false"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title class="pl-0 ml-n2">Administration </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" tile outlined>
        UPGARDE
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-menu
        offset-y
        :nudge-width="250"
        transition="slide-y-transition"
        bottom
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
                to="/apps/event/list/Event/All Events"
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
                  <v-flex
                    ><div class="pa-1 caption text--primary">
                      Event
                    </div></v-flex
                  >
                </v-flex>
              </nuxt-link>
              <nuxt-link
                to="/apps/admin/list/registrationformdetails/registration form"
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
                  <v-flex
                    ><div class="pa-1 caption text--primary">
                      Administration
                    </div></v-flex
                  >
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
                  <v-flex
                    ><div class="pa-1 caption text--primary">
                      Help Center
                    </div></v-flex
                  >
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
                    <v-img src="https://survey.bitpod.io/favicon.ico"></v-img>
                  </v-flex>
                  <v-flex
                    ><div class="pa-1 caption text--primary">
                      Survey
                    </div></v-flex
                  >
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
                  <v-flex
                    ><div class="pa-1 caption text--primary">
                      Seat Map
                    </div></v-flex
                  >
                </v-flex>
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
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
              <span class="white--text">{{ $auth.user.data.name[0] }}</span>
            </v-avatar>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="primary" size="48" v-bind="attrs" v-on="on">
                    <span class="white--text headline">{{
                      $auth.user.data.name[0]
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
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="message" color="primary"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Notification</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>

            <v-list>
              <v-list-item class="text-center justify-center">
                <v-btn class="ma-2" outlined color="primary" @click="onLogout">
                  Logout
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          Login
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="greybg">
      <v-container fluid>
        <v-row>
          <v-col>
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
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    drawer: true,
    dialog1: false,
    dialog: false,
    notifications: false,
    sound: true,
    tabs: null,
    account: false,
    message: false,
    items: [
      { heading: 'Event' },
      {
        icon: 'fa fa-network',
        text: 'Organization',
        to: '/apps/admin/list/Event/All Events',
      },
      {
        icon: 'fa fa-cog',
        text: 'Lookups',
        to: '',
      },
      {
        icon: 'fa fa-file',
        text: 'Invite Templates',
        to: '',
      },
      {
        icon: 'fa fa-grid-alt',
        text: 'Seat Maps',
        to: '',
      },
      {
        icon: 'fa fa-id-badge',
        text: 'Badges Templates',
        to: '',
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
        to: '',
      },
      {
        icon: 'fa fa-users',
        text: 'Users',
        to: '',
      },
      {
        icon: 'fa fa-key',
        text: 'Access Keys',
        to: '',
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
  },
}
</script>

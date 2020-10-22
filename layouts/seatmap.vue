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
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <span class="bitpod-logo logo-ds">
          <v-img
            :src="$config.cdnUri + 'logo-favicon.png'"
            class="logo-bitpod"
          ></v-img>
        </span>
        <i18n
          path="Common.EventApp"
          class="d-inline-flex align-center mx-2 text-h5"
        />
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <div class="d-flex d-sm-flex d-md-none ml-n3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title class="pl-0 ml-n1"
        ><i18n path="Common.Seatmaps"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
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
              <nuxt-link
                to="/apps/seatmap/list/seatmaps/seatmaps"
                class="text-decoration-none"
              >
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
                  <i18n path="Drawer.Logout" />
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          <i18n path="Drawer.Login" />
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="greybg seatmap">
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
export default {
  layout: 'seatmap',
  components: {
    OrgnaizationList,
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
    }
  },
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

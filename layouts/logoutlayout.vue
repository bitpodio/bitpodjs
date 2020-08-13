<template>
  <v-app id="inspire">
    <v-app-bar app flat class="greybg">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">Event</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
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
                <v-btn
                  class="ma-2"
                  outlined
                  color="primary"
                  @click="$auth.logout()"
                >
                  Logout
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          Sign in
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
  layout: 'logoutlayout',
  props: {
    source: String,
  },
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
      { icon: 'mdi-view-dashboard', text: 'Eventboard', to: '/' },
      { heading: 'Event' },
      { icon: 'mdi-calendar-text', text: 'Events', to: '/flat/tiles' },
      {
        icon: 'mdi-account-plus',
        text: 'Registarions',
        to: '/list/Registrations/Registrations',
      },
      { heading: 'Promotions' },
      {
        icon: 'mdi-cog',
        text: 'Discount Code',
        to: '/list/DiscountCodes/Discount Codes',
      },
      { heading: 'Members' },
      {
        icon: 'mdi-account-multiple-outline',
        text: 'Members',
        to: '/list/EventCustomers/Members',
      },
      {
        icon: 'mdi-account-box-outline',
        text: 'Contacts',
        to: '/list/Contacts/Contacts',
      },
      { heading: 'Task' },
      { icon: 'mdi-cellphone-link', text: 'My Task', to: '' },
    ],
  }),
  methods: {
    method() {
      // Perform an action
    },
  },
}
</script>

<style scoped>
.bitpod-logo img {
  max-width: 130px;
}
.wd-full {
  width: -webkit-fill-available;
}
.nav-title {
  font-size: 14px !important;
  font-weight: 400 !important;
}
.nav-subheader {
  font-size: 14px !important;
}
.app-name {
  font-size: 24px;
  font-weight: 300;
}
</style>

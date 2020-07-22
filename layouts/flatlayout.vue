<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar-title class="ml-0 pl-3 logo-ds d-flex align-center">
        <span class="hidden-sm-and-down bitpod-logo logo-ds">
          <v-img
            src="https://res.cloudinary.com/mytestlogo/image/upload/v1578310772/logo/logo-favicon.png"
            height="50"
            width="30"
          ></v-img>
        </span>
        <span d-inline-flex align-center class="mx-2">Event</span>
      </v-toolbar-title>
      <v-list dense>
        <v-btn
          color="blue darken-2"
          dark
          class="ma-3 block wd-full"
          @click="dialog = !dialog"
          >Create Event</v-btn
        >
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
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
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
          <v-list-item v-else :key="item.text" link>
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

    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">Event</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" tile outlined>
        UPGARDE
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
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
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    items: [
      { icon: 'mdi-contacts', text: 'Eventboard', route: '/home' },
      { heading: 'Event' },
      { icon: 'mdi-history', text: 'Events', route: '/bitpodpage1' },
      { icon: 'mdi-content-copy', text: 'Registarions', route: '/bitpodpage2' },
      { heading: 'Promotions' },
      { icon: 'mdi-cog', text: 'Discount Code', route: '/bitpodpage1' },
      { heading: 'Members' },
      { icon: 'mdi-message', text: 'Members', route: '/bitpodpage1' },
      { icon: 'mdi-contacts', text: 'Contacts', route: '/bitpodpage2' },
      { heading: 'Task' },
      { icon: 'mdi-cellphone-link', text: 'My Task', route: '/bitpodpage1' },
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

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-btn
          color="blue darken-2"
          dark
          class="ma-3 wd-full"
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

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="grey lighten-4 pl-0"
      white
      class="no-shadow"
    >
      <div class="head-left">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="ml-0 pl-0 logo-ds">
          <span class="hidden-sm-and-down bitpod-logo logo-ds">
            <v-img
              src="https://res.cloudinary.com/mytestlogo/image/upload/v1578310772/logo/logo-favicon.png"
              height="50"
              width="30"
            ></v-img>
          </span>
          <span class="app-name mx-2">Event</span>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" tile outlined color="black">
        UPGARDE
      </v-btn>
      <v-btn icon>
        <v-icon color="black">mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="black">mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="black">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-container fluid>
        <div>
          <nuxt />
        </div>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-5">
          Create Event
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    dialog: false,
    drawer: null,
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
}
</script>

<style scoped>
.bitpod-logo img {
  max-width: 130px;
}
.logo-ds {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.wd-full {
  width: -webkit-fill-available;
}
.nav-title {
  font-size: 14px !important;
  font-weight: 400 !important;
}
.nav-icon {
  margin: 5px !important;
  margin-right: 15px !important;
}
.nav-subheader {
  font-size: 14px !important;
}
.app-name {
  font-size: 24px;
  font-weight: 300;
  color: #000;
}
.head-left {
  display: flex;
  height: 64px;
  align-items: center;
  width: 256px;
  background: #fff !important;
  padding-left: 0 !important;
  margin-left: -16px !important;
  border-right: 1px solid #e2e2e2 !important;
}
.no-shadow {
  box-shadow: none !important;
  padding-left: 0 !important;
}
</style>

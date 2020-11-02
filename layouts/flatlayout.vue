<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app fixed top="50">
      <v-toolbar-title class="ml-0 pl-3 logo-ds d-flex align-center">
        <span class="hidden-sm-and-down bitpod-logo logo-ds">
          <v-img
            :src="$config.cdnUri + 'logo-favicon.png'"
            height="50"
            width="30"
          ></v-img>
        </span>
        <i18n path="Common.EventApp" class="d-inline-flex align-center mx-2" />
      </v-toolbar-title>
      <div class="text-center">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              color="blue darken-2"
              dark
              class="ma-3 block wd-full"
              v-on="on"
            >
              <i18n path="Drawer.CreateEventAction" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="dialog1 = !dialog1">
              <v-list-item-title
                ><i18n path="Drawer.SingleEventAction"
              /></v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog = !dialog">
              <v-list-item-title
                ><i18n path="Drawer.RecurringEventAction"
              /></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog1" persistent max-width="850px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <i18n path="Common.OpenDialog" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <i18n path="Common.NewEvent" class="headline" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :label="$t('Common.EventNameRequired')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    outlined
                    :label="$t('Common.StartDate')"
                    append-icon="fa-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false"
                    ><i18n path="Drawer.Cancel"
                  /></v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)"
                    ><i18n path="Drawer.OK"
                  /></v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    outlined
                    :label="$t('Common.EndDate')"
                    append-icon="fa-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                :label="$t('Common.TimezoneRequired')"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                clearable
                outlined
                clear-icon="fa fa-close"
                :label="$t('Common.Description')"
                value=""
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('Common.EventL')"
                hint="https://bitpod-event.test.bitpod.io/e/"
                persistent-hint
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <small><i18n path="Common.IndicatesRequiredField" /></small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog1 = false"
            ><i18n path="Drawer.Close"
          /></v-btn>
          <v-btn color="blue darken-1" text @click="dialog1 = false"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title><i18n path="Common.NewEvent" /></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"
              ><i18n path="Drawer.Save"
            /></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="$t('Common.EventNameRequired')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      :label="$t('Common.StartDate')"
                      append-icon="fa-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"
                      ><i18n path="Drawer.Cancel"
                    /></v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"
                      ><i18n path="Drawer.OK"
                    /></v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      :label="$t('Common.EndDate')"
                      append-icon="fa-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  :label="$t('Common.TimezoneRequired')"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  clearable
                  clear-icon="fa-close"
                  :label="$t('Common.Description')"
                  value=""
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :label="$t('Common.EventL')"
                  hint="https://bitpod-event.test.bitpod.io/e/"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small><i18n path="Common.IndicatesRequiredField" /></small>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-app-bar fixed app flat class="greybg headernew">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0"
        ><i18n path="Common.EventApp"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" tile outlined>
        <i18n path="Drawer.Upgrade" />
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
      <v-menu
        v-model="account"
        :close-on-content-click="false"
        :nudge-width="180"
        offset-y
        transition="slide-y-transition"
        bottom
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template> -->
        <template v-if="$auth.$state.loggedIn" v-slot:activator="{ on, attrs }">
          <v-avatar color="primary ml-1" size="30" v-bind="attrs" v-on="on">
            <span class="white--text">{{ $auth.user.data.name[0] }}</span>
          </v-avatar>
        </template>
        <template v-else>
          <v-btn to="/login"><i18n path="Common.Login" /></v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="Rishi"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item class="text-center justify-center">
              <v-btn
                class="ma-2"
                outlined
                color="primary"
                @click="$auth.logout()"
              >
                <i18n path="Common.Logout" />
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
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
    source: { type: String, default: '' },
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
      {
        icon: 'fa fa-tachometer',
        text: 'Eventboard',
        to: '/apps/event/eventboard',
      },
      { heading: 'Event' },
      { icon: 'mdi-history', text: 'Events', to: '/flat/tiles' },
      {
        icon: 'mdi-content-copy',
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
      { icon: 'mdi-message', text: 'Members', to: '/members' },
      { icon: 'mdi-contacts', text: 'Contacts', to: '' },
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

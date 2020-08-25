<template>
  <v-flex>
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
            Forms
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="dialog1 = !dialog1">
            <v-list-item-title>Outline Form</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialog = !dialog">
            <v-list-item-title>Full Size</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-dialog v-model="dialog1" persistent content-class="slide-form">
      <v-card>
        <v-toolbar dark color="accent">
          <v-toolbar-title>New Event</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card flat>
          <v-tabs v-model="tabs" center-active class="pl-md-4 pl-sm-4">
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              href="#mobile-tabs-5-1"
              class="primary--text ml-md-4 ml-sm-4"
            >
              <v-icon>mdi-phone</v-icon>
              <span>Basic Info</span>
            </v-tab>

            <v-tab href="#mobile-tabs-5-2" class="primary--text">
              <v-icon>mdi-heart</v-icon>
              <span>Location</span>
            </v-tab>

            <v-tab href="#mobile-tabs-5-3" class="primary--text">
              <v-icon>mdi-account-box</v-icon>
              <span>Tickets</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="i in 1" :key="i" :value="'mobile-tabs-5-1'">
              <v-card flat>
                <v-card-text>
                  <v-card-text>
                    <p>
                      Enter event name and details to help your audience learn
                      about your event, add details that highlights why someone
                      should attend it.
                    </p>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Event Name*"
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
                              label="Start Date"
                              append-icon="fa-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(date)"
                              >OK</v-btn
                            >
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
                              label="End Date"
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
                          label="Timezone*"
                          required
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          clearable
                          outlined
                          clear-icon="fa fa-close"
                          label="Description"
                          value=""
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Event Link*"
                          hint="https://bitpod-event.test.bitpod.io/e/"
                          persistent-hint
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <small>*indicates required field</small>
                  </v-card-text>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item v-for="i in 1" :key="i" :value="'mobile-tabs-5-2'">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['Online Event', 'Venue']"
                      label="Location Type"
                      required
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Online Event Link"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Additional online event joining instructions, URL, phone etc."
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item v-for="i in 1" :key="i" :value="'mobile-tabs-5-3'">
              <v-card flat>
                <v-card-text>
                  <p>
                    Setup event tickets and price, you can also set tickets
                    validity so early birds can be offered better pricing.
                  </p>
                  <v-btn class="ma-2" outlined color="indigo"
                    >Add Tickets</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog1 = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog1 = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Event</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Event Name*" required></v-text-field>
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
                      label="Start Date"
                      append-icon="fa-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"
                      >OK</v-btn
                    >
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
                      label="End Date"
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
                  label="Timezone*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  clearable
                  clear-icon="fa-close"
                  label="Description"
                  value=""
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Event Link*"
                  hint="https://bitpod-event.test.bitpod.io/e/"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  layout: 'flatlayout',
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
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  methods: {},
}
</script>

<style>
.slide-form {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  width: calc(100% - 300px) !important;
  max-height: calc(100% - 100px) !important;
}
</style>

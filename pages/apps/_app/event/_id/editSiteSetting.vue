<template>
  <v-layout>
    <v-dialog
      v-model="sitesetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            >Edit Registration Page Settings
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-card flat>
            <v-tabs v-model="tabs" center-active>
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#mobile-tabs-5-1" class="primary--text">
                <span>Templates</span>
              </v-tab>

              <v-tab href="#mobile-tabs-5-2" class="primary--text">
                <span>Section Setting</span>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">
              <v-tab-item v-for="i in 1" :key="i" :value="'mobile-tabs-5-1'">
                <v-row>
                  <v-col cols="12" style="min-height: 90vh;">
                    Select a template
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item v-for="i in 1" :key="i" :value="'mobile-tabs-5-2'">
                <v-row>
                  <v-col cols="12">
                    Here you can change section titles of registration site, to
                    best suit your event. For example, you may relabel Speakers
                    to Artists
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Speakers section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Registration Types section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Sessions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Register button"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Tickets section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Tickets"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Date and Time section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Venue section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Recurring Sessions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Registration Questions section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Image Gallery section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Label for Reviews section"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['Bollons', 'Music', 'Airlift']"
                      label="Animation"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"></v-col>
                  <v-col cols="12" class="py-0">
                    <v-checkbox
                      v-model="allowSpaces"
                      label=" Show Image Gallery"
                      class="ma-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-checkbox
                      v-model="allowSpaces"
                      label=" Show Event Reviews"
                      class="ma-0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click.native="close">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    sitesetting: {
      default: false,
    },
  },
  data() {
    return {
      tabs: null,
    }
  },
  methods: {
    close() {
      this.$emit('update:sitesetting', false)
    },
  },
}
</script>

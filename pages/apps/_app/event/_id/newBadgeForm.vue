<template>
  <v-layout>
    <v-dialog
      v-model="newBadge"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Badge </v-toolbar-title>
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
                <span>Designer</span>
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
                  <v-col cols="12" style="min-height: 90vh;">
                    Use the designer to make changes to badge template
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      label="Description"
                      value=""
                    ></v-textarea>
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
    newBadge: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
  },
  data() {
    return {
      tabs: null,
    }
  },
  methods: {
    close() {
      this.$emit('update:newBadge', false)
    },
  },
}
</script>

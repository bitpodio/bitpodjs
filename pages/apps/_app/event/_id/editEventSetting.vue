<template>
  <v-form ref="form" v-model="valid">
    <v-dialog
      v-model="eventSetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">Edit Event Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <!-- <v-card-text class="px-15 pt-4 px-xs-2"> -->
          <v-row>
            <!-- <v-col cols="12">
              <h1 class="mb-3 black--text">Edit Event Settings</h1>
            </v-col> -->
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Public', 'Private']"
                label="Privacy*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['INR', 'EUR', 'AUD']"
                label="Currency*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="GL Account Code" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Cost Center" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="formData.UniqLink"
                label="Event Link*"
                hint="https://bitpod-event.test.bitpod.io/e/"
                persistent-hint
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6"></v-col>
            <v-col cols="12">
              <v-textarea
                clearable
                outlined
                clear-icon="fa fa-close"
                label="Cancelation Policy"
                value=""
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="allowSpaces"
                label=" Allow Cancelation"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="allowSpaces"
                label=" Show attendee form for each ticket"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="allowSpaces"
                label=" Session Timing Conflict"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="allowSpaces"
                label=" Show Remaining Tickets"
                class="ma-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-checkbox
                v-model="allowSpaces"
                label=" Notify event organizer when someone registers"
                class="ma-0"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import gql from 'graphql-tag'
import event from '~/config/apps/event/gql/event.gql'
// import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
export default {
  props: {
    eventSetting: {
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      tags: [],
      tagsDropdown: [],
      data: {
        event: {},
      },
      formData: {},
    }
  },
  methods: {
    close() {
      this.$emit('update:eventSetting', false)
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${event}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        debugger
        const event = formatGQLResult(data, 'Event')
        this.formData = event.length > 0 ? { ...event[0] } : {}
        return {
          event: event.length > 0 ? event[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>

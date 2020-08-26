<template>
  <v-layout>
    <v-dialog
      v-model="eventSetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="px-15">
          <span class="headline"></span>
          <v-spacer></v-spacer>
          <div>
            <v-btn text large color="primary" depressed @click.native="close"
              ><v-icon left>mdi-check</v-icon>Save</v-btn
            >
            <v-btn class="mr-2" outlined color="primary"
              ><v-icon left>mdi-check</v-icon>Save</v-btn
            >
          </div>
          <div>
            <v-btn icon depressed @click.native="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-15 pt-4 px-xs-2">
          <v-row>
            <v-col cols="12">
              <h1 class="mb-3 black--text">Edit Event Settings</h1>
            </v-col>
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
  </v-layout>
</template>

<script>
export default {
  props: {
    eventSetting: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:eventSetting', false)
    },
  },
}
</script>

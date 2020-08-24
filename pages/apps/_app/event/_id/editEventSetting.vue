<template>
  <v-layout>
    <v-dialog
      v-model="eventsetting"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">Edit Event Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
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
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="formdialog = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    eventsetting: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:eventsetting', false)
    },
  },
}
</script>

<template>
  <v-layout>
    <v-dialog
      v-model="eventform"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            >Edit Event Information</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Event Name*"
                required
                outlined
              ></v-text-field>
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Event organizer *"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Event Manager/Team Email *"
                outlined
                required
              ></v-text-field>
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
    eventform: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:eventform', false)
    },
  },
}
</script>

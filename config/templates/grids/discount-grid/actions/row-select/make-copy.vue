<template>
  <v-col class="px-0">
    <v-dialog v-model="dialog" persistent content-class="slide-form-default">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> New Registration
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Registration</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field
                label="First Name*"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field label="Last Name*" required outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Phone*" required outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Email*" required outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Organization" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Success', 'Pending', 'Failed', 'Cancelled']"
                label="Status*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="body-1">
                Physical Address
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Address" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="City" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="State" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Zip" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                outlined
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="[
                  'Event Name 1',
                  'Event Name 2',
                  'Event Name 3',
                  'Event Name 4',
                ]"
                label="Event*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['General Tickets', 'Gold Tickets', 'Silver Tickets']"
                label="Tickets*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="number"
                type="number"
                label="Ticket Quantity*"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Session1', 'Session2', 'Session3', 'Session4']"
                label="Session*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Group', 'Free', 'paid']"
                label="Registration Type*"
                required
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="registrations = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>

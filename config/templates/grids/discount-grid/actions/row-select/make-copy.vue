<template>
  <v-col class="px-0">
    <v-dialog v-model="dialog" persistent content-class="slide-form-default">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.NewRegistration" />
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            ><i18n path="Common.NewRegistration"
          /></v-toolbar-title>
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
                :label="$t('Common.FirstN')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field
                :label="$t('Common.LastName')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('Common.PhoneRequired')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('Common.Email')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('Common.Organization')"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Success', 'Pending', 'Failed', 'Cancelled']"
                :label="$t('Common.StatusRequired')"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="body-1">
                <i18n path="Common.PhysicalAddress" />
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('Common.Address')"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field :label="$t('Common.City')" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field :label="$t('Common.State')" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field :label="$t('Common.Zip')" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[
                  () => !!country || $t('Messages.Error.ThisFieldRequired'),
                ]"
                :items="countries"
                :label="$t('Common.Country')"
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
                :label="$t('Common.Event')"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['General Tickets', 'Gold Tickets', 'Silver Tickets']"
                :label="$t('Common.TicketsRequired')"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="number"
                type="number"
                :label="$t('Common.TicketQuantity')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Session1', 'Session2', 'Session3', 'Session4']"
                :label="$t('Common.Session')"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="['Group', 'Free', 'paid']"
                :label="$t('Common.RegistrationTypeRequired')"
                required
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="registrations = false"
            ><i18n path="Drawer.Save"
          /></v-btn>
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

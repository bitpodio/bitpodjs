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
            <v-list-item-title>Vertical Form</v-list-item-title>
          </v-list-item>
          <v-list-item @click="stepform = !stepform">
            <v-list-item-title>Single Event</v-list-item-title>
          </v-list-item>
          <v-list-item @click="registrations = !registrations">
            <v-list-item-title>New Registrations</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialog = !dialog">
            <v-list-item-title>Full Size</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-dialog
      v-model="dialog1"
      persistent
      content-class="slide-form"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="accent">
          <v-toolbar-title>New Event</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="e13" vertical class="elevation-0 stepper-box">
          <v-stepper-step step="1" complete>
            Basic Info
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card flat>
              <p>
                Enter event name and details to help your audience learn about
                your event, add details that highlights why someone should
                attend it.
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
            </v-card>
            <v-btn color="primary" @click="e13 = 2">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step step="2" complete>Location</v-stepper-step>

          <v-stepper-content step="2">
            <v-card flat>
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
            </v-card>
            <v-btn color="primary" @click="e13 = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step step="3">Tickets</v-stepper-step>

          <v-stepper-content step="3">
            <v-card flat>
              <p>
                Setup event tickets and price, you can also set tickets validity
                so early birds can be offered better pricing.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addNewRow1"
                >Add Tickets</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Price</th>
                      <th class="text-left">Start Date</th>
                      <th class="text-left">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(invoice_product, k) in invoice_products"
                      :key="k"
                    >
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="Title"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-select
                          v-model="invoice_product.product_price"
                          :items="['Free', 'Paid', 'Donation']"
                          label="Type"
                          outlined
                        ></v-select>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_qty"
                          label="price"
                          outlined
                          value=""
                          prefix="$"
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="Start Date"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="End Date"
                          outlined
                        ></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
            <v-btn color="primary" @click="e13 = 1">Back</v-btn>
          </v-stepper-content>
        </v-stepper>

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
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="stepform"
      persistent
      content-class="slide-form"
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark app color="accent">
        <v-toolbar-title>New Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="stepform = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="e1">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="e1 > 1" step="1"
            >Basic Info</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Location</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Tickets</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="stepper-box">
          <v-stepper-content step="1">
            <v-card flat>
              <p>
                Enter event name and details to help your audience learn about
                your event, add details that highlights why someone should
                attend it.
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
            </v-card>

            <v-btn color="primary" @click="e1 = 2">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
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
            </v-card>

            <v-btn color="primary" @click="e1 = 3">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat>
              <p>
                Setup event tickets and price, you can also set tickets validity
                so early birds can be offered better pricing.
              </p>
              <v-btn class="ma-2" outlined color="indigo" @click="addNewRow1"
                >Add Tickets</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Title</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Price</th>
                      <th class="text-left">Start Date</th>
                      <th class="text-left">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(invoice_product, k) in invoice_products"
                      :key="k"
                    >
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="Title"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-select
                          v-model="invoice_product.product_price"
                          :items="['Free', 'Paid', 'Donation']"
                          label="Type"
                          outlined
                        ></v-select>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_qty"
                          label="price"
                          outlined
                          value=""
                          prefix="$"
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="Start Date"
                          outlined
                        ></v-text-field>
                      </td>
                      <td class="pa-2 pb-0">
                        <v-text-field
                          v-model="invoice_product.product_no"
                          label="End Date"
                          outlined
                        ></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
            <v-btn color="primary" @click="e1 = 1">Back</v-btn>
            <v-btn color="primary" @click="stepform = false">Save</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog
      v-model="registrations"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Registration</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="registrations = false">
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
  </v-flex>
</template>

<script>
export default {
  layout: 'flatlayout',
  props: {
    source: { type: String, default: '' },
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    countries: [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua &amp; Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia &amp; Herzegovina',
      'Botswana',
      'Brazil',
      'British Virgin Islands',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Cape Verde',
      'Cayman Islands',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      'Cote D Ivoire',
      'Croatia',
      'Cruise Ship',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'France',
      'French Polynesia',
      'French West Indies',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Isle of Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kuwait',
      'Kyrgyz Republic',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Namibia',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Pierre &amp; Miquelon',
      'Samoa',
      'San Marino',
      'Satellite',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'South Africa',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'St Kitts &amp; Nevis',
      'St Lucia',
      'St Vincent',
      'St. Lucia',
      'Sudan',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      "Timor L'Este",
      'Togo',
      'Tonga',
      'Trinidad &amp; Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks &amp; Caicos',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Venezuela',
      'Vietnam',
      'Virgin Islands (US)',
      'Yemen',
      'Zambia',
      'Zimbabwe',
    ],
    menu: false,
    e13: 2,
    e1: 1,
    modal: false,
    show: false,
    menu2: false,
    drawer: true,
    dialog1: false,
    stepform: false,
    registrations: false,
    dialog: false,
    notifications: false,
    sound: true,
    tabs: null,
    invoice_products: [
      {
        product_no: '',
        product_name: '',
        product_price: '',
        product_qty: '',
        line_total: 0,
      },
    ],
  }),
  methods: {
    addNewRow() {
      this.desserts.push({
        name: '',
        calories: '',
      })
    },
    addNewRow1() {
      this.invoice_products.push({
        product_no: '',
        product_name: '',
        product_price: '',
        product_qty: '',
        line_total: 0,
      })
    },
  },
}
</script>

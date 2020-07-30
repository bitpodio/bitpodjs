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
            <v-list-item-title>Step Form</v-list-item-title>
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
        <v-stepper v-model="e13" vertical class="elevation-0">
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
              <small>*indicates required field</small>
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
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="stepform"
      persistent
      content-class="slide-form"
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="accent">
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

        <v-stepper-items>
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
              <small>*indicates required field</small>
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
              <v-btn class="ma-2" outlined color="indigo">Add Tickets</v-btn>
            </v-card>

            <v-btn color="primary" @click="e1 = 1">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <div>
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
            <tr v-for="(invoice_product, k) in invoice_products" :key="k">
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
    </div>
  </v-flex>
</template>

<script>
export default {
  layout: 'flatlayout',
  props: {
    source: String,
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    e13: 2,
    e1: 1,
    modal: false,
    show: false,
    menu2: false,
    drawer: true,
    dialog1: false,
    stepform: false,
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

<style>
.slide-form {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  width: calc(100% - 300px) !important;
  max-height: calc(100% - 100px) !important;
}
@media (max-width: 600px) {
  .slide-form {
    width: 100% !important;
    position: unset !important;
  }
}
</style>

<template>
  <v-form ref="form" v-model="valid">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon dark left>mdi-plus</v-icon>
            New Question
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dense flat dark fixed color="accent">
            <v-toolbar-title class="body-1">New Item</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.Question"
                    label="Question*"
                    :rules="required"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="controlType"
                    :rules="required"
                    :items="controlTypeDropDown"
                    label="Control Type*"
                    outlined
                  ></v-select>
                </v-col>
                <v-col v-if="showCsvField" cols="12">
                  <v-text-field
                    v-model="CsvOptions"
                    label="Options, use CSV format*"
                    :rules="required"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.DisplayOrder"
                    :rules="required"
                    label="Display Order*"
                    type="number"
                    min="1"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="formData.isRequired"
                    label=" Required"
                    class="ma-0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="tickets"
                    :items="ticketsDropDown"
                    label="Only ask when one of these tickets are purchased"
                    multiple
                    chips
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-4">
            <v-btn
              color="primary"
              :disabled="!valid"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-form>
</template>

<script>
import gql from 'graphql-tag'
import nuxtConfig from '../../../../../../nuxt.config'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import eventTicket from '~/config/apps/event/gql/eventTickets.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { required } from '~/utility/rules.js'
export default {
  data() {
    return {
      formData: {
        ControlType: '',
        DisplayOrder: '',
        Options: [],
        Question: '',
        TicketName: [],
        isRequired: false,
      },
      valid: false,
      required: [required],
      dialog: false,
      controlType: [],
      controlTypeDropDown: [],
      tickets: [],
      ticketsDropDown: [],
      showField: ['checkbox', 'radio', 'dropdown'],
      CsvOptions: [],
    }
  },
  mounted() {
    this.getDropDownData('ControlType')
      .then((res) => {
        this.controlTypeDropDown = res.map((i) => i.value)
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
    this.getTicketDetails()
      .then((res) => {
        this.ticketsDropDown = res.map((i) => i.Code)
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
  },
  computed: {
    showCsvField() {
      return (
        this.controlType === 'checkbox' ||
        this.controlType === 'radio' ||
        this.controlType === 'dropdown'
      )
    },
  },
  methods: {
    refresh() {
      this.$apollo.queries.tableData.refresh()
    },
    onSave() {
      debugger
      this.formData.ControlType = this.controlType
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      this.formData.Options = this.CsvOptions.split(',')
      this.formData.TicketName = this.tickets
      this.$axios
        .$post(
          `https://${nuxtConfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}/Survey`,
          {
            ...this.formData,
          }
        )
        .then((res) => {
          debugger
          this.dialog = false
          this.refresh()
          return res
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },

    getDropDownData(filterType) {
      return this.$apollo
        .query({
          query: gql`
            ${generalconfiguration}
          `,
          variables: {
            filters: {
              where: {
                type: filterType,
              },
            },
          },
        })
        .then((result) => {
          debugger
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
    getTicketDetails() {
      return this.$apollo
        .query({
          query: gql`
            ${eventTicket}
          `,
          variables: {
            filters: {
              where: {
                Events: this.$route.params.id,
              },
            },
          },
        })
        .then((result) => {
          debugger
          const ticketDetails = formatGQLResult(result.data, 'Ticket')
          return ticketDetails
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
    // getTicketAxios(){

    // }
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
.stepper-box {
  min-height: 650px;
}
.slide-form-default {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 50% !important;
}
@media (max-width: 600px) {
  .slide-form,
  .slide-form-default {
    width: 100% !important;
    position: unset !important;
  }
}
</style>

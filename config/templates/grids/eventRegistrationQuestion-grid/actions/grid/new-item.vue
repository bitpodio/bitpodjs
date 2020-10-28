<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon> <i18n path="Common.NewQuestion" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            New Registration Question
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.Question"
                  label="Question*"
                  :rules="required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="controlType"
                  :items="controlTypeDropDown"
                  label="Control Type*"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col v-if="showCsvField" cols="12">
                <v-text-field
                  v-model="CsvOptions"
                  label="Options, use CSV format*"
                  :rules="required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.DisplayOrder"
                  :rules="required"
                  label="Display Order*"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData.isRequired"
                  label=" Required"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <span><i18n path="Common.Onlyaskwhen" /> </span>
                <v-select
                  v-model="tickets"
                  :items="ticketsDropDown"
                  multiple
                  chips
                  small-chips
                  persistent-hint
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <v-btn
            color="primary"
            :disabled="!valid || !controlType"
            depressed
            @click.native="onSave"
            ><i18n path="Drawer.Save" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import eventTicket from '~/config/apps/event/gql/eventTickets.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getIdFromAtob } from '~/utility'
import { required } from '~/utility/rules.js'
export default {
  props: {
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        ControlType: '',
        DisplayOrder: '',
        Options: [],
        Question: '',
        TicketName: [],
        TicketIds: [],
        isRequired: false,
      },
      valid: false,
      required: [required],
      dialog: false,
      controlType: '',
      controlTypeDropDown: [],
      tickets: [],
      ticketsDropDown: [],
      ticketIds: [],
      showField: ['checkbox', 'radio', 'dropdown'],
      CsvOptions: '',
    }
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
        this.ticketIds = []

        this.ticketsDropDown = res.map((i) => {
          this.ticketIds.push({
            name: i.Code,
            id: getIdFromAtob(i.id),
          })
          return i.Code
        })
        return res
      })
      .catch((e) => {
        console.log('Error', e)
      })
  },
  methods: {
    onReset() {
      this.formData.Question = ''
      this.controlType = ''
      this.CsvOptions = ''
      this.formData.DisplayOrder = ''
      this.formData.isRequired = false
      this.tickets = []
      // this.valid = false
      // this.formData.Options = []
      // this.formData.TicketName = []
      this.$refs.form.reset()
    },
    onClose() {
      this.dialog = false
      this.onReset()
    },
    async onSave() {
      this.formData.ControlType = this.controlType
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      if (
        this.showField.includes(this.formData.ControlType) ||
        this.CsvOptions.includes(',')
      ) {
        this.formData.Options = this.CsvOptions.split(',')
      } else {
        this.formData.Options = []
      }
      this.formData.Options = this.formData.Options ? this.formData.Options : []
      this.formData.TicketName = this.tickets ? this.tickets : []
      this.formData.TicketIds = this.tickets
        ? this.ticketIds
            .filter((i) => this.tickets.some((j) => j === i.name))
            .map((k) => k.id)
        : []
      const url = this.$bitpod.getApiUrl()
      const res = await this.$axios
        .$post(`${url}Events/${this.$route.params.id}/Survey`, {
          ...this.formData,
        })
        .catch((e) => console.log('Error', e))
      if (res) {
        this.dialog = false
        this.onReset()
        this.refresh()
      }
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
          const ticketDetails = formatGQLResult(result.data, 'Ticket')
          return ticketDetails
        })
        .catch((e) => {
          console.log('Error', e)
        })
    },
  },
}
</script>

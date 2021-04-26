<template>
  <v-col class="px-0">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
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
            <i18n path="Common.NewRegistrationQuestion" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            :id="formName"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.Question"
                  :label="$t('Common.Question')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="controlType"
                  :items="controlTypeDropDown"
                  :label="$t('Common.ControlType')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col v-if="showCsvField" cols="12">
                <v-text-field
                  v-model="CsvOptions"
                  :label="$t('Common.OptionsCsvFormat')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.DisplayOrder"
                  ref="questionField"
                  :rules="[rules.required]"
                  :label="$t('Common.DisplayOrder')"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData.isRequired"
                  :label="$t('Common.Required')"
                  class="ma-0"
                  dense
                ></v-checkbox>
              </v-col>
              <v-col v-if="hasTicket" cols="12">
                <span><i18n path="Common.OnlyAskWhen" /> </span>
                <v-select
                  v-model="tickets"
                  :items="[...ticketIds]"
                  item-text="name"
                  item-value="id"
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
          <SaveBtn
            v-if="dialog"
            color="primary"
            :disabled="!valid || !controlType"
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
            :has-submit-action="true"
            :has-external-submit="true"
            :form-name="formName"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import eventTicket from '~/config/apps/event/gql/eventTickets.gql'
import SaveBtn from '~/components/common/saveButton'
import { formatGQLResult } from '~/utility/gql.js'
import { getIdFromAtob } from '~/utility'
import { rules } from '~/utility/rules.js'
export default {
  components: {
    SaveBtn,
  },
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
    context: {
      type: null,
      default: null,
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
      rules: rules(this.$i18n),
      dialog: false,
      controlType: '',
      controlTypeDropDown: [],
      tickets: [],
      ticketsDropDown: [],
      ticketIds: [],
      showField: ['checkbox', 'radio', 'dropdown'],
      CsvOptions: '',
      snackbar: false,
      timeout: 2000,
      snackbarText: '',
      formName: 'new-eventRegistrationQuestion-form',
      hasTicket:
        this.context && this.context.event && this.context.event.HasTickets,
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
      this.formData.TicketName = this.tickets
        ? this.ticketIds
            .filter((i) => this.tickets.some((j) => j === i.id))
            .map((k) => k.name)
        : []
      this.formData.TicketIds = this.tickets ? this.tickets : []
      const url = this.$bitpod.getApiUrl()
      const res = await this.$axios
        .$post(`${url}Events/${this.$route.params.id}/Survey`, {
          ...this.formData,
        })
        .catch((e) => console.log('Error', e))
      if (res) {
        this.onClose()
        this.$refs.questionField.blur()
        this.$nextTick(()=>{
          this.snackbarText = this.$t(
            'Messages.Success.QuestionRecordCreatedSuccess'
          )
          this.snackbar = true
          this.refresh()
        })
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
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
  },
}
</script>

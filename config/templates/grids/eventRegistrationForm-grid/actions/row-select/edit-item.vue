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
        <v-btn text small v-bind="attrs" v-on="on" @click="getRegistrations">
          <v-icon left class="fs-16">fa-pencil</v-icon
          ><i18n path="Drawer.Edit" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.EditRegistrationForm" />
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
            :id="formName"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.Label"
                  :label="$t('Common.Label')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="controlType"
                  :rules="[rules.required]"
                  :items="controlTypeDropDown"
                  :label="$t('Common.ControlType')"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col v-if="showCsvField" cols="12">
                <v-text-field
                  v-model="CsvOptions"
                  :label="getOptionsLabel($t('Common.OptionsCaption'))"
                  :rules="optionRules()"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.DisplayOrder"
                  :rules="[rules.required]"
                  :label="$t('Common.DisplayOrder')"
                  type="number"
                  min="1"
                  required
                  outlined
                  dense
                ></v-text-field>
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
            :disabled="!valid || !controlType || controlType === 'Select'"
            depressed
            type="submit"
            :form="formName"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import generalconfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { postGaData } from '~/utility/index.js'
import { rules } from '~/utility/rules.js'
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      formData: {},
      valid: false,
      rules: rules(this.$i18n),
      dialog: false,
      controlType: '',
      controlTypeDropDown: [],
      showField: ['checkbox', 'radio', 'dropdown', 'country', 'number'],
      doNotShowField: ['text', 'date'],
      CsvOptions: '',
      id: '',
      snackbarText: '',
      snackbar: false,
      timeout: 3000,
      formName: 'edit-eventRegistration-form',
    }
  },
  computed: {
    showCsvField() {
      return (
        this.controlType === 'checkbox' ||
        this.controlType === 'radio' ||
        this.controlType === 'dropdown' ||
        this.controlType === 'country' ||
        this.controlType === 'number'
      )
    },
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.refresh()
      }
    },
    valid(newVal) {
      if (newVal) {
        postGaData('Edit', this.$t('Common.EditRegistrationForm'))
      }
    },
  },
  async mounted() {
    try {
      const res = await this.getDropDownData('ControlType')
      if (res) {
        this.controlTypeDropDown = res.map((i) => i.value)
      }
    } catch (e) {
      console.error(
        `Error in config/templates/grids/eventRegistrationForm-grid/actions/row-select/edit-items while making a GQL call to General Configuration Model`,
        e
      )
    }
  },
  methods: {
    getOptionsLabel(optionLabel) {
      if (
        this.formData.Label === 'Email' ||
        this.formData.Label === 'Country'
      ) {
        return `${optionLabel}`
      } else {
        return `${optionLabel}*`
      }
    },
    optionRules() {
      return [
        (v) => {
          if (
            this.formData.Label === 'Email' ||
            this.formData.Label === 'Country'
          ) {
            return true
          } else if (v !== '') {
            return true
          } else {
            return this.$t('Messages.Error.FieldRequired')
          }
        },
      ]
    },
    onReset() {
      this.$refs.form.reset()
      if (this.controlTypeDropDown.includes('Select')) {
        this.controlTypeDropDown.shift()
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', this.formName)
    },
    onClose() {
      this.dialog = false
      this.onReset()
      postGaData('Close', this.$t('Common.EditRegistrationForm'))
    },
    async onSave() {
      postGaData(this.$t('Drawer.Save'), this.$t('Common.EditRegistrationForm'))
      this.formData.ControlType = this.controlType
      this.formData.DisplayOrder = parseInt(this.formData.DisplayOrder)
      if (
        this.showField.includes(this.formData.ControlType) &&
        this.CsvOptions.includes(',')
      ) {
        this.formData.Options = this.CsvOptions.split(',')
      } else {
        this.formData.Options = []
        this.formData.Options.push(this.CsvOptions)
      }
      if (this.doNotShowField.includes(this.formData.ControlType)) {
        this.formData.Options = []
      }
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.put(
          `${url}Events/${this.$route.params.id}/RegistrationForm/${this.id}`,
          {
            ...this.formData,
          }
        )
        if (res) {
          this.dialog = false
          this.snackbarText = this.$t(
            'Messages.Success.RegistrationFormUpdatedSuccess'
          )
          this.snackbar = true
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/eventRegistrationForm-grid/actions/row-select/edit-items while making a PUT call to RegistrationForm Model from method onSave method where context:-\n eventId:-${this.$route.params.id}\n registrationId:-${this.id}\n formData:-${this.formData} `,
          e
        )
      }
    },
    async getRegistrations() {
      this.items.map((ele) => {
        this.id = ele.id
      })
      try {
        const url = this.$bitpod.getApiUrl()
        const res = await this.$axios.$get(
          `${url}Events/${this.$route.params.id}/RegistrationForm/${this.id}`
        )

        if (res) {
          this.formData = res
          this.controlType = res.ControlType
          this.CsvOptions = res.Options.toString()
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/eventRegistrationForm-grid/actions/row-select/edit-items while making a GET call to RegistrationForm Model from method getRegistrations method where context:-\n eventId:-${this.$route.params.id}\n registrationId:-${this.id}\n formData:-${this.formData} `,
          e
        )
      }
    },
    async getDropDownData(filterType) {
      try {
        const result = await this.$apollo.query({
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
        if (result) {
          const generalConfig = formatGQLResult(
            result.data,
            'GeneralConfiguration'
          )
          return generalConfig
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/eventRegistrationForm-grid/actions/row-select/edit-items while making a GQL call to General Configuration Model from method getDropDownData method where context:-\nfilterType:-${filterType}`,
          e
        )
      }
    },
  },
}
</script>

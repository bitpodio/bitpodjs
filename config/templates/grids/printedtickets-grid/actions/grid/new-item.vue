<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="limit-form-width"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon>
          <i18n path="Common.NewTicketTemplate" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-2 text-h5">
            <i18n path="Drawer.NewPrintedTicketTemplate" />
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
            id="new-printedTicketTemplate-form"
            ref="validTicketTemplateForm"
            v-model="valid"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="printedTicketTemplateName"
                  :label="markRequired($t('Common.Name'))"
                  :rules="[rules.required]"
                  :error-messages="uniqueNameError"
                  outlined
                  requierd
                  dense
                  @input="checkUniqueName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="printedTicketTemplateSize"
                  :label="$t('Common.Size')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="printedTicketTemplateThumbnailUrl"
                  :label="$t('Common.ThumbnailUrl')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <RichText
                  v-model="printedTicketTemplateTemplate"
                  :label="markRequired($t('Common.Template'))"
                  class="pl-0"
                  :dropdown-options="dropdownOptions"
                />
                <div
                  v-if="!checkTemplate && requiredError"
                  class="v-messages v-messages__message error--text"
                >
                  <i18n path="Messages.Error.FieldRequired" />
                </div>
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
            depressed
            :disabled="
              !valid ||
              isSaveButtonDisabled ||
              !customValidCheck ||
              !checkTemplate
            "
            :reset="isReset"
            :action="onSave"
            :has-submit-action="true"
            :has-external-submit="true"
            form-name="new-printedTicketTemplate-form"
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'
import { rules } from '~/utility/rules.js'
import SaveBtn from '~/components/common/saveButton'
import printedTicketsQuery from '~/config/apps/admin/gql/printedTickets.gql'

export default {
  components: {
    SaveBtn,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    dialog: {
      default: false,
      allowSpaces: false,
      type: Boolean,
    },
    context: {
      default: () => {},
      allowSpaces: false,
      type: Object,
    },
    refresh: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      rules: rules(this.$i18n),
      printedTicketTemplateName: '',
      printedTicketTemplateSize: '',
      printedTicketTemplateThumbnailUrl: '',
      printedTicketTemplateTemplate: '',
      isSaveButtonDisabled: false,
      valid: false,
      uniqueNameError: '',
      customValidCheck: false,
      checkTemplate: false,
      requiredError: false,
      isReset: false,
    }
  },
  computed: {
    dropdownOptions() {
      return {
        'Full Name': 'Ticket Full Name',
        'Event Name': 'Ticket Event Name',
        'Event Date': 'Ticket Event Date',
        Price: 'Ticket Price',
        Logo: 'Ticket Logo',
        QRCode: 'Ticket QRCode',
        'Seat Number': 'Ticket Seat Number',
        'Ticket Number': 'Ticket Number',
        Color: 'Ticket Color',
      }
    },
  },
  watch: {
    printedTicketTemplateTemplate(newVal) {
      this.requiredError = true
      this.checkTemplate = !!newVal.length
    },
    dialog() {
      this.uniqueNameError = ''
    },
  },
  methods: {
    markRequired(stringValue) {
      return `${stringValue}*`
    },
    onClose() {
      this.printedTicketTemplateName = ''
      this.printedTicketTemplateSize = ''
      this.printedTicketTemplateThumbnailUrl = ''
      this.printedTicketTemplateTemplate = ''
      this.isSaveButtonDisabled = false
      this.requiredError = false
      this.valid = false
      this.uniqueNameError = ''
      this.customValidCheck = false
      this.isReset = !this.isReset
      this.$refs.validTicketTemplateForm &&
        this.$refs.validTicketTemplateForm.reset()
      this.$nextTick(() => {
        this.dialog = false
      })
    },
    async checkUniqueName() {
      const where = {
        and: [{ isDefault: true }, { Name: this.printedTicketTemplateName }],
      }
      this.uniqueNameError = ''
      try {
        const res = await this.$apollo.query({
          query: gql`
            ${printedTicketsQuery}
          `,
          variables: {
            where,
          },
          fetchPolicy: 'no-cache',
        })
        if (
          res.data &&
          res.data.PrintedTicketTemplate &&
          res.data.PrintedTicketTemplate.PrintedTicketTemplateCount
        ) {
          this.customValidCheck = false
          this.uniqueNameError = this.$t('Messages.Error.TicketTemplateExists')
        } else {
          this.customValidCheck = true
          this.uniqueNameError = ''
        }
      } catch (error) {
        console.error(
          `Error in list/printed-tickets while checking unique code context: PrintedTicketTemplate GQL, filter:${where}`,
          error
        )
      }
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const url = this.$bitpod.getApiUrl()
      let res = null
      try {
        res = await this.$axios.$post(`${url}PrintedTicketTemplates`, {
          isDefault: true,
          Name: this.printedTicketTemplateName,
          Size: this.printedTicketTemplateSize,
          Template: this.printedTicketTemplateTemplate,
          ThumbnailUrl: this.printedTicketTemplateThumbnailUrl,
        })
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.error(
          `Error in new Printed Ticket Template form while updating printedTicketTemplate, context:- printedTicketTemplateId - ${this.printedTicketTemplate.id} printedTicketTemplatesData: ${this.printedTicketTemplate} baseUrl: ${url} error: ${e}`,
          e
        )
      }
      if (res) {
        this.refresh()
        this.onClose()
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'new-printedTicketTemplate-form')
    },
  },
}
</script>

<style>
.limit-form-width {
  width: 60% !important;
}
</style>

<template>
  <v-layout>
    <v-dialog
      v-model="editTemplate"
      persistent
      scrollable
      content-class="limit-form-width"
    >
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-2 text-h5">
            <i18n path="Drawer.EditPrintedTicketTemplate" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :value="printedTicketTemplate.Name"
                  :label="$t('Common.Name')"
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="printedTicketTemplate.Size"
                  :label="$t('Common.Size')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="printedTicketTemplate.ThumbnailUrl"
                  :label="$t('Common.ThumbnailUrl')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <RichText
                  v-model="printedTicketTemplate.Template"
                  :label="markRequired($t('Common.Template'))"
                  class="pl-0"
                  :dropdown-options="dropdownOptions"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="editTemplate"
            color="primary"
            depressed
            :disabled="!valid || isSaveButtonDisabled || !checkTemplate"
            :action="onSave"
            :has-submit-action="true"
            form-name="edit-printedTicketTemplate-form"
            class="ml-2"
            ><i18n path="Drawer.Save"
          /></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { rules } from '~/utility/rules.js'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    SaveBtn,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
  },
  props: {
    editTemplate: {
      type: Boolean,
      default: false,
    },
    selected: {
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
    const item = { ...this.selected }
    const printedTicketTemplate = {}
    printedTicketTemplate.id = item.id
    printedTicketTemplate.Size = item.Size || ''
    printedTicketTemplate.ThumbnailUrl = item.ThumbnailUrl
    printedTicketTemplate.Name = item.Name
    printedTicketTemplate.Template = item.Template || ''
    return {
      rules: rules(this.$i18n),
      printedTicketTemplate,
      isSaveButtonDisabled: false,
      valid: false,
      checkTemplate: false,
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
    'printedTicketTemplate.Template'(newVal) {
      this.checkTemplate = !!newVal.length
    },
  },
  methods: {
    onClose() {
      this.$emit('update:editTemplate', false)
    },
    markRequired(stringValue) {
      return `${stringValue}*`
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const url = this.$bitpod.getApiUrl()
      let res = null
      try {
        res = await this.$axios.$patch(
          `${url}PrintedTicketTemplates/${this.printedTicketTemplate.id}`,
          this.printedTicketTemplate
        )
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.error(
          `Error in edit Printed Ticket Template form while updating printedTicketTemplate, context:- printedTicketTemplateId - ${this.printedTicketTemplate.id} printedTicketTemplatesData: ${this.printedTicketTemplate} baseUrl: ${url} error: ${e}`,
          e
        )
      }
      if (res) {
        this.refresh()
        this.onClose()
        this.$emit(
          'update-snackbar',
          this.$t('Messages.Success.UpdatedSuccessfully', {
            modelName: 'Ticket Template',
          })
        )
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-printedTicketTemplate-form')
    },
  },
}
</script>

<style>
.limit-form-width {
  width: 60% !important;
}
</style>

<template>
  <v-layout>
    <v-dialog
      v-model="editTemplate"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.EditTemplate" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <RichText
                  v-model="body"
                  class="pl-0"
                  :dropdown-options="dropdownOptions"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveBtn
              v-if="editTemplate"
              color="primary"
              depressed
              :action="onSave"
              :has-submit-action="true"
              form-name="edit-inviteTemplate-form"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveBtn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
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
    const body = this.selected.Body ? this.selected.Body : ''
    return {
      body,
      valid: false,
    }
  },
  computed: {
    dropdownOptions() {
      return {
        'Event Name': 'Event Name',
        Description: 'Description',
        'Start Date': 'Start Date',
        'End Date': 'End Date',
        Timezone: 'Timezone',
        Organizer: 'Organizer',
        Venue: 'Venue',
        Address: 'Address',
        City: 'City',
        State: 'State',
        Country: 'Country',
        'Postal Code': 'Postal Code',
        'Event Webinar Link': 'Event Webinar Link',
        'Event Joining Instruction': 'Event Joining Instruction',
        'Organization Name': 'Organization Name',
        'Organization Address': 'Organization Address',
        'Organization City': 'Organization City',
        'Organization State': 'Organization State',
        'Organization Country': 'Organization Country',
        'Organization Postal Code': 'Organization Postal Code',
        'Privacy Policy': 'Privacy Policy',
        'Organization Facebook': 'Organization Facebook',
        'Organization Linkedin': 'Organization Linkedin',
        'Organization Twitter': 'Organization Twitter',
        'Contact First Name': 'Contact First Name',
        'Contact Last Name': 'Contact Last Name',
        'Contact Email': 'Contact Email',
        Register: 'Register',
        Logo: 'Logo',
        'Registration Email': 'Registration Email',
        'Registration Phone': 'Registration Phone',
        'Registration Id': 'Registration Id',
        'Ticket Quantity': 'Ticket Quantity',
        'Session Location': 'Session Location',
        'Session Booking Date': 'Session Booking Date',
        'Session List': 'Session List',
        'Attendee List': 'Attendee List',
        'Payment Details': 'Payment Details',
        'First Name': 'First Name',
        'Last Name': 'Last Name',
        'Full Name': 'Full Name',
      }
    },
  },
  methods: {
    onClose() {
      this.body = this.selected.Body ? this.selected.Body : ''
      this.$emit('update:editTemplate', false)
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      const url = this.$bitpod.getApiUrl()
      this.selected.Documents = this.fileList
      let res = null
      try {
        res = await this.$axios.$patch(
          `${url}MarketingTemplates/${this.selected.id}`,
          { Body: this.body }
        )
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.log(
          `Error in pages/apps/organization/_id/editTemplte while making a PATCH call to MarketingTemplates model from method onSave context:-${this.selected}`,
          e
        )
      }
      if (res) {
        this.$parent.refresh()

        this.$emit(
          'update-snackbar',
          this.$t('Messages.Success.EditTemplateSuccess')
        )
        this.onClose()
      }
    },
    submitForm() {
      this.$eventBus.$emit('form-submitted', 'edit-inviteTemplate-form')
    },
  },
}
</script>

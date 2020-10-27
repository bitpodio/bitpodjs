<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editTemplate"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              Edit Badge
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
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="badge.Size"
                  label="Size*"
                  :rules="requiredRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="badge.DisplayOrder"
                  label="Display Order*"
                  :rules="displayOrderRules"
                  type="number"
                  min="1"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <RichText
                  v-model="badge.Template"
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
            <v-btn
              color="primary"
              depressed
              :disabled="!valid || isSaveButtonDisabled"
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import strings from '~/strings.js'
import { required } from '~/utility/rules.js'
export default {
  components: {
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
    const badge = {}
    badge.id = item.id
    badge.Size = item.Size || ''
    badge.DisplayOrder = item.DisplayOrder
    badge.Template = item.Template || ''
    return {
      requiredRules: [required],
      badge,
      isSaveButtonDisabled: false,
      valid: false,
      displayOrderRules: [
        (v) => {
          if (!isNaN(parseFloat(v)) && v > 0) {
            return true
          }
          return strings.INVALID_DISPLAY_ORDER
        },
      ],
    }
  },
  computed: {
    dropdownOptions() {
      return {
        'Event Name': 'Event Name',
        Description: 'Description',
        'Start Date': 'Edit Start Date',
        'End Date': 'Edit End Date',
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
      this.$emit('update:editTemplate', false)
    },

    async onSave() {
      this.isSaveButtonDisabled = true
      const url = this.$bitpod.getApiUrl()
      this.badge.DisplayOrder = parseInt(this.badge.DisplayOrder)
      let res = null
      try {
        res = await this.$axios.$patch(
          `${url}Badges/${this.badge.id}`,
          this.badge
        )
      } catch (e) {
        this.isSaveButtonDisabled = false
        console.error(
          `Error in edit Batch Template form while updating Badge, context:- badgeId - ${this.badge.id} badgeData: ${this.badge} baseUrl: ${url} error: ${e}`,
          e
        )
      }
      if (res) {
        this.refresh()
        this.onClose()
      }
    },
  },
}
</script>

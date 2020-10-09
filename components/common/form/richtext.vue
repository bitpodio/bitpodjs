<template>
  <div id="app">
    <client-only>
      {{ field && field.form && field.form.caption }}
      <jodit-editor v-model="content" :config="config" />
    </client-only>
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'
import nuxtConfig from '~/nuxt.config'

export default {
  components: {
    JoditEditor,
  },
  props: {
    value: {
      type: null,
      default: null,
    },
    field: {
      type: Object,
      default: () => {},
    },
    isInvitee: {
      type: Boolean,
      default: false,
    },
    isGeneral: {
      type: Boolean,
      default: false,
    },
    showTemplateDropdown: {
      type: Boolean,
      default: false,
    },
    isBadge: {
      type: Boolean,
      default: false,
    },
    isEditBadge: {
      type: Boolean,
      default: false,
    },
    isQRCode: {
      type: Boolean,
      default: false,
    },
    isLogo: {
      type: Boolean,
      default: false,
    },
    isEditTemplate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: this.value || '',
      config: {
        placeholder: '',
        extraButtons: [
          {
            name: '<h2 class="pb-1">+</h2>',
            tooltip: 'Fields',
            list: {
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
            },
            exec: (editor, flag, currentOption) => {
              const modelFields = {
                'Event Name': 'Event.Title',
                Description: 'Event.Description',
                'Start Date': this.isEditTemplate
                  ? 'Event.SDate'
                  : 'Event.StartDate',
                'End Date': this.isEditTemplate
                  ? 'Event.EDate'
                  : 'Event.EndDate',
                Timezone: 'Event.Timezone',
                Organizer: 'Event.Organizer',
                Venue: 'Event.VenueName',
                Address: 'Event._VenueAddress.AddressLine',
                City: 'Event._VenueAddress.City',
                State: 'Event._VenueAddress.State',
                Country: 'Event._VenueAddress.Country',
                'Postal Code': 'Event._VenueAddress.PostalCode',
                'Event Webinar Link': 'Event.WebinarLink',
                'Event Joining Instruction': 'Event.JoiningInstruction',
                'Organization Name': 'OrganizationInfo.Name',
                'Organization Address':
                  'OrganizationInfo._CurrentAddress.AddressLine',
                'Organization City': 'OrganizationInfo._CurrentAddress.City',
                'Organization State': 'OrganizationInfo._CurrentAddress.State',
                'Organization Country':
                  'OrganizationInfo._CurrentAddress.Country',
                'Organization Postal Code':
                  'OrganizationInfo._CurrentAddress.PostalCode',
                'Contact First Name': 'Contact.FirstName',
                'Contact Last Name': 'Contact.LastName',
                'Contact Email': 'Contact.Email',
                'First Name': 'Registration.FirstName',
                'Last Name': 'Registration.LastName',
                'Registration Email': 'Registration.Email',
                'Registration Phone': 'Registration.Phone',
                'Registration Id': 'Registration.RegistrationId',
                'Ticket Quantity': 'Registration.TicketQuantity',
                'Full Name': 'Registration.FullName',
                'Session Location': 'SessionLocation',
                'Session List': 'sessionList',
                'Session Booking Date': 'SessionBookingDate',
                'Attendee List': 'attendeeList',
                'Payment Details': 'paymentDetails',
              }
              const badgeFields = {
                Category: 'Category',
                'First  Name': 'FirstName',
                'Last  Name': 'LastName',
                'Full  Name': 'FullName',
                Organization: 'Organization',
                'Event  Name': 'EventName',
                Logo: 'Logo',
                QRCode: 'QRCode',
              }
              const socialFields = {
                'Organization Facebook': {
                  icon:
                    nuxtConfig.publicRuntimeConfig.cdnUri + 'Facebook-icon.png',
                  modelField: 'OrganizationInfo.Facebook',
                  title: 'Facebook',
                },
                'Organization Linkedin': {
                  icon:
                    nuxtConfig.publicRuntimeConfig.cdnUri +
                    'linkedin-45x45.png',
                  modelField: 'OrganizationInfo.LinkedIn',
                  title: 'LinkedIn',
                },
                'Organization Twitter': {
                  icon:
                    nuxtConfig.publicRuntimeConfig.cdnUri + 'Twitter-icon.png',
                  modelField: 'OrganizationInfo.Twitter',
                  title: 'Twitter',
                },
              }
              if (currentOption.control.args) {
                const key = currentOption.control.args[1]
                if (modelFields[key]) {
                  editor.selection.insertHTML('${' + modelFields[key] + '}')
                } else if (badgeFields[key]) {
                  editor.selection.insertHTML('{{ ' + badgeFields[key] + ' }}')
                } else if (socialFields[key]) {
                  const { icon, modelField, title } = socialFields[key]
                  editor.selection.insertHTML(
                    '<a href="${' +
                      modelField +
                      '}" target="_blank" style="text-decoration: none; color: rgb(99, 99, 99);"><img alt="T" title="' +
                      title +
                      '" width="44" height="44" src="' +
                      icon +
                      '"></a>'
                  )
                } else if (key === 'Privacy Policy') {
                  editor.selection.insertHTML(
                    '<a href="${' +
                      'OrganizationInfo.PrivacyPolicy}" target="_blank" >Privacy Policy</a>'
                  )
                } else if (key === 'Logo') {
                  const logoURL =
                    nuxtConfig.publicRuntimeConfig.cdnUri +
                    'admin-default-template-logo.png'
                  editor.selection.insertHTML(
                    `<img src="${logoURL}" "style"="max-width:200px;height:auto" class="img-responsive"/>`
                  )
                } else if (key === 'Register') {
                  editor.selection.insertHTML(
                    `${`<a href="`}\${hostURL}${`/events/`}\${Event.id}" target="_blank">Register</a>`
                  )
                } else if (key === 'QRCode') {
                  const qrCode =
                    nuxtConfig.publicRuntimeConfig.cdnUri +
                    'default-preview-qr.svg'
                  editor.selection.insertHTML(
                    `<img src="${qrCode}" "style"="max-width:200px;height:auto" class="img-responsive"/>`
                  )
                }
              }
            },
            template(key, value) {
              return '<div>' + value + '</div>'
            },
          },
        ],

        allowResizeX: true,
        allowResizeY: true,
        zIndex: 99999,
      },
      generalButtons: {
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
      },
      badgeButtons: {
        'First Name': 'First  Name',
        'Last Name': 'Last  Name',
        'Full Name': 'Full  Name',
        Category: 'Category',
        'Event Name': 'Event  Name',
        Organization: 'Organization',
        Logo: 'Logo',
        QRCode: 'QRCode',
      },
      editBadgeButtons: {
        'First Name': 'First  Name',
        'Last Name': 'Last  Name',
        'Full Name': 'Full  Name',
        Category: 'Category',
        'Event Name': 'Event  Name',
        Organization: 'Organization',
      },
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
  },
  mounted() {
    if (!this.isInvitee) {
      Object.assign(this._data.config.extraButtons[0].list, {
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
      })
    }
    if (this.isQRCode) {
      this._data.config.extraButtons.push({
        name: 'QRCode',
        tooltip: 'Fields',
        list: {
          Category: 'Category',
          'First  Name': 'FirstName',
          'Last  Name': 'LastName',
          Organization: 'Organization',
          'Event  Name': 'EventName',
        },
        exec: (editor, flag, currentOption) => {
          if (currentOption.control.args) {
            const qrCode =
              nuxtConfig.publicRuntimeConfig.cdnUri + 'default-preview-qr.svg'
            editor.selection.insertHTML(
              `<img src="${qrCode}" "style"="max-width:200px;height:auto" class="img-responsive"/>`
            )
          }
        },
      })
    }
    if (this.isLogo) {
      this._data.config.extraButtons.push({
        name: 'Logo',
        exec: (editor, flag, currentOption) => {
          const logo =
            nuxtConfig.publicRuntimeConfig.cdnUri +
            'admin-default-template-logo.png'
          editor.selection.insertHTML(
            `<img src="${logo}" "style"="max-width:200px;height:auto" class="img-responsive"/>`
          )
        },
      })
    }
    if (this.isBadge || (this.field && this.field.isBadge)) {
      this._data.config.extraButtons[0].list = { ...this.badgeButtons }
    }
    if (this.isEditBadge) {
      this._data.config.extraButtons[0].list = { ...this.editBadgeButtons }
    }
    if (!this.showTemplateDropdown && !this.field.showTemplateDropdown) {
      delete this.config.extraButtons
    }
    if (this.isGeneral) {
      this._data.config.extraButtons[0].list = { ...this.generalButtons }
    }
  },
}
</script>

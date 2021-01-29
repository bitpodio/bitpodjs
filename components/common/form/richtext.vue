<template>
  <div id="app" class="rich-text-editor">
    <client-only>
      <div v-if="label || (field && field.form && field.form.caption)">
        {{ label || field.form.caption }}
      </div>
      <div @click="rteClicked">
        <jodit-editor ref="rte" v-model="content" :config="config" />
      </div>
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
    label: {
      type: String,
      default: '',
    },
    dropdownOptions: {
      type: Object,
      default: () => {},
    },
    showLogoButton: {
      type: Boolean,
      default: false,
    },
    showQRButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: this.value || '',
      config: {
        placeholder: '',
        editorCssClass: 'rich-text-editor',
        extraButtons: [
          {
            name: '<h2 class="pb-1">+</h2>',
            tooltip: 'Fields',
            list: {},
            exec: (editor, flag, currentOption) => {
              const modelFields = {
                'Event Name': 'Event.Title',
                Description: 'Event.Description',
                'Start Date': 'Event.StartDate',
                'End Date': 'Event.EndDate',
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
              }
              const editFields = {
                'Start date': 'Event.SDate',
                'End date': 'Event.EDate',
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
                } else if (editFields[key]) {
                  editor.selection.insertHTML('${ ' + editFields[key] + ' }')
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
        popup: {
          a: [
            {
              name: 'eye',
              tooltip: 'Open link',
              exec: 'function(e,t){var o=r.attr(t,"href");t&&o&&e.ow.open(o)}',
            },
            'unlink',
            'brush',
            'bold',
            'underline',
            'italic',
          ],
        },
      },
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
    value(newVal) {
      this.content = newVal
    },
  },
  mounted() {
    const dialog = this.$root.$el.getElementsByClassName(
      'v-dialog__content--active'
    )
    if (dialog && dialog.length) {
      dialog[0].style.zIndex = 1000
    }
    if (!this.dropdownOptions && (!this.field || !this.field.dropdownOptions)) {
      delete this.config.extraButtons
    } else if (this.dropdownOptions) {
      this._data.config.extraButtons[0].list = { ...this.dropdownOptions }
    } else {
      this._data.config.extraButtons[0].list = { ...this.field.dropdownOptions }
    }
    if (this.showQRButton) {
      if (!this._data.config.extraButtons) {
        this._data.config.extraButtons = []
      }
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
    if (this.showLogoButton) {
      if (!this._data.config.extraButtons) {
        this._data.config.extraButtons = []
      }
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
  },
  methods: {
    exitFullScreen() {
      if (this.$refs.rte) {
        if (this.$refs.rte.editor.isFullSize) {
          this.$refs.rte.editor.toggleFullSize()
        }
        this.$router.beforeHooks.shift()
        this.$router.forward()
      }
    },
    rteClicked() {
      if (this.$refs.rte.editor.isFullSize) {
        this.$router.beforeHooks.unshift(this.exitFullScreen)
      } else {
        this.$router.beforeHooks.shift()
      }
    },
  },
}
</script>
<style>
.rich-text-editor *,
.rich-text-editor {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
</style>

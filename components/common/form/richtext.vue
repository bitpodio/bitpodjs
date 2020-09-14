<template>
  <div id="app">
    <client-only>
      <jodit-editor v-model="content" :config="config" />
    </client-only>
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'

export default {
  components: {
    JoditEditor,
  },
  props: ['value', 'field'],
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
              'Event Name': 'eventName',
              Description: 'description',
              'Start Date': 'startDate',
              'End Date': 'endDate',
              Timezone: 'timezone',
              Organizer: 'organizer',
              Venue: 'venue',
              Address: 'adddress',
              City: 'city',
              State: 'State',
              Country: 'Country',
              'Postal Code': 'pincode',
              'Event Webinar Link': 'webLink',
              'Event Joining Instruction': 'joiningInstraction',
              'Organization Name': 'orgName',
              'Organization Address': 'orgAddress',
              'Organization City': 'orgCity',
              'Organization State': 'orgState',
              'Organization Country': 'orgCountry',
              'Organization Postal Code': 'orgPinCode',
              'Privacy Policy': 'policy',
              'Organization Facebook': 'orgFacebook',
              'Organization Linkedin': 'orgLinkedin',
              'Organization Twitter': 'orgTwitter',
              'Contact First Name': 'contactFirstName',
              'Contact Last Name': 'contactLastName',
              'Contact Email': 'contactEmail',
              'First Name': 'regFirstName',
              'Last Name': 'regLastName',
              'Registration Email': 'regEmail',
              'Registration Phone': 'regPhone',
              'Registration Id': 'regId',
              'Ticket Quantity': 'ticketQty',
              'Full Name': 'RegFullName',
              Register: 'register',
              'Session Location': 'sessionLocation',
              'Session Booking Date': 'sessionBookingDate',
              'Session List': 'sessionList',
              'Attendee List': 'attendeeList',
              'Payment Details': 'paymentDetails',
              Logo: 'logo',
            },
            exec: (editor, flag, currentOption) => {
              debugger
              const modelFields = {
                eventName: 'Event.Title',
                description: 'Event.Description',
                startDate: 'Event.StartDate',
                endDate: 'Event.EndDate',
                timezone: 'Event.Timezone',
                organizer: 'Event.Organizer',
                venue: 'Event.VenueName',
                adddress: 'Event._VenueAddress.AddressLine',
                city: 'Event._VenueAddress.City',
                State: 'Event._VenueAddress.State',
                Country: 'Event._VenueAddress.Country',
                pincode: 'Event._VenueAddress.PostalCode',
                webLink: 'Event.WebinarLink',
                joiningInstraction: 'Event.JoiningInstruction',
                orgName: 'OrganizationInfo.Name',
                orgAddress: 'OrganizationInfo._CurrentAddress.AddressLine',
                orgCity: 'OrganizationInfo._CurrentAddress.City',
                orgState: 'OrganizationInfo._CurrentAddress.State',
                orgCountry: 'OrganizationInfo._CurrentAddress.Country',
                orgPinCode: 'OrganizationInfo._CurrentAddress.PostalCode',
                contactFirstName: 'Contact.FirstName',
                contactLastName: 'Contact.LastName',
                contactEmail: 'Contact.Email',
                regFirstName: 'Registration.FirstName',
                regLastName: 'Registration.LastName',
                regEmail: 'Registration.Email',
                regPhone: 'Registration.Phone',
                regId: 'Registration.RegistrationId',
                ticketQty: 'Registration.TicketQuantity',
                RegFullName: 'Registration.FullName',
                sessionLocation: 'SessionLocation',
                sessionList: 'sessionList',
                sessionBookingDate: 'SessionBookingDate',
                attendeeList: 'attendeeList',
                paymentDetails: 'paymentDetails',
              }
              const socialFields = {
                orgFacebook: {
                  icon:
                    'https://res.cloudinary.com/mytestlogo/image/upload/Facebook-icon.png',
                  modelField: 'OrganizationInfo.Facebook',
                  title: 'Facebook',
                },
                orgLinkedin: {
                  icon:
                    'https://res.cloudinary.com/mytestlogo/image/upload/v1571124314/linkedin-45x45.png',
                  modelField: 'OrganizationInfo.LinkedIn',
                  title: 'LinkedIn',
                },
                orgTwitter: {
                  icon:
                    'https://res.cloudinary.com/mytestlogo/image/upload/Twitter-icon.png',
                  modelField: 'OrganizationInfo.Twitter',
                  title: 'Twitter',
                },
              }
              if (currentOption.control.args) {
                const key = currentOption.control.args[1]
                if (modelFields[key]) {
                  editor.selection.insertHTML('${' + modelFields[key] + '}')
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
                } else if (key === 'logo') {
                  const logoURL =
                    'https://res.cloudinary.com/mytestlogo/admin-default-template-logo.png'
                  editor.selection.insertHTML(
                    `<img src="${logoURL}" "style"="max-width:200px;height:auto" class="img-responsive"/>`
                  )
                } else if (key === 'register') {
                  editor.selection.insertHTML(
                    `${`<a href="`}\${hostURL}${`/events/`}\${Event.id}" target="_blank">Register</a>`
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
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
  },
}
</script>

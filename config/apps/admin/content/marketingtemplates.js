import marketingTemplates from '../gql/marketingTemplates.gql'
import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'

export default {
  views: {
    template: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Template',
      default: false,
      fields: {
        Name: {
          form: {
            caption: 'Template Name *',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Template Name is required'
            },
          ],
        },
        Subject: {
          form: {
            caption: 'Subject *',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Subject is required'
            },
          ],
        },
        Type: {
          form: {
            caption: 'Type *',
            displayOrder: 4,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
          dataSource: {
            query: generalConfiguration,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'TemplateType',
              }
            },
          },
        },
        ImageUrl: {
          form: {
            caption: 'Image URL',
            displayOrder: 6,
          },
          displayOrder: 3,
          caption: 'Image Url',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: false,
        },
        Body: {
          form: {
            caption: 'Body *',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Body',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: false,
          dropdownOptions: {
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
          },
          rules: [
            (v) => {
              return !!v || 'Body is required'
            },
          ],
        },
        Category: {
          form: {
            caption: 'Category *',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
          dataSource: {
            query: generalConfiguration,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'TemplateCategory',
              }
            },
          },
        },
        createdDate: {
          displayOrder: 6,
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Documents: {
          form: {
            caption: 'Attachments',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'file',
          newForm: true,
          editForm: false,
        },
      },
      template: {
        name: 'invitetemplate-grid',
        context: {
          basePath: '/templates',
        },
        actions: {
          new: {
            hidden: false,
            caption: 'New Template',
          },
        },
      },
      dataSource: {
        query: marketingTemplates,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'MarketingTemplate',
        filter(ctx) {
          return {
            where: {
              Type: {
                inq: ['Invitation Template', 'Registration Email Template'],
              },
            },
          }
        },
      },
      title: 'Templates',
      type: 'list',
    },
    mytemplate: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Template',
      default: false,
      fields: {
        Name: {
          form: {
            caption: 'Template Name *',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Template Name is required'
            },
          ],
        },
        Subject: {
          form: {
            caption: 'Subject *',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Subject is required'
            },
          ],
        },
        Type: {
          form: {
            caption: 'Type *',
            displayOrder: 4,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
          dataSource: {
            query: generalConfiguration,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'TemplateType',
              }
            },
          },
        },
        ImageUrl: {
          form: {
            caption: 'Image URL',
            displayOrder: 6,
          },
          displayOrder: 3,
          caption: 'Image Url',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: false,
        },
        Body: {
          form: {
            caption: 'Body *',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Body',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: false,
          dropdownOptions: {
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
          },
          rules: [
            (v) => {
              return !!v || 'Body is required'
            },
          ],
        },
        Category: {
          form: {
            caption: 'Category *',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
          dataSource: {
            query: generalConfiguration,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'TemplateCategory',
              }
            },
          },
        },
        createdDate: {
          displayOrder: 6,
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'mytemplate-grid',
        context: {
          basePath: '/templates',
        },
        actions: {
          new: {
            hidden: false,
            caption: 'New Template',
          },
        },
      },
      dataSource: {
        query: marketingTemplates,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'MarketingTemplate',
        filter(ctx) {
          return {
            where: {
              createdBy: ctx.$auth.$state.user.data.email,
            },
          }
        },
      },
      title: 'My Templates',
      type: 'list',
    },
  },
}

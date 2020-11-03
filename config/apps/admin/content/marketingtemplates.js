import marketingTemplates from '../gql/marketingTemplates.gql'
import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'

export default {
  views: {
    template: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
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
            caption: 'Common.TemplateName',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TemplateNameRequired')
            },
          ],
        },
        Subject: {
          form: {
            caption: 'Common.SubjectRequired',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Common.Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.SubjectRequired')
            },
          ],
        },
        Type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 4,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TypeRequired')
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
        ImageURL: {
          form: {
            caption: 'Common.ImageUrl',
            displayOrder: 6,
          },
          displayOrder: 3,
          caption: 'Common.ImageUrl',
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
            caption: 'Common.BodyRequired',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Common.Body',
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
            function (v) {
              return !!v || this.$t('Messages.Error.BodyRequired')
            },
          ],
        },
        Category: {
          form: {
            caption: 'Common.CategoryRequired',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TypeRequired')
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
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Documents: {
          form: {
            caption: 'Common.Attachments',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Common.Attachments',
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
      title: 'Common.Templates',
      type: 'list',
    },
    mytemplate: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
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
            caption: 'Common.TemplateName',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TemplateNameRequired')
            },
          ],
        },
        Subject: {
          form: {
            caption: 'Common.SubjectRequired',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Common.Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.SubjectRequired')
            },
          ],
        },
        Type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 4,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TypeRequired')
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
        ImageURL: {
          form: {
            caption: 'Common.ImageUrl',
            displayOrder: 6,
          },
          displayOrder: 3,
          caption: 'Common.ImageUrl',
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
            caption: 'Common.BodyRequired',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Common.Body',
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
            function (v) {
              return !!v || this.$t('Messages.Error.BodyRequired')
            },
          ],
        },
        Category: {
          form: {
            caption: 'Common.CategoryRequired',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TypeRequired')
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
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Common.CreatedBy',
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
      title: 'Common.MyTemplates',
      type: 'list',
    },
  },
}

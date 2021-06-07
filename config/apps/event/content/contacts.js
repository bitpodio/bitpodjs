import registrationStatusOptions from '../gql/registrationStatusOptions.gql'
import contactList from '../gql/contactList.gql'
import registrationList from '../gql/registrationList.gql'
import eventInvites from '../gql/eventInvites.gql'
import eventTasks from '../gql/eventTasks.gql'

export default {
  dataSouce: {
    Type: 'List',
    URL: 'Contact',
  },
  general: {
    caption: 'Contacts',
    name: 'Contact',
  },
  views: {
    Contacts: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: false,
      },
      fields: {
        FirstName: {
          form: {
            caption: 'Common.FirstName',
            displayOrder: 1,
          },
          caption: 'Common.FirstNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            function (v) {
              if (v && v.length && /^\s+/.test(v)) {
                return this.$t('Messages.Error.SpaceNotAllowed')
              } else {
                return (
                  !!(v && v.length) ||
                  typeof v === 'number' ||
                  this.$t('Messages.Error.FieldRequired')
                )
              }
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Common.LastName',
            displayOrder: 2,
          },
          caption: 'Common.LastNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            function (v) {
              if (v && v.length && /^\s+/.test(v)) {
                return this.$t('Messages.Error.SpaceNotAllowed')
              } else {
                return (
                  !!(v && v.length) ||
                  typeof v === 'number' ||
                  this.$t('Messages.Error.FieldRequired')
                )
              }
            },
          ],
        },
        Type: {
          form: {
            caption: 'Common.TypeCaption',
            displayOrder: 3,
          },
          displayOrder: 8,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'CRMContactType',
              }
            },
          },
        },
        Job: {
          form: {
            caption: 'Common.FullJobTitle',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Common.JobTitle',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        Department: {
          form: {
            caption: 'Common.Department',
            displayOrder: 5,
          },
          caption: 'Common.Department',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'lookup',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'CRMDepartment',
              }
            },
          },
        },
        CellPhone: {
          form: {
            caption: 'Common.MobilePhone',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return /^[0-9]\d*$|^$/.test(value) || 'Number must be valid'
            },
          ],
        },
        WorkPhone: {
          form: {
            caption: 'Common.OtherPhone',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        Email: {
          form: {
            caption: 'Common.Email',
            displayOrder: 8,
          },
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        BirthDate: {
          form: {
            caption: 'Common.BirthDate',
            displayOrder: 9,
          },
          displayOrder: 7,
          caption: 'Common.BirthDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          default: '',
        },
        Organization: {
          form: {
            caption: 'Common.Organization',
            displayOrder: 10,
          },
          displayOrder: 7,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          hidden: false,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        ReportsTo: {
          form: {
            caption: 'Common.ReportsTo',
            displayOrder: 11,
          },
          displayOrder: 7,
          caption: 'Common.ReportsToCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        Assistant: {
          form: {
            caption: 'Common.Assistant',
            displayOrder: 12,
          },
          displayOrder: 7,
          caption: 'Common.Assistant',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        AsstPhone: {
          form: {
            caption: 'Common.AsstPhone',
            displayOrder: 13,
          },
          displayOrder: 7,
          caption: 'Common.AsstPhoneCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.StreetName',
            displayOrder: 14,
          },
          displayOrder: 7,
          caption: 'Common.CurrentAddressLine',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 15,
          },
          displayOrder: 7,
          caption: 'Common.CurrentAddressCity',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 16,
          },
          displayOrder: 7,
          caption: 'Common.CurrentAddressState',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 17,
          },
          displayOrder: 7,
          caption: 'Common.CurrentAddressPostalCode',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 18,
          },
          displayOrder: 7,
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Common.FullName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: false,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 9,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
          newForm: false,
          editForm: false,
          customExport: (startDate) => {
            if (startDate) {
              const tempDate = new Date(startDate)
              return (
                tempDate.toLocaleDateString() +
                ' ' +
                tempDate.toLocaleTimeString()
              )
            }
            return ''
          },
        },
      },
      template: {
        name: 'contact-grid',
        context: {
          basePath: '/contacts',
        },
      },
      dataSource: {
        singularEntity: 'Common.Contact',
        pluralEntity: 'Common.Contacts',
        query: contactList,
        filter: {
          where: {},
        },
        type: 'graphql',
        model: 'Contact',
        defaultSort: 'createdDate DESC',
      },
      itemTitle: 'Common.Contact',
      title: 'Common.Contacts',
      defaultSort: 'createdDate DESC',
    },
    InviteContacts: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: true,
      },
      fields: {
        Email: {
          displayOrder: 1,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Common.FullName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: '',
        context: {
          basePath: '/contacts',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Contact',
        pluralEntity: 'Common.Contacts',
        query: contactList,
        filter: {
          where: {},
        },
        type: 'graphql',
        model: 'Contact',
        defaultSort: 'createdDate DESC',
      },
      hidden: true,
      title: 'Contacts',
      defaultSort: 'createdDate DESC',
    },
    contactRegistration: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      hidden: true,
      fields: {
        FullName: {
          displayOrder: 2,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        EventName: {
          displayOrder: 4,
          caption: 'Common.EventApp',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        Phone: {
          displayOrder: 5,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        TotalAmount: {
          displayOrder: 6,
          caption: 'Common.Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '105px',
          type: 'string',
        },
        Status: {
          displayOrder: 7,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          customExport: (startDate) => {
            if (startDate) {
              const tempDate = new Date(startDate)
              return (
                tempDate.toLocaleDateString() +
                ' ' +
                tempDate.toLocaleTimeString()
              )
            }
            return ''
          },
        },
      },
      template: {
        name: 'contactRegistration-grid',
        context: {
          basePath: '/registration',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Registration',
        pluralEntity: 'Common.Registrations',
        query: registrationList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Registration',
        filter(ctx) {
          return {
            where: {},
          }
        },
      },
      title: 'contactRegistration',
      type: 'list',
    },
    contactInvites: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      fields: {
        createdDate: {
          displayOrder: 2,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Common.Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'event.Title': {
          displayOrder: 4,
          caption: 'Common.EventApp',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        'getCRMActivityId.Title': {
          displayOrder: 5,
          caption: 'Common.CampaignName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        Sent: {
          displayOrder: 6,
          caption: 'Common.SentBounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
        },
        Click: {
          displayOrder: 7,
          caption: 'Common.Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        Open: {
          displayOrder: 8,
          caption: 'Common.Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        Delivered: {
          displayOrder: 9,
          caption: 'Common.Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 10,
          caption: 'Common.Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 11,
          caption: 'Common.Spam',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
      },
      hidden: true,
      template: {
        name: 'contactInvites-grid',
        context: {
          basePath: '/contact',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: eventInvites,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'EmailAnalytic',
        filter(ctx) {
          return {
            where: {
              ContactId: ctx.$route.params.id,
            },
          }
        },
      },
      title: 'Invites',
      type: 'list',
    },
    contactEmails: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      hidden: true,
      fields: {
        Title: {
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'strig',
        },
        Status: {
          displayOrder: 3,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '125px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 5,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'date',
        },
        DueDate: {
          displayOrder: 6,
          caption: 'Common.DueDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '135px',
          type: 'datetime',
        },
        TemplateName: {
          displayOrder: 7,
          caption: 'Common.TemplateNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
        },
      },
      template: {
        name: 'contactEmails-grid',
        context: {
          basePath: '/contact',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Task',
        pluralEntity: 'Common.Tasks',
        query: eventTasks,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {
              ContactId: ctx.$route.params.id,
            },
          }
        },
      },
      title: 'contactEmails',
      type: 'list',
    },
    Invites: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      hidden: true,
      fields: {
        createdDate: {
          displayOrder: 2,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'datetime',
        },
        Title: {
          displayOrder: 3,
          caption: 'Common.Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        SenderName: {
          displayOrder: 4,
          caption: 'Common.Sender',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        Status: {
          displayOrder: 5,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        createdBy: {
          displayOrder: 6,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
      },
      template: {
        name: 'eventInvitaionHistory-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Task',
        pluralEntity: 'Common.Tasks',
        query: eventTasks,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: { Type: 'Mass Email' },
          }
        },
      },
      title: 'Invites',
      type: 'list',
    },
    inviteeEventTasks: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      hidden: true,
      fields: {
        Title: {
          displayOrder: 2,
          caption: 'Common.Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 3,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DueDate: {
          displayOrder: 7,
          caption: 'Common.DueDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 9,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'contactInvitee-grid',
        context: {
          basePath: `/contacts`,
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Task',
        pluralEntity: 'Common.Tasks',
        query: eventTasks,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {
              and: [{ EventId: ctx.$route.params.id }, { Type: 'Mass Email' }],
            },
          }
        },
      },
      title: 'eventTasks',
      type: 'list',
    },
  },
}

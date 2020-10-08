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
        hideFilter: false,
        hideSearch: false,
      },
      fields: {
        FirstName: {
          form: {
            caption: 'First Name *',
            displayOrder: 1,
          },
          caption: 'First Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            (v) => {
              return !!v || 'First Name is required'
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Last Name *',
            displayOrder: 2,
          },
          caption: 'Last Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        Type: {
          form: {
            caption: 'Type',
            displayOrder: 3,
          },
          displayOrder: 8,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
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
            caption: 'Full Job Title',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Job Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        Department: {
          form: {
            caption: 'Department',
            displayOrder: 5,
          },
          caption: 'Department',
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
            caption: 'Mobile Phone *',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            (v) => {
              return !!v || 'Phone is required'
            },
            function (value, data) {
              return /^[0-9]\d*$|^$/.test(value) || 'Number must be valid'
            },
          ],
        },
        Email: {
          form: {
            caption: 'Email *',
            displayOrder: 8,
          },
          displayOrder: 3,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: true,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
          rules: [
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        WorkPhone: {
          form: {
            caption: 'Other Phone',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        BirthDate: {
          form: {
            caption: 'Birth Date',
            displayOrder: 9,
          },
          displayOrder: 7,
          caption: 'BirthDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        Organization: {
          form: {
            caption: 'Organization',
            displayOrder: 10,
          },
          displayOrder: 7,
          caption: 'Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: false,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        ReportsTo: {
          form: {
            caption: 'Reports To',
            displayOrder: 11,
          },
          displayOrder: 7,
          caption: 'ReportsTo',
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
            caption: 'Assistant',
            displayOrder: 12,
          },
          displayOrder: 7,
          caption: 'Assistant',
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
            caption: 'Asst Phone',
            displayOrder: 13,
          },
          displayOrder: 7,
          caption: 'AsstPhone',
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
            caption: 'Street Name',
            displayOrder: 14,
          },
          displayOrder: 7,
          caption: '_CurrentAddress.AddressLine',
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
            caption: 'City',
            displayOrder: 15,
          },
          displayOrder: 7,
          caption: '_CurrentAddress.City',
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
            caption: 'State',
            displayOrder: 16,
          },
          displayOrder: 7,
          caption: '_CurrentAddress.State',
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
            caption: 'Zip',
            displayOrder: 17,
          },
          displayOrder: 7,
          caption: '_CurrentAddress.PostalCode',
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
            caption: 'Country',
            displayOrder: 18,
          },
          displayOrder: 7,
          caption: '_CurrentAddress.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-6 col-md-6',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Full Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: false,
          newForm: false,
          editForm: false,
        },
        Country: {
          displayOrder: 6,
          caption: 'Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 9,
          caption: 'createdDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'contact-grid',
        context: {
          basePath: '/contacts',
        },
      },
      dataSource: {
        query: contactList,
        filter: {
          where: {},
        },
        type: 'graphql',
        model: 'Contact',
        defaultSort: 'createdDate DESC',
      },
      title: 'Contacts',
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
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Full Name',
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
            caption: 'new field',
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
        query: contactList,
        filter: {
          where: {},
        },
        type: 'graphql',
        model: 'Contact',
        defaultSort: 'createdDate DESC',
      },
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
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Email: {
          displayOrder: 3,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        EventName: {
          displayOrder: 4,
          caption: 'Event',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        Phone: {
          displayOrder: 5,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        TotalAmount: {
          displayOrder: 6,
          caption: 'Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '105px',
          type: 'string',
        },
        Status: {
          displayOrder: 7,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Created Date ',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
      },
      template: {
        name: 'link-grid',
        context: {
          basePath: '/contact',
        },
      },
      dataSource: {
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
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '125px',
          type: 'string',
        },
        'event.Title': {
          displayOrder: 4,
          caption: 'Event',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        'getCRMActivityId.Title': {
          displayOrder: 5,
          caption: 'Campaign Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Sent: {
          displayOrder: 6,
          caption: 'Sent/Bounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '135px',
          type: 'string',
        },
        Click: {
          displayOrder: 7,
          caption: 'Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        Open: {
          displayOrder: 8,
          caption: 'Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        Delivered: {
          displayOrder: 9,
          caption: 'Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 10,
          caption: 'Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 11,
          caption: 'Spam',
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
            caption: 'new field',
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
          caption: 'Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'strig',
        },
        Status: {
          displayOrder: 3,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '125px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 5,
          caption: 'Created Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        DueDate: {
          displayOrder: 6,
          caption: 'Due Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '135px',
          type: 'datetime',
        },
        TemplateName: {
          displayOrder: 7,
          caption: 'Template Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
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
        },
      },
      dataSource: {
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
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'datetime',
        },
        Title: {
          displayOrder: 3,
          caption: 'Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        SenderName: {
          displayOrder: 4,
          caption: 'Sender',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        Status: {
          displayOrder: 5,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
        createdBy: {
          displayOrder: 6,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'String',
        },
      },
      template: {
        name: 'registrationSession-grid',
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
        },
      },
      dataSource: {
        query: eventTasks,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {},
          }
        },
      },
      title: 'Invites',
      type: 'list',
    },
  },
}

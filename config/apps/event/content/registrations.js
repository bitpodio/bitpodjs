import eventNames from '../gql/eventNames.gql'
import registrationType from '../gql/registrationType.gql'
import eventTickets from '../gql/eventTickets.gql'
import registrationList from '../gql/registrationList.gql'
import eventAttendees from '../gql/eventAttendees.gql'
import eventTasks from '../gql/eventTasks.gql'
import { getData, getLookupData } from '../rest'

export default {
  views: {
    Registrations: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: false,
      fields: {
        FirstName: {
          displayOrder: 1,
          caption: 'First Name',
          form: {
            caption: 'First Name *',
            displayOrder: 1,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'First Name is required'
            },
          ],
        },
        LastName: {
          displayOrder: 1,
          caption: 'Last Name',
          form: {
            caption: 'Last Name *',
            displayOrder: 2,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        PaymentMethod: {
          displayOrder: 10,
          caption: 'PaymentMethod',
          form: {
            caption: 'PaymentMethod*',
            displayOrder: 13,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 4,
          caption: 'Organization',
          form: {
            caption: 'Organization',
            displayOrder: 5,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Phone: {
          displayOrder: 5,
          caption: 'Phone',
          form: {
            caption: 'Phone *',
            displayOrder: 3,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
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
          displayOrder: 3,
          caption: 'Email',
          form: {
            caption: 'Email *',
            displayOrder: 4,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        '_CurrentAddress.AddressLine': {
          caption: 'Address',
          searchEnable: true,
          form: {
            caption: 'Address',
            displayOrder: 7,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.City': {
          caption: 'City',
          searchEnable: true,
          form: {
            caption: 'City',
            displayOrder: 8,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.State': {
          caption: 'State',
          form: {
            caption: 'State',
            displayOrder: 9,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.PostalCode': {
          caption: 'Zip',
          form: {
            caption: 'PostalCode',
            displayOrder: 10,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.Country': {
          caption: 'Country',
          form: {
            caption: 'Country',
            displayOrder: 11,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        EventName: {
          displayOrder: 6,
          caption: 'Event Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        EventId: {
          displayOrder: 6,
          caption: 'Event',
          form: {
            caption: 'Event *',
            displayOrder: 12,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'search',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: eventNames,
            itemText: 'Title',
            itemValue: 'id',
            filter(ctx) {
              return {
                and: [
                  { EndDate: { gte: new Date() } },
                  { Status: `Open for registration` },
                ],
              }
            },
          },
        },
        AttendeeType: {
          displayOrder: 6,
          caption: 'AttendeeType',
          form: {
            caption: 'RegistrationType',
            displayOrder: 15,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationType,
            itemText: 'Name',
            itemValue: 'id',
            filter(ctx, data) {
              return {
                EventId: ctx.EventId,
              }
            },
          },
        },
        Status: {
          displayOrder: 9,
          caption: 'Status',
          form: {
            caption: 'Status *',
            displayOrder: 6,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            type: 'rest',
            itemText: 'value',
            itemValue: 'key',
            getData: (ctx) => {
              let filter = {
                where: {
                  type: 'RegistrationStatus',
                },
              }
              filter = JSON.stringify(filter)
              const path = `/GeneralConfigurations?filter=${filter}`
              return getLookupData(path)
            },
          },
        },
        RegistrationId: {
          displayOrder: 6,
          caption: 'RegistrationId',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 11,
          caption: 'createdDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        TicketQuantity: {
          displayOrder: 9,
          caption: 'Attendees',
          form: {
            caption: 'Ticket Quantity',
            displayOrder: 14,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Full Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        TotalAmount: {
          displayOrder: 8,
          caption: 'TotalAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        action: {
          displayOrder: 11,
          caption: 'Action',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'action',
          inlineEdit: false,
          hidden: true,
          newForm: false,
          editForm: false,
          condtion: ({ item, items, index }) => {
            return true
          },
        },
        TicketId: {
          caption: 'Tickets',
          searchEnable: true,
          form: {
            caption: 'Tickets *',
            displayOrder: 13,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
          multiple: true,
          readonly(value, data) {
            const id = data.EventId
            return id === '' || id === null
          },
          dataSource: {
            query: eventTickets,
            itemText: 'Code',
            itemValue: 'id',
            filter(data) {
              return {
                Events: data.EventId,
              }
            },
          },
        },
      },
      template: {
        name: 'registration-grid',
        context: {
          basePath: '/registration',
        },
        actions: {
          new: {
            caption: 'New Registration',
          },
        },
      },
      dataSource: {
        query: registrationList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Registration',
      },
      itemTitle: 'Registration',
      title: 'Registrations',
      type: 'list',
    },
    'Abandoned Registrations': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      fields: {
        FirstName: {
          displayOrder: 1,
          caption: 'First Name',
          form: {
            caption: 'First Name *',
            displayOrder: 1,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'First Name is required'
            },
          ],
        },
        LastName: {
          displayOrder: 1,
          caption: 'Last Name',
          form: {
            caption: 'Last Name *',
            displayOrder: 2,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        PaymentMethod: {
          displayOrder: 10,
          caption: 'PaymentMethod',
          form: {
            caption: 'PaymentMethod*',
            displayOrder: 13,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 4,
          caption: 'Organization',
          form: {
            caption: 'Organization',
            displayOrder: 5,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Phone: {
          displayOrder: 5,
          caption: 'Phone',
          form: {
            caption: 'Phone *',
            displayOrder: 3,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
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
          displayOrder: 3,
          caption: 'Email',
          form: {
            caption: 'Email *',
            displayOrder: 4,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        '_CurrentAddress.AddressLine': {
          caption: 'Address',
          searchEnable: true,
          form: {
            caption: 'Address',
            displayOrder: 7,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.City': {
          caption: 'City',
          searchEnable: true,
          form: {
            caption: 'City',
            displayOrder: 8,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.State': {
          caption: 'State',
          form: {
            caption: 'State',
            displayOrder: 9,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.PostalCode': {
          caption: 'Zip',
          form: {
            caption: 'PostalCode',
            displayOrder: 10,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        '_CurrentAddress.Country': {
          caption: 'Country',
          form: {
            caption: 'Country',
            displayOrder: 11,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        EventName: {
          displayOrder: 6,
          caption: 'Event Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        EventId: {
          displayOrder: 6,
          caption: 'Event',
          form: {
            caption: 'Event *',
            displayOrder: 12,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: eventNames,
            itemText: 'Title',
            itemValue: 'id',
            filter(ctx) {
              return {
                and: [
                  { EndDate: { gte: new Date() } },
                  { Status: `Open for registration` },
                ],
              }
            },
          },
        },
        AttendeeType: {
          displayOrder: 6,
          caption: 'AttendeeType',
          form: {
            caption: 'RegistrationType',
            displayOrder: 15,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationType,
            itemText: 'Name',
            itemValue: 'id',
            filter(ctx, data) {
              return {
                EventId: ctx.EventId,
              }
            },
          },
        },
        Status: {
          displayOrder: 9,
          caption: 'Status',
          form: {
            caption: 'Status *',
            displayOrder: 6,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            type: 'rest',
            itemText: 'value',
            itemValue: 'key',
            getData: (ctx) => {
              let filter = {
                where: {
                  type: 'RegistrationStatus',
                },
              }
              filter = JSON.stringify(filter)
              const path = `/GeneralConfigurations?filter=${filter}`
              return getLookupData(path)
            },
          },
        },
        RegistrationId: {
          displayOrder: 6,
          caption: 'RegistrationId',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 11,
          caption: 'createdDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        TicketQuantity: {
          displayOrder: 9,
          caption: 'Attendees',
          form: {
            caption: 'Ticket Quantity',
            displayOrder: 14,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        FullName: {
          displayOrder: 2,
          caption: 'Full Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        TotalAmount: {
          displayOrder: 8,
          caption: 'TotalAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        action: {
          displayOrder: 11,
          caption: 'Action',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'action',
          inlineEdit: false,
          hidden: true,
          newForm: false,
          editForm: false,
          condtion: ({ item, items, index }) => {
            return true
          },
        },
        TicketId: {
          caption: 'Tickets',
          searchEnable: true,
          form: {
            caption: 'Tickets *',
            displayOrder: 13,
          },
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          inlineEdit: false,
          newForm: true,
          editForm: true,
          hidden: true,
          multiple: true,
          readonly(value, data) {
            const id = data.EventId
            return id === '' || id === null
          },
          dataSource: {
            query: eventTickets,
            itemText: 'Code',
            itemValue: 'id',
            filter(data) {
              return {
                Events: data.EventId,
              }
            },
          },
        },
      },
      template: {
        name: 'registrationAbondoned-grid',
        context: {
          basePath: '/registration',
        },
        actions: {
          edit: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: registrationList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Registration',
        filter: {
          where: { Status: 'Failed' },
        },
      },
      itemTitle: 'Registration',
      title: 'Abandoned Registrations',
      type: 'list',
    },
    registrationSessions: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Session',
      hidden: true,
      fields: {
        Name: {
          displayOrder: 1,
          caption: 'Name',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
        },
        StartTime: {
          displayOrder: 2,
          caption: 'Start Time',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        EndTime: {
          displayOrder: 3,
          caption: 'End Time',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        Type: {
          displayOrder: 6,
          caption: 'Type',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          type: 'string',
        },
        Location: {
          displayOrder: 7,
          caption: 'Location',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '180px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 4,
          caption: 'Start Date',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'datetime',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        EndDate: {
          displayOrder: 5,
          caption: 'End Date',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'datetime',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'registrationSession-grid',
        context: {
          basePath: '/registration',
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
        type: 'rest',
        getData: (ctx) =>
          getData(`Registrations/${ctx.$route.params.id}/SessionListId`),
      },
      title: 'Sessions',
      type: 'list',
    },
    registrationAttendees: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Attendee',
      hidden: true,
      fields: {
        FullName: {
          displayOrder: 2,
          caption: 'Full Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        FirstName: {
          form: {
            caption: 'First Name *',
            displayOrder: 1,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
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
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        Phone: {
          form: {
            caption: 'Phone *',
            displayOrder: 3,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
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
          displayOrder: 3,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Email *',
            displayOrder: 4,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        'attendeeTicket.Code': {
          displayOrder: 4,
          caption: 'Ticket',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        TicketAmount: {
          displayOrder: 5,
          caption: 'Ticket Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        SeatNumber: {
          displayOrder: 6,
          caption: 'Seat Number',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 7,
          caption: 'Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CheckIn: {
          displayOrder: 8,
          caption: 'Check In',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 9,
          caption: 'Created Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address',
            displayOrder: 5,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'City',
            displayOrder: 6,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'State',
            displayOrder: 7,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Zip',
            displayOrder: 8,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Country',
            displayOrder: 9,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        TicketId: {
          form: {
            caption: 'Tickets *',
            displayOrder: 11,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: eventTickets,
            itemText: 'Code',
            itemValue: 'id',
            filter(ctx, data) {
              return {
                Events: this.context.registration.EventId,
              }
            },
          },
        },
        categoryId: {
          form: {
            caption: 'Registration Type',
            displayOrder: 12,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationType,
            itemText: 'Name',
            itemValue: 'id',
            filter(data) {
              return {
                EventId: this.context.registration.EventId,
              }
            },
          },
        },
      },
      template: {
        name: 'registrationAttendees-grid',
        context: {
          basePath: '/registration',
        },
      },
      dataSource: {
        query: eventAttendees,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Attendee',
        filter(ctx) {
          return {
            where: {
              RegistrationId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              RegistrationId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'Registrations',
      type: 'list',
    },
    registrationEmails: {
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
          displayOrder: 1,
          caption: 'Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 2,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        Action: {
          displayOrder: 3,
          caption: 'Wait For',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        Category: {
          displayOrder: 4,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        TemplateName: {
          displayOrder: 8,
          caption: 'TemplateName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 7,
          caption: 'createdBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 6,
          caption: 'createdDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'date',
        },
        DueDate: {
          displayOrder: 5,
          caption: 'DueDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'datetime',
        },
      },
      template: {
        name: 'registrationEmails-grid',
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
        query: eventTasks,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {
              Registrations: ctx.$route.params.id,
            },
          }
        },
      },
      title: 'Emails',
      type: 'list',
    },
  },
}

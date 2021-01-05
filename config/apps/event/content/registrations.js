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
          caption: 'Common.FirstNameCaption',
          form: {
            caption: 'Common.FirstName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.FirstNameRequired')
            },
          ],
        },
        LastName: {
          displayOrder: 1,
          caption: 'Common.LastNameCaption',
          form: {
            caption: 'Common.LastName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        PaymentMethod: {
          displayOrder: 10,
          caption: 'Common.PaymentMethodHeader',
          form: {
            caption: 'PaymentMethod*',
            displayOrder: 13,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 4,
          caption: 'Common.Organization',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Phone: {
          displayOrder: 5,
          caption: 'Common.Phone',
          form: {
            caption: 'Common.PhoneRequired',
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
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.NumberValid')
              )
            },
          ],
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          form: {
            caption: 'Common.Email',
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
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return (
                /.+@.+\..+/.test(value) ||
                this.$t('Messages.Error.EmailRequired')
              )
            },
          ],
        },
        '_CurrentAddress.AddressLine': {
          caption: 'Common.Address',
          searchEnable: true,
          form: {
            caption: 'Common.Address',
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
          caption: 'Common.City',
          searchEnable: true,
          form: {
            caption: 'Common.City',
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
          caption: 'Common.State',
          form: {
            caption: 'Common.State',
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
          caption: 'Common.Zip',
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
          caption: 'Common.Country',
          form: {
            caption: 'Common.Country',
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
          caption: 'Common.EventNameHeader',
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
          caption: 'Common.EventApp',
          form: {
            caption: 'Common.Event',
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
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ThisFieldRequired')
            },
          ],
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
          caption: 'Common.AttendeeType',
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
          caption: 'Common.Status',
          form: {
            caption: 'Common.StatusRequired',
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
              const path = `GeneralConfigurations?filter=${filter}`
              return getLookupData(path)
            },
          },
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.StatusRequired')
            },
          ],
        },
        RegistrationId: {
          displayOrder: 6,
          caption: 'Common.RegistrationIdHeader',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '165px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Common.CreatedDate',
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
          caption: 'Common.Attendees',
          form: {
            caption: 'Ticket Quantity',
            displayOrder: 14,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
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
          caption: 'Common.FullName',
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
          caption: 'Common.TotalAmountHeader',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'number',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        action: {
          displayOrder: 11,
          caption: 'Drawer.Action',
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
          caption: 'Common.Tickets',
          searchEnable: true,
          form: {
            caption: 'Common.TicketsNotRequired',
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
            caption: 'Common.NewRegistration',
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
      },
      itemTitle: 'Common.Registration',
      title: 'Common.Registrations',
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
          caption: 'Common.FirstNameCaption',
          form: {
            caption: 'Common.FirstName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.FirstNameRequired')
            },
          ],
        },
        LastName: {
          displayOrder: 1,
          caption: 'Common.LastNameCaption',
          form: {
            caption: 'Common.LastName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        PaymentMethod: {
          displayOrder: 10,
          caption: 'Common.PaymentMethodHeader',
          form: {
            caption: 'PaymentMethod*',
            displayOrder: 13,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 4,
          caption: 'Common.Organization',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Phone: {
          displayOrder: 5,
          caption: 'Common.Phone',
          form: {
            caption: 'Common.PhoneRequired',
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
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.NumberValid')
              )
            },
          ],
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          form: {
            caption: 'Common.Email',
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
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return (
                /.+@.+\..+/.test(value) ||
                this.$t('Messages.Error.EmailRequired')
              )
            },
          ],
        },
        '_CurrentAddress.AddressLine': {
          caption: 'Common.Address',
          searchEnable: true,
          form: {
            caption: 'Common.Address',
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
          caption: 'Common.City',
          searchEnable: true,
          form: {
            caption: 'Common.City',
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
          caption: 'Common.State',
          form: {
            caption: 'Common.State',
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
          caption: 'Common.Zip',
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
          caption: 'Common.Country',
          form: {
            caption: 'Common.Country',
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
          caption: 'Common.EventNameHeader',
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
          caption: 'Common.EventApp',
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
          caption: 'Common.AttendeeType',
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
          caption: 'Common.Status',
          form: {
            caption: 'Common.StatusRequired',
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
              const path = `GeneralConfigurations?filter=${filter}`
              return getLookupData(path)
            },
          },
        },
        RegistrationId: {
          displayOrder: 6,
          caption: 'Common.RegistrationIdHeader',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '165px',
          type: 'string',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Common.CreatedDate',
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
          caption: 'Common.Attendees',
          form: {
            caption: 'Ticket Quantity',
            displayOrder: 14,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
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
          caption: 'Common.FullName',
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
          caption: 'Common.TotalAmountHeader',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'number',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        action: {
          displayOrder: 11,
          caption: 'Drawer.Action',
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
          caption: 'Common.Tickets',
          searchEnable: true,
          form: {
            caption: 'Common.TicketsRequired',
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
        singularEntity: 'Common.Registration',
        pluralEntity: 'Common.Registrations',
        query: registrationList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Registration',
        filter: {
          where: { Status: 'Failed' },
        },
      },
      itemTitle: 'Common.Registrations',
      title: 'Common.AbandonedRegistrations',
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
      itemTitle: 'Common.Sessions',
      hidden: true,
      fields: {
        Name: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
        },
        StartTime: {
          displayOrder: 2,
          caption: 'Common.StartTime',
          searchEnable: false,
          sortEnable: false,
          hidden: true,
          columnWidth: '130px',
          type: 'string',
        },
        EndTime: {
          displayOrder: 3,
          caption: 'Common.EndTime',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          hidden: true,
          type: 'string',
        },
        Type: {
          displayOrder: 6,
          caption: 'Common.TypeCaption',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          hidden: true,
          type: 'string',
        },
        Location: {
          displayOrder: 7,
          caption: 'Common.Location',
          searchEnable: false,
          sortEnable: false,
          hidden: true,
          columnWidth: '180px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 2,
          caption: 'Common.StartDate',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '200px',
          type: 'datetime',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        EndDate: {
          displayOrder: 5,
          caption: 'Common.EndDate',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '220px',
          type: 'datetime',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Timezone: {
          displayOrder: 3,
          caption: 'Common.TimezoneCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Duration: {
          displayOrder: 4,
          caption: 'Common.Duration',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
        },
        LocationType: {
          displayOrder: 5,
          caption: 'Common.LocationType',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
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
        singularEntity: 'Common.SessionCaption',
        pluralEntity: 'Common.Sessions',
        type: 'rest',
        getData: (ctx) =>
          getData(`Registrations/${ctx.$route.params.id}/SessionListId`),
      },
      title: 'Sessions',
      type: 'list',
    },
    registrationRecurringSessions: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Sessions',
      hidden: true,
      fields: {
        Name: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
        },
        StartTime: {
          displayOrder: 2,
          caption: 'Common.StartTime',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        EndTime: {
          displayOrder: 3,
          caption: 'Common.EndTime',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        Type: {
          displayOrder: 6,
          caption: 'Common.TypeCaption',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          type: 'string',
        },
        Location: {
          displayOrder: 7,
          caption: 'Common.Location',
          searchEnable: false,
          sortEnable: false,
          hidden: true,
          columnWidth: '180px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 2,
          caption: 'Common.StartDate',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '200px',
          type: 'datetime',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        EndDate: {
          displayOrder: 5,
          caption: 'Common.EndDate',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '220px',
          type: 'datetime',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Timezone: {
          displayOrder: 3,
          caption: 'Common.TimezoneCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Duration: {
          displayOrder: 4,
          caption: 'Common.Duration',
          searchEnable: false,
          sortEnable: false,
          hidden: true,
          columnWidth: '150px',
          type: 'string',
        },
        LocationType: {
          displayOrder: 5,
          caption: 'Common.LocationType',
          searchEnable: false,
          sortEnable: false,
          hidden: true,
          columnWidth: '150px',
          type: 'string',
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
        singularEntity: 'Common.SessionCaption',
        pluralEntity: 'Common.Sessions',
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
      itemTitle: 'Common.Attendee',
      hidden: true,
      fields: {
        FullName: {
          displayOrder: 2,
          caption: 'Common.FullName',
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
            caption: 'Common.FirstName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.FirstNameRequired')
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Common.LastName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        Phone: {
          form: {
            caption: 'Common.PhoneRequired',
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
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.NumberValid')
              )
            },
          ],
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Common.Email',
            displayOrder: 4,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return (
                /.+@.+\..+/.test(value) ||
                this.$t('Messages.Error.EmailRequired')
              )
            },
          ],
        },
        TicketName: {
          displayOrder: 4,
          caption: 'Common.Ticket',
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
          caption: 'Common.TicketAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '165px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        SeatNumber: {
          displayOrder: 6,
          caption: 'Common.SeatNumber',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 7,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CheckIn: {
          displayOrder: 8,
          caption: 'Common.CheckIn',
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
          caption: 'Common.CreatedDate',
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
            caption: 'Common.Address',
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
            caption: 'Common.City',
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
            caption: 'Common.State',
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
            caption: 'Common.Zip',
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
            caption: 'Common.Country',
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
            caption: 'Common.TicketsRequired',
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
            caption: 'Common.RegistrationType',
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
        singularEntity: 'Common.Attendee',
        pluralEntity: 'Common.Attendees',
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
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 2,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        Action: {
          displayOrder: 3,
          caption: 'Common.WaitFor',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        Category: {
          displayOrder: 4,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
        TemplateName: {
          displayOrder: 8,
          caption: 'Common.TemplateNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 6,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        DueDate: {
          displayOrder: 5,
          caption: 'Common.DueDate',
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
        singularEntity: 'Common.Task',
        pluralEntity: 'Common.Tasks',
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
    registrationSessionsPublic: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Sessions',
      hidden: true,
      fields: {
        Name: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
        },
        StartTime: {
          displayOrder: 2,
          caption: 'Common.StartTime',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        EndTime: {
          displayOrder: 3,
          caption: 'Common.EndTime',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '130px',
          type: 'string',
        },
        Type: {
          displayOrder: 6,
          caption: 'Common.TypeCaption',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          type: 'string',
        },
        Location: {
          displayOrder: 7,
          caption: 'Common.Location',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '180px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 4,
          caption: 'Common.StartDate',
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
          caption: 'Common.EndDate',
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
        name: 'registrationSessionPublic-grid',
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
        type: 'rest',
        getData: (ctx) =>
          getData(`Registrations/${ctx.$route.params.id}/SessionListId`),
      },
      title: 'Sessions',
      type: 'list',
    },
    registrationAttendeesPublic: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Attendee',
      hidden: true,
      fields: {
        FullName: {
          displayOrder: 2,
          caption: 'Common.FullName',
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
            caption: 'Common.FirstName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.FirstNameRequired')
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Common.LastName',
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
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        Phone: {
          form: {
            caption: 'Common.PhoneRequired',
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
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.PhoneRequired')
              )
            },
          ],
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Common.Email',
            displayOrder: 4,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return (
                /.+@.+\..+/.test(value) ||
                this.$t('Messages.Error.EmailRequired')
              )
            },
          ],
        },
        'attendeeTicket.Code': {
          displayOrder: 4,
          caption: 'Common.Ticket',
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
          caption: 'Common.TicketAmount',
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
          caption: 'Common.SeatNumber',
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
          caption: 'Common.Organization',
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
          caption: 'Common.CheckIn',
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
          caption: 'Common.CreatedDate',
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
            caption: 'Common.Address',
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
            caption: 'Common.City',
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
            caption: 'Common.State',
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
            caption: 'Common.Zip',
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
            caption: 'Common.Country',
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
            caption: 'Common.TicketsRequired',
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
            caption: 'Common.RegistrationType',
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
        name: 'registrationAttendeesPublic-grid',
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
        singularEntity: 'Common.Attendee',
        pluralEntity: 'Common.Attendees',
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
  },
}

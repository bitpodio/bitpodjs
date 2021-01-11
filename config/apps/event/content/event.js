import addMonths from 'date-fns/addMonths'
import registrationStatusOptions from '../gql/registrationStatusOptions.gql'
import eventList from '../gql/eventlist.gql'
import eventTickets from '../gql/eventTickets.gql'
import registrationType from '../gql/registrationType.gql'
import liveDraftEvents from '../gql/liveDraftevents.gql'
import eventAttendees from '../gql/eventAttendees.gql'
import registrationList from '../gql/registrationList.gql'
import eventInvites from '../gql/eventInvites.gql'
import eventDiscountCodes from '../gql/eventDiscountCodes.gql'
import eventSession from '../gql/eventSession.gql'
import eventTasks from '../gql/eventTasks.gql'
import location from '../gql/location.gql'
import eventRecurringSession from '../gql/eventRecurringSession.gql'
import { getData, getLookupData, getCustomData } from '../rest'
import marketingTemplates from '~/config/apps/admin/gql/marketingTemplates.gql'

export default {
  DataSource: {
    Type: 'List',
    URL: 'Event',
  },
  general: {
    caption: 'Events',
    name: 'Event',
  },
  views: {
    'All-Events': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      itemTitle: 'Common.EventApp',
      default: false,
      fields: {
        Title: {
          form: {
            caption: 'Common.Title',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TitleRequired')
            },
          ],
        },
        Description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 2,
          },
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'richtext',
          hidden: true,
          cssClasses: 'col-12 col-md-12 pb-8',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        StartDate: {
          form: {
            caption: 'Common.StartD',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.StartDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.StartDateRequired')
            },
          ],
        },
        EndDate: {
          form: {
            caption: 'Common.EndD',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Common.EndDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EndDateRequired')
            },
          ],
        },
        Timezone: {
          form: {
            caption: 'Common.TimezoneRequired',
            displayOrder: 11,
          },
          displayOrder: 3,
          caption: 'Common.Timezone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-4 col-md-6',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TimezoneRequired')
            },
          ],
        },
        Organizer: {
          form: {
            caption: 'Common.EventOrganizer',
            displayOrder: 5,
          },
          caption: 'Common.EventOrganizerCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.OrganizerRequired')
            },
          ],
        },
        EventManager: {
          form: {
            caption: 'Common.EventManagerTeamEmail',
            displayOrder: 6,
          },
          caption: 'Common.EventOrganizerCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
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
        Status: {
          form: {
            caption: 'Common.StatusRequired',
            displayOrder: 7,
          },
          displayOrder: 3,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.StatusRequired')
            },
          ],
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'EventStatus',
              }
            },
          },
        },
        Privacy: {
          form: {
            caption: 'Common.Privacy',
            displayOrder: 8,
          },
          displayOrder: 4,
          caption: 'Common.Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'EventPrivacy',
              }
            },
          },
        },
        Tags: {
          form: {
            caption: 'Common.Tags',
            displayOrder: 9,
          },
          displayOrder: 5,
          caption: 'Common.Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          multiple: true,
          customExport: (tags) => {
            if (tags && tags !== []) return tags.join(',')
            return ''
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'EventTags',
              }
            },
          },
        },
        VenueName: {
          form: {
            caption: 'Common.VenueName',
            displayOrder: 13,
          },
          displayOrder: 6,
          caption: 'Common.Venue',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        '_VenueAddress.AddressLine': {
          form: {
            caption: 'Common.VenueRequired',
            displayOrder: 12,
          },
          displayOrder: 7,
          caption: 'Common.Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        '_VenueAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 14,
          },
          displayOrder: 8,
          caption: 'Common.City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        '_VenueAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 15,
          },
          displayOrder: 9,
          caption: 'Common.State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        '_VenueAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 17,
          },
          displayOrder: 10,
          caption: 'Common.PostalCode',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          filterEnable: false,
        },
        '_VenueAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 16,
          },
          displayOrder: 11,
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        CancellationPolicy: {
          form: {
            caption: 'Common.CancellationPolicy',
            displayOrder: 18,
          },
          displayOrder: 11,
          caption: 'Common.CancellationPolicy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12 pb-8',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        Message: {
          form: {
            caption: 'Common.Message',
            displayOrder: 19,
          },
          displayOrder: 11,
          caption: 'Common.Message',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12 pb-8',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        SeatReservation: {
          form: {
            caption: 'Common.SeatReservation',
            displayOrder: 20,
          },
          displayOrder: 11,
          caption: 'Common.SeatReservation',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4 py-0',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        ShowAttendeeForm: {
          form: {
            caption: 'Common.ShowAttendee',
            displayOrder: 21,
          },
          displayOrder: 11,
          caption: 'Common.ShowAttendee',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4 py-0',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        IsOnlineEvent: {
          form: {
            caption: 'Common.OnlineEvent',
            displayOrder: 22,
          },
          displayOrder: 11,
          caption: 'Common.OnlineEvent',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4 py-0',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        SessionTimingConflict: {
          form: {
            caption: 'Common.SessionTimingConflict',
            displayOrder: 23,
          },
          displayOrder: 11,
          caption: 'Common.SessionTimingConflict',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4 py-0',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        ShowRemainingTickets: {
          form: {
            caption: 'Common.ShowRemainingTickets',
            displayOrder: 24,
          },
          displayOrder: 11,
          caption: 'Common.ShowRemainingTickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4 py-0',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        Images: {
          form: {
            caption: 'Common.EventImage',
            displayOrder: 25,
          },
          cssClasses: 'col-6 col-md-6',
          displayOrder: 8,
          caption: 'Common.EventImage',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'file',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Currency: {
          form: {
            caption: 'Common.CurrencyReq',
            displayOrder: 10,
          },
          displayOrder: 12,
          caption: 'Common.Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'Currency',
              }
            },
          },
        },
        createdDate: {
          displayOrder: 13,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'allEvents-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          new: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.EventApp',
        pluralEntity: 'Drawer.Events',
        query: eventList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Event',
      },
      title: 'Common.AllEvents',
      type: 'list',
    },
    Past: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        Title: {
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 3,
          caption: 'Common.StartDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        EndDate: {
          displayOrder: 3,
          caption: 'Common.EndDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        Privacy: {
          displayOrder: 4,
          caption: 'Common.Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'string',
        },
        Tags: {
          displayOrder: 5,
          caption: 'Common.Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          customExport: (tags) => {
            if (tags && tags !== []) return tags.join(',')
            return ''
          },
        },
        VenueName: {
          displayOrder: 6,
          caption: 'Common.VenueName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.AddressLine': {
          displayOrder: 7,
          caption: 'Common.Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.City': {
          displayOrder: 8,
          caption: 'Common.City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.State': {
          displayOrder: 9,
          caption: 'Common.State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.PostalCode': {
          displayOrder: 10,
          caption: 'Common.PostalCode',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.Country': {
          displayOrder: 11,
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Currency: {
          displayOrder: 12,
          caption: 'Common.Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 13,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
      },
      template: {
        name: 'pastEvents-grid',
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
        },
      },
      dataSource: {
        singularEntity: 'Common.EventApp',
        pluralEntity: 'Drawer.Events',
        query: eventList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Event',
        filter: {
          where: {
            and: [{ EndDate: { lte: new Date() } }],
          },
        },
      },
      title: 'Common.Past',
      type: 'list',
    },
    'live-and-draft-event': {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: true,
      fields: {
        Title: {
          displayOrder: 2,
          caption: 'Common.Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 3,
          caption: 'Common.StartDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        EndDate: {
          displayOrder: 3,
          caption: 'Common.EndDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        Privacy: {
          displayOrder: 4,
          caption: 'Common.Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Tags: {
          displayOrder: 5,
          caption: 'Common.Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          customExport: (tags) => {
            if (tags && tags !== []) return tags.join(',')
            return ''
          },
        },
        VenueName: {
          displayOrder: 6,
          caption: 'Common.Venue',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.AddressLine': {
          displayOrder: 7,
          caption: 'Common.Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.City': {
          displayOrder: 8,
          caption: 'Common.City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.State': {
          displayOrder: 9,
          caption: 'Common.State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.PostalCode': {
          displayOrder: 10,
          caption: 'Common.PostalCode',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.Country': {
          displayOrder: 11,
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Currency: {
          displayOrder: 12,
          caption: 'Common.Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 13,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
      },
      template: {
        name: 'livedraft-grid',
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
        },
      },
      dataSource: {
        singularEntity: 'Common.EventApp',
        pluralEntity: 'Drawer.Events',
        query: liveDraftEvents,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Event',
        filter: {
          order: 'createdDate DESC',
          skip: '0',
          where: {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        StartDate: {
                          lte: new Date(),
                        },
                      },
                      {
                        StartDate: {
                          gte: new Date(),
                        },
                      },
                      {
                        StartDate: {
                          exists: false,
                        },
                      },
                      {
                        StartDate: null,
                      },
                    ],
                  },
                  {
                    or: [
                      {
                        StartDate: {
                          gte: new Date(),
                        },
                      },
                      {
                        StartDate: {
                          exists: false,
                        },
                      },
                      {
                        StartDate: null,
                      },
                    ],
                  },
                ],
              },
              {
                Status: 'Not ready',
              },
            ],
          },
        },
      },
      title: 'Common.LiveDraftEvent',
      type: 'list',
    },
    eventAttendees: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
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
        'registration.FullName': {
          displayOrder: 4,
          caption: 'Common.RegisteredBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
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
          columnWidth: '170px',
          type: 'number',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 6,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        TicketName: {
          displayOrder: 7,
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
        SeatNumber: {
          displayOrder: 8,
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
        'regType.Name': {
          displayOrder: 9,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CheckIn: {
          displayOrder: 10,
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
          displayOrder: 11,
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
        Status: {
          displayOrder: 12,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Action: {
          displayOrder: 13,
          caption: 'Drawer.Action',
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
          filterEnable: false,
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
          filterEnable: false,
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
          filterEnable: false,
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.Address',
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
          filterEnable: false,
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
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
          filterEnable: false,
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
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
          filterEnable: false,
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
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
          filterEnable: false,
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 10,
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
          filterEnable: false,
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
          filterEnable: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TicketSelected')
            },
          ],
          dataSource: {
            query: eventTickets,
            itemText: 'customField',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
            computed(data) {
              return {
                customField: `${data.Code} ${data.Amount}`,
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
          filterEnable: false,
          dataSource: {
            query: registrationType,
            itemText: 'Name',
            itemValue: 'id',
            filter(data) {
              return {
                EventId: this.$route.params.id,
              }
            },
          },
        },
      },
      template: {
        name: 'eventAttendees-grid',
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
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.params.id,
              Status: 'Success',
            },
            edit: {},
          }
        },
      },
      title: 'eventAttendees',
      type: 'list',
    },
    eventAttendeePerDay: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
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
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: false,
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
        },
        BookingDate: {
          displayOrder: 4,
          caption: 'Common.SessionBooked',
          searchEnable: true,
          sortEnable: false,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
          filterEnable: false,
        },
        Status: {
          displayOrder: 5,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'eventSingleDayAttendees-grid',
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
          exportCsv: {
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
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.params.id,
              Status: 'Success',
            },
            edit: {},
          }
        },
      },
      title: 'eventAttendees',
      type: 'list',
    },
    eventRecurringAttendees: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
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
        BookingDate: {
          displayOrder: 4,
          caption: 'Common.SessionBooked',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
          filterEnable: false,
        },
        'registration.FullName': {
          displayOrder: 5,
          caption: 'Common.RegisteredBy',
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
          displayOrder: 6,
          caption: 'Common.TicketAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CompanyName: {
          displayOrder: 5,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        'attendeeTicket.Code': {
          displayOrder: 7,
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
        SeatNumber: {
          displayOrder: 8,
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
        'regType.Name': {
          displayOrder: 8,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CheckIn: {
          displayOrder: 9,
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
          displayOrder: 10,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Status: {
          displayOrder: 10,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Action: {
          displayOrder: 12,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
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
          filterEnable: false,
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
          filterEnable: false,
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
          filterEnable: false,
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.Address',
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
          filterEnable: false,
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
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
          filterEnable: false,
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
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
          filterEnable: false,
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
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
          filterEnable: false,
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 10,
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
          filterEnable: false,
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
          filterEnable: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TicketSelected')
            },
          ],
          dataSource: {
            query: eventTickets,
            itemText: 'customField',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
            computed(data) {
              return {
                customField: `${data.Code} ${data.Amount}`,
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
          filterEnable: false,
          dataSource: {
            query: registrationType,
            itemText: 'Name',
            itemValue: 'id',
            filter(data) {
              return {
                EventId: this.$route.params.id,
              }
            },
          },
        },
      },
      template: {
        name: 'eventAttendees-grid',
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
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.params.id,
              Status: 'Success',
            },
            edit: {},
          }
        },
      },
      title: 'eventAttendees',
      type: 'list',
    },
    eventRegistrations: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: true,
      },
      itemTitle: 'Drawer.Registrations',
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
          filterEnable: false,
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
        CompanyName: {
          displayOrder: 5,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        TicketId: {
          form: {
            caption: 'Common.TicketsRequired',
            displayOrder: 6,
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
          multiple: true,
          filterEnable: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TicketRequired')
            },
          ],
          dataSource: {
            query: eventTickets,
            itemText: 'customField',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
            computed(data) {
              return {
                customField: `${data.Code} ${data.Amount}`,
              }
            },
          },
        },
        TotalAmount: {
          displayOrder: 6,
          caption: 'Common.Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '110px',
          type: 'number',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        TicketQuantity: {
          displayOrder: 7,
          caption: 'Common.Attendees',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
          type: 'number',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Status: {
          displayOrder: 8,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          form: {
            caption: 'Common.StatusRequired',
            displayOrder: 7,
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'RegistrationStatus',
              }
            },
          },
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.StatusRequired')
            },
          ],
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
          filterEnable: false,
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
          filterEnable: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.AddressRequired',
            displayOrder: 8,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          filterEnable: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.AddressRequired')
            },
          ],
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 9,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          filterEnable: false,
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 10,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          filterEnable: false,
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 12,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          filterEnable: false,
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 11,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          filterEnable: false,
        },
      },
      template: {
        name: 'eventRegistrations-grid',
        context: {
          basePath: '/registration',
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
            where: {
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              EventId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'eventRegistrations',
      type: 'list',
    },
    recurringEventRegistrations: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: true,
      },
      itemTitle: 'Drawer.Registrations',
      hidden: true,
      fields: {
        GoLive: {
          displayOrder: 6,
          caption: ' ',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
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
        CompanyName: {
          displayOrder: 5,
          caption: 'Common.Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Common.Organization',
            displayOrder: 5,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        TicketId: {
          form: {
            caption: 'Common.TicketsRequired',
            displayOrder: 6,
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
          multiple: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TicketRequired')
            },
          ],
          dataSource: {
            query: eventTickets,
            itemText: 'customField',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
            computed(data) {
              return {
                customField: `${data.Code} ${data.Amount}`,
              }
            },
          },
        },
        TotalAmount: {
          displayOrder: 6,
          caption: 'Common.Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        TicketQuantity: {
          displayOrder: 7,
          caption: 'Common.Attendees',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Status: {
          displayOrder: 8,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          form: {
            caption: 'Common.StatusRequired',
            displayOrder: 7,
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'RegistrationStatus',
              }
            },
          },
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.StatusRequired')
            },
          ],
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.AddressRequired',
            displayOrder: 8,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.AddressRequired')
            },
          ],
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 9,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 10,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 12,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 11,
          },
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
      },
      template: {
        name: 'eventRegistrations-grid',
        context: {
          basePath: '/registration',
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
            where: {
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              EventId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'eventRegistrations',
      type: 'list',
    },
    eventInvites: {
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
        'getContact.FullName': {
          displayOrder: 2,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Common.Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'getContact.Email': {
          displayOrder: 4,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Sent: {
          displayOrder: 5,
          caption: 'Common.SentBounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
        },
        Click: {
          displayOrder: 6,
          caption: 'Common.Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
        },
        Open: {
          displayOrder: 7,
          caption: 'Common.Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
        },
        Delivered: {
          displayOrder: 8,
          caption: 'Common.Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 9,
          caption: 'Common.Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 10,
          caption: 'Common.Spam',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
      },
      template: {
        name: 'eventInvites-grid',
        context: {
          basePath: '/event',
        },
        actions: {
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
              EventId: ctx.$route.params.id,
            },
          }
        },
      },
      title: 'eventInvites',
      type: 'list',
    },
    eventTickets: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Ticket',
      hidden: true,
      fields: {
        Code: {
          form: {
            caption: 'Common.Title',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: false,
          newForm: true,
          editForm: true,
          required: true,
          default: 'General admission',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.TitleRequired')
            },
          ],
        },
        Amount: {
          form: {
            caption: 'Price *',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Common.Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'number',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: '0',
          minimumValue: '1',
          readonly(value, data) {
            const type = data.Type
            if (data.Type === 'Free' && this.formData) {
              this.formData.Amount = 0
            }
            return type === 'Free' || type === ''
          },
        },
        Type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Common.TypeCaption',
          label: 'Ticket Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: 'Free',
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'TicketType',
              }
            },
          },
        },
        TicketCount: {
          form: {
            caption: 'Ticket Count *',
            displayOrder: 6,
          },
          displayOrder: 5,
          caption: 'Common.MaxQty',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'number',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        Group: {
          form: {
            caption: 'Common.GroupName',
            displayOrder: 7,
          },
          displayOrder: 5,
          caption: 'Common.GroupName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Attendee: {
          form: {
            caption: 'Common.RegistrationType',
            displayOrder: 8,
          },
          displayOrder: 5,
          caption: 'Common.RegistrationType',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          multiple: true,
          cssClasses: 'col-12 col-md-6',
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
                EventId: this.$route.params.id,
              }
            },
          },
        },
        DisplayOrder: {
          form: {
            caption: 'Common.DisplayOrder',
            displayOrder: 9,
          },
          displayOrder: 6,
          caption: 'Common.DisplayOrd',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        AvailableCount: {
          displayOrder: 6,
          caption: 'Common.AvailableQty',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '155px',
          type: 'number',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        StartDate: {
          form: {
            caption: 'Common.StartD',
            displayOrder: 2,
          },
          displayOrder: 7,
          caption: 'Common.StartDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        EndDate: {
          form: {
            caption: 'Common.EndD',
            displayOrder: 3,
          },
          displayOrder: 8,
          caption: 'Common.EndDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: addMonths(new Date(), 1),
        },
        ValidateQty: {
          form: {
            caption: 'Common.ValidateQuantity',
            displayOrder: 10,
          },
          displayOrder: 8,
          caption: 'Common.ValidateQuantity',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-12 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        CheckGroupDiscount: {
          form: {
            caption: 'Common.CheckGroupDiscount',
            displayOrder: 11,
          },
          displayOrder: 8,
          caption: 'Common.CheckGroupDiscount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-12 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
      },
      template: {
        name: 'eventTickets-grid',
        context: {
          basePath: '/event',
        },
      },
      dataSource: {
        singularEntity: 'Common.Ticket',
        pluralEntity: 'Common.Tickets',
        query: eventTickets,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Ticket',
        filter(ctx) {
          return {
            where: {
              Events: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              Events: ctx.$route.params.id,
              AvailableCount: ctx.formData.TicketCount,
            },
            edit: {},
          }
        },
      },
      title: 'eventTickets',
      type: 'list',
    },
    eventDiscountCodes: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Drawer.DiscountCode',
      hidden: true,
      fields: {
        codeTitle: {
          form: {
            caption: 'Common.CodeRequired',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.CodeRequired')
            },
          ],
        },
        maxUsageCount: {
          form: {
            caption: 'Common.MaxUsageCount',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.MaxUsageCount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: true,
          minimumValue: '1',
        },
        minApplicableOrderAmount: {
          form: {
            caption: 'Common.MinApplicableOrderAmount',
            displayOrder: 3,
          },
          displayOrder: 2,
          caption: 'Common.MinApplicableAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '220px',
          type: 'number',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: true,
          minimumValue: '1',
        },
        offerValue: {
          form: {
            caption: 'Common.OfferValueRequired',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Common.Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: false,
          minimumValue: '1',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.OfferValueRequired')
            },
            function (value, data) {
              return (
                /^[1-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.OfferValueNegative')
              )
            },
          ],
        },
        validTill: {
          form: {
            caption: 'Common.ValidTill',
            displayOrder: 6,
          },
          displayOrder: 4,
          caption: 'Common.ValidTill',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: false,
          default: '',
        },
        isActive: {
          displayOrder: 5,
          caption: 'Common.Active',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          inlineEdit: true,
          newForm: false,
          editForm: false,
          hidden: false,
        },
        isPercent: {
          form: {
            caption: 'Common.IsPercentCaption',
            displayOrder: 6,
          },
          displayOrder: 5,
          caption: 'Common.IsPercentCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: true,
        },
        maxApplicableAmount: {
          form: {
            caption: 'Common.MaxApplicableAmount',
            displayOrder: 7,
          },
          displayOrder: 5,
          caption: 'Common.MaxApplicableAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: true,
          minimumValue: '1',
        },
        description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 8,
          },
          displayOrder: 5,
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'richtext',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
      },
      template: {
        name: 'eventDiscountCode-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Drawer.DiscountCode',
        pluralEntity: 'Common.DiscountCodes',
        query: eventDiscountCodes,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'OfferCode',
        filter(ctx) {
          return {
            where: {
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              EventId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'eventDiscountCodes',
      type: 'list',
    },
    eventRegistrationQuestion: {
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
        Question: {
          displayOrder: 2,
          caption: 'Common.QuestionCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        ControlType: {
          displayOrder: 3,
          caption: 'Common.Control',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Options: {
          displayOrder: 4,
          caption: 'Common.OptionsCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '220px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 5,
          caption: 'Common.DisplayOrd',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'number',
        },
        TicketName: {
          displayOrder: 6,
          caption: 'Common.TicketsNotRequired',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: 'eventRegistrationQuestion-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(`Events/${ctx.$route.params.id}/Survey`, isExporting),
      },
      title: 'eventRegistrationQuestion',
      type: 'list',
    },
    eventSession: {
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
        GoLive: {
          displayOrder: 5,
          caption: ' ',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '120px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        Name: {
          form: {
            caption: 'Common.NameRequired',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Timezone: {
          form: {
            caption: 'Common.TimezoneRequired',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Common.TimezoneCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        StartDate: {
          form: {
            caption: 'Common.StartD',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.StartDateTimeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '220px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Duration: {
          displayOrder: 4,
          caption: 'Common.Duration',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '100px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: '',
        },
        MySpeaker: {
          form: {
            caption: 'Common.Speaker',
            displayOrder: 8,
          },
          displayOrder: 7,
          caption: 'Common.Speaker',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          multiple: true,
          dataSource: {
            type: 'rest',
            itemText: 'FirstName',
            itemValue: 'id',
            getData: (ctx) => {
              const path = `/Events/${ctx.$route.params.id}/EventSpeakers`
              return getLookupData(path)
            },
          },
        },
        Speaker: {
          displayOrder: 7,
          caption: 'Common.Speaker',
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
        SessionTicket: {
          displayOrder: 9,
          caption: 'Common.Ticket',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          multiple: true,
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: eventTickets,
            itemText: 'Code',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
          },
        },
        TicketName: {
          displayOrder: 9,
          caption: 'Common.Ticket',
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
      },
      template: {
        name: 'eventSession-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.SessionCaption',
        pluralEntity: 'Common.Sessions',
        query: eventSession,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Session',
        filter(ctx) {
          return {
            where: {
              EventId: ctx.$route.params.id,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'eventSession',
      type: 'list',
    },
    eventSpeakers: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Speaker',
      hidden: true,
      fields: {
        Title: {
          form: {
            caption: 'Common.TitleCaption',
            displayOrder: 5,
          },
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        FirstName: {
          form: {
            caption: 'Common.FirstName',
            displayOrder: 1,
          },
          displayOrder: 3,
          caption: 'Common.FirstNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
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
          displayOrder: 4,
          caption: 'Common.LastNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        Email: {
          form: {
            caption: 'Common.Email',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
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
        Phone: {
          form: {
            caption: 'Common.PhoneRequired',
            displayOrder: 3,
          },
          displayOrder: 6,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
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
        Linkdin: {
          form: {
            caption: 'Common.LinkedIn',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Common.Linkdin',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Twitter: {
          form: {
            caption: 'Common.Twitter',
            displayOrder: 8,
          },
          displayOrder: 8,
          caption: 'Common.Twitter',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Facebook: {
          form: {
            caption: 'Common.Facebook',
            displayOrder: 6,
          },
          displayOrder: 8,
          caption: 'Common.Facebook',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 9,
          },
          cssClasses: 'col-12 col-md-12',
          displayOrder: 8,
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        MyImage: {
          form: {
            caption: 'Common.Image',
            displayOrder: 10,
          },
          cssClasses: 'col-6 col-md-6',
          displayOrder: 8,
          caption: 'Common.Image',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'file',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: [],
        },
      },
      template: {
        name: 'eventSpeakers-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Speaker',
        pluralEntity: 'Common.Speakers',
        model: 'Speaker',
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(`Events/${ctx.$route.params.id}/EventSpeakers`, isExporting),
        mutation(ctx) {
          return {
            new: {
              EventId: ctx.$route.params.id,
            },
            edit: {},
          }
        },
      },
      title: 'eventSpeakers',
      type: 'list',
    },
    eventTasks: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Task',
      hidden: true,
      fields: {
        Title: {
          form: {
            caption: 'Common.Title',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Category: {
          form: {
            caption: 'Common.CategoryRequired',
            displayOrder: 2,
          },
          displayOrder: 5,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'Event_TaskCategory',
              }
            },
          },
        },
        Status: {
          form: {
            caption: 'Common.StatusRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          readonly(value, data) {
            const category = data.Category
            return (
              category === 'Registration Email' ||
              category === 'Calendar Invite'
            )
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'Event_TaskStatus',
              }
            },
          },
        },
        Action: {
          form: {
            caption: 'Action *',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Common.WaitFor',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          readonly(value, data) {
            const category = data.Category
            return (
              category === 'Registration Email' ||
              category === 'Calendar Invite'
            )
          },
          visible(value, data) {
            const category = data.Category
            const status = data.Status
            if (
              category === 'Registration Email' ||
              category === 'Calendar Invite'
            ) {
              data.Status = 'Wait for an Action'
              data.Action = 'New Registration'
              return (
                category === 'Registration Email' ||
                category === 'Calendar Invite'
              )
            } else {
              return (
                (category === 'Survey Invite' || category === 'Email') &&
                status === 'Wait for an Action'
              )
            }
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'Event_TaskAction',
              }
            },
          },
        },
        SurveyId: {
          form: {
            caption: 'Survey List *',
            displayOrder: 7,
          },
          cssClasses: 'col-12 col-md-12',
          caption: 'Common.SurveyList',
          searchEnable: true,
          sortEnable: true,
          type: 'string',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            if (category === 'Survey Invite') {
              return category === 'Survey Invite'
            }
          },
        },
        TemplateId: {
          form: {
            caption: 'Common.Template',
            displayOrder: 8,
          },
          cssClasses: 'col-12 col-md-12',
          caption: 'Common.Template',
          searchEnable: true,
          sortEnable: true,
          type: 'lookup',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            return category === 'Email'
          },
          dataSource: {
            query: marketingTemplates,
            itemText: 'Name',
            itemValue: 'id',
            filter() {
              return {
                createdBy: this.$auth.$state.user.data.email,
              }
            },
          },
        },
        DueDate: {
          form: {
            caption: 'DueDate *',
            displayOrder: 4,
          },
          displayOrder: 7,
          caption: 'Common.DueDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            const status = data.Status
            return (
              (category === 'Survey Invite' || category === 'Email') &&
              status === 'Schedule'
            )
          },
        },
        Timezone: {
          form: {
            caption: 'Common.TimezoneRequired',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Common.Timezone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            const status = data.Status
            return (
              (category === 'Survey Invite' || category === 'Email') &&
              (status === 'Schedule' || status === 'Wait for an Action')
            )
          },
        },
        Day: {
          form: {
            caption: 'Common.Day',
            displayOrder: 4,
          },
          displayOrder: 6,
          caption: 'Common.Day',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            const status = data.Status
            return (
              (category === 'Survey Invite' || category === 'Email') &&
              status === 'Wait for an Action'
            )
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'Event_AvailableDay',
              }
            },
          },
        },
        Time: {
          form: {
            caption: 'Common.Time',
            displayOrder: 5,
          },
          displayOrder: 6,
          caption: 'Common.Time',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          visible(value, data) {
            const category = data.Category
            const status = data.Status
            return (
              (category === 'Survey Invite' || category === 'Email') &&
              status === 'Wait for an Action'
            )
          },
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'AvailableHour',
              }
            },
          },
        },
        Type: {
          displayOrder: 6,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 9,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        TemplateName: {
          displayOrder: 10,
          caption: 'Common.TemplateNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        templateAction: {
          displayOrder: 11,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'eventTask-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          edit: {
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
              and: [{ EventId: ctx.$route.params.id }, { Type: 'Scheduled' }],
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              EventId: ctx.$route.params.id,
              Type: 'Scheduled',
            },
            edit: {},
          }
        },
      },
      title: 'eventTasks',
      type: 'list',
    },
    eventRegistrationForm: {
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
        Label: {
          displayOrder: 2,
          caption: 'Common.Label',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        ControlType: {
          displayOrder: 3,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 4,
          caption: 'Common.DisplayOrd',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '155px',
          type: 'number',
        },
        isShowField: {
          displayOrder: 5,
          caption: 'Common.Buyer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        isAttendeeField: {
          displayOrder: 6,
          caption: 'Common.Attendee',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        isRequired: {
          displayOrder: 7,
          caption: 'Common.Required',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
      },
      template: {
        name: 'eventRegistrationForm-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          new: {
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
        singularEntity: 'Common.RegistrationForm',
        pluralEntity: 'Common.RegistrationForms',
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(
            `Events/${ctx.$route.params.id}/RegistrationForm`,
            isExporting
          ),
      },
      title: 'eventRegistrationForm',
      type: 'list',
    },
    eventRecurringSession: {
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
      itemTitle: 'Common.RecurringSession',
      fields: {
        Name: {
          form: {
            caption: 'Common.NameRequired',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
        },
        ScheduledType: {
          form: {
            caption: 'Event Scheduled',
            displayOrder: 18,
          },
          displayOrder: 2,
          caption: 'Common.ScheduledType',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'lookup',
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'ScheduledType',
              }
            },
          },
        },
        StartTime: {
          form: {
            caption: 'Start Time *',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Common.StartTime',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'AvailableHour',
              }
            },
          },
        },
        EndTime: {
          form: {
            caption: 'End Time *',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Common.EndTime',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'AvailableHour',
              }
            },
          },
        },
        Timezone: {
          form: {
            caption: 'Common.TimezoneRequired',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Common.Timezone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Duration: {
          form: {
            caption: 'Duration *',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Common.Duration',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'EventDuration',
              }
            },
          },
        },
        Type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 2,
          },
          displayOrder: 4,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'SessionType',
              }
            },
          },
        },
        MaxAllow: {
          form: {
            caption: 'Max Allow *',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Common.MaxAllowCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'number',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          minimumValue: '0',
          visible(value, data) {
            const type = data.Type
            return type === 'Group'
          },
        },
        SeatReservation: {
          form: {
            caption: 'Common.SeatReservation',
            displayOrder: 9,
          },
          displayOrder: 6,
          caption: 'Common.SeatReservation',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'In-person meeting'
          },
        },
        TicketName: {
          displayOrder: 7,
          caption: 'Common.Tickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        isActive: {
          displayOrder: 8,
          caption: 'Common.Active',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        LocationType: {
          form: {
            caption: 'Location Type *',
            displayOrder: 8,
          },
          displayOrder: 4,
          caption: 'Common.LocationType',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          dataSource: {
            query: registrationStatusOptions,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'LocationType',
              }
            },
          },
        },
        LocationId: {
          form: {
            caption: 'Location *',
            displayOrder: 10,
          },
          displayOrder: 4,
          caption: 'Common.LocationType',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          multiple: true,
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'In-person meeting'
          },
          dataSource: {
            query: location,
            itemText: 'Name',
            itemValue: 'id',
          },
        },
        Phone: {
          form: {
            caption: 'Common.PhoneRequired',
            displayOrder: 11,
          },
          displayOrder: 4,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Phone call'
          },
        },
        WebinarLink: {
          form: {
            caption: 'online meeting link *',
            displayOrder: 12,
          },
          displayOrder: 4,
          caption: 'Common.OnlineMeetingLinkCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Online meeting'
          },
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.AddressRequired',
            displayOrder: 13,
          },
          displayOrder: 4,
          caption: 'Common.Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 14,
          },
          displayOrder: 4,
          caption: 'Common.City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-3 col-md-3',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        '_CurrentAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 15,
          },
          displayOrder: 4,
          caption: 'Common.State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-3 col-md-3',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 17,
          },
          displayOrder: 4,
          caption: 'Common.Zip',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-3 col-md-3',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 16,
          },
          displayOrder: 4,
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-3 col-md-3',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        RollingDays: {
          form: {
            caption: 'Common.RollingDays',
            displayOrder: 19,
          },
          displayOrder: 4,
          caption: 'Common.RollingDays',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'number',
          minimumValue: '0',
          default: 30,
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const ScheduledType = data.ScheduledType
            return ScheduledType === 'Over a period of rolling days'
          },
        },
        StartDate: {
          form: {
            caption: 'Common.StartDate',
            displayOrder: 20,
          },
          displayOrder: 4,
          caption: 'Common.StartDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'date',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const ScheduledType = data.ScheduledType
            return ScheduledType === 'Over a date range'
          },
        },
        EndDate: {
          form: {
            caption: 'Common.EndDate',
            displayOrder: 21,
          },
          displayOrder: 4,
          caption: 'Common.EndDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'date',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          visible(value, data) {
            const ScheduledType = data.ScheduledType
            return ScheduledType === 'Over a date range'
          },
        },
        SessionTicket: {
          form: {
            caption: 'Common.SelectTickets',
            displayOrder: 22,
          },
          displayOrder: 4,
          caption: 'Common.SelectTickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          multiple: true,
          dataSource: {
            query: eventTickets,
            itemText: 'Code',
            itemValue: 'id',
            filter(data) {
              return {
                Events: this.$route.params.id,
              }
            },
          },
        },
      },
      template: {
        name: 'eventRecurringSession-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.RecurringSession',
        pluralEntity: 'Common.RecurringSessions',
        query: eventRecurringSession,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Session',
        filter(ctx) {
          return {
            where: {
              EventId: ctx.$route.params.id,
            },
          }
        },
      },
      title: 'Recurring Session',
      type: 'list',
    },
    inviteeEventTasks: {
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
          basePath: '/event',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
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
    eventInvitaionHistory: {
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
          displayOrder: 1,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        Title: {
          displayOrder: 2,
          caption: 'Common.Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SenderName: {
          displayOrder: 3,
          caption: 'Common.Sender',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 4,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 5,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
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
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {
              and: [
                { EventId: ctx.$route.query.event },
                { Type: 'Mass Email' },
              ],
            },
          }
        },
      },
      title: 'Invites',
      type: 'list',
    },
    integrations: {
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
        'MetaData.Category': {
          displayOrder: 2,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'string',
        },
        ServiceId: {
          displayOrder: 3,
          caption: 'Common.AppName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '80px',
          type: 'string',
        },
        Integrate: {
          displayOrder: 5,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        Status: {
          displayOrder: 4,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: 'eventIntegration-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          new: {
            hidden: true,
          },
          exportCsv: {
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
          getCustomData(
            `OrganizationInfos/getMyConnections?filter={"where":{"MetaData.eventId": {"like": "${ctx.$route.query.event}", "options": "i"}}}`
          ),
      },
      title: 'Integrations',
      type: 'list',
    },
    eventInvitesDetails: {
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
        'getContact.FullName': {
          displayOrder: 2,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Common.Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'getContact.Email': {
          displayOrder: 4,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Sent: {
          displayOrder: 5,
          caption: 'Common.SentBounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Click: {
          displayOrder: 6,
          caption: 'Common.Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Open: {
          displayOrder: 7,
          caption: 'Common.Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Delivered: {
          displayOrder: 8,
          caption: 'Common.Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 9,
          caption: 'Common.Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 10,
          caption: 'Common.Spam',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
      },
      template: {
        name: 'eventInvitesDetails-grid',
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
        query: eventInvites,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'EmailAnalytic',
        filter(ctx) {
          return {
            where: {
              CRMActivityId: this.$route.params.id,
            },
          }
        },
      },
      title: 'eventInvites',
      type: 'list',
    },
  },
}

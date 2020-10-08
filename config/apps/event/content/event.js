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
import { getData, getLookupData } from '../rest'
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
    'All Events': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      itemTitle: 'Event',
      default: false,
      fields: {
        Title: {
          form: {
            caption: 'Title *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Title',
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
            (v) => {
              return !!v || 'Title is required'
            },
          ],
        },
        Description: {
          form: {
            caption: 'Description',
            displayOrder: 2,
          },
          caption: 'Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'richtext',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        StartDate: {
          form: {
            caption: 'Start Date *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Start Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Start Date is required'
            },
          ],
        },
        EndDate: {
          form: {
            caption: 'End Date *',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'End Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'End Date is required'
            },
          ],
        },
        Timezone: {
          form: {
            caption: 'Timezone *',
            displayOrder: 11,
          },
          displayOrder: 3,
          caption: 'Timezone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          inlineEdit: true,
          newForm: false,
          editForm: true,
          cssClasses: 'col-4 col-md-4',
          rules: [
            (v) => {
              return !!v || 'Timezone is required'
            },
          ],
        },
        Organizer: {
          form: {
            caption: 'Event Organizer *',
            displayOrder: 5,
          },
          caption: 'Event Organizer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Organizer is required'
            },
          ],
        },
        EventManager: {
          form: {
            caption: 'Event Manager/Team Email *',
            displayOrder: 6,
          },
          caption: 'Event Organizer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
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
        Status: {
          form: {
            caption: 'Status *',
            displayOrder: 7,
          },
          displayOrder: 3,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Status is required'
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
            caption: 'Privacy',
            displayOrder: 8,
          },
          displayOrder: 4,
          caption: 'Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-4 col-md-4',
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
            caption: 'Tags',
            displayOrder: 9,
          },
          displayOrder: 5,
          caption: 'Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          multiple: true,
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
            caption: 'Venue Name',
            displayOrder: 13,
          },
          displayOrder: 6,
          caption: 'Venue',
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
            caption: 'Venue *',
            displayOrder: 12,
          },
          displayOrder: 7,
          caption: 'Address',
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
            caption: 'City',
            displayOrder: 14,
          },
          displayOrder: 8,
          caption: 'City',
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
            caption: 'State',
            displayOrder: 15,
          },
          displayOrder: 9,
          caption: 'State',
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
            caption: 'Zip',
            displayOrder: 17,
          },
          displayOrder: 10,
          caption: 'Postal Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
        },
        '_VenueAddress.Country': {
          form: {
            caption: 'Country',
            displayOrder: 16,
          },
          displayOrder: 11,
          caption: 'Country',
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
            caption: 'Cancellation Policy',
            displayOrder: 18,
          },
          displayOrder: 11,
          caption: 'Cancellation Policy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        Message: {
          form: {
            caption: 'Message',
            displayOrder: 19,
          },
          displayOrder: 11,
          caption: 'Message',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        SeatReservation: {
          form: {
            caption: 'Seat Reservation',
            displayOrder: 20,
          },
          displayOrder: 11,
          caption: 'Seat Reservation',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        ShowAttendeeForm: {
          form: {
            caption: 'Show attendee form for each ticket',
            displayOrder: 21,
          },
          displayOrder: 11,
          caption: 'Show attendee form for each ticket',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        IsOnlineEvent: {
          form: {
            caption: 'Online Event',
            displayOrder: 22,
          },
          displayOrder: 11,
          caption: 'Online Event',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        SessionTimingConflict: {
          form: {
            caption: 'Session Timing Conflict',
            displayOrder: 23,
          },
          displayOrder: 11,
          caption: 'Session Timing Conflict',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        ShowRemainingTickets: {
          form: {
            caption: 'Show Remaining Tickets',
            displayOrder: 24,
          },
          displayOrder: 11,
          caption: 'Show Remaining Tickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-4 col-md-4',
          inlineEdit: true,
          newForm: false,
          editForm: true,
          hidden: true,
        },
        Images: {
          form: {
            caption: 'Event Image(680x350)',
            displayOrder: 25,
          },
          cssClasses: 'col-6 col-md-6',
          displayOrder: 8,
          caption: 'Event Image(680x350)',
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
            caption: 'Currency *',
            displayOrder: 10,
          },
          displayOrder: 12,
          caption: 'Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: false,
          cssClasses: 'col-4 col-md-4',
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
          caption: 'Created Date',
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
        query: eventList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Event',
      },
      title: 'All Events',
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
          caption: 'Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 3,
          caption: 'Start Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        EndDate: {
          displayOrder: 3,
          caption: 'End Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        Privacy: {
          displayOrder: 4,
          caption: 'Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Tags: {
          displayOrder: 5,
          caption: 'Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        VenueName: {
          displayOrder: 6,
          caption: 'Venue Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.AddressLine': {
          displayOrder: 7,
          caption: 'Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.City': {
          displayOrder: 8,
          caption: 'City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.State': {
          displayOrder: 9,
          caption: 'State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.PostalCode': {
          displayOrder: 10,
          caption: 'Postal Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.Country': {
          displayOrder: 11,
          caption: 'Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Currency: {
          displayOrder: 12,
          caption: 'Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 13,
          caption: 'Created Date',
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
      title: 'Past',
      type: 'list',
    },
    'live and draft event': {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: true,
      fields: {
        Title: {
          displayOrder: 2,
          caption: 'Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        StartDate: {
          displayOrder: 3,
          caption: 'Start Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        EndDate: {
          displayOrder: 3,
          caption: 'End Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        Privacy: {
          displayOrder: 4,
          caption: 'Privacy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Tags: {
          displayOrder: 5,
          caption: 'Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        VenueName: {
          displayOrder: 6,
          caption: 'Venue',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.AddressLine': {
          displayOrder: 7,
          caption: 'Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.City': {
          displayOrder: 8,
          caption: 'City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.State': {
          displayOrder: 9,
          caption: 'State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.PostalCode': {
          displayOrder: 10,
          caption: 'Postal Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        '_VenueAddress.Country': {
          displayOrder: 11,
          caption: 'Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Currency: {
          displayOrder: 12,
          caption: 'Currency',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 13,
          caption: 'Created Date',
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
      },
      dataSource: {
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
      title: 'Live and Draft Events',
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
        'registration.FullName': {
          displayOrder: 3,
          caption: 'Register By',
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
          displayOrder: 4,
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
        CompanyName: {
          displayOrder: 5,
          caption: 'Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Organization',
            displayOrder: 5,
          },
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        'attendeeTicket.Code': {
          displayOrder: 6,
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
        SeatNumber: {
          displayOrder: 7,
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
        'regType.Name': {
          displayOrder: 8,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        CheckIn: {
          displayOrder: 9,
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
          displayOrder: 10,
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
        Status: {
          displayOrder: 11,
          caption: 'Status',
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
          caption: 'Action',
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address',
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
        '_CurrentAddress.City': {
          form: {
            caption: 'City',
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
        '_CurrentAddress.State': {
          form: {
            caption: 'State',
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
        '_CurrentAddress.PostalCode': {
          form: {
            caption: 'Zip',
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
        '_CurrentAddress.Country': {
          form: {
            caption: 'Country',
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
          rules: [
            (v) => {
              return !!v || 'Ticket should be selected'
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
      itemTitle: 'Registration',
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
        CompanyName: {
          displayOrder: 5,
          caption: 'Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Organization',
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
            caption: 'Tickets *',
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
            (v) => {
              return !!v || 'Ticket is required'
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
          caption: 'Amount',
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
          caption: 'Attendees',
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
          caption: 'Status',
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
            caption: 'Status *',
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
            (v) => {
              return !!v || 'Status is required'
            },
          ],
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
        GoLive: {
          displayOrder: 10,
          caption: ' ',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
          hidden: true,
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address *',
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
            (v) => {
              return !!v || 'Address is required'
            },
          ],
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'City',
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
            caption: 'State',
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
            caption: 'Zip',
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
            caption: 'Country',
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
      itemTitle: 'Registration',
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
        CompanyName: {
          displayOrder: 5,
          caption: 'Organization',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          form: {
            caption: 'Organization',
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
            caption: 'Tickets *',
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
            (v) => {
              return !!v || 'Ticket is required'
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
          caption: 'Amount',
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
          caption: 'Attendees',
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
          caption: 'Status',
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
            caption: 'Status *',
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
            (v) => {
              return !!v || 'Status is required'
            },
          ],
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
        GoLive: {
          displayOrder: 10,
          caption: ' ',
          searchEnable: false,
          sortEnable: false,
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
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address *',
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
            (v) => {
              return !!v || 'Address is required'
            },
          ],
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'City',
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
            caption: 'State',
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
            caption: 'Zip',
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
            caption: 'Country',
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
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'getContact.Email': {
          displayOrder: 4,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Sent: {
          displayOrder: 5,
          caption: 'Sent/Bounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Click: {
          displayOrder: 6,
          caption: 'Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Open: {
          displayOrder: 7,
          caption: 'Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Delivered: {
          displayOrder: 8,
          caption: 'Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 9,
          caption: 'Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 10,
          caption: 'Spam',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Date',
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
      itemTitle: 'Ticket',
      hidden: true,
      fields: {
        Code: {
          form: {
            caption: 'Title *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Title',
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
            (v) => {
              return !!v || 'Title is required'
            },
          ],
        },
        Amount: {
          form: {
            caption: 'Price *',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
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
          rules: [
            (v) => {
              return !!v || 'Price is required'
            },
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) || 'Price should not be negative'
              )
            },
          ],
        },
        Type: {
          form: {
            caption: 'Type *',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Type',
          label: 'Ticket Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
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
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
        },
        TicketCount: {
          form: {
            caption: 'Ticket Count *',
            displayOrder: 6,
          },
          displayOrder: 5,
          caption: 'Max Qty',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
          rules: [
            (v) => {
              return !!v || 'Total Count is required'
            },
          ],
        },
        Group: {
          form: {
            caption: 'Group Name',
            displayOrder: 7,
          },
          displayOrder: 5,
          caption: 'Group Name',
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
        Attendee: {
          form: {
            caption: 'Registration Type',
            displayOrder: 8,
          },
          displayOrder: 5,
          caption: 'Registration Type',
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
            caption: 'Display Order *',
            displayOrder: 9,
          },
          displayOrder: 6,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
          rules: [
            (v) => {
              return !!v || 'Display Order is required'
            },
            function (value, data) {
              return (
                /^[1-9]\d*$|^$/.test(value) ||
                'Display Order should not be negative'
              )
            },
          ],
        },
        AvailableCount: {
          displayOrder: 6,
          caption: 'Available Qty',
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
        StartDate: {
          form: {
            caption: 'Start Date *',
            displayOrder: 2,
          },
          displayOrder: 7,
          caption: 'Start Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Start is required'
            },
            (v, data) => {
              return (
                (!!v && data.EndDate > new Date(v)) ||
                'Start Date should be less than End Date'
              )
            },
          ],
        },
        EndDate: {
          form: {
            caption: 'End Date *',
            displayOrder: 3,
          },
          displayOrder: 8,
          caption: 'End Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: addMonths(new Date(), 1),
          rules: [
            function (v) {
              const eventEndDate = this.context.event.EndDate
              const isValidEndDate =
                eventEndDate > (v && new Date(v).toISOString())
              return (
                !!isValidEndDate ||
                'Ticket end date should be less than event end date.'
              )
            },
          ],
        },
        ValidateQty: {
          form: {
            caption: 'Validate Quantity',
            displayOrder: 10,
          },
          displayOrder: 8,
          caption: 'Validate Quantity',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        CheckGroupDiscount: {
          form: {
            caption: 'Check Group Discount',
            displayOrder: 11,
          },
          displayOrder: 8,
          caption: 'Check Group Discount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
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
      itemTitle: 'Discount Code',
      hidden: true,
      fields: {
        codeTitle: {
          form: {
            caption: 'Code *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Code is required'
            },
          ],
        },
        maxUsageCount: {
          form: {
            caption: 'Max Usage Count',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Max Usage Count',
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
            caption: 'Min Applicable Order Amount',
            displayOrder: 3,
          },
          displayOrder: 2,
          caption: 'Min Applicable Amount',
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
            caption: 'Offer Value',
            displayOrder: 4,
          },
          displayOrder: 3,
          caption: 'Amount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: false,
          minimumValue: '1',
          rules: [
            (v) => {
              return !!v || 'Offer Value is required'
            },
            function (value, data) {
              return (
                /^[1-9]\d*$|^$/.test(value) ||
                'Offer Value should not be negative'
              )
            },
          ],
        },
        validTill: {
          form: {
            caption: 'Valid Till',
            displayOrder: 6,
          },
          displayOrder: 4,
          caption: 'Valid Till',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: false,
        },
        isActive: {
          displayOrder: 5,
          caption: 'Active',
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
            caption: 'Is Percent',
            displayOrder: 6,
          },
          displayOrder: 5,
          caption: 'Is Percent',
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
            caption: 'Max Applicable Amount',
            displayOrder: 7,
          },
          displayOrder: 5,
          caption: 'Max Applicable Amount',
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
            caption: 'Description',
            displayOrder: 8,
          },
          displayOrder: 5,
          caption: 'Description',
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
      },
      dataSource: {
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
          caption: 'Question',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        ControlType: {
          displayOrder: 3,
          caption: 'Control',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Options: {
          displayOrder: 4,
          caption: 'Options',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 5,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        TicketName: {
          displayOrder: 6,
          caption: 'Tickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'eventRegistrationQuestion-grid',
        context: {
          basePath: '/event',
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) => getData(`Events/${ctx.$route.params.id}/Survey`),
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
      itemTitle: 'Session',
      hidden: true,
      fields: {
        Name: {
          form: {
            caption: 'Name *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Name is required'
            },
          ],
        },
        Description: {
          form: {
            caption: 'Description',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Description',
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
            caption: 'Timezone *',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Timezone',
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
            caption: 'Start Date *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Start Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '220px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Start is required'
            },
            (v, data) => {
              return (
                (!!v && data.EndDate > new Date(v)) ||
                'Start Date should be less than End Date'
              )
            },
          ],
        },
        EndDate: {
          form: {
            caption: 'End Date *',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'End Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '220px',
          type: 'datetime',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: '',
          rules: [
            function (v) {
              const eventEndDate = this.context.event.EndDate
              const isValidEndDate =
                eventEndDate > (v && new Date(v).toISOString())
              return (
                !!isValidEndDate ||
                'Session End date should be in between event date.'
              )
            },
          ],
        },
        Type: {
          form: {
            caption: 'Type *',
            displayOrder: 7,
          },
          displayOrder: 6,
          caption: 'Type',
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
                type: 'SessionType',
              }
            },
          },
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
        },
        MySpeaker: {
          form: {
            caption: 'Speaker',
            displayOrder: 8,
          },
          displayOrder: 7,
          caption: 'Speaker',
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
              const path = `Events/${ctx.$route.params.id}/EventSpeakers`
              return getLookupData(path)
            },
          },
        },
        Speaker: {
          displayOrder: 7,
          caption: 'Speaker',
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
        Location: {
          form: {
            caption: 'Location',
            displayOrder: 6,
          },
          displayOrder: 8,
          caption: 'Location',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        SessionTicket: {
          displayOrder: 9,
          caption: 'Ticket',
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
          rules: [
            (v) => {
              return !!v || 'Tickets is required'
            },
          ],
        },
        TicketName: {
          displayOrder: 9,
          caption: 'Ticket',
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
        GoLive: {
          displayOrder: 10,
          caption: ' ',
          searchEnable: false,
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
        name: 'eventSession-grid',
        context: {
          basePath: '/event',
        },
      },
      dataSource: {
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
      itemTitle: 'Speaker',
      hidden: true,
      fields: {
        Title: {
          form: {
            caption: 'Title',
            displayOrder: 5,
          },
          displayOrder: 2,
          caption: 'Title',
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
            caption: 'First Name *',
            displayOrder: 1,
          },
          displayOrder: 3,
          caption: 'First Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
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
          displayOrder: 4,
          caption: 'Last Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        Email: {
          form: {
            caption: 'Email *',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
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
        Phone: {
          form: {
            caption: 'Phone *',
            displayOrder: 3,
          },
          displayOrder: 6,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Phone is required'
            },
          ],
        },
        Linkdin: {
          form: {
            caption: 'LinkedIn',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Linkdin',
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
            caption: 'Twitter',
            displayOrder: 8,
          },
          displayOrder: 8,
          caption: 'Twitter',
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
            caption: 'Facebook',
            displayOrder: 6,
          },
          displayOrder: 8,
          caption: 'Facebook',
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
            caption: 'Description',
            displayOrder: 9,
          },
          cssClasses: 'col-12 col-md-12',
          displayOrder: 8,
          caption: 'Description',
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
            caption: 'Image',
            displayOrder: 10,
          },
          cssClasses: 'col-6 col-md-6',
          displayOrder: 8,
          caption: 'Image',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'file',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
      },
      template: {
        name: 'eventSpeakers-grid',
        context: {
          basePath: '/event',
        },
      },
      dataSource: {
        model: 'Speaker',
        type: 'rest',
        getData: (ctx) =>
          getData(`Events/${ctx.$route.params.id}/EventSpeakers`),
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
      itemTitle: 'Task',
      hidden: true,
      fields: {
        Title: {
          form: {
            caption: 'Enter Title *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Title is required'
            },
          ],
        },
        Category: {
          form: {
            caption: 'Category *',
            displayOrder: 2,
          },
          displayOrder: 5,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Category is required'
            },
          ],
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
            caption: 'Status *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Status',
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
          rules: [
            (v) => {
              return !!v || 'Status is required'
            },
          ],
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
          caption: 'Wait For',
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
          rules: [
            (v) => {
              return !!v || 'Action is required'
            },
          ],
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
          caption: 'Survey List',
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
            caption: 'Template',
            displayOrder: 8,
          },
          cssClasses: 'col-12 col-md-12',
          caption: 'Template',
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
          caption: 'Due Date',
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
            caption: 'Timezone *',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Timezone',
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
            caption: 'Day',
            displayOrder: 4,
          },
          displayOrder: 6,
          caption: 'Day',
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
            caption: 'Time',
            displayOrder: 5,
          },
          displayOrder: 6,
          caption: 'Time',
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
          caption: 'Type',
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
        createDate: {
          displayOrder: 8,
          caption: 'Create Date',
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
        createBy: {
          displayOrder: 9,
          caption: 'Create By',
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
          caption: 'Template Name',
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
        action: {
          displayOrder: 11,
          caption: 'Action',
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
      },
      dataSource: {
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
          caption: 'Label',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        ControlType: {
          displayOrder: 3,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 4,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isShowField: {
          displayOrder: 5,
          caption: 'Buyer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isAttendeeField: {
          displayOrder: 6,
          caption: 'Attendee',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRequired: {
          displayOrder: 7,
          caption: 'Required',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
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
          getData(`Events/${ctx.$route.params.id}/RegistrationForm`),
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
      fields: {
        Name: {
          form: {
            caption: 'Name *',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Name is required'
            },
          ],
        },
        ScheduledType: {
          form: {
            caption: 'Event Scheduled',
            displayOrder: 18,
          },
          displayOrder: 2,
          caption: 'ScheduledType',
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
          caption: 'Start Time',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Start Time is required'
            },
          ],
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
          caption: 'End Time',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'End Time is required'
            },
            function (value, data) {
              return (
                data.EndTime > data.StartTime ||
                'End Time should be greater than Start Time'
              )
            },
          ],
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
            caption: 'Timezone *',
            displayOrder: 6,
          },
          displayOrder: 7,
          caption: 'Timezone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'timezone',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Timezone is required'
            },
          ],
        },
        Duration: {
          form: {
            caption: 'Duration *',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Duration',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Duration is required'
            },
          ],
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
            caption: 'Type *',
            displayOrder: 2,
          },
          displayOrder: 4,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Type is required'
            },
          ],
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
          caption: 'MaxAllow',
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
          rules: [
            (v) => {
              return !!v || 'Max Allow is required'
            },
          ],
        },
        SeatReservation: {
          form: {
            caption: 'Seat Reservation',
            displayOrder: 9,
          },
          displayOrder: 6,
          caption: 'Seat Reservation',
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
          caption: 'Tickets',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        isActive: {
          displayOrder: 8,
          caption: 'Active',
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
          caption: 'Location Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Location Type is required'
            },
          ],
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
          caption: 'Location Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'lookup',
          multiple: true,
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Location is required'
            },
          ],
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
            caption: 'Phone *',
            displayOrder: 11,
          },
          displayOrder: 4,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
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
          caption: 'online meeting link',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'online meeting link is required'
            },
          ],
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Online meeting'
          },
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address *',
            displayOrder: 13,
          },
          displayOrder: 4,
          caption: 'Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Address is required'
            },
          ],
          visible(value, data) {
            const LocationType = data.LocationType
            return LocationType === 'Custom'
          },
        },
        '_CurrentAddress.City': {
          form: {
            caption: 'City',
            displayOrder: 14,
          },
          displayOrder: 4,
          caption: 'City',
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
            caption: 'State',
            displayOrder: 15,
          },
          displayOrder: 4,
          caption: 'State',
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
            caption: 'Zip ',
            displayOrder: 17,
          },
          displayOrder: 4,
          caption: 'Zip',
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
            caption: 'Country',
            displayOrder: 16,
          },
          displayOrder: 4,
          caption: 'Country',
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
            caption: 'Rolling Days',
            displayOrder: 19,
          },
          displayOrder: 4,
          caption: 'Rolling Days',
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
            caption: 'Start Date',
            displayOrder: 20,
          },
          displayOrder: 4,
          caption: 'Start Date',
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
            caption: 'End Date',
            displayOrder: 21,
          },
          displayOrder: 4,
          caption: 'End Date',
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
            caption: 'Select tickets for this session',
            displayOrder: 22,
          },
          displayOrder: 4,
          caption: 'Select tickets for this session',
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
      },
      dataSource: {
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
        showSelect: true,
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
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 3,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DueDate: {
          displayOrder: 7,
          caption: 'Due Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Created Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 9,
          caption: 'Created By',
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
      },
      dataSource: {
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
    eventRegistrationType: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Registation Type',
      hidden: true,
      fields: {
        Name: {
          form: {
            caption: 'Name',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Name is required'
            },
          ],
        },
        MaxQuantityAllowed: {
          form: {
            caption: 'Max Quantity Allowed',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Max Quantity Allowed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
          default: 10,
        },
        DisplayOrder: {
          form: {
            caption: 'Display Order',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        ColorCode: {
          form: {
            caption: 'Color Code',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Color Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        AllowMultiple: {
          form: {
            caption: 'Allow Multiple',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Allow Multiple',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          newForm: true,
          editForm: true,
        },
        isDefault: {
          displayOrder: 6,
          caption: 'Default',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'eventRegistrationType-grid',
        context: {
          basePath: '/event',
        },
      },
      dataSource: {
        query: registrationType,
        type: 'graphql',
        model: 'RegistrationType',
        filter(ctx) {
          return {
            where: {
              EventId: ctx.$route.query.event,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.query.event,
            },
            edit: {},
          }
        },
      },
      title: 'Registration Type',
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
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        Title: {
          displayOrder: 2,
          caption: 'Subject',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SenderName: {
          displayOrder: 3,
          caption: 'Sender',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Status: {
          displayOrder: 4,
          caption: 'Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdBy: {
          displayOrder: 5,
          caption: 'Created By',
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
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRegistered: {
          displayOrder: 3,
          caption: 'Registered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'getContact.Email': {
          displayOrder: 4,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Sent: {
          displayOrder: 5,
          caption: 'Sent/Bounce',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Click: {
          displayOrder: 6,
          caption: 'Click',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Open: {
          displayOrder: 7,
          caption: 'Open',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Delivered: {
          displayOrder: 8,
          caption: 'Delivered',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Unsubscribed: {
          displayOrder: 9,
          caption: 'Unsubscribed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        SpamReport: {
          displayOrder: 10,
          caption: 'Spam',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 11,
          caption: 'Date',
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

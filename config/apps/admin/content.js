import eventList from './gql/eventlist.gql'
import registrationForm from './gql/registrationForm.gql'
// import { getBPMNData } from './rest/bpmn.js'

export default {
  Event: {
    views: {
      'All Events': {
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
          Timezone: {
            displayOrder: 3,
            caption: 'Timezone',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'timezone',
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
          name: 'event-grid',
          context: {
            basePath: '/event',
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
    },
  },

  registrationformdetails: {
    views: {
      'registration form': {
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
          Label: {
            displayOrder: 1,
            caption: 'Label',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          ControlType: {
            displayOrder: 2,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          DisplayOrder: {
            displayOrder: 3,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'number',
          },
          isShowField: {
            displayOrder: 4,
            caption: 'Buyer',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'number',
          },
          isAttendeeField: {
            displayOrder: 5,
            caption: 'Attendee',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          isRequired: {
            displayOrder: 6,
            caption: 'Required',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          name: 'registrationform-grid',
          context: {
            basePath: '/registrationform',
          },
        },
        dataSource: {
          query: registrationForm,
          defaultSort: 'createdDate DESC',
          type: 'graphql',
          model: 'RegistrationForm',
          filter: {
            limit: '10',
            order: 'createdDate DESC',
            skip: '0',
            where: {},
          },
        },
        title: 'Registration Form',
        type: 'list',
      },
    },
  },
}

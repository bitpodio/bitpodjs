import seatmapsList from '../gql/seatmapsList.gql'
import businessUnit from '~/config/apps/admin/gql/businessUnit.gql'
import eventList from '~/config/apps/event/gql/eventlist.gql'
export default {
  views: {
    seatmaps: {
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
        Name: {
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        ImageUrl: {
          displayOrder: 2,
          caption: 'Image Url',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'seatmap-grid',
        context: {
          basePath: '/seatmaps',
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
        query: seatmapsList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'SeatMap',
        filter: {
          limit: '100',
          order: 'createdDate DESC',
          skip: '0',
          where: {},
        },
      },
      title: 'Seat Maps',
      type: 'list',
    },
    Events: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
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
          columnWidth: '180px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
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
          columnWidth: '180px',
          type: 'datetime',
          hidden: false,
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
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
          cssClasses: 'col-12 col-md-6',
          inlineEdit: true,
          newForm: false,
          editForm: true,
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
        filter(ctx) {
          return {
            where: {
              LayoutId: ctx.$route.query.id,
            },
          }
        },
      },
      title: 'All Events',
      type: 'list',
    },
    organizationBusinessUnit: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Business Unit',
      default: false,
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
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
        },
        'child.Name': {
          displayOrder: 3,
          caption: 'Parent BU',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        'contacts.FullName': {
          displayOrder: 3,
          caption: 'Primary Contact',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Address *',
            displayOrder: 3,
          },
          displayOrder: 5,
          caption: 'Address Line',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Address is required'
            },
          ],
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Country',
            displayOrder: 6,
          },
          displayOrder: 6,
          caption: 'Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
        },
        Email: {
          form: {
            caption: 'Email',
            displayOrder: 9,
          },
          displayOrder: 7,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
        },
        Phone: {
          form: {
            caption: 'Phone',
            displayOrder: 8,
          },
          displayOrder: 8,
          caption: 'Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            function (value, data) {
              return /^[0-9]\d*$|^$/.test(value) || 'Number must be valid'
            },
          ],
        },
      },
      template: {
        name: 'organizationBussinessUnit-grid',
        context: {
          basePath: '/organization',
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
        query: businessUnit,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Location',
        filter(ctx) {
          return {
            where: {
              LayoutId: ctx.$route.query.id,
            },
          }
        },
      },
      title: 'organizationBusinessUnit',
      type: 'list',
    },
  },
}

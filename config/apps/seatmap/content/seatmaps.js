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
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        ImageUrl: {
          displayOrder: 2,
          caption: 'Common.ImageUrl',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
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
            caption: 'Common.Title',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.Title',
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
            caption: 'Common.NameRequired',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.Name',
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
          caption: 'Common.ParentBu',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        'contacts.FullName': {
          displayOrder: 3,
          caption: 'Common.PrimaryContact',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        '_CurrentAddress.AddressLine': {
          form: {
            caption: 'Common.AddressRequired',
            displayOrder: 3,
          },
          displayOrder: 5,
          caption: 'Common.AddressLine',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '160px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.AddressRequired')
            },
          ],
        },
        '_CurrentAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 6,
          },
          displayOrder: 6,
          caption: 'Common.Country',
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
            caption: 'Common.EmailCaption',
            displayOrder: 9,
          },
          displayOrder: 7,
          caption: 'Common.EmailCaption',
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
            caption: 'Common.Phone',
            displayOrder: 8,
          },
          displayOrder: 8,
          caption: 'Common.Phone',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-6 col-md-6',
          newForm: true,
          editForm: true,
          rules: [
            function (value, data) {
              return (
                /^[0-9]\d*$|^$/.test(value) ||
                this.$t('Messages.Error.NumberValid')
              )
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

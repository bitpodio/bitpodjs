import printedTicketsList from '../gql/printedTickets.gql'

export default {
  views: {
    'printed-tickets': {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: true,
      },
      default: false,
      fields: {
        Size: {
          form: {
            caption: 'Common.Size',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Common.SizeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.SizeRequired')
            },
          ],
        },
        isDefault: {
          displayOrder: 2,
          caption: 'Common.Default',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          newForm: false,
          editForm: false,
        },
        Template: {
          form: {
            caption: '',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Common.Template',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          dropdownOptions: {
            '{{this.fullName}}': 'Full Name',
            '{{this.eventName}}': 'Event Name',
            'Event Date': 'this.eventDatetime',
            Price: 'this.price',
            Logo: 'this.orgLogo',
            QRCode: 'this.qrCode',
            'Seat Number': 'this.seatNumber',
            'Ticket Number': 'this.ticketNumber',
            Color: 'this.color',
          },
        },
        ThumbnailUrl: {
          form: {
            caption: 'Common.ThumbnailUrl',
            displayOrder: 3,
          },
          displayOrder: 5,
          caption: 'Common.ThumbnailUrl',
          cssClasses: 'col-12 col-md-12',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
          newForm: true,
          editForm: true,
        },
        Name: {
          form: {
            caption: 'Common.Name',
            displayOrder: 1,
          },
          displayOrder: 3,
          caption: 'Common.Name',
          searchEnable: false,
          sortEnable: false,
          columnWidth: '150px',
          type: 'string',
          newForm: true,
          editForm: false,
        },
      },
      template: {
        name: 'printedtickets-grid',
        context: {
          basePath: '/printed-tickets',
        },
        actions: {
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
        singularEntity: 'Common.PrintedTicket',
        pluralEntity: 'Common.PrintedTickets',
        query: printedTicketsList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'PrintedTicketTemplate',
        filter: {
          order: 'createdDate DESC',
          skip: '0',
          where: { isDefault: true },
        },
      },
      title: 'Common.TicketTemplate',
      type: 'list',
    },
  },
}

import eSignRequestList from '../gql/eSignRequest.gql'

export default {
  views: {
    eSign: {
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
        DocumentText: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        DocumentTemplate: {
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
        name: 'eSign-grid',
        context: {
          basePath: '',
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
        query: eSignRequestList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'ESignRequest',
        filter: {
          where: {},
        },
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
  },
}

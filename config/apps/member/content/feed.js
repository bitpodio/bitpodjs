import feedList from '../gql/feedList.gql'

export default {
  views: {
    feeds: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: true,
      fields: {
        Title: {
          displayOrder: 1,
          caption: 'Common.Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        Body: {
          form: {
            caption: 'Common.Body',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.Body',
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
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'feed-grid',
        context: {
          basePath: '/feed',
        },
        actions: {
          new: {
            hidden: false,
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
        singularEntity: 'Common.Members',
        pluralEntity: 'Drawer.Members',
        query: feedList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Feed',
        filter: {
          limit: '100',
          order: 'createdDate DESC',
          skip: '0',
          where: {},
        },
      },
      title: 'Common.Feeds',
      type: 'list',
    },
    feedsList: {
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
        Title: {
          displayOrder: 1,
          caption: 'Common.Title',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        Body: {
          form: {
            caption: 'Common.Body',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.Body',
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
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        context: {
          basePath: '/feed',
        },
        actions: {
          new: {
            hidden: false,
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
        singularEntity: 'Common.Members',
        pluralEntity: 'Drawer.Members',
        query: feedList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Feed',
        filter: {
          limit: '100',
          order: 'createdDate DESC',
          skip: '0',
          where: {},
        },
      },
      title: 'Common.Feeds',
      type: 'list',
    },
  },
}

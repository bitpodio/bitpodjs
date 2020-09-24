import badgeList from '../gql/badgeList.gql'

export default {
  views: {
    badge: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        Size: {
          displayOrder: 1,
          caption: 'Size',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        Type: {
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        Category: {
          displayOrder: 3,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Default: {
          displayOrder: 4,
          caption: 'Default',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Template: {
          displayOrder: 5,
          caption: 'Template',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 6,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
        },
      },
      template: {
        name: 'badge-grid',
        context: {
          basePath: '/badge',
        },
      },
      dataSource: {
        query: badgeList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Badge',
        filter: {
          order: 'createdDate DESC',
          skip: '0',
          where: { EventId: { exists: false } },
        },
      },
      title: 'Badge',
      type: 'list',
    },
  },
}

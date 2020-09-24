import { getData } from '~/config/apps/event/rest'

export default {
  views: {
    users: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      default: true,
      fields: {
        name: {
          displayOrder: 2,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        id: {
          displayOrder: 3,
          caption: 'Username',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        email: {
          displayOrder: 4,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        'rolemappings[0].roleId': {
          displayOrder: 5,
          caption: 'Roles',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        context: {
          basePath: '/organization',
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) =>
          getData(
            `/Organizations/${this.$store.state.currentOrg.id}/Users?filter={"include":{"rolemappings":"role"}}`
          ),
      },
      title: 'Users',
      type: 'list',
    },
  },
}

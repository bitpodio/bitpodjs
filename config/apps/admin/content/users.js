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
          newForm: false,
          editForm: false,
        },
        id: {
          displayOrder: 3,
          caption: 'Username',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        email: {
          form: {
            caption: 'Email',
            displayOrder: 1,
          },
          displayOrder: 4,
          caption: 'Email',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        rolemappings: {
          displayOrder: 5,
          caption: 'Roles',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'userRoles-grid',
        context: {
          basePath: '/organization',
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) =>
          getData(`Organizations/${ctx.$store.state.currentOrg.id}/Users`),
      },
      title: 'Users',
      type: 'list',
    },
  },
}

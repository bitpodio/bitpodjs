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
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        id: {
          displayOrder: 3,
          caption: 'Common.Username',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        email: {
          form: {
            caption: 'Common.EmailCaption',
            displayOrder: 1,
          },
          displayOrder: 4,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: true,
          editForm: false,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        rolemappings: {
          displayOrder: 5,
          caption: 'Common.Roles',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(
            `Organizations/${ctx.$store.state.currentOrg.id}/Users`,
            isExporting
          ),
      },
      title: 'Common.Users',
      type: 'list',
    },
  },
}

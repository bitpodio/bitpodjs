import { getData } from '~/config/apps/event/rest'

export default {
  views: {
    accesskey: {
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
        accesskey: {
          displayOrder: 2,
          caption: 'Common.AccessKeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
        },
        accesssecret: {
          displayOrder: 3,
          caption: 'Common.AccessSecretCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
        },
        expiresat: {
          displayOrder: 4,
          caption: 'Common.ExpiresOn',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
        action: {
          displayOrder: 5,
          caption: 'Drawer.Action',
          columnWidth: '150px',
        },
      },
      template: {
        name: 'accessKey-grid',
        context: {
          basePath: '/organization',
        },
        actions: {
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.AccessKeyCaption',
        pluralEntity: 'Common.AccessKeys',
        type: 'rest',
        getData: (ctx) =>
          getData(`/Users/${ctx.$auth.$state.user.data.email}/AccessKey`),
      },
      title: 'Common.AccessKeys',
      type: 'list',
    },
  },
}

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
          caption: 'Access Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
        },
        accesssecret: {
          displayOrder: 3,
          caption: 'Access Secret',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'string',
        },
        expiresat: {
          displayOrder: 4,
          caption: 'Expires On',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
        },
      },
      template: {
        name: 'accessKey-grid',
        context: {
          basePath: '/organization',
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) =>
          getData(`/Users/${ctx.$auth.$state.user.data.email}/AccessKey`),
      },
      title: 'Access keys',
      type: 'list',
    },
  },
}

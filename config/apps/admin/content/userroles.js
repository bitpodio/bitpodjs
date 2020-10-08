import { getCustomData } from '~/config/apps/event/rest'

export default {
  views: {
    userroles: {
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
        id: {
          displayOrder: 2,
          caption: 'Id',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        name: {
          displayOrder: 3,
          caption: 'Name',
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
        actions: {
          new: {
            hidden: true,
            caption: 'new field',
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
        type: 'rest',
        getData: (ctx) => getCustomData(`OrganizationInfos/roles`),
      },
      title: 'Roles',
      type: 'list',
    },
  },
}

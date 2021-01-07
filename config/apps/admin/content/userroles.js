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
          caption: 'Common.Id',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '100px',
          type: 'string',
        },
        name: {
          displayOrder: 3,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'roles-grid',
        context: {
          basePath: '/organization',
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
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) => getCustomData(`OrganizationInfos/roles`),
      },
      title: 'Common.Roles',
      type: 'list',
    },
  },
}

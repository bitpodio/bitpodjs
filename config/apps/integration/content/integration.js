import { getCustomData } from '~/config/apps/event/rest'

export default {
  views: {
    integration: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        'MetaData.Category': {
          displayOrder: 2,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        ServiceId: {
          displayOrder: 3,
          caption: 'Common.AppName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        Status: {
          displayOrder: 4,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'string',
        },
        Integrate: {
          displayOrder: 5,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: 'integrationapp-grid',
        context: {
          basePath: '/organization',
        },
        actions: {
          new: {
            hidden: true,
          },
          exportCsv: {
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
        getData: (ctx) => getCustomData(`OrganizationInfos/getMyConnections`),
      },
      title: '',
      type: 'list',
    },
  },
}

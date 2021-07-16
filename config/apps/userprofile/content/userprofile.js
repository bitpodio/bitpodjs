import { getLoginData } from '~/config/apps/event/rest'

export default {
  views: {
    userprofile: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Members',
      fields: {
        name: {
          displayOrder: 3,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        eventType: {
          displayOrder: 5,
          caption: 'Common.EventType',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        email: {
          displayOrder: 2,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        timeStamp: {
          displayOrder: 4,
          caption: 'Common.TimeStamp',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'userprofile-grid',
        context: {
          basePath: '',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          new: {
            hidden: true,
          },
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) =>
          getLoginData(
            `api/tiers/${ctx.$auth.state.user.data.TierHierarchy[0].Id}/users/${ctx.$auth.state.user.data.sub}/activity/${ctx.$config.axios.activityId}`
          ),
      },
      title: 'Common.Contacts',
      defaultSort: 'createdDate DESC',
    },
    connectedApps: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.ConnectedApps',
      fields: {
        appName: {
          displayOrder: 2,
          caption: 'Common.ApplicationName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        scope: {
          displayOrder: 3,
          caption: 'Common.Scopes',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        accessGiveOn: {
          displayOrder: 4,
          caption: 'Common.AccessGivenOn',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        Action: {
          displayOrder: 5,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'connectedApps-grid',
        context: {
          basePath: '',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          new: {
            hidden: true,
          },
        },
      },
      dataSource: {
        type: 'rest',
        getData: (ctx) =>
          getLoginData(
            `api/tiers/${ctx.$auth.state.user.data.TierHierarchy[0].Id}/users/${ctx.$auth.state.user.data.sub}/connectedapps`
          ),
      },
    },
  },
}

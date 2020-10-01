import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'

export default {
  views: {
    timezone: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        key: {
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        value: {
          displayOrder: 3,
          caption: 'Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: '',
        context: {
          basePath: '/organization',
        },
      },
      dataSource: {
        query: generalConfiguration,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'GeneralConfiguration',
        filter(ctx) {
          return {
            where: {
              type: 'Currency',
            },
          }
        },
      },
      title: 'timezone',
      type: 'list',
    },
  },
}

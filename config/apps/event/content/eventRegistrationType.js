import registrationType from '../gql/registrationType.gql'
export default {
  views: {
    eventRegistrationType: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.RegistrationType',
      hidden: true,
      fields: {
        Name: {
          form: {
            caption: 'Common.Name',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.NameRequired')
            },
          ],
        },
        MaxQuantityAllowed: {
          form: {
            caption: 'Common.MaxQuantityAllowed',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.MaxQuantityAllowed',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
          default: 10,
        },
        DisplayOrder: {
          form: {
            caption: 'Common.DisplayOrd',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.DisplayOrd',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        ColorCode: {
          form: {
            caption: 'Common.ColorCode',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Common.ColorCode',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        AllowMultiple: {
          form: {
            caption: 'Common.AllowMultiple',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Common.AllowMultiple',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          newForm: true,
          editForm: true,
        },
        isDefault: {
          displayOrder: 6,
          caption: 'Common.Default',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
      },
      template: {
        name: 'eventRegistrationType-grid',
        context: {
          basePath: '/event',
        },
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.RegistrationType',
        pluralEntity: 'Common.RegistrationTypes',
        query: registrationType,
        type: 'graphql',
        model: 'RegistrationType',
        filter(ctx) {
          return {
            where: {
              EventId: ctx.$route.query.event,
            },
          }
        },
        mutation(ctx, data) {
          return {
            new: {
              EventId: ctx.$route.query.event,
            },
            edit: {},
          }
        },
      },
      title: 'Registration Type',
      type: 'list',
    },
  },
}

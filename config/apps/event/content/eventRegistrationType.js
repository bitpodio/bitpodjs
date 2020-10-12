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
      itemTitle: 'Registation Type',
      hidden: true,
      fields: {
        Name: {
          form: {
            caption: 'Name',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Name is required'
            },
          ],
        },
        MaxQuantityAllowed: {
          form: {
            caption: 'Max Quantity Allowed',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Max Quantity Allowed',
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
            caption: 'Display Order',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Display Order',
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
            caption: 'Color Code',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Color Code',
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
            caption: 'Allow Multiple',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Allow Multiple',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          newForm: true,
          editForm: true,
        },
        isDefault: {
          displayOrder: 6,
          caption: 'Default',
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
      },
      dataSource: {
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

import badgeList from '../gql/badgeList.gql'

export default {
  views: {
    badge: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: true,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        Size: {
          form: {
            caption: 'Size *',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Size',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          newForm: true,
          editForm: false,
          rules: [
            (v) => {
              return !!v || 'Size is required'
            },
          ],
        },
        Type: {
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Category: {
          displayOrder: 3,
          caption: 'Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Default: {
          displayOrder: 4,
          caption: 'Default',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Template: {
          form: {
            caption: '',
            displayOrder: 3,
          },
          displayOrder: 5,
          caption: 'Template',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'richtext',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          dropdownOptions: {
            'First Name': 'First  Name',
            'Last Name': 'Last  Name',
            'Full Name': 'Full  Name',
            Category: 'Category',
            'Event Name': 'Event  Name',
            Organization: 'Organization',
            Logo: 'Logo',
            QRCode: 'QRCode',
          },
        },
        DisplayOrder: {
          form: {
            caption: 'Display Order *',
            displayOrder: 2,
          },
          displayOrder: 6,
          caption: 'Display Order',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          newForm: true,
          editForm: false,
          minimumValue: '0',
          rules: [
            (v) => {
              return !!v || 'This field is required'
            },
          ],
        },
      },
      template: {
        name: 'badge-grid',
        context: {
          basePath: '/badge',
        },
        actions: {
          new: {
            hidden: false,
            caption: 'Create Badge',
          },
        },
      },
      dataSource: {
        query: badgeList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Badge',
        filter: {
          order: 'createdDate DESC',
          skip: '0',
          where: { EventId: { exists: false } },
        },
      },
      title: 'Badge',
      type: 'list',
    },
  },
}

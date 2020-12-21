import memberList from '../gql/memberList.gql'

export default {
  dataSource: {
    Type: 'List',
    URL: 'Customer',
  },
  general: {
    caption: 'Members',
    name: 'Customer',
  },
  views: {
    Members: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      itemTitle: 'Common.Members',
      fields: {
        FirstName: {
          form: {
            caption: 'Common.FirstName',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.FirstNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.FirstNameRequired')
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Common.LastName',
            displayOrder: 2,
          },
          displayOrder: 3,
          caption: 'Common.LastNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.LastNameRequired')
            },
          ],
        },
        Email: {
          form: {
            caption: 'Common.Email',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.EmailRequired')
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        BusinessNumber: {
          form: {
            caption: 'Common.PhoneRequired',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'Common.BusinessNumber',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          cssClasses: 'col-12 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.PhoneRequired')
            },
            function (value, data) {
              return /^[0-9]\d*$|^$/.test(value) || 'Number must be valid'
            },
          ],
        },
        createdDate: {
          displayOrder: 6,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Tags: {
          form: {
            caption: 'Common.Tags',
            displayOrder: 5,
          },
          caption: 'Common.Tags',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'tags',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-12',
        },
        '_BillingAddress.AddressLine': {
          form: {
            caption: 'Common.Address',
            displayOrder: 6,
          },
          caption: 'Common.Address',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-12',
        },
        '_BillingAddress.City': {
          form: {
            caption: 'Common.City',
            displayOrder: 7,
          },
          caption: 'Common.City',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-6',
        },
        '_BillingAddress.State': {
          form: {
            caption: 'Common.State',
            displayOrder: 8,
          },
          caption: 'Common.State',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-6',
        },
        '_BillingAddress.PostalCode': {
          form: {
            caption: 'Common.Zip',
            displayOrder: 9,
          },
          caption: 'Common.Zip',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-6',
        },
        '_BillingAddress.Country': {
          form: {
            caption: 'Common.Country',
            displayOrder: 10,
          },
          caption: 'Common.Country',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-6',
        },
        Description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 11,
          },
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          hidden: true,
          newForm: true,
          editForm: true,
          cssClasses: 'col-12 col-md-12',
        },
      },
      template: {
        name: '',
        context: {
          basePath: '/contacts',
        },
      },
      dataSource: {
        singularEntity: 'Common.Members',
        pluralEntity: 'Drawer.Members',
        query: memberList,
        type: 'graphql',
        model: 'Customer',
        defaultSort: 'createdDate DESC',
      },
      title: 'Common.Members',
      defaultSort: 'createdDate DESC',
    },
  },
}

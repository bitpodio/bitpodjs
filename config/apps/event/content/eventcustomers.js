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
      itemTitle: 'Member',
      fields: {
        FirstName: {
          form: {
            caption: 'First Name *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'FirstName',
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
            (v) => {
              return !!v || 'First Name is required'
            },
          ],
        },
        LastName: {
          form: {
            caption: 'Last Name *',
            displayOrder: 2,
          },
          displayOrder: 3,
          caption: 'LastName',
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
            (v) => {
              return !!v || 'Last Name is required'
            },
          ],
        },
        Email: {
          form: {
            caption: 'Email *',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Email',
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
            (v) => {
              return !!v || 'Email is required'
            },
            function (value, data) {
              return /.+@.+\..+/.test(value) || 'E-mail must be valid'
            },
          ],
        },
        BusinessNumber: {
          form: {
            caption: 'Phone *',
            displayOrder: 4,
          },
          displayOrder: 5,
          caption: 'BusinessNumber',
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
            (v) => {
              return !!v || 'Phone is required'
            },
            function (value, data) {
              return /^[0-9]\d*$|^$/.test(value) || 'Number must be valid'
            },
          ],
        },
        createdDate: {
          displayOrder: 6,
          caption: 'createdDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'date',
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 7,
          caption: 'Created By',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
          newForm: false,
          editForm: false,
        },
        Tags: {
          form: {
            caption: 'Tags',
            displayOrder: 5,
          },
          caption: 'Tags',
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
            caption: 'Address',
            displayOrder: 6,
          },
          caption: 'Address',
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
            caption: 'City',
            displayOrder: 7,
          },
          caption: 'City',
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
            caption: 'State',
            displayOrder: 8,
          },
          caption: 'State',
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
            caption: 'Zip',
            displayOrder: 9,
          },
          caption: 'Zip',
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
            caption: 'Country',
            displayOrder: 10,
          },
          caption: 'Country',
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
            caption: 'Description',
            displayOrder: 11,
          },
          caption: 'Description',
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
        query: memberList,
        type: 'graphql',
        model: 'Customer',
        defaultSort: 'createdDate DESC',
      },
      title: 'Members',
      defaultSort: 'createdDate DESC',
    },
  },
}

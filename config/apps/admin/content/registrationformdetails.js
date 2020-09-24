import registrationForm from '../gql/registrationForm.gql'

export default {
  views: {
    'registration form': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: true,
      },
      default: false,
      fields: {
        Label: {
          displayOrder: 1,
          caption: 'Label',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        ControlType: {
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        DisplayOrder: {
          displayOrder: 3,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
        },
        isShowField: {
          displayOrder: 4,
          caption: 'Buyer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
        },
        isAttendeeField: {
          displayOrder: 5,
          caption: 'Attendee',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        isRequired: {
          displayOrder: 6,
          caption: 'Required',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'registrationform-grid',
        context: {
          basePath: '/registrationform',
        },
      },
      dataSource: {
        query: registrationForm,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'RegistrationForm',
        filter: {
          order: 'createdDate DESC',
          skip: '0',
          where: {},
        },
      },
      title: 'Registration Form',
      type: 'list',
    },
  },
}

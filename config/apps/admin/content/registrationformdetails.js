import registrationForm from '../gql/registrationForm.gql'
import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
export default {
  views: {
    'registration form': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.RegistrationForm',
      default: false,
      fields: {
        Label: {
          form: {
            caption: 'Common.Label',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Label',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
        },
        ControlType: {
          form: {
            caption: 'Common.ControlType',
            displayOrder: 3,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ControlRequired')
            },
          ],
          dataSource: {
            query: generalConfiguration,
            itemText: 'value',
            itemValue: 'key',
            filter(data) {
              return {
                type: 'ControlType',
              }
            },
          },
        },
        Options: {
          form: {
            caption: 'Common.OptionsCaption',
            displayOrder: 3,
          },
          displayOrder: 2,
          caption: 'Common.OptionsCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'tags',
          cssClasses: 'col-12 col-md-12',
          hidden: true,
          newForm: false,
          editForm: true,
          visible(value, data) {
            const controlType = data.ControlType
            return (
              controlType === 'checkbox' ||
              controlType === 'radio' ||
              controlType === 'dropdown'
            )
          },
        },
        DisplayOrder: {
          form: {
            caption: 'Common.DisplayOrd',
            displayOrder: 2,
          },
          displayOrder: 3,
          caption: 'Common.DisplayOrd',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
        },
        isShowField: {
          form: {
            caption: 'Common.ShowField',
            displayOrder: 5,
          },
          displayOrder: 4,
          caption: 'Common.Buyer',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
          newForm: false,
          editForm: true,
        },
        isAttendeeField: {
          displayOrder: 5,
          caption: 'Common.Attendee',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          editForm: false,
        },
        isRequired: {
          form: {
            caption: 'Common.Required',
            displayOrder: 4,
          },
          displayOrder: 6,
          caption: 'Common.Required',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
          newForm: false,
          editForm: true,
        },
      },
      template: {
        name: 'registrationform-grid',
        context: {
          basePath: '/registrationform',
        },
        actions: {
          new: {
            hidden: true,
            caption: 'new field',
          },
          edit: {
            hidden: false,
          },
          delete: {
            hidden: true,
          },
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
      title: 'Common.RegistrationForm',
      type: 'list',
    },
  },
}

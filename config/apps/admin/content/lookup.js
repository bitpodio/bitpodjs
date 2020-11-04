import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'

export default {
  views: {
    lookups: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Currency',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
        mutation(ctx) {
          return {
            new: {
              type: 'Currency',
            },
          }
        },
      },
      title: 'Lookups',
      type: 'list',
    },
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
      itemTitle: 'Common.Timezone',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'TimeZone',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'TimeZone',
            },
          }
        },
      },
      title: 'TimeZone',
      type: 'list',
    },
    eventprivacy: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.EventPrivacy',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'EventPrivacy',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'EventPrivacy',
            },
          }
        },
      },
      title: 'Event Privacy',
      type: 'list',
    },
    eventtag: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.EventTag',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'EventTags',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'EventTags',
            },
          }
        },
      },
      title: 'Event Tag',
      type: 'list',
    },
    tickettype: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.TicketType',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'TicketType',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'TicketType',
            },
          }
        },
      },
      title: 'Ticket Type',
      type: 'list',
    },
    sessiontype: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.SessionType',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          default: 'SessionType',
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'SessionType',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'SessionType',
            },
          }
        },
      },
      title: 'Session Type',
      type: 'list',
    },
    questioncontrol: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.QuestionControl',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'ControlType',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'ControlType',
            },
          }
        },
      },
      title: 'Question Control',
      type: 'list',
    },
    refundmethod: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.RefundMethod',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'RefundMethod',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'RefundMethod',
            },
          }
        },
      },
      title: 'Refund Method',
      type: 'list',
    },
    reason: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Reason',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'Reason',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'Reason',
            },
          }
        },
      },
      title: 'Reason',
      type: 'list',
    },
    badgecategory: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.BadgeCategory',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
        },
        name: {
          displayOrder: 4,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
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
              type: 'BadgeCategory',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'BadgeCategory',
            },
          }
        },
      },
      title: 'Badge Category',
      type: 'list',
    },
    contacttypes: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.ContactTypes',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'CRMContactType',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'CRMContactType',
            },
          }
        },
      },
      title: 'Contact Types',
      type: 'list',
    },
    departments: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Department',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Common.Type',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: false,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Common.Key',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.KeyCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.KeyRequired')
            },
          ],
        },
        value: {
          form: {
            caption: 'Common.ValueRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.ValueRequired')
            },
          ],
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
              type: 'CRMDepartment',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'CRMDepartment',
            },
          }
        },
      },
      title: 'Common.Departments',
      type: 'list',
    },
  },
}

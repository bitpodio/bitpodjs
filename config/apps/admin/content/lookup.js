import generalConfiguration from '~/config/apps/event/gql/registrationStatusOptions.gql'
import product from '~/config/apps/member/gql/product.gql'

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
        actions: {
          exportCsv: {
            hidden: true,
          },
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
      itemTitle: 'Common.TimezoneCaption',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.TimezoneCaption',
        pluralEntity: 'Common.Timezones',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.EventPrivacy',
        pluralEntity: 'Common.EventPrivacies',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.EventTag',
        pluralEntity: 'Common.EventTags',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.TicketType',
        pluralEntity: 'Common.TicketTypes',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.SessionType',
        pluralEntity: 'Common.SessionTypes',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.QuestionControl',
        pluralEntity: 'Common.QuestionControls',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.RefundMethod',
        pluralEntity: 'Common.RefundMethods',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Reason',
        pluralEntity: 'Common.Reasons',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.BadgeCategory',
        pluralEntity: 'Common.BadgeCategories',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.ContactType',
        pluralEntity: 'Common.ContactTypes',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Department',
        pluralEntity: 'Common.Departments',
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
    memberType: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.MemberType',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Department',
        pluralEntity: 'Common.Departments',
        query: generalConfiguration,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'GeneralConfiguration',
        filter(ctx) {
          return {
            where: {
              type: 'CustomerType',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'CustomerType',
            },
          }
        },
      },
      title: 'Common.MemberType',
      type: 'list',
    },
    memberStatus: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.MemberStatus',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.MemberStatus',
        pluralEntity: 'Common.MemberStatus',
        query: generalConfiguration,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'GeneralConfiguration',
        filter(ctx) {
          return {
            where: {
              type: 'CustomerRating',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'CustomerRating',
            },
          }
        },
      },
      title: 'Common.MemberStatus',
      type: 'list',
    },
    memberIndustry: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Industry',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Industry',
        pluralEntity: 'Common.Industry',
        query: generalConfiguration,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'GeneralConfiguration',
        filter(ctx) {
          return {
            where: {
              type: 'Industry',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'Industry',
            },
          }
        },
      },
      title: 'Common.Industry',
      type: 'list',
    },
    memberOwnership: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Ownership',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Ownership',
        pluralEntity: 'Common.Ownership',
        query: generalConfiguration,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'GeneralConfiguration',
        filter(ctx) {
          return {
            where: {
              type: 'CustomerOwnership',
            },
          }
        },
        mutation(ctx) {
          return {
            new: {
              type: 'CustomerOwnership',
            },
          }
        },
      },
      title: 'Common.Ownership',
      type: 'list',
    },
    memberSubscriptionPlan: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.SubscriptionPlan',
      default: false,
      fields: {
        Name: {
          form: {
            caption: 'Common.Name',
            displayOrder: 2,
          },
          displayOrder: 3,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
        },
        DisplayName: {
          form: {
            caption: 'Common.DisplayName',
            displayOrder: 3,
          },
          displayOrder: 4,
          caption: 'Common.DisplayName',
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
        actions: {
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.SubscriptionPlan',
        pluralEntity: 'Common.SubscriptionPlan',
        query: product,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'Product',
        filter(ctx) {
          return {
            where: {},
          }
        },
        mutation(ctx) {
          return {
            new: {},
          }
        },
      },
      title: 'Common.SubscriptionPlan',
      type: 'list',
    },
  },
}

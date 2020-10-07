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
      itemTitle: 'Currency',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Timezone',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Event Privacy',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Event Tag',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Ticket Type',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Session Type',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          default: 'SessionType',
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Question Control',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Refund Method',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Reason',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Badge Category',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
            },
          ],
        },
        name: {
          displayOrder: 4,
          caption: 'Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
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
      itemTitle: 'Contact Type',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      itemTitle: 'Department',
      default: false,
      fields: {
        type: {
          form: {
            caption: 'Type *',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Type',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          newForm: false,
          editForm: true,
          readonly() {
            return true
          },
        },
        key: {
          form: {
            caption: 'Key *',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Key',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Key is required'
            },
          ],
        },
        value: {
          form: {
            caption: 'Value *',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Value',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          newForm: true,
          editForm: true,
          rules: [
            (v) => {
              return !!v || 'Value is required'
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
      title: 'Departments',
      type: 'list',
    },
  },
}

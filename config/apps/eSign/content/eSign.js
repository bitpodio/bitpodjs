import eSignRequestList from '../gql/eSignRequest.gql'
import eSignTaskList from '~/config/apps/event/gql/eventTasks.gql'
import { getData } from '~/config/apps/event/rest'
import contactList from '~/config/apps/event/gql/contactList.gql'

export default {
  views: {
    eSign: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: true,
      fields: {
        DocumentText: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        DocumentTemplate: {
          displayOrder: 2,
          caption: 'Common.ImageUrl',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'eSign-grid',
        context: {
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: eSignRequestList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'ESignRequest',
        filter: {
          where: {},
        },
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
    eSignCompleted: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: true,
      fields: {
        DocumentText: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        DocumentTemplate: {
          displayOrder: 2,
          caption: 'Common.ImageUrl',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'eSign-grid',
        context: {
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: eSignRequestList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'ESignRequest',
        filter: {
          where: {
            Status: 'Completed',
          },
        },
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
    eSignInprogress: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: true,
      fields: {
        DocumentText: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        DocumentTemplate: {
          displayOrder: 2,
          caption: 'Common.ImageUrl',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'eSign-grid',
        context: {
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: eSignRequestList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'ESignRequest',
        filter: {
          where: {
            Status: 'Inprogress',
          },
        },
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
    eSignDeclined: {
      ui: {
        hideDefaultHeader: true,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: false,
        hideSearch: false,
      },
      default: true,
      fields: {
        DocumentText: {
          displayOrder: 1,
          caption: 'Common.Name',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        DocumentTemplate: {
          displayOrder: 2,
          caption: 'Common.ImageUrl',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '250px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 3,
          caption: 'Common.Date',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
        },
        createdBy: {
          displayOrder: 4,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
      },
      template: {
        name: 'eSign-grid',
        context: {
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        query: eSignRequestList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'ESignRequest',
        filter: {
          where: {
            Status: 'Declined',
          },
        },
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
    InviteContacts: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: true,
      },
      fields: {
        Email: {
          form: {
            caption: 'Common.Email',
            displayOrder: 2,
          },
          displayOrder: 1,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        FullName: {
          form: {
            caption: 'Common.FullName',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.FullName',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
      },
      template: {
        name: '',
        context: {
          basePath: '/contacts',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Contact',
        pluralEntity: 'Common.Contacts',
        query: contactList,
        filter: {
          where: {},
        },
        type: 'graphql',
        model: 'Contact',
        defaultSort: 'createdDate DESC',
      },
      hidden: true,
      title: 'Contacts',
      defaultSort: 'createdDate DESC',
    },
    eSignRequestRecipients: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      default: true,
      fields: {
        FullName: {
          displayOrder: 1,
          caption: 'Common.FullName',
          searchEnable: true,
          sortEnable: true,
          type: 'string',
        },
        type: {
          displayOrder: 2,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          type: 'string',
        },
        Email: {
          displayOrder: 3,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          type: 'string',
        },
        Status: {
          displayOrder: 4,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          type: 'string',
        },
        SignedDate: {
          displayOrder: 5,
          caption: 'Common.SignedOn',
          searchEnable: true,
          sortEnable: true,
          type: 'date',
        },
      },
      template: {
        name: 'eRequestRecipients-grid',
        context: {
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Speaker',
        pluralEntity: 'Common.Speakers',
        model: 'ESignRequest',
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(
            `ESIGNREQUESTS/${ctx.$route.params.id}/Recipient`,
            isExporting
          ),
      },
      title: 'E-Sign-Request',
      type: 'list',
    },
    eSignTasks: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      itemTitle: 'Common.Task',
      hidden: true,
      fields: {
        Title: {
          form: {
            caption: 'Common.Title',
            displayOrder: 1,
          },
          displayOrder: 2,
          caption: 'Common.TitleCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Category: {
          form: {
            caption: 'Common.CategoryRequired',
            displayOrder: 2,
          },
          displayOrder: 5,
          caption: 'Common.Category',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Status: {
          form: {
            caption: 'Common.StatusRequired',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.Status',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Action: {
          form: {
            caption: 'Action *',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Common.WaitFor',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        DueDate: {
          form: {
            caption: 'DueDate *',
            displayOrder: 4,
          },
          displayOrder: 7,
          caption: 'Common.DueDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          hidden: false,
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        Type: {
          displayOrder: 6,
          caption: 'Common.TypeCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        createdDate: {
          displayOrder: 8,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'datetime',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        createdBy: {
          displayOrder: 9,
          caption: 'Common.CreatedBy',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
        TemplateName: {
          displayOrder: 10,
          caption: 'Common.TemplateNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '170px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          hidden: false,
          inlineEdit: true,
          newForm: false,
          editForm: false,
        },
      },
      template: {
        // name: '',
        name: '',
        context: {
          // basePath: '/event',
          basePath: '',
        },
        actions: {
          new: {
            hidden: true,
          },
          edit: {
            hidden: true,
          },
          delete: {
            hidden: true,
          },
          exportCsv: {
            hidden: true,
          },
        },
      },
      dataSource: {
        singularEntity: 'Common.Task',
        pluralEntity: 'Common.Tasks',
        query: eSignTaskList,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'CRMActivity',
        filter(ctx) {
          return {
            where: {
              and: [{ ESignRequestId: ctx.$route.params.id }],
            },
          }
        },
      },
      title: 'eSignTasks',
      type: 'list',
    },
  },
}

import registrationForm from './gql/registrationForm.gql'
import badgeList from './gql/badgeList.gql'
import seatmapsList from './gql/seatmapsList.gql'
import marketingTemplates from './gql/marketingTemplates.gql'
import businessUnit from './gql/businessUnit.gql'
import { getData } from '~/config/apps/event/rest/index.js'

export default {
  organization: {
    views: {
      organizationBusinessUnit: {
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
          Name: {
            displayOrder: 2,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          'child.Name': {
            displayOrder: 3,
            caption: 'Parent BU',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          'contacts.FullName': {
            displayOrder: 3,
            caption: 'Primary Contact',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          '_CurrentAddress.AddressLine': {
            displayOrder: 5,
            caption: 'Address Line',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '160px',
            type: 'string',
          },
          '_CurrentAddress.Country': {
            displayOrder: 6,
            caption: 'Country',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '130px',
            type: 'string',
          },
          Email: {
            displayOrder: 7,
            caption: 'Email',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '130px',
            type: 'string',
          },
          Phone: {
            displayOrder: 8,
            caption: 'Phone',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '130px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          query: businessUnit,
          defaultSort: 'createdDate DESC',
          type: 'graphql',
          model: 'Location',
          filter(ctx) {
            debugger
            return {
              where: {},
            }
          },
        },
        title: 'organizationBusinessUnit',
        type: 'list',
      },
      organizationProductSubscription: {
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
          'SubProduct.DisplayName': {
            displayOrder: 2,
            caption: 'Product',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '200px',
            type: 'string',
          },
          StartDate: {
            displayOrder: 3,
            caption: 'Start Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'datetime',
          },
          EndDate: {
            displayOrder: 4,
            caption: 'End Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'datetime',
          },
          Cost: {
            displayOrder: 5,
            caption: 'Price',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '130px',
            type: 'string',
          },
          Unit: {
            displayOrder: 6,
            caption: 'Unit',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '120px',
            type: 'string',
          },
          isActive: {
            displayOrder: 7,
            caption: 'Active',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '120px',
            type: 'string',
          },
          AutoRenew: {
            displayOrder: 8,
            caption: 'Auto Renew',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) => getData(`/OrganizationInfos/getSubscription`),
        },
        title: 'organizationProductSubscription',
        type: 'list',
      },
      organizationTasks: {
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
          Title: {
            displayOrder: 2,
            caption: 'Title',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Status: {
            displayOrder: 3,
            caption: 'Status',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Action: {
            displayOrder: 4,
            caption: 'Wait For',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Category: {
            displayOrder: 5,
            caption: 'Category',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Type: {
            displayOrder: 6,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          TemplateName: {
            displayOrder: 7,
            caption: 'Template Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          createdBy: {
            displayOrder: 8,
            caption: 'Created By',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'datetime',
          },
          createdDate: {
            displayOrder: 9,
            caption: 'Created Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'datetime',
          },
          DueDate: {
            displayOrder: 10,
            caption: 'Due Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'datetime',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) =>
            getData(`/CRMACTIVITIES?filter={"where":{"Type":"Template"}}`),
        },
        title: 'organizationProductSubscription',
        type: 'list',
      },
      organizationIntegration: {
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
          'MetaData.Category': {
            displayOrder: 2,
            caption: 'Category',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          ServiceId: {
            displayOrder: 3,
            caption: 'App Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Status: {
            displayOrder: 4,
            caption: 'Status',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
          Action: {
            displayOrder: 5,
            caption: 'Action',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '180px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) => getData(`/OrganizationInfos/getMyConnections`),
        },
        title: 'organizationIntegration',
        type: 'list',
      },
    },
  },

  registrationformdetails: {
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
  },

  badge: {
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
            displayOrder: 1,
            caption: 'Size',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Type: {
            displayOrder: 2,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Category: {
            displayOrder: 3,
            caption: 'Category',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          Default: {
            displayOrder: 4,
            caption: 'Default',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          Template: {
            displayOrder: 5,
            caption: 'Template',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          DisplayOrder: {
            displayOrder: 6,
            caption: 'Display Order',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'number',
          },
        },
        template: {
          name: 'badge-grid',
          context: {
            basePath: '/badge',
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
  },

  seatmaps: {
    views: {
      seatmaps: {
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
          Name: {
            displayOrder: 1,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          ImageUrl: {
            displayOrder: 2,
            caption: 'Image Url',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          createdDate: {
            displayOrder: 3,
            caption: 'Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'date',
          },
          createdBy: {
            displayOrder: 4,
            caption: 'Created By',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          name: 'seatmap-grid',
          context: {
            basePath: '/seatmaps',
          },
        },
        dataSource: {
          query: seatmapsList,
          defaultSort: 'createdDate DESC',
          type: 'graphql',
          model: 'SeatMap',
          filter: {
            limit: '100',
            order: 'createdDate DESC',
            skip: '0',
            where: {},
          },
        },
        title: 'Seat Maps',
        type: 'list',
      },
    },
  },

  marketingtemplates: {
    views: {
      template: {
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
          Name: {
            displayOrder: 1,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Type: {
            displayOrder: 2,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          ImageUrl: {
            displayOrder: 3,
            caption: 'Image Url',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Body: {
            displayOrder: 4,
            caption: 'Body',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Category: {
            displayOrder: 5,
            caption: 'Category',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          createdDate: {
            displayOrder: 6,
            caption: 'Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'date',
          },
          createdBy: {
            displayOrder: 7,
            caption: 'Created By',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          name: 'invitetemplate-grid',
          context: {
            basePath: '/templates',
          },
        },
        dataSource: {
          query: marketingTemplates,
          defaultSort: 'createdDate DESC',
          type: 'graphql',
          model: 'MarketingTemplate',
          filter: {
            order: 'createdDate DESC',
            skip: '0',
            where: {},
          },
        },
        title: 'Templates',
        type: 'list',
      },
      mytemplate: {
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
          Name: {
            displayOrder: 1,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Type: {
            displayOrder: 2,
            caption: 'Type',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          ImageUrl: {
            displayOrder: 3,
            caption: 'Image Url',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Body: {
            displayOrder: 4,
            caption: 'Body',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          Category: {
            displayOrder: 5,
            caption: 'Category',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          createdDate: {
            displayOrder: 6,
            caption: 'Date',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'date',
          },
          createdBy: {
            displayOrder: 7,
            caption: 'Created By',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          name: 'mytemplate-grid',
          context: {
            basePath: '/templates',
          },
        },
        dataSource: {
          query: marketingTemplates,
          defaultSort: 'createdDate DESC',
          type: 'graphql',
          model: 'MarketingTemplate',
          filter(ctx) {
            return {
              where: {
                createdBy: ctx.$auth.$state.user.data.email,
              },
            }
          },
        },
        title: 'My Templates',
        type: 'list',
      },
    },
  },

  userroles: {
    views: {
      userroles: {
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
          id: {
            displayOrder: 2,
            caption: 'Id',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '250px',
            type: 'string',
          },
          name: {
            displayOrder: 3,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) => getData(`/OrganizationInfos/roles`),
        },
        title: 'Roles',
        type: 'list',
      },
    },
  },

  users: {
    views: {
      users: {
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
          name: {
            displayOrder: 2,
            caption: 'Name',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          id: {
            displayOrder: 3,
            caption: 'Username',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          email: {
            displayOrder: 4,
            caption: 'Email',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
          'rolemappings[0].roleId': {
            displayOrder: 5,
            caption: 'Roles',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '150px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) =>
            getData(
              `/Organizations/${this.$store.state.currentOrg.id}/Users?filter={"include":{"rolemappings":"role"}}`
            ),
        },
        title: 'Users',
        type: 'list',
      },
    },
  },

  accesskey: {
    views: {
      accesskey: {
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
          accesskey: {
            displayOrder: 2,
            caption: 'Access Key',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '200px',
            type: 'string',
          },
          accesssecret: {
            displayOrder: 3,
            caption: 'Access Secret',
            searchEnable: true,
            sortEnable: true,
            columnWidth: '200px',
            type: 'string',
          },
        },
        template: {
          context: {
            basePath: '/organization',
          },
        },
        dataSource: {
          type: 'rest',
          getData: (ctx) =>
            getData(`/Users/${ctx.$auth.$state.user.data.email}/AccessKey`),
        },
        title: 'Access keys',
        type: 'list',
      },
    },
  },
}

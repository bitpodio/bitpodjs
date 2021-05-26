import eventNames from '../gql/eventNames.gql'
import discountCodes from '../gql/discountCodes.gql'
import { getData } from '../rest'

export default {
  dataSource: {
    Type: 'List',
    URL: 'Offercode',
  },
  general: {
    caption: 'OfferCodes',
    name: 'OfferCode',
  },
  views: {
    'Discount-Codes': {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: true,
        hideFilter: true,
        hideSearch: false,
      },
      itemTitle: 'Common.DiscountCodes',
      defaultSort: 'createdDate DESC',
      fields: {
        currentUsageCount: {
          displayOrder: 9,
          caption: 'Common.CurrentUsageCount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'number',
          inlineEdit: false,
          newForm: false,
          editForm: false,
        },
        codeTitle: {
          form: {
            caption: 'Common.CodeRequired',
            displayOrder: 1,
          },
          displayOrder: 1,
          caption: 'Common.Code',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.PleaseField')
            },
          ],
        },
        description: {
          form: {
            caption: 'Common.Description',
            displayOrder: 2,
          },
          displayOrder: 2,
          caption: 'Common.Description',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'richtext',
          hidden: true,
          cssClasses: 'col-12 col-md-12',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        isActive: {
          form: {
            caption: 'Common.IsActiveField',
            displayOrder: 4,
          },
          displayOrder: 4,
          caption: 'Common.IsActiveField',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        isPercent: {
          form: {
            caption: 'Common.IsPercentCaption',
            displayOrder: 3,
          },
          displayOrder: 3,
          caption: 'Common.IsPercentCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '140px',
          type: 'checkbox',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
        },
        validTill: {
          form: {
            caption: 'Common.ValidTill',
            displayOrder: 7,
          },
          displayOrder: 7,
          caption: 'Common.ValidTill',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          default: '',
          customExport: (startDate) => {
            if (startDate) {
              const tempDate = new Date(startDate)
              return (
                tempDate.toLocaleDateString() +
                ' ' +
                tempDate.toLocaleTimeString()
              )
            }
            return ''
          },
        },
        offerValue: {
          form: {
            caption: 'Common.OfferValueRequired',
            displayOrder: 5,
          },
          displayOrder: 5,
          caption: 'Common.OfferValue',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
          rules: [
            function (v) {
              return !!v || this.$t('Messages.Error.PleaseField')
            },
          ],
        },
        minApplicableOrderAmount: {
          form: {
            caption: 'Common.MinApplicableOrderAmount',
            displayOrder: 6,
          },
          displayOrder: 6,
          caption: 'Common.MinApplicableAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '210px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        maxApplicableAmount: {
          form: {
            caption: 'Common.MaxApplicableAmount',
            displayOrder: 8,
          },
          displayOrder: 8,
          caption: 'Common.MaxApplicableAmount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '200px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          hidden: true,
          minimumValue: '1',
        },
        maxUsageCount: {
          form: {
            caption: 'Common.MaxUsageCount',
            displayOrder: 9,
          },
          displayOrder: 8,
          caption: 'Common.MaxUsageCount',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'number',
          cssClasses: 'col-6 col-md-6',
          inlineEdit: true,
          newForm: true,
          editForm: true,
          minimumValue: '1',
        },
        createdDate: {
          displayOrder: 10,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'date',
          cssClasses: 'col-12 col-md-12',
          inlineEdit: false,
          newForm: false,
          editForm: false,
          customExport: (startDate) => {
            if (startDate) {
              const tempDate = new Date(startDate)
              return (
                tempDate.toLocaleDateString() +
                ' ' +
                tempDate.toLocaleTimeString()
              )
            }
            return ''
          },
        },
        EventId: {
          form: {
            caption: 'Common.EventApp',
            displayOrder: 10,
          },
          caption: 'Common.EventApp',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'lookup',
          cssClasses: 'col-6 col-md-6',
          hidden: true,
          inlineEdit: true,
          newForm: true,
          editForm: true,
          dataSource: {
            query: eventNames,
            defaultSort: 'createdDate DESC',
            type: 'graphql',
            model: 'Event',
            itemText: 'Title',
            itemValue: 'id',
            filter(data) {
              return {
                and: [
                  { EndDate: { gte: new Date() } },
                  { Status: `Open for registration` },
                ],
              }
            },
          },
        },
      },
      template: {
        name: 'discount-grid',
        context: {
          basePath: '/discountcodes',
        },
      },
      dataSource: {
        singularEntity: 'Drawer.DiscountCode',
        pluralEntity: 'Common.DiscountCodes',
        query: discountCodes,
        defaultSort: 'createdDate DESC',
        type: 'graphql',
        model: 'OfferCode',
      },
      title: 'Common.DiscountCodes',
      model: 'OfferCode',
    },
    discountMembers: {
      ui: {
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        showExpand: false,
        singleExpand: false,
        showSelect: false,
        hideFilter: false,
        hideSearch: true,
      },
      fields: {
        FirstName: {
          displayOrder: 2,
          caption: 'Common.FirstNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        LastName: {
          displayOrder: 3,
          caption: 'Common.LastNameCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '150px',
          type: 'string',
        },
        Email: {
          displayOrder: 4,
          caption: 'Common.EmailCaption',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '120px',
          type: 'string',
        },
        BusinessNumber: {
          displayOrder: 5,
          caption: 'Common.BusinessNumber',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'string',
        },
        createdDate: {
          displayOrder: 6,
          caption: 'Common.CreatedDate',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '180px',
          type: 'date',
        },
        Action: {
          displayOrder: 7,
          caption: 'Drawer.Action',
          searchEnable: true,
          sortEnable: true,
          columnWidth: '130px',
          type: 'string',
        },
      },
      template: {
        name: 'discountMember-grid',
        context: {
          basePath: '/discountcodes',
        },
        actions: {
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
        type: 'rest',
        getData: (ctx, isExporting = false) =>
          getData(`OfferCodes/${ctx.$route.params.id}/getMember`, isExporting),
      },
      hidden: true,
      title: 'discountMembers',
      type: 'list',
    },
  },
}

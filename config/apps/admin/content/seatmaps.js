import seatmapsList from '../gql/seatmapsList.gql'

export default {
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
}

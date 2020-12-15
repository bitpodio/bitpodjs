export const appList = (store) => [
  {
    name: 'event',
    label: 'Common.EventApp',
    css: 'fa fa-video fs-36 success--text',
    type: 'route',
    route: '/apps/event/list/Event/live and draft event',
    roles: ['$orguser', '$orgowner', 'EventAdmin', 'EventManager'],
  },
  {
    name: 'admin',
    label: 'Common.AdminApp',
    css: 'fa fa-cogs fs-36 primary--text',
    type: 'route',
    route: `/apps/admin/organization/${
      store.state.currentOrgInfo && store.state.currentOrgInfo.id
    }`,
    roles: ['EventAdmin', '$orgowner'],
  },
  {
    name: 'HelpCenter',
    label: 'Common.HelpCenterMap',
    css: 'fa fa-help-circle fs-36 warning--text',
    type: 'route',
    route: '/apps/help-center/',
    roles: ['$orguser'],
  },
  {
    name: 'Survey',
    label: 'Common.SurveyApp',
    css: 'fa fa-check-circle fs-36 success--text',
    type: 'url',
    href: 'https://dev-survey.bitpod.io/',
    roles: ['$orguser'],
  },
  {
    name: 'seatmap',
    label: 'Common.SeatMapNo',
    css: 'fa fa-grid-alt fs-36 primary--text',
    type: 'route',
    route: '/apps/seatmap/list/seatmaps/seatmaps',
    roles: ['$orguser'],
  },
  {
    name: 'integration',
    label: 'Common.Integration',
    css: 'fa fa fa-link1 fs-36 warning--text',
    type: 'route',
    route: '/apps/integration/list/integration/integration',
    roles: ['$orguser'],
  },
]

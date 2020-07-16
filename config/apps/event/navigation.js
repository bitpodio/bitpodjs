import content from './content'

export default {
  Events: {
    Events: {
      Content: {
        Contents: content.EventsManagement,
      },
      General: {
        Caption: 'Events',
        Description: '',
        Type: 'List',
      },
      Permissions: {
        Groups: '',
      },
      UI: {
        Icon: 'fa fa-calendar',
        'Icon Background Color': 'rgb(0, 0, 255)',
        Order: 3,
        Templates: '',
        Tooltip: 'All Events',
      },
    },
    Permissions: {
      Groups: ['EventAdmin', '$orgowner', 'EventManager'],
      Type: 'Assign',
    },
    Registrations: {
      Content: {
        Contents: content.Registrations,
      },
      General: {
        Caption: 'Registrations',
        Description: '',
        Type: 'List',
      },
      Permissions: {
        Groups: '',
      },
      UI: {
        Icon: 'fa fa-user-plus',
        'Icon Background Color': 'rgb(0, 0, 255)',
        Order: 3,
        Templates: '',
        Tooltip: 'Events',
      },
    },
  },
}

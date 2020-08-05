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
    Members: {
      EventCustomers: {
        Content: {
          Contents: content.EventCustomers,
        },
        General: {
          Caption: 'Members',
          Description: '',
          Type: 'List',
        },
        Permissions: {
          Groups: '',
        },
        UI: {
          Icon: 'fa fa- users',
          'Icon Background Color': 'rgb(0, 0, 255)',
          Templates: '',
          Tooltip: 'Members',
        },
      },
      Contacts: {
        Content: {
          Contents: content.Contacts,
        },
        General: {
          Caption: 'Contacts',
          Description: '',
          Type: 'List',
        },
        Permissions: {
          Groups: '',
        },
        UI: {
          Icon: 'fa fa-address-book-o',
          'Icon Background Color': 'rgb(0, 0, 255)',
          Templates: '',
          Tooltip: 'Contacts',
          Order: 1,
        },
      },
    },
  },
}

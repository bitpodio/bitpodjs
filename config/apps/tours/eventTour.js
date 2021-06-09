const eventTourSteps = (that) => [
  {
    target: '[data-tourOne-step="0"]',
    content: that.$t('Tour.tourOne-Steps.Step-0-CreateEvent'),
    params: {
      placement: 'bottom',
    },
  },
  {
    target: '[data-tourOne-step="1"]',
    content: that.$t('Tour.tourOne-Steps.Step-1-Eventboard'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourOne-step="2"]',
    content: that.$t('Tour.tourOne-Steps.Step-2-Event'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourOne-step="3"]',
    content: that.$t('Tour.tourOne-Steps.Step-3-Registrations'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourOne-step="4"]',
    content: that.$t('Tour.tourOne-Steps.Step-4-Contacts'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourOne-step="5"]',
    content: that.$t('Tour.tourOne-Steps.Step-5-DiscountCodes'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourOne-step="6"]',
    content: that.$t('Tour.tourOne-Steps.Step-6-HelpCenter'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tourOne-step="7"]',
    content: that.$t('Tour.tourOne-Steps.Step-7-LanguageSwitcher'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tourOne-step="8"]',
    content: that.$t('Tour.tourOne-Steps.Step-8-AppDrawer'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tourOne-step="9"]',
    content: that.$t('Tour.tourOne-Steps.Step-9-ProfileDetails'),
    params: {
      placement: 'top',
    },
  },
]
export default eventTourSteps

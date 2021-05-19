const eventTourSteps = (that) => [
  {
    target: '#v-step-0',
    content: that.$t('Tour.Steps.Step-0-CreateEvent'),
    params: {
      placement: 'bottom',
    },
  },
  {
    target: '#v-step-1',
    content: that.$t('Tour.Steps.Step-1-Eventboard'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '#v-step-2',
    content: that.$t('Tour.Steps.Step-2-Event'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '#v-step-3',
    content: that.$t('Tour.Steps.Step-3-Registrations'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '#v-step-4',
    content: that.$t('Tour.Steps.Step-4-Contacts'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '#v-step-5',
    content: that.$t('Tour.Steps.Step-5-DiscountCodes'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '#v-step-6',
    content: that.$t('Tour.Steps.Step-6-HelpCenter'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '#v-step-7',
    content: that.$t('Tour.Steps.Step-7-LanguageSwitcher'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '#v-step-8',
    content: that.$t('Tour.Steps.Step-8-AppDrawer'),
    params: {
      placement: 'top',
    },
  },
  {
    target: '#v-step-9',
    content: that.$t('Tour.Steps.Step-9-ProfileDetails'),
    params: {
      placement: 'top',
    },
  },
]
export default eventTourSteps

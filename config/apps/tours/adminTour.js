const adminTourSteps = (that) => [
  {
    target: '[data-tourTwo-step="0"]',
    content: that.$t('Tour.tourTwo-Steps.Step-0-CreateUser'),
    params: {
      placement: 'bottom',
    },
  },
  {
    target: '[data-tourTwo-step="1"]',
    content: that.$t('Tour.tourTwo-Steps.Step-1-Organization'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="2"]',
    content: that.$t('Tour.tourTwo-Steps.Step-2-Lookups'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="3"]',
    content: that.$t('Tour.tourTwo-Steps.Step-3-Templates'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="4"]',
    content: that.$t('Tour.tourTwo-Steps.Step-4-BadgeTemplates'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="5"]',
    content: that.$t('Tour.tourTwo-Steps.Step-5-RegistrationForm'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="6"]',
    content: that.$t('Tour.tourTwo-Steps.Step-6-TicketTemplates'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="7"]',
    content: that.$t('Tour.tourTwo-Steps.Step-7-Roles'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="8"]',
    content: that.$t('Tour.tourTwo-Steps.Step-8-Users'),
    params: {
      placement: 'left',
    },
  },
  {
    target: '[data-tourTwo-step="9"]',
    content: that.$t('Tour.tourTwo-Steps.Step-9-AccessKey'),
    params: {
      placement: 'left',
    },
  },
]
export default adminTourSteps

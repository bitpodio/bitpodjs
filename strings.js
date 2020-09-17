module.exports = Object.freeze({
  FIELD_REQUIRED: 'This field is required',

  // Event messages
  EVENT_START_DATE: 'Event start date should not be less than current date',
  EVENT_START_END_DATE: 'Event start date should not be greater than end date',
  UNIQUE_LINK_FORMAT: 'Lower case alphanumeric letters only',
  UNIQUE_LINK_DUPLICATE: 'This link has already been taken',

  // Ticket Messages
  TICKET_START_DT_MSG: 'Ticket start date should not be greater than end date',
  TICKET_END_DT_MSG: 'Ticket end date should be less than event end date.',
  TICKET_START_DT_CURRENT_DT:
    'Ticket start date should not be less than current date',
  TICKET_END_DT_CURRENT_DT:
    'Ticket end date should not be less than current date',

  // Recurring Event Messages
  EVENT_LINK_HINT: 'https://bitpod-event.test.bitpod.io/e/',
  ZOOM_DOCUMENT_LINK:
    'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Zoom/views/Zoom',
  GOOGLE_MEET_DOCUMENT_LINK:
    'https://bitpod-event.test.bitpod.io/admin/apps/HelpCenter/Integrations/Gmail/views/Gmail',

  MAX_ALLOW_MSG: 'Max Allow should be greater than zero',
  DURATION_RANGE: 'Duration should be greater than zero',
  ROLLING_DAYS_RANGE: 'Rolling days should be greater than zero',
  INVALID_PHONE_MSG: 'Please enter valid phone number!',
  ONLINE_MEETING_MSG: 'Please enter online meeting link!',
  LOCATION_MSG: 'Please select location!',
  START_END_DATE: 'Start Date should be less than End Date',
  END_START_DATE: 'End Date should be greater than Start Date',
  START_END_TIME: 'Start Time should not be greater than End Time',
  END_START_TIME: 'End Time should not be less than Start Time',
})

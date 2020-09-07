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
})

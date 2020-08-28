module.exports = Object.freeze({
  FIELD_REQUIRED: 'This field is required',
  ANOTHER_CONSTANT: 'another value',

  // Event messages
  EVENT_START_DATE: 'Event start date should not be less than current date',
  EVENT_START_END_DATE: 'Event start date should not be greater than end date',

  // Ticket Messages
  VALID_TICKET_MSG:
    'Please add valid tickets, check event end date with ticket end date',
  EVENT_TICKET_END_DT_MSG:
    'Event end date should not be less than ticket enddate',
  TICKET_START_DT_MSG: 'Ticket start date should not be greater than end date',
  TICKET_END_DT_MSG: 'Ticket end date should be less than event end date.',
})

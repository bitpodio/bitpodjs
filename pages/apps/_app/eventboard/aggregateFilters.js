export function sessionSoldData() {
  return {
    filterArray: [
      {
        type: 'addFields',
        filterQuery: {
          startdate: {
            $subtract: [
              '$StartDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
          enddate: {
            $subtract: [
              '$EndDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
        },
      },
      {
        type: 'match',
        filterQuery: {
          $and: [
            { $or: [{ startdate: { $lte: 0 } }, { startdate: { $gte: 0 } }] },
            { enddate: { $gte: 0 } },
            { Status: { $ne: 'Not ready' } },
          ],
        },
      },
      {
        type: 'lookup',
        filterQuery: {
          from: 'Registration',
          foreignField: 'EventId',
          localField: '_id',
          as: 'registration',
        },
      },
      {
        type: 'lookup',
        filterQuery: {
          from: 'Session',
          foreignField: 'EventId',
          localField: '_id',
          as: 'session',
        },
      },
      {
        type: 'group',
        filterQuery: {
          _id: '$session._id',
          sessionname: { $first: '$session.Name' },
          Events: { $first: '$session.EventId' },
          SessionId: { $first: '$registration.SessionId' },
          Status: { $first: '$registration.Status' },
          CustomerName: { $first: '$Title' },
        },
      },
      {
        type: 'project',
        filterQuery: {
          _id: 1,
          Status: 1,
          Events: 1,
          Name: '$CustomerName',
          SessionId: '$SessionId',
          sessionname: 1,
        },
      },
      { type: 'sort', filterQuery: { Name: -1 } },
    ],
  }
}

export function ticketSoldData() {
  return {
    filterArray: [
      {
        type: 'addFields',
        filterQuery: {
          createdDateInMS: {
            $subtract: [
              { $dateFromString: { dateString: new Date().toISOString() } },
              '$createdDate',
            ],
          },
        },
      },
      {
        type: 'match',
        filterQuery: {
          $and: [
            { createdDateInMS: { $lte: 864000000 } },
            { createdDateInMS: { $gte: 0 } },
            { Status: 'Success' },
          ],
        },
      },
      {
        type: 'group',
        filterQuery: {
          _id: {
            dayOfMonth: { $dayOfMonth: '$createdDate' },
            month: { $month: '$createdDate' },
          },
          TicketQuantity: { $sum: '$TicketQuantity' },
          createdDate: { $first: '$createdDate' },
        },
      },
      {
        type: 'project',
        filterQuery: {
          _id: 0,
          TicketQuantity: 1,
          day: { $dayOfMonth: '$createdDate' },
          month: { $month: '$createdDate' },
        },
      },
      { type: 'sort', filterQuery: { createdDate: -1 } },
    ],
  }
}

export function conversionData() {
  return {
    filterArray: [
      {
        type: 'addFields',
        filterQuery: {
          startdate: {
            $subtract: [
              '$StartDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
          enddate: {
            $subtract: [
              '$EndDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
        },
      },
      {
        type: 'match',
        filterQuery: {
          $and: [
            { $or: [{ startdate: { $lte: 0 } }, { startdate: { $gte: 0 } }] },
            { enddate: { $gte: 0 } },
            { Status: { $ne: 'Not ready' } },
          ],
        },
      },
      {
        type: 'lookup',
        filterQuery: {
          from: 'EmailAnalytic',
          foreignField: 'EventId',
          localField: '_id',
          as: 'emailAnalytic',
        },
      },
      {
        type: 'group',
        filterQuery: {
          _id: '$_id',
          Event: { $first: '$Title' },
          Country: { $first: '$_VenueAddress.Country' },
          Sent: { $first: '$emailAnalytic.Sent' },
          Open: { $first: '$emailAnalytic.Open' },
          isRegistered: { $first: '$emailAnalytic.isRegistered' },
        },
      },
      {
        type: 'project',
        filterQuery: {
          _id: 1,
          Country: 1,
          Event: 1,
          Sent: 1,
          Open: 1,
          isRegistered: 1,
        },
      },
    ],
  }
}

export function geoData() {
  return {
    filterArray: [
      {
        type: 'group',
        filterQuery: { _id: '$_CurrentAddress.City', total: { $sum: 1 } },
      },
      { type: 'project', filterQuery: { _id: 1, total: 1 } },
    ],
  }
}

export function pieData() {
  return {
    filterArray: [
      {
        type: 'addFields',
        filterQuery: {
          startdate: {
            $subtract: [
              '$StartDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
          enddate: {
            $subtract: [
              '$EndDate',
              { $dateFromString: { dateString: new Date().toISOString() } },
            ],
          },
        },
      },
      {
        type: 'match',
        filterQuery: {
          $and: [
            { $or: [{ startdate: { $lte: 0 } }, { startdate: { $gte: 0 } }] },
            { enddate: { $gte: 0 } },
            { Status: { $ne: 'Not ready' } },
          ],
        },
      },
      {
        type: 'lookup',
        filterQuery: {
          from: 'Registration',
          foreignField: 'EventId',
          localField: '_id',
          as: 'registration',
        },
      },
      {
        type: 'lookup',
        filterQuery: {
          from: 'Ticket',
          foreignField: 'Events',
          localField: '_id',
          as: 'ticket',
        },
      },
      {
        type: 'group',
        filterQuery: {
          _id: '$ticket._id',
          ticketname: { $first: '$ticket.Code' },
          Events: { $first: '$ticket.Events' },
          TicketId: { $first: '$registration.TicketId' },
          Status: { $first: '$registration.Status' },
          CustomerName: { $first: '$Title' },
        },
      },
      {
        type: 'project',
        filterQuery: {
          _id: 1,
          Status: 1,
          regname: 1,
          Events: 1,
          Name: '$CustomerName',
          TicketId: '$TicketId',
          count: { $size: '$TicketId' },
          ticketname: 1,
        },
      },
      { type: 'sort', filterQuery: { Name: -1 } },
    ],
  }
}

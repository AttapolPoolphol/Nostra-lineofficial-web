const actions = {
  CREATE_ISSUE_BAD_GPS: 'CREATE_ISSUE_BAD_GPS',
  SET_LOADING_ISSUE_CREATION: 'SET_LOADING_ISSUE_CREATION',
  SET_LOADING_COMPANY: 'SET_LOADING_COMPANY',
  SET_LOADING_VEHICLE: 'SET_LOADING_VEHICLE',

  GET_COMPANY: 'GET_COMPANY',
  SET_COMPANY: 'SET_COMPANY',
  GET_VEHICLE: 'GET_VEHICLE',
  SET_VEHICLE: 'SET_VEHICLE',

  SET_VIEW_ISSUE: 'SET_VIEW_ISSUE',

  GET_TICKET_DETAIL: 'GET_TICKET_DETAIL',
  SET_TICKET_DETAIL: 'SET_TICKET_DETAIL',
  SET_LOADING_TICKET_DETAIL: 'SET_LOADING_TICKET_DETAIL',

  CREATE_DLT: 'CREATE_DLT',
  SET_VIEW_DLT: 'SET_VIEW_DLT',
  SET_LOADING_DLT_REQUEST: 'SET_LOADING_DLT_REQUEST',

  createIssue: (title, companyId, vehicleId, license, remark) => ({
    type: actions.CREATE_ISSUE_BAD_GPS,
    title,
    companyId,
    vehicleId,
    license,
    remark
  }),

  createDLT: (companyId, vehicles) => ({
    type: actions.CREATE_DLT,
    companyId,
    vehicles
  }),
  getCompany: () => ({ type: actions.GET_COMPANY }),
  clearVehicles: () => ({ type: actions.SET_VEHICLE, payload: [] }),

  getVehicles: (companyId, keyword) => ({
    type: actions.GET_VEHICLE,
    companyId,
    keyword
  }),

  getTicketDetail: ticketId => ({
    type: actions.GET_TICKET_DETAIL,
    payload: ticketId
  })
}

export default actions

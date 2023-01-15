import actions from './actions'

const initialState = {
  isLoadingVehicleRequest: false,
  isLoadingIssueCreation: false,
  isLoadingCompany: false,
  isLoadingVehicle: false,
  isLoadingTicketDetail: false,
  companies: [],
  vehicles: [],
  viewIssue: {
    title: '',
    ticket: '',
    vehicleId: '',
    license: '',
    remark: ''
  },
  ticketDetail: {},
  viewDLT: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LOADING_ISSUE_CREATION:
      return { ...state, isLoadingIssueCreation: action.payload }
    case actions.SET_LOADING_COMPANY:
      return { ...state, isLoadingCompany: action.payload }
    case actions.SET_LOADING_VEHICLE:
      return { ...state, isLoadingVehicle: action.payload }
    case actions.SET_COMPANY:
      return { ...state, companies: action.payload }
    case actions.SET_VEHICLE:
      return { ...state, vehicles: action.payload }
    case actions.SET_VIEW_ISSUE:
      return {
        ...state,
        viewIssue: {
          title: action.title,
          ticket: action.ticket,
          vehicleId: action.vehicleId,
          license: action.license,
          remark: action.remark
        }
      }
    case actions.SET_TICKET_DETAIL:
      return { ...state, ticketDetail: action.payload }
    case actions.SET_LOADING_TICKET_DETAIL:
      return { ...state, isLoadingTicketDetail: action.payload }
    case actions.SET_VIEW_DLT:
      return { ...state, viewDLT: action.payload }
    case actions.SET_LOADING_DLT_REQUEST:
      return { ...state, isLoadingVehicleRequest: action.payload }

    default:
      return state
  }
}

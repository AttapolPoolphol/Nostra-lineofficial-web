import actions from './actions'

const initialState = {
  vehicle: {},
  isLoadingSubmitVehicle: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LOADING_VEHICLE_LOCATION:
      return { ...state, isLoadingSubmitVehicle: action.payload }
    case actions.SET_VEHICLE_LOCATION:
      return { ...state, vehicle: action.payload }

    default:
      return state
  }
}

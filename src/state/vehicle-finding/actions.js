const actions = {
  GET_VEHICLE_LOCATION: 'GET_VEHICLE_LOCATION',
  SET_VEHICLE_LOCATION: 'SET_VEHICLE_LOCATION',

  SET_LOADING_VEHICLE_LOCATION: 'SET_LOADING_VEHICLE_LOCATION',

  getVehicleLocation: (companyId, vehicleId, callback) => ({
    type: actions.GET_VEHICLE_LOCATION,
    companyId,
    vehicleId,
    callback
  })
}

export default actions

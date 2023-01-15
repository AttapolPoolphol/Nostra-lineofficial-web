import { requestTracking } from './rest-api'

class VehicleFindingApi {
  fleetMonitoring = async (companyId, vehicleIds) => {
    const body = { companyId, vehicleIds }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'gisc-companyid': companyId
    }

    return await requestTracking(
      'POST',
      '/api/fleetMonitoring/trackLocation/list',
      body,
      headers
    )
  }
}

export default new VehicleFindingApi()

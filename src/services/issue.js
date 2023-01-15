import { requestCore, requestTracking } from './rest-api'

const defaultAssociationNames = ['BusinessUnit.ChildBusinessUnits']

class IssueApi {
  create = async (companyId, vehicleId, remark) => {
    return await requestTracking('POST', '/api/ticket', {
      remark,
      ticketInsertDetails: [{ companyId, vehicleId }]
    })
  }

  get = async ticketId => {
    return await requestTracking('GET', `/api/ticket/${ticketId}`)
  }

  getBusinessUnits = async (
    companyId,
    includeAssociationNames = defaultAssociationNames
  ) => {
    const body = { companyId, includeAssociationNames }
    return await requestCore('POST', '/api/businessUnit/summary/list', body)
  }

  getCompany = async (isEnable = true) => {
    const body = { isEnable }
    return await requestCore('POST', '/api/company/summary/list', body)
  }

  getVehicles = async (companyId, keyword = '') => {
    const body = { companyId, keyword, displayLength: 5 }
    return await requestTracking('POST', '/api/vehicle/summary/list', body)
  }

  createDLT = async (companyId, vehicleIds) => {
    const body = { companyId, vehicleIds }
    return await requestCore('POST', '/api/DLTSendEmail/sendline', body)
  }
}

export default new IssueApi()

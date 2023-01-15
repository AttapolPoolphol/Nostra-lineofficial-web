import { all, put, call, takeEvery, fork } from 'redux-saga/effects'
import { navigate } from 'gatsby'

import actions from './actions'
import * as sagaUtils from '../utils'
import vehicleFindingApi from '../../services/vehicle-finding'

export function* getLocation() {
  yield takeEvery(actions.GET_VEHICLE_LOCATION, function* (action) {
    yield put({ type: actions.SET_LOADING_VEHICLE_LOCATION, payload: true })

    const profile = yield sagaUtils.loginToken()
    if (profile) {
      try {
        const { companyId, vehicleId } = action
        const comId = companyId ? companyId : profile.companyId

        const response = yield call(vehicleFindingApi.fleetMonitoring, comId, [
          vehicleId
        ])
        yield put({
          type: actions.SET_VEHICLE_LOCATION,
          payload: response.data
        })

        action.callback(response.data)
      } catch (error) {
        action.callback()
      } finally {
        yield put({
          type: actions.SET_LOADING_VEHICLE_LOCATION,
          payload: false
        })
      }
    } else {
      navigate('/')
    }
  })
}

export default function* rootSaga() {
  yield all([fork(getLocation)])
}

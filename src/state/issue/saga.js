import { all, put, call, takeEvery, fork, select } from 'redux-saga/effects'
import { navigate } from 'gatsby'

import actions from './actions'
import * as sagaUtils from '../utils'
import issueApi from '../../services/issue'
import replyLineApi from '../../services/reply-line'

export function* createIssue() {
  yield takeEvery(actions.CREATE_ISSUE_BAD_GPS, function* (action) {
    yield put({ type: actions.SET_LOADING_ISSUE_CREATION, payload: true })

    const profile = yield sagaUtils.loginToken()
    if (profile) {
      try {
        const uid = yield select(state => state.auth.uid)
        const { companyId, vehicleId, remark } = action
        const comId = companyId ? companyId : profile.companyId

        const response = yield call(issueApi.create, comId, vehicleId, remark)

        yield call(replyLineApi.ticket, uid, response.data)

        yield put({
          type: actions.SET_VIEW_ISSUE,
          title: action.title,
          ticket: response.data,
          vehicleId: action.vehicleId,
          license: action.license,
          remark: action.remark
        })

        navigate('/issue/submit-detail')
      } catch (error) {
      } finally {
        yield put({ type: actions.SET_LOADING_ISSUE_CREATION, payload: false })
      }
    } else {
      navigate('/')
    }
  })
}

export function* createDLT() {
  yield takeEvery(actions.CREATE_DLT, function* (action) {
    yield put({ type: actions.SET_LOADING_DLT_REQUEST, payload: true })

    const profile = yield sagaUtils.loginToken()
    if (profile) {
      try {
        const { companyId, vehicles } = action
        const vehicleIds = vehicles.map(item => item.id)
        const licenses = vehicles.map(item => item.license)
        const comId = companyId ? companyId : profile.companyId

        yield call(issueApi.createDLT, comId, vehicleIds)
        yield put({ type: actions.SET_VIEW_DLT, payload: licenses })

        navigate('/dlt-detail')
      } catch (error) {
      } finally {
        yield put({ type: actions.SET_LOADING_DLT_REQUEST, payload: false })
      }
    } else {
      navigate('/')
    }
  })
}

export function* getCompany() {
  yield takeEvery(actions.GET_COMPANY, function* () {
    yield put({ type: actions.SET_LOADING_COMPANY, payload: true })

    const profile = yield sagaUtils.loginToken()
    if (profile) {
      try {
        const company = yield call(issueApi.getCompany)

        yield put({
          type: actions.SET_COMPANY,
          payload: company.data.items
        })
      } catch (error) {
      } finally {
        yield put({ type: actions.SET_LOADING_COMPANY, payload: false })
      }
    } else {
      navigate('/')
    }
  })
}

export function* getVehicles() {
  yield takeEvery(actions.GET_VEHICLE, function* (action) {
    yield put({ type: actions.SET_LOADING_VEHICLE, payload: true })

    const profile = yield sagaUtils.loginToken()
    if (profile) {
      try {
        const { companyId, keyword } = action
        const comId = companyId ? companyId : profile.companyId

        const response = yield call(issueApi.getVehicles, comId, keyword)
        yield put({ type: actions.SET_VEHICLE, payload: response.data.items })
      } catch (error) {
      } finally {
        yield put({ type: actions.SET_LOADING_VEHICLE, payload: false })
      }
    } else {
      navigate('/')
    }
  })
}

export function* getTicketDetail() {
  yield takeEvery(actions.GET_TICKET_DETAIL, function* (action) {
    yield put({ type: actions.SET_LOADING_TICKET_DETAIL, payload: true })

    const user = yield sagaUtils.loginToken()
    if (user) {
      try {
        const response = yield call(issueApi.get, action.payload)
        yield put({
          type: actions.SET_TICKET_DETAIL,
          payload: response.data
        })
      } catch (error) {
      } finally {
        yield put({ type: actions.SET_LOADING_TICKET_DETAIL, payload: false })
      }
    } else {
      navigate('/')
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(createIssue),
    fork(getCompany),
    fork(getVehicles),
    fork(getTicketDetail),
    fork(createDLT)
  ])
}

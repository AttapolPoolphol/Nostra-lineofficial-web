import { call, select, put } from 'redux-saga/effects'
import authApi from '../services/auth'

import authActions from './auth/actions'

export function* loginToken() {
  let profile = null

  try {
    const uid = yield select(state => state.auth.uid)
    const response = yield call(authApi.loginToken, uid)
    profile = response.data

    yield put({ type: authActions.SET_PROFILE, payload: profile })
  } catch (error) {}

  return profile
}

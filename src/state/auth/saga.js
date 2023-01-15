import { all, put, call, takeEvery, fork, select } from 'redux-saga/effects'
import { navigate } from 'gatsby'

import actions from './actions'
import authApi from '../../services/auth'

export function* login() {
  yield takeEvery(actions.LOGIN_REQUEST, function* (action) {
    const { uid, username, password, callback } = action

    yield put({ type: actions.SET_LOADING_LOGIN_FORM, payload: true })
    try {
      const response = yield call(authApi.login, uid, username, password)
      const token = response.data.token

      localStorage.setItem(process.env.GATSBY_TOKEN_KEY, token)

      const redirectPath = yield select(state => state.auth.redirectPath)
      if (redirectPath) {
        yield put({ type: actions.SET_REDIRECT_PATH, payload: null })
        navigate(redirectPath)
      } else {
        callback()
      }
    } catch (error) {
      callback(error.response?.data?.message)
    } finally {
      yield put({ type: actions.SET_LOADING_LOGIN_FORM, payload: false })
    }
  })
}

export default function* rootSaga() {
  yield all([fork(login)])
}

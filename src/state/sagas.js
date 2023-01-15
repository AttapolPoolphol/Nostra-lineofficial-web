import { all } from 'redux-saga/effects'

import auth from './auth/saga'
import issue from './issue/saga'
import vehicle from './vehicle-finding/saga'

function* rootSaga() {
  yield all([auth(), issue(), vehicle()])
}

export default rootSaga

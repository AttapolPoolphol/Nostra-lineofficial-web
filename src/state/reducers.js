import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import issueReducer from './issue/reducer'
import vehicleReducer from './vehicle-finding/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  issue: issueReducer,
  vehicle: vehicleReducer
})

export default rootReducer

import actions from './actions'

const initialState = {
  isLoadingLoginForm: false,
  isLoadingAuthentication: false,
  redirectPath: null,
  uid: '',
  profile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LOADING_LOGIN_FORM:
      return { ...state, isLoadingLoginForm: action.payload }
    case actions.SET_REDIRECT_PATH:
      return { ...state, redirectPath: action.payload }
    case actions.SET_UID:
      return { ...state, uid: action.payload }
    case actions.SET_LOADING_AUTHENTICATION:
      return { ...state, isLoadingAuthentication: action.payload }
    case actions.SET_PROFILE:
      return { ...state, profile: action.payload }

    default:
      return state
  }
}

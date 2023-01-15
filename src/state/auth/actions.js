const actions = {
  SET_REDIRECT_PATH: 'SET_REDIRECT_PATH',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  SET_LOADING_LOGIN_FORM: 'SET_LOADING_LOGIN_FORM',
  SET_LOADING_AUTHENTICATION: 'SET_LOADING_AUTHENTICATION',
  SET_UID: 'SET_UID',
  SET_PROFILE: 'SET_PROFILE',

  login: (uid, username, password, callback) => {
    return { type: actions.LOGIN_REQUEST, uid, username, password, callback }
  },

  setUid: uid => ({ type: actions.SET_UID, payload: uid }),
  setRedirectPath: path => ({ type: actions.SET_REDIRECT_PATH, payload: path })
}

export default actions

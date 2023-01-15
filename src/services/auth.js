import { requestCore, requestTracking } from './rest-api'

class AuthApi {
  login = async (lineuuid, username, password) => {
    return await requestCore('POST', '/api/user/login', { lineuuid, username, password })
  }

  loginToken = async lineuuid => {
    const tokenKey = process.env.GATSBY_TOKEN_KEY
    const body = { lineuuid, token: localStorage.getItem(tokenKey) }

    try {
      const core = await requestCore('POST', '/api/user/loginByToken', body)
      await requestTracking('POST', '/api/user/loginByToken', body)

      return Promise.resolve(core)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new AuthApi()

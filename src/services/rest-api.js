import axios from 'axios'

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export async function request(method, path, data, headers = defaultHeaders) {
  const url = process.env.GATSBY_ENDPOINT + path

  return axios({ url, method, headers, data })
}

export async function requestCore(
  method,
  path,
  data,
  headers = defaultHeaders
) {
  const url = process.env.GATSBY_CORE_ENDPOINT + path

  return axios({ url, method, headers, data, withCredentials: true })
}

export async function requestTracking(
  method,
  path,
  data,
  headers = defaultHeaders
) {
  const url = process.env.GATSBY_TRACKING_ENDPOINT + path

  return axios({ url, method, headers, data, withCredentials: true })
}

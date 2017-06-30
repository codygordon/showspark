import qs from 'query-string'
import AuthService from './auth-service'

const auth0 = new AuthService()

const apiCall = async (params) => {
  let token = auth0.getToken() || localStorage.getItem('api_token')
  if (!token || !auth0.isTokenValid(token) || auth0.isTokenExpired(token)) {
    try {
      const res = await fetch('/api/v1/token')
      const apiToken = await res.text()
      if (apiToken.includes('error')) return new Error(apiToken)
      localStorage.setItem('api_token', apiToken)
      token = apiToken
    } catch (err) { return err }
  }
  let path = `/api/v1/${params.dataType}/${params.id || ''}`
  if (params.query) path = `${path}?${qs.stringify(params.query)}`
  const options = {
    method: params.method || 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  if (params.method) options.body = JSON.stringify(params.data || '')
  try {
    const res = await fetch(path, options)
    if (res.status >= 300) {
      const err = new Error(`Server error: status code ${res.status}`)
      err.status = res.status
      return err
    }
    const data = await res.json()
    return data
  } catch (err) { return err }
}

export default apiCall

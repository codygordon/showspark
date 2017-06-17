import qs from 'query-string'

const apiCall = (params, callback) => {
  const token = localStorage.getItem('id_token')
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
  fetch(path, options).then((res) => {
    if (res.status >= 200 && res.status < 300) return res
    const err = new Error()
    err.status = res.status
    err.message = res
    throw err
  }).then(res => res.json())
    .then(res => callback(res))
    .catch(err => callback(null, err))
}

export default apiCall

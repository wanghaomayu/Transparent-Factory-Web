import axios from 'axios'
// import { message } from 'antd'

const fetch = options => {
  let {
    method = 'get',
    data,
    url,
    token = false
  } = options
  const header = token ? {'token': window.localStorage.getItem('userToken')} : {}
  const myAxios = axios.create({
    timeout: 15000,
    headers: header
  })
  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, {
        params: data
      })
    case 'delete':
      return myAxios.delete(url, {
        data: data
      })
    case 'post':
      return myAxios.post(url, data)
    case 'put':
      return myAxios.put(url, data)
    case 'patch':
      return myAxios.patch(url, data)
    case 'export':
      return myAxios.get(url, {
        params: data,
        responseType: 'blob'
      })
    default:
      return myAxios(options)
  }
}

export default async options => {
  const res = await fetch(options)

  if (options.method === 'export') {
    let a = document.createElement('a')
    let url = window.URL.createObjectURL(res.data)
    a.download = options.filename
    a.href = url
    a.click()
    window.URL.revokeObjectURL(url)
    return
  }

  const {data: {code, data}} = res

  if (code !== 0) {
    throw new Error({type: 'NotExpect', code})
  }
  return data
}

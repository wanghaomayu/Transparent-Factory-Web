import { API, request } from '../utils'

const login = async (data) => {
  return request({
    url: API.login,
    method: 'post',
    token: true,
    data
  })
}
const exportF = async ({filename}) => {
  return request({
    url: 'http://nuedc.hrsoft.net/sysadmin/contest-record/export',
    method: 'export',
    token: true,
    filename
  })
}

export { login, exportF }

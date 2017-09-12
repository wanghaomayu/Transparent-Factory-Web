import { API, request } from '../../../utils'

const update = async (data) => request({
  url: API.updateMessage,
  method: 'put',
  token: true,
  data
})

export { update }

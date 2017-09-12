import { API, request } from '../../../utils'

const update = (data, id) => request({
  url: API.updateMessage,
  method: 'put',
  token: true,
  data,
})

export { update }

import { API, request } from '../../../utils'

const update = async (data, id) => request({
  url: API.updateMessage.replace(':id', id),
  method: 'put',
  token: true,
  data,
})

export { update }

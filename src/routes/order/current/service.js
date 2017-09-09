import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.myOrderCurrent,
  method: 'get',
  token: true,
  data
})

export { fetchTable }

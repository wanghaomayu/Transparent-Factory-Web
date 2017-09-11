import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.groupList,
  method: 'get',
  token: true,
  data,
})
const create = async (data) => request({
  url: API.createLeaders,
  method: 'post',
  token: true,
  data,
})
const update = async (data, id) => request({
  url: API.groupUpdate.replace(':id', id),
  method: 'put',
  token: true,
  data,
})

export { fetchTable, create, update }
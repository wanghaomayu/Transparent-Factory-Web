import {API, request} from '../../../utils/index'

const procedureAdd = async (data) => request({
  url: API.procedureAdd,
  token: true,
  method: 'post',
  data
})
const procedureDelete = async (procedureId) => request({
  url: API.procedureDelete.replace(':procedureId', procedureId),
  token: true,
  method: 'delete'
})
const procedureUpdate = async (data, procedureId) => request({
  url: API.procedureUpdate.replace(':procedureId', procedureId),
  token: true,
  method: 'put',
  data
})
const getProcedureList = async (orderId) => request({
  url: API.getProcedureList.replace(':orderId', orderId),
  token: true,
  method: 'get'
})
const getGroupProcedure = async (data, workGroupId) => request({
  url: API.getGroup.replace(':workGroupId', workGroupId),
  token: true,
  method: 'get',
  data
})
const procedureDetail = async (data, procedureId) => request({
  url: API.procedureDetail.replace(':procedureId', procedureId),
  token: true,
  method: 'get',
  data
})
const procedureLogs = async (procedureId) => request({
  url: API.procedureLogs.replace(':procedureId', procedureId),
  token: true,
  method: 'get',
})
const changeProcedureStatus = async (data, procedureId) => request({
  url: API.procedureStatus.replace(':procedureId', procedureId),
  token: true,
  method: 'put',
  data
})
const getGroupList = async (data) => request({
  url: API.groupList,
  token: true,
  method: 'get',
  data
})

export {
  procedureAdd,
  procedureDelete,
  procedureUpdate,
  getProcedureList,
  procedureDetail,
  getGroupProcedure,
  getGroupList,
  changeProcedureStatus,
  procedureLogs
}

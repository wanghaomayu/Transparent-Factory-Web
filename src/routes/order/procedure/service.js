import {API, request} from '../../../utils/index'

const procedureAdd = async (data) => request({
  url: API.procedureAdd,
  token: true,
  method: 'post',
  data
})
const procedureDelete = async (data, procedureId) => request({
  url: API.procedureDelete.replace(':procedureId', procedureId),
  token: true,
  method: 'delete',
  data
})
const procedureUpdate = async (data, procedureId) => request({
  url: API.procedureUpdate.replace(':procedureId', procedureId),
  token: true,
  method: 'put',
  data
})
const getProcedureList = async (data, workGroupId) => request({
  url: API.getProcedureList.replace(':workGroupId', workGroupId),
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
const procedureLogs = async (data, procedureId) => request({
  url: API.procedureLogs.replace(':procedureId', procedureId),
  token: true,
  method: 'get',
  data
})
const changeProcedureStatus = async (data, procedureId) => request({
  url: API.procedureStatus.replace(':procedureId', procedureId),
  token: true,
  method: 'put',
  data
})

export {
  procedureAdd,
  procedureDelete,
  procedureUpdate,
  getProcedureList,
  procedureDetail,
  changeProcedureStatus,
  procedureLogs
}

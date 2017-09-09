import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  //  order
  myOrderCurrent: apiMaker('order/current'),
  // procedure state edit by raoul
  procedureAdd: apiMaker('procedure/add'),
  getProcedureList: apiMaker('procedure/list/:workGroupId'),
  procedureDetail: apiMaker('procedure/detail/:procedureId'),
  procedureStatus: apiMaker('procedure/status/:procedureId'),
  procedureDelete: apiMaker('procedure/delete/:procedureId'),
  procedureUpdate: apiMaker('procedure/update/:procedureId'),
  procedureLogs: apiMaker('procedure/update/:procedureId/log')
  // end by raoul
}

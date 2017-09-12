import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  login: apiMaker('user/login'),
  //  order state edit by wanghaomayu
  myOrderCurrent: apiMaker('order/current'),
  myOrderUnstart: apiMaker('order/unstart'),
  myOrderPast: apiMaker('order/past'),
  createOrder: apiMaker('order'),
  updateOrder: apiMaker('order/:id'),
  // end by wanghaomayu
  // procedure state edit by raoul
  procedureAdd: apiMaker('procedure/add'),
  getProcedureList: apiMaker('order/:orderId/procedures'),
  getGroup: apiMaker('procedure/list/:workGroupId'),
  procedureDetail: apiMaker('procedure/detail/:procedureId'),
  procedureStatus: apiMaker('procedure/status/:procedureId'),
  procedureDelete: apiMaker('procedure/delete/:procedureId'),
  procedureUpdate: apiMaker('procedure/update/:procedureId'),
  procedureLogs: apiMaker('procedure/update/:procedureId/log'),
  // end by raoul
  //  list of list state by wanghaomayu
  groupList: apiMaker('group/list'),
  createLeaders: apiMaker('admin/leaders/create'),
  groupUpdate: apiMaker('list/update'),
  // end by wanghaomayu
  updateMessage: apiMaker('user/' + window.localStorage.getItem('id'))
}

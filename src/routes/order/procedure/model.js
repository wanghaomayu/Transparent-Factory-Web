// import pathToRegexp from 'path-to-regexp'
// import { message } from 'antd'
/* eslint-disable */

import {
  modalModel,
  tableModel,
  alertModel
} from '../../../models/modelExtend'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import {
  procedureAdd,
  procedureDelete,
  procedureUpdate,
  getProcedureList,
  procedureDetail,
  changeProcedureStatus,
  procedureLogs
} from './service'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'procedure',
  state: {},
  subscriptions: {
    appSubscriber({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order/current') {
          dispatch({type: 'fetchTable', payload: query})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },
  effects: {
    * fetchTable({payload = {}}, {call, select, put}) {
      const {tablePage, tableSize} = yield select(({current}) => current)
      const {page = 1, size = 50, force = false} = payload
      if (tablePage !== page || tableSize !== size || force) {
        const data = yield call(getProcedureList, {page, size})
        const {orders, totalCount} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: totalCount
        }
        const table = orders.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    }
  },
  reducers: {}
})

import modelExtend from 'dva-model-extend'
import {
  modalModel,
  tableModel,
  alertModel,
} from '../../../models/modelExtend'
// import pathToRegexp from 'path-to-regexp'
// import { message } from 'antd'
import { fetchTable } from './service'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'current',
  state: {},
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        console.log(1)
        if (pathname === '/home/current') {
          dispatch({type: 'fetchTable', payload: query})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {tablePage, tableSize} = yield select(({current}) => current)
      const {page = 1, size = 50, force = false} = payload
      if (tablePage !== page || tableSize !== size || force) {
        const data = yield call(fetchTable, {page, size})
        console.log(data)
        if (data.code === 0) {
          const {data: {orders, totalCount}} = data
          const tableConfig = {
            tablePage: page,
            tableSize: size,
            tableCount: totalCount
          }
          const table = orders.map((t, i) => ({
            ...t,
            fakeId: i + 1 + (page - 1) * size,
          }))
          yield put({type: 'setTable',payload: table})
          yield put({type: 'setTableConfig',payload: tableConfig})
        }
      }
    }
  },
  reducers: {},
})

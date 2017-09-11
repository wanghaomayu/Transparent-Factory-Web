import modelExtend from 'dva-model-extend'
import {
  modalModel,
  tableModel,
  alertModel
} from '../../../models/modelExtend'
// import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
import {fetchTable, create, update} from './service'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'current',
  state: {
    orderCode: []
  },
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
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {tablePage, tableSize} = yield select(({current}) => current)
      const {page = 1, size = 50, force = false} = payload
      if (tablePage !== page || tableSize !== size || force) {
        const data = yield call(fetchTable, {page, size})
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
    },
    * create({payload}, {put, call}) {
      const orderCode = yield call(create, payload)
      console.log(orderCode)
      yield put({type: 'fetchTable', payload: {force: true}})
      message.success('创建成功')
      yield put({type: 'changeOrderCode', payload: orderCode})
      yield put({type: 'hideModal'})
      yield put({type: 'showAlert'})
    },
    * update({payload}, {select, call, put}) {
      const {id} = yield select(({current}) => current.modalContent)
      yield call(update, payload, id)
      yield put({type: 'hideModal'})
      message.success('修改成功')
      yield put({type: 'fetchTable', payload: {force: true}})
    }
  },
  reducers: {
    changeOrderCode(state, {payload: orderCode}) {
      return {
        ...state,
        orderCode
      }
    }
  }
})

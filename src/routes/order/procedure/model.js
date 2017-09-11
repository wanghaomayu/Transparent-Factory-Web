// import pathToRegexp from 'path-to-regexp'
// import { message } from 'antd'
/* eslint-disable */
import modelExtend from 'dva-model-extend'
import {
  modalModel,
  tableModel,
  alertModel
} from '../../../models/modelExtend'
import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
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
  state: {order_code: ''},
  subscriptions: {
    appSubscriber({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order/procedure') {
          const {order_code} = query
          dispatch({type: 'init', payload: query})
          dispatch({type: 'fetchTable', payload: order_code})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },
  effects: {
    * init({payload}, {put}) {
      yield put({type: 'saveQuery', payload})
    },
    * fetchTable({payload}, {call, select, put}) {
      const {query} = yield select(({procedure}) => procedure)
      const {id} = query
      const data = yield call(getProcedureList, id)
      yield put({type: 'setTable', payload: data.procedures})
    },
    * create({payload}, {put, call, select}) {
      const data = yield call(procedureAdd, payload)
      console.log(data)
      console.log('this is the create dispatch')
      message.success('创建成功')
      yield put({type: 'fetchTable', payload})
      yield put({type: 'hideModal'})
      yield put({type: 'showAlert'})
    }
  },
  reducers: {
    saveQuery(state, {payload: query}) {
      return {
        ...state,
        query
      }
    }
  }
})

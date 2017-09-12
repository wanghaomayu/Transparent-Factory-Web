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
  getGroupList,
  getGroupProcedure,
  changeProcedureStatus,
  procedureLogs
} from './service'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'procedure',
  state: {query: {}},
  subscriptions: {
    appSubscriber({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order/procedure') {
          dispatch({type: 'init', payload: query})
          dispatch({type: 'fetchGroupList'})
          dispatch({type: 'fetchTable'})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },
  effects: {
    * init({payload}, {put, call}) {
      yield put({type: 'saveQuery', payload})
    },
    * fetchGroupList({}, {call, put}) {
      const data = yield call(getGroupList)
      yield put({type: 'saveGroupList', payload: data.records})
    },
    * fetchTable({}, {call, select, put}) {
      const {query} = yield select(({procedure}) => procedure)
      const {id, order_id} = query
      // 某时 给我传id .某时，给我传order_id.绝望
      const data = yield call(getProcedureList, id || order_id)
      yield put({type: 'setTable', payload: data.procedures})
    },
    * create({payload}, {put, call, select}) {
      const data = yield call(procedureAdd, payload)
      message.success('创建成功')
      yield put({type: 'fetchTable'})
      yield put({type: 'hideModal'})
      yield put({type: 'showAlert'})
    },
    * update({payload}, {put, call, select}) {
      const data = yield call(procedureUpdate, payload, payload.id)
      message.success('修改成功')
      yield put({type: 'fetchTable'})
      yield put({type: 'hideModal'})
      yield put({type: 'showAlert'})
    },
    * delete({payload}, {put, call, select}) {
      const data = yield call(procedureDelete, payload)
      message.success('删除成功')
      yield put({type: 'fetchTable'})
      yield put({type: 'showAlert'})
    },
    * toggleStatus({payload}, {put, call, select}) {
      let {status, id} = payload
      if (status === 0) {
        status += 1
      } else {
        status = 0
      }
      const data = yield call(changeProcedureStatus, {status}, id)
      message.success(status ? '开始生产' : '停止生产')
      yield put({type: 'fetchTable'})
      yield put({type: 'showAlert'})
    }
  },
  reducers: {
    saveQuery(state, {payload: query}) {
      return {
        ...state,
        query
      }
    },
    saveGroupList(state, {payload: groupList}) {
      return {
        ...state,
        groupList
      }
    }
  }
})

import { login } from '../../services/app'
import { routerRedux } from 'dva/router'
import { sleep } from '../../utils'

export default {
  namespace: 'login',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
      })
    },
  },
  state: {},
  effects: {
    * login ({payload}, {put, call}) {
      const body = {
        client: '2',
        ...payload
      }
      const data = yield call(login, body)
      const {token, user} = data
      window.localStorage.setItem('userToken', token)
      window.localStorage.setItem('userName', user.name)
      window.localStorage.setItem('mobile', user.mobile)
      yield put({type: 'app/setUser', payload: user})
      yield put({type: 'app/setInfo', payload: {token: token}})
      yield put(routerRedux.push('/order/current'))
      // yield put({type: 'current/fetchTable', payload: {force: true}})
    }
  },
  reducers: {},
}

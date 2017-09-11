import { update } from './service'
export default {
  namespace: 'phone',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('phone')
      })
    }
  },
  state: {},
  effects: {
    * phone ({payload}, {put, call}) {
      console.log('sucess')
      const body = {
        client: '2',
        ...payload
      }
      const data = yield call(update, body)
      const {token, user} = data
      window.localStorage.setItem('userToken', token)
      window.localStorage.setItem('userName', user.name)
      window.localStorage.setItem('mobile', user.mobile)
      // yield put({type: 'app/setUser', payload: user})
      // yield put({type: 'app/setInfo', payload: {token: token}})
      // yield put(routerRedux.push('/order/current'))
    }
  },
  reducers: {
  }
}

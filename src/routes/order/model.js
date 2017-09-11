import { routerRedux } from 'dva/router'
export default {
  namespace: 'order',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/order') {
          dispatch(routerRedux.push('/order/current'))
        }
      })
    }
  },
  effects: {},
  state: {
    query: {}
  },
  reducers: {
    saveQuery (state,{payload}) {
      const query = {
        ...state.query,
        payload
      }
      return {
        ...state,
        query
      }
    }
  }
}

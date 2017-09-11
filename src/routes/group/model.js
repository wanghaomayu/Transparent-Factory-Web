import { routerRedux } from 'dva/router'

export default {
  namespace: 'group',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/group') {
          dispatch(routerRedux.push('/group/message'))
        }
      })
    },
  },
  effects: {},
  state: {},
  reducers: {},
}

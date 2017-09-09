export default {
  namespace: 'login',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        dispatch({type: 'query'})
      })
    }
  },
  state: {},
  effects: {
    * query () {
    }
  },
  reducers: {}
}

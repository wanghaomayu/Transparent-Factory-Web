export default {
  namespace: 'current',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('current')
      })
    }
  },
  state: {},
  reducers: {}
}

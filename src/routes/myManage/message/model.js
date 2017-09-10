export default {
  namespace: 'message',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('message')
      })
    }
  },
  state: {},
  reducers: {}
}

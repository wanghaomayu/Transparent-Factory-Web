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
  reducers: {}
}

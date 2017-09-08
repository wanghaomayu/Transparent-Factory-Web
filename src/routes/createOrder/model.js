export default {
  namespace: 'createOrder',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('createOrder')
      })
    }
  },
  state: {},
  reducers: {}
}
export default {
  namespace: 'home',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('home')
      })
    }
  },
  state: {},
  reducers: {}
}
export default {
  namespace: 'unStart',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('unStart')
      })
    }
  },
  state: {},
  reducers: {}
}

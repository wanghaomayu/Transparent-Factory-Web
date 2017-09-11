export default {
  namespace: 'correct',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('correct')
      })
    }
  },
  state: {},
  reducers: {}
}

export default {
  namespace: 'adminContest',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('adminContest')
      })
    }
  },
  state: {},
  reducers: {}
}
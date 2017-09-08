export default {
  namespace: 'past',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('past')
      })
    }
  },
  state: {},
  reducers: {}
}

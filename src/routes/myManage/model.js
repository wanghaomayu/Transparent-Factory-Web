export default {
  namespace: 'myManage',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('myManage')
      })
    }
  },
  state: {},
  reducers: {}
}

export default {
  namespace: 'home',
  subscriptions: {},
  effects: {},
  state: {
    query: {}
  },
  reducers: {
    saveQuery (state,{payload}) {
      const query = {
        ...state.query,
        payload
      }
      return {
        ...state,
        query
      }
    }
  }
}
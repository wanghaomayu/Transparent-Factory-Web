module.exports = {
  path: 'order',
  getIndexRoute(nextState, cb) {
    require.ensure([], require => {
      cb(null, {component: require('./current/index')})
    })
  },
  getComponents(nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  },
  getChildRoutes({location}, cb) {
    cb(null, [
      require('./current/route'),
      require('./unstart/route'),
      require('./past/route'),
      require('./procedure/route')
    ])
  }
}

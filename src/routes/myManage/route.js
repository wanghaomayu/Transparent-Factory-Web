module.exports = {
  path: 'myManage',
  getIndexRoute (nextState, cb) {
    require.ensure([], require => {
      cb(null, {component: require('./message/index')})
    })
  },
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  },
  getChildRoutes ({location}, cb) {
    cb(null, [
      require('./message/route'),
      require('./correct/route'),
      require('./phone/route'),
      require('./group/route')
    ])
  }
}

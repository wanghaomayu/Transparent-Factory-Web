module.exports = {
  path: 'myOrder',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  },
  getChildRoutes ({location}, cb) {
    cb(null, [
      require('./current/route'),
      require('./unstart/route'),
      require('./past/route')
    ])
  }
}

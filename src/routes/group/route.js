module.exports = {
  path: 'group',
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
      require('./list/route')
    ])
  }
}

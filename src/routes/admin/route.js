module.exports = {
  path: 'admin',
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  },
  getChildRoutes({location}, cb) {
    cb(null, [
      require('./contest/route')
    ])
  }
}

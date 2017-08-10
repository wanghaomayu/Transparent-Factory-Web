module.exports = {
  path: 'home',
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}

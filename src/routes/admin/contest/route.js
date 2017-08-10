module.exports = {
  path: 'contest',
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}

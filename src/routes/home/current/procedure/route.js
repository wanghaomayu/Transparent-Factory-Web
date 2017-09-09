module.exports = {
  path: 'procedure',
  getComponents(nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}

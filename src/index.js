import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message } from 'antd'
import { codeHelper } from './utils'
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  history: browserHistory,
  onError (error) {
    if (error.type === 'NotExpect') {
      codeHelper(error.code)
    } else if (error.message) {

    } else {
      message.error(error.message)
    }
  }
})

// 2. Model
app.model(require('./models/app.js'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

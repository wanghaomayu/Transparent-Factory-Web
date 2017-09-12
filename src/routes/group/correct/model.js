import { update } from './service'
import { message } from 'antd'
export default {
  namespace: 'correct',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('correct')
      })
    }
  },
  state: {},
  effects: {
    * update ({payload}, {call, put}) {
      yield call(update, payload)
      message.success('修改成功')
    }
  },
  reducers: {
  }
}

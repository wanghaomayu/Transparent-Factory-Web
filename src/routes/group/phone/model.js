import { update } from './service'
import { message } from 'antd'
export default {
  namespace: 'phone',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('phone')
      })
    }
  },
  state: {},
  effects: {
    * update ({payload}, {call, put}) {
      console.log(1)
      yield call(update, payload)
      message.success('修改成功')
    }
  },
  reducers: {
  }
}

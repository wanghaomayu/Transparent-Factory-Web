/**
 * Created by out_xu on 17/8/10.
 */

import { menus } from './config'
import { routerRedux } from 'dva/router'
export default {
  namespace: 'admin',
  state: {
    menus,
    adminQuery: {}
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/admin') {
          dispatch(routerRedux.push('/admin/contest'))
        }
      })
    }
  },
  reducers: {}
}

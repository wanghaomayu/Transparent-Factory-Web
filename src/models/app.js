import { query } from '../services/app'
import { sleep } from '../utils'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'app',
  state: {
    user: JSON.parse(window.localStorage.getItem('nuedcUser') || '{}'),
    token: window.localStorage.getItem('nuedcToken') || '',
    nobg: []
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const role = window.localStorage.getItem('userToken')
        const match = pathToRegexp(`/${role}/:params`).exec(pathname)
        if (!!match || pathname === `/${role}`) {
          !!window.localStorage.getItem('nuedcToken') && dispatch({type: 'query'})
        }
      })
    }
  },
  effects: {
    * query ({}, {call, put, select}) {
      const data = yield call(query)
      if (data.code === 0) {
        yield put({type: 'setUser', payload: data.user})
      } else {
        yield call(sleep, 1000)
        yield put({type: 'login/logout'})
        yield put({type: 'setInfo', payload: {token: ''}})
      }
    }
  },
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    logout (state) {
      return {
        ...state,
        user: {}
      }
    },
    setInfo (state, {payload: {token}}) {
      return {
        ...state,
        token
      }
    },
    setUser (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    saveQuery (state, {payload}) {
      const query = {
        ...state.query,
        payload
      }
      return {
        ...state,
        query
      }
    }
  }
}

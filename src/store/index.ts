import { combineReducers, createStore, compose, applyMiddleware, Reducer } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, RouterAction, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { GlobalActions } from 'src/store/global-actions'
import global from './global-reducer'

export const history = createBrowserHistory()

const reducers = combineReducers({
  router: connectRouter(history),
  global,
})

type GetIStateFromReducer<T> = T extends Reducer<infer S, any> ? S : never

export type RootStore = GetIStateFromReducer<typeof reducers>

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<RootStore, RouterAction | GlobalActions, unknown, unknown>(
  reducers,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
)

export default store

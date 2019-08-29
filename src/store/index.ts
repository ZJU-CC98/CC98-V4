import { combineReducers, createStore, compose, applyMiddleware, Reducer } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import examplePageReducer from 'src/pages/example/example-page-reducer'
import global from './global-reducer'

export const history = createBrowserHistory()

const reducers = combineReducers({
  examplePageReducer,
  router: connectRouter(history),
  global,
})

type GetIStateFromReducer<T> = T extends Reducer<infer S, any> ? S : never

export type RootStore = GetIStateFromReducer<typeof reducers>

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
)

export default store

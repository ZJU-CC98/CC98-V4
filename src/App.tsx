import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'
import BasicLayout from './layout/BasicLayout'

import Home from './pages/home/Home'
import ExamplePageRoot from './pages/example/ExamplePageRoot'

export const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BasicLayout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/example" component={ExamplePageRoot} />
          <Route path="*" component={() => <div>Not Fount</div>} />
        </Switch>
      </BasicLayout>
    </ConnectedRouter>
  </Provider>
)

export default hot(App)

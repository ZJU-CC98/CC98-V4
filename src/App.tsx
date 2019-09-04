import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from 'src/store'
import BasicLayout from 'src/layout/BasicLayout'

import Home from 'src/pages/home/Home'
import ExamplePageRoot from 'src/pages/example/ExamplePageRoot'
import Login from 'src/pages/login/Login'

export const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BasicLayout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={Login} />
          <Route path="/example" component={ExamplePageRoot} />
          <Route path="*" component={() => <div>Not Fount</div>} />
        </Switch>
      </BasicLayout>
    </ConnectedRouter>
  </Provider>
)

export default hot(App)

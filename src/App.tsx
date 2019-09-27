import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from 'src/store'
import BasicLayout from 'src/layout/BasicLayout'
import ProdErrorBoundary from 'src/components/ErrorBoundary'

import Home from 'src/pages/home/Home'
import Login from 'src/pages/login/Login'
import BoardList from 'src/pages/boardList/BoardList'
import Board from 'src/pages/board/Board'
import Topic from 'src/pages/topic/Topic'
import NewTopics from 'src/pages/newTopics/NewTopics'
import HotWeekly from 'src/pages/topic/hotWeekly/HotWeekly'
import HotMonthly from 'src/pages/topic/hotMonthly/HotMonthly'
import HotHistory from 'src/pages/topic/hotHistory/HotHistory'
import Focus from 'src/pages/focus/Focus'

const ErrorBoundary = process.env.NODE_ENV === 'production' ? ProdErrorBoundary : React.Fragment

export const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BasicLayout>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/board-list" component={BoardList} />
            <Route path="/board/:id/:page?" component={Board} />
            <Route path="/sign-in" component={Login} />
            <Route path="/logon" component={Login} />
            <Route path="/new-topics" component={NewTopics} />
            <Route path="/focus" component={Focus} />
            <Route path="/topic/hot-weekly" component={HotWeekly} />
            <Route path="/topic/hot-monthly" component={HotMonthly} />
            <Route path="/topic/hot-history" component={HotHistory} />
            <Route path="/topic/:topicId/postId/:postId/page:?" component={Topic} />
            <Route path="/topic/:topicId/:page?" component={Topic} />
            <Route
              path="/error"
              component={() => {
                throw new Error('test')
              }}
            />
            <Route path="*" component={() => <div>Not Fount</div>} />
          </Switch>
        </BasicLayout>
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>
)

export default hot(App)

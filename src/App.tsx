import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from 'src/store'
import BasicLayout from 'src/layout/BasicLayout'
import ProdErrorBoundary from 'src/components/ErrorBoundary'

import Home from 'src/pages/home/Home'
import LogOn from 'src/pages/log-on/LogOn'
import BoardList from 'src/pages/board-list/BoardList'
import Board from 'src/pages/board/Board'
import Topic from 'src/pages/topic/Topic'
import NewTopics from 'src/pages/new-topics/NewTopics'
import HotWeekly from 'src/pages/topic/hotWeekly/HotWeekly'
import HotMonthly from 'src/pages/topic/hotMonthly/HotMonthly'
import HotHistory from 'src/pages/topic/hotHistory/HotHistory'
import Focus from 'src/pages/focus/Focus'
import Search from 'src/pages/search/Search'
import UserCenter from 'src/pages/user-center/UserCenter'
import User from 'src/pages/user-center/User'
import SendTopic from 'src/pages/editor/send-topic/SendTopic'

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
            <Route path="/sign-in" component={LogOn} />
            <Route path="/logon" component={LogOn} />
            <Route path="/new-topics" component={NewTopics} />
            <Route path="/focus" component={Focus} />
            <Route path="/search" component={Search} />
            <Route path="/user-center" component={UserCenter} />
            <Route path="/user/:id" component={User} />
            <Route path="/topic/hot-weekly" component={HotWeekly} />
            <Route path="/topic/hot-monthly" component={HotMonthly} />
            <Route path="/topic/hot-history" component={HotHistory} />
            <Route path="/topic/:topicId/postId/:postId/page:?" component={Topic} />
            <Route path="/topic/:topicId/:page?" component={Topic} />
            <Route path="/editor/send-topic" component={SendTopic} />
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

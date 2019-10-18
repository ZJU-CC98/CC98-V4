import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from 'src/store'
import BasicLayout from 'src/layout/BasicLayout'
import Route from 'src/components/CustomRoute'
import ProdErrorBoundary from 'src/components/ErrorBoundary'

import Home from 'src/pages/home/Home'
import LogOn from 'src/pages/log-on/LogOn'
import BoardList from 'src/pages/board-list/BoardList'
import Board from 'src/pages/board/Board'
import Topic from 'src/pages/topic/Topic'
import NewTopics from 'src/pages/new-topics/NewTopics'
import HotWeekly from 'src/pages/topic/hot-weekly/HotWeekly'
import HotMonthly from 'src/pages/topic/hot-monthly/HotMonthly'
import HotHistory from 'src/pages/topic/hot-history/HotHistory'
import Focus from 'src/pages/focus/Focus'
import Search from 'src/pages/search/Search'
import Message from 'src/pages/message/Message'
import UserCenter from 'src/pages/user-center/UserCenter'
import User from 'src/pages/user-center/User'
import SendTopic from 'src/pages/editor/send-topic/SendTopic'
import EditPost from 'src/pages/editor/edit-post/EditPost'
import NotFound from 'src/components/Error/NotFound'

const ErrorBoundary = process.env.NODE_ENV === 'production' ? ProdErrorBoundary : React.Fragment

export const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BasicLayout>
          <Switch>
            <Route path="/" component={Home} exact />

            <Route path="/log-on" component={LogOn} />
            <Route path="/sign-in" component={LogOn} needLogOn />

            <Route path="/board-list" component={BoardList} />
            <Route path="/board/:id/:page?" component={Board} />

            <Route path="/focus" component={Focus} needLogOn />

            <Route path="/search" component={Search} needLogOn />
            <Route path="/new-topics" component={NewTopics} needLogOn />
            <Route path="/topic/hot-weekly" component={HotWeekly} needLogOn />
            <Route path="/topic/hot-monthly" component={HotMonthly} needLogOn />
            <Route path="/topic/hot-history" component={HotHistory} needLogOn />

            <Route path="/message" component={Message} needLogOn />

            <Route path="/user-center" component={UserCenter} needLogOn />
            <Route path="/user/:id" component={User} />

            <Route path="/topic/:topicId/track/:postId/:page?" component={Topic} />
            <Route path="/topic/:topicId/:page?" component={Topic} />

            <Route path="/editor/send-topic/:boardId" component={SendTopic} needLogOn />
            <Route path="/editor/edit-post/:postId" component={EditPost} needLogOn />

            <Route path="*" component={NotFound} />
          </Switch>
        </BasicLayout>
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>
)

export default hot(App)

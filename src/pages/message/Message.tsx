import React from 'react'
import Nav, { INavItem } from 'src/components/Nav'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import { MESSAGE_BASE_PATH as BASE_PATH } from './constants'
import MessageResponse from './response/MessageResponse'
import MessageAtMe from './at-me/MessageAtMe'
import MessageSystem from './system/MessageSystem'
import s from './Message.m.scss'

const navs: INavItem[] = [
  {
    name: '回复我的',
    path: '/response',
    Component: MessageResponse,
    pathSuffix: '/:page?',
  },
  {
    name: '@ 我的',
    path: '/at-me',
    Component: MessageAtMe,
    pathSuffix: '/:page?',
  },
  {
    name: '系统通知',
    path: '/system',
    Component: MessageSystem,
    pathSuffix: '/:page?',
  },
  {
    name: '我的私信',
    path: '/message',
    Component: () => null,
  },
  {
    name: '消息设置',
    path: '/setting',
    Component: () => null,
  },
]

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '我的消息',
]

const Message: React.FC<RouteComponentProps> = () => {
  useBreadcrumb(breadcrumb)

  return (
    <div className={s.root}>
      <Nav basePath={BASE_PATH} navs={navs} />
      <div className={s.content}>
        <Switch>
          {navs.map(({ Component, path, exact, pathSuffix = '' }) => (
            <Route
              key={path}
              path={`${BASE_PATH}${path}${pathSuffix}`}
              exact={exact}
              component={Component}
            />
          ))}
          <Redirect to={`${BASE_PATH}${navs[0].path}`} />
        </Switch>
      </div>
    </div>
  )
}

export default Message

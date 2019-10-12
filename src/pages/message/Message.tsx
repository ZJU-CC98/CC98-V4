import React from 'react'
import Nav, { INavItem } from 'src/components/Nav'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

const navs: INavItem[] = [
  {
    name: '回复我的',
    path: '/response',
    Component: () => null,
  },
  {
    name: '@ 我的',
    path: '/at-me',
    Component: () => null,
  },
  {
    name: '系统通知',
    path: '/system',
    Component: () => null,
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

const BASE_PATH = '/message'

const Message: React.FC<RouteComponentProps> = () => {
  useBreadcrumb(breadcrumb)

  return (
    <div>
      <Nav basePath={BASE_PATH} navs={navs} />
      <div>
        <Switch>
          {navs.map(({ Component, path, exact, pathSuffix = '' }) => (
            <Route
              key={path}
              path={`/user/:id${path}${pathSuffix}`}
              exact={exact}
              component={Component}
            />
          ))}
          <Redirect to="/message/response" />
        </Switch>
      </div>
    </div>
  )
}

export default Message

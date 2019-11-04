import React from 'react'
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons'
import { BreadcrumbItem } from 'src/components/Breadcrumb'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import Nav, { INavItem } from 'src/components/Nav'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

import UserHome from './home/UserHome'

import s from './User.m.scss'

const breadcrumb: BreadcrumbItem[] = [
  {
    name: '首页',
    url: '/',
  },
  '用户信息',
]

const navs: INavItem[] = [
  {
    name: '主页',
    icon: faHome,
    path: '/',
    exact: true,
    Component: UserHome,
  },
  {
    name: '管理',
    icon: faCog,
    path: '/manage',
    Component: () => null,
  },
]

interface IRouteMatch {
  id: string
}

const User: React.FC<RouteComponentProps<IRouteMatch>> = ({ match }) => {
  useBreadcrumb(breadcrumb)
  useDocumentTitle('用户详情')

  const { id } = match.params
  const basePath = `/user/${id}`

  return (
    <div className={s.root}>
      <Nav basePath={basePath} navs={navs} />
      <div className={s.content}>
        <Switch>
          {navs.map(({ Component, path, exact, pathSuffix = '' }) => (
            <Route
              key={path}
              path={`/user/:id${path}${pathSuffix}`}
              exact={exact}
              component={Component}
            />
          ))}
          <Redirect to={basePath} />
        </Switch>
      </div>
    </div>
  )
}

export default User

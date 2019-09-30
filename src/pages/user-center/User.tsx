import React from 'react'
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons'
import { BreadcrumbItem } from 'src/components/Breadcrumb'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import { RouteComponentProps } from 'react-router'
import s from './User.m.scss'
import UserCenterNav, { INavItem } from './components/UserCenterNav'

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
  },
  {
    name: '管理',
    icon: faCog,
    path: '/manage',
  },
]

interface IRouteMatch {
  id: string
}

const User: React.FC<RouteComponentProps<IRouteMatch>> = ({ match }) => {
  useBreadcrumb(breadcrumb)

  const { id } = match.params

  return (
    <div className={s.root}>
      <UserCenterNav basePath={`/user/${id}`} navs={navs} />
    </div>
  )
}

export default User

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { useDispatch } from 'react-redux'
import {
  faCog,
  faCreditCard,
  faHeart,
  faHome,
  faMagic,
  faPenSquare,
  faRss,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

import { BreadcrumbItem } from 'src/components/Breadcrumb'
import { refreshUserInfo } from 'src/store/global-async-actions'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import UserCenterNav, { INavItem } from './components/UserCenterNav'
import { USER_CENTER_BASE_PATH } from './constants'

import UserTopic from './topic/UserTopic'
import UserFavorite from './favorite/UserFavorite'
import UserCustomBoard from './custom-board/UserCustomBoard'
import UserFollowing from './following/UserFollowing'
import UserFan from './fan/UserFan'
import TransferWealth from './transfer-wealth/TransferWealth'
import UserTheme from './theme/UserTheme'

import s from './User.m.scss'

const breadcrumb: BreadcrumbItem[] = [
  {
    name: '首页',
    url: '/',
  },
  '个人中心',
]

// temp
// TODO remove
const Empty = () => null

const navs: INavItem[] = [
  {
    name: '个人主页',
    icon: faHome,
    path: '/',
    exact: true,
    Component: Empty,
  },
  {
    name: '修改资料',
    icon: faCog,
    path: '/config',
    Component: Empty,
  },
  {
    name: '我的主题',
    icon: faPenSquare,
    path: '/topic',
    Component: UserTopic,
  },
  {
    name: '我的收藏',
    icon: faStar,
    path: '/favorite',
    Component: UserFavorite,
  },
  {
    name: '关注版面',
    icon: faRss,
    path: '/custom-board',
    Component: UserCustomBoard,
  },
  {
    name: '关注用户',
    icon: faHeart,
    path: '/following',
    Component: UserFollowing,
    pathSuffix: '/:page?',
  },
  {
    name: '我的粉丝',
    icon: faUsers,
    path: '/fan',
    Component: UserFan,
    pathSuffix: '/:page?',
  },
  {
    name: '转账系统',
    icon: faCreditCard,
    path: '/transfer-wealth',
    Component: TransferWealth,
  },
  {
    name: '切换皮肤',
    icon: faMagic,
    path: '/theme',
    Component: UserTheme,
  },
]

const UserCenter: React.FC = () => {
  useBreadcrumb(breadcrumb)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(refreshUserInfo())
  }, [])

  return (
    <div className={s.root}>
      <UserCenterNav basePath={USER_CENTER_BASE_PATH} navs={navs} />
      <div className={s.content}>
        <Switch>
          {navs.map(({ Component, path, exact, pathSuffix = '' }) => (
            <Route
              key={path}
              path={`${USER_CENTER_BASE_PATH}${path}${pathSuffix}`}
              exact={exact}
              component={Component}
            />
          ))}
          <Redirect to={USER_CENTER_BASE_PATH} />
        </Switch>
      </div>
    </div>
  )
}

export default UserCenter

import React from 'react'
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
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import UserCenterNav, { INavItem } from './components/UserCenterNav'
import s from './User.m.scss'

const breadcrumb: BreadcrumbItem[] = [
  {
    name: '首页',
    url: '/',
  },
  '个人中心',
]

const navs: INavItem[] = [
  {
    name: '个人主页',
    icon: faHome,
    path: '/',
    exact: true,
  },
  {
    name: '修改资料',
    icon: faCog,
    path: '/config',
  },
  {
    name: '我的主题',
    icon: faPenSquare,
    path: '/post',
  },
  {
    name: '我的收藏',
    icon: faStar,
    path: '/favorite',
  },
  {
    name: '关注版面',
    icon: faRss,
    path: '/custom-board',
  },
  {
    name: '关注用户',
    icon: faHeart,
    path: '/following',
  },
  {
    name: '我的粉丝',
    icon: faUsers,
    path: '/fan',
  },
  {
    name: '转账系统',
    icon: faCreditCard,
    path: '/transfer-wealth',
  },
  {
    name: '切换皮肤',
    icon: faMagic,
    path: '/theme',
  },
]

const UserCenter: React.FC = () => {
  useBreadcrumb(breadcrumb)

  return (
    <div className={s.root}>
      <UserCenterNav basePath="/user-center" navs={navs} />
    </div>
  )
}

export default UserCenter

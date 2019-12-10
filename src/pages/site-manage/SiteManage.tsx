import React from 'react'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

import Announcement from './components/Announcement'
import Advertisement from './components/Advertisement'

import s from './SiteManage.m.scss'

const breadcrumbs = [
  {
    url: '/',
    name: '首页',
  },
  '全站管理',
]

const SiteManage: React.FC = () => {
  useBreadcrumb(breadcrumbs)
  useDocumentTitle('全站管理')

  return (
    <div className={s.root}>
      <p className={s.title}>全站管理</p>
      <Announcement />
      <hr />
      <Advertisement />
    </div>
  )
}

export default SiteManage

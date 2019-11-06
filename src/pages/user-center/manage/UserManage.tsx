import React from 'react'
import { RouteComponentProps } from 'react-router'

import ManageInfo from './components/ManageInfo'
import ManageTP from './components/ManageTP'
import ManageTopic from './components/ManageTopic'
import ManageRecentPost from './components/ManageRecentPost'

import s from './UserManage.m.scss'

interface IUserManageRouteMatch {
  id?: string
}

const UserManage: React.FC<RouteComponentProps<IUserManageRouteMatch>> = ({ match }) => {
  const { id } = match.params

  if (!id) return null

  return (
    <div className={s.root}>
      <ManageInfo id={id} />
      <ManageTP id={id} />
      <ManageTopic id={id} />
      <ManageRecentPost id={id} />
    </div>
  )
}

export default UserManage

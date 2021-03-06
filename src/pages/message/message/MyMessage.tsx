import React from 'react'
import { RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { useSelector } from 'react-redux'
import { IUser } from '@cc98/api'
import { getUserByName } from 'src/service/user'
import { RootStore } from 'src/store'

import RecentContact from './components/RecentContact'
import RecentMessage from './components/RecentMessage'

import s from './MyMessage.m.scss'

function selector(store: RootStore) {
  return {
    currentUser: store.global.currentUser,
  }
}

const MyMessage: React.FC<RouteComponentProps> = ({ location }) => {
  const [targetUser, setTargetUser] = React.useState<IUser>()
  const [initUser, setInitUser] = React.useState<IUser>()
  const { name } = parse(location.search)

  const { currentUser } = useSelector(selector)

  React.useEffect(() => {
    if (!name) return

    getUserByName(name as string).then(user => {
      setInitUser(user)
      setTargetUser(user)
    })
  }, [name])

  return (
    <div className={s.root}>
      <RecentContact
        initUserName={name as string}
        initUser={initUser}
        targetUser={targetUser}
        onUserChange={setTargetUser}
      />
      {currentUser && targetUser && (
        <RecentMessage currentUser={currentUser} targetUser={targetUser} />
      )}
    </div>
  )
}

export default MyMessage

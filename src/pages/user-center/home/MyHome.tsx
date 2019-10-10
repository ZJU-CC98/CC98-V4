import React from 'react'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import UserHomeContent from 'src/pages/user-center/home/components/UserHomeContent'

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const MyHome: React.FC = () => {
  const { user } = useSelector(selector)

  if (!user) {
    return null
  }

  return <UserHomeContent user={user} />
}

export default MyHome

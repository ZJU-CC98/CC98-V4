import React from 'react'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import UserHomeContent from 'src/pages/user-center/home/components/UserHomeContent'
import Button from 'src/components/Button'
import { getMyRecentTopics } from 'src/service/user'

import { RECENT_TOPIC_PAGE_SIZE } from './constants'

import s from './Home.m.scss'

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const topicService = (offset: number) => getMyRecentTopics(offset, RECENT_TOPIC_PAGE_SIZE)

const MyHome: React.FC = () => {
  const { user } = useSelector(selector)
  const { push } = useHistory()

  if (!user) {
    return null
  }

  return (
    <UserHomeContent
      service={topicService}
      user={user}
      buttons={
        <>
          <span className={s.tag}>
            <span className={s.label}>收到的赞</span>
            <span className={s.info}>{user.receivedLikeCount}</span>
          </span>
          <Button className={s.button} primary onClick={() => push('/message/message')}>
            私信
          </Button>
        </>
      }
    />
  )
}

export default MyHome

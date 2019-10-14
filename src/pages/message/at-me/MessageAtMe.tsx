import React from 'react'
import { RouteComponentProps } from 'react-router'
import List from 'src/components/List'
import { MESSAGE_BASE_PATH } from 'src/pages/message/constants'
import useBoardMap from 'src/hooks/useBoardMap'
import { clearAtNotification } from 'src/service/message'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { EVENT, eventBus } from 'src/utils/event'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import MessageAtItem from 'src/pages/message/components/MessageAtItem'
import { PAGE_SIZE, getMessageAt } from 'src/pages/message/utils'
import Button from 'src/components/Button'

import s from '../Message.m.scss'

interface IMessageAtRouteMatch {
  page?: string
}

const MessageAtMe: React.FC<RouteComponentProps<IMessageAtRouteMatch>> = ({ match, history }) => {
  const { page = '1' } = match.params
  const boardMap = useBoardMap()
  const dispatch = useDispatch<Dispatch<GlobalActions>>()

  const handleClearClick = () => {
    clearAtNotification().then(() => {
      dispatch({
        type: GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT,
        payload: {
          atCount: 0,
        },
      })

      eventBus.emit(EVENT.SET_MESSAGE_READ, null)
    })
  }

  return (
    <>
      <Button onClick={handleClearClick} className={s.button} primary>
        全部标为已读
      </Button>
      <List
        emptyText="没有 @"
        currentPage={parseInt(page, 10)}
        pageSize={PAGE_SIZE}
        onPageChange={nextPage => {
          history.push(`${MESSAGE_BASE_PATH}/at-me/${nextPage}`)
        }}
        service={getMessageAt}
        renderItem={item => <MessageAtItem item={item} boardMap={boardMap} />}
      />
    </>
  )
}

export default MessageAtMe

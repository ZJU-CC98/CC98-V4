import React from 'react'
import { RouteComponentProps } from 'react-router'
import List from 'src/components/List'
import { MESSAGE_BASE_PATH } from 'src/pages/message/constants'
import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { clearResponseNotification } from 'src/service/message'
import { Dispatch } from 'redux'
import { EVENT, eventBus } from 'src/utils/event'

import { PAGE_SIZE, getMessageResponse } from 'src/pages/message/utils'
import MessageResponseItem from 'src/pages/message/components/MessageResponseItem'
import useBoardMap from 'src/hooks/useBoardMap'
import Button from 'src/components/Button'

import s from '../Message.m.scss'

interface IMessageResponseRouteMatch {
  page?: string
}

const MessageResponse: React.FC<RouteComponentProps<IMessageResponseRouteMatch>> = ({
  match,
  history,
}) => {
  const boardMap = useBoardMap()
  const dispatch = useDispatch<Dispatch<GlobalActions>>()
  const { page = '1' } = match.params

  const handleClearClick = () => {
    clearResponseNotification().then(() => {
      dispatch({
        type: GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT,
        payload: {
          replyCount: 0,
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
        emptyText="没有回复"
        currentPage={parseInt(page, 10)}
        pageSize={PAGE_SIZE}
        onPageChange={nextPage => {
          history.push(`${MESSAGE_BASE_PATH}/response/${nextPage}`)
        }}
        service={getMessageResponse}
        renderItem={item => <MessageResponseItem item={item} boardMap={boardMap} />}
      />
    </>
  )
}

export default MessageResponse

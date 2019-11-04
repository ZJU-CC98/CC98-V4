import React from 'react'
import { RouteComponentProps } from 'react-router'
import List from 'src/components/List'
import { MESSAGE_BASE_PATH } from 'src/pages/message/constants'
import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { clearSystemNotification } from 'src/service/message'
import { EVENT, eventBus } from 'src/utils/event'
import { refreshMessageCount } from 'src/store/global-async-actions'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

import { getMessageSystem, PAGE_SIZE } from 'src/pages/message/utils'
import MessageSystemItem from 'src/pages/message/components/MessageSystemItem'
import Button from 'src/components/Button'

import s from '../Message.m.scss'

interface IMessageSystemRouteMatch {
  page?: string
}

const MessageSystem: React.FC<RouteComponentProps<IMessageSystemRouteMatch>> = ({
  match,
  history,
}) => {
  const { page = '1' } = match.params

  const dispatch = useDispatch()
  useDocumentTitle('系统通知')

  const handleClearClick = () => {
    clearSystemNotification().then(() => {
      dispatch({
        type: GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT,
        payload: {
          systemCount: 0,
        },
      } as GlobalActions)

      eventBus.emit(EVENT.SET_MESSAGE_READ, null)
    })
  }

  React.useEffect(() => {
    dispatch(refreshMessageCount())
  }, [page])

  React.useEffect(() => {
    return () => {
      dispatch(refreshMessageCount())
    }
  }, [])

  return (
    <>
      <Button onClick={handleClearClick} className={s.button} primary>
        全部标为已读
      </Button>
      <List
        emptyText="没有通知"
        currentPage={parseInt(page, 10)}
        pageSize={PAGE_SIZE}
        onPageChange={nextPage => {
          history.push(`${MESSAGE_BASE_PATH}/system/${nextPage}`)
        }}
        service={getMessageSystem}
        renderItem={item => <MessageSystemItem item={item} />}
      />
    </>
  )
}

export default MessageSystem

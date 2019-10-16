import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { IBoard, ITagGroup, ITopic } from '@cc98/api'
import Pagination from 'src/components/Pagination'
import TopicItem from 'src/pages/board/components/TopicItem'
import {
  getBoardBestTopicList,
  getBoardSaveTopicList,
  getBoardTagData,
  getBoardTopicByTag,
  getBoardTopicList,
} from 'src/service/board'
import Select from 'src/components/Select'

import TopTopicList from 'src/pages/board/components/TopTopicList'
import s from 'src/pages/board/components/BoardContent.m.scss'
import { EVENT, eventBus } from 'src/utils/event'

const PAGE_SIZE = 20
const TAG_ALL = -1
const TAG_ALL_DESC = '全部'

interface IBoardContentMatch {
  page?: string
}

interface IBoardContentProps extends RouteComponentProps<IBoardContentMatch> {
  boardInfo: IBoard | null
  boardId: string
}

enum CONTENT_TYPE {
  ALL = 'ALL',
  BEST = 'BEST',
  SAVE = 'SAVE',
}

const BoardContent: React.FC<IBoardContentProps> = ({ boardInfo, boardId, match }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState<ITopic[]>([])
  const [total, setTotal] = React.useState(1)
  const [tagData, setTagData] = React.useState<ITagGroup[]>([])
  const [tag1, setTag1] = React.useState(TAG_ALL)
  const [tag2, setTag2] = React.useState(TAG_ALL)
  const [contentType, setContentType] = React.useState(CONTENT_TYPE.ALL)

  const tagData1 = (tagData[0] && tagData[0].tags) || []
  const tagData2 = (tagData[1] && tagData[1].tags) || []

  const currentPage = parseInt(match.params.page || '1', 10)

  React.useEffect(() => {
    getBoardTagData(boardId).then(setTagData)
  }, [boardId])

  React.useEffect(() => {
    if (boardInfo) {
      setTotal(Math.ceil(boardInfo.topicCount / PAGE_SIZE))
    } else {
      setTotal(1)
    }
  }, [boardInfo, boardId])

  React.useEffect(() => {
    setTag1(TAG_ALL)
    setTag2(TAG_ALL)
    setContentType(CONTENT_TYPE.ALL)
  }, [boardId])

  React.useEffect(() => {
    if (tag1 !== TAG_ALL || tag2 !== TAG_ALL) {
      getBoardTopicByTag(
        boardId,
        PAGE_SIZE,
        (currentPage - 1) * PAGE_SIZE,
        tag1 === TAG_ALL ? undefined : tag1,
        tag2 === TAG_ALL ? undefined : tag2
      ).then(({ count, topics }) => {
        setData(topics)
        eventBus.emit(EVENT.GET_TOPICS_SUCCESS, topics)
        setTotal(Math.ceil(count / PAGE_SIZE))
      })

      return
    }

    if (contentType === CONTENT_TYPE.SAVE) {
      getBoardSaveTopicList(boardId, PAGE_SIZE, (currentPage - 1) * PAGE_SIZE).then(
        ({ count, topics }) => {
          setTotal(Math.ceil(count / PAGE_SIZE))
          setData(topics)
          eventBus.emit(EVENT.GET_TOPICS_SUCCESS, topics)
        }
      )

      return
    }

    if (contentType === CONTENT_TYPE.BEST) {
      getBoardBestTopicList(boardId, PAGE_SIZE, (currentPage - 1) * PAGE_SIZE).then(
        ({ count, topics }) => {
          setTotal(Math.ceil(count / PAGE_SIZE))
          setData(topics)
          eventBus.emit(EVENT.GET_TOPICS_SUCCESS, topics)
        }
      )

      return
    }

    getBoardTopicList(boardId, PAGE_SIZE, (currentPage - 1) * PAGE_SIZE).then(topics => {
      setData(topics)
      eventBus.emit(EVENT.GET_TOPICS_SUCCESS, topics)
    })
  }, [boardId, currentPage, tag1, tag2, contentType])

  return (
    <div className={s.root}>
      <Pagination
        current={currentPage}
        total={total}
        onChange={page => dispatch(push(`/board/${boardId}/${page}`))}
      />
      <div className={s.main}>
        <div className={s.title}>
          <p onClick={() => setContentType(CONTENT_TYPE.ALL)} className={s.action}>
            全部
          </p>
          <p onClick={() => setContentType(CONTENT_TYPE.BEST)} className={s.action}>
            精华
          </p>
          <p onClick={() => setContentType(CONTENT_TYPE.SAVE)} className={s.action}>
            保存
          </p>
          {tagData[0] && (
            <Select
              className={s.action}
              value={tag1}
              onChange={setTag1}
              data={mapTagData(tagData[0])}
              width={120}
            />
          )}
          {tagData[1] && (
            <Select
              className={s.action}
              value={tag2}
              onChange={setTag2}
              data={mapTagData(tagData[1])}
              width={120}
            />
          )}
          <p style={{ flex: 1 }} />
          <p className={s.author}>作者</p>
          <p className={s.visit}>点击</p>
          <p className={s.reply}>回复</p>
          <p className={s.lastReply}>最后回复</p>
        </div>
        {currentPage === 1 && (
          <TopTopicList tagData1={tagData1} tagData2={tagData2} boardId={boardId} />
        )}
        {data.map(item => (
          <TopicItem tagData1={tagData1} tagData2={tagData2} data={item} key={item.id} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={total}
        onChange={page => dispatch(push(`/board/${boardId}/${page}`))}
      />
    </div>
  )
}

export default withRouter(BoardContent)

function mapTagData(tagData: ITagGroup) {
  return [{ id: TAG_ALL, name: TAG_ALL_DESC }, ...tagData.tags].map(({ id, name }) => ({
    label: name,
    value: id,
  }))
}

import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { IBoard, ITagGroup, ITopic } from '@cc98/api'
import Pagination from 'src/components/Pagination'
import TopicItem from 'src/pages/board/TopicItem'
import { getBoardTagData, getBoardTopicList, getBoardTopTopicList } from 'src/service/board'

import s from './BoardContent.m.scss'

const PAGE_SIZE = 20

interface IBoardContentMatch {
  page?: string
}

interface IBoardContentProps extends RouteComponentProps<IBoardContentMatch> {
  boardInfo: IBoard | null
  boardId: string
}

const BoardContent: React.FC<IBoardContentProps> = ({ boardInfo, boardId, match }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState<ITopic[]>([])
  const [total, setTotal] = React.useState(1)
  const [tagData, setTagData] = React.useState<ITagGroup[]>([])

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
    if (currentPage === 1) {
      Promise.all([getBoardTopTopicList(boardId), getBoardTopicList(boardId, PAGE_SIZE, 0)]).then(
        ([hot, normal]) => {
          setData([...hot, ...normal])
        }
      )

      return
    }

    getBoardTopicList(boardId, PAGE_SIZE, (currentPage - 1) * PAGE_SIZE).then(setData)
  }, [boardId, currentPage])

  return (
    <div className={s.root}>
      <Pagination
        current={currentPage}
        total={total}
        onChange={page => dispatch(push(`/board/${boardId}/${page}`))}
      />
      <div className={s.main}>
        <div className={s.title}>
          <p>全部</p>
          <p>精华</p>
          <p>保存</p>
          {tagData.length}
        </div>
        {data.map(item => (
          <TopicItem data={item} key={item.id} />
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

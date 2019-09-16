import React from 'react'
import { ITag, ITopic } from '@cc98/api'
import { getBoardTopTopicList } from 'src/service/board'
import TopicItem from 'src/pages/board/TopicItem'

interface ITopTopicListProps {
  boardId: string
  tagData1: ITag[]
  tagData2: ITag[]
}

const TopTopicList: React.FC<ITopTopicListProps> = ({ boardId, tagData2, tagData1 }) => {
  const [data, setData] = React.useState<ITopic[]>()
  React.useEffect(() => {
    getBoardTopTopicList(boardId).then(setData)
  }, [boardId])

  if (!data) {
    return null
  }

  return (
    <>
      {data.map(item => (
        <TopicItem tagData2={tagData2} tagData1={tagData1} key={item.id} data={item} />
      ))}
    </>
  )
}

export default TopTopicList

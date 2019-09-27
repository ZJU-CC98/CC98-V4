import React from 'react'
import { searchBoardTopics } from 'src/service/board'
import { searchTopics } from 'src/service/topic'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

interface ISearchTopicProps {
  keyword: string
  boardId?: string
}

const PAGE_SIZE = 20

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '搜索主题',
]

const SearchTopic: React.FC<ISearchTopicProps> = ({ keyword, boardId }) => {
  const service = boardId
    ? (from: number) => searchBoardTopics(boardId, keyword, from, PAGE_SIZE)
    : (from: number) => searchTopics(from, PAGE_SIZE, keyword)

  const [props, { setData, setIsLoaded }] = useInfTopicModel(service, res => !res.length)
  const { data, isLoaded } = props

  useBreadcrumb(breadcrumb)

  React.useEffect(() => {
    setData([])
    setIsLoaded(false)
    props.onLoadMore()
  }, [keyword, boardId])

  if (isLoaded && !data.length) {
    return <span>nothing</span> // TODO
  }

  return <InfinityTopicList {...props} showNoMore noMoreText="没有更多帖子啦~" />
}

export default SearchTopic

import React from 'react'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { getNewTopics } from 'src/service/topic'
import InfinityTopicList from 'src/components/InfinityTopicList'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '查看新帖',
]

const PAGE_SIZE = 20
const service = (from: number) => getNewTopics(from, PAGE_SIZE)

const NewTopics: React.FC = () => {
  useBreadcrumb(breadcrumb)

  const [props] = useInfTopicModel(service)

  return <InfinityTopicList {...props} showNoMore />
}

export default NewTopics

import React from 'react'
import { getHotHistory } from 'src/service/topic'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '历史上的今天',
]

const HotHistory: React.FC = () => {
  useBreadcrumb(breadcrumb)

  const [props] = useInfTopicModel(getHotHistory)
  const { data } = props

  return <InfinityTopicList {...props} isLoaded={!!data.length} />
}

export default HotHistory

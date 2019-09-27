import React from 'react'
import { getHotWeekly } from 'src/service/topic'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '7日热门话题',
]

const HotWeekly: React.FC = () => {
  useBreadcrumb(breadcrumb)

  const [props] = useInfTopicModel(getHotWeekly)
  const { data } = props

  return <InfinityTopicList {...props} isLoaded={!!data.length} />
}

export default HotWeekly

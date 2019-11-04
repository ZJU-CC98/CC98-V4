import React from 'react'
import { getHotWeekly } from 'src/service/topic'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '7日热门话题',
]

const HotWeekly: React.FC = () => {
  useBreadcrumb(breadcrumb)
  useDocumentTitle('7日热门话题')

  const [props] = useInfTopicModel(getHotWeekly, () => true)

  return <InfinityTopicList {...props} />
}

export default HotWeekly

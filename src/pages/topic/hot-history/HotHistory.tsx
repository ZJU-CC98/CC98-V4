import React from 'react'
import { getHotHistory } from 'src/service/topic'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '历史上的今天',
]

const HotHistory: React.FC = () => {
  useBreadcrumb(breadcrumb)
  useDocumentTitle('历史上的今天')

  const [props] = useInfTopicModel(getHotHistory, () => true)

  return <InfinityTopicList {...props} />
}

export default HotHistory

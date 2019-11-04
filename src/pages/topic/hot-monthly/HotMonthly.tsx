import React from 'react'
import { getHotMonthly } from 'src/service/topic'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '30日热门话题',
]

const HotMonthly: React.FC = () => {
  useBreadcrumb(breadcrumb)
  useDocumentTitle('30日热门话题')

  const [props] = useInfTopicModel(getHotMonthly, () => true)

  return <InfinityTopicList {...props} />
}

export default HotMonthly

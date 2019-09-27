import React from 'react'
import { getFolloweeTopics } from 'src/service/topic'
import { useInfTopicModel } from 'src/hooks/useInfTopicModel'
import InfinityTopicList from 'src/components/InfinityTopicList'

const PAGE_SIZE = 20
const service = (from: number) => getFolloweeTopics(from, PAGE_SIZE)

const FocusUser: React.FC = () => {
  const [props] = useInfTopicModel(service)
  const { data } = props

  return <InfinityTopicList {...props} isLoaded={data.length >= 100} showNoMore />
}

export default FocusUser

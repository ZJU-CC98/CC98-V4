import React from 'react'
import { RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import TopicEditor from 'src/pages/editor/components/TopicEditor'
import { ITopicParams } from 'src/service/topic'
import EDITOR_MODE from 'src/constants/EditorMode'
import TOPIC_TYPE from 'src/constants/TopicType'

interface ISendTopicRouteMatch {
  boardId: string
}

const SendTopic: React.FC<RouteComponentProps<ISendTopicRouteMatch>> = ({ location }) => {
  const initTopic: ITopicParams = {
    title: '',
    content: '',
    contentType: EDITOR_MODE.UBB,
    type: TOPIC_TYPE.NORMAL,
    notifyPoster: true,
  }

  const { isVote } = parse(location.search) as { isVote?: '1' }

  if (isVote) {
    initTopic.isVote = true
  }

  return <TopicEditor initTopic={initTopic} onEdit={console.log} />
}

export default SendTopic

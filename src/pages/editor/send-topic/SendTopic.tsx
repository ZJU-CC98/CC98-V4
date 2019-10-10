import React from 'react'
import { RouteComponentProps } from 'react-router'
import TopicEditor from 'src/pages/editor/components/TopicEditor'
import { ITopicParams } from 'src/service/topic'
import EDITOR_MODE from 'src/constants/EditorMode'
import TOPIC_TYPE from 'src/constants/TopicType'

interface ISendTopicRouteMatch {
  boardId: string
}

const initTopic: ITopicParams = {
  title: '',
  content: '',
  contentType: EDITOR_MODE.UBB,
  type: TOPIC_TYPE.NORMAL,
  notifyPoster: true,
}

const SendTopic: React.FC<RouteComponentProps<ISendTopicRouteMatch>> = () => {
  return <TopicEditor initTopic={initTopic} onEdit={console.log} />
}

export default SendTopic

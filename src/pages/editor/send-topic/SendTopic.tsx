import React from 'react'
import { RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import TopicEditor from 'src/pages/editor/components/TopicEditor'
import { ITopicParams, postTopic } from 'src/service/topic'
import EDITOR_MODE from 'src/constants/EditorMode'
import TOPIC_TYPE from 'src/constants/TopicType'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import useBoardMap from 'src/hooks/useBoardMap'

interface ISendTopicRouteMatch {
  boardId: string
}

const SendTopic: React.FC<RouteComponentProps<ISendTopicRouteMatch>> = ({
  location,
  match,
  history,
}) => {
  const initTopic: ITopicParams = {
    title: '',
    content: '',
    contentType: EDITOR_MODE.UBB,
    type: TOPIC_TYPE.NORMAL,
    notifyPoster: true,
  }

  const { boardId } = match.params
  const { isVote } = parse(location.search) as { isVote?: '1' }
  const boardMap = useBoardMap()

  if (isVote) {
    initTopic.isVote = true
  }

  useBreadcrumb([
    {
      url: '/',
      name: '首页',
    },
    {
      name: (boardMap[parseInt(boardId, 10)] || {}).name || '',
      url: `/board/${boardId}`,
    },
    '编辑帖子',
  ])

  const handleSend = (topic: ITopicParams) => {
    return postTopic(boardId, topic).then(topicId => {
      history.push(`/topic/${topicId}`)
    })
  }

  return (
    <TopicEditor boardId={boardId} buttonText="发帖" initTopic={initTopic} onEdit={handleSend} />
  )
}

export default SendTopic

import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IPost, ITopic } from '@cc98/api'
import useBoardMap from 'src/hooks/useBoardMap'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { editPost, getPost } from 'src/service/post'
import { getTotalPage } from 'src/pages/topic/utils'
import TopicEditor from 'src/pages/editor/components/TopicEditor'
import { getTopicInfo, IPostParams, ITopicParams } from 'src/service/topic'
import PostEditor from 'src/pages/editor/components/PostEditor'

interface ISendTopicRouteMatch {
  postId: string
}

const EditPost: React.FC<RouteComponentProps<ISendTopicRouteMatch>> = ({ match, history }) => {
  const { postId } = match.params
  const [post, setPost] = React.useState<IPost>()
  const [topic, setTopic] = React.useState<ITopic>()
  const boardMap = useBoardMap()

  useBreadcrumb([
    {
      url: '/',
      name: '首页',
    },
    {
      name: post ? (boardMap[post.boardId] || {}).name || '' : '',
      url: post ? `/board/${post.boardId}` : '/',
    },
    '编辑帖子',
  ])

  React.useEffect(() => {
    getPost(postId).then(res => {
      setPost(res)
    })
  }, [postId])

  React.useEffect(() => {
    if (post) {
      getTopicInfo(post.topicId).then(setTopic)
    }
  }, [post])

  if (!post || (post.floor === 1 && !topic)) return null

  const handleEdit = (postParams: IPostParams | ITopicParams) => {
    return editPost(postId, postParams).then(() => {
      history.push(`/topic/${post.topicId}/${getTotalPage(false, 1, topic)}#${post.floor}`)
    })
  }

  // 编辑第一层相当于编辑帖子
  if (post.floor === 1 && topic) {
    return (
      <TopicEditor
        buttonText="编辑"
        initTopic={{
          type: topic.type,
          notifyPoster: topic.notifyPoster,
          title: topic.title,
          content: post.content,
          contentType: post.contentType,
          tag1: topic.tag1,
          tag2: topic.tag2,
        }}
        boardId={topic.boardId}
        onEdit={handleEdit}
      />
    )
  }

  return <PostEditor initPost={post} onSuccess={handleEdit} />
}

export default EditPost

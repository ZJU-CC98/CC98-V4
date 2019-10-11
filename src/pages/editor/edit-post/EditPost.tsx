import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IPost, ITopic } from '@cc98/api'
import useBoardMap from 'src/hooks/useBoardMap'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { editPost, getPost } from 'src/service/post'
import { getTotalPage } from 'src/pages/topic/utils'
import Editor from 'src/components/Editor'
import EDITOR_MODE from 'src/constants/EditorMode'
import Button from 'src/components/Button'
import { getTopicInfo } from 'src/service/topic'

import s from './EditPost.m.scss'

interface ISendTopicRouteMatch {
  postId: string
}

const EditPost: React.FC<RouteComponentProps<ISendTopicRouteMatch>> = ({ match, history }) => {
  const { postId } = match.params
  const [post, setPost] = React.useState<IPost>()
  const [topic, setTopic] = React.useState<ITopic>()
  const [content, setContent] = React.useState('')
  const [contentType, setContentType] = React.useState(EDITOR_MODE.UBB)
  const [loading, setLoading] = React.useState(false)
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
      setContentType(res.contentType)
      setContent(res.content)
      setPost(res)
    })
  }, [postId])

  React.useEffect(() => {
    if (post) {
      getTopicInfo(post.topicId).then(setTopic)
    }
  }, [post])

  if (!post) return null

  const handleEdit = () => {
    setLoading(true)
    editPost(postId, {
      title: '',
      content,
      contentType,
    })
      .then(() => {
        history.push(`/topic/${post.topicId}/${getTotalPage(false, 1, topic)}#${post.floor}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={s.root}>
      <Editor
        value={content}
        onChange={setContent}
        mode={contentType}
        onModeChange={setContentType}
        initMode={post.contentType}
        initValue={post.content}
      />
      <Button primary onClick={handleEdit} disabled={loading} className={s.button}>
        编辑
      </Button>
    </div>
  )
}

export default EditPost

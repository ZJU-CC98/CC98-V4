import React from 'react'
import { IPost } from '@cc98/api'
import Editor from 'src/components/Editor'
import EDITOR_MODE from 'src/constants/EditorMode'
import Button from 'src/components/Button'
import { EVENT, eventBus } from 'src/utils/event'
import { IPostParams, replyTopic } from 'src/service/topic'
import notice from 'src/utils/notice'
import { atUsersInPost } from 'src/service/post'

import { checkHasQuote, findAtUserNames, getQuoteContent } from './utils'
import s from './TopicReplier.m.scss'

interface ITopicReplierProps {
  topicId: string
  onSuccess: () => void
}

const TopicReplier: React.FC<ITopicReplierProps> = ({ topicId, onSuccess }) => {
  const root = React.useRef<HTMLDivElement>(null)
  const lastQuote = React.useRef<IPost>()
  const [content, setContent] = React.useState('')
  const [contentType, setContentType] = React.useState(EDITOR_MODE.UBB)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleQuote = (post: IPost) => {
      if (!post.userName) return

      lastQuote.current = post
      setContent(getQuoteContent(contentType, post))

      if (root.current) {
        root.current.scrollIntoView()
      }
    }

    eventBus.on(EVENT.QUOTE_FLOOR, handleQuote)

    return () => {
      eventBus.off(EVENT.QUOTE_FLOOR, handleQuote)
    }
  }, [contentType, topicId])

  const handleReply = () => {
    setLoading(true)
    const post: IPostParams = {
      title: '',
      content,
      contentType,
    }

    if (checkHasQuote(post) && lastQuote.current) {
      post.parentId = lastQuote.current.id
    }

    replyTopic(topicId, post)
      .catch(err => {
        if (err.response) {
          switch (err.response.status) {
            case 402:
              notice({
                content: '回复失败, 请输入内容',
              })
              break
            case 403:
              notice({
                content: '回复失败, 10s之内仅可进行一次回帖，请稍作休息',
              })
              break
            default:
              notice({
                content: err.message,
              })
              break
          }

          throw err
        }
      })
      .then(postId => {
        setContent('')
        const users = findAtUserNames(content)
        if (postId && users.length) {
          atUsersInPost(topicId, postId, users)
        }

        if (postId) {
          onSuccess()
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div ref={root} className={s.root}>
      <Editor
        value={content}
        onChange={setContent}
        mode={contentType}
        onModeChange={setContentType}
      />
      <Button disabled={loading} onClick={handleReply} className={s.button} primary>
        回帖
      </Button>
    </div>
  )
}

export default TopicReplier

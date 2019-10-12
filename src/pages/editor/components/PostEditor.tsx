import React from 'react'
import { IPost } from '@cc98/api'
import Editor from 'src/components/Editor'
import Button from 'src/components/Button'
import { IPostParams } from 'src/service/topic'
import notice from 'src/utils/notice'

import s from 'src/pages/editor/components/PostEditor.m.scss'

interface ISendTopicProps {
  initPost: IPost
  onSuccess: (post: IPostParams) => Promise<void>
}

const PostEditor: React.FC<ISendTopicProps> = ({ initPost, onSuccess }) => {
  const [content, setContent] = React.useState(initPost.content)
  const [contentType, setContentType] = React.useState(initPost.contentType)
  const [loading, setLoading] = React.useState(false)

  const handleEdit = () => {
    setLoading(true)

    if (!content) {
      notice('请输入内容')
      return
    }

    onSuccess({
      title: '',
      content,
      contentType,
    }).finally(() => {
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
        initMode={initPost.contentType}
        initValue={initPost.content}
      />
      <Button primary onClick={handleEdit} disabled={loading} className={s.button}>
        编辑
      </Button>
    </div>
  )
}

export default PostEditor

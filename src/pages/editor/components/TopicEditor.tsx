import React from 'react'
import Editor from 'src/components/Editor'
import { ITopicParams } from 'src/service/topic'

interface ITopicEditorProps {
  initTopic: ITopicParams
  onEdit: (topic: ITopicParams) => void
}

const TopicEditor: React.FC<ITopicEditorProps> = ({ initTopic }) => {
  const [content, setContent] = React.useState(initTopic.content)
  const [contentType, setContentType] = React.useState(initTopic.contentType)

  return (
    <div>
      <Editor
        value={content}
        onChange={setContent}
        mode={contentType}
        onModeChange={setContentType}
      />
    </div>
  )
}

export default TopicEditor

import React from 'react'
import Editor from 'src/components/Editor'
import { ITopicParams } from 'src/service/topic'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import { checkCanPostActivity } from 'src/utils/permission'
import useBoardMap from 'src/hooks/useBoardMap'
import TOPIC_TYPE, { getTopicTypeDesc } from 'src/constants/TopicType'
import Button from 'src/components/Button'

import s from './TopicEditor.m.scss'

interface ITopicEditorProps {
  initTopic: ITopicParams
  boardId: string | number
  buttonText: string
  onEdit: (topic: ITopicParams) => void
}

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const TopicEditor: React.FC<ITopicEditorProps> = ({ initTopic, boardId, buttonText, onEdit }) => {
  const [title, setTitle] = React.useState(initTopic.title)
  const [content, setContent] = React.useState(initTopic.content)
  const [contentType, setContentType] = React.useState(initTopic.contentType)
  const [currentType, setType] = React.useState(initTopic.type)
  const [notifyPoster, setNotifyPoster] = React.useState(initTopic.notifyPoster)

  const boardMap = useBoardMap()
  const board = boardMap[parseInt(`${boardId}`, 10)]
  const { user } = useSelector(selector)

  const types = checkCanPostActivity(board, user)
    ? [TOPIC_TYPE.NORMAL, TOPIC_TYPE.ACADEMIC, TOPIC_TYPE.ACTIVITY]
    : [TOPIC_TYPE.NORMAL, TOPIC_TYPE.ACADEMIC]

  const handleButtonClick = () => {
    const topic: ITopicParams = {
      title,
      content,
      contentType,
      type: currentType,
      notifyPoster,
    }

    onEdit(topic)
  }

  return (
    <div className={s.root}>
      <p>
        <span>主题标题</span>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </p>
      <p>
        <span>发帖类型</span>
        {types.map(type => (
          <span key={type} onClick={() => setType(type)}>
            <input readOnly type="radio" checked={type === currentType} />
            <span>{getTopicTypeDesc(type)}</span>
          </span>
        ))}
      </p>
      <p>
        <span>高级选项</span>
        <span onClick={() => setNotifyPoster(!notifyPoster)}>
          <input readOnly type="checkbox" checked={notifyPoster} />
          <span>接收消息提醒</span>
        </span>
      </p>
      <Editor
        initValue={initTopic.content}
        initMode={initTopic.contentType}
        value={content}
        onChange={setContent}
        mode={contentType}
        onModeChange={setContentType}
      />
      <Button onClick={handleButtonClick} primary>
        {buttonText}
      </Button>
    </div>
  )
}

export default TopicEditor

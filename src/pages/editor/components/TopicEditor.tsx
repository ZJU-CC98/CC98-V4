import React from 'react'
import Editor from 'src/components/Editor'
import { ITopicParams } from 'src/service/topic'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'
import { checkCanPostActivity } from 'src/utils/permission'
import useBoardMap from 'src/hooks/useBoardMap'
import TOPIC_TYPE, { getTopicTypeDesc } from 'src/constants/TopicType'
import Button from 'src/components/Button'
import notice from 'src/utils/notice'
import { getBoardTagData } from 'src/service/board'
import { ITagGroup } from '@cc98/api'
import Select from 'src/components/Select'

import s from './TopicEditor.m.scss'

interface ITopicEditorProps {
  initTopic: ITopicParams
  boardId: string | number
  buttonText: string
  onEdit: (topic: ITopicParams) => Promise<void>
}

function selector(store: RootStore) {
  return {
    user: store.global.currentUser,
  }
}

const renderTagSelect = (
  item: ITagGroup | undefined,
  value: number | undefined,
  setValue: (v: number) => void
) => {
  if (!item) return null

  return (
    <Select
      value={`${value}`}
      onChange={v => setValue(parseInt(v, 10))}
      data={item.tags.map(({ id, name }) => ({ label: name, value: `${id}` }))}
    />
  )
}

const TopicEditor: React.FC<ITopicEditorProps> = ({ initTopic, boardId, buttonText, onEdit }) => {
  const [title, setTitle] = React.useState(initTopic.title)
  const [content, setContent] = React.useState(initTopic.content)
  const [contentType, setContentType] = React.useState(initTopic.contentType)
  const [currentType, setType] = React.useState(initTopic.type)
  const [notifyPoster, setNotifyPoster] = React.useState(initTopic.notifyPoster)

  const [boardTags, setBoardTags] = React.useState<ITagGroup[]>([])
  const [tag1, setTag1] = React.useState(initTopic.tag1)
  const [tag2, setTag2] = React.useState(initTopic.tag2)

  const [loading, setLoading] = React.useState(false)

  const boardMap = useBoardMap()
  const board = boardMap[parseInt(`${boardId}`, 10)]
  const { user } = useSelector(selector)

  const types = checkCanPostActivity(board, user)
    ? [TOPIC_TYPE.NORMAL, TOPIC_TYPE.ACADEMIC, TOPIC_TYPE.ACTIVITY]
    : [TOPIC_TYPE.NORMAL, TOPIC_TYPE.ACADEMIC]

  React.useEffect(() => {
    getBoardTagData(boardId).then(res => {
      setBoardTags(res)

      if (res[0] && !tag1) {
        setTag1(res[0].tags[0].id)
      }

      if (res[1] && !tag2) {
        setTag2(res[1].tags[0].id)
      }
    })
  }, [boardId])

  const handleButtonClick = () => {
    if (!title) {
      notice('请输入标题')
      return
    }

    if (!content) {
      notice('请输入内容')
      return
    }

    const topic: ITopicParams = {
      title,
      content,
      contentType,
      type: currentType,
      notifyPoster,
    }

    if (tag1) {
      topic.tag1 = tag1
    }

    if (tag2) {
      topic.tag2 = tag2
    }

    setLoading(true)
    onEdit(topic).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className={s.root}>
      <p>
        <span>主题标题</span>
        {renderTagSelect(boardTags[0], tag1, setTag1)}
        {renderTagSelect(boardTags[1], tag2, setTag2)}
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
      <Button disabled={loading} onClick={handleButtonClick} primary>
        {buttonText}
      </Button>
    </div>
  )
}

export default TopicEditor

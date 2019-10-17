import React from 'react'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import {
  ConfigType,
  IAction,
  ICustomComponentProps,
  IState,
  IUBBCustomConfig,
} from '@cc98/react-ubb-editor/lib'
import EmojiContainer from 'src/components/UbbEditor/components/EmojiContainer'

const Emoji: React.FC<ICustomComponentProps> = ({ dispatch }) => {
  const handleClick = (text: string) => {
    dispatch({
      type: 2,
      tagName: 'emoji',
      payload: {
        content: text,
      },
    })
  }

  return (
    <div>
      <EmojiContainer onSelect={handleClick} />
    </div>
  )
}

const handler = (state: IState, action: IAction) => {
  const { start, end, value } = state
  const { payload } = action
  const before = value.slice(0, start)
  const after = value.slice(end, value.length)

  return {
    start,
    value: `${before}${payload!.content}${after}`,
    end: start + payload!.content!.length,
  }
}

const emoji: IUBBCustomConfig = {
  handler,
  type: ConfigType.Custom,
  tagName: 'emoji',
  title: '插入表情',
  icon: faLaugh,
  index: 101,
  Component: Emoji as any,
}

export default emoji

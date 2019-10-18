import React from 'react'
import UbbContainer from 'src/ubb'
import emojiMap, { EMOJI_TYPE, getEmojiDesc, getEmojiTitle } from './emojiMap'
import s from './EmojiContainer.m.scss'

const AVAILABLE_TYPES = Object.values(EMOJI_TYPE) as EMOJI_TYPE[]

interface IEmojiContainerProps {
  onSelect: (text: string) => void
}

const EmojiContainer: React.FC<IEmojiContainerProps> = ({ onSelect }) => {
  const [tab, setTab] = React.useState(AVAILABLE_TYPES[0])

  const desc = getEmojiDesc(tab)

  return (
    <div className={s.root} onClick={e => e.stopPropagation()}>
      <div className={s.title}>
        {AVAILABLE_TYPES.map(item => (
          <button
            className={item === tab ? s.titleActive : undefined}
            key={item}
            type="button"
            onClick={() => setTab(item)}
          >
            {getEmojiTitle(item)}
          </button>
        ))}
      </div>
      {desc && (
        <p className={s.info}>
          该组表情由
          <a target="_blank" rel="noreferrer noopener" href={desc.url}>
            {desc.name}
          </a>
          提供
        </p>
      )}
      <div className={s.content}>
        {emojiMap[tab].map(item => (
          <button type="button" key={item} className={s[tab]} onClick={() => onSelect(item)}>
            <UbbContainer text={item} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmojiContainer

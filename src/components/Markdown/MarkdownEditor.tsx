import React from 'react'
import ReactMde from '@cc98/hell-react-mde'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  faHeading,
  faBold,
  faItalic,
  faStrikethrough,
  faLink,
  faQuoteRight,
  faCode,
  faImage,
  faListUl,
  faListOl,
  faTasks,
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { convert } from './utils'
import s from './MarkdownEditor.m.scss'

const iconMap: Record<string, IconProp> = {
  heading: faHeading,
  bold: faBold,
  italic: faItalic,
  strikethrough: faStrikethrough,
  link: faLink,
  'quote-right': faQuoteRight,
  code: faCode,
  image: faImage,
  'list-ul': faListUl,
  'list-ol': faListOl,
  tasks: faTasks,
}

interface IMarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

const MarkdownEditor: React.FC<IMarkdownEditorProps> = React.memo(({ value, onChange }) => {
  return (
    <ReactMde
      className={s.root}
      value={value}
      onChange={onChange}
      generateMarkdownPreview={convert}
      minEditorHeight={330}
      maxEditorHeight={500}
      buttonContentOptions={{
        iconProvider: name => <Icon size="sm" icon={iconMap[name]} />,
      }}
    />
  )
})

export default MarkdownEditor

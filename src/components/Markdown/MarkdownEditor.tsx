import React from 'react'
import produce from 'immer'
import { uniqueId } from 'lodash'
import ReactMde, { commands as mdeCommands } from 'react-mde'
import { CommandGroup } from 'react-mde/lib/definitions/types'

import { uploadFile } from 'src/service/file'

import { convert } from './utils'
import s from './MarkdownEditor.m.scss'

interface IMarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

const defaultCommands = mdeCommands.getDefaultCommands()

const MarkdownEditor: React.FC<IMarkdownEditorProps> = React.memo(({ value, onChange }) => {
  const { current: id } = React.useRef(uniqueId())
  const ref = React.useRef<ReactMde>(null)

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target
    const file = (input.files || [])[0]

    if (!file) return

    uploadFile(file)
      .then(url => {
        const newValue = `${value}\n\n![](${url[0]})\n\n`

        onChange(newValue)
      })
      .finally(() => {
        input.value = ''
      })
  }

  const commands: CommandGroup[] = produce(defaultCommands, draft => {
    const image = draft[1].commands[3]

    image.execute = undefined

    image.icon = iconProvider => {
      return (
        <>
          <label style={{ cursor: 'pointer' }} htmlFor={id}>
            {iconProvider('image')}
          </label>
          <input
            accept="image/*"
            id={id}
            style={{ display: 'none' }}
            type="file"
            onChange={handleUpload}
          />
        </>
      )
    }
  })

  return (
    <ReactMde
      ref={ref}
      className={s.root}
      commands={commands}
      value={value}
      onChange={onChange}
      generateMarkdownPreview={convert}
      minEditorHeight={330}
      maxEditorHeight={500}
    />
  )
})

export default MarkdownEditor

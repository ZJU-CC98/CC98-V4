import React from 'react'
import MarkdownEditor from 'src/components/Markdown/MarkdownEditor'
import EDITOR_MODE from 'src/constants/EditorMode'
import UbbEditor from 'src/components/UbbEditor'
import Button from 'src/components/Button'

import s from './index.m.scss'

interface IEditorProps {
  value: string
  onChange: (value: string) => void
  initValue?: string
  initMode?: EDITOR_MODE
  mode: EDITOR_MODE
  onModeChange: (mode: EDITOR_MODE) => void
}

/**
 * ubb + markdown 编辑器
 * 带切换
 */
const Editor: React.FC<IEditorProps> = ({
  value,
  onChange,
  mode,
  onModeChange,
  initValue = '',
  initMode = EDITOR_MODE.UBB,
}) => {
  const [ubbValue, setUbbValue] = React.useState(initMode === EDITOR_MODE.UBB ? initValue : '')
  const [markdownValue, setMarkdownValue] = React.useState(
    initMode === EDITOR_MODE.MARKDOWN ? initValue : ''
  )

  React.useEffect(() => {
    if (mode === EDITOR_MODE.MARKDOWN) {
      setMarkdownValue(value)
    }

    if (mode === EDITOR_MODE.UBB) {
      setUbbValue(value)
    }
  }, [value]) // 这里不能加 mode

  React.useEffect(() => {
    onChange(mode === EDITOR_MODE.MARKDOWN ? markdownValue : ubbValue)
  }, [mode])

  let editor: React.ReactNode | null = null

  if (mode === EDITOR_MODE.UBB) {
    editor = (
      <UbbEditor
        value={ubbValue}
        onChange={v => {
          setUbbValue(v)
          onChange(v)
        }}
      />
    )
  }

  if (mode === EDITOR_MODE.MARKDOWN) {
    editor = <MarkdownEditor value={markdownValue} onChange={onChange} />
  }

  return (
    <div className={s.root}>
      <div className={s.buttonWrapper}>
        <Button
          primary
          border
          onClick={() =>
            onModeChange(mode === EDITOR_MODE.MARKDOWN ? EDITOR_MODE.UBB : EDITOR_MODE.MARKDOWN)
          }
        >
          {mode === EDITOR_MODE.MARKDOWN ? '切换到UBB编辑器' : '切换到Markdown编辑器'}
        </Button>
      </div>
      <div className={s.editorWrapper}>{editor}</div>
    </div>
  )
}

export default Editor

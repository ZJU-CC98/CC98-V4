import React from 'react'
import createEditor from '@cc98/react-ubb-editor'
import { IProps } from '@cc98/react-ubb-editor/lib/components'
import UbbContainer from 'src/ubb'

import emoji from './config/emoji'
import image from './config/image'
import upload from './config/upload'

import s from './index.m.scss'

const Editor = React.memo(
  createEditor({
    UbbContainer: ({ value }) => <UbbContainer text={value} />,
    configs: [emoji, image, upload],
  })
)

export default function UbbEditor(props: IProps) {
  return (
    <div className={s.root}>
      <Editor {...props} />
    </div>
  )
}

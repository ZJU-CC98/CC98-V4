import React from 'react'
import createEditor from '@cc98/react-ubb-editor'
import { IProps } from '@cc98/react-ubb-editor/lib/components'
import UbbContainer from 'src/ubb'

import s from './index.m.scss'

const UbbEditor = React.memo(
  createEditor({
    UbbContainer: ({ value }) => <UbbContainer text={value} />,
  })
)

export default function(props: IProps) {
  return (
    <div className={s.root}>
      <UbbEditor {...props} />
    </div>
  )
}

import React from 'react'
import UBB from '@cc98/ubb-core/dist'
import { IUbbConfig } from 'src/ubb/types'
import handlerHub from './handlerHub'

export default function ubbReact(text: string, config: Required<IUbbConfig>) {
  return UBB<React.ReactNode>(text, handlerHub, {
    config,
  })
}

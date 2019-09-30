import React from 'react'
import UBB from '@cc98/ubb-core/dist'
import { IContext, IUbbConfig } from 'src/ubb/types'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import { THEME_MODE } from 'src/constants/theme'
import handlerHub from './handlerHub'

export default function ubbReact(
  text: string,
  config: Required<IUbbConfig>,
  themeMode: THEME_MODE
) {
  return UBB<React.ReactNode>(text, handlerHub, {
    config,
    imageBasePath: IMAGE_BASE_PATH,
    themeMode,
    quotes: [],
  } as IContext)
}

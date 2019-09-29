import React from 'react'
import { IHandlerHub } from '@cc98/ubb-core/dist'

import rootHandler from './rootHandler'
import textHandler from './textHandler'
import defaultTagHandler from './defaultTagHandler'
import generalTagHandlers from './generalTagHandlers/_index'
import specificTagHandlers from './specificTagHandlers/_index'

const handlerHub: IHandlerHub<React.ReactNode> = {
  rootHandler,
  textHandler,
  defaultTagHandler,
  generalTagHandlers,
  specificTagHandlers,
}

export default handlerHub

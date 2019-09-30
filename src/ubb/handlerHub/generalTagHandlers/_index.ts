import React from 'react'
import { IHandlerHub } from '@cc98/ubb-core/dist'

import ac from './ac'
import em from './em'
import line from './line'
import mahjong from './mahjong'
import ms from './ms'
import needreply from './needreply'
import tb from './tb'

const generalTagHandlers: IHandlerHub<React.ReactNode>['generalTagHandlers'] = [
  ac,
  em,
  line,
  mahjong,
  ms,
  needreply,
  tb,
]

export default generalTagHandlers

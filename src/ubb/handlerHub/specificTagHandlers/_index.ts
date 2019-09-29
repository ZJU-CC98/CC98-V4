import React from 'react'
import { IHandlerHub } from '@cc98/ubb-core/dist'

import align from './align'
import audio from './audio'
import b from './b'
import bili from './bili'
import center from './center'
import code from './code'
import color from './color'
import cursor from './cursor'
import del from './del'
import english from './english'
import font from './font'
import i from './i'
// import img from './img'
import left from './left'
import mp3 from './mp3'
import noubb from './noubb'
import pm from './pm'
import right from './right'
import sandbox from './sanbox'
import size from './size'
import table from './table'
import td from './td'
import th from './th'
import topic from './topic'
import tr from './tr'
import u from './u'
import url from './url'
import video from './video'

const specificTagHandlers: IHandlerHub<React.ReactNode>['specificTagHandlers'] = {
  align,
  audio,
  b,
  bili,
  center,
  code,
  color,
  cursor,
  del,
  english,
  font,
  i,
  // img,
  left,
  mp3,
  // needreply,
  noubb,
  pm,
  right,
  sandbox,
  size,
  table,
  td,
  th,
  topic,
  tr,
  u,
  url,
  video,
}

export default specificTagHandlers

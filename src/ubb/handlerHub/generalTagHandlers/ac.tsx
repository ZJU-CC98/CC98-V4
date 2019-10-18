import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import React from 'react'
import { IContext } from 'src/ubb/types'
import { THEME_MODE } from 'src/constants/Theme'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /ac\d+/i,

  render(node: TagNode, context: IContext) {
    // eslint-disable-next-line no-underscore-dangle
    const acID = node.tagData.__tagName__.slice(2)
    const { themeMode, imageBasePath } = context

    const url =
      themeMode === THEME_MODE.LIGHT
        ? `${imageBasePath}/ac/${acID}.png`
        : `${imageBasePath}/ac-reverse/${acID}.png`

    return (
      <span>
        <img src={url} alt={`[ac${acID}]`} />
      </span>
    )
  },
}

export default handler

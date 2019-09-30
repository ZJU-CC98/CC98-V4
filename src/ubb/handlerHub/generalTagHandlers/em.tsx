import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import React from 'react'
import { IContext } from 'src/ubb/types'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /em\d{2}/i,

  render(node: TagNode, { imageBasePath }: IContext) {
    // eslint-disable-next-line no-underscore-dangle
    const emID = node.tagData.__tagName__.slice(2)

    const url = `${imageBasePath}/em/em${emID}.gif`

    return (
      <span>
        <img className="ubb-tag-em" src={url} alt={`[em${emID}]`} />
      </span>
    )
  },
}

export default handler

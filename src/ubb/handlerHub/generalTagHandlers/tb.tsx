import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /tb\d{2}/i,

  render(node: TagNode, { imageBasePath }: IContext) {
    // eslint-disable-next-line no-underscore-dangle
    const tbID = node.tagData.__tagName__.slice(2)

    const url = `${imageBasePath}/tb/tb${tbID}.png`

    return (
      <span>
        <img className="ubb-tag-tb" src={url} alt={`[tb${tbID}]`} />
      </span>
    )
  },
}

export default handler

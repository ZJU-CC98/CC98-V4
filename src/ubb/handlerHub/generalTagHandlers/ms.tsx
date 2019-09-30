import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /ms\d{2}/i,

  render(node: TagNode, { imageBasePath }: IContext) {
    // eslint-disable-next-line no-underscore-dangle
    const msID = node.tagData.__tagName__.slice(2)

    const url = `${imageBasePath}/ms/ms${msID}.png`

    return (
      <div style={{ display: 'inline' }}>
        <img className="ubb-tag-ms" src={url} alt={`[ms${msID}]`} />
      </div>
    )
  },
}

export default handler

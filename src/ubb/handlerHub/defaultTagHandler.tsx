/* eslint-disable no-underscore-dangle */
import { ITagHandler } from '@cc98/ubb-core'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, _, children) {
    return (
      <>
        {node._isClose ? (
          <span>
            {node._rawText}
            {children}
            {`[/${node.tagName}]`}
          </span>
        ) : (
          <>{node._rawText}</>
        )}
      </>
    )
  },
}

export default handler

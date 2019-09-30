import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node) {
    return <span>{node.innerText}</span>
  },
}

export default handler

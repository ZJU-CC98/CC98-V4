import React from 'react'
import { ITextHandler } from '@cc98/ubb-core/dist'

const handler: ITextHandler<React.ReactNode> = {
  render(node) {
    return node.text
  },
}

export default handler

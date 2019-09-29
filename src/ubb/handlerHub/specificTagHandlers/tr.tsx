import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(_, __, children) {
    return <tr>{children}</tr>
  },
}

export default handler

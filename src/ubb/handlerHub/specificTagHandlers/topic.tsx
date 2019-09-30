import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { Link } from 'react-router-dom'
import { getTagDataByIndex } from 'src/ubb/utils'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, __, children) {
    const topicId = parseInt(getTagDataByIndex(node, 1) || getTagDataByIndex(node, 0)!, 10)

    return <Link to={`/topic/${topicId}`}>{children}</Link>
  },
}

export default handler

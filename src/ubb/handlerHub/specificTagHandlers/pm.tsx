import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { Link } from 'react-router-dom'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, __, children) {
    const { tagData } = node
    const userName = tagData.pm

    return <Link to={`/message/message?name=${userName}`}>{children}</Link>
  },
}

export default handler

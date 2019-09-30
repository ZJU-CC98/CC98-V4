import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, __, children) {
    const { tagData } = node
    let size = parseInt(tagData.size, 10)

    if (Number.isNaN(size) || size < 0) {
      return children
    }

    size = size > 7 ? 3.5 : size / 2
    size /= 1.5 // 这里可能需要调整

    const style = {
      fontSize: `${size * 16}px`,
    } as React.CSSProperties

    return (
      <span style={style}>
        <div>{children}</div>
      </span>
    )
  },
}

export default handler

import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, __, children) {
    const { tagData } = node
    const textAlign = tagData.align

    const style = {
      textAlign,
    } as React.CSSProperties

    return (
      <span style={style}>
        <div>{children}</div>
      </span>
    )
  },
}

export default handler

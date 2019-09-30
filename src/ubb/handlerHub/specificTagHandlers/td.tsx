import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { getTagDataByIndex } from 'src/ubb/utils'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, __, children) {
    const rowSpan = parseInt(getTagDataByIndex(node, 0) || '1', 10)
    const colSpan = parseInt(getTagDataByIndex(node, 1) || '1', 10)

    return (
      <td rowSpan={rowSpan} colSpan={colSpan}>
        {children}
      </td>
    )
  },
}

export default handler

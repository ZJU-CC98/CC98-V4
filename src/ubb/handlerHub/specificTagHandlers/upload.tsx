import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { getTagDataByIndex } from 'src/ubb/utils'
import Button from 'src/components/Button'
import img from './img'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, context) {
    const uploadType = getTagDataByIndex(node, 0)

    switch (uploadType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
        return img.render(node, context, [])
      default:
        return (
          <Button primary border onClick={() => window.open(node.innerText, '_blank')}>
            点击下载文件
          </Button>
        )
    }
  },
}

export default handler

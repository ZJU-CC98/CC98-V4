import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'
import Audio from 'src/components/Media/Audio'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, { config }: IContext) {
    if (!config.allowMediaContent) {
      return node.innerText
    }

    const src = node.innerText
    const { title } = node.tagData

    return <Audio src={src} title={title} />
  },
}

export default handler

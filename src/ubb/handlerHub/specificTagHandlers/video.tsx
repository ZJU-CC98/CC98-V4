import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'
import Video from 'src/components/Media/Video'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, { config }: IContext) {
    if (!config.allowMediaContent) {
      return node.innerText
    }

    return <Video src={node.innerText} />
  },
}

export default handler

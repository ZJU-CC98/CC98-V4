import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'
import MarkdownContainer from 'src/components/Markdown/MarkdownContainer'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, { config }: IContext) {
    if (!config.allowMarkDown) {
      return <div>{node.innerText}</div>
    }

    return <MarkdownContainer text={node.innerText} />
  },
}

export default handler

import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import { IContext } from 'src/ubb/types'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, { config }: IContext) {
    if (!config.allowMediaContent) {
      return node.innerText
    }

    const { innerText, tagData } = node
    const src = `https://player.bilibili.com/player.html?aid=${innerText}&page=${tagData.bili || 1}`
    const style = {
      border: 'none',
    }

    const props = {
      src,
      style,
      border: '0',
      frameborder: 'no',
      framespacing: '0',
      allowfullscreen: 'allowfullscreen',
      width: '640',
      height: '480',
      scrolling: 'no',
    }

    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe {...props} />
      </div>
    )
  },
}

export default handler

import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import URL from 'url-parse'
import { isSafe } from 'src/ubb/handlerHub/specificTagHandlers/url'

function checkSupportSandBox(): boolean {
  return 'sandbox' in document.createElement('iframe')
}

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, _, children) {
    if (!checkSupportSandBox() || !isSafe(node.tagData.url)) {
      return children
    }

    const style = {
      border: 'none',
      width: node.tagData.width,
      height: node.tagData.height,
    }

    const props = {
      sandbox: 'allow-scripts allow-forms allow-same-origin',
      src: URL(node.tagData.url.trim()).href,
      style,
    }

    return (
      // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe {...props}>{children}</iframe>
    )
  },
}

export default handler

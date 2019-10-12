import React from 'react'

import { convert } from './utils'

interface IMarkdownContainerProps {
  text: string
}

const MarkdownContainer: React.FC<IMarkdownContainerProps> = ({ text }) => {
  const root = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    convert(text).then(html => {
      if (!root.current) return

      root.current.innerHTML = html
    })
  }, [text])

  return <div ref={root} />
}

export default MarkdownContainer

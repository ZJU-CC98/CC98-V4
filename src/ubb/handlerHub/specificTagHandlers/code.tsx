import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import s from 'src/ubb/style.m.scss'

const splitCode = (code: string) => {
  const lines = code.split('\n')

  while (!lines[0] && lines.length > 0) lines.shift()
  while (!lines[lines.length - 1] && lines.length > 0) lines.pop()

  return lines
}

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node) {
    const lines = splitCode(node.innerText)

    return (
      <div className={s.code}>
        <ol>
          {lines.map(line => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </div>
    )
  },
}

export default handler

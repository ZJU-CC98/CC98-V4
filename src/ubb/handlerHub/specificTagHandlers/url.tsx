import { ITagHandler } from '@cc98/ubb-core'
import URL from 'url-parse'
import React from 'react'
import { Link } from 'react-router-dom'
import s from 'src/ubb/style.m.scss'

// Avoid XSS:
// https://medium.com/javascript-security/avoiding-xss-in-react-is-still-hard-d2b5c7ad9412
export function isSafe(dangerousURL: string) {
  const url = URL(dangerousURL.trim(), {})

  // relative url has no protocol
  if (!url.protocol) return true
  if (url.protocol === 'http:') return true
  if (url.protocol === 'https:') return true

  // eslint-disable-next-line no-console
  console.error(`unsafe url: ${dangerousURL}`)

  return false
}

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node, _, children) {
    const { innerText } = node

    const dangerousURL = node.tagData.url || innerText

    const safeURL = isSafe(dangerousURL) ? dangerousURL : '#'
    const isOuter = !!URL(dangerousURL.trim(), {}).protocol

    return (
      <Link
        className={s.url}
        to={safeURL}
        rel="noreferrer noopener"
        target={isOuter ? '_blank' : undefined}
      >
        {children}
      </Link>
    )
  },
}

export default handler

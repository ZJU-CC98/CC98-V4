import React from 'react'
import { ITextHandler } from '@cc98/ubb-core/dist'
import urlRegex from 'url-regex'
import s from 'src/ubb/style.m.scss'

const regex = urlRegex({ strict: false })

const formatLink = (link: string) => {
  if (!link) {
    return '#'
  }

  if (!link.startsWith('http')) {
    return `http://${link}`
  }

  return link
}

const handler: ITextHandler<React.ReactNode> = {
  render(node) {
    const links = node.text.match(regex)

    if (!links) {
      return node.text
    }

    return node.text.split(regex).map((text, index) => (
      <>
        {text}
        {links[index] && (
          <a className={s.url} href={formatLink(links[index])}>
            {links[index]}
          </a>
        )}
      </>
    ))
  },
}

export default handler

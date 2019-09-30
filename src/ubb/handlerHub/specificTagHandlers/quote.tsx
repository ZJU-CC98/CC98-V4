import { ITagHandler, TagNode, TextNode } from '@cc98/ubb-core'
import React from 'react'
import cn from 'classnames'
import { IContext } from 'src/ubb/types'
import s from 'src/ubb/style.m.scss'

import Button from 'src/components/Button'

// 多于两层的引用折叠起来
const EXPAND_QUOTE_LENGTH = 2
const removeKey = Symbol('quote-remove-key')

function findPureQuote({ children }: TagNode) {
  let i = 0
  for (; i < children.length - 1; i += 2) {
    if (
      !(
        children[i] instanceof TagNode &&
        (children[i] as TagNode).innerText.indexOf('以下是引用') === 0 &&
        children[i + 1] instanceof TextNode &&
        children[i + 1].text === '\n'
      )
    ) {
      return 0
    }
  }

  return children[i] instanceof TagNode &&
    (children[i] as TagNode).tagName === 'quote' &&
    children
      .slice(i + 1)
      .every(
        item => !(item instanceof TagNode) || (item instanceof TextNode && /\s/.test(item.text))
      )
    ? i
    : 0
}

const Quotes: React.FC<{ quotes: IContext['quotes'] }> = ({ quotes }) => {
  const [isExpand, setIsExpand] = React.useState(quotes.length <= EXPAND_QUOTE_LENGTH)

  return (
    <div className={s.quote}>
      {!isExpand && (
        <div className={cn(s.quoteItem, s.quoteExpand)}>
          <Button primary border onClick={() => setIsExpand(true)}>
            展开剩余引用
          </Button>
        </div>
      )}
      {quotes.slice(isExpand ? 0 : quotes.length - EXPAND_QUOTE_LENGTH).map((item, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn(s.quoteItem)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  enter(node: TagNode, context: IContext) {
    if (!context.quoteRoot) {
      context.quoteRoot = node
      context.quotes = []
    }

    const pureQuoteEnd = findPureQuote(node)

    if (!pureQuoteEnd) {
      return
    }

    // @ts-ignore
    node[removeKey] = true
    const pureQuotes = node.children.splice(0, pureQuoteEnd)
    ;(node.children[0] as TagNode).children.unshift(...pureQuotes)
  },

  exit(node: TagNode, context: IContext) {
    if (context.quoteRoot === node) {
      context.quoteRoot = null
      context.quotes = []
    }
  },

  render(node: TagNode, { quoteRoot, quotes }: IContext, children: React.ReactNode[]) {
    // @ts-ignore
    if (!node[removeKey]) {
      quotes.push(children)
    }

    if (quoteRoot !== node) {
      return null
    }

    return <Quotes quotes={quotes} />
  },
}

export default handler

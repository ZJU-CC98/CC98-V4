import dayjs from 'dayjs'
import { IPost } from '@cc98/api'
import EDITOR_MODE from 'src/constants/EditorMode'
import { IPostParams } from 'src/service/topic'

export function getQuoteContent(contentType: EDITOR_MODE, post: IPost) {
  const postTime = dayjs(post.time).format('YYYY-MM-DD HH:mm:ss')

  if (contentType === EDITOR_MODE.UBB) {
    const page = Math.floor((post.floor - 1) / 10) + 1
    const floor = (post.floor || 10) - page * 10
    const url = `/topic/${post.topicId}/${page}#${floor}`

    return `[quote][b]以下是引用${post.floor}楼：用户${post.userName}在${postTime}的发言：[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]
${post.content}[/quote]
`
  }
  return `>**以下是引用${post.floor}楼：用户${post.userName}在${postTime}的发言：**
${post.content}
`
}

export function checkHasQuote({ content }: IPostParams) {
  return /\[quote\]/.test(content)
}

/**
 * TODO: 重构祖传代码
 * 处理发帖回帖内容
 * 如果存在合法的@，则会返回一个字符串数组，包含至多10个合法的被@用户的昵称
 */
export function findAtUserNames(content: string) {
  try {
    const reg1 = /([\s\S]*)\[quotex?\][\s\S]*?\[\/quotex?\]([\s\S]*)/
    const reg2 = /@[^ \n]{1,10}?[ ]+/g
    const reg3 = /[^@ ]+/
    // 不检测引用内容中的@
    let str
    do {
      str = content.match(reg1)
      if (str) {
        content = `${content.match(reg1)![1]}${content.match(reg1)![2]}`
      }
    } while (str)
    if (content === '') {
      return []
    }

    const res = content.match(reg2)

    if (res) {
      // 如果match方法返回了非null的值（即数组），则说明内容中存在合法的@
      let atNum = res.length // 合法的@数
      if (atNum > 10) atNum = 10 // 至多10个
      const ats: string[] = []
      for (let i = 0; i < atNum; i += 1) {
        const anAt = res[i]

        const aUserName = reg3.exec(anAt)![0]

        ats[i] = aUserName
      }
      return ats
    }
    return []
  } catch (e) {
    return []
  }
}

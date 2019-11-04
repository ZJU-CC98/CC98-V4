import React from 'react'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'
import welcome from 'src/assets/login/login_snow.png'

import s from './index.m.scss'

const phoneRegex = /(iPhone|iPod|Android|ios)/i

const PWAAlert: React.FC = () => {
  const [isShown, setIsShown] = React.useState(!getLocalStorage('stop-pwa-alert'))
  const isPhone = phoneRegex.test(navigator.userAgent)

  if (!isPhone || !isShown) return null

  const jump = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = getRederictURL()
  }

  const close = () => {
    setIsShown(false)
  }

  const neverShow = () => {
    setLocalStorage('stop-pwa-alert', 1, 2592000)
    setIsShown(false)
  }

  return (
    <div className={s.background}>
      <div className={s.container}>
        <img className={s.image} src={welcome} />
        <div className={s.textContainer}>
          <div>检测到您正使用移动端访问</div>
          <div> 建议使用移动版CC98</div>
          <div> 以获得更好的浏览体验</div>
        </div>
        <div className={s.buttonContainer}>
          <div className={s.button} onClick={jump}>
            点击跳转
          </div>
          <div className={s.button} onClick={close}>
            下次再说
          </div>
          <div className={s.button} onClick={neverShow}>
            不再提示
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWAAlert

// TODO: 祖传代码
function getRederictURL() {
  // eslint-disable-next-line no-restricted-globals
  const url = location.href
  const basicURL = 'https://m.cc98.org/'

  if (url.match(/\/topic\//i)) {
    // 本周热门，本月热门，历史上的今天跳转到pwa热门话题
    if (url.match(/(hot-weekly|hot-monthly|hot-history)/i)) {
      return `${basicURL}hotTopics`
    }
    // 帖子跳转到pwa相应帖

    const topicID = url.match(/topic\/\d+/i)![0].match(/\d+/)![0]
    return `${basicURL}topic/${topicID}`
  }
  // 版面列表跳转到pwa的版面列表
  if (url.match(/boardList/i)) {
    return `${basicURL}boardList`
  }
  // 版面跳转到pwa相应版
  if (url.match(/\/board\//i)) {
    const boardID = url.match(/board\/\d+/i)![0].match(/\d+/)![0]
    return `${basicURL}board/${boardID}`
  }
  // 用户页跳转到pwa相应页
  if (url.match(/\/user\//)) {
    const userID = url.match(/user\/id\/\d+/i)![0].match(/\d+/)![0]
    return `${basicURL}user/${userID}`
  }
  // 其他页跳转到pwa首页

  return basicURL
}

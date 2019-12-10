import React from 'react'
import Button from 'src/components/Button'
import { changeSiteAnnouncement, clearHomePageCache, getGlobalConfig } from 'src/service/config'
import notice from 'src/utils/notice'
import UbbContainer from 'src/ubb'
import HomeContainer from 'src/pages/home/components/HomeContainer'
import ItemTitle from 'src/pages/home/components/ItemTitle'

import s from './Announcement.m.scss'

const Announcement: React.FC = () => {
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    getGlobalConfig().then(({ announcement }) => {
      setValue(announcement)
    })
  }, [])

  const handleSubmit = () => {
    changeSiteAnnouncement(value).then(() => {
      notice('修改成功')
    })
  }

  const handleClearCache = () => {
    clearHomePageCache().then(() => {
      notice('清除成功')
    })
  }

  return (
    <div>
      <p className={s.title}>
        <span className={s.titleContent}>全站公告</span>
        <Button primary onClick={handleSubmit}>
          提交修改
        </Button>
        <Button primary onClick={handleClearCache}>
          清除首页缓存
        </Button>
      </p>
      <textarea className={s.textarea} value={value} onChange={e => setValue(e.target.value)} />
      <ItemTitle title="全站公告" />
      <HomeContainer>
        <UbbContainer text={value} />
      </HomeContainer>
    </div>
  )
}

export default Announcement

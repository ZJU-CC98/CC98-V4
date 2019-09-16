import React from 'react'
import { getIndexConfig } from 'src/service/config'
import { IConfig } from '@cc98/api'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

import HomeRight from './HomeRight'
import HomeTop from './HomeTop'
import HomeContent from './HomeContent'
import s from './Home.m.scss'

const emptyData: IConfig = {
  academics: [],
  announcement: '',
  emotion: [],
  fleaMarket: [],
  fullTimeJob: [],
  hotTopic: [],
  lastUpdateTime: '',
  lastUserName: '',
  onlineUserCount: 0,
  partTimeJob: [],
  postCount: 0,
  recommendationFunction: [],
  recommendationReading: [],
  schoolEvent: [],
  schoolNews: [],
  study: [],
  todayCount: 0,
  topicCount: 0,
  userCount: 0,
}

/**
 * 主页由
 * 1. 右边的部分：推荐功能、校园新闻、广告、论坛统计
 * 2. 上面的部分：全站公告、推荐阅读
 * 3. 中间的部分：热门话题等
 * 组成
 *
 * @constructor
 */
const Home: React.FC = () => {
  const [data, setData] = React.useState(emptyData)

  React.useEffect(() => {
    getIndexConfig().then(setData)
  }, [])

  useBreadcrumb([])

  return (
    <div className={s.root}>
      <div className={s.top}>
        <HomeTop data={data} />
      </div>
      <div className={s.content}>
        <HomeContent data={data} />
      </div>
      <div className={s.right}>
        <HomeRight data={data} />
      </div>
    </div>
  )
}

export default Home

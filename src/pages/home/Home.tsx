import React from 'react'
import { getIndexConfig } from 'src/service/config'
import { IConfig } from '@cc98/api'

import HomeRight from './components/HomeRight'
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

const Home: React.FC = () => {
  const [data, setData] = React.useState(emptyData)

  React.useEffect(() => {
    getIndexConfig().then(setData)
  }, [])

  return (
    <div className={s.root}>
      <div className={s.top} />
      <div className={s.content} />
      <div className={s.right}>
        <HomeRight data={data} />
      </div>
    </div>
  )
}

export default Home

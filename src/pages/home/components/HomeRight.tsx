/**
 * 首页上右边的区域
 */

import React from 'react'
import { IConfig } from '@cc98/api'
import { Link } from 'react-router-dom'

import ItemTitle from 'src/pages/home/components/ItemTitle'
import s from 'src/pages/home/components/HomeRight.m.scss'

const statistics = [
  {
    key: 'todayCount',
    label: '今日帖数',
  },
  {
    key: 'topicCount',
    label: '论坛总主题数',
  },
  {
    key: 'postCount',
    label: '论坛总回复数',
  },
  {
    key: 'onlineUserCount',
    label: '在线用户数',
  },
  {
    key: 'userCount',
    label: '总用户数',
  },
  {
    key: 'lastUserName',
    label: '欢迎新用户',
    render: (name: string) => (
      <Link to={`/user/name/${name}`} style={{ color: '#444' }}>
        {name}
      </Link>
    ),
  },
]

interface IHomeRightProps {
  data: IConfig
}

const HomeRight: React.FC<IHomeRightProps> = ({ data }) => {
  return (
    <>
      <ItemTitle title="推荐功能" />
      <div className={s.recommends}>
        {data.recommendationFunction.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <a href={item.url} target="_blank" rel="noreferrer noopener">
              {item.title}
            </a>
          </div>
        ))}
      </div>
      <ItemTitle title="校园新闻" color="second" />
      <div className={s.news}>
        {data.schoolNews.map(item => (
          <p key={item.id}>
            <a href={item.url} target="_blank" rel="noreferrer noopener">
              {item.title}
            </a>
          </p>
        ))}
      </div>
      <ItemTitle title="论坛统计" color="second" />
      <div className={s.statistic}>
        {statistics.map(
          ({ key, label, render = () => <span>{data[key as keyof IConfig]}</span> }) => (
            <p key={key}>
              <span>{label}</span>
              {render(data[key as keyof IConfig] as any)}
            </p>
          )
        )}
      </div>
    </>
  )
}

export default HomeRight

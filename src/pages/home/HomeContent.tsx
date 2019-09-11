import React from 'react'
import { IBasicTopic, IConfig, IHotTopic } from '@cc98/api'

import ItemTitle from './components/ItemTitle'
import HomeContainer from './components/HomeContainer'

import s from './HomeContent.m.scss'

interface IHomeContentProps {
  data: IConfig
}

interface IItem {
  key: keyof IConfig
  label: string
  extraTitles?: {
    url: string
    name: string
  }[]
  render?: (data: any) => React.ReactNode
}

const items: IItem[] = [
  {
    key: 'hotTopic',
    label: '热门话题',
    extraTitles: [
      {
        url: '/topic/hot-weekly',
        name: '本周',
      },
      {
        url: '/topic/hot-monthly',
        name: '本月',
      },
      {
        url: '/topic/hot-history',
        name: '历史上的今天',
      },
    ],
    render: (item: IHotTopic) => (
      <>
        <a
          className={s.hotBoard}
          target="_blank"
          rel="noopener noreferrer"
          href={`/board/${item.boardId}`}
        >
          [{item.boardName}]
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`/topic/${item.id}/1`}>
          {item.title}
        </a>
      </>
    ),
  },
  {
    key: 'schoolEvent',
    label: '校园活动',
  },
  {
    key: 'academics',
    label: '学术信息',
  },
  {
    key: 'study',
    label: '学习园地',
    extraTitles: [
      {
        url: '/board/68',
        name: '学习',
      },
      {
        url: '/board/304',
        name: '外语',
      },
      {
        url: '/board/263',
        name: '考研',
      },
      {
        url: '/board/102',
        name: '出国',
      },
    ],
  },
  {
    key: 'emotion',
    label: '感性·情感',
    extraTitles: [
      {
        url: '/board/152',
        name: '缘分',
      },
      {
        url: '/board/114',
        name: '小屋',
      },
      {
        url: '/board/81',
        name: '感性',
      },
    ],
  },
  {
    key: 'fleaMarket',
    label: '跳蚤市场',
    extraTitles: [
      {
        url: '/board/562',
        name: '数码',
      },
      {
        url: '/board/80',
        name: '生活',
      },
      {
        url: '/board/563',
        name: '服饰',
      },
    ],
  },
  {
    key: 'fullTimeJob',
    label: '求职广场',
    extraTitles: [
      {
        url: '/board/235',
        name: '更多',
      },
    ],
  },
  {
    key: 'partTimeJob',
    label: '实习兼职',
    extraTitles: [
      {
        url: '/board/459',
        name: '更多',
      },
    ],
  },
]

const left = items.filter((_, index) => !(index % 2))
const right = items.filter((_, index) => index % 2)

const renderItem = (
  {
    key,
    label,
    extraTitles = [],
    render = (topic: IBasicTopic) => (
      <a target="_blank" rel="noopener noreferrer" href={`/topic/${topic.id}/1`}>
        {topic.title}
      </a>
    ),
  }: IItem,
  data: IConfig,
  index: number
) => {
  const color = !(index % 2) ? 'primary' : 'second'

  return (
    <React.Fragment key={key}>
      <ItemTitle
        color={color}
        title={label}
        extra={extraTitles.map(({ name, url }) => (
          <a
            className={s.extraTitle}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
            href={url}
          >
            {name}
          </a>
        ))}
      />
      <HomeContainer color={color} className={s.container}>
        {(data[key] as IBasicTopic[]).map(topic => (
          <p className={s.p} key={topic.id}>
            {render(topic)}
          </p>
        ))}
      </HomeContainer>
    </React.Fragment>
  )
}

const HomeContent: React.FC<IHomeContentProps> = ({ data }) => (
  <div className={s.root}>
    <div>{left.map((item, index) => renderItem(item, data, index))}</div>
    <div>{right.map((item, index) => renderItem(item, data, index))}</div>
  </div>
)

export default HomeContent

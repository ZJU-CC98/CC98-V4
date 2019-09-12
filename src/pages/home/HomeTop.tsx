import React from 'react'
import { IConfig } from '@cc98/api'
import Swipe from 'src/components/Swipe'

import ItemTitle from './components/ItemTitle'
import HomeContainer from './components/HomeContainer'

import s from './HomeTop.m.scss'

interface IHomeTopProps {
  data: IConfig
}

const HomeTop: React.FC<IHomeTopProps> = ({ data: { announcement, recommendationReading } }) => (
  <>
    <ItemTitle title="全站公告" />
    <HomeContainer>{announcement}</HomeContainer>
    <ItemTitle title="推荐阅读" color="second" />
    <HomeContainer color="second">
      <Swipe dotPosition="right">
        {recommendationReading.map(item => (
          <div key={item.id} className={s.recommend}>
            <img className={s.img} src={item.imageUrl} />
            <p className={s.title}>{item.title}</p>
            <p className={s.content}>{item.content}</p>
          </div>
        ))}
      </Swipe>
    </HomeContainer>
  </>
)

export default HomeTop

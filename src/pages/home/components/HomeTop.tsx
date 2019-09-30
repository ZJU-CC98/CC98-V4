import React from 'react'
import { IConfig } from '@cc98/api'
import Swipe from 'src/components/Swipe'

import ItemTitle from 'src/pages/home/components/ItemTitle'
import HomeContainer from 'src/pages/home/components/HomeContainer'

import s from 'src/pages/home/components/HomeTop.m.scss'
import UbbContainer from 'src/ubb'

interface IHomeTopProps {
  data: IConfig
}

const HomeTop: React.FC<IHomeTopProps> = ({ data: { announcement, recommendationReading } }) => (
  <>
    <ItemTitle title="全站公告" />
    <HomeContainer>
      <UbbContainer text={announcement} />
    </HomeContainer>
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

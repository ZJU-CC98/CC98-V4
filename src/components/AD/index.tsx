import React from 'react'
import { IAdvertisement } from '@cc98/api'
import Swipe from 'src/components/Swipe'
import { getADs } from 'src/service/config'

import s from './index.m.scss'

const AD: React.FC = () => {
  const [data, setData] = React.useState<IAdvertisement[]>([])

  React.useEffect(() => {
    getADs().then(setData)
  }, [])

  if (!data.length) return null

  return (
    <Swipe duration={20000} initValue={Math.floor(Math.random() * data.length)}>
      {data.map(({ imageUrl, id, url }) => (
        <div key={id}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img className={s.img} src={imageUrl} />
          </a>
        </div>
      ))}
    </Swipe>
  )
}

export default AD

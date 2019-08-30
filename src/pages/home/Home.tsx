import React from 'react'
import { Link } from 'react-router-dom'
import ThemeController from 'src/pages/home/components/ThemeController'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'

import s from './Home.m.scss'

function selector(store: RootStore) {
  return { theme: store.global.theme }
}

const Home: React.FC = () => {
  const { theme } = useSelector(selector)

  return (
    <div>
      <p>
        <Link to="/example">go to example page</Link>
      </p>
      <p>
        <ThemeController />
      </p>
      <p className={s.themeInfo}>current theme: {theme}</p>
    </div>
  )
}

export default Home

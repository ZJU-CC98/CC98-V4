import React from 'react'
import { RootStore } from 'src/store'
import { getPrimaryColor } from 'src/config/theme'
import { HashLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

import s from './index.m.scss'

// TODO: 我是不太愿意把 components 和 store 耦合
function selector(state: RootStore) {
  return {
    loadingColor: getPrimaryColor(state.global.theme),
  }
}

const Spin: React.FC = () => {
  return (
    <div className={s.root}>
      <HashLoader color={useSelector(selector).loadingColor} />
    </div>
  )
}

export default Spin

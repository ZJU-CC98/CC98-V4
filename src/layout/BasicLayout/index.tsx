import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import { RootStore } from 'src/store'
import { themeMap } from 'src/config/theme'

import GlobalHeader from 'src/layout/BasicLayout/GlobalHeader'
import s from './index.m.scss'

function selector(store: RootStore) {
  return {
    theme: store.global.theme,
  }
}

const BasicLayout: React.FC<RouteComponentProps> = ({ children, location: { pathname } }) => {
  const { theme } = useSelector(selector)

  return (
    <div className={s.basicLayoutRoot}>
      <div className={s.header}>
        <GlobalHeader />
        {pathname === '/' && (
          <div
            className={s.headerImage}
            style={{ backgroundImage: `url(${themeMap[theme].homeHeaderImageURL}` }}
          />
        )}
      </div>
      <div className={s.main}>{children}</div>
      <div className={s.footer}>Global Footer</div>
    </div>
  )
}

export default withRouter(BasicLayout)

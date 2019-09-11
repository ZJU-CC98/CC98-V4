import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import { RootStore } from 'src/store'
import { defaultTheme, themeMap } from 'src/config/theme'

import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import s from './index.m.scss'

function selector(store: RootStore) {
  return {
    theme: store.global.theme,
  }
}

const BasicLayout: React.FC<RouteComponentProps> = ({ children, location: { pathname } }) => {
  const { theme } = useSelector(selector)
  const isHome = pathname === '/'

  return (
    <div className={s.basicLayoutRoot}>
      <div className={s.header}>
        <GlobalHeader isHome={isHome} />
        {isHome && (
          <div
            className={s.headerImage}
            style={{
              backgroundImage: `url(${
                (themeMap[theme] || themeMap[defaultTheme]).homeHeaderImageURL
              }`,
            }}
          />
        )}
      </div>
      <div className={s.main}>{children}</div>
      <div className={s.footer}>
        <GlobalFooter />
      </div>
    </div>
  )
}

export default withRouter(BasicLayout)

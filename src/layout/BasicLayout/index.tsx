import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import { RootStore } from 'src/store'
import { defaultTheme, themeMap } from 'src/config/theme'
import { errorComponentMap } from 'src/constants/Error'

import Breadcrumb from 'src/components/Breadcrumb'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import s from './index.m.scss'

function selector(store: RootStore) {
  return {
    theme: store.global.theme,
    breadcrumb: store.global.breadcrumb,
    error: store.global.error,
  }
}

const BasicLayout: React.FC<RouteComponentProps> = ({ children, location: { pathname } }) => {
  const { theme, breadcrumb, error } = useSelector(selector)
  const ErrorComponent = errorComponentMap[error!]
  const isHome = pathname === '/'

  return (
    <div className={s.basicLayoutRoot}>
      <div className={s.header}>
        <GlobalHeader isHome={isHome} />
      </div>
      <div className={s.main}>
        {isHome && (
          <div className={s.headerImage}>
            <img
              style={{ height: '100%' }}
              src={(themeMap[theme] || themeMap[defaultTheme]).homeHeaderImageURL}
            />
          </div>
        )}
        {!!breadcrumb.length && <Breadcrumb className={s.breadcrumb} data={breadcrumb} />}
        {error ? <ErrorComponent /> : children}
      </div>
      <div className={s.footer}>
        <GlobalFooter />
      </div>
    </div>
  )
}

export default withRouter(BasicLayout)

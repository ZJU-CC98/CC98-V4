import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { NavLink, RouteComponentProps } from 'react-router-dom'

import s from './index.m.scss'

export interface INavItem {
  name: string
  icon?: IconProp
  path: string
  exact?: boolean
  pathSuffix?: string
  Component: React.ComponentType<RouteComponentProps>
}

const Nav: React.FC<{
  basePath: string
  navs: INavItem[]
}> = React.memo(({ basePath, navs }) => (
  <div className={s.root}>
    {navs.map(({ icon, name, path, exact = false }) => (
      <NavLink
        key={path}
        activeClassName={s.itemActive}
        className={s.item}
        exact={exact}
        to={`${basePath}${path}`}
      >
        {icon && <Icon icon={icon} />}
        <span className={s.name}>{name}</span>
      </NavLink>
    ))}
  </div>
))

export default Nav

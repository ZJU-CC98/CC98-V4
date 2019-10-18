import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
import FocusBoard from 'src/pages/focus/board/FocusBoard'
import FocusUser from 'src/pages/focus/user/FocusUser'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { BreadcrumbItem } from 'src/components/Breadcrumb'

import s from './Foucs.m.scss'

const breadcrumb: BreadcrumbItem[] = []

const Focus: React.FC = () => {
  useBreadcrumb(breadcrumb)

  return (
    <>
      <div>
        <NavLink className={s.nav} activeClassName={s.navActive} to="/focus/board">
          关注版面
        </NavLink>
        <NavLink className={s.nav} activeClassName={s.navActive} to="/focus/user">
          关注用户
        </NavLink>
      </div>
      <Switch>
        <Route path="/focus/board" component={FocusBoard} />
        <Route path="/focus/user" component={FocusUser} />
        <Redirect to="/focus/board" />
      </Switch>
    </>
  )
}

export default Focus

import React from 'react'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { RootStore } from 'src/store'
import { useSelector } from 'react-redux'

interface ICustomRouteProps extends RouteProps {
  needLogOn?: boolean
}

function selector(state: RootStore) {
  return {
    isLogOn: state.global.isLogin,
  }
}

const CustomRoute: React.FC<ICustomRouteProps> = ({ needLogOn, ...rest }) => {
  const history = useHistory()
  const { isLogOn } = useSelector(selector)

  React.useEffect(() => {
    if (!isLogOn && needLogOn) {
      history.push('/error/not-log-on')
    }
  }, [needLogOn, isLogOn])

  if (!isLogOn && needLogOn) return null

  return <Route {...rest} />
}

export default CustomRoute

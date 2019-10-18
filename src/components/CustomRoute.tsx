import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { RootStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import ERROR from 'src/constants/Error'

interface ICustomRouteProps extends RouteProps {
  needLogOn?: boolean
}

function selector(state: RootStore) {
  return {
    isLogOn: state.global.isLogin,
  }
}

const CustomRoute: React.FC<ICustomRouteProps> = ({ needLogOn, ...rest }) => {
  const dispatch = useDispatch()
  const { isLogOn } = useSelector(selector)

  React.useEffect(() => {
    if (!isLogOn && needLogOn) {
      dispatch({
        type: GLOBAL_ACTION_TYPES.SET_ERROR,
        payload: ERROR.NOT_LOG_ON,
      } as GlobalActions)
    }
  }, [needLogOn, isLogOn])

  if (!isLogOn && needLogOn) return null

  return <Route {...rest} />
}

export default CustomRoute

import { AsyncAction } from 'src/utils/types'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { RouterAction } from 'connected-react-router'
import { getMe, getSignInInfo } from 'src/service/user'
import { getAllMessageCount } from 'src/service/message'
import LOCK_STATE from 'src/constants/LockState'
import ERROR from 'src/constants/Error'

export type GlobalAsyncAction = AsyncAction<GlobalActions | RouterAction>

export const refreshUserInfo: () => GlobalAsyncAction = () => dispatch => {
  return getMe(true).then(user => {
    if (user.lockState !== LOCK_STATE.NORMAL) {
      dispatch({
        type: GLOBAL_ACTION_TYPES.LOGOUT,
      })

      dispatch({
        type: GLOBAL_ACTION_TYPES.SET_ERROR,
        payload: ERROR.USER_LOCKED,
      })
    }

    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_CURRENT_USER,
      payload: user,
    })
  })
}

export const refreshMessageCount: () => GlobalAsyncAction = () => dispatch => {
  return getAllMessageCount().then(messageCount => {
    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT,
      payload: messageCount,
    })
  })
}

export const refreshSignInInfo: (
  ignoreCache?: boolean
) => GlobalAsyncAction = ignoreCache => dispatch => {
  return getSignInInfo(ignoreCache).then(payload => {
    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_SIGN_IN_INFO,
      payload,
    })
  })
}

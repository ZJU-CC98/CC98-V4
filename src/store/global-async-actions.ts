import { AsyncAction } from 'src/utils/types'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { RouterAction } from 'connected-react-router'
import { getMe } from 'src/service/user'

export type GlobalAsyncAction = AsyncAction<GlobalActions | RouterAction>

export const refreshUserInfo: () => GlobalAsyncAction = () => dispatch => {
  return getMe(true).then(user => {
    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_CURRENT_USER,
      payload: user,
    })
  })
}

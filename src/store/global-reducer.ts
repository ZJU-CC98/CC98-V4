import produce from 'immer'
import { THEME } from '../constants/theme'
import { GLOBAL_ACTION_TYPES, GlobalActions } from './global-actions'

export interface IGlobalState {
  theme: THEME
}

const initState: IGlobalState = {
  theme: THEME.LIGHT,
}

const reducer = (state = initState, action: GlobalActions) =>
  produce(state, draft => {
    switch (action.type) {
      case GLOBAL_ACTION_TYPES.SET_THEME:
        draft.theme = action.payload

        return
      default:
        return
    }
  })

export default reducer

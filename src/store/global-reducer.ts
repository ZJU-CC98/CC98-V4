import produce from 'immer'
import cssVars from 'css-vars-ponyfill'
import { defaultTheme, themeMap } from 'src/config/theme'
import THEME from 'src/constants/theme'
import { GLOBAL_ACTION_TYPES, GlobalActions } from './global-actions'

export interface IGlobalState {
  theme: THEME
}

const initState: IGlobalState = {
  theme: defaultTheme,
}

cssVars({
  variables: themeMap[defaultTheme].palette,
})

const reducer = (state = initState, action: GlobalActions) =>
  produce(state, draft => {
    switch (action.type) {
      case GLOBAL_ACTION_TYPES.SET_THEME:
        if (state.theme === action.payload) {
          return
        }

        draft.theme = action.payload
        cssVars({
          variables: themeMap[action.payload].palette,
        })

        return
      default:
        return
    }
  })

export default reducer

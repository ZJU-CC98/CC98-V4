import produce from 'immer'
import cssVars from 'css-vars-ponyfill'
import { IUser } from '@cc98/api'
import { defaultTheme, themeMap } from 'src/config/theme'
import THEME from 'src/constants/theme'
import { getLocalStorage } from 'src/utils/storage'
import { GLOBAL_ACTION_TYPES, GlobalActions } from './global-actions'

export interface IGlobalState {
  theme: THEME

  isLogin: boolean
  currentUser: IUser | null
}

const initIsLogin = !!getLocalStorage('refreshToken')
const initUser: IUser | null = getLocalStorage('userInfo') || null
const initTheme = (initUser && initUser.theme) || defaultTheme

const initState: IGlobalState = {
  theme: initTheme,
  isLogin: initIsLogin,
  currentUser: initIsLogin ? initUser : null,
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
      case GLOBAL_ACTION_TYPES.LOGIN_AND_SET_CURRENT_USER:
        draft.isLogin = true
        draft.currentUser = action.payload

        return
      case GLOBAL_ACTION_TYPES.LOGOUT:
        draft.isLogin = false
        draft.currentUser = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userInfo')

        return
      default:
        return
    }
  })

export default reducer

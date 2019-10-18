import produce from 'immer'
import cssVars from 'css-vars-ponyfill'
import { IMessageCount, ISignIn, IUser } from '@cc98/api'
import { defaultTheme, themeMap } from 'src/config/theme'
import THEME from 'src/constants/Theme'
import { getLocalStorage, removeLocalStorage } from 'src/utils/storage'
import { BreadcrumbItem } from 'src/components/Breadcrumb'
import ERROR from 'src/constants/Error'
import { GLOBAL_ACTION_TYPES, GlobalActions } from './global-actions'

export interface IGlobalState {
  theme: THEME

  isLogin: boolean
  currentUser: IUser | null

  breadcrumb: BreadcrumbItem[]

  messageCount: IMessageCount

  signInInfo: ISignIn | null

  error: ERROR | null
}

const initIsLogin = !!getLocalStorage('refreshToken')
const initUser: IUser | null = getLocalStorage('userInfo') || null
const initTheme = (initUser && initUser.theme) || defaultTheme
const initMessageCount: IMessageCount = {
  systemCount: 0,
  messageCount: 0,
  atCount: 0,
  replyCount: 0,
}
const initSignIn = getLocalStorage<ISignIn>('signInInfo') || null

const initState: IGlobalState = {
  theme: initTheme,
  isLogin: initIsLogin,
  currentUser: initIsLogin ? initUser : null,
  breadcrumb: [],
  messageCount: initMessageCount,
  error: null,
  signInInfo: initSignIn,
}

cssVars({
  variables: themeMap[initTheme].palette,
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
        draft.messageCount = initMessageCount
        draft.signInInfo = null
        removeLocalStorage('accessToken')
        removeLocalStorage('refreshToken')
        removeLocalStorage('userInfo')
        removeLocalStorage('signInInfo')

        return
      case GLOBAL_ACTION_TYPES.SET_CURRENT_USER:
        draft.currentUser = action.payload

        return
      case GLOBAL_ACTION_TYPES.SET_BREADCRUMB:
        draft.breadcrumb = action.payload

        return
      case GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT:
        draft.messageCount = Object.assign(draft.messageCount, action.payload)

        return
      case GLOBAL_ACTION_TYPES.SET_SIGN_IN_INFO:
        draft.signInInfo = action.payload

        return
      case GLOBAL_ACTION_TYPES.SET_ERROR:
        draft.error = action.payload

        return
      default:
        return
    }
  })

export default reducer

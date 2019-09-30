import { IUser } from '@cc98/api'
import THEME from 'src/constants/theme'
import { BreadcrumbItem } from 'src/components/Breadcrumb'

export enum GLOBAL_ACTION_TYPES {
  SET_THEME = 'SET_THEME',
  LOGIN_AND_SET_CURRENT_USER = 'LOGIN_AND_SET_CURRENT_USER',
  LOGOUT = 'LOGOUT',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_BREADCRUMB = 'SET_BREADCRUMB',
}

export type GlobalActions =
  | {
      type: GLOBAL_ACTION_TYPES.SET_THEME
      payload: THEME
    }
  | {
      type: GLOBAL_ACTION_TYPES.LOGIN_AND_SET_CURRENT_USER
      payload: IUser
    }
  | {
      type: GLOBAL_ACTION_TYPES.LOGOUT
    }
  | {
      type: GLOBAL_ACTION_TYPES.SET_CURRENT_USER
      payload: IUser
    }
  | {
      type: GLOBAL_ACTION_TYPES.SET_BREADCRUMB
      payload: BreadcrumbItem[]
    }

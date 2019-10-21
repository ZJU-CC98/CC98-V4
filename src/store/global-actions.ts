import { IMessageCount, IUser } from '@cc98/api'
import THEME from 'src/constants/Theme'
import { BreadcrumbItem } from 'src/components/Breadcrumb'
import ERROR from 'src/constants/Error'

export enum GLOBAL_ACTION_TYPES {
  SET_THEME = 'SET_THEME',
  LOGIN_AND_SET_CURRENT_USER = 'LOGIN_AND_SET_CURRENT_USER',
  LOGOUT = 'LOGOUT',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_BREADCRUMB = 'SET_BREADCRUMB',
  SET_MESSAGE_COUNT = 'SET_MESSAGE_COUNT',
  SET_ERROR = 'SET_ERROR',
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
  | {
      type: GLOBAL_ACTION_TYPES.SET_MESSAGE_COUNT
      payload: Partial<IMessageCount>
    }
  | {
      type: GLOBAL_ACTION_TYPES.SET_ERROR
      payload: ERROR | null
    }

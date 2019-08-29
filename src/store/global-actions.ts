import { THEME } from '../constants/theme'

export enum GLOBAL_ACTION_TYPES {
  SET_THEME = 'SET_THEME',
}

export type GlobalActions = {
  type: GLOBAL_ACTION_TYPES.SET_THEME
  payload: THEME
}

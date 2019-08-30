import { DeepReadonly } from 'src/utils/types'
import THEME from 'src/constants/theme'

interface IThemeInfo {
  homeHeaderImageURL: string
  palette: Record<string, string>
}

export const defaultTheme = THEME.LIGHT

export const themeMap: DeepReadonly<
  {
    [key in THEME]: IThemeInfo
  }
> = {
  [THEME.LIGHT]: {
    homeHeaderImageURL: 'todo',
    palette: {
      primary: 'white',
      'text-color': 'black',
      'some-other-var': 'red',
    },
  },
  [THEME.DARK]: {
    homeHeaderImageURL: 'todo',
    palette: {
      primary: 'black',
      'text-color': 'white',
    },
  },
}

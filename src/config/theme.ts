import THEME, { THEME_MODE } from 'src/constants/theme'
import { hex2rgb, rgb2hex } from 'src/utils/css'

import summer from 'src/assets/home/summer.jpg'

interface IThemeInfo {
  theme: THEME
  mode: THEME_MODE
  homeHeaderImageURL: string
  palette: Record<string, string>
}

export const defaultTheme = THEME.SUMMER

const themeList: IThemeInfo[] = [
  {
    theme: THEME.SUMMER,
    homeHeaderImageURL: summer,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#5198d8',
      second: '#6b7178',
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'global-background-color': '#e6e7ec',
      'main-background-color': 'white',
      'text-color': 'black',
    },
  },
  {
    theme: THEME.MID_AUTUMN,
    mode: THEME_MODE.DARK,
    homeHeaderImageURL: 'todo',
    palette: {
      primary: '#000000',
      'text-color': 'white',
    },
  },
]

export const themeMap = makeThemeMap(themeList)

export function getPrimaryColor(theme: THEME) {
  return rgb2hex(themeMap[theme].palette.primary)
}

function makeThemeMap(themes: IThemeInfo[]) {
  return themes.reduce(
    (res, curr) => {
      res[curr.theme] = {
        ...curr,
        palette: {
          ...curr.palette,
          primary: hex2rgb(curr.palette.primary),
        },
      }

      if (curr.theme === defaultTheme) {
        res[THEME.DEFAULT] = {
          ...curr,
          palette: {
            ...curr.palette,
            primary: hex2rgb(curr.palette.primary),
          },
        }
      }

      return res
    },
    {} as { [key in THEME]: Omit<IThemeInfo, 'theme'> }
  )
}

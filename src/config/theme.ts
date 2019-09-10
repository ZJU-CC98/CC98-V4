import THEME from 'src/constants/theme'
import { hex2rgb } from 'src/utils/css'

import summer from 'src/assets/home/summer.jpg'

interface IThemeInfo {
  theme: THEME
  homeHeaderImageURL: string
  palette: Record<string, string>
}

export const defaultTheme = THEME.WINTER

const themeList: IThemeInfo[] = [
  {
    theme: THEME.WINTER,
    homeHeaderImageURL: summer,
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
    theme: THEME.DARK,
    homeHeaderImageURL: 'todo',
    palette: {
      primary: '#000000',
      'text-color': 'white',
    },
  },
]

export const themeMap = makeThemeMap(themeList)

function makeThemeMap(themes: IThemeInfo[]) {
  return themes.reduce(
    (res, curr) => {
      res[curr.theme] = {
        homeHeaderImageURL: curr.homeHeaderImageURL,
        palette: {
          ...curr.palette,
          primary: hex2rgb(curr.palette.primary),
        },
      }

      if (curr.theme === defaultTheme) {
        res[THEME.DEFAULT] = {
          homeHeaderImageURL: curr.homeHeaderImageURL,
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

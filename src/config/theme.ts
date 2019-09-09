import THEME from 'src/constants/theme'
import { hex2rgb } from 'src/utils/css'

interface IThemeInfo {
  theme: THEME
  homeHeaderImageURL: string
  palette: Record<string, string>
}

export const defaultTheme = THEME.LIGHT

const themeList: IThemeInfo[] = [
  {
    theme: THEME.LIGHT,
    homeHeaderImageURL: 'todo',
    palette: {
      primary: '#5198d8',
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

      return res
    },
    {} as { [key in THEME]: Omit<IThemeInfo, 'theme'> }
  )
}

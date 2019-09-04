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
      'text-color': 'black',
      'global-background-color': '#e6e7ec',
      'main-background-color': 'white',
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

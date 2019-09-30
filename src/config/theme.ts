import THEME, { THEME_MODE } from 'src/constants/Theme'
import { hex2rgb, rgb2hex } from 'src/utils/css'

import spring from 'src/assets/home/spring.jpg'
import summer from 'src/assets/home/summer.jpg'
import autumn from 'src/assets/home/autumn.jpg'
import winter from 'src/assets/home/winter.jpg'
import single from 'src/assets/home/singleday.jpg'
import midAutumn from 'src/assets/home/mid_autumn.jpg'

interface IThemeInfo {
  theme: THEME
  mode: THEME_MODE
  homeHeaderImageURL: string
  palette: Record<string, string>
}

export const defaultTheme = THEME.SUMMER

/**
 * 颜色只能使用 hex
 */
const themeList: IThemeInfo[] = [
  {
    theme: THEME.BLUE,
    homeHeaderImageURL: winter,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#79b8ca',
      second: '#6b7178',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.GREEN,
    homeHeaderImageURL: spring,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#b1d396',
      second: '#f595a9',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.MORE_GREEN,
    homeHeaderImageURL: spring,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#95b675',
      second: '#c490bf',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
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
    theme: THEME.AUTUMN_ORANGE,
    homeHeaderImageURL: autumn,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#E1975A',
      second: '#6b7178',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.AUTUMN_RED,
    homeHeaderImageURL: autumn,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#B22222',
      second: '#6b7178',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.SINGLE_DAY,
    homeHeaderImageURL: single,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#f07d91',
      second: '#79b8ca',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.MID_AUTUMN,
    mode: THEME_MODE.DARK,
    homeHeaderImageURL: midAutumn,
    palette: {
      primary: '#267681',
      second: '#a45b86',
      'global-background-color': '#1e1e1e', // 页面的背景色
      'main-background-color': '#bbbbbb', // 内容的背景色
      'text-color-primary': 'black', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
    },
  },
  {
    theme: THEME.MID_AUTUMN_LIGHT,
    homeHeaderImageURL: midAutumn,
    mode: THEME_MODE.LIGHT,
    palette: {
      primary: '#34969f',
      second: '#a45b86',
      'global-background-color': '#e6e7ec', // 页面的背景色
      'main-background-color': 'white', // 内容的背景色
      'text-color-primary': 'white', // 当背景色是 primary 时的文字颜色
      'text-color': 'black',
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

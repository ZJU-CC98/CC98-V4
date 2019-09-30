enum THEME {
  DEFAULT = 0,
  WINTER = 1,
  SUMMER = 4,
  DARK,
}

export default THEME

export enum THEME_MODE {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export function getThemeName(theme: THEME) {
  switch (theme) {
    case THEME.DARK:
      return '暗色主题'
    case THEME.WINTER:
      return '冬季'
    case THEME.SUMMER:
      return '夏季'
    case THEME.DEFAULT:
      return '默认主题'
    default:
      return '未知'
  }
}

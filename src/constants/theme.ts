export enum THEME {
  DEFAULT = 0,
  WINTER,
  DARK,
}

export default THEME

export function getThemeName(theme: THEME) {
  switch (theme) {
    case THEME.DARK:
      return '暗色主题'
    case THEME.WINTER:
      return '冬季'
    case THEME.DEFAULT:
      return '默认主题'
    default:
      return '未知'
  }
}

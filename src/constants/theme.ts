export enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export default THEME

export function getThemeName(theme: THEME) {
  switch (theme) {
    case THEME.DARK:
      return '暗色主题'
    case THEME.LIGHT:
      return '亮色主题'
    default:
      return '未知'
  }
}

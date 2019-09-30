enum THEME {
  DEFAULT = 0,
  BLUE,
  GREEN,
  MORE_GREEN,
  SUMMER,
  AUTUMN_ORANGE,
  AUTUMN_RED,
  SINGLE_DAY,
  MID_AUTUMN,
  MID_AUTUMN_LIGHT,
}

export default THEME

export enum THEME_MODE {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export function getThemeName(theme: THEME) {
  switch (theme) {
    case THEME.MID_AUTUMN:
      return '暗色主题'
    case THEME.BLUE:
      return '冬季'
    case THEME.SUMMER:
      return '夏季'
    case THEME.DEFAULT:
      return '默认主题'
    default:
      return '未知'
  }
}

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
    case THEME.DEFAULT:
      return '系统默认'
    case THEME.BLUE:
      return '冬季'
    case THEME.GREEN:
      return '春季（浅色）'
    case THEME.MORE_GREEN:
      return '春季（深色）'
    case THEME.SUMMER:
      return '夏季'
    case THEME.AUTUMN_ORANGE:
      return '秋季（橙色）'
    case THEME.AUTUMN_RED:
      return '秋季（红色）'
    case THEME.SINGLE_DAY:
      return '双十一交友'
    case THEME.MID_AUTUMN:
      return '中秋（暗）'
    case THEME.MID_AUTUMN_LIGHT:
      return '中秋（亮）'
    default:
      return '未知'
  }
}

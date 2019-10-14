enum NOTIFICATION_TYPE {
  SYSTEM = 1,
  REPLY = 2,
  AT = 3,
}

export default NOTIFICATION_TYPE

export function getNotificationTypeDesc(type: NOTIFICATION_TYPE) {
  switch (type) {
    case NOTIFICATION_TYPE.SYSTEM:
      return '系统'
    case NOTIFICATION_TYPE.AT:
      return '@'
    case NOTIFICATION_TYPE.REPLY:
      return '回复'
    default:
      return ''
  }
}

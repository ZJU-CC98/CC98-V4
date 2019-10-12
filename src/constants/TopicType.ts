enum TOPIC_TYPE {
  NORMAL = 0,
  ACADEMIC = 2,
  ACTIVITY = 1,
}

export default TOPIC_TYPE

export function getTopicTypeDesc(type: TOPIC_TYPE) {
  switch (type) {
    case TOPIC_TYPE.ACADEMIC:
      return '学术信息'
    case TOPIC_TYPE.ACTIVITY:
      return '校园活动'
    case TOPIC_TYPE.NORMAL:
      return '普通'

    default:
      return '未知'
  }
}

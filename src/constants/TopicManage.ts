import { ITopic, IUser } from '@cc98/api'
import PRIVILEGE from 'src/constants/Privilege'

export enum TOPIC_MANAGE_TYPE {
  LOCK_TOPIC = 'LOCK_TOPIC',
  UNLOCK_TOPIC = ' UNLOCK_TOPIC',
  DISABLE_HOT = 'DISABLE_HOT',
  CANCEL_DISABLE_HOT = 'CANCEL_DISABLE_HOT',
  DELETE_TOPIC = 'DELETE_TOPIC',
  MOVE_TOPIC = 'MOVE_TOPIC',
  UP_TOPIC = 'UP_TOPIC',
  SET_BOARD_TOP = 'SET_BOARD_TOP',
  CANCEL_BOARD_TOP = 'CANCEL_BOARD_TOP',
  SET_SITE_TOP = 'SET_SITE_TOP',
  CANCEL_SITE_TOP = 'CANCEL_SITE_TOP',
  SET_BEST_TOPIC = 'SET_BEST_TOPIC',
  CANCEL_BEST_TOPIC = 'CANCEL_BEST_TOPIC',
  SET_HIGH_LIGHT = 'SET_HIGH_LIGHT',
}

export function getTopicManageTypeDesc(type: TOPIC_MANAGE_TYPE) {
  switch (type) {
    case TOPIC_MANAGE_TYPE.LOCK_TOPIC:
      return '锁定'
    case TOPIC_MANAGE_TYPE.UNLOCK_TOPIC:
      return '解锁'
    case TOPIC_MANAGE_TYPE.DISABLE_HOT:
      return '禁止热门'
    case TOPIC_MANAGE_TYPE.CANCEL_DISABLE_HOT:
      return '允许热门'
    case TOPIC_MANAGE_TYPE.DELETE_TOPIC:
      return '删除'
    case TOPIC_MANAGE_TYPE.MOVE_TOPIC:
      return '移动'
    case TOPIC_MANAGE_TYPE.UP_TOPIC:
      return '提升'
    case TOPIC_MANAGE_TYPE.SET_BOARD_TOP:
      return '固顶'
    case TOPIC_MANAGE_TYPE.CANCEL_BOARD_TOP:
      return '取消固顶'
    case TOPIC_MANAGE_TYPE.SET_SITE_TOP:
      return '全站固顶'
    case TOPIC_MANAGE_TYPE.CANCEL_SITE_TOP:
      return '取消全站固顶'
    case TOPIC_MANAGE_TYPE.SET_BEST_TOPIC:
      return '加精'
    case TOPIC_MANAGE_TYPE.CANCEL_BEST_TOPIC:
      return '取消精华'
    case TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT:
      return '高亮'
    default:
      return '未知'
  }
}

export function getAvailableTopicManageTypes(topicInfo?: ITopic, user?: IUser | null) {
  if (!topicInfo || !user) {
    return []
  }

  const availableTypes: TOPIC_MANAGE_TYPE[] = []

  if (topicInfo.state === 1) {
    availableTypes.push(TOPIC_MANAGE_TYPE.UNLOCK_TOPIC)
  } else {
    availableTypes.push(TOPIC_MANAGE_TYPE.LOCK_TOPIC)
  }

  if (topicInfo.disableHot) {
    availableTypes.push(TOPIC_MANAGE_TYPE.CANCEL_DISABLE_HOT)
  } else {
    availableTypes.push(TOPIC_MANAGE_TYPE.DISABLE_HOT)
  }

  availableTypes.push(
    TOPIC_MANAGE_TYPE.DELETE_TOPIC,
    TOPIC_MANAGE_TYPE.MOVE_TOPIC,
    TOPIC_MANAGE_TYPE.UP_TOPIC
  )

  if (topicInfo.topState === 2) {
    availableTypes.push(TOPIC_MANAGE_TYPE.CANCEL_BOARD_TOP)
  } else {
    availableTypes.push(TOPIC_MANAGE_TYPE.SET_BOARD_TOP)
  }

  if (user.privilege === PRIVILEGE.ADMIN) {
    if (topicInfo.topState === 4) {
      availableTypes.push(TOPIC_MANAGE_TYPE.CANCEL_SITE_TOP)
    } else {
      availableTypes.push(TOPIC_MANAGE_TYPE.SET_SITE_TOP)
    }
  }

  if (topicInfo.bestState === 1) {
    availableTypes.push(TOPIC_MANAGE_TYPE.CANCEL_BEST_TOPIC)
  } else {
    availableTypes.push(TOPIC_MANAGE_TYPE.SET_BEST_TOPIC)
  }

  availableTypes.push(TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT)

  return availableTypes
}

export const TOPIC_MANAGE_SHOW_DAY_TYPES = [
  TOPIC_MANAGE_TYPE.LOCK_TOPIC,
  TOPIC_MANAGE_TYPE.SET_BOARD_TOP,
  TOPIC_MANAGE_TYPE.SET_SITE_TOP,
  TOPIC_MANAGE_TYPE.SET_HIGH_LIGHT,
]

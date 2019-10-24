import { without } from 'lodash'
import { IUser } from '@cc98/api'
import PRIVILEGE from 'src/constants/Privilege'

export enum POST_MANAGE_TYPE {
  ADD_WEALTH = 'ADD_WEALTH',
  ADD_PRESTIGE = 'ADD_PRESTIGE',
  PUNISH_WEALTH = 'PUNISH_WEALTH',
  PUNISH_PRESTIGE = 'PUNISH_PRESTIGE',
  DELETE = 'DELETE',
  TP = 'TP',
  CANCEL_TP = 'CANCEL_TP',
}

const ALL_POST_MANAGE_TYPE = Object.values(POST_MANAGE_TYPE) as POST_MANAGE_TYPE[]
const NORMAL_POST_MANAGE_TYPE = without(
  ALL_POST_MANAGE_TYPE,
  POST_MANAGE_TYPE.ADD_PRESTIGE,
  POST_MANAGE_TYPE.PUNISH_PRESTIGE
)

export function getPostAvailableManageTypes(user?: IUser | null) {
  if (!user) return []

  if (user.privilege === PRIVILEGE.ADMIN) return ALL_POST_MANAGE_TYPE

  return NORMAL_POST_MANAGE_TYPE
}

export function getPostManageTypeName(type: POST_MANAGE_TYPE) {
  switch (type) {
    case POST_MANAGE_TYPE.ADD_PRESTIGE:
      return '奖励威望'
    case POST_MANAGE_TYPE.ADD_WEALTH:
      return '奖励财富值'
    case POST_MANAGE_TYPE.CANCEL_TP:
      return '解除TP'
    case POST_MANAGE_TYPE.DELETE:
      return '删除'
    case POST_MANAGE_TYPE.PUNISH_PRESTIGE:
      return '扣除威望'
    case POST_MANAGE_TYPE.PUNISH_WEALTH:
      return '扣除财富值'
    case POST_MANAGE_TYPE.TP:
      return 'TP'
    default:
      return '未知'
  }
}

export const POST_SHOW_WEALTH_INPUT_TYPES = [
  POST_MANAGE_TYPE.ADD_WEALTH,
  POST_MANAGE_TYPE.PUNISH_WEALTH,
]
export const POST_SHOW_PRESTIGE_INPUT_TYPES = [
  POST_MANAGE_TYPE.ADD_PRESTIGE,
  POST_MANAGE_TYPE.PUNISH_PRESTIGE,
]
export const POST_SHOW_REASON_TYPES = without(ALL_POST_MANAGE_TYPE, POST_MANAGE_TYPE.CANCEL_TP)
export const POST_SHOW_DAYS_INPUT_TYPES = [POST_MANAGE_TYPE.TP]

const POSITIVE_REASON = ['好文章', '有用资源', '热心回复']
const NEGATIVE_REASON = ['人身攻击', '违反版规', '恶意灌水']

export const postReasonMap: { [type in POST_MANAGE_TYPE]?: string[] } = {
  [POST_MANAGE_TYPE.ADD_WEALTH]: POSITIVE_REASON,
  [POST_MANAGE_TYPE.ADD_PRESTIGE]: POSITIVE_REASON,
  [POST_MANAGE_TYPE.PUNISH_WEALTH]: NEGATIVE_REASON,
  [POST_MANAGE_TYPE.PUNISH_PRESTIGE]: NEGATIVE_REASON,
}

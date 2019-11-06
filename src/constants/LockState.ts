enum LOCK_STATE {
  /**
   * 正常
   */
  NORMAL = 0,
  /**
   * 锁定
   */
  LOCK = 1,
  /**
   * 屏蔽
   */
  HIDDEN = 2,
  /**
   * 全站TP
   */
  GLOBAL_BAN = 3,
}

export default LOCK_STATE

export function getLockStateDesc(lockState: LOCK_STATE) {
  switch (lockState) {
    case LOCK_STATE.NORMAL:
      return '正常'
    case LOCK_STATE.LOCK:
      return '锁定'
    case LOCK_STATE.HIDDEN:
      return '屏蔽'
    case LOCK_STATE.GLOBAL_BAN:
      return '全站TP'
    default:
      return '未知'
  }
}

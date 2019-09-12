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

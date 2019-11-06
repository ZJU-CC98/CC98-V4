declare module '@cc98/api' {
  import LOCK_STATE from 'src/constants/LockState'

  export interface IUserOperation {
    /**
     * 1=锁定，2=屏蔽，3=tp
     */
    PunishmentType: LOCK_STATE
    /**
     * 0=取消，1=执行
     */
    OperationType: 0 | 1
    /**
     * -1表示永久，其余7<Days<1000
     */
    Days?: number
    /**
     * 理由
     */
    Reason: string
  }
}

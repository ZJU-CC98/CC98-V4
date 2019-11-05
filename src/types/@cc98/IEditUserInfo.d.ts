declare module '@cc98/api' {
  export interface IEditUserInfo {
    /**
     * 性别 男=1 女=0
     */
    Gender: 0 | 1
    /**
     * QQ
     */
    QQ: string
    /**
     * 邮箱地址
     */
    EmailAddress: string
    /**
     * 个性签名
     */
    SignatureCode: string
    /**
     * 个人简介
     */
    Introduction: string
    /**
     * 生日
     */
    Birthday: string
    /**
     *
     */
    DisplayTitleId: number

    // 前端用
    BirthdayYear: number
    BirthdayMonth: number
    BirthdayDay: number
  }
}

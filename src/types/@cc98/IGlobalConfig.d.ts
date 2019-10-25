declare module '@cc98/api' {
  export interface IGlobalConfig {
    maxOnlineCount: number
    maxOnlineDate: Date
    topicCount: number
    postCount: number
    userCount: number
    lastUserName: string
    maxPostCount: number
    maxPostDate: Date
    isMaintaining: boolean
    announcement: string
    signInEnabled: boolean
    signInRewards: string[]
    signInTopicId: number
    todayCount: number
    anonymityAdmin: string[]
    lastBirthdayActivityDay: Date
    birthdayActivitySetting: string
    birthdayActivityIsEnabled: boolean
  }
}

declare module '@cc98/api' {
  export interface ITopicIP {
    ip: string
    posts: {
      floor: number
      userId: number
      userName: string
      content: string
    }[]
  }
}

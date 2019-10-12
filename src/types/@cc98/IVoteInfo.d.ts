declare module '@cc98/api' {
  export interface IVoteInfo {
    voteItems: string[]
    expiredDays: number
    maxVoteCount: number
    needVote: boolean
  }
}

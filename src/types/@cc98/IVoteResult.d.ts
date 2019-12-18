declare module '@cc98/api' {
  type VoteItem = {
    id: number
    description: string
    count: number
  }

  type VoteRecord = {
    userId: number
    userName: string
    items: number[]
    ip: string
    time: string
  }

  export interface IVoteResult {
    topicId: number
    voteItems: VoteItem[]
    voteRecords: VoteRecord[]
    expiredTime: string
    isAvailable: boolean
    maxVoteCount: number
    canVote: boolean
    myRecord: VoteRecord
    needVote: boolean
    voteUserCount: number
  }
}

import { IUser } from '@cc98/api'

export default interface IUserMap {
  // 看起来有 userId 的地方都有 userName
  // 而有 userName 的地方不一定有 userId，比如 awards
  // userName 也是唯一的，因此用 userName 作为 key
  [userName: string]: IUser | undefined
}

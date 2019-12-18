import axios from 'axios'
import { IBoardRewardInfo } from '@cc98/api'

export const getBoardTodayRewardRecord = (boardId: string | number) => {
  return axios({
    url: '/manage/reward-daily-record',
    params: {
      boardId,
    },
    withToken: true,
  }) as Promise<IBoardRewardInfo>
}

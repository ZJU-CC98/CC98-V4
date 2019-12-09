import { IMessageContent } from '@cc98/api'
import { reverse } from 'lodash'

// 把时间相近的内容归在一起
export interface IMessageContentGroup {
  message: IMessageContent[]
  time: string
}

export function transformMessageToGroup(data: IMessageContent[]): IMessageContentGroup[] {
  return reverse(data).reduce((res, message) => {
    const { time } = message
    const lastGroup = res[res.length - 1] as IMessageContentGroup | undefined
    const prevMessage = lastGroup?.message[lastGroup.message.length - 1] as
      | IMessageContent
      | undefined

    if (
      lastGroup &&
      prevMessage &&
      new Date(time).getTime() - new Date(prevMessage.time).getTime() > 60000
    ) {
      lastGroup.message.push(message)
    } else {
      res.push({
        time,
        message: [message],
      })
    }

    return res
  }, [] as IMessageContentGroup[])
}

import Notification, { INoticeProps } from 'rc-notification'

let notification: Notification.INotification

Notification.newInstance({}, n => {
  notification = n
})

export default function notice(content: string | INoticeProps) {
  if (!notification) return

  if (typeof content === 'string') {
    return notification.notice({
      content,
    })
  }

  return notification.notice(content)
}

import Notification from 'rc-notification'

let notification: Notification.INotification

Notification.newInstance({}, n => {
  notification = n
})

// eslint-disable-next-line
export const notice = notification!.notice

export default notice

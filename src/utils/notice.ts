import Notification from 'rc-notification'

let notification: Notification.INotification

Notification.newInstance({}, n => {
  notification = n
})

const { notice } = notification!

export default notice

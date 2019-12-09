import NoLogOn from 'src/components/Error/NotLogOn'
import BoardNoPermission from 'src/components/Error/BoardNoPermission'
import TopicNoPermission from 'src/components/Error/TopicNoPermission'
import UserLocked from 'src/components/Error/UserLocked'

enum ERROR {
  NOT_LOG_ON = 'NOT_LOG_ON',
  BOARD_NO_PERMISSION = 'BOARD_NO_PERMISSION',
  TOPIC_NO_PERMISSION = 'TOPIC_NO_PERMISSION',
  USER_LOCKED = 'USER_LOCKED',
}

export default ERROR

export const errorComponentMap: { [key in ERROR]: React.ComponentType } = {
  [ERROR.NOT_LOG_ON]: NoLogOn,
  [ERROR.BOARD_NO_PERMISSION]: BoardNoPermission,
  [ERROR.TOPIC_NO_PERMISSION]: TopicNoPermission,
  [ERROR.USER_LOCKED]: UserLocked,
}

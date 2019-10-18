import NoLogOn from 'src/components/Error/NotLogOn'
import BoardNoPermission from 'src/components/Error/BoardNoPermission'
import TopicNoPermission from 'src/components/Error/TopicNoPermission'

enum ERROR {
  NOT_LOG_ON = 'NOT_LOG_ON',
  BOARD_NO_PERMISSION = 'BOARD_NO_PERMISSION',
  TOPIC_NO_PERMISSION = 'TOPIC_NO_PERMISSION',
}

export default ERROR

export const errorComponentMap: { [key in ERROR]: React.ComponentType } = {
  [ERROR.NOT_LOG_ON]: NoLogOn,
  [ERROR.BOARD_NO_PERMISSION]: BoardNoPermission,
  [ERROR.TOPIC_NO_PERMISSION]: TopicNoPermission,
}

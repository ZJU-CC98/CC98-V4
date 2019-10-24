import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'src/components/Button'
import { RootStore } from 'src/store'
import { checkIsBoardMaster } from 'src/utils/permission'
import { IBoard, ITopic } from '@cc98/api'
import LookUpIPModal from 'src/pages/topic/components/Modal/LookUpIPModal'
import TopicManageModal from 'src/pages/topic/components/Modal/TopicManageModal'

import s from './TopicManage.m.scss'

interface ITopicManageProps {
  topicId: string
  topicInfo?: ITopic
  boardInfo?: IBoard
  refresh: () => void
}

function selector(store: RootStore) {
  return {
    currentUser: store.global.currentUser,
  }
}

const TopicManage: React.FC<ITopicManageProps> = ({ topicId, boardInfo, topicInfo, refresh }) => {
  const [lookUpVisible, setLookUpVisible] = React.useState(false)
  const [manageVisible, setManageVisible] = React.useState(false)
  const { currentUser } = useSelector(selector)

  if (!checkIsBoardMaster(boardInfo, currentUser)) {
    return null
  }

  return (
    <div className={s.root}>
      <Button primary onClick={() => setManageVisible(true)}>
        管 理
      </Button>
      <Button primary onClick={() => setLookUpVisible(true)}>
        查看IP
      </Button>
      <LookUpIPModal
        visible={lookUpVisible}
        onClose={() => setLookUpVisible(false)}
        topicId={topicId}
      />
      <TopicManageModal
        refresh={refresh}
        topicInfo={topicInfo}
        topicId={topicId}
        visible={manageVisible}
        onClose={() => setManageVisible(false)}
        currentUser={currentUser}
      />
    </div>
  )
}

export default TopicManage

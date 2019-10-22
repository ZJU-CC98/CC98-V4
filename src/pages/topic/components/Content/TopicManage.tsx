import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'src/components/Button'
import LookUpIPModal from 'src/pages/topic/components/Modal/LookUpIPModal'
import { RootStore } from 'src/store'
import { checkIsBoardMaster } from 'src/utils/permission'
import { IBoard } from '@cc98/api'

import s from './TopicManage.m.scss'

interface ITopicManageProps {
  topicId: string
  boardInfo?: IBoard
}

function selector(store: RootStore) {
  return {
    currentUser: store.global.currentUser,
  }
}

const TopicManage: React.FC<ITopicManageProps> = ({ topicId, boardInfo }) => {
  const [lookUpVisible, setLookUpVisible] = React.useState(false)
  const { currentUser } = useSelector(selector)

  if (!checkIsBoardMaster(boardInfo, currentUser)) {
    return null
  }

  return (
    <div className={s.root}>
      <Button primary>管 理</Button>
      <Button primary onClick={() => setLookUpVisible(true)}>
        查看IP
      </Button>
      <LookUpIPModal
        visible={lookUpVisible}
        onClose={() => setLookUpVisible(false)}
        topicId={topicId}
      />
    </div>
  )
}

export default TopicManage

import React from 'react'
import { ITopicIP } from '@cc98/api'
import { getTopicIPInfo } from 'src/service/topic'
import Modal from 'src/components/Modal'
import Button from 'src/components/Button'
import Collapse from 'src/components/Collapse'

import s from './LookUpIPModal.m.scss'

interface ILookUpIPModalProps {
  visible: boolean
  onClose: () => void
  topicId: string | number
}

const LookUpIPModal: React.FC<ILookUpIPModalProps> = ({ visible, onClose, topicId }) => {
  const [data, setData] = React.useState<ITopicIP[]>([])

  React.useEffect(() => {
    if (visible) {
      getTopicIPInfo(topicId).then(setData)
    }
  }, [visible, topicId])

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="查看IP"
      footer={
        <Button primary onClick={onClose}>
          关 闭
        </Button>
      }
    >
      <div className={s.root}>
        {data.map(item => (
          <Collapse
            key={item.ip}
            content={item.posts.map(post => (
              <div key={post.floor}>
                <p className={s.content}>
                  用户名：{post.userName} 楼层：{post.floor}
                </p>
                <p className={s.content}>{post.content}</p>
              </div>
            ))}
            title={
              <p>
                {item.ip} 共{item.posts.length}条
              </p>
            }
          />
        ))}
      </div>
    </Modal>
  )
}

export default LookUpIPModal

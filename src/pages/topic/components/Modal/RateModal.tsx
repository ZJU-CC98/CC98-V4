import React from 'react'
import cn from 'classnames'
import Modal from 'src/components/Modal'
import Button from 'src/components/Button'

import happy from 'src/assets/topic/happy.png'
import unhappy from 'src/assets/topic/unhappy.png'
import Select from 'src/components/Select'
import { ratePost } from 'src/service/post'
import notice from 'src/utils/notice'
import { defaultAxiosErrorHandler } from 'src/config/axios'

import s from 'src/pages/topic/components/Modal/RateModal.m.scss'

interface IRateModalProps {
  postId: number
  visible: boolean
  setVisible: (v: boolean) => void
  refresh: () => void
}

const DEFAULT_PLUS_TEXT = ['所言极是', '好人一生平安', 'momo']
const DEFAULT_MINUS_TEXT = ['不太求是', '呵呵', '被你暴击']

const RateModal: React.FC<IRateModalProps> = ({ visible, setVisible, postId, refresh }) => {
  // 是否是要 +1
  const [isPlus, setIsPlus] = React.useState(true)
  const [reason, setReason] = React.useState<string[]>([])

  const handleRate = () => {
    ratePost(postId, reason.join('，'), isPlus ? 1 : -1)
      .then(() => {
        setVisible(false)
        refresh()
      })
      .catch(err => {
        if (err.response) {
          switch (err.response.data) {
            // TODO 这个值不太对
            case 'already':
              return notice('你今天已经评分过了')
            case 'you_cannot_rate':
              return notice('你还没有资格评分')
            case 'cannot_rate_yourself':
              return notice('不能给自己评分')
            default:
          }
        }

        defaultAxiosErrorHandler(err)
      })
  }

  return (
    <Modal
      title="评分"
      onClose={() => setVisible(false)}
      visible={visible}
      footer={
        <>
          <Button onClick={() => setVisible(false)}>取 消</Button>
          <Button primary onClick={handleRate}>
            确 定
          </Button>
        </>
      }
    >
      <div className={s.title}>
        <div
          className={cn(s.titleItem, { [s.titleItemCurrent]: isPlus })}
          onClick={() => setIsPlus(true)}
        >
          <img src={happy} />
          <span className={s.titleText}>+1</span>
        </div>
        <div className={s.titleDivider} />
        <div
          className={cn(s.titleItem, { [s.titleItemCurrent]: !isPlus })}
          onClick={() => setIsPlus(false)}
        >
          <img src={unhappy} />
          <span className={s.titleText}>-1</span>
        </div>
      </div>
      <span className={s.info}>500贴以上的用户可以进行评分（每日一次）</span>
      <p className={s.label}>理由：</p>
      <Select
        width={400}
        tags
        value={reason}
        onChange={setReason}
        data={isPlus ? DEFAULT_PLUS_TEXT : DEFAULT_MINUS_TEXT}
      />
    </Modal>
  )
}

export default RateModal

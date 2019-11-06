import React from 'react'
import Button from 'src/components/Button'
import { deleteUserPostByDay, deleteUserTopicByDay } from 'src/service/user'

import notice from 'src/utils/notice'
import { defaultAxiosErrorHandler } from 'src/config/axios'
import s from './ManageTP.m.scss'

interface IManageTopicProps {
  id: string
}

const ManageTopic: React.FC<IManageTopicProps> = ({ id }) => {
  const [day, setDay] = React.useState('')

  const handleSubmit = async (isPost: boolean) => {
    try {
      const days = parseInt(day, 10)

      if (days < 1 || days > 365 || `${days}` !== day) {
        throw new Error('请检查日期')
      }

      let deleteCount: number

      if (isPost) {
        deleteCount = await deleteUserPostByDay(id, `${days}`)
      } else {
        deleteCount = await deleteUserTopicByDay(id, `${days}`)
      }

      notice(`删掉了${deleteCount}条${isPost ? 'post' : 'topic'}`)
    } catch (e) {
      defaultAxiosErrorHandler(e)
    }
  }

  return (
    <div>
      <h2>删除用户最近主题与回帖</h2>
      <p className={s.row}>
        <span>天数：</span>
        <input type="text" value={day} onChange={e => setDay(e.target.value)} />
        <Button onClick={() => handleSubmit(false)} primary>
          删主题
        </Button>
        <Button onClick={() => handleSubmit(true)} primary>
          删回复
        </Button>
      </p>
    </div>
  )
}

export default ManageTopic

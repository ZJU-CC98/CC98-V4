import React from 'react'
import { IUser } from '@cc98/api'
import { getUserById } from 'src/service/user'

interface IManageInfoProps {
  id: string
}

const ManageInfo: React.FC<IManageInfoProps> = ({ id }) => {
  const [data, setData] = React.useState<IUser>()

  React.useEffect(() => {
    getUserById(id).then(setData)
  }, [id])

  if (!data) return null

  return (
    <div>
      <h2>用户信息</h2>
      <p>
        <span style={{ marginRight: 80 }}>id: {id}</span>
        <span>name: {data.name}</span>
      </p>
    </div>
  )
}

export default ManageInfo

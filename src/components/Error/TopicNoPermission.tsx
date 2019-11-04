import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import Status from 'src/components/Error/conponents/Status'

const IMAGE_PATH = `${IMAGE_BASE_PATH}/401.png`
const desc = '你没有权限查看这个主题或未登录'
const title = '权限不足'

export default () => (
  <Status
    title={title}
    description={desc}
    img={IMAGE_PATH}
    extraContent={<Link to="/log-on">点我登录</Link>}
  />
)

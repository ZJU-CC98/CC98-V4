import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import Status from 'src/components/Error/conponents/Status'

const IMAGE_PATH = `${IMAGE_BASE_PATH}/401.png`
const desc = '您没有权限进入这个版面或未登陆'

export default () => (
  <Status description={desc} img={IMAGE_PATH} extraContent={<Link to="/log-on">点我登录</Link>} />
)

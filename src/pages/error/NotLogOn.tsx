import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import Status from './conponents/Status'

const IMAGE_PATH = `${IMAGE_BASE_PATH}/401.png`
const desc = '您当前未登录'

export default () => (
  <Status
    description={desc}
    img={IMAGE_PATH}
    extraContent={
      <Link to="/log-on" replace>
        点我登录
      </Link>
    }
  />
)

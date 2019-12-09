import React from 'react'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import Status from 'src/components/Error/conponents/Status'

const IMAGE_PATH = `${IMAGE_BASE_PATH}/401.png`
const desc = '用户已锁定'

export default () => <Status title={desc} description={desc} img={IMAGE_PATH} />

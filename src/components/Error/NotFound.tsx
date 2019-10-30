import React from 'react'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import Status from 'src/components/Error/conponents/Status'

const IMAGE_PATH = `${IMAGE_BASE_PATH}/404.png`
const desc = '页面不存在'

export default () => <Status title={desc} description={desc} img={IMAGE_PATH} />

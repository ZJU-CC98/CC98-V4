import axios from 'axios'
import { IConfig } from '@cc98/api'

/**
 * 首页的接口
 */
export const getIndexConfig = () => {
  return axios('/config/index') as Promise<IConfig>
}

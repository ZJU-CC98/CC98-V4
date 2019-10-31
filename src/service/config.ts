import axios from 'axios'
import { IAdvertisement, IConfig, IGlobalConfig, ITag } from '@cc98/api'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'

/**
 * 首页的接口
 */
export const getIndexConfig = () => {
  return axios('/config/index') as Promise<IConfig>
}

export const getAllTag = async () => {
  const allTags = getLocalStorage<ITag[]>('allTags')

  if (allTags) {
    return allTags
  }

  const remoteAllTags = (await axios('/config/global/alltag')) as Promise<ITag[]>

  setLocalStorage('allTags', remoteAllTags, 3600 * 24 * 10)

  return remoteAllTags
}

export const getGlobalConfig = () => {
  return axios({
    url: '/config/global',
    needAuth: true,
  }) as Promise<IGlobalConfig>
}

export const getADs = async () => {
  const ads = getLocalStorage<IAdvertisement[]>('ads')

  if (ads) {
    return ads
  }

  const remoteAds = (await axios('/config/global/advertisement')) as Promise<IAdvertisement[]>

  setLocalStorage('ads', remoteAds, 3600)

  return remoteAds
}

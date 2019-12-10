import axios from 'axios'
import {
  IAdvertisement,
  IConfig,
  IDisplayTitle,
  IGlobalConfig,
  IRecommendationReading,
  ITag,
} from '@cc98/api'
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

export const getAllDisplayTitles = async () => {
  const allDisplayTitles = getLocalStorage<IDisplayTitle[]>('displayTitles')

  if (allDisplayTitles) return allDisplayTitles

  const remoteDisplayTitles = (await axios('/config/global/all-user-title')) as IDisplayTitle[]

  setLocalStorage('displayTitles', remoteDisplayTitles, 3600 * 24 * 10)

  return remoteDisplayTitles
}

export const changeSiteAnnouncement = (announcement: string) => {
  return axios({
    url: '/config/global/announcement',
    method: 'PUT',
    needAuth: true,
    data: {
      announcement,
    },
  }) as Promise<void>
}

export const clearHomePageCache = () => {
  return axios({
    url: '/config/index/update',
    method: 'PUT',
    needAuth: true,
  }) as Promise<void>
}

export const getAllRecommendationReading = () => {
  return axios({
    url: '/index/column/recommandationreading/all',
    needAuth: true,
  }) as Promise<IRecommendationReading[]>
}

export const getAllRecommendationFunction = () => {
  return axios({
    url: '/index/column/recommandationfunction/all',
    needAuth: true,
  }) as Promise<IRecommendationReading[]>
}

export const getAllSchoolNews = () => {
  return axios({
    url: '/index/column/schoolnews/all',
    needAuth: true,
  }) as Promise<IRecommendationReading[]>
}

export const getAllADs = () => {
  return axios({
    url: '/config/global/advertisement/all',
    needAuth: true,
  }) as Promise<IRecommendationReading[]>
}

export const addManageItem = (data: Omit<IRecommendationReading, 'id'>) => {
  return axios({
    url: '/index/column/',
    method: 'POST',
    needAuth: true,
    data,
  }) as Promise<void>
}

export const updateManageItem = (id: number, data: IRecommendationReading) => {
  return axios({
    url: `/index/column/${id}`,
    method: 'PUT',
    needAuth: true,
    data,
  }) as Promise<void>
}

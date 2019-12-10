import dayjs from 'dayjs'
import { IRecommendationReading } from '@cc98/api'
import {
  getAllADs,
  getAllRecommendationFunction,
  getAllRecommendationReading,
  getAllSchoolNews,
} from 'src/service/config'

export enum MANAGE_TYPE {
  RECOMMENDATION_READING = 1,
  RECOMMENDATION_FUNCTION = 2,
  SCHOOL_NEWS = 3,
  ADVERTISEMENT = 4,
}

export const ALL_MANAGE_TYPE = [
  MANAGE_TYPE.RECOMMENDATION_READING,
  MANAGE_TYPE.RECOMMENDATION_FUNCTION,
  MANAGE_TYPE.SCHOOL_NEWS,
  MANAGE_TYPE.ADVERTISEMENT,
]

export enum FORM_TYPE {
  INPUT = 'text',
  NUMBER_INPUT = 'number',
  CHECKBOX = 'checkbox',
  TEXT = 'TEXT', // 纯展示
}

export function getManageTypeDesc(type: MANAGE_TYPE) {
  switch (type) {
    case MANAGE_TYPE.RECOMMENDATION_READING:
      return '推荐阅读'
    case MANAGE_TYPE.RECOMMENDATION_FUNCTION:
      return '推荐功能'
    case MANAGE_TYPE.SCHOOL_NEWS:
      return '校园新闻'
    case MANAGE_TYPE.ADVERTISEMENT:
      return '广告'
    default:
      return '未知'
  }
}

interface IManageItem {
  // 加载列表
  initService: () => Promise<IRecommendationReading[]>
  formItems: {
    name: keyof IRecommendationReading
    formType: FORM_TYPE
    formatItem?: (item?: string | number | boolean) => string
  }[]
}

export const MANAGE_MAP: {
  [key in MANAGE_TYPE]: IManageItem
} = {
  [MANAGE_TYPE.RECOMMENDATION_READING]: {
    initService: getAllRecommendationReading,
    formItems: [
      {
        name: 'title',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'content',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'url',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'imageUrl',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'orderWeight',
        formType: FORM_TYPE.NUMBER_INPUT,
      },
      {
        name: 'enable',
        formType: FORM_TYPE.CHECKBOX,
      },
    ],
  },
  [MANAGE_TYPE.RECOMMENDATION_FUNCTION]: {
    initService: getAllRecommendationFunction,
    formItems: [
      {
        name: 'title',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'url',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'imageUrl',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'orderWeight',
        formType: FORM_TYPE.NUMBER_INPUT,
      },
      {
        name: 'enable',
        formType: FORM_TYPE.CHECKBOX,
      },
    ],
  },
  [MANAGE_TYPE.SCHOOL_NEWS]: {
    initService: getAllSchoolNews,
    formItems: [
      {
        name: 'title',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'url',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'enable',
        formType: FORM_TYPE.CHECKBOX,
      },
    ],
  },
  [MANAGE_TYPE.ADVERTISEMENT]: {
    initService: getAllADs,
    formItems: [
      {
        name: 'title',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'url',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'imageUrl',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'enable',
        formType: FORM_TYPE.CHECKBOX,
      },
      {
        name: 'days',
        formType: FORM_TYPE.INPUT,
      },
      {
        name: 'expiredTime',
        formType: FORM_TYPE.TEXT,
        formatItem: item => dayjs(item as string).format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
  },
}

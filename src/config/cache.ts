import { parseUrl } from 'query-string'
import UrlPattern from 'url-pattern'
import ICacheConfigItem from 'src/types/ICacheConfigItem'

/**
 * 更改缓存结构时给 version 加一
 * 否则新添加的缓存不会生效
 */
export const cacheVersion = 2

const boardGroupIds = [763, 3, 5, 6, 43, 24, 27, 2, 35, 37, 29, 604, 33]

const cacheConfigs: ICacheConfigItem[] = [
  {
    // 为 /user/:id 创建缓存
    urlPath: new UrlPattern('/user/:id'),
    namespace: 'user',
    expirationTime: 3600 * 1000,
    type: 'single',

    // 为userName创建索引
    indexNames: ['name'],
    getRequestQueryKey: ({ url }) => [parseInt(new UrlPattern('/user/:id').match(url!).id, 10)],
  },
  {
    // 为 /user/name/:userName 创建缓存
    urlPath: new UrlPattern('/user/name/:name'),
    // 储存的同样是用户信息
    namespace: 'user',
    expirationTime: 3600 * 1000,
    indexNames: ['name'],
    type: 'single',

    // 使用索引而不是id去查找
    useIndexName: 'name',
    getRequestQueryKey: ({ url }) => [new UrlPattern('/user/name/:name').match(url!).name],
  },
  {
    // 为 /user?id=1&id=2 创建缓存
    urlPath: '/user',
    namespace: 'user',
    expirationTime: 3600 * 1000,
    indexNames: ['name'],
    type: 'multiply',

    getRequestQueryKey: ({ url }) => {
      const { id } = parseUrl(url!).query

      return (Array.isArray(id) ? id : [id!]).map(item => parseInt(item, 10))
    },

    getFallbackConfig: missId => ({
      url: `/user?id=${missId.join('&id=')}`, // 只请求缓存未命中的 id
    }),
  },
  {
    urlPath: '/Board/all',
    namespace: 'board-group',
    expirationTime: 3600 * 1000,
    type: 'multiply',
    getRequestQueryKey: () => boardGroupIds,
  },
  {
    urlPath: /\/board\/\d+$/,
    namespace: 'board-info',
    expirationTime: 3600 * 1000 * 4,
    type: 'single',
    getRequestQueryKey: ({ url }) => {
      return [parseInt(url!.match(/\/board\/(\d+)/)![1], 10)]
    },
  },
  {
    urlPath: /\/board\/\d+\/tag$/,
    namespace: 'board-tag',
    expirationTime: 3600 * 1000 * 24,
    type: 'single',
    getRequestQueryKey: ({ url }) => {
      return [parseInt(url!.match(/\/board\/(\d+)/)![1], 10)]
    },

    getDataFromResult: ({ data, config }) => {
      return {
        id: parseInt(config.url!.match(/\/board\/(\d+)/)![1], 10),
        tags: data,
      }
    },

    getDataFormIndexedDb: (data: any) => data.tags,
  },
]

export default cacheConfigs

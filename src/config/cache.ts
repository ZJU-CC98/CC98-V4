import { parseUrl } from 'query-string'
import UrlPattern from 'url-pattern'
import ICacheConfigItem from 'src/types/ICacheConfigItem'

const cacheConfigs: ICacheConfigItem[] = [
  {
    // 为 /user/:id 创建缓存
    urlPath: new UrlPattern('/user/:id'),
    namespace: 'user',
    expirationTime: 3600 * 1000,

    // 为userName创建索引
    indexNames: ['name'],

    getDataFromResult: ({ data }) => [data],
  },
  {
    // 为 /user/name/:userName 创建缓存
    urlPath: new UrlPattern('/user/name/:name'),
    // 储存的同样是用户信息
    namespace: 'user',
    expirationTime: 3600 * 1000,
    indexNames: ['name'],
    getDataFromResult: ({ data }) => [data],

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
    getDataFromResult: ({ data }) => data,

    getRequestQueryKey: ({ url }) => {
      const { id } = parseUrl(url!).query

      return Array.isArray(id) ? id : [id!]
    },

    getFallbackConfig: missId => ({
      url: `/user?id=${missId.join('&id=')}`, // 只请求缓存未命中的 id
    }),
  },
]

export default cacheConfigs

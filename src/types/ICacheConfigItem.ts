import { AxiosResponse, AxiosRequestConfig } from 'axios'
import UrlPattern from 'url-pattern'

export type IdType = number | string

export default interface ICacheConfigItem {
  // 需要缓存的url，对应axios#config.url
  // 可以直接在urlPattern中返回id
  urlPath: string | RegExp | UrlPattern
  // 全局唯一，对应indexedDb的objectStoreName
  // 批量获取用户信息和单个获取应该用同一个namespace
  namespace: string
  // 过期时间，ms
  expirationTime: number
  // 内容的id，对应indexedDb的keyPath，支持path写法
  // 默认 id
  idKey?: string

  /**
   * /user/:id         只返回一个结果  single
   * /user?id=1&id=2   返回数组       multiply
   */
  type: 'single' | 'multiply'

  // 从axios#config中获取到当前请求的query key
  // 一般来说是资源的id
  // 有时候也会是name，例如/user/name/:name接口
  getRequestQueryKey?: (config: AxiosRequestConfig) => IdType[]

  /**
   * 默认  ({ data }) => data
   * @param result
   */
  getDataFromResult?: (result: AxiosResponse) => any

  getDataFormIndexedDb?: (data: any) => any

  // 为缓存中不存在的id生成请求
  // 默认直接使用当次请求的config
  getFallbackConfig?: (missId: IdType[]) => AxiosRequestConfig

  // 使用indexedDb的索引
  // 不传是 store.get(queryKey)
  // 传了是 store.index(useIndexName).get(queryKey)
  useIndexName?: string
  indexNames?: string[]
}

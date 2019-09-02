// 黑魔法
import UrlPattern from 'url-pattern'
import { get } from 'lodash'
import axios, { AxiosAdapter, AxiosPromise, AxiosRequestConfig } from 'axios'
import ICacheConfigItem from 'src/types/ICacheConfigItem'
// @ts-ignore
import settle from 'axios/lib/core/settle'
// @ts-ignore
import adapter from 'axios/lib/adapters/xhr'
import { addItem, queryAll } from 'src/utils/indexedDb'

export default function makeCustomAxiosAdapter(cacheConfigs: ICacheConfigItem[]): AxiosAdapter {
  return function(config: AxiosRequestConfig): Promise<any> {
    for (let index = 0; index < cacheConfigs.length; index += 1) {
      if (testUrl(config.url!, cacheConfigs[index].urlPath)) {
        const {
          namespace,
          urlPath,
          getRequestQueryKey = () =>
            urlPath instanceof UrlPattern
              ? (urlPath.match(config.url!).id as string | string[])
              : undefined,
          expirationTime,
          useIndexName,
          getDataFromResult,
          getFallbackConfig,
          idKey = 'id',
        } = cacheConfigs[index]

        const queryKey = getRequestQueryKey(config)
        if (!queryKey || queryKey.length === 0) {
          return Promise.reject(new Error('key not found'))
        }
        const ids = Array.isArray(queryKey) ? queryKey : [queryKey]
        const req: AxiosPromise = config.ignoreCache
          ? adapter(config)
          : queryAll(namespace, ids, expirationTime, useIndexName)
              .then(indexedDbResult => {
                const missIds = indexedDbResult.filter(item => ids.includes(item))
                if (missIds.length > 0) {
                  const requestConfig = getFallbackConfig ? getFallbackConfig(missIds) : config
                  return axios({ ...requestConfig, ignoreCache: true }).then(remoteResult => {
                    return [...remoteResult.data, ...indexedDbResult]
                  })
                }

                return indexedDbResult
              })
              .then(data => {
                return new Promise((resolve, reject) => {
                  settle(resolve, reject, {
                    data,
                    status: 200,
                    statusText: 'ok',
                    headers: {},
                    config,
                    request: {},
                  })
                })
              })
        return req.then(result => {
          const newKeys = getRequestQueryKey(result.config)
          if (newKeys && newKeys.length) {
            const newIds = Array.isArray(newKeys) ? newKeys : [newKeys]
            getDataFromResult(result)
              .filter(item => newIds.includes(get(item, idKey)))
              .forEach(item => addItem(namespace, item))
          }
          return result
        })
      }
    }

    return adapter(config)
  }
}

function testUrl(url: string, regex: ICacheConfigItem['urlPath']) {
  if (regex instanceof UrlPattern) {
    return !!regex.match(url)
  }
  if (regex instanceof RegExp) {
    return regex.test(url)
  }
  return url === regex
}

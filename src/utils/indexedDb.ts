import { uniqBy } from 'lodash'
import { IdType } from 'src/types/ICacheConfigItem'
import cacheConfigs, { cacheVersion } from 'src/config/cache'

export const shouldUseIndexedDb = !!window.indexedDB

// don't export db, make it private
let db: IDBDatabase | undefined

const dbName = 'cc98-v4'

export function initIndexedDb() {
  return new Promise(resolve => {
    if (shouldUseIndexedDb && cacheConfigs.length > 0) {
      const req = indexedDB.open(dbName, cacheVersion)

      req.onupgradeneeded = () => {
        uniqBy(cacheConfigs, 'namespace')
          .filter(({ namespace }) => !req.result.objectStoreNames.contains(namespace))
          .forEach(({ namespace, indexNames, idKey = 'id' }) => {
            const keyPath = `content.${idKey}`
            // 初始化
            const store = req.result.createObjectStore(namespace, {
              keyPath,
            })

            if (indexNames) {
              indexNames.forEach(indexName =>
                store.createIndex(indexName, `content.${indexName}`, { unique: true })
              )
            }
          })
      }

      req.onsuccess = () => {
        db = req.result
        resolve()
      }
      req.onerror = resolve
    } else {
      resolve()
    }
  })
}

export function query(namespace: string, id: IdType, useIndex?: string): Promise<any> {
  if (!db) {
    return Promise.reject(new Error('no db found'))
  }

  return new Promise<any>((resolve, reject) => {
    const t = db!.transaction(namespace, 'readonly')
    const store = t.objectStore(namespace)
    const req = useIndex ? store.index(useIndex).get(id) : store.get(id)
    req.onsuccess = () => {
      if (req.result && req.result.expirationTime > Date.now()) {
        resolve(req.result.content)
      } else if (req.result) {
        reject(new Error('expired'))
      } else {
        reject(new Error('not found'))
      }
    }

    req.onerror = reject
  })
}

export function queryAll(namespace: string, ids: IdType[], useIndex?: string): Promise<any[]> {
  return Promise.all(ids.map(id => query(namespace, id, useIndex).catch(() => id)))
}

export function addItem(namespace: string, content: any, expirationTime: number) {
  if (!db) {
    return Promise.reject(new Error('db not fount'))
  }

  const t = db.transaction(namespace, 'readwrite')
  const store = t.objectStore(namespace)
  const req = store.put({
    content,
    expirationTime: Date.now() + expirationTime,
  })
  return new Promise((resolve, reject) => {
    req.onsuccess = e => resolve(e)
    req.onerror = e => reject(e)
  }) as Promise<any>
}

export function clearAll() {
  if (!db) {
    return Promise.reject(new Error('db not fount'))
  }

  cacheConfigs.forEach(({ namespace }) => {
    const t = db!.transaction(namespace, 'readwrite')
    const store = t.objectStore(namespace)
    store.clear()
  })
}

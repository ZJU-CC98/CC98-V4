/**
 * 谨慎使用 localStorage
 * 状态存到 redux
 * 缓存使用 cache
 * @param key
 * @param value
 * @param expireIn 0 表示永不过期
 */
import { clearAll } from 'src/utils/indexedDb'

export function setLocalStorage<T>(key: string, value: T, expireIn = 0) {
  let v: string
  if (typeof value === 'object') {
    v = JSON.stringify(value)
    v = `obj-${v}`
  } else {
    v = `str-${value}`
  }

  localStorage.setItem(key, v)

  if (expireIn !== 0) {
    const now = new Date().getTime()
    const expirationTime = now + expireIn * 1000
    localStorage.setItem(
      `${key}_expirationTime`,
      expirationTime.toString().slice(0, expirationTime.toString().length - 3)
    )
  } else {
    localStorage.removeItem(`${key}_expirationTime`)
  }
}

export function getLocalStorage<T = any>(key: string): T | undefined {
  let v = localStorage.getItem(key)
  const expirationTime = localStorage.getItem(`${key}_expirationTime`)
  if (expirationTime) {
    const now = new Date().getTime()
    const time = Number.parseInt(expirationTime, 10) * 1000

    if (now > time) {
      localStorage.removeItem(key)

      if (key === 'refreshToken') {
        clearAll()
      }

      return
    }
  }

  if (v) {
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4)
      return JSON.parse(v) as T
    }

    if (v.indexOf('str-') === 0) {
      return (v.slice(4) as any) as T
    }
  }
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
  localStorage.removeItem(`${key}_expirationTime`)
}

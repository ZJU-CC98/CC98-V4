// @ts-ignore
import EventEmitter from 'event-emitter'

export enum EVENT {
  EXPAND_ALL_PICTURE = 'EXPAND_ALL_PICTURE',
}

interface Event {
  [EVENT.EXPAND_ALL_PICTURE]: null
}

/**
 * 这是一个 EventBus
 * 需要跨组件状态传递请用 redux
 *
 * 目前用来处理一键显示页面内所有图片
 */
class EventBus<T> extends EventEmitter {
  emit<Key extends keyof T>(key: Key, payload: T[Key], ...other: any[]) {
    super.emit(key, payload, ...other)
  }

  on<Key extends keyof T>(key: Key, listener: (payload: T[Key]) => void, ...other: any[]) {
    super.on(key, listener, ...other)
  }

  once<Key extends keyof T>(key: Key, listener: (payload: T[Key]) => void, ...other: any[]) {
    super.once(key, listener, ...other)
  }

  off<Key extends keyof T>(key: Key, listener: (payload: T[Key]) => void) {
    super.off(key, listener)
  }
}

export const eventBus = new EventBus<Event>()

// @ts-ignore
import EventEmitter from 'event-emitter'
import { IPost } from '@cc98/api'

export enum EVENT {
  EXPAND_ALL_PICTURE = 'EXPAND_ALL_PICTURE',
  QUOTE_FLOOR = 'QUOTE_FLOOR',
}

interface Event {
  [EVENT.EXPAND_ALL_PICTURE]: null
  [EVENT.QUOTE_FLOOR]: IPost
}

/**
 * 这是一个 EventBus
 * 需要跨组件状态传递请用 redux
 *
 * 目前用来处理
 * 1. 一键显示页面内所有图片
 * 2. 引用帖子内容
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

/*
 * 类型工具函数
 */
import React from 'react'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootStore } from '../store'

/**
 * 得到组件的 props 的类型定义
 *
 * interface IProps
 * class A extends React.Component<IProps>
 *
 * type MyType = GetPropTypeOfComponent<A> // MyType === IProps
 */

export type GetPropTypeOfComponent<T> = T extends React.ComponentType<infer U> ? U : never

export type UnpackPromise<T> = T extends Promise<infer U> ? U : never

// https://stackoverflow.com/questions/54520676
export type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]

export type AsyncAction<
  /**
   * Action 的类型定义
   * 决定了 dispatch 接收的参数
   */
  A extends Action = any,
  /**
   * 全局 store 的类型定义
   * 决定了 getState 的返回值
   */
  S = RootStore
> = ThunkAction<Promise<void>, S, void, A>

/**
 * 递归设置 Readonly
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/*
 * 类型工具函数
 */
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

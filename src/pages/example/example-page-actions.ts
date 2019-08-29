export enum EXAMPLE_PAGE_ACTION_TYPE {
  // 一个 action 的 type
  EXAMPLE_ACTION_KEY = 'EXAMPLE_ACTION_KEY',

  ANOTHER_ACTION_KEY = 'ANOTHER_ACTION_KEY',
}

export type ExamplePageActions =
  | {
      type: EXAMPLE_PAGE_ACTION_TYPE.EXAMPLE_ACTION_KEY
      payload: string
    }
  | {
      type: EXAMPLE_PAGE_ACTION_TYPE.ANOTHER_ACTION_KEY
      payload: number
    }

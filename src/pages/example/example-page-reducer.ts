import produce from 'immer'
import { EXAMPLE_PAGE_ACTION_TYPE, ExamplePageActions } from './example-page-actions'

export interface IExamplePageState {
  nothing: string
}

const initState: IExamplePageState = {
  nothing: 'nothing',
}

const reducer = (state = initState, action: ExamplePageActions) =>
  produce(state, draft => {
    switch (action.type) {
      case EXAMPLE_PAGE_ACTION_TYPE.EXAMPLE_ACTION_KEY: {
        const { payload } = action // string
        draft.nothing = payload

        return
      }
      case EXAMPLE_PAGE_ACTION_TYPE.ANOTHER_ACTION_KEY:
        const { payload } = action // number
        draft.nothing = payload.toString()

        return
      default:
    }
  })

export default reducer

import { push, RouterAction } from 'connected-react-router'
import { AsyncAction } from '../../utils/types'
import { ExamplePageActions } from './example-page-actions'

type ExampleAsyncAction = AsyncAction<ExamplePageActions | RouterAction>

export const asyncGoHome: (time: number) => ExampleAsyncAction = time => dispatch => {
  return delay(time).then(() => {
    dispatch(push('/'))
  })
}

function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

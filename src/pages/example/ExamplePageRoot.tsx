import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RootStore } from 'src/store'
import pic from 'src/assets/test.jpg'
import { asyncGoHome } from './example-page-async-actions'

function selector(store: RootStore) {
  return store.examplePageReducer.nothing
}

const ExamplePageRoot: React.FC = () => {
  const nothing = useSelector(selector)
  const dispatch = useDispatch()

  return (
    <div>
      <p>ExamplePageRoot, {nothing} here</p>
      <p>
        <button
          type="button"
          onClick={() => {
            dispatch(push('/'))
          }}
        >
          go to root
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(asyncGoHome(2000))
          }}
        >
          go to root after 2s
        </button>
      </p>
      <img alt="test" src={pic} />
    </div>
  )
}

export default ExamplePageRoot

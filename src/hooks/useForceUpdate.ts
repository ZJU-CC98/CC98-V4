import React from 'react'

export default function useForceUpdate() {
  const [key, setKey] = React.useState(0)

  return function forceRefresh() {
    setKey(key + 1)
  }
}

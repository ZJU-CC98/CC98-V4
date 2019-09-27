import React from 'react'
import IUserMap from 'src/types/IUserMap'
import { assign, compose, keyBy as fpKeyBy, noop } from 'lodash/fp'
import { getUsersByNames } from 'src/service/user'

export function useUserMap() {
  const [userMap, setUserMap] = React.useState<IUserMap>({})

  const getMoreUserByNames = (names: string[]) =>
    getUsersByNames(names).then(
      compose(
        noop,
        setUserMap,
        assign(userMap),
        fpKeyBy('name')
      )
    )

  return [userMap, getMoreUserByNames] as const
}

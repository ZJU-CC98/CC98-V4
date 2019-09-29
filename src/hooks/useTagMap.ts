import React from 'react'
import { fromPairs } from 'lodash'
import { compose, map, noop } from 'lodash/fp'
import { ITag } from '@cc98/api'
import { getAllTag } from 'src/service/config'

export default function useTagMap() {
  const [tagMap, setTagMap] = React.useState<{ [tagId: number]: string }>({})

  React.useEffect(() => {
    getAllTag().then(
      compose(
        noop,
        setTagMap,
        fromPairs,
        map((item: ITag) => [item.id, item.name])
      )
    )
  }, [])

  return tagMap
}

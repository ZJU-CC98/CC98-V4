import React from 'react'
import { useSelector } from 'react-redux'
import { concat } from 'lodash'
import { compose, map, filter } from 'lodash/fp'
import { ITopic } from '@cc98/api'
import { RootStore } from 'src/store'
import { getPrimaryColor } from 'src/config/theme'
import anonymousPortraitUrl from 'src/assets/user/anonymous.gif'
import useBoardMap from 'src/hooks/useBoardMap'
import useTagMap from 'src/hooks/useTagMap'
import { useUserMap } from 'src/hooks/useUserMap'

function selector(state: RootStore) {
  return {
    loadingColor: getPrimaryColor(state.global.theme),
  }
}

const userFallback = {
  name: '匿名用户',
  portraitUrl: anonymousPortraitUrl,
}

export function useInfTopicModel(service: (from: number) => Promise<ITopic[]>) {
  const [data, setData] = React.useState<ITopic[]>([])
  const [userMap, getMoreUsers] = useUserMap()

  const [isLoading, setIsLoading] = React.useState(false)

  const { loadingColor } = useSelector(selector)

  const onLoadMore = () =>
    service(data.length)
      .then((res: ITopic[]) => {
        setData(concat(data, res))
        setIsLoading(false)
        return res
      })
      .then(
        compose(
          getMoreUsers,
          map((topic: ITopic) => topic.userName),
          filter((topic: ITopic) => !!topic.userName)
        )
      )

  return [
    {
      data,
      userMap,
      userFallback,
      isLoading,
      boardMap: useBoardMap(),
      tagMap: useTagMap(),
      onLoadMore,
      loadingColor,
    },
    { setData },
  ] as const
}

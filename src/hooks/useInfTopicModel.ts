import React from 'react'
import { useSelector } from 'react-redux'
import { concat } from 'lodash'
import { compose, map, filter } from 'lodash/fp'
import { ITopic } from '@cc98/api'
import { RootStore } from 'src/store'
import { getPrimaryColor } from 'src/config/theme'
import useBoardMap from 'src/hooks/useBoardMap'
import useTagMap from 'src/hooks/useTagMap'
import { useUserMap } from 'src/hooks/useUserMap'
import { IMAGE_BASE_PATH } from 'src/constants/path'

function selector(state: RootStore) {
  return {
    loadingColor: getPrimaryColor(state.global.theme),
  }
}

const userFallback = {
  name: '匿名用户',
  portraitUrl: `${IMAGE_BASE_PATH}/心灵头像.gif`,
}

export function useInfTopicModel(
  service: (from: number) => Promise<ITopic[]>,
  checkIsLoaded: (res: ITopic[], data: ITopic[]) => boolean = (res, data) =>
    !res.length || data.length >= 100
) {
  const [data, setData] = React.useState<ITopic[]>([])
  const [userMap, getMoreUsers] = useUserMap()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const { loadingColor } = useSelector(selector)

  const onLoadMore = () =>
    service(data.length)
      .then((res: ITopic[]) => {
        setData(concat(data, res))
        setIsLoading(false)

        if (checkIsLoaded(res, data)) {
          setIsLoaded(true)
        }

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
      isLoaded,
    },
    { setData, setIsLoaded },
  ] as const
}

import React from 'react'
import { useLocation } from 'react-router'
import { parse } from 'query-string'
import { ISearchQuery } from 'src/layout/BasicLayout/HeaderSearch'
import SearchTopic from 'src/pages/search/components/SearchTopic'
import SEARCH_TYPE from 'src/constants/SearchType'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'
import SearchUser from 'src/pages/search/components/SearchUser'
import SearchBoard from 'src/pages/search/components/SearchBoard'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

function checkCanSearch(qs: ISearchQuery) {
  if (!qs.keyword || !qs.type) {
    return false
  }

  if (qs.type === SEARCH_TYPE.TOPICS_OF_BOARD && !qs.boardId) {
    return false
  }

  return true
}

const Search: React.FC = () => {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const qs = parse(search) as ISearchQuery
  const canSearch = checkCanSearch(qs)

  useDocumentTitle('搜索结果')

  React.useEffect(() => {
    if (!canSearch || !Object.values(SEARCH_TYPE).includes(qs.type!)) {
      dispatch(replace('/'))
    }
  }, [canSearch])

  if (!canSearch) {
    return null
  }

  switch (qs.type) {
    case SEARCH_TYPE.ALL_TOPICS:
    case SEARCH_TYPE.TOPICS_OF_BOARD:
      return <SearchTopic keyword={qs.keyword!} boardId={qs.boardId} />
    case SEARCH_TYPE.USER:
      return <SearchUser keyword={qs.keyword!} />
    case SEARCH_TYPE.BOARD:
      return <SearchBoard keyword={qs.keyword!} />

    default:
      return null
  }
}

export default Search

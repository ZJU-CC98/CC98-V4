import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import Select from 'src/components/Select'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SEARCH_TYPE, { getSearchTypeDesc } from 'src/constants/SearchType'

import s from './HeaderSearch.m.scss'

interface ISearchQuery {
  boardId?: string
  keyword?: string
  type?: SEARCH_TYPE
}

const HeaderSearch: React.FC<RouteComponentProps> = ({ location, history }) => {
  const qs = parse(location.search) as ISearchQuery
  const types = getSearchTypesByPath(location.pathname, qs.boardId)
  const [type, setType] = React.useState(qs.type || types[0])
  const [keyword, setKeyword] = React.useState(qs.keyword || '')

  function goToSearch() {
    if (!keyword) {
      return
    }

    const query: ISearchQuery = {
      type,
      keyword,
    }

    if (type === SEARCH_TYPE.TOPICS_OF_BOARD) {
      query.boardId = getBoardIdFromPath(location.pathname) || qs.boardId || '0'
    }

    if (location.pathname.startsWith('/search')) {
      history.replace({
        search: stringify(query),
      })
    } else {
      history.push({
        pathname: '/search',
        search: stringify(query),
      })
    }
  }

  return (
    <div className={s.root}>
      <Select
        value={type}
        onChange={setType as (value: string) => void}
        data={types.map(item => ({
          value: item,
          label: getSearchTypeDesc(item),
        }))}
        width={55}
        popWidth={32}
        className={s.select}
        itemClassName={s.item}
      />
      <input
        placeholder="请输入搜索内容"
        onKeyUp={e => e.key === 'Enter' && goToSearch()}
        className={s.input}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <span onClick={goToSearch}>
        <Icon className={s.icon} icon={faSearch} size="sm" />
      </span>
    </div>
  )
}

export default withRouter(HeaderSearch)

function getSearchTypesByPath(path: string, boardId?: string) {
  // 默认不显示版内
  const base = [SEARCH_TYPE.ALL_TOPICS, SEARCH_TYPE.USER, SEARCH_TYPE.BOARD]

  switch (true) {
    case path.startsWith('/topic'):
    case path.startsWith('/board'):
    case path.startsWith('/search') && !!boardId:
      return [SEARCH_TYPE.TOPICS_OF_BOARD, ...base]
    default:
      return base
  }
}

function getBoardIdFromPath(path: string) {
  switch (true) {
    case path.startsWith('/topic'):
    // TODO: topic 的版内搜索有点问题
    // eslint-disable-next-line no-fallthrough
    case path.startsWith('/board'):
      return path.split('/')[2] || ''
    default:
      return ''
  }
}

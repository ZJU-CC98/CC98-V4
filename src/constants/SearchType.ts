enum SEARCH_TYPE {
  ALL_TOPICS = 'all',
  USER = 'user',
  BOARD = 'board',
  TOPICS_OF_BOARD = 'topic',
}

export default SEARCH_TYPE

export function getSearchTypeDesc(searchType: SEARCH_TYPE) {
  switch (searchType) {
    case SEARCH_TYPE.ALL_TOPICS:
      return '主题'
    case SEARCH_TYPE.BOARD:
      return '版面'
    case SEARCH_TYPE.TOPICS_OF_BOARD:
      return '版内'
    case SEARCH_TYPE.USER:
      return '用户'
    default:
      return ''
  }
}

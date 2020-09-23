import React from 'react'
import { getUserByName } from 'src/service/user'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import useBreadcrumb from 'src/hooks/useBreadcrumb'

interface ISearchUserProps {
  keyword: string
}

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '搜索用户',
]

const SearchUser: React.FC<ISearchUserProps> = ({ keyword }) => {
  const [isNotFound, setIsNotFound] = React.useState(false)
  const dispatch = useDispatch()

  useBreadcrumb(breadcrumb)

  React.useEffect(() => {
    getUserByName(keyword)
      .then(user => {
        dispatch(push(`/user/${user.id}`))
      })
      .catch(() => {
        setIsNotFound(true)
      })
  }, [keyword])

  if (isNotFound) {
    return <span>nothing</span> // todo
  }

  return null
}

export default SearchUser

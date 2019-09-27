import React from 'react'
import { IBoard } from '@cc98/api'
import { searchBoard } from 'src/service/board'
import Button from 'src/components/Button'
import useBreadcrumb from 'src/hooks/useBreadcrumb'
import { useHistory } from 'react-router'

interface ISearchBoardProps {
  keyword: string
}

const breadcrumb = [
  {
    name: '首页',
    url: '/',
  },
  '搜索版面',
]

const SearchBoard: React.FC<ISearchBoardProps> = ({ keyword }) => {
  const [boards, setBoards] = React.useState<IBoard[]>([])
  const { push } = useHistory()

  useBreadcrumb(breadcrumb)

  React.useEffect(() => {
    searchBoard(keyword).then(setBoards)
  }, [keyword])

  return (
    <>
      {boards.map(board => (
        <Button
          style={{ margin: 8, cursor: 'pointer' }}
          primary
          border
          key={board.id}
          onClick={() => push(`/board/${board.id}`)}
        >
          {board.name}
        </Button>
      ))}
    </>
  )
}

export default SearchBoard

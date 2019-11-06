import React from 'react'
import { IDisplayTitle, IUser } from '@cc98/api'
import { Link } from 'react-router-dom'
import { getAllDisplayTitles } from 'src/service/config'

import s from './UserDisplayTitles.m.scss'

interface IUserDisplayTitlesProps {
  user: IUser
}

const UserDisplayTitles: React.FC<IUserDisplayTitlesProps> = ({ user }) => {
  const [displayTitles, setDisplayTitles] = React.useState<IDisplayTitle[]>([])

  React.useEffect(() => {
    getAllDisplayTitles().then(setDisplayTitles)
  }, [])

  return (
    <div className={s.root}>
      {displayTitles && user.userTitleIds
        ? displayTitles
            .filter(item => user.userTitleIds.indexOf(item.id) !== -1)
            .map(item =>
              // TODO: constants
              [18, 81].indexOf(item.id) === -1 ? (
                <p className={s.p} style={{ color: 'red' }}>
                  {item.name}
                </p>
              ) : null
            )
        : null}
      {user.boardMasterTitles.map(item =>
        // TODO: constants
        item.boardMasterLevel === 10 ? (
          <p key={item.boardId} className={s.p}>
            {/* 站务主管 */}
            <Link className={s.a} to={`/boardList#${item.boardName}`}>
              {item.boardName}
            </Link>
            <span className={s.span} style={{ color: 'red' }}>
              {item.title}
            </span>
          </p>
        ) : (
          <p key={item.boardId} className={s.p}>
            {/* 站务主管 */}
            <Link className={s.a} to={`/board/${item.boardId}`}>
              {item.boardName}
            </Link>
            <span className={s.span}>{item.title}</span>
          </p>
        )
      )}
    </div>
  )
}

export default UserDisplayTitles

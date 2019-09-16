import React from 'react'
import { range } from 'lodash'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import Button from 'src/components/Button'

import s from './index.m.scss'

interface IPaginationProps {
  current?: number
  // 页数
  total: number
  onChange: (targetPage: number) => void
  type?: 'normal' | 'mini'
}

const renderButton = (page: number, onChange: (page: number) => void, current: number) => (
  <Button
    className={cn(s.button, {
      [s.current]: current === page,
    })}
    key={page}
    onClick={() => onChange(page)}
  >
    {page}
  </Button>
)

const Pagination: React.FC<IPaginationProps> = ({
  current = 1,
  total,
  onChange,
  type = 'normal',
}) => {
  const { start, end, middle = [] } = getShowPage(current, total, type)

  if (type === 'mini') {
    return (
      <p className={s.mini}>
        {start.map(page => (
          <span key={page} onClick={() => onChange(page)}>
            {page}
          </span>
        ))}
        {!!end.length && (
          <>
            <span className={s.miniDivider}>...</span>
            {end.map(page => (
              <span key={page} onClick={() => onChange(page)}>
                {page}
              </span>
            ))}
          </>
        )}
      </p>
    )
  }

  return (
    <div className={s.root}>
      {total > 1 && (
        <Button className={s.button} disabled={current === 1}>
          <Icon icon={faChevronLeft} />
        </Button>
      )}
      {start.map(item => renderButton(item, onChange, current))}
      {!!middle.length && (
        <>
          <span className={s.divider}>...</span>
          {middle.map(item => renderButton(item, onChange, current))}
        </>
      )}
      {!!end.length && (
        <>
          <span className={s.divider}>...</span>
          {end.map(item => renderButton(item, onChange, current))}
        </>
      )}
      {total > 1 && (
        <Button className={s.button} disabled={current === total}>
          <Icon icon={faChevronRight} />
        </Button>
      )}
    </div>
  )
}

export default Pagination

function getShowPage(current: number, total: number, type: 'normal' | 'mini') {
  if (type === 'mini') {
    if (total < 8) {
      return {
        start: range(1, total + 1),
        end: [],
      }
    }

    return {
      start: range(1, 5),
      end: range(total - 2, total + 1),
    }
  }

  if (total < 10) {
    return {
      start: range(1, total + 1),
      end: [],
    }
  }

  if (current < 5) {
    return {
      start: range(1, 6),
      end: [total],
    }
  }

  if (total - current < 4) {
    return {
      start: [1],
      end: range(total - 4, total + 1),
    }
  }

  return {
    start: [1],
    end: [total],
    middle: range(current - 1, current + 2),
  }
}

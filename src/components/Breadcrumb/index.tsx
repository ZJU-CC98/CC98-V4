import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import s from './index.m.scss'

export type BreadcrumbItem =
  | {
      name: string
      url: string
    }
  | string

interface IBreadcrumbProps {
  data: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ data, className }) => (
  <div className={cn(className)}>
    {data
      .map(item =>
        typeof item === 'string' ? (
          <span className={s.item} key={item}>
            {item}
          </span>
        ) : (
          <Link className={s.item} key={item.url} to={item.url}>
            {item.name}
          </Link>
        )
      )
      .map((item, index) =>
        index + 1 === data.length ? (
          item
        ) : (
          <React.Fragment key={(data[index] as any).name || data[index]}>
            {item}
            <span className={s.icon}>
              <Icon icon={faChevronRight} />
            </span>
          </React.Fragment>
        )
      )}
  </div>
)

export default Breadcrumb

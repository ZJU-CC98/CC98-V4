import React from 'react'
import { noop } from 'lodash'
import Pagination from 'src/components/Pagination'
import Spin from 'src/components/Spin'

import s from './UserCenterContentList.m.scss'

type BaseProps = { id: string | number }

interface IUserCenterContentListProps<T extends BaseProps> {
  renderItem: (item: T) => React.ReactNode
  service: (page: number, pageSize: number) => Promise<T[]>
  showPager?: boolean
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
}

export default function UserCenterContentList<T extends BaseProps>({
  renderItem,
  service,
  currentPage = 1,
  showPager = true,
  pageSize = 10,
  onPageChange = noop,
}: IUserCenterContentListProps<T>) {
  const [data, setData] = React.useState<T[]>([])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    setIsLoaded(false)
    service(currentPage, pageSize + 1)
      .then(res => {
        setData(res.slice(0, pageSize))

        if (res.length < pageSize + 1) {
          setIsLoaded(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage, pageSize, service])

  return (
    <div className={s.root}>
      <div className={s.content}>
        {loading ? (
          <Spin />
        ) : (
          data.map(item => <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>)
        )}
      </div>
      {showPager && (
        <Pagination
          current={currentPage}
          total={isLoaded ? currentPage : currentPage + 1}
          onChange={onPageChange}
        />
      )}
    </div>
  )
}

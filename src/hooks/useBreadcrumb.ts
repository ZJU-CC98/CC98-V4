import React from 'react'
import { BreadcrumbItem } from 'src/components/Breadcrumb'
import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION_TYPES } from 'src/store/global-actions'

export default function useBreadcrumb(breadcrumb: BreadcrumbItem[]) {
  const dispatch = useDispatch()
  const deps = breadcrumb.reduce(
    (res, curr) => {
      if (typeof curr === 'string') {
        res.push(curr)
      } else {
        res.push(curr.name)
        res.push(curr.url)
      }
      return res
    },
    [] as string[]
  )
  React.useEffect(() => {
    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_BREADCRUMB,
      payload: breadcrumb,
    })
  }, deps)
}

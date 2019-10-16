import React from 'react'

export function useService<T extends (...args: any[]) => Promise<any>>(service: T) {
  const [loading, setLoading] = React.useState(false)

  return [
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      setLoading(true)
      return service(...args).finally(() => {
        setLoading(false)
      })
    },
    loading,
  ] as const
}

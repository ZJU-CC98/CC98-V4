import React from 'react'

export default function useClickOutside(
  handler: () => void,
  ...refs: React.RefObject<HTMLElement>[]
) {
  function handleDocumentClick(e: MouseEvent) {
    if (
      refs.every(ref => !!ref.current) &&
      refs.every(ref => !ref.current!.contains(e.target as Node))
    ) {
      handler()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [...refs.map(ref => ref.current)])
}

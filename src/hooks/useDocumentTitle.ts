import React from 'react'

export default function useDocumentTitle(title?: string, suffix = 'CC98论坛') {
  React.useEffect(() => {
    document.title = title ? `${title} - ${suffix}` : suffix
  }, [title, suffix])
}

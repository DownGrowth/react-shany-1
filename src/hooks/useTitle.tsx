import { useEffect } from 'react'

export const useTitle = (title?: string) => {
  useEffect(() => {
    if (title === undefined || null) { return }
    document.title = title
  }, [])
}

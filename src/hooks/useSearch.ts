import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

interface UseSearchOptions<T> {
  keys: string[]
  threshold?: number
  includeScore?: boolean
  includeMatches?: boolean
}

export function useSearch<T>(
  data: T[],
  options: UseSearchOptions<T>
) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(data, {
      keys: options.keys,
      threshold: options.threshold || 0.3,
      includeScore: options.includeScore || false,
      includeMatches: options.includeMatches || false,
    })
  }, [data, options])

  const results = useMemo(() => {
    if (!query.trim()) {
      return data
    }

    const searchResults = fuse.search(query)
    return options.includeScore || options.includeMatches
      ? searchResults
      : searchResults.map(result => result.item)
  }, [query, fuse, data, options])

  return {
    query,
    setQuery,
    results,
    clear: () => setQuery('')
  }
}
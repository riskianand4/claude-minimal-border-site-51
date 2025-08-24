import { useState, useMemo } from 'react'

interface UsePaginationOptions {
  itemsPerPage?: number
  initialPage?: number
}

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
) {
  const { itemsPerPage = 10, initialPage = 1 } = options
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex)
  }, [data, startIndex, endIndex])

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }

  const nextPage = () => {
    goToPage(currentPage + 1)
  }

  const prevPage = () => {
    goToPage(currentPage - 1)
  }

  const goToFirstPage = () => {
    goToPage(1)
  }

  const goToLastPage = () => {
    goToPage(totalPages)
  }

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    totalItems: data.length,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, data.length)
  }
}
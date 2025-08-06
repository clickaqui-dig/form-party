import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  totalElements: number;
  limit: number;
  last: boolean;
  number ?: number;
}
export function usePaginatedSearch<T>(
  fetcher: (term: string, page: number, size: number) => Promise<PaginatedResponse<T>>,
  debounceMs = 500
) {
  const [items, setItems] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const latestSearch = useRef(searchTerm);
  latestSearch.current = searchTerm;

  const runFetch = useCallback(
    async (page = 0, term = latestSearch.current) => {
      setLoading(true);
      try {
        const res = await fetcher(term, page, 10);

        setItems(res.content);
        setCurrentPage(res.page);
        const total = Math.ceil(res.totalElements / 10)
        setTotalPages(total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  useEffect(() => {
    const id = setTimeout(() => runFetch(0, searchTerm), debounceMs);
    return () => clearTimeout(id);
  }, [searchTerm, runFetch, debounceMs]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) runFetch(page);
    },
    [currentPage, runFetch]
  );

  const reset = useCallback(() => {
    setSearchTerm('');
    runFetch(0, '');
  }, [runFetch]);

  return useMemo(
    () => ({
      items,
      loading,
      currentPage,
      totalPages,
      searchTerm,
      setSearchTerm,
      handlePageChange,
      refresh: runFetch,
      reset,
    }),
    [items, loading, currentPage, totalPages, searchTerm, handlePageChange, runFetch, reset]
  );
}

import { useCallback, useEffect, useState } from 'react';
import type { Paginated } from '../types';

type Fetcher<T> = (page: number, limit: number) => Promise<Paginated<T>>;

export function usePaginatedList<T>(fetcher: Fetcher<T>, limit = 5) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetcher(page, limit);
      setData(result.data);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  }, [fetcher, page, limit]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, page, setPage, total, limit, loading, reload };
}

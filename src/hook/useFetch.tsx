import { useCallback, useEffect, useState } from 'react';

export const useFetch = (URL: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(URL);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData };
};

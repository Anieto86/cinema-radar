import { useCallback, useEffect, useState } from 'react';

export const useFetchMovie = (URL: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await fetch(URL);
      const responseJson = await response?.json();

      setData(responseJson);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

import { useCallback, useEffect, useState } from 'react';

export const useFetch = (URL: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const responseJson = await response.json();
      if (responseJson.Search) {
        setData(responseJson);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData };
};

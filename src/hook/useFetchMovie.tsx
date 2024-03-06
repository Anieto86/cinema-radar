import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

export const useFetchMovie = (id: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = useCallback(async () => {
    const URL = `http://www.omdbapi.com/?apikey=${key}`;
    const idParam = `&i=${id}`;
    const OMDbAPI = `${URL}${idParam}`;
    try {
      const response = await fetch(OMDbAPI);
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
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

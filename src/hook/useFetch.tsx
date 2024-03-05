import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

export const useFetch = (name?: string, year?: string, type?: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = useCallback(async () => {
    // setLoading(true);
    // const OMDbAPI = `http://www.omdbapi.com/?s=${name}&apikey=${key}&type=${type}&y=${year}`;

    const OMDbAPI = `http://www.omdbapi.com/?apikey=${key}&s=${name}&type=${type}&y=${year}`;

    // const OMDbAPIbyID = `http://www.omdbapi.com/?apikey=${key}&i=${
    //   imdbID ?? null
    // }`;

    try {
      const response = await fetch(OMDbAPI);
      const responseJson = await response?.json();

      console.log(responseJson.Search);

      if (responseJson.Search) {
        setData(responseJson.Search);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [name, year, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

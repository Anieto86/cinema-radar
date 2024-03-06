import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IMovie {
  name?: string;
  year?: number[];
  type?: string;
  // id?: string;
}

export const useFetch = ({ name, year, type }: IMovie) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  console.log(year);

  const fetchData = useCallback(async () => {
    const URL = `http://www.omdbapi.com/?apikey=${key}`;
    // &y=${year} add later
    const searchParams = `&s=${name}&type=${type}`;
    const OMDbAPI = `${URL}${searchParams}`;

    try {
      const response = await fetch(OMDbAPI);
      const responseJson = await response?.json();

      // console.log(responseJson.Search);

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
  }, [name, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

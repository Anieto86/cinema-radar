import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  name?: string;
  year?: number;
  type?: string;
}

export interface DataType {
  totalResults: string;
  Response: string;
  Search?: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
}

export const useFetch = ({ name, year, type }: IProp) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // setLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=${key}`;
    // &y=${year} add later
    const searchParams = `&s=${name}&type=${type}`;
    const OMDbAPI = `${URL}${searchParams}`;

    try {
      const response = await fetch(OMDbAPI);
      const responseJson = await response?.json();

      // console.log(responseJson);

      if (responseJson.Search) {
        setLoading(true);
        setData(responseJson);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }, [name, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

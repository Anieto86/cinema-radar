import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  name?: string;
  year: number[];
  type?: string;
}
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const useFetch = ({ name, year, type }: IProp) => {
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // console.log(year);

  const intermediateValues = (year: number[]) => {
    const newArray = [];
    const start = year[0];
    const end = year[year.length - 1];
    for (let i = start; i <= end; i++) {
      newArray.push(i);
    }
    return newArray;
  };

  const fetchData = useCallback(async () => {
    // setLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=${key}`;
    const yearRange = intermediateValues(year);

    try {
      const requests = yearRange.map(async (year) => {
        const response = await fetch(`${URL}&s=${name}&type=${type}&y=${year}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      });

      const results = await Promise.allSettled(requests);
      const searchData = results
        .filter(
          (result): result is PromiseFulfilledResult<unknown> =>
            result.status === 'fulfilled' && result.value && result.value.Search
        )
        .map((result) => result.value);

      console.log(searchData);

      setData(searchData as unknown as SearchResult);
    } catch (error) {
      setError(error as Error | null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [name, type, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import { handleYearRange } from '../utils/helpers';

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  name?: string;
  year: number[];
  type?: string;
}
export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResult {
  Search: Search[];
  totalResults: string;
  Response: string;
}

export const useFetch = ({ name, year, type }: IProp) => {
  const [data, setData] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //Avoid extra re-render calls
  const yearRange = useMemo(() => handleYearRange(year), [year]);

  const fetchData = useCallback(async () => {
    // setLoading(true);
    try {
      const URL = `http://www.omdbapi.com/?apikey=${key}`;
      const fetchPromises = yearRange.map(async (years) => {
        const response = await fetch(
          `${URL}&s=${name}&type=${type}&y=${years}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      });

      const results = await Promise.allSettled(fetchPromises);
      const successfulResults = results
        .filter(
          (result): result is PromiseFulfilledResult<SearchResult> =>
            result.status === 'fulfilled'
        )
        .map((result) => result.value);

      setData(successfulResults as SearchResult[]);
    } catch (error) {
      setError(error as Error | null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [name, type, yearRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

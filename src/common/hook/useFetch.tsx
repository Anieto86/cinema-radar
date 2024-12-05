import { useCallback, useEffect, useMemo, useState } from "react";
import pLimit from "p-limit";
import { debounce } from "lodash";
import { handleYearRange } from "../utils/helpers";

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  name?: string;
  year: number[];
  type?: string;
}
export interface SearchType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResultType {
  Search: SearchType[];
  totalResults: string;
  Response: string;
}

export const useFetch = ({ name, year, type }: IProp) => {
  const [data, setData] = useState<SearchResultType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //Avoid extra re-render calls store the fn
  const yearRange = useMemo(() => handleYearRange(year), [year]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const URL = `https://www.omdbapi.com/?apikey=${key}`;

        const limit = pLimit(10);

        const fetchPromises = yearRange.map(async (years) => {
          //p-limit to limit the big number of petitions at the same time.
          return limit(async () => {
            const response = await fetch(
              `${URL}&s=${name}&type=${type}&y=${years}&page=${1}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return await response.json();
          });
        });

        const results = await Promise.allSettled(fetchPromises);
        const successfulResults = results
          .filter(
            (result): result is PromiseFulfilledResult<SearchResultType> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

        setData(successfulResults as SearchResultType[]);
      } catch (error) {
        setError(error as Error | null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [name, type, yearRange]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

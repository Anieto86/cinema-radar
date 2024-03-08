import { useCallback, useEffect, useState } from 'react';
const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  name?: string;
  year: number[];
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

  // console.log(year);

  const intermediateValues = (year: number[]) => {
    const newArray = [];
    const start = year.at(0);
    const end = year.at(-1);
    for (let i = start; i <= end; i++) {
      newArray.push(i);
    }
    return newArray;
  };

  const fetchData = useCallback(async () => {
    // setLoading(true);
    const URL = `http://www.omdbapi.com/?apikey=${key}`;
    // &y=${year} add later
    const searchParams = `&s=${name}&type=${type}&y=2000`;
    const OMDbAPI = `${URL}${searchParams}`;

    const yearRange = intermediateValues(year);

    const requests = yearRange.map(async (year) => {
      const response = await fetch(`${URL}&s=${name}&type=${type}&y=${year}`);
      const data = await response.json();
      return data;
    });

    const results = await Promise.all(requests);

    console.log(results);

    try {
      // setLoading(true);
      const response = await fetch(OMDbAPI);
      const responseJson = await response?.json();
      if (responseJson.Search) {
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
  }, [name, type, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, year, type]);

  return { data, loading, error };
};

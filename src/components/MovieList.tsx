import { useFetch } from '../hook/useFetch';

export const MovieList = () => {
  const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

  const OMDbAPI = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}`;
  const { data, loading, error } = useFetch(OMDbAPI);

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return <div>Loading...</div>;

  return <div>MovieList</div>;
};

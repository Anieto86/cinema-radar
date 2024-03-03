import { useFetch } from '../hook/useFetch';

export const MovieList = () => {
  const OMDbAPI = 'http://www.omdbapi.com/?i=tt3896198&apikey=2de1e68d';
  const { data, loading, error } = useFetch(OMDbAPI);

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return <div>Loading...</div>;

  return <div>MovieList</div>;
};

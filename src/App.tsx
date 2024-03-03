import './App.css';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

function App() {
  const [searchMovie, setSearchMovie] = useState('avengers');
  const OMDbAPI = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${key}`;

  const { data, loading } = useFetch(OMDbAPI);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // if (data?.Search) setSearchMovie(data?.Search);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      </Grid>
      <Grid item xs={5}>
        <MovieList dataList={data?.Search} />
      </Grid>
      <Grid item xs={7} sx={{ border: '2px solid blue' }}>
        <MovieContent />
      </Grid>
    </Grid>
  );
}

export default App;

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
  const [searchType, setSearchType] = useState('');

  const OMDbAPI = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${key}&type=${searchType}`;

  const { data, loading } = useFetch(OMDbAPI);

  if (loading) return <div>Loading...</div>;

  const handleSearchMovie = (value: string) => {
    setSearchMovie(value);
  };

  const handleSearchMovieType = (value: string) => {
    setSearchType(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header
          searchMovie={searchMovie}
          onSearchMovie={handleSearchMovie}
          searchType={searchType}
          onSearchMovieType={handleSearchMovieType}
        />
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

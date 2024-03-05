import './App.css';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

function App() {
  const [searchMovie, setSearchMovie] = useState('star wars');
  const [searchYear, setSearchYear] = useState('1980');
  const [searchType, setSearchType] = useState('');
  const [selectMovie, setSelectMovie] = useState(0);

  const OMDbAPI = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${key}&type=${searchType}&y=${searchYear}`;

  const { data, loading, error } = useFetch(OMDbAPI);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleSearchMovie = (value: string) => {
    setSearchMovie(value);
  };

  const handleSearchYear = (value: string) => {
    setSearchYear(value);
  };

  const handleSearchMovieType = (value: string) => {
    setSearchType(value);
  };

  const handleMovieClick = (index: number) => {
    setSelectMovie(index);
  };

  // Check if data exists before accessing Search property
  const selectedMovie = data[selectMovie];
  // console.log(selectedMovie);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header
          searchMovie={searchMovie}
          onSearchMovie={handleSearchMovie}
          searchType={searchType}
          onSearchMovieType={handleSearchMovieType}
          searchYear={searchYear}
          onSearchYear={handleSearchYear}
        />
      </Grid>
      <Grid item xs={5}>
        <MovieList
          dataList={data}
          selectMovie={selectMovie}
          onSelectMovie={handleMovieClick}
        />
      </Grid>
      <Grid item xs={7} sx={{ border: '2px solid blue' }}>
        <MovieContent imdbID={selectedMovie.imdbID} />
      </Grid>
    </Grid>
  );
}

export default App;

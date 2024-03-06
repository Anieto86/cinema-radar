import './App.css';
import { debounce } from 'lodash';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
// import { ErrorPage } from './routes/ErrorPage';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';
import { DataType } from './hook/useFetch';

function App() {
  const [searchMovie, setSearchMovie] = useState<string | undefined>(
    'star wars'
  );
  const [searchYear, setSearchYear] = useState<number | undefined>(2021);
  const [searchType, setSearchType] = useState<string>('movie');
  const [selectMovie, setSelectMovie] = useState<number>(0);

  const params = {
    name: searchMovie,
    type: searchType,
    year: searchYear,
  };

  const { data, loading, error } = useFetch({ ...params });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const id = data?.Search && (data.Search[selectMovie].imdbID as string);

  const handleSearchMovie = debounce((value: string | undefined) => {
    setSearchMovie(value);
  }, 100);

  const handleSearchYear = (value: number) => {
    if (searchMovie) setSearchYear(value);
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
          searchYear={searchYear}
          onSearchYear={handleSearchYear}
        />
      </Grid>
      <Grid item xs={4}>
        <MovieList
          dataList={data as DataType}
          selectMovie={selectMovie}
          onSelectMovie={(index: number) => setSelectMovie(index)}
        />
      </Grid>
      <Grid item xs={8}>
        <MovieContent imdbID={id} />
      </Grid>
    </Grid>
  );
}

export default App;

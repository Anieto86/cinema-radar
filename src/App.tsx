import './App.css';
import { debounce } from 'lodash';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
// import { ErrorPage } from './routes/ErrorPage';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';
import { SearchResult } from './hook/useFetch';

function App() {
  const [movie, setMovie] = useState<string | undefined>('star wars');
  const [year, setYear] = useState<number[]>([2000, 2001]);
  const [type, setType] = useState<string>('movie');
  const [selectMovie, setSelectMovie] = useState<number>(0);

  const params = {
    name: movie,
    type,
    year,
  };

  const { data, loading, error } = useFetch({ ...params });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const id = data?.Search && (data.Search[selectMovie].imdbID as string);

  const handleSearchMovie = debounce((value: string | undefined) => {
    setMovie(value);
  }, 100);

  const handleSearchYear = (_event: Event, newValue: number[]) => {
    setYear(newValue as number[]);
  };

  const handleSearchMovieType = (value: string) => {
    if (movie) setType(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header
          movie={movie}
          onSearchMovie={handleSearchMovie}
          type={type}
          onSearchMovieType={handleSearchMovieType}
          year={year}
          onSearchYear={(_e: Event, newValue: number[]) =>
            handleSearchYear(_e, newValue)
          }
        />
      </Grid>
      <Grid item xs={4}>
        <MovieList
          dataList={data as SearchResult}
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

import './App.css';
import { debounce, throttle } from 'lodash';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
import { MovieContent } from './components/MovieContent';
import { Grid, Typography } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';
import { Search } from './hook/useFetch';

function App() {
  const [movie, setMovie] = useState<string | undefined>('Indiana Jones');
  const [year, setYear] = useState<number[]>([1984, 1990]);
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

  const filteredData = data?.filter((d) => d.Response === 'True');

  const movies = filteredData?.flatMap((result) => result.Search || []);
  const movieId = movies?.map((result) => result.imdbID)[selectMovie] as string;

  const totalResult = filteredData
    ?.map((obj) => parseInt(obj.totalResults))
    .reduce((acc, curr) => acc + curr, 0);

  const handleSearchMovie = debounce((value: string | undefined) => {
    setMovie(value);
  }, 100);

  const handleSearchYear = throttle(
    (_event: Event | null, newValue: number[]) => {
      setYear(newValue as number[]);
    },
    500
  );

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
          onSearchYear={(_e, newValue) => handleSearchYear(_e, newValue)}
        />
      </Grid>
      <Grid item xs={4}>
        <MovieList
          movies={movies as Search[]}
          totalResult={totalResult as number}
          selectMovie={selectMovie}
          onSelectMovie={(index: number) => setSelectMovie(index)}
          onSearchMovie={handleSearchMovie}
          onSearchYear={(_e, newValue) => handleSearchYear(_e, newValue)}
        />
      </Grid>
      <Grid item xs={8}>
        {totalResult ? (
          <MovieContent imdbID={movieId} />
        ) : (
          <Grid item xs={8}>
            <Typography variant="h6">No Results found</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default App;

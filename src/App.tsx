import './App.css';
import { debounce, throttle } from 'lodash';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
import { MovieContent } from './components/MovieContent';
import { Grid, Typography } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';
import { Search } from './hook/useFetch';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

function App() {
  const [movie, setMovie] = useState<string | undefined>('Indiana Jones');
  const [year, setYear] = useState<number[]>([2000, 2012]);
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
        />
      </Grid>
      <Grid item xs={8}>
        {totalResult ? (
          <MovieContent movieId={movieId} />
        ) : (
          <Grid
            container
            display="flex"
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ p: 2, my: 2, height: '100vh' }}
          >
            <Grid item>
              <Typography variant="h5">Please try again</Typography>
            </Grid>
            <Grid item style={{ fontSize: 70 }}>
              🤦‍♂️
            </Grid>
            <Grid item>
              <InfoRoundedIcon sx={{ fontSize: '100px' }} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default App;

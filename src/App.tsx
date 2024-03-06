import './App.css';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
// import { ErrorPage } from './routes/ErrorPage';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';
interface MovieType {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

function App() {
  const [searchMovie, setSearchMovie] = useState<string | undefined>(
    'star wars'
  );
  const [searchYear, setSearchYear] = useState<number[] | undefined>([
    1800, 2024,
  ]);
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

  const id: MovieType = data && data[selectMovie];

  const handleSearchMovie = (value: string | undefined) => {
    setSearchMovie(value);
  };

  const handleSearchYear = (value: number[]) => {
    // eslint-disable-next-line prefer-const
    let newArray = [];
    const start = value.at(0);
    const end = value.at(-1);

    for (let i = start; i <= end; i++) {
      newArray.push(i);
    }
    console.log(newArray);
    setSearchYear(newArray);
    return newArray;
  };

  const handleSearchMovieType = (value: string) => {
    setSearchType(value);
  };

  const handleMovieClick = (index: number) => {
    setSelectMovie(index);
  };

  // Check if data exists before accessing Search property

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
        <MovieContent imdbID={id.imdbID} />
      </Grid>
    </Grid>
  );
}

export default App;

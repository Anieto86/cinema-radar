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
  const [searchYear, setSearchYear] = useState<string | undefined>();
  const [searchType, setSearchType] = useState<string>('');
  const [selectMovie, setSelectMovie] = useState<number>(0);

  // const OMDbAPI = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${key}&type=${searchType}&y=${searchYear}`;

  // const { data, loading, error } = useFetch(OMDbAPI);

  const { data, loading, error } = useFetch(
    searchMovie,
    searchYear,
    searchType
  );

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const id: MovieType = data[selectMovie];

  const handleSearchMovie = (value: string | undefined) => {
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

  // conconst sole.log(id);\
  // const movie = id || 0;

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

import './App.css';
import { MovieList } from './components/MovieList';
import { Header } from './components/common/Header';
import { MovieContent } from './components/MovieContent';
import { Grid } from '@mui/material';
import { useFetch } from './hook/useFetch';

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

function App() {
  const OMDbAPI = `http://www.omdbapi.com/?s=avengers&apikey=${key}`;
  const { data, loading, error } = useFetch(OMDbAPI);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={4}>
        <MovieList dataList={data?.Search} />
      </Grid>
      <Grid item xs={8} sx={{ border: '2px solid blue' }}>
        <MovieContent />
      </Grid>
    </Grid>
  );
}

export default App;

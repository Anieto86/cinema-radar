import "./App.css";
import { throttle } from "lodash";
import { MovieList } from "./components/MovieList";
import { Header } from "./components/Header";
import { MovieContent } from "./components/MovieContent";
import { Grid, Typography } from "@mui/material";
import { useFetch } from "./hook/useFetch";
import { useState } from "react";
import { Search } from "./hook/useFetch";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Loading } from "./components/common/Loading";
import { Footer } from "./components/Footer";

function App() {
  const [movie, setMovie] = useState<string | undefined>("batman");
  const [year, setYear] = useState<number[]>([2000, 2005]);
  const [type, setType] = useState<string>("movie");
  const [selectMovie, setSelectMovie] = useState<number>(0);

  const params = {
    name: movie,
    type,
    year,
  };

  const { data, loading, error } = useFetch({ ...params });

  if (loading) return <Loading />;
  if (error) return <div>Something went wrong! Please try agin.</div>;

  const filteredData = data?.filter((d) => d.Response === "True");

  const movies = filteredData?.flatMap((result) => result.Search || []);
  const movieId = movies?.map((result) => result.imdbID)[selectMovie] as string;

  const totalResult = filteredData
    ?.map((obj) => parseInt(obj.totalResults))
    .reduce((acc, curr) => acc + curr, 0);

  const handleSearchMovie = (value: string | undefined) => {
    setMovie(value);
  };

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
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ minHeight: "100vh" }}
    >
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
            sx={{ p: 2, my: 2, height: "100vh" }}
          >
            <Grid item>
              <Typography variant="h5">Please try again</Typography>
            </Grid>
            <Grid item style={{ fontSize: 70 }}>
              🤦‍♂️
            </Grid>
            <Grid item>
              <InfoRoundedIcon sx={{ fontSize: "100px" }} />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} mt={20}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;

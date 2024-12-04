import { Grid } from "@mui/material";
import { throttle } from "lodash";
import { useState } from "react";
import "./App.css";
import { SearchType, useFetch } from "./common/hook/useFetch";
import { Loading } from "./components/common/Loading";
import { MovieContent } from "./Pages/MovieContent";
import { MovieList } from "./Pages/MovieList";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import { NoResult } from "./components/common/NoResult";

function App() {
  const [movie, setMovie] = useState<string | undefined>("batman");
  const [year, setYear] = useState<number[]>([2000, 2005]);
  const [type, setType] = useState<string>("movie");
  const [selectMovie, setSelectMovie] = useState<number>(0);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const params = {
    name: movie,
    type,
    year,
  };

  const { data, loading, error } = useFetch({ ...params });

  if (loading) return <Loading />;
  if (error) return <div>Something went wrong! Please try again</div>;

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

  const handleSelectMovie = (index: number) => {
    setSelectMovie(index);
    setIsShowMore(false);
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
      <Grid container>
        <Grid item xs={4}>
          <MovieList
            movies={movies as SearchType[]}
            totalResult={totalResult as number}
            selectMovie={selectMovie}
            onSelectMovie={(index: number) => handleSelectMovie(index)}
          />
        </Grid>
        <Grid item xs={8}>
          {totalResult ? (
            <MovieContent
              movieId={movieId}
              isShowMore={isShowMore}
              setIsShowMore={setIsShowMore}
            />
          ) : (
            <NoResult />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;

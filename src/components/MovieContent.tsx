import { Grid, Typography } from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import { MovieType, useFetchMovie } from "../hook/useFetchMovie";
import { useState, useEffect } from "react";
import { WatchList } from "./common/WatchList";
import { MoviePlot } from "../components/MoviePlot";
import { MovieRatings } from "./MovieRatings";
import { FavoritesMovies } from "./FavoritesMovies";
interface IProp {
  movieId: string;
}

export const MovieContent = ({ movieId }: IProp) => {
  const [watchlist, setWatchlist] = useState(() => {
    const list = window.localStorage.getItem("WATCHLIST_STORAGE");
    return list ? JSON.parse(list) : {};
  });

  const [favorites, setFavorites] = useState<MovieType[]>(() => {
    const fav = window.localStorage.getItem("FAVORITES_STORAGE");
    return fav !== null ? JSON.parse(fav) : [];
  });

  const { data } = useFetchMovie(movieId as string);
  const {
    Title,
    Year,
    Poster,
    Plot,
    Genre,
    Actors,
    Ratings,
    Rated,
    Runtime,
    imdbID,
  } = data;

  useEffect(() => {
    window.localStorage.setItem("FAVORITES_STORAGE", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorites = (movie: MovieType) => {
    const updatedWatchList = new Set([...favorites, movie]);
    setFavorites([...updatedWatchList]);
  };

  const handleRemoveFavorite = (imdbID: string) => {
    const myList = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(myList);
    setWatchlist({ ...watchlist, [imdbID]: false });
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={{
        mt: 2,
        p: 4,
        bgcolor: "#f9f9f9", // Fondo claro para mayor contraste
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          p: 4,
        }}
      >
        {Poster !== "N/A" ? (
          <img
            src={Poster}
            alt="movies-poster"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              width: "100%",
              height: "auto",
            }}
          />
        ) : (
          <HideImageOutlinedIcon sx={{ fontSize: "200px", ml: 5, mt: 5 }} />
        )}
      </Grid>

      <Grid item lg={9} md={12} xs={12} sx={{ minHeight: "600px", p: 2 }}>
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Grid item>
            <WatchList
              imdbID={imdbID}
              watchlist={watchlist}
              handleWatchlist={setWatchlist}
              favorites={favorites as MovieType[]}
              addFavorite={() => handleFavorites(data)}
              removeFavorite={handleRemoveFavorite}
            ></WatchList>
          </Grid>
        </Grid>
        <Typography variant="h2" fontWeight={700} sx={{ my: 10 }}>
          {Title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            my: 3,
            p: "10px",
          }}
        >
          <span
            style={{
              border: "2px solid black",
              padding: 5,
              margin: 5,
              borderRadius: "5px",
            }}
          >
            {Rated}
          </span>
          {` ${Year} · ${Genre} · ${Runtime}`}
        </Typography>
        <Typography variant="h5" sx={{ ml: 2 }}>
          {Actors}
        </Typography>
      </Grid>

      {/* Plot Section */}
      <Grid item xs={12} md={12} mb={5}>
        <MoviePlot movieDescription={Plot} />
      </Grid>

      {/* Ratings Section */}
      <Grid item xs={12} md={8}>
        <MovieRatings Ratings={Ratings} />
      </Grid>

      <FavoritesMovies
        favorites={favorites}
        handleRemoveFavorite={handleRemoveFavorite}
      />
    </Grid>
  );
};

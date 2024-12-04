import { Grid, Typography } from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import { MovieType, useFetchMovie } from "../hook/useFetchMovie";
import { useState, useEffect } from "react";
import { WatchList } from "./common/WatchList";
import { MoviePlot } from "../components/MoviePlot";
import { MovieRatings } from "./MovieRatings";
import { FavoritesMovies } from "./FavoritesMovies";
import { CustomScrollbar } from "./MovieList";
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
    Awards,
    Country,
    Language,
    Director,
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
    <CustomScrollbar>
      <Grid
        container
        justifyContent="center"
        sx={{
          p: 2,
          borderRadius: 2,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            my: 2,
            p: 4,
            bgcolor: "#f9fafb",
            borderRadius: 3,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Grid
            item
            xs={3}
            sx={{
              p: 2,
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
                  // height: "auto",
                }}
              />
            ) : (
              <HideImageOutlinedIcon sx={{ fontSize: "200px", ml: 5, mt: 5 }} />
            )}
          </Grid>

          <Grid item xs={9}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {Title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                my: 3,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  border: "2px solid black",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                {Rated}
              </span>
              {`${Year} · ${Runtime} · ${Country} · ${Language}`}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <strong>Actors: </strong>
              {Actors}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <strong>Genre: </strong>
              {Genre} · <strong>Director: </strong>
              {Director}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              <strong>Awards: </strong>
              {Awards}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
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

        {/* Plot Section */}
        {Plot !== "N/A" && (
          <Grid item xs={12} md={12} mb={5}>
            <MoviePlot movieDescription={Plot} />
          </Grid>
        )}

        {/* Ratings Section */}
        <Grid item xs={12} md={8}>
          <MovieRatings Ratings={Ratings} />
        </Grid>

        <FavoritesMovies
          favorites={favorites}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      </Grid>
    </CustomScrollbar>
  );
};

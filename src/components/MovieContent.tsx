import { Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { MovieType, useFetchMovie } from '../hook/useFetchMovie';
import { Fragment, useState, useEffect } from 'react';
import { WatchList } from './common/WatchList';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProp {
  movieId: string;
}

export const MovieContent = ({ movieId }: IProp) => {
  const [favorites, setFavorites] = useState<MovieType[]>(() => {
    const fav = window.localStorage.getItem('FAVORITES_STORAGE');
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
    window.localStorage.setItem('FAVORITES_STORAGE', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorites = (movie: MovieType) => {
    const updatedWatchList = new Set([...favorites, movie]);
    setFavorites([...updatedWatchList]);
  };

  const handleRemoveFavorite = (imdbID: string) => {
    const myList = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(myList);
  };

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          mt: 2,
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            p: 2,
          }}
        >
          {Poster !== 'N/A' ? (
            <img
              src={Poster}
              alt="movies-poster"
              style={{
                borderRadius: '5px',
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
              }}
            />
          ) : (
            <HideImageOutlinedIcon sx={{ fontSize: '200px', ml: 5, mt: 5 }} />
          )}
        </Grid>

        <Grid item lg={9} md={12} xs={12}>
          <Grid
            container
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item sx={{ border: '1px solid black', mb: 5 }}>
              <WatchList
                imdbID={imdbID}
                favorites={favorites as MovieType[]}
                addFavorite={() => handleFavorites(data)}
                removeFavorite={handleRemoveFavorite}
              ></WatchList>
            </Grid>
          </Grid>
          <Typography variant="h2" fontWeight={600} sx={{ my: 10 }}>
            {Title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              my: 3,

              padding: '10px',
            }}
          >
            {`${Rated} ${Year} · ${Genre} · ${Runtime}`}
          </Typography>
          <Typography variant="h5">{Actors}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4 }}
      >
        <Grid item xs={12} sx={{ my: 4 }}>
          <Divider />
          <Typography textAlign="center" variant="h5" sx={{ p: 4 }}>
            {Plot}
          </Typography>
          <Divider sx={{ borderLeft: '2px solid grey' }} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {Ratings?.map((r, i: number) => {
            const { Source, Value } = r;
            return (
              <Fragment key={i}>
                <Grid item>
                  <Typography textAlign="center" variant="h6" sx={{ mb: 1 }}>
                    {Value}
                  </Typography>
                  <Typography>{Source}</Typography>
                </Grid>
                {i < Ratings.length - 1 && (
                  <Grid
                    sx={{ borderLeft: '2px solid grey', height: ' 60px' }}
                  />
                )}
              </Fragment>
            );
          })}
        </Grid>

        <Grid item xs={12} sx={{ my: 2 }} textAlign="center">
          {favorites.length !== 0 && (
            <Typography variant="h3">My List</Typography>
          )}
        </Grid>
        <Grid item xs={10}>
          {favorites.map((fav, i) => (
            <Paper elevation={3} key={i}>
              <Grid
                container
                display="flex"
                alignItems="center"
                key={i}
                sx={{ my: 2 }}
              >
                {fav.Poster !== 'N/A' ? (
                  <>
                    <Grid item lg={4} md={12} xs={12}>
                      <img
                        src={fav.Poster}
                        alt="movies-poster"
                        style={{
                          borderRadius: '5px',
                          objectFit: 'cover',
                          width: '200px',
                          height: '250px',
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                      <Typography variant="h5">
                        {fav.Title} - {fav.Year}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleRemoveFavorite(fav.imdbID)}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item lg={4} md={12} xs={12}>
                      <HideImageOutlinedIcon
                        sx={{ fontSize: '200px', ml: 5, mt: 5 }}
                      />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                      <Typography variant="h5" sx={{}}>
                        {fav.Title}
                        {fav.Year}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleRemoveFavorite(fav.imdbID)}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

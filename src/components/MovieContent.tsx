import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { MovieType, useFetchMovie } from '../hook/useFetchMovie';
import { Fragment, useState, useEffect } from 'react';
import { WatchList } from './common/WatchList';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProp {
  movieId: string;
}

export const MovieContent = ({ movieId }: IProp) => {
  const [watchlist, setWatchlist] = useState(() => {
    const list = window.localStorage.getItem('WATCHLIST_STORAGE');
    return list ? JSON.parse(list) : {};
  });

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
    setWatchlist({ ...watchlist, [imdbID]: false });
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
            p: 4,
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

        <Grid item lg={9} md={12} xs={12} sx={{ minHeight: '600px', p: 2 }}>
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
              p: '10px',
            }}
          >
            <span
              style={{
                border: '2px solid black',
                padding: 5,
                margin: 5,
                borderRadius: '5px',
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
          <Typography textAlign="justify" variant="h4" sx={{ p: 4 }}>
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
                  <Typography textAlign="center" variant="h5" sx={{ mb: 1 }}>
                    {Value}
                  </Typography>
                  <Typography textAlign="center" variant="h5">
                    {Source}
                  </Typography>
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
        <Grid item xs={12} sx={{ my: 4 }}>
          <Divider />
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }} textAlign="center">
          {favorites.length !== 0 && (
            <Typography variant="h3" fontWeight={600}>
              My List
            </Typography>
          )}
        </Grid>

        <Grid
          container
          display="flex"
          direction="row"
          spacing={3}
          sx={{ my: 2 }}
        >
          {favorites.map((fav, i) => (
            <Grid item key={i}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {fav.Poster !== 'N/A' ? (
                  <CardMedia
                    component="img"
                    src={fav.Poster}
                    alt="movies-poster"
                    sx={{
                      borderRadius: '5px',
                      minHeight: '400px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Grid item lg={4} md={12} xs={12}>
                    <HideImageOutlinedIcon
                      sx={{ fontSize: '200px', ml: 5, mt: 5 }}
                    />
                  </Grid>
                )}
                <CardContent>
                  <Typography textAlign={'center'} fontWeight={500}>
                    {fav.Title}
                  </Typography>{' '}
                </CardContent>

                <CardActions
                  sx={{
                    marginTop: 'auto',

                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFavorite(fav.imdbID)}
                  >
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

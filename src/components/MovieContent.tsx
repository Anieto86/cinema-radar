import { Button, Divider, Grid, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFetchMovie } from '../hook/useFetchMovie';
import { Fragment, useState } from 'react';

interface IProp {
  imdbID?: string;
}

export const MovieContent = ({ imdbID }: IProp) => {
  const [watchlist, setWatchlist] = useState(false);

  const { data } = useFetchMovie(imdbID || '');

  const { Title, Year, Poster, Plot, Genre, Actors, Ratings } = data;

  return (
    <>
      <Grid
        container
        display="flex"
        // justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
        sx={{ outline: '1px solid pink' }}
      >
        <Grid item sx={{ mt: 2 }}>
          <img
            src={Poster}
            alt="movies-poster"
            style={{ borderRadius: '5px' }}
          />
        </Grid>
        <Grid item>
          <Button
            sx={{ border: '1px solid black', p: 2, color: 'black' }}
            onClick={() => {
              setWatchlist((watchlist) => !watchlist);
            }}
            startIcon={watchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          >
            Watchlist
          </Button>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="h2" sx={{ border: '1px solid green', p: 2 }}>
            {Title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            icon {Year} {Genre}
          </Typography>
          <Typography variant="h5">{Actors}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
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
      </Grid>
    </>
  );
};

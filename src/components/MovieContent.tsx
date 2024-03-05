import { Button, Divider, Grid, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFetchMovie } from '../hook/useFetchMovie';
import { useState } from 'react';

const key = import.meta.env.VITE_REACT_APP_OMDb_API_KEY;

interface IProp {
  imdbID?: string;
}

export const MovieContent = ({ imdbID }: IProp) => {
  const [watchlist, setWatchlist] = useState(false);
  console.log(imdbID);

  const OMDbAPIbyID = `http://www.omdbapi.com/?apikey=${key}&i=${
    imdbID ?? null
  }`;

  const { data } = useFetchMovie(OMDbAPIbyID);

  const { Title, Year, Poster, Plot, Genre, Actors, Ratings } = data;

  console.log(Title);

  return (
    <Grid container sx={{ p: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {' '}
        <Grid item xs={4}>
          <img src={Poster} alt="movies-poster" />
        </Grid>
        <Grid item xs={8}>
          <Grid
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Button
              sx={{ border: '1px solid' }}
              onClick={() => {
                setWatchlist((watchlist) => !watchlist);
              }}
              startIcon={watchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            >
              Watchlist
            </Button>
          </Grid>
          <Typography variant="h2">{Title}</Typography>
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
          <Typography textAlign="center" variant="h5">
            {Plot}
          </Typography>
          <Divider />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Divider
            sx={{
              border: '1px solid red',
            }}
            orientation="vertical"
            flexItem
          />
          {Ratings?.map((r: { Source: string; Value: string }, i: number) => {
            return (
              <Grid item key={i}>
                <Typography textAlign="center">{r.Value}</Typography>\
                <Typography>{r.Source}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

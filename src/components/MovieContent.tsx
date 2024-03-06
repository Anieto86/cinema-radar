import { Button, Divider, Grid, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFetchMovie } from '../hook/useFetchMovie';
import { Fragment, useState } from 'react';

interface IProp {
  imdbID: string;
}
interface RatingType {
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
}
interface MovieType {
  Poster: string;
  Title: string;
  Year: string;
  Genre: string;
  Ratings: RatingType;
  Actors: string;
  Plot: string;
}

export const MovieContent = ({ imdbID }: IProp) => {
  const [watchlist, setWatchlist] = useState(false);

  const { data } = useFetchMovie(imdbID);

  const { Title, Year, Poster, Plot, Genre, Actors, Ratings }: MovieType = data;

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
          {Ratings?.map((r: { Source: string; Value: string }, i: number) => {
            return (
              <Fragment key={i}>
                <Grid item>
                  <Typography textAlign="center">{r.Value}</Typography>
                  <Typography>{r.Source}</Typography>
                </Grid>
                <Grid sx={{ borderLeft: '3px solid grey', height: ' 50px' }} />
              </Fragment>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

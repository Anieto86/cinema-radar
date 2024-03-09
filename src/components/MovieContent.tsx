import { Divider, Grid, Typography } from '@mui/material';

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { useFetchMovie } from '../hook/useFetchMovie';
import { Fragment } from 'react';
import { WatchList } from './common/WatchList';

interface IProp {
  imdbID?: string;
}

export const MovieContent = ({ imdbID }: IProp) => {
  const { data } = useFetchMovie(imdbID || '');
  const { Title, Year, Poster, Plot, Genre, Actors, Ratings, Rated, Runtime } =
    data;

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          outline: '1px solid red',
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
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
              }}
            />
          ) : (
            <HideImageOutlinedIcon sx={{ fontSize: '95px' }} />
          )}
        </Grid>

        <Grid item xs={9} sx={{ border: '1px solid green' }}>
          <Grid
            container
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ outline: '1px solid black' }}
          >
            <Grid item sx={{ border: '1px solid black', mb: 5 }}>
              <WatchList />
            </Grid>
          </Grid>
          <Typography variant="h2" fontWeight={600} sx={{ my: 10 }}>
            {Title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              border: '1px solid black',
              padding: '10px',
            }}
          >
            {`${Rated} ${Year} \u00B7 ${Genre} \u00B7 ${Runtime}`}
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
      </Grid>
    </>
  );
};

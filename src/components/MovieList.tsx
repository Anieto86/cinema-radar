import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { Search } from '../hook/useFetch';
import { Fragment } from 'react/jsx-runtime';
import { styled } from '@mui/system';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface IProp {
  selectMovie: number;
  movies: Search[];
  totalResult: number;
  onSelectMovie: (i: number) => void;
}

export const MovieList = ({
  movies,
  totalResult,
  selectMovie,
  onSelectMovie,
}: IProp) => {
  return (
    <CustomScrollbar>
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography variant="h6">{totalResult} RESULTS</Typography>
      </Grid>
      {totalResult ? (
        <Grid item xs={12}>
          <List sx={{ my: 2 }}>
            {movies?.map((m, i: number) => {
              return (
                <Fragment key={m.imdbID}>
                  {i !== 0 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}

                  <ListItemButton
                    selected={selectMovie === i}
                    onClick={() => onSelectMovie(i)}
                    sx={{
                      '&:hover': {
                        bgcolor: '#ebebeb',
                      },
                      py: 5,
                      backgroundColor:
                        selectMovie !== i ? 'transparent' : '#ebebeb',
                    }}
                  >
                    <ListItem>
                      <Grid container>
                        <Grid item lg={2} md={2} xs={12}>
                          {m.Poster !== 'N/A' ? (
                            <img
                              src={m.Poster}
                              alt="movies-poster"
                              style={{
                                marginRight: '12px',
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                              }}
                            />
                          ) : (
                            <HideImageOutlinedIcon sx={{ fontSize: '95px' }} />
                          )}{' '}
                        </Grid>
                        <Grid item lg={8} md={12} xs={12}>
                          <Typography variant="h5">{m.Title}</Typography>
                          <Typography variant="h6">{m.Year}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </ListItemButton>
                </Fragment>
              );
            })}
          </List>
        </Grid>
      ) : (
        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 2, my: 2, height: '100vh' }}
        >
          <Grid item>
            <SearchOffIcon sx={{ fontSize: '100px' }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">No Results found</Typography>
          </Grid>
        </Grid>
      )}
    </CustomScrollbar>
  );
};

export const CustomScrollbar = styled('div')({
  borderRight: '1px solid #c4c4c4',
  overflowY: 'scroll',
  overflowX: 'hidden',
  maxHeight: ' calc(100vh - 10px)',
  scrollbarColor: '#c4c4c4 transparent',
});

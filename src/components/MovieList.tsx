import {
  // Button,
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

interface IProp {
  selectMovie: number;
  movies: Search[];
  totalResult: number;
  onSelectMovie: (i: number) => void;
  onSearchMovie: (value: string) => void;
  onSearchYear: (event: Event | null, newValue: number[]) => void;
}

export const MovieList = ({
  movies,
  totalResult,
  selectMovie,
  onSelectMovie,
}: // onSearchMovie,
// onSearchYear,
IProp) => {
  // const handleResetSearch = () => {
  //   onSearchMovie('star wars');
  //   onSearchYear(null, [1980, 2001]);
  // };

  return (
    <Grid
      container
      sx={{
        borderRight: 'solid 1px grey',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ebebeb',
      }}
    >
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography variant="h6">{totalResult} RESULTS</Typography>
      </Grid>
      {/* {!totalResult ? ( */}
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
      {/* ) : (
        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ outline: '1px solid black', p: 2, my: 2, height: '100vh' }}
        >
          <Grid item>
            <Typography variant="h6">No Results found Please select</Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ outline: '1px solid black', p: 2, my: 2, color: 'black' }}
              onClick={handleResetSearch}
            >
              Reset Search
            </Button>
          </Grid>
        </Grid>
      )} */}
    </Grid>
  );
};

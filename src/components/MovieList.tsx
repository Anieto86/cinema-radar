import {
  Button,
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
  onSearchMovie,
  onSearchYear,
}: IProp) => {
  return (
    <Grid
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
      {totalResult ? (
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
                    )}
                    <Grid container spacing={1} ml={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5">{m.Title}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">{m.Year}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </ListItemButton>
              </Fragment>
            );
          })}
        </List>
      ) : (
        <Grid sx={{ outline: '1px solid black', p: 2, my: 2 }}>
          <Typography variant="h6">No Results Please select</Typography>
          <Button
            sx={{ outline: '1px solid black', p: 2, my: 2 }}
            onClick={() => {
              onSearchMovie('start wars');
              onSearchYear(null, [2000, 2020]);
            }}
          >
            Reset Search
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { SearchResult } from '../hook/useFetch';
import { Fragment } from 'react/jsx-runtime';

interface IProp {
  selectMovie: number;
  dataList: SearchResult[];
  onSelectMovie: (i: number) => void;
}

export const MovieList = ({ dataList, selectMovie, onSelectMovie }: IProp) => {
  const totalResult = dataList
    .map((result) => result.totalResults)
    .reduce((total, current) => total + parseInt(current), 0);

  const movies = dataList
    .map((result) => result.Search)
    .flat()
    .map((s) => s);

  // console.log(movies);

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
    </Grid>
  );
};

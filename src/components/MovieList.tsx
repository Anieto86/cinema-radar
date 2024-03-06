import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import { DataType } from '../hook/useFetch';

interface IProp {
  selectMovie: number;
  dataList: DataType;
  onSelectMovie: (i: number) => void;
}

export const MovieList = ({ dataList, selectMovie, onSelectMovie }: IProp) => {
  const { Search, totalResults } = dataList;
  return (
    <Grid
      sx={{
        borderRight: 'solid 1px grey',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(243, 20, 20, 0.6) ',
        scrollbarTrackColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography>{totalResults} RESULTS</Typography>
      </Grid>
      <Grid item xs={12}>
        <List sx={{ my: 2 }}>
          {Search?.map((m, i: number) => {
            return (
              <Fragment key={m.imdbID}>
                <Divider />
                <ListItem sx={{ my: 2 }}>
                  <ListItemButton
                    selected={selectMovie === i}
                    onClick={() => onSelectMovie(i)}
                  >
                    <img
                      src={m.Poster}
                      alt="movies-poster"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />

                    <Typography sx={{ color: 'black' }}>{m.Title}</Typography>
                    <Typography>{m.Year}</Typography>
                  </ListItemButton>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

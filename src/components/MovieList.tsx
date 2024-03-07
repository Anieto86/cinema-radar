import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { DataType } from '../hook/useFetch';
import { Fragment } from 'react/jsx-runtime';

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
        // scrollbarColor: 'rgba(243, 20, 20, 0.6) ',
        // scrollbarTrackColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography variant="h6">{totalResults} RESULTS</Typography>
      </Grid>

      <List sx={{ my: 2 }}>
        {Search?.map((m, i: number) => {
          console.log(selectMovie === i);
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

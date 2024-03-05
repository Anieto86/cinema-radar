import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

interface dataListType {
  Year: string;
  Title: string;
  Poster: string;
  imdbID: string;
}
interface IProp {
  selectMovie: number;
  dataList: dataListType[];
  onSelectMovie: (i: number) => void;
}

export const MovieList = ({ dataList, selectMovie, onSelectMovie }: IProp) => {
  return (
    <Box sx={{ display: 'flex', border: 'solid 1px red', overflowY: 'scroll' }}>
      <List>
        {dataList?.map((m, i: number) => {
          console.log(m.Title);
          return (
            <ListItem key={m.imdbID}>
              <ListItemButton
                selected={selectMovie === i}
                onClick={() => onSelectMovie(i)}
              >
                <img src={m.Poster} alt="movies-poster"></img>
                <Divider sx={{}} />
                <Typography sx={{ color: 'black' }}>{m.Title}</Typography>
                <Typography>{m.Year}</Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

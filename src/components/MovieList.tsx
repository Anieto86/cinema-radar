import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

export const MovieList = ({ dataList }) => {
  return (
    <Box sx={{ display: 'flex', border: 'solid 1px red', overflowY: 'scroll' }}>
      <List>
        {dataList.map(
          (m: { Title: string; Poster: string; imdbID: string }) => {
            // console.log(m);
            return (
              <ListItem key={m.imdbID}>
                <ListItemButton>
                  <img src={m.Poster} alt="movies-poster"></img>
                  <Divider sx={{}} />
                  <Typography sx={{ color: 'black' }}>{m.Title}</Typography>
                  <Typography>{m.Year}</Typography>
                </ListItemButton>
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );
};

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface IProp {
  dataList: [];
}

export const MovieList = ({ dataList }: IProp) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: 'flex', border: 'solid 1px red', overflowY: 'scroll' }}>
      <List>
        {dataList.map(
          (
            m: {
              Year: string;
              Title: string;
              Poster: string;
              imdbID: string;
            },
            i: number
          ) => {
            return (
              <ListItem key={m.imdbID}>
                <ListItemButton
                  selected={selectedIndex === i}
                  onClick={(event) => handleListItemClick(event, i)}
                >
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

import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState } from 'react';
import { MovieType } from '../../hook/useFetchMovie';

interface IProp {
  imdbID: string;
  addFavorite: (movie: MovieType) => void;
  favorites: MovieType[];
  removeFavorite: (imdbID: string) => void;
}

export const WatchList = ({
  imdbID,
  addFavorite,
  favorites,
  removeFavorite,
}: IProp) => {
  const [watchlist, setWatchlist] = useState(() => {
    const data = window.localStorage.getItem('WATCHLIST_STORAGE');
    return data ? JSON.parse(data) : {};
  });

  const handleToggle = () => {
    const updatedValue = watchlist[imdbID];
    setWatchlist((prevWatchlist: { [x: string]: boolean }) => {
      const updatedWatchlist = {
        ...prevWatchlist,
        [imdbID]: !prevWatchlist[imdbID],
      };

      window.localStorage.setItem(
        'WATCHLIST_STORAGE',
        JSON.stringify(updatedWatchlist)
      );

      return updatedWatchlist;
    });

    if (updatedValue) {
      removeFavorite(imdbID);
    } else {
      addFavorite(favorites as unknown as MovieType);
    }
  };

  return (
    <Button
      sx={{
        p: 3,
        color: 'black',
        fontWeight: 600,
        border: 'solid ',
        borderRadius: '10px',
      }}
      onClick={handleToggle}
      startIcon={watchlist[imdbID] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      Watchlist
    </Button>
  );
};

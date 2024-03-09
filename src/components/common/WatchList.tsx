import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState } from 'react';

interface IProp {
  imdbID: string;
}

export const WatchList = ({ imdbID }: IProp) => {
  const [watchlist, setWatchlist] = useState(() => {
    const data = window.localStorage.getItem('WATCHLIST_STORAGE');
    return data ? JSON.parse(data) : false;
  });

  const handleToggle = () => {
    setWatchlist((prevWatchlist: { [x: string]: boolean }) => {
      console.log(prevWatchlist);
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
  };

  return (
    <Button
      sx={{ p: 2, color: 'black' }}
      onClick={handleToggle}
      startIcon={watchlist[imdbID] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      Watchlist
    </Button>
  );
};

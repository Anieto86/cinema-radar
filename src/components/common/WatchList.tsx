import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useEffect, useState } from 'react';

export const WatchList = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const data = window.localStorage.getItem('WATCHLIST_STORAGE');
    return data ? JSON.parse(data) : false;
  });

  useEffect(() => {
    window.localStorage.setItem('WATCHLIST_STORAGE', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleToggle = () => {
    setWatchlist((prevWatchlist: boolean) => !prevWatchlist);
  };

  return (
    <Button
      sx={{ p: 2, color: 'black' }}
      onClick={handleToggle}
      startIcon={watchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      Watchlist
    </Button>
  );
};

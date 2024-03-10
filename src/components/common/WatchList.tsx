import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import { useState } from 'react';
import { MovieType } from '../../hook/useFetchMovie';
import { useState } from 'react';

interface IProp {
  imdbID: string;
  onWatchList: (movie: Search) => void;
  watchList: unknown;
}

export const WatchList = ({ imdbID, onWatchList, watchList }: IProp) => {
  const [watchlist, setWatchlist] = useState(() => {
    const data = window.localStorage.getItem('WATCHLIST_STORAGE');
    return data ? JSON.parse(data) : {};
  });

  const handleToggle = (movie: MovieType) => {
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

    onWatchList(movie);
  };

  return (
    <Button
      sx={{ p: 2, color: 'black' }}
      onClick={() => handleToggle(watchList)}
      startIcon={watchlist[imdbID] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      Watchlist
    </Button>
  );
};
